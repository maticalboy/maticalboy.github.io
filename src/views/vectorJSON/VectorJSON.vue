<!--
 * @Author: “chenjinwei” “507725948@qq.com”
 * @Date: 2023-10-13 08:44:52
 * @LastEditors: “chenjinwei” “507725948@qq.com”
 * @LastEditTime: 2023-10-13 09:53:58
 * @FilePath: \openlayers-demo\vue2-openlayers\src\views\vectorJSON\VectorJSON.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="vm">
        <h2 class="h-title">矢量图 JSON</h2>
        <div id="map" class="map-x"></div>

        <div class="explain"></div>
    </div>
</template>

<script>
import "ol/ol.css";
import CN from "@/assets/data/MapOfChina.json";
import { Map, View } from "ol";
import SourceVector from "ol/source/Vector";
import LayerVector from "ol/layer/Vector";
import GeoJSON from "ol/format/GeoJSON";
import { fromLonLat } from "ol/proj";

export default {
    name: "VectorJSON",
    data() {
        return {
            map: null,
            source: new SourceVector({
                features: new GeoJSON({
                    featureProjection: "EPSG:3857",
                }).readFeatures(CN), //读取Geojson
                format: new GeoJSON(),
                wrapX: true,
            }),

            view: new View({
                // projection: "EPSG:4326",
                center: fromLonLat([116.403963, 39.915119]), // 中国
                zoom: 3,
            }),
        };
    },
    methods: {
        initMap() {
            this.map = new Map({
                target: "map",
                layers: [
                    new LayerVector({
                        source: this.source,
                    }),
                ],
                view: this.view,
            });
        },
    },
    mounted() {
        this.initMap();
    },
};
</script>

<style></style>
