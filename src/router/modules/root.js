/*
 * @Author: “chenjinwei” “507725948@qq.com”
 * @Date: 2023-12-02 08:39:37
 * @LastEditors: “chenjinwei” “507725948@qq.com”
 * @LastEditTime: 2023-12-02 14:31:46
 * @FilePath: \vue2-template\src\router\modules\root.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export default [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        component: () => import(/* webpackChunkName: 'Home' */ '@/views/Home.vue'),
        meta: {
            title: '主页'
        }
    },
    {
        path: '/login',
        component: () => import(/* webpackChunkName: 'root' */ '@/views/login.vue')
    },
]
