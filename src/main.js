/*
 * @Author: “chenjinwei” “507725948@qq.com”
 * @Date: 2023-10-26 11:49:01
 * @LastEditors: “chenjinwei” “507725948@qq.com”
 * @LastEditTime: 2024-08-02 11:16:11
 * @FilePath: \vue2-template\src\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue'
import App from './App.vue'


import router from '@/router'
import store from '@/store'
// 按需引入element
import '@/utils/common/auto_import_elementUI';
import 'element-ui/lib/theme-chalk/index.css';
// 添加拖拽
import './directive/dialogDrag'
// 添加自适应
import '@/utils/common/auto_import_rem';
Vue.config.productionTip = false

import '@/assets/styles/css/animation.css'
import '@/assets/styles/css/color.css'
import '@/assets/styles/css/common.less'
import '@/assets/styles/css/element.less'
// 引入mavon-editor
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import drawInteraction from "../src/utils/openlayers/HAEditDrawInteraction"
Vue.prototype.$global = {
    drawInteraction:new drawInteraction()
}
Vue.use(mavonEditor)
new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
