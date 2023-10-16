<!--
 * @Author: “chenjinwei” “507725948@qq.com”
 * @Date: 2023-10-13 08:44:52
 * @LastEditors: “chenjinwei” “507725948@qq.com”
 * @LastEditTime: 2023-10-13 10:32:17
 * @FilePath: \openlayers-demo\vue2-openlayers\src\views\rotationMap\RotationMap.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="vm">
        <h2 class="h-title">旋转 rotation</h2>
        <div id="map" class="map-x"></div>
        <div class="btn-x">
            <button @click="rotateLeft">↻</button>
            <button @click="rotateRight">↺</button>
        </div>
    </div>
</template>

<script>
import "ol/ol.css";
import { Map, View } from "ol";
import Tile from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import { fromLonLat } from 'ol/proj';

export default {
    name: "RotationMap",
    data() {
        return {
            map: null,
        };
    },
    methods: {
        initMap() {
            this.map = new Map({
                target: "map",
                layers: [
                    new Tile({
                        name: "defaultLayer",
                        source: new XYZ({
                            url:
                                "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",
                        }),
                    }),
                ],
                view: new View({
                    // projection: "EPSG:4326", // 坐标系，有EPSG:4326和EPSG:3857
                    center: fromLonLat([114.064839, 22.548857]), // 深圳坐标
                    rotation: 0,
                    zoom: 6, // 地图缩放级别（打开页面时默认级别）
                }),
            });
        },
        rotateLeft() {
            let currentRotation = this.map.getView().getRotation();
            this.map.getView().setRotation(currentRotation + 1);
        },
        rotateRight() {
            let currentRotation = this.map.getView().getRotation();
            this.map.getView().setRotation(currentRotation - 1);
        },
    },
    mounted() {
        this.initMap();
    },
};
</script>

<style lang="scss" scoped>
.btn-x {
    text-align: center;
    margin-top: 20px;

    button {
        margin: 0 10px;
    }
}
</style>
