<template>
    <nav id="nav">
        <router-link class="link" to="/" active-class="active" exact tag="div">
            创建地图 map
        </router-link>
        <router-link
            v-for="(nav, index) in navList"
            :key="index"
            class="link"
            :to="nav.to"
            active-class="active"
            tag="div"
        >
            {{ nav.title }}
        </router-link>
    </nav>
</template>

<script>
export default {
    name: "rootNav",
    data() {
        return {
            navList: [
                {
                    title: "弹窗 popup",
                    to: "/popup",
                },
                {
                    title: "标记 marker",
                    to: "/mapMarker",
                },
                {
                    title: "地图缩放级别 zoom",
                    to: "/zoom",
                },
                {
                    title: "单击激活地图 tabindex",
                    to: "/tabindex",
                },
                {
                    title: "切换地图容器 changeTarget",
                    to: "/changeTarget",
                },
                {
                    title: "同步两个地图 synchronization",
                    to: "/synchronization",
                },
                {
                    title: "预加载 preload",
                    to: "/preloadMap",
                },
                {
                    title: "矢量图 JSON",
                    to: "/vectorJSON",
                },
                {
                    title: "矢量图 高亮",
                    to: "/vectorHigh",
                },
                {
                    title: "旋转 rotation",
                    to: "/rotationMap",
                },
                {
                    title: "鼠标拖拽旋转/缩放 mouseRotationMap",
                    to: "/mouseRotationMap",
                },
                {
                    title: "动画 animate",
                    to: "/viewAnimate",
                },
                {
                    title: "网格 Graticule",
                    to: "/graticule",
                },
                {
                    title: "热力图 Heatmap",
                    to: "/heatmap",
                },
                {
                    title: "比例尺控件 ScaleLine",
                    to: "/scaleLine",
                },
                {
                    title: "全屏控件 FullScreen",
                    to: "/fullScreen",
                },
                {
                    title: "导览控件 ZoomToExtent",
                    to: "/zoomToExtent",
                },
                {
                    title: "总览控件 OverviewMap",
                    to: "/overviewMap",
                },
                {
                    title: "鼠标位置控件 MousePosition",
                    to: "/mousePosition",
                },
                {
                    title: "缩放滑块控件 ZoomSlider",
                    to: "/zoomSlider",
                },
                {
                    title: "图层组 Group",
                    to: "/layerSet",
                },
                {
                    title: "控制图层层叠关系 Set zIndex",
                    to: "/setZIndex",
                },
                {
                    title: "限制分辨率 setResolution",
                    to: "/setResolution",
                },
                {
                    title: "按限制范围加载图层 setExtent",
                    to: "/setExtent",
                },
                {
                    title: "图层遮罩效果 coverageModal",
                    to: "/coverageModal",
                },
                {
                    title: "设置图层的源 setSource",
                    to: "/setSource",
                },
                {
                    title: "简单的标记 simplenessLabel",
                    to: "/simplenessLabel",
                },
                {
                    title: "定义标记颜色 brightMark",
                    to: "/brightMark",
                },
                {
                    title: "聚合数据 polymerization",
                    to: "/polymerization",
                },
                {
                    title: "绘制点、线、面 basicDraw",
                    to: "/basicDraw",
                },
                {
                    title: "绘制图形 drawGraph",
                    to: "/drawGraph",
                },
                {
                    title: "自由绘制图形 freeDrawing",
                    to: "/freeDrawing",
                },
                {
                    title: "带箭头的线段 arrowLine",
                    to: "/arrowLine",
                },
                {
                    title: "修改已绘制的图形 snapGraph",
                    to: "/snapGraph",
                },
                {
                    title: "计算长度 calculatedLength",
                    to: "/calculatedLength",
                },
                {
                    title: "计算面积 calculatedArea",
                    to: "/calculatedArea",
                },
                {
                    title: "绘制图形Element drawGraphPro",
                    to: "/drawGraphPro",
                },
                {
                    title: "绘制长度和面基 calculated",
                    to: "/calculated",
                },
                {
                    title: "轨迹回放 trackPlayback",
                    to: "/trackPlayback",

                },
                {
                    title: "添加水印 waterMark",
                    to: "/waterMark",

                }
            ],
        };
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/varibles.scss";

#nav {
    min-width: 200px;
    height: 100vh;
    overflow: auto;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    margin-right: 20px;
    border-right: 1px solid #eee;
}

.link {
    padding: 10px;
    border-bottom: 1px dashed #ccc;
    text-decoration: none;
    color: $darkTextColor;
    cursor: pointer;
}

.active {
    background: $abgColor;
    color: #fff;
    border-bottom: none;
}
</style>
