<!--
 * @Author: “chenjinwei” “507725948@qq.com”
 * @Date: 2023-10-13 08:44:52
 * @LastEditors: “chenjinwei” “507725948@qq.com”
 * @LastEditTime: 2023-10-13 15:01:16
 * @FilePath: \openlayers-demo\vue2-openlayers\src\views\setSource\SetSource.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="vm">
        <h2 class="h-title">设置图层的源 setSource</h2>
        <button @click="setSource('osm')">设置为XZY</button>
        <button @click="setSource('bing')">设置为BingMaps</button>
        <div id="map" class="map-x"></div>
    </div>
</template>

<script>
import "ol/ol.css";
import { Map, View } from "ol";
import Tile from "ol/layer/Tile";
import { XYZ, BingMaps } from "ol/source";
import { fromLonLat } from 'ol/proj';

export default {
    name: "SetSource",
    data() {
        return {
            map: null,
            osm: new XYZ({
                url:
                    "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",
            }),
            bing: new BingMaps({
                key:
                    "AiZrfxUNMRpOOlCpcMkBPxMUSKOEzqGeJTcVKUrXBsUdQDXutUBFN3-GnMNSlso-",
                imagerySet: "Aerial",
            }),
            layer: new Tile(),
        };
    },
    methods: {
        initMap() {
            this.map = new Map({
                target: "map",
                layers: [this.layer],
                view: new View({
                    // projection: "EPSG:4326", // 坐标系，有EPSG:4326和EPSG:3857
                    center:fromLonLat([114.064839, 22.548857]) , // 深圳坐标
                    zoom: 12, // 地图缩放级别（打开页面时默认级别）
                }),
            });
            this.layer.setSource(this.osm);
        },

        // 设置图层源
        setSource(data) {
            this.layer.setSource(this[data]);
        },
    },
    mounted() {
        this.initMap();
    },
};
</script>

<style></style>
