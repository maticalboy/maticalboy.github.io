<template>
    <div class="vm">
        <h2 class="h-title">鼠标位置控件 MousePosition</h2>
        <div id="map" class="map-x"></div>
        <div ref="mousePositionTxt"></div>
    </div>
</template>

<script>
import "ol/ol.css";
import { Map, View } from "ol";
import Tile from "ol/layer/Tile";
import BingMaps from "ol/source/BingMaps";
import * as control from "ol/control";
import * as coordinate from "ol/coordinate";
import { fromLonLat } from 'ol/proj';

export default {
    name: "ZoomToExtent",
    data() {
        return {
            map: null,
        };
    },
    methods: {
        initMap() {
            console.log(coordinate);
            this.map = new Map({
                target: "map",
                controls: control.defaults().extend([
                    new control.MousePosition({
                        coordinateFormat: coordinate.createStringXY(4),
                        projection: "EPSG:4326",
                        target: this.$refs.mousePositionTxt,
                    }),
                ]),
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
                    // projection: "EPSG:4326", // 坐标系，有EPSG:4326和EPSG:3857
                    center: fromLonLat([114.064839, 22.548857]),
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
