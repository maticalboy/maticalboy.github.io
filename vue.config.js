/*
 * @Author: “chenjinwei” “507725948@qq.com”
 * @Date: 2023-09-21 14:04:46
 * @LastEditors: “chenjinwei” “507725948@qq.com”
 * @LastEditTime: 2023-11-30 17:01:34
 * @FilePath: \test\vue.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
    lintOnSave: false,
    transpileDependencies: true,
    devServer: {
        // 端口号
        port: 8080,
        // 基本不同配置，了解即可
        host: "localhost",
        // 是否自启动
        open: true,
        proxy: {
            "/api": {  // /api是自行设置的请求前缀，按照这个来匹配请求，有这个字段的请求，就会走到代理来。
                target: "http://www.aaabbbccc.com", // 需要代理的域名，目标域名，会替换掉匹配字段之前的路径
                ws: false, // 是否启用websockets
                changeOrigin: true, //是否跨域
                pathRewrite: {  //重写匹配的字段，如果不需要放在请求路径上，可以重写为""
                    "^/api": ""
                }
            },

        },
    },
    publicPath: './'
});
