<!--
 * @Author: “chenjinwei” “507725948@qq.com”
 * @Date: 2023-10-13 08:44:52
 * @LastEditors: “chenjinwei” “507725948@qq.com”
 * @LastEditTime: 2023-10-13 10:34:59
 * @FilePath: \openlayers-demo\vue2-openlayers\src\views\mouseRotationMap\mouseRotationMap.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="vm">
        <h2 class="h-title">鼠标拖拽旋转/缩放</h2>
        <div>按住Shift并使用鼠标拖拽可以旋转、缩放地图</div>
        <div ref="map" class="map-x"></div>
    </div>
</template>

<script>
import "ol/ol.css";
import { Map, View } from "ol";
import Tile from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import DragRotateAndZoom from "ol/interaction/DragRotateAndZoom";
import * as olInteraction from "ol/interaction";

export default {
    data() {
        return {
            map: null,
        };
    },
    methods: {
        initMap() {
            this.map = new Map({
                target: this.$refs.map,
                interactions: olInteraction
                    .defaults()
                    .extend([new DragRotateAndZoom()]),
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
                    center: [0, 0],
                    zoom: 2,
                }),
            });
        },
    },
    mounted() {
        this.initMap();
    },
};
</script>

<style></style>
