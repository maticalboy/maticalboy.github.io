<!--
 * @Author: “chenjinwei” “507725948@qq.com”
 * @Date: 2023-10-26 14:09:02
 * @LastEditors: “chenjinwei” “507725948@qq.com”
 * @LastEditTime: 2024-01-12 14:36:24
 * @FilePath: \vue2-template\vue2-template\src\layout\example.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="contain">
        <div class="leftContent">
            <RouterLink
                v-for="(item, index) in openlayersRoutes.children"
                :key="index"
                :to="'/openlayers/' + item.path"
                >{{ item.title }}</RouterLink
            >
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
import live2d from '@/layout/live2D/Live2D.vue';
import openlayersRoutes from '@/router/modules/openlayers.js';
export default {
    components: {
		live2d
	},
    data() {
        return {
            style: "position: fixed; bottom: 0; right: 0;",
            size: 350,
            direction: "right",
            openlayersRoutes:openlayersRoutes,
        };
    },
};
</script>
<style lang="scss" scoped>

</style>
