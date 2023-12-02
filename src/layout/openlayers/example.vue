<!--
 * @Author: “chenjinwei” “507725948@qq.com”
 * @Date: 2023-10-26 14:09:02
 * @LastEditors: “chenjinwei” “507725948@qq.com”
 * @LastEditTime: 2023-12-02 11:39:08
 * @FilePath: \vue2-template\vue2-template\src\layout\example.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="contain">
        <div class="leftContent">
            <RouterLink
                v-for="(item, index) in navList"
                :key="index"
                :to="'/openlayers' + item.to"
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
            navList: [
                {
                    title: "地图",
                    to: "/firstMap",
                },
                {
                    title: "弹窗",
                    to: "/popup",
                },
                {
                    title: "标记",
                    to: "/mapMarker",
                },
                {
                    title: "地图缩放级别",
                    to: "/zoom",
                },
                {
                    title: "单击激活地图",
                    to: "/tabindex",
                },
                {
                    title: "切换地图容器",
                    to: "/changeTarget",
                },
                {
                    title: "同步两个地图",
                    to: "/synchronization",
                },
                {
                    title: "预加载",
                    to: "/preloadMap",
                },
                {
                    title: "矢量图",
                    to: "/vectorJSON",
                },
                {
                    title: "矢量图",
                    to: "/vectorHigh",
                },
                {
                    title: "旋转",
                    to: "/rotationMap",
                },
                {
                    title: "鼠标拖拽旋转/缩放",
                    to: "/mouseRotationMap",
                },
                {
                    title: "动画",
                    to: "/viewAnimate",
                },
                {
                    title: "网格",
                    to: "/graticule",
                },
                {
                    title: "热力图",
                    to: "/heatmap",
                },
                {
                    title: "比例尺控件",
                    to: "/scaleLine",
                },
                {
                    title: "全屏控件",
                    to: "/fullScreen",
                },
                {
                    title: "导览控件",
                    to: "/zoomToExtent",
                },
                {
                    title: "总览控件",
                    to: "/overviewMap",
                },
                {
                    title: "鼠标位置控件",
                    to: "/mousePosition",
                },
                {
                    title: "缩放滑块控件",
                    to: "/zoomSlider",
                },
                {
                    title: "图层组",
                    to: "/layerSet",
                },
                {
                    title: "控制图层层叠关系",
                    to: "/setZIndex",
                },
                {
                    title: "限制分辨率",
                    to: "/setResolution",
                },
                {
                    title: "按限制范围加载图层",
                    to: "/setExtent",
                },
                {
                    title: "图层遮罩效果",
                    to: "/coverageModal",
                },
                {
                    title: "设置图层的源",
                    to: "/setSource",
                },
                {
                    title: "简单的标记",
                    to: "/simplenessLabel",
                },
                {
                    title: "定义标记颜色",
                    to: "/brightMark",
                },
                {
                    title: "聚合数据",
                    to: "/polymerization",
                },
                {
                    title: "绘制点、线、面",
                    to: "/basicDraw",
                },
                {
                    title: "绘制图形",
                    to: "/drawGraph",
                },
                {
                    title: "自由绘制图形",
                    to: "/freeDrawing",
                },
                {
                    title: "带箭头的线段 ",
                    to: "/arrowLine",
                },
                {
                    title: "修改已绘制的图形",
                    to: "/snapGraph",
                },
                {
                    title: "计算长度",
                    to: "/calculatedLength",
                },
                {
                    title: "计算面积",
                    to: "/calculatedArea",
                },
                {
                    title: "绘制图形Element",
                    to: "/drawGraphPro",
                },
                {
                    title: "绘制长度和面基",
                    to: "/calculated",
                },
                {
                    title: "轨迹回放",
                    to: "/trackPlayback",
                },
                {
                    title: "添加水印",
                    to: "/waterMark",
                },
            ],
        };
    },
};
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
