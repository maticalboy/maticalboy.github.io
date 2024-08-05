<template>
    <div style="height: 100%">
        <div id="map" class="map"></div>
        <vue-drag-resize
            :h="30"
            :isActive="false"
            :isDraggable="true"
            :isResizable="false"
            :minh="1"
            :minw="1"
            :stickSize="6"
            :w="688"
            :x="600"
            :y="37"
            :z="1000"
            key="toolCreateFeature"
            style="border: 0; background-color: #fff"
        >
            <div class="toolbar">
                <div style="display: flex; align-items: center">
                    <el-select
                        placeholder="请选择图层"
                        size="mini"
                        v-model="currentLayerId"
                        class="custom-select-color"
                    >
                        <el-option
                            v-for="item in layers"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        >
                        </el-option>
                    </el-select>
                    <el-select
                        placeholder="请选择绘制方式"
                        size="mini"
                        v-model="currentDrawGraphicType"
                        class="custom-select-color"
                        @change="changeDrawGraphicType"
                    >
                        <el-option
                            v-for="item in DrawGraphicTypeList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        >
                        </el-option>
                    </el-select>
                    <el-select
                        placeholder="请选择绘制模式"
                        size="mini"
                        v-model="currentDrawMode"
                        class="custom-select-color"
                        @change="changeDrawGraphicType"
                    >
                        <el-option
                            v-for="item in DrawModeList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        >
                        </el-option>
                    </el-select>
                </div>
                <div class="buttons">
                    <div @click="startDraw" :class="{ selected: drawStatus }">
                        <span>绘</span>
                    </div>
                    <div @click="closeDraw">
                        <span>关</span>
                    </div>
                    <div @click="save" :class="{ selected: saveStatus }">
                        <span>保</span>
                    </div>
                    <div @click="remove">
                        <span>移</span>
                    </div>
                    <div @click="removeAll">
                        <span>全</span>
                    </div>
                    <div @click="clear">
                        <span>清</span>
                    </div>
                    <div @click="visible" :class="{ selected: visibleStatus }">
                        <span>见</span>
                    </div>
                    <div @click="handleSelectedFeature">
                        <span>处</span>
                    </div>
                </div>
                <el-color-picker
                    v-model="color"
                    show-alpha
                    :predefine="predefineColors"
                    @change="changeColor"
                >
                </el-color-picker>
            </div>
        </vue-drag-resize>
    </div>
</template>
<script>
import "ol/ol.css";
import View from "ol/View";
import Map from "ol/Map";
import TileLayer from "ol/layer/Tile";
import Overlay from "ol/Overlay";
import XYZ from "ol/source/XYZ";
import {
    Vector as SourceVec,
    Cluster,
    Vector as VectorSource,
} from "ol/source";
import { Feature } from "ol";
import { Vector as LayerVec, Vector as VectorLayer } from "ol/layer";
import { Point, LineString, Polygon } from "ol/geom";

import {
    Style,
    Icon,
    Fill,
    Stroke,
    Text,
    Circle as CircleStyle,
} from "ol/style";
import { OSM, TileArcGISRest } from "ol/source";
import ExtTransform from "ol-ext/interaction/Transform";

import VueDragResize from "vue-drag-resize";
export default {
    components: {
        VueDragResize,
    },
    data() {
        return {
            map: null,
            center: [116.39702518856394, 39.918590567855425], //北京故宫的经纬度
            centerSize: 11.5,
            projection: "EPSG:4326",
            layers: [],
            currentLayer: null,
            currentLayerId: undefined,
            currentDrawGraphicType: "Square",
            DrawGraphicTypeList: [
                {
                    id: "Square",
                    name: "矩形",
                },
                {
                    id: "circle",
                    name: "圆形",
                },
                {
                    id: "polygon",
                    name: "多边形",
                },
                {
                    id: "lasso",
                    name: "套索",
                },
            ],
            currentDrawMode: "new",
            DrawModeList: [
                {
                    id: "new",
                    name: "新建",
                },
                {
                    id: "merge",
                    name: "融合",
                },
                {
                    id: "resection",
                    name: "切除",
                },
                {
                    id: "intersection",
                    name: "交集",
                },
            ],
            drawStatus: false,
            saveStatus: true,
            visibleStatus: true,
            color: "rgba(255, 69, 0, 0.68)",
            predefineColors: [
                "#ff4500",
                "#ff8c00",
                "#ffd700",
                "#90ee90",
                "#00ced1",
                "#1e90ff",
                "#c71585",
                "rgba(255, 69, 0, 0.68)",
                "rgb(255, 120, 0)",
                "hsv(51, 100, 98)",
                "hsva(120, 40, 94, 0.5)",
                "hsl(181, 100%, 37%)",
                "hsla(209, 100%, 56%, 0.73)",
                "#c7158577",
            ],
        };
    },
    mounted() {
        this.initMap();
        // this.createPolygon();
        // this.onEdit();
    },
    methods: {
        handleSelectedFeature() {},
        startDraw() {
            this.$global.drawInteraction.currentDrawGraphicType =
                this.currentDrawGraphicType;
            this.$global.drawInteraction.currentDrawMode = this.currentDrawMode;
            this.$global.drawInteraction.setActive(true);
            this.drawStatus = true;
        },
        closeDraw() {
            this.$global.drawInteraction.setActive(false);
            this.drawStatus = false;
        },
        save() {
            this.$global.drawInteraction.save =
                !this.$global.drawInteraction.save;
            this.saveStatus = this.$global.drawInteraction.save;
        },
        visible() {
            this.$global.drawInteraction.visible =
                !this.$global.drawInteraction.visible;
            this.visibleStatus = this.$global.drawInteraction.visible;
            this.$global.drawInteraction.vectorLayer.setVisible(
                this.$global.drawInteraction.visible
            );
        },
        clear() {
            let vectorLayer = this.$global.drawInteraction.vectorLayer;
            // 首先获取当前选中的feature
            let currentFeatures = vectorLayer
                .getSource()
                .getFeatures()
                .filter((item) => {
                    return item.get("selected");
                });
            if (!currentFeatures.length) return;
            currentFeatures[0].set("selected", false);
        },
        changeDrawGraphicType() {
            this.$global.drawInteraction.currentDrawGraphicType =
                this.currentDrawGraphicType;
            this.$global.drawInteraction.currentDrawMode = this.currentDrawMode;
            this.$global.drawInteraction.initDrawInteraction(
                this.currentDrawGraphicType
            );
        },
        remove() {
            let vectorLayer = this.$global.drawInteraction.vectorLayer;
            // 首先获取当前选中的feature
            let currentFeatures = vectorLayer
                .getSource()
                .getFeatures()
                .filter((item) => {
                    return item.get("selected");
                });
            if (!currentFeatures.length) return;
            vectorLayer.getSource().removeFeature(currentFeatures[0]);
        },
        removeAll() {
            let vectorLayer = this.$global.drawInteraction.vectorLayer;
            vectorLayer.getSource().clear();
        },
        changeColor(color) {
            this.$global.drawInteraction.defaultColor = color;
        },
        //初始化地图
        initMap() {
            this.map = new Map({
                target: "map", // 对应页面里 id 为 map 的元素
                layers: [
                    // 图层
                    new TileLayer({
                        source: new XYZ({
                            url: "http://t0.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=49d0c416ba07ffa62dbf768c6f733645",
                            wrapX: false,
                        }),
                    }),
                    new TileLayer({
                        source: new XYZ({
                            url: "http://t0.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=49d0c416ba07ffa62dbf768c6f733645",
                            wrapX: false,
                        }),
                    }),
                ],
                view: new View({
                    // 地图视图
                    projection: "EPSG:4326", // 坐标系，有EPSG:4326和EPSG:3857
                    center: [116.064839, 40.548857], // 深圳坐标
                    minZoom: 6, // 地图缩放最小级别
                    zoom: 8, // 地图缩放级别（打开页面时默认级别）
                }),
            });
            this.$nextTick(() => {
                this.map.addInteraction(this.$global.drawInteraction);
                this.$global.drawInteraction.initVectorLayer();
                this.$global.drawInteraction.initDrawInteraction(
                    this.currentDrawGraphicType
                );
            });
        },
        //创建多边形
        createPolygon() {
            //添加图层，并设置点范围
            const polygon = new Feature({
                geometry: new Polygon([
                    [
                        [116.39314093500519, 40.0217660530101],
                        [116.47762344990831, 39.921746523871924],
                        [116.33244947314951, 39.89892653421418],
                        [116.30623076162784, 40.00185925352143],
                    ],
                ]),
            });
            //设置样式
            polygon.setStyle(
                new Style({
                    stroke: new Stroke({
                        width: 4,
                        color: [255, 0, 0, 1],
                    }),
                })
            );
            //将图形加到地图上
            this.map.addLayer(
                new VectorLayer({
                    source: new VectorSource({
                        features: [polygon],
                    }),
                })
            );
        },
        //操作事件
        onEdit() {
            let dragLayer = this.dragLayer;
            const transform = new ExtTransform({
                enableRotatedTransform: false,
                hitTolerance: 2,
                translate: true, // 拖拽
                stretch: false, // 拉伸
                scale: true, // 缩放
                rotate: true, // 旋转
                translateFeature: false,
                noFlip: true,
                layers: [dragLayer],
            });
            this.map.addInteraction(transform);

            //开始事件
            transform.on(["rotatestart", "translatestart"], function (e) {
                // Rotation
                let startangle = e.feature.get("angle") || 0;
                // Translation
                console.log(1111);
                console.log(startangle);
            });
            //旋转
            transform.on("rotating", function (e) {
                console.log(2222);
                console.log(
                    "rotate: " +
                        (
                            (((e.angle * 180) / Math.PI - 180) % 360) +
                            180
                        ).toFixed(2)
                );
                console.log(e);
            });
            //移动
            transform.on("translating", function (e) {
                console.log(3333);
                console.log(e.delta);
                console.log(e);
            });
            //拖拽事件
            transform.on("scaling", function (e) {
                console.log(4444);
                console.log(e.scale);
                console.log(e);
            });
            //事件结束
            transform.on(
                ["rotateend", "translateend", "scaleend"],
                function (e) {
                    console.log(5555);
                }
            );
        },
    },
};
</script>
<style lang="less" scoped>
#map {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
}
@img-height: 30px;
.toolbar {
    width: 688px;
    background-color: #fff;
    box-shadow: 0 0 7px 1px rgba(0, 0, 0, 0.2);
    border-radius: 2px;
    padding: 4px 8px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    .buttons {
        flex: 1;
        display: flex;
        margin-left: 2px;
        justify-content: space-evenly;
        align-items: center;
        line-height: @img-height;

        div:not(.el-divider.el-divider--vertical) {
            width: 22px;
            height: 22px;
            display: flex;
            justify-content: center;
            align-items: center;
            box-sizing: border-box;

            &:hover {
                background-color: rgba(51, 112, 255, 0.05);
                cursor: pointer;
            }
        }
        .selected {
            background-color: aquamarine;
            &:hover {
                background-color: aquamarine !important;
            }
        }
    }
}
</style>
