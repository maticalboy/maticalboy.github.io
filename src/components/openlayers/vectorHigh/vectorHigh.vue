<template>
    <div class="vm">
        <h2 class="h-title">矢量图 - 高亮模块</h2>
        <div ref="info"></div>
        <div id="map" class="map-x"></div>
    </div>
</template>

<script>
import "ol/ol.css";
import { Map, View } from "ol";
import { Style, Fill, Stroke, Text } from "ol/style";
import LayerVector from "ol/layer/Vector";
import SourceVector from "ol/source/Vector";
import lands from "@/assets/data/openlayers/lands.json";
import GeoJSON from "ol/format/GeoJSON";
import { fromLonLat } from "ol/proj";

export default {
    data() {
        return {
            map: null,
            highlightStyle: new Style({
                stroke: new Stroke({
                    color: "#f00",
                    width: 1,
                }),
                fill: new Fill({
                    color: "rgba(255, 0, 0, 0.1)",
                }),
                text: new Text({
                    font: "12px Calibri, sans-serif",
                    fill: new Fill({
                        color: "#000",
                    }),
                    stroke: new Stroke({
                        color: "#f00",
                        width: 3,
                    }),
                }),
            }),
            highlight: null,
            featureOverlay: null,
        };
    },
    methods: {
        displayFeatureInfo(pixel) {
            // 创建高亮图层
            if (!this.featureOverlay) {
                this.featureOverlay = new LayerVector({
                    source: new SourceVector(),
                    map: this.map,
                    style: (feature) => {
                        this.highlightStyle
                            .getText()
                            .setText(feature.get("name"));
                        return this.highlightStyle;
                    },
                });
            }
            // 获取点击的要素
            let feature = this.map.forEachFeatureAtPixel(
                pixel,
                (feature) => feature
            );
            let info = this.$refs.info;
            // 获取要素信息
            if (feature) {
                info.innerHTML = feature.getId() + ": " + feature.get("name");
            } else {
                info.innerHTML = "&nbsp;";
            }
            // 设置高亮要素
            if (feature !== this.highlight) {
                if (this.highlight) {
                    this.featureOverlay
                        .getSource()
                        .removeFeature(this.highlight);
                }
                if (feature) {
                    this.featureOverlay.getSource().addFeature(feature);
                }
                this.highlight = feature;
            }
        },
        initMap() {
            let style = new Style({
                fill: new Fill({
                    color: "rgba(255, 255, 255, 0.6)",
                }),
                stroke: new Stroke({
                    color: "#319FD3",
                    width: 1,
                }),
                text: new Text({
                    font: "12px Calibri,sans-serif",
                    fill: new Fill({
                        color: "#000",
                    }),
                    stroke: new Stroke({
                        color: "#fff",
                        width: 3,
                    }),
                }),
            });

            let vectorLayer = new LayerVector({
                source: new SourceVector({
                    features: new GeoJSON({
                        featureProjection: "EPSG:3857",
                    }).readFeatures(lands),
                    format: new GeoJSON(),
                    wrapX: true,
                }),
                style: (feature) => {
                    style.getText().setText(feature.get("name"));
                    return style;
                },
            });

            this.map = new Map({
                target: "map",
                layers: [vectorLayer],
                view: new View({
                    // projection: "EPSG:4326",
                    center: fromLonLat([0, 0]),
                    zoom: 1,
                }),
            });

            this.map.on("pointermove", (evt) => {
                if (evt.dragging) {
                    return;
                }
                let pixel = this.map.getEventPixel(evt.originalEvent);
                this.displayFeatureInfo(pixel);
            });

            this.map.on("click", (evt) => {
                this.displayFeatureInfo(evt.pixel);
            });
        },
    },
    mounted() {
        this.initMap();
    },
};
</script>

<style></style>
