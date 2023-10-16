/*
 * @Author: “chenjinwei” “507725948@qq.com”
 * @Date: 2023-09-21 14:22:40
 * @LastEditors: “chenjinwei” “507725948@qq.com”
 * @LastEditTime: 2023-09-23 08:26:07
 * @FilePath: \test\src\store\modules\goodsList.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const state = () => ({
	items: [6],
	checkoutStatus: null
});
const getters = {
	// 建立一些快捷访问
	items1(state) {
		return state.items;
	}
};
const mutations = {};

const actions = {
	ADD(context, payload) {
		context.commit('add', payload);
	}
};

export default {
	// 开启命名空间
	namespaced: true,
	state,
	getters,
	mutations,
	actions
};
