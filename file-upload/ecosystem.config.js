module.exports = {
  "apps": [{
    "name": "files-upload",  //名称
    "script": "./bin/www", //程序入口
    "cwd": "./",           //根目录
    "instances": 1,
    "error_file": "./logs/error.log",//错误输出日志
    "out_file": "./logs/out.log",  //日志
    "log_date_format": "YYYY-MM-DD HH:mm Z" //日期格式
  }]
}