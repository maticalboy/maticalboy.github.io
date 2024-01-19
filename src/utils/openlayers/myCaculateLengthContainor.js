import {
    Style,
    Circle as CircleStyle,
    Fill,
    Stroke,
    Text,
} from "ol/style";
import VectorLayer from "ol/layer/Vector";
import { Vector as VectorSource } from "ol/source";
import Point from "ol/geom/Point";
import LineString from "ol/geom/LineString";
import { getLength } from "ol/sphere";
import { Draw, Modify } from "ol/interaction";
import { Overlay } from "ol";
export default class MyCacuateInteractionContainor {
    constructor(props) {
        this.vectorSource = new VectorSource();
        this.modifyInteraction = new Modify({
            source: this.vectorSource, style: this.modifyStyle, insertVertexCondition: () => false, // 如果返回true，可以增加节点
        });
        this.drawInteraction = this.createDrawInteraction();
        this.vectorLayer = new VectorLayer({
            source: this.vectorSource,
            style: (feature) => {
                return this.styleFunction(feature);
            },
            zIndex: 2005,
        });
        // 用于展示提示语
        this.tip = "";
        // 绘制中提示语
        this.activeTip = "Click to continue drawing the line";
        // 初始提示语
        this.idleTip = "Click to start measuring";
        // 删除的图标
        this.deleteImg = require("@/assets/images/openlayers/delete.png");
        // 只有一个点的元素
        this.pointFeature = []
        /**
         * 点默认样式
         */
        this.pointStyle = new Style({
            fill: new Fill({
                color: "rgba(255, 255, 255, 0.2)",
            }),
            stroke: new Stroke({
                color: "rgba(255, 130, 71, 1)",
                width: 2,
            }),
            image: new CircleStyle({
                radius: 5,
                stroke: new Stroke({
                    color: "rgba(238, 44, 44, 0.7)",
                    width: 2,
                }),
                fill: new Fill({
                    color: "rgba(255, 255, 255, 0.8)",
                }),
            }),
        });

        /**
         * 终点样式
         */
        this.labelStyle = new Style({
            text: new Text({
                fill: new Fill({
                    color: "rgba(139, 134, 130, 1)",
                }),
                backgroundFill: new Fill({
                    color: "rgba(255,250,250, 1)",
                }),
                backgroundStroke: new Stroke({
                    color: "rgba(255 ,0 ,0, 0.9)",
                }),
                padding: [3, 3, 3, 3],
                textBaseline: "bottom",
                textAlign: "top",
                offsetX: 0,
                offsetY: 30,
            }),
            image: new CircleStyle({
                radius: 5,
                stroke: new Stroke({
                    color: "rgba(238, 44, 44, 0.7)",
                    width: 2,
                }),
                fill: new Fill({
                    color: "rgba(255, 255, 255, 0.8)",
                }),
            }),
        });

        /**
         * 中点样式
         */
        this.segmentStyle = new Style({
            text: new Text({
                fill: new Fill({
                    color: "rgba(139, 134, 130, 1)",
                }),
                backgroundFill: new Fill({
                    color: "rgba(255,250,250, 1)",
                }),
                padding: [2, 2, 2, 2],
                textBaseline: "bottom",
                offsetX: 10,
                offsetY: 15,
                textAlign: "left",
                backgroundStroke: new Stroke({
                    color: "rgba(139 ,134 ,130, 0.9)",
                }),
            }),
            image: new CircleStyle({
                radius: 5,
                stroke: new Stroke({
                    color: "rgba(238, 44, 44, 0.7)",
                    width: 2,
                }),
                fill: new Fill({
                    color: "rgba(255, 255, 255, 0.8)",
                }),
            }),
        });

        /**
         * 提示语样式
         */
        this.tipStyle = new Style({
            text: new Text({
                fill: new Fill({
                    color: "rgba(255, 255, 255, 1)",
                }),
                backgroundFill: new Fill({
                    color: "rgba(0, 0, 0, 0.4)",
                }),
                padding: [2, 2, 2, 2],
                textAlign: "left",
                offsetX: 0,
                offsetY: 45,
            }),
        });
        /**
         * 修改提示语的样式
         */
        this.modifyStyle = new Style({
            image: new CircleStyle({
                radius: 5,
                stroke: new Stroke({
                    color: 'rgba(0, 0, 0, 0.7)'
                }),
                fill: new Fill({
                    color: 'rgba(0, 0, 0, 0.4)'
                })
            }),
            text: new Text({
                text: 'Drag to modifyInteraction',
                font: '12px Calibri,sans-serif',
                fill: new Fill({
                    color: 'rgba(255, 255, 255, 1)'
                }),
                backgroundFill: new Fill({
                    color: 'rgba(0, 0, 0, 0.7)'
                }),
                padding: [2, 2, 2, 2],
                textAlign: 'left',
                offsetX: 15
            })
        });
    }
    /**
     * @description: 创建交互
     * @return {*}
     */
    createDrawInteraction() {
        let drawInteraction = new Draw({
            source: this.vectorSource,
            type: "LineString",
            style: (feature) => {
                return this.styleFunction(feature);
            },
        });
        drawInteraction.setActive(false);
        this.modifyInteraction.setActive(false);
        // 提示语 初始化
        this.tip = this.idleTip;
        drawInteraction.on("drawstart", (e) => {
            this.tip = this.activeTip;
            this.modifyInteraction.setActive(false);
        });
        // 绘制完毕 保存所有的坐标信息
        drawInteraction.on("drawend", (e) => {
            // 设置修改的样式 在终点
            this.modifyStyle.setGeometry(this.tipPoint);
            // 绘制完毕 允许修改
            this.modifyInteraction.setActive(true);
            // 设置修改的样式 在拖拽点
            this.modifyInteraction.getMap().once('pointermove', () => {
                this.modifyStyle.setGeometry();
            });
            // 为当前要素设置一个唯一ID
            const ID = new Date().getTime();
            // 绘制完毕提示语 初始化
            this.tip = this.idleTip;
            // 获取绘制图形 坐标信息
            let sktch = e.feature;
            sktch.setId(ID);
            let arr = sktch.getGeometry().getCoordinates();
            // 判断是否是单点 如果是单点 直接返回 之后还要删除当前的单点要素
            if (arr.length < 2) {
                this.pointFeature.push(e.feature);
                return;
            }
            let imageElement = document.createElement("img");
            imageElement.src = this.deleteImg;
            imageElement.style.width = "15px"; // 设置图片宽度为20px
            imageElement.style.height = "15px"; // 设置图片高度为20px
            // 添加删除按钮
            const overlay = new Overlay({
                element: imageElement, // 图片元素作为覆盖物的内容
                position: arr[arr.length - 1], // 覆盖物的位置
                positioning: "center-center", // 覆盖物的定位方式
                offset: [15, 2.5],
            });
            this.drawInteraction.getMap().addOverlay(overlay);
            imageElement.onclick = () => {
                this.vectorSource.removeFeature(e.feature);
                this.drawInteraction.getMap().removeOverlay(overlay);
            };
        });
        return drawInteraction;
    }
    /**
     * @description: 根据图形计算长度
     * @param {*} line
     * @return {*}
     */
    formatLength(line) {
        let sourceProj = this.drawInteraction.getMap().getView().getProjection(); //地图数据源投影坐标系
        let length = getLength(line, {
            projection: sourceProj,
            radius: 6378137,
        });
        let output;
        if (length > 100) {
            output = Math.round((length / 1000) * 100) / 100 + " km";
        } else {
            output = Math.round(length * 100) / 100 + " m";
        }
        return output;
    }

    /**
     * 绘制图形的样式
     * @param feature
     * @returns {Style[]}
     */
    styleFunction(feature) {
        // 初始化样式 最后需要返回 类型 数组
        let styles = [this.pointStyle];
        // 中点样式初始化 一般只取数组中的一个
        let segmentStyles = [this.segmentStyle];
        // 获取图形
        const geometry = feature.getGeometry();
        // 获取类型
        const type = geometry.getType();
        // 针对长度
        if (type === "LineString") {
            // 获取最后的终点
            let point = new Point(geometry.getLastCoordinate());
            // 获取起点到终点的长度
            let output = this.formatLength(geometry);
            // 将终点样式设置到对应的终点
            this.labelStyle.setGeometry(point);
            // 终点样式的展示文本修改
            this.labelStyle.getText().setText(output);
            // 添加到样式数组中
            styles.push(this.labelStyle);

            // 起点样式
            let startStyle = this.segmentStyle.clone();
            // 获取当前要素的起点
            let firstPoint = new Point(geometry.getFirstCoordinate());
            // 将起点样式设置到对应的终点
            startStyle.setGeometry(firstPoint);
            // 终点样式的展示文本修改
            startStyle.getText().setText("起点");
            // 添加到样式数组中
            styles.push(startStyle);

            // 为当前图形的每条线段的中点设置样式
            let count = 0;
            // 获取当前元素所有的点坐标
            let Coordinates = geometry.getCoordinates();
            geometry.forEachSegment((start, end) => {
                let arr = Coordinates.slice(0, count + 2);
                let line = new LineString(arr);
                let output = this.formatLength(line);
                if (output == "0 m") {
                    return;
                }
                // 如果是终点 不必添加中间段距离
                if (
                    point.getCoordinates()[0] == end[0] &&
                    point.getCoordinates()[1] == end[1]
                ) {
                    return styles;
                }
                if (segmentStyles.length - 1 < count) {
                    // 线段之间的长度显示
                    // 添加一个线段样式
                    segmentStyles.push(this.segmentStyle.clone());
                }
                // 创建线段右边的点
                let segmentPoint = new Point(line.getCoordinateAt(1));
                // 给中点设置样式
                segmentStyles[count].setGeometry(segmentPoint);
                // 中点样式修改文本
                segmentStyles[count].getText().setText(output);
                // 添加到样式数组中
                styles.push(segmentStyles[count]);
                // 线段数+1
                count++;
            });
        } else if (type === "Point" &&
        !this.modifyInteraction.getOverlay().getSource().getFeatures().length) {
            this.tipStyle.getText().setText(this.tip);
            styles.push(this.tipStyle);
        }
        return styles;
    }
}
