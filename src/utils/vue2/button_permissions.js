/*
 * @Author: “chenjinwei” “507725948@qq.com”
 * @Date: 2023-09-23 08:50:11
 * @LastEditors: “chenjinwei” “507725948@qq.com”
 * @LastEditTime: 2023-09-23 09:06:18
 * @FilePath: \vue2-basic-version\src\utils\button_permissions.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue'
// 导入 store
import store from '@/store'
Vue.directive('permissions', {
	inserted(el, binding) {
		const { value } = binding;
		const all_permission = 'system:all';
		const permissions = store.getters && store.getters.permissions;
        console.log(permissions)
		if (value && value instanceof Array && value.length > 0) {
			const permissionFlag = value;
			const hasPermissions = permissions.some((permission) => {
				return all_permission === permission || permissionFlag.includes(permission);
			});
			if (!hasPermissions) {
				el.parentNode && el.parentNode.removeChild(el);
			}
		} else {
			throw new Error(`请设置操作权限标签值`);
		}
	}
});
