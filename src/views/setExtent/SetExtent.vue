<template>
    <div class="vm">
        <h2 class="h-title">按限制范围加载图层</h2>
        <button @click="replaceTheRegion('India')">印度</button>
        <button @click="replaceTheRegion('Argentina')">阿根廷</button>
        <button @click="replaceTheRegion('Nigeria')">尼日利亚</button>
        <button @click="replaceTheRegion('Sweden')">瑞典</button>
        <div id="map" class="map-x"></div>
    </div>
</template>

<script>
import "ol/ol.css";
import { Map, View } from "ol";
import Tile from "ol/layer/Tile";
import XYZ from "ol/source/XYZ.js";
import { fromLonLat } from 'ol/proj';

export default {
    name: "SetExtent",
    data() {
        return {
            map: null,
            India: [68.17665, 7.96553, 97.40256, 35.49401],
            Argentina: [-73.41544, -55.25, -53.62835, -21.83231],
            Nigeria: [2.6917, 4.24059, 14.57718, 13.86592],
            Sweden: [11.02737, 55.36174, 23.90338, 69.10625],
            overlay: new Tile({
                source: new XYZ({
                    url:
                        "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",
                    wrapX: false,
                }),
                extent:[68.17665, 7.96553, 97.40256, 35.49401]
            }),
        };
    },
    methods: {
        initMap() {
            this.map = new Map({
                target: "map",
                layers: [
                    new Tile({
                        source: new XYZ({
                            url:
                                "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",
                            wrapX: false,
                        }),
                        extent:[-1730.41544,-55.36174,970.40256,690.10625]
                    }),
                    this.overlay, // 显示指定范围的图层
                ],
                view: new View({
                    projection: "EPSG:4326",
                    center: ([0, 0]),
                    zoom: 1,
                }),
            });
        },
        replaceTheRegion(data) {
            // 更改显示的国家
            this.overlay.setExtent(this[data]);
        },
    },
    mounted() {
        this.initMap();
    },
};
</script>

<style></style>
