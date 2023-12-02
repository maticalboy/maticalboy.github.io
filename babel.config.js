/*
 * @Author: “chenjinwei” “507725948@qq.com”
 * @Date: 2023-09-21 15:08:51
 * @LastEditors: “chenjinwei” “507725948@qq.com”
 * @LastEditTime: 2023-10-26 16:48:26
 * @FilePath: \vue2-basic-version\babel.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
module.exports = {
    presets: [
        "@vue/cli-plugin-babel/preset",
        ["@babel/preset-env", { modules: false }],
    ],
    plugins: [
        [
            "component",
            {
                libraryName: "element-ui",
                styleLibraryName: "theme-chalk",
            },
        ],
    ],
};
