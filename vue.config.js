/*
 * @Author: “chenjinwei” “507725948@qq.com”
 * @Date: 2023-10-26 11:49:01
 * @LastEditors: “chenjinwei” “507725948@qq.com”
 * @LastEditTime: 2024-01-15 09:29:08
 * @FilePath: \vue2-template\vue2-template\vue.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false, //禁用ESLint
    devServer: {
        // 端口号
        port: 8080,
        // 基本不同配置，了解即可
        host: 'localhost',
        // 是否自启动
        open: true,
        // 低版本全屏报错
        client:{ overlay: false },
        proxy: {
            '/api': {
                target: 'https://v1.jinrishici.com',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    publicPath: './'
})
