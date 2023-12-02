<!--
 * @Author: “chenjinwei” “507725948@qq.com”
 * @Date: 2023-10-13 08:44:52
 * @LastEditors: “chenjinwei” “507725948@qq.com”
 * @LastEditTime: 2023-10-13 08:59:14
 * @FilePath: \openlayers-demo\vue2-openlayers\src\views\firstMap\FirstMap.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="vm">
        <h2 class="h-title">第一个地图</h2>
        <div id="map" class="map-x"></div>
        <div class="explain">
            <p>
                Map：地图容器，核心部分，可加载各类地图与功能控件，用于渲染、表现动态地图。
            </p>
            <p>target：目标元素</p>
            <p>
                layers：图层，包含多个调用数据的子类，由子类的实例加载地图数据，必须结合图层数据源匹配使用。
            </p>
            <p>
                view：地图视图，控制地图缩放等基本交互，以及地图投影坐标系、地图中心点、分辨率、旋转角度等。
            </p>
        </div>
    </div>
</template>

<script>
import "ol/ol.css";
import { Map, View } from "ol";
import Tile from "ol/layer/Tile";
import XYZ from "ol/source/XYZ.js";

export default {
    name: "FirstMap",
    data() {
        return {
            map: null,
        };
    },
    methods: {
        initMap() {
            // 地图实例
            this.map = new Map({
                target: "map", // 对应页面里 id 为 map 的元素
                layers: [
                    // 图层
                    new Tile({
                        source: new XYZ({
                            url:
                                "http://t0.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=49d0c416ba07ffa62dbf768c6f733645",
                            wrapX: false,
                        }),
                    }),
                    new Tile({
                        source: new XYZ({
                            url:
                                "http://t0.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=49d0c416ba07ffa62dbf768c6f733645",
                            wrapX: false,
                        }),
                    }),
                ],
                view: new View({
                    // 地图视图
                    projection: "EPSG:4326", // 坐标系，有EPSG:4326和EPSG:3857
                    center: [114.064839, 22.548857], // 深圳坐标
                    minZoom: 10, // 地图缩放最小级别
                    zoom: 12, // 地图缩放级别（打开页面时默认级别）
                }),
            });
        },
    },
    mounted() {
        this.initMap();
    },
};
</script>

<style lang="scss" scoped></style>
