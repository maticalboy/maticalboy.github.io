// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var app = express();


// // 设置cors 允许跨域
// var allowCrossDomain = function (req, res, next) {
//   // 设置允许跨域访问的请求源
//   // 设置允许跨域访问的请求源（* 表示接受任意域名的请求）
//   res.header("Access-Control-Allow-Origin", "*");
//   // 设置允许跨域访问的请求头
//   res.header(
//     "Access-Control-Allow-Headers",
//     "X-Requested-With,Origin,Content-Type,Accept,Authorization"
//   );
//   // 设置允许跨域访问的请求类型
//   res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//   // 同意 cookie 发送到服务器（如果要发送cookie，Access-Control-Allow-Origin 不能设置为星号）
//   res.header("Access-Control-Allow-Credentials", "true");
//   next();
// }

// app.use(allowCrossDomain)
// app.use(logger('dev'));
// app.use(express.json());

// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
// app.use('/api/files', indexRouter);

// module.exports = app;



const express = require("express");
const uploader = require("express-fileupload");
const fs = require("fs");
//导入path内置模块
const { resolve, extname } = require("path");
//导入工具包，判断文件是否存在
const { exists } = require("./routes/files");
const path = require("path");
const app = express();
const port = 3000;
app.set('port', port);
app.listen(port, function () {
    console.log('App is listening on port ' + port);
});
// 设置 CORS 允许跨域
var allowCrossDomain = function (req, res, next) {
    // 设置允许跨域访问的请求源（* 表示接受任意域名的请求）
    res.header("Access-Control-Allow-Origin", "*");
    // 设置允许跨域访问的请求头
    res.header(
        "Access-Control-Allow-Headers",
        "X-Requested-With,Origin,Content-Type,Accept,Authorization"
    );
    // 设置允许跨域访问的请求类型
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    // 同意 cookie 发送到服务器（如果要发送cookie，Access-Control-Allow-Origin 不能设置为星号）
    res.header("Access-Control-Allow-Credentials", "true");
    next();
};
app.use(allowCrossDomain);
//设置静态资源访问
app.use("/", express.static("public"));
app.use(express.json());
app.use(uploader());
const uploadDir = `${__dirname}/upload`;
app.get("/", (req, res) => {
    res.send("hello express!");
});
//接收文件上传
app.post("/api/upload_chunk", async (req, res) => {
    try {
        const { filename } = req.body;
        const files = req.files;
        const file = files.file;
        console.log(33333333, filename, files, file);
        let path = "";
        //创建存储大文件的临时目录
        let [, HASH] = /^([^_]+)_(\d+)/.exec(filename);
        path = `${uploadDir}/${HASH}`;
        !fs.existsSync(path) ? fs.mkdirSync(path) : null;
        path = `${uploadDir}/${HASH}/${filename}`;
        let isExists = await exists(path);
        if (isExists) {
            res.send({
                code: 0,
                msg: "文件已存在",
            });
            return;
        }
        fs.writeFile(path, file.data, async function (err) {
            console.log('-------写文件------------');
            if (err) {
                res.send({ code: 0, msg: "failure" });
            } else {

                res.send({ code: 1, msg: "success" });
            }
        });
    } catch (error) {
        res.send({ code: 0, msg: "failure" });
    }
});
app.get("/api/upload_merge", async (req, res) => {
    console.log("--------upload_merge-------------");
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
        msg: "上传完毕",
    });
});

app.get("/api/upload_already", async (req, res) => {
    console.log("--------upload_already-------------");
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
            msg: "",
            fileList: chunksName,
        });
    } catch (error) {
        res.send({
            code: 0,
            msg: "",
            fileList,
        });
    }
});
module.exports = app;