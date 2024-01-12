<!--
 * @Author: “chenjinwei” “507725948@qq.com”
 * @Date: 2023-10-13 08:44:52
 * @LastEditors: “chenjinwei” “507725948@qq.com”
 * @LastEditTime: 2023-10-13 10:44:12
 * @FilePath: \openlayers-demo\vue2-openlayers\src\views\graticule\Graticule.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="vm">
        <h2 class="h-title">网格 Graticule</h2>
        <div id="map" class="map-x"></div>
    </div>
</template>

<script>
import "ol/ol.css";
import { Map, View } from "ol";
import Stroke from "ol/style/Stroke";
import Tile from "ol/layer/Tile";
import Graticule from "ol/layer/Graticule";
import BingMaps from "ol/source/BingMaps";
import { fromLonLat } from "ol/proj";

export default {
    name: "Graticule",
    data() {
        return {
            map: null,
        };
    },
    methods: {
        initMap() {
            // 初始化地图
            this.map = new Map({
                target: "map",
                layers: [
                    new Tile({
                        source: new BingMaps({
                            key:
                                "AiZrfxUNMRpOOlCpcMkBPxMUSKOEzqGeJTcVKUrXBsUdQDXutUBFN3-GnMNSlso-",
                            imagerySet: "Road",
                        }),
                    }),
                ],
                view: new View({
                    // projection: "EPSG:4326",
                    center: fromLonLat([114.064839, 22.548857]),
                    zoom: 6,
                }),
            });

            let graticule = new Graticule({
                strokeStyle: new Stroke({
                    color: "rgba(255, 120, 0, .5)", // 线条颜色
                    width: 2, // 线条宽度
                    lineDash: [4], // 虚线，每隔4像素
                }),
                showLabels: true,
            });

            graticule.setMap(this.map);
        },
    },
    mounted() {
        this.initMap();
    },
};
</script>

<style></style>
