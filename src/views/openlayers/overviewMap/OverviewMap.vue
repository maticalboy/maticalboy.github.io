<template>
    <div class="vm">
        <h2 class="h-title">总览控件（鹰眼、小地图） OverviewMap</h2>
        <div id="map" class="map-x"></div>
    </div>
</template>

<script>
import "ol/ol.css";
import { Map, View } from "ol";
import Tile from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import * as control from "ol/control";
import * as olInteraction from "ol/interaction";
import { fromLonLat } from "ol/proj";

export default {
    name: "OverviewMap",
    data() {
        return {
            map: null,
        };
    },
    methods: {
        initMap() {
            let overviewMapControl = new control.OverviewMap({
                className: "ol-overviewmap ol-custom-overviewmap",
                layers: [
                    new Tile({
                        name: "defaultLayer",
                        source: new XYZ({
                            url:
                                "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",
                        }),
                    }),
                ],
                collapseLabel: "\u00BB",
                label: "\u00AB",
                collapsed: false,
            });

            this.map = new Map({
                target: "map",
                controls: control.defaults().extend([overviewMapControl]),
                interactions: olInteraction
                    .defaults()
                    .extend([new olInteraction.DragRotateAndZoom()]),
                layers: [
                    new Tile({
                        source: new XYZ({
                            url:
                                "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",
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
        console.log(olInteraction);
    },
};
</script>

<style lang="scss" scoped>
::v-deep .ol-custom-overviewmap,
::v-deep .ol-custom-overviewmap.ol-uncollapsible {
    bottom: auto;
    left: auto;
    right: 0;
    top: 0;
}

::v-deep .ol-custom-overviewmap:not(.ol-collapsed) {
    border: 1px solid black;
}

::v-deep .ol-custom-overviewmap .ol-overviewmap-map {
    border: none;
    width: 300px;
}

::v-deep .ol-custom-overviewmap .ol-overviewmap-box {
    border: 2px solid red;
}

::v-deep .ol-custom-overviewmap:not(.ol-collapsed) button {
    bottom: auto;
    left: auto;
    right: 1px;
    top: 1px;
}

::v-deep .ol-rotate {
    top: 170px;
    right: 0;
}
</style>
