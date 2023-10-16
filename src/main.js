/*
 * @Author: “chenjinwei” “507725948@qq.com”
 * @Date: 2023-09-21 14:04:46
 * @LastEditors: “chenjinwei” “507725948@qq.com”
 * @LastEditTime: 2023-10-13 15:48:48
 * @FilePath: \test\src\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue';
import App from './App.vue';

// 导入 router
import router from '@/router';

// 导入 store
import store from '@/store';

// 导入elementUI
import '@/utils/auto-import-elementUI';
import 'element-ui/lib/theme-chalk/index.css';

// 导入自定义指令
import '@/utils/button_permissions'

Vue.config.productionTip = false;

new Vue({
	// 6.注入
	router,
	store,
	render: (h) => h(App)
}).$mount('#app');

// 注入之后，就是在对应的页面给路由出口
// 7.给出口 回到App.vue中 给一级路由添加出口
// <router-view></router-view>（标签名也可以写成大驼峰命名法）
