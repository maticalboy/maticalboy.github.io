var express = require('express');
var router = express.Router();
const fs = require('fs');
// 导入path内置模块
// const { resolve, extname } = require('path')
// 导入工具包，判断文件是否存在
const { exists } = require('./files')

// 存放目录
const pathFile = require('path')
const { extname } = pathFile
const multer = require('multer');



// 创建存储文件的目录
const uploadDir = `${__dirname}/upload`;
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// 创建multer实例
const upload = multer({ dest: uploadDir });

///接收文件上传
router.post("/upload_chunk", upload.single('file'), async (req, res) => {
  try {
    const { filename } = req.body;
    const file = req.file;
    // let filePath = "";
    // // 创建存储大文件的临时目录
    // let [, HASH] = /^([^_]+)_(\d+)/.exec(filename);
    // let tempDir = `${uploadDir}/${HASH}`;
    let [, HASH] = /^([^_]+)_(\d+)/.exec(filename);
    path = `${uploadDir.dest}/${HASH}`;
    !fs.existsSync(path) ? fs.mkdirSync(path) : null;
    path = `${uploadDir.dest}/${HASH}/${filename}`;
    let isExists = await exists(path);
    // if (!fs.existsSync(tempDir)) {
    //   fs.mkdirSync(tempDir);
    // }
    // filePath = `${uploadDir}/${HASH}`;
    // let isExists = await exists(filePath);
    if (isExists) {
      res.send({
        code: 300,
        msg: "文件已存在",
      });
      return;
    }
    fs.writeFile(filePath, file.buffer, async function (err) {
      console.log('-------写文件------------');
      if (err) {
        res.send({ code: 400, msg: "error" });
      } else {
        res.send({ code: 200, msg: "success" });
      }
    });
  } catch (error) {
    res.send({ code: 400, msg: "failure" });
  }
});
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
router.get("/upload_merge", async (req, res) => {
  console.log("--------upload_merge-------------");
  const { hash } = req.query;
  let path = `${uploadDir}/${hash}`;
  let suffix;
  try {
    const chunksName = await fs.promises.readdir(path);
    chunksName.sort((a, b) => {
      let reg = /_(\d+)/;
      return reg.exec(a)[1] - reg.exec(b)[1];
    });
    for (const item of chunksName) {
      !suffix ? (suffix = extname(item)) : null;
      await fs.promises.appendFile(
        pathFile.join(uploadDir, `${hash}${suffix}`),
        await fs.promises.readFile(pathFile.join(path, item))
      );
      await fs.promises.unlink(pathFile.join(path, item));
    }
    await fs.promises.rmdir(path);
    res.send({
      code: 200,
      msg: "上传完毕",
    });
  } catch (error) {
    console.log(error);
    res.send({
      code: 400,
      msg: "失败",
    });
  }
});


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
//       code: 200,
//       msg: "成功",
//       fileList: chunksName,
//     });
//   } catch (error) {
//     console.log(error);
//     res.send({
//       code: 400,
//       msg: "失败",
//       fileList,
//     });
//   }
// });
router.get("/upload_already", async (req, res) => {
  console.log("--------upload_already-------------");
  const { hash } = req.query;
  let path = `${uploadDir}/${hash}`;
  let fileList = [];
  console.log('path', path);
  try {
    let chunksName = await fs.promises.readdir(path);
    console.log('chunksName before', chunksName);
    chunksName.sort((a, b) => {
      let reg = /_(\d+)/;
      return reg.exec(a)[1] - reg.exec(b)[1];
    });
    console.log('chunksName afeter', chunksName);
    res.send({
      code: 200,
      msg: "成功",
      fileList: chunksName,
    });
  } catch (error) {
    console.log(error);
    res.send({
      code: 400,
      msg: "失败",
      fileList,
    });
  }
});


module.exports = router;
// var express = require('express');
// var router = express.Router();
// const fs = require('fs');
// // 导入path内置模块
// const { resolve, extname } = require('path')
// // 导入工具包，判断文件是否存在
// const { exists } = require('./files')

// // 存放目录
// const multer = require('multer')

// const uploadDir = './upload'

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     const { filename } = req.body;
//     const [, HASH] = /^([^_]+)_(\d+)/.exec(filename);
//     const directory = `${uploadDir}/${HASH}`;
//     fs.mkdirSync(directory, { recursive: true });
//     cb(null, directory);
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   }
// });
// const upload = multer({
//   storage: storage,
//   fileFilter: function (req, file, cb) {
//     // 添加文件类型验证逻辑
//     if (file.mimetype !== 'application/octet-stream') {
//       return cb(new Error('Invalid file type'));
//     }
//     cb(null, true);
//   },
// });

// ///接收文件上传
// router.post("/upload_chunk", uploadDir.single('file'), async (req, res) => {
//   try {
//     const { filename } = req.body;
//     const files = req.file; // 使用 req.file 获取上传的文件
//     const file = files.file;

//     let path = "";
//     // 创建存储大文件的临时目录
//     let [, HASH] = /^([^_]+)_(\d+)/.exec(filename);
//     path = `${uploadDir.dest}/${HASH}`;
//     !fs.existsSync(path) ? fs.mkdirSync(path) : null;
//     path = `${uploadDir.dest}/${HASH}/${filename}`;
//     let isExists = await exists(path);
//     if (isExists) {
//       res.send({
//         code: 300,
//         msg: "文件已存在",
//       });
//     } else {
//       fs.writeFile(path, file.data, function (err) {
//         console.log('-------写文件------------');
//         if (err) {
//           res.send({ code: 400, msg: "error" });
//         } else {
//           res.send({ code: 200, msg: "success" });
//         }
//       });
//     }
//   } catch (error) {
//     res.send({ code: 400, msg: "failure" });
//   }
// });

// router.get("/upload_merge", async (req, res) => {
//   console.log("--------upload_merge-------------");
//   //读取所有切片文件
//   const { hash } = req.query;

//   let path = `${uploadDir}/${hash}`;
//   let suffix;
//   const chunksName = fs.readdirSync(`${uploadDir}/${hash}`);
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
//   try {
//     let chunksName = fs.readdirSync(path);
//     //进行排序
//     chunksName.sort((a, b) => {
//       let reg = /_(\d+)/;
//       return reg.exec(a)[1] - reg.exec(b)[1];
//     });
//     res.send({
//       code: 200,
//       msg: "成功",
//       fileList: chunksName,
//     });
//   } catch (error) {
//     console.log(error);
//     res.send({
//       code: 400,
//       msg: "失败",
//       fileList: [],
//     });
//   }
// });

// module.exports = router;
