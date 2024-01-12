<!--
 * @Author: “chenjinwei” “507725948@qq.com”
 * @Date: 2023-10-13 08:44:52
 * @LastEditors: “chenjinwei” “507725948@qq.com”
 * @LastEditTime: 2023-10-13 11:02:22
 * @FilePath: \openlayers-demo\vue2-openlayers\src\views\fullScreen\FullScreen.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="vm">
        <h2 class="h-title">全屏控件 FullScreen</h2>
        <div id="map" class="map-x"></div>
    </div>
</template>

<script>
import "ol/ol.css";
import { Map, View } from "ol";
import Tile from "ol/layer/Tile";
import BingMaps from "ol/source/BingMaps";
import * as control from "ol/control";

export default {
    name: "FullScreen",
    data() {
        return {
            map: null,
        };
    },
    methods: {
        initMap() {
            this.map = new Map({
                target: "map",
                controls: control.defaults().extend([new control.FullScreen()]),
                layers: [
                    new Tile({
                        source: new BingMaps({
                            key:
                                "AiZrfxUNMRpOOlCpcMkBPxMUSKOEzqGeJTcVKUrXBsUdQDXutUBFN3-GnMNSlso-",
                            imagerySet: "Aerial",
                        }),
                    }),
                ],
                view: new View({
                    center: [0, 0],
                    zoom: 6, // 地图缩放级别（打开页面时默认级别）
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
