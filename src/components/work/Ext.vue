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
                    <div @click="drag" :class="{ selected: dragStatus }">
                        <span>托</span>
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
import XYZ from "ol/source/XYZ";
import {
    Vector as SourceVec,
    Cluster,
    Vector as VectorSource,
    ImageStatic,
} from "ol/source";

import VueDragResize from "vue-drag-resize";
import dragInteraction from "@/utils/openlayers/HAEditDragInteraction";
// import HARasterScheme from "HAStyleComponent/src/style/HARasterScheme";
import tifInfo from "@/assets/data/openlayers/tif.json";
import { Image as OLImageLayer } from "ol/layer";
// import HABandInfo from "HAStyleComponent/src/style/HABandInfo";
// import HAStatistics from "HAStyleComponent/src/style/HAStatistics";
import { transform } from "ol/proj";
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
            dragStatus: false,
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
            previewImg: null,
            imageLayer: null,
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
            this.closeDrag();
        },
        closeDraw() {
            this.$global.drawInteraction.setActive(false);
            this.drawStatus = false;
        },
        closeDrag() {
            this.dragStatus = false;
            this.$global.dragInteraction.setActive(this.dragStatus);
            this.$global.drawInteraction.dragLayer.getSource().clear();
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
            this.$global.drawInteraction.dragLayer.setVisible(
                this.$global.drawInteraction.visible
            );
        },
        acb(a, b) {
            console.log(
                a.getSource().getFeatures(),
                b.getSource().getFeatures()
            );
            b.getSource().clear();
            let features = a.getSource().getFeatures();
            let Newfeatures = [];
            features.map((item) => {
                Newfeatures.push(item.clone());
            });
            b.getSource().addFeatures(Newfeatures);
        },
        drag() {
            this.dragStatus = !this.dragStatus;
            this.$global.dragInteraction.setActive(this.dragStatus);
            if (this.dragStatus) {
                // 使用canvasSource生成预览图片
                this.imageLayer = new OLImageLayer({});
                this.map.addLayer(this.imageLayer);
                // 将矢量图层上的feature复制一份放入drag图层上
                this.acb(
                    this.$global.drawInteraction.vectorLayer,
                    this.$global.drawInteraction.dragLayer
                );
                // 关闭绘制交互
                this.closeDraw();
                // 查看当前是否存在选中的feature,存在的话手动点击feature
                // 首先获取当前选中的feature
                let currentFeatures = this.$global.drawInteraction.dragLayer
                    .getSource()
                    .getFeatures()
                    .filter((item) => {
                        return item.get("selected");
                    });
                if (currentFeatures.length) {
                    this.$global.dragInteraction.setSelection(currentFeatures);
                }
            } else {
                this.closeDrag();
                // 将drag图层上的feature替换到适量图层上
                // this.acb(
                //     this.$global.drawInteraction.dragLayer,
                //     this.$global.drawInteraction.vectorLayer
                // );
                // this.$global.drawInteraction.dragLayer.getSource().clear();
            }
        },
        clear() {
            let defaultStyle = this.$global.drawInteraction.getDefaultStyle();
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
            currentFeatures[0].setStyle(defaultStyle);
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
            let vectorLayer1 = this.$global.drawInteraction.dragLayer;
            // 首先获取当前选中的feature
            let currentFeatures1 = vectorLayer1
                .getSource()
                .getFeatures()
                .filter((item) => {
                    return item.get("selected");
                });
            if (!currentFeatures1.length) return;
            // 如果移除的当前feature上有拖拽图片 需要清空选中
            if (currentFeatures1[0].get("dragged")) {
                this.$global.dragInteraction.setSelection([]);
            }
            vectorLayer1.getSource().removeFeature(currentFeatures1[0]);
        },
        removeAll() {
            let vectorLayer = this.$global.drawInteraction.vectorLayer;
            vectorLayer.getSource().clear();
            let vectorLayer1 = this.$global.drawInteraction.dragLayer;
            vectorLayer1.getSource().clear();
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
                    projection: "EPSG:3857", // 坐标系，有EPSG:4326和EPSG:3857
                    center: transform(
                        [116.064839, 40.548857],
                        "EPSG:4326",
                        "EPSG:3857"
                    ), // 深圳坐标
                    // minZoom: 6, // 地图缩放最小级别
                    zoom: 8, // 地图缩放级别（打开页面时默认级别）
                }),
            });
            this.$nextTick(() => {
                this.map.addInteraction(this.$global.drawInteraction);
                this.$global.drawInteraction.initVectorLayer();
                this.$global.drawInteraction.initDrawInteraction(
                    this.currentDrawGraphicType
                );
                // this.onEdit();
            });
        },
        /**
         * @description: 生成预览图
         * @return {*}
         */
        initPreview(feature) {
            // 获取栅格数据
            let data = tifInfo.dataList;
            let noData =
                tifInfo.bandInfoVo[0].rasterStatisticsInfoVo.noDataValue;
            let projection = tifInfo.projection;
            let extent = feature.getGeometry().getExtent();
            // extent = [116, 40, 130, 45];
            let bands = [];
            for (let i = 0; i < tifInfo.bandInfoVo.length; i++) {
                let band = new HABandInfo({
                    name: tifInfo.bandInfoVo[i].bandName,
                    statistics: new HAStatistics({
                        valueType:
                            tifInfo.bandInfoVo[i].rasterStatisticsInfoVo
                                .dataType,
                        min: tifInfo.bandInfoVo[i].rasterStatisticsInfoVo
                            .minValue,
                        max: tifInfo.bandInfoVo[i].rasterStatisticsInfoVo
                            .maxValue,
                        enableUniqueValue:
                            tifInfo.bandInfoVo[i].rasterStatisticsInfoVo
                                .enableUniqueValue,
                        uniqueValues:
                            tifInfo.bandInfoVo[i].rasterStatisticsInfoVo
                                .uniqueValue,
                        uniqueValueCount:
                            tifInfo.bandInfoVo[i].rasterStatisticsInfoVo
                                .uniqueValueCount,
                        totalCount:
                            tifInfo.bandInfoVo[i].rasterStatisticsInfoVo
                                .totalCount,
                        histogram:
                            tifInfo.bandInfoVo[i].rasterStatisticsInfoVo
                                .histogram,
                    }),
                });
                bands.push(band);
            }
            if (data !== undefined) {
                let scheme = JSON.parse(tifInfo.layerStyle.replace(/'/g, '"'));
                let schemes;
                if (scheme !== null && scheme !== "") {
                    schemes = HARasterScheme.parseScheme(scheme);
                }
                let base64 = schemes.createImageData(data, noData);
                let rasterSource = new ImageStatic({
                    url: base64,
                    projection: projection,
                    interpolate: false,
                    imageExtent: extent,
                });
                this.imageLayer.setSource(rasterSource);
            }
        },
        //操作事件
        onEdit() {
            let dragLayer = this.$global.drawInteraction.dragLayer;
            this.$global.dragInteraction = new dragInteraction({
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
            this.map.addInteraction(this.$global.dragInteraction);
            this.$global.dragInteraction.setActive(false);

            //开始事件
            this.$global.dragInteraction.on(
                ["rotatestart", "translatestart"],
                function (e) {
                    // Rotation
                    let startangle = e.feature.get("angle") || 0;
                    // Translation
                    console.log(1111);
                    console.log(startangle);
                }
            );
            // 确认事件
            this.$global.dragInteraction.on("confirm", (e) => {
                console.log("-----");
                let length = this.$global.drawInteraction.dragLayer
                    .getSource()
                    .getFeatures().length;
                if (length) {
                    // 将drag图层上的feature替换到适量图层上
                    this.acb(
                        this.$global.drawInteraction.dragLayer,
                        this.$global.drawInteraction.vectorLayer
                    );
                    // 每次确认之后，需要新添加图片图层
                }
            });
            // 选中事件
            this.$global.dragInteraction.on("select", (e) => {
                console.log("e.features");
                // 首先获取当前选中的feature
                let currentFeatures = e.features.getArray();
                if (!currentFeatures.length) return;
                this.initPreview(currentFeatures[0]);
                // 需要先将所有的feature置为false
                this.$global.drawInteraction.dragLayer
                    .getSource()
                    .getFeatures()
                    .map((item) => {
                        item.set("dragged", false);
                    });
                currentFeatures[0].set("dragged", true);
            });
            //旋转
            this.$global.dragInteraction.on("rotating", function (e) {
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
            this.$global.dragInteraction.on("translating", (e) => {
                console.log(3333);
                console.log(e.delta);
                console.log(e);
            });
            //拖拽事件
            this.$global.dragInteraction.on("scaling", function (e) {
                console.log(4444);
                console.log(e.scale);
                console.log(e);
            });
            //事件结束
            this.$global.dragInteraction.on(
                ["rotateend", "translateend", "scaleend"],
                (e) => {
                    this.initPreview(e.feature);
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
