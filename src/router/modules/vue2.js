/*
 * @Author: “chenjinwei” “507725948@qq.com”
 * @Date: 2023-12-02 11:24:59
 * @LastEditors: “chenjinwei” “507725948@qq.com”
 * @LastEditTime: 2024-01-04 08:47:38
 * @FilePath: \vue2-template\src\router\modules\vue2.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import ExampleLayout from '@/layout/vue2/example'

export default {
    path: '/vue2',
    redirect: '/vue2/bigFile',
    component: ExampleLayout,
    children: [
        // 大文件上传
        {
            path: 'bigFile',
            name: 'BigFile',
            component: () => import('@/components/vue/BigFile/BigFile')
        },
        // 进度条
        {
            path: 'process',
            name: 'Process',
            component: () => import('@/components/vue/Process/Process')
        },
        // 封装的组件
        {
            path: 'component',
            name: 'Component',
            component: () => import('@/components/vue/Component/index')
        }
    ]
}
