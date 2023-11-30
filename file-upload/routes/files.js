const fs = require('fs')
// 检测文件是否存在
const exists = (path) => {
  return new Promise(resolve => {
    fs.access(path, fs.constants.F_OK, err => {
      if (err) {
        resolve(false);
        return;
      }
      resolve(true);
    });
  });
};
module.exports = { exists };