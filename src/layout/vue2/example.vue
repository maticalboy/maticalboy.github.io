<!--
 * @Author: “chenjinwei” “507725948@qq.com”
 * @Date: 2023-10-26 14:09:02
 * @LastEditors: “chenjinwei” “507725948@qq.com”
 * @LastEditTime: 2024-01-26 09:38:47
 * @FilePath: \vue2-template\vue2-template\src\layout\example.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="contain">
        <div class="leftContent">
            <RouterLink
                v-for="(item, index) in navList"
                :key="index"
                :to="'/vue2' + item.to"
                >{{ item.title }}</RouterLink
            >
            <!-- <RouterLink :to="{ name: 'exampleParams', params: { test: '123' } }"
                >路由params</RouterLink
            >
            <RouterLink :to="{ path: '/example/query', query: { test: '123' } }"
                >路由query</RouterLink
            > -->
        </div>
        <div class="rightContent">
            <RouterView />
        </div>
        <live2d
            :style="style"
            :model="['Potion-Maker/Pio', 'school-2017-costume-yellow']"
            :direction="direction"
            :size="size"
        ></live2d>
    </div>
</template>
<script>
import live2d from "@/layout/live2D/Live2D.vue";
export default {
    components: {
        live2d,
    },
    data() {
        return {
            style: "position: fixed; bottom: 0; right: 0;",
            size: 350,
            direction: "right",
            navList: [
                {
                    title: "大文件上传",
                    to: "/bigFile",
                },
                {
                    title: "进度条",
                    to: "/process",
                },
                {
                    title: "封装组件",
                    to: "/component",
                },
                {
                    title:'滑块',
                    to:'/imageVerify'
                },
                {
                    title: "拖拽上传",
                    to: "/dragUpload",
                },
                {
                    title:'markDown解析',
                    to:'/markDown'
                }
            ],
        };
    },
};
</script>
