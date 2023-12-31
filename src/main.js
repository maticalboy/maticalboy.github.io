/*
 * @Author: “chenjinwei” “507725948@qq.com”
 * @Date: 2023-10-26 11:49:01
 * @LastEditors: “chenjinwei” “507725948@qq.com”
 * @LastEditTime: 2023-12-29 09:06:35
 * @FilePath: \vue2-template\src\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue'
import App from './App.vue'


import router from '@/router'
import store from '@/store'

import '@/utils/auto_import_elementUI';
import 'element-ui/lib/theme-chalk/index.css';

import './directive/dialogDrag'
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
