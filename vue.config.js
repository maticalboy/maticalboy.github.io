/*
 * @Author: “chenjinwei” “507725948@qq.com”
 * @Date: 2023-09-21 14:04:46
 * @LastEditors: “chenjinwei” “507725948@qq.com”
 * @LastEditTime: 2023-10-13 15:47:43
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
    },
    publicPath: '/vue-openlayers'
});
