// const express = require('express');
// const router = express.Router();
// const fs = require('fs');
// // const {} = require('path');
// const { exists } = require('./files');

// const uploadDir = `${__dirname}/upload`;
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir);
// }

// //接收文件上传
// router.post("/upload_chunk", async (req, res) => {
//   try {
//     const { filename } = req.body;
//     const files = req.files;
//     const file = files.file;

//     console.log(111111, filename, files, file);
//     let path = "";
//     //创建存储大文件的临时目录
//     let [, HASH] = /^([^_]+)_(\d+)/.exec(filename);
//     path = `${uploadDir}/${HASH}`;
//     !fs.existsSync(path) ? fs.mkdirSync(path) : null;
//     path = `${uploadDir}/${HASH}/${filename}`;
//     let isExists = await exists(path);
//     if (isExists) {
//       res.send({
//         code: 0,
//         msg: "文件已存在",
//       });
//       return;
//     }
//     fs.writeFile(path, file.data, async function (err) {
//       console.log('-------写文件------------');
//       if (err) {
//         res.send({ code: 0, msg: "failure" });
//       } else {

//         res.send({ code: 1, msg: "success" });
//       }
//     });
//   } catch (error) {
//     console.log(11111, error);
//     res.send({ code: 0, msg: "failure" });
//   }
// });


// router.get("/upload_merge", async (req, res) => {
//   console.log("--------upload_merge-------------");
//   //读取所有切片文件
//   const { hash } = req.query;
//   let path = `${uploadDir}/${hash}`;
//   let suffix;
//   const chunksName = await fs.readdirSync(`${uploadDir}/${hash}`);
//   //进行排序
//   chunksName.sort((a, b) => {
//     let reg = /_(\d+)/;
//     return reg.exec(a)[1] - reg.exec(b)[1];
//   });
//   chunksName.forEach((item) => {
//     !suffix ? (suffix = /\.([0-9a-zA-Z]+)$/.exec(item)[1]) : null;
//     fs.appendFileSync(
//       `${uploadDir}/${hash}.${suffix}`,
//       fs.readFileSync(`${path}/${item}`)
//     );
//     fs.unlinkSync(`${path}/${item}`);
//   });
//   //删除分片所在的文件夹
//   fs.rmdirSync(path);
//   res.send({
//     code: 200,
//     msg: "上传完毕",
//   });
// });

// router.get("/upload_already", async (req, res) => {
//   console.log("--------upload_already-------------");
//   //读取所有切片文件
//   const { hash } = req.query;
//   let path = `${uploadDir}/${hash}`;
//   let fileList = [];
//   console.log('path', path);
//   try {
//     let chunksName = await fs.readdirSync(path);
//     console.log('chunksName before', chunksName);
//     //进行排序
//     chunksName.sort((a, b) => {
//       let reg = /_(\d+)/;
//       return reg.exec(a)[1] - reg.exec(b)[1];
//     });
//     console.log('chunksName afeter', chunksName);
//     res.send({
//       code: 1,
//       msg: "",
//       fileList: chunksName,
//     });
//   } catch (error) {
//     res.send({
//       code: 0,
//       msg: "",
//       fileList,
//     });
//   }
// });

// module.exports = router;
const express = require('express');
const router = express.Router();
const fs = require('fs');
const multer = require('multer');
const { exists } = require('./files');

const uploadDir = `${__dirname}/upload`;
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// 创建一个存储引擎
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // 设置上传文件的存储路径
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // 设置上传文件的文件名
    cb(null, file.originalname);
  }
});

// 创建一个 multer 实例
const upload = multer({ storage: storage });

// 使用 upload 中间件处理文件上传
router.use(upload.any());

// 接收文件上传
router.post('/upload_chunk', async (req, res) => {
  try {
    const { filename } = req.body;
    const files = req.files;
    const file = files.file;
    console.log(1111, req.body);
    console.log(2222, req.files);
    console.log(3333, filename, files, file);
    let path = '';
    //创建存储大文件的临时目录
    let [, HASH] = /^([^_]+)_(\d+)/.exec(filename);
    path = `${uploadDir}/${HASH}`;
    !fs.existsSync(path) ? fs.mkdirSync(path) : null;
    path = `${uploadDir}/${HASH}/${filename}`;
    let isExists = await exists(path);
    if (isExists) {
      res.send({
        code: 0,
        msg: '文件已存在',
      });
      return;
    }
    fs.writeFile(path, file.data, async function (err) {
      console.log('-------写文件------------');
      if (err) {
        res.send({ code: 0, msg: 'failure' });
      } else {
        res.send({ code: 1, msg: 'success' });
      }
    });
  } catch (error) {
    console.log(11111, error);
    res.send({ code: 0, msg: 'failure' });
  }
});

router.get('/upload_merge', async (req, res) => {
  console.log('--------upload_merge-------------');
  //读取所有切片文件
  const { hash } = req.query;
  let path = `${uploadDir}/${hash}`;
  let suffix;
  const chunksName = await fs.readdirSync(`${uploadDir}/${hash}`);
  //进行排序
  chunksName.sort((a, b) => {
    let reg = /_(\d+)/;
    return reg.exec(a)[1] - reg.exec(b)[1];
  });
  chunksName.forEach((item) => {
    !suffix ? (suffix = /\.([0-9a-zA-Z]+)$/.exec(item)[1]) : null;
    fs.appendFileSync(
      `${uploadDir}/${hash}.${suffix}`,
      fs.readFileSync(`${path}/${item}`)
    );
    fs.unlinkSync(`${path}/${item}`);
  });
  //删除分片所在的文件夹
  fs.rmdirSync(path);
  res.send({
    code: 200,
    msg: '上传完毕',
  });
});

router.get('/upload_already', async (req, res) => {
  console.log('--------upload_already-------------');
  //读取所有切片文件
  const { hash } = req.query;
  let path = `${uploadDir}/${hash}`;
  let fileList = [];
  console.log('path', path);
  try {
    let chunksName = await fs.readdirSync(path);
    console.log('chunksName before', chunksName);
    //进行排序
    chunksName.sort((a, b) => {
      let reg = /_(\d+)/;
      return reg.exec(a)[1] - reg.exec(b)[1];
    });
    console.log('chunksName afeter', chunksName);
    res.send({
      code: 1,
      msg: '',
      fileList: chunksName,
    });
  } catch (error) {
    res.send({
      code: 0,
      msg: '',
      fileList,
    });
  }
});

module.exports = router;
