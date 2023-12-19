<!--
 * @Author: “chenjinwei” “507725948@qq.com”
 * @Date: 2023-10-26 14:09:02
 * @LastEditors: “chenjinwei” “507725948@qq.com”
 * @LastEditTime: 2023-12-19 16:09:00
 * @FilePath: \vue2-template\vue2-template\src\layout\example.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="contain">
        <div class="leftContent">
            <RouterLink to="/example/test">测试</RouterLink>
            <RouterLink to="/three/study">总览学习</RouterLink>
            <RouterLink to="/three/drawLine">绘制线</RouterLink>
            <RouterLink to="/three/imageUtils">自定义纹理</RouterLink>
            <RouterLink to="/three/gridLine">网格</RouterLink>
            <RouterLink to="/three/builtGeometry">内置几何</RouterLink>
            <RouterLink to="/three/userControl">用户交互</RouterLink>
            <RouterLink to="/three/stats">性能检测</RouterLink>
            <RouterLink to="/three/fontLoader">三维字体</RouterLink>
            <RouterLink to="/three/castShadow">阴影</RouterLink>
            <RouterLink to="/three/gui">GUI</RouterLink>
            <RouterLink to="/three/senceFog">场景雾化</RouterLink>
            <RouterLink to="/three/flyControls">飞行控制器</RouterLink>
            <RouterLink to="/three/lensFlares">光晕</RouterLink>
            <RouterLink to="/three/blendMateria">材质融合</RouterLink>
            <RouterLink to="/three/gosper">高斯帕曲线</RouterLink>
            <RouterLink to="/three/convexGeometry">凸包</RouterLink>
            <RouterLink to="/three/latheGeometry">机床模型</RouterLink>
            <RouterLink to="/three/extrudeGeometry">二维拉伸几何</RouterLink>
            <RouterLink to="/three/tubeGeometry">三维管道</RouterLink>
            <RouterLink to="/three/svgLoader">svg转三维立体</RouterLink>
            <RouterLink to="/three/parametricGeometry">公式几何体</RouterLink>
            <RouterLink to="/three/raycaster">点击事件</RouterLink>
            <RouterLink to="/three/canvasPoint">糖豆人</RouterLink>
            <RouterLink to="/three/rain">下雨</RouterLink>
            <RouterLink to="/three/demo">demo</RouterLink>
            <RouterLink to="/three/house">移动的房子</RouterLink>
            <RouterLink to="/three/people">移动的人</RouterLink>
            <RouterLink to="/three/vr">VR</RouterLink>
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
import live2d from '@/layout/live2D/Live2D.vue';
export default {
    components: {
		live2d
	},
    data() {
        return {
            style: "position: fixed; bottom: 0; right: 0;",
            size: 350,
            direction: "right",
        }
    },
}
</script>
<style lang="scss" scoped>
.contain {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .leftContent {
        width: 200px;
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #000;
        padding: 20px 0;
        box-sizing: border-box;
        overflow: auto;
    }
    .rightContent {
        display: flex;
        flex: 1;
    }
}
a {
    display: flex;
    width: 100%;
    min-height: 50px;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    font-size: 14px;
    color: #fff;
    cursor: pointer;
    &.router-link-active {
        font-weight: bold;
        font-size: 18px;
        background: #fff;
        color: #000;
    }
}
</style>
