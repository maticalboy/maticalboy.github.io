/*
 * @Author: “chenjinwei” “507725948@qq.com”
 * @Date: 2023-09-21 14:21:31
 * @LastEditors: “chenjinwei” “507725948@qq.com”
 * @LastEditTime: 2023-09-23 08:12:48
 * @FilePath: \test\src\store\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AEs
 */
import Vue from 'vue';
import Vuex from 'vuex';

// 导入 modules 文件夹下的模块
import goodsList from './modules/goodsList';
import userInfo from './modules/userInfo';

import getters from './getters';
Vue.use(Vuex);

const store = new Vuex.Store({
	modules: {
		goodsList,
		userInfo
	},
	getters,
});

export default store;
