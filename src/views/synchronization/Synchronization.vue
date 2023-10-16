<template>
    <div class="vm">
        <h2 class="h-title">同步两个地图</h2>
        <div class="map-bx">
            <div id="Map" class="map-x"></div>
            <div id="BingMaps" class="map-x"></div>
        </div>

        <div class="explain">
            <p>
                两个地图使用同一个view，所以在移动、缩放、旋转等操作都是同步的。
            </p>
            <p>按住shift，鼠标在地图上选区，可以放大选区。</p>
            <p>按住alt+shift，鼠标可以在地图上拖拽，进行旋转。</p>
        </div>
    </div>
</template>

<script>
import "ol/ol.css";
import { Map, View } from "ol";
import Tile from "ol/layer/Tile";
import XYZ from "ol/source/XYZ.js";
import BingMaps from "ol/source/BingMaps";

export default {
    name: "ChangeTarget",
    data() {
        return {
            mapO: null,
            mapB: null,
            mapView: new View({
                center: [0, 0],
                zoom: 2,
            }),
            layerO: [
                // 图层
                new Tile({
                    source: new XYZ({
                        url:
                            "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",
                        wrapX: false,
                    }),
                }),

            ],
            layerB: new Tile({
                source: new BingMaps({
                    key:
                        "AiZrfxUNMRpOOlCpcMkBPxMUSKOEzqGeJTcVKUrXBsUdQDXutUBFN3-GnMNSlso-",
                    imagerySet: "Aerial",
                }),
            }),
        };
    },
    methods: {
        initMap() {
            // 设置 Map 地图
            this.mapO = new Map({
                target: "Map",
                layers: this.layerO,
                view: this.mapView,
            });

            // 设置 BingMaps 地图
            this.mapB = new Map({
                target: "BingMaps",
                layers: [this.layerB],
                view: this.mapView,
            });
        },
    },
    mounted() {
        this.initMap();
    },
};
</script>

<style lang="scss" scoped>
.map-bx {
    width: 800px;
    height: 380px;
    margin: 0 auto 40px;
    display: flex;
}

.map-x {
    width: 380px;
    height: 380px;
    position: relative;
}

#OSM::after,
#BingMaps::after {
    position: absolute;
    display: block;
    font-size: 18px;
    left: 50%;
    bottom: -28px;
    transform: translateX(-50%);
}

#OSM::after {
    content: "OSM";
}

#BingMaps::after {
    content: "BingMap";
}
</style>
