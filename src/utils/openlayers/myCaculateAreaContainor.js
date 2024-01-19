import { getLength, getArea } from 'ol/sphere';
import VectorLayer from 'ol/layer/Vector';
import { Vector as VectorSource } from 'ol/source';
import { LineString } from 'ol/geom';
import Point from 'ol/geom/Point.js';
import { Style, Circle as CircleStyle, Fill, Stroke, Text } from 'ol/style';
import { Draw, Modify } from 'ol/interaction';
import { Overlay } from 'ol';
export default class MyCacuateAreaInteractionContainor {
    constructor() {
        this.vectorSource = new VectorSource();
        this.modifyInteraction = new Modify({
            source: this.vectorSource, style: this.modifyStyle, insertVertexCondition: () => false, // 如果返回true，可以增加节点
        });
        this.vectorLayer = new VectorLayer({
            source: this.vectorSource,
            style: (feature) => {
                return this.styleFunction(feature);
            },
            zIndex: 2005,
        });
        this.drawInteraction = this.createDrawInteraction();
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
     * @description:
     * @return {*}
     */
    createDrawInteraction() {
        let drawInteraction = new Draw({
            source: this.vectorSource,
            type: 'Polygon',
            style: (feature) => {
                return this.styleFunction(feature);
            }
        });
        drawInteraction.setActive(false);
        this.modifyInteraction.setActive(false);
        // 提示语 初始化
        this.tip = this.idleTip;
        drawInteraction.on('drawstart', (e) => {
            // 刚开始 不允许修改
            this.modifyInteraction.setActive(false);
            this.tip = this.activeTip;
        });
        // 绘制完毕 保存所有的坐标信息
        drawInteraction.on('drawend', (e) => {
            // 设置修改的样式 在终点
            this.modifyStyle.setGeometry(this.tipPoint);
            // 绘制完毕 允许修改
            this.modifyInteraction.setActive(true);
            // 设置修改的样式 在拖拽点
            this.modifyInteraction.getMap().once('pointermove', () => {
                this.modifyStyle.setGeometry();
            });
            // 绘制完毕提示语 初始化
            this.tip = this.idleTip;
            // 获取绘制图形 坐标信息
            this.sktch = e.feature;

            let arr = this.sktch.getGeometry().getCoordinates()[0];
            // 判断是否是单点 如果是单点 直接返回 之后还要删除当前的单点要素
            if (arr.length < 4 || (arr[1][0] == arr[2][0] && arr[1][1] == arr[2][1])) {
                this.pointFeature.push(e.feature);
                return;
            }
            // 获取内部点
            let point = e.feature.getGeometry().getInteriorPoint().getCoordinates();
            let imageElement = document.createElement("img");
            imageElement.src = this.deleteImg;
            imageElement.style.width = "15px"; // 设置图片宽度为20px
            imageElement.style.height = "15px"; // 设置图片高度为20px
            // 添加删除按钮
            const overlay = new Overlay({
                element: imageElement, // 图片元素作为覆盖物的内容
                position: [point[0], point[1]], // 覆盖物的位置
                positioning: "center-center", // 覆盖物的定位方式
                offset: [15, 2.5],
            });
            this.drawInteraction.getMap().addOverlay(overlay);
            imageElement.onclick = () => {
                this.vectorSource.removeFeature(e.feature);
                this.drawInteraction.getMap().removeOverlay(overlay);
            };
        });
        return drawInteraction
    }

    /**
     * @description: 计算长度
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
            output = Math.round((length / 1000) * 100) / 100 + ' km';
        } else {
            output = Math.round(length * 100) / 100 + ' m';
        }
        return output;
    }
    /**
     * @description: 根据图形计算长度
     * @param {*} line
     * @return {*}
     */
    formatArea(polygon) {
        let sourceProj = this.drawInteraction.getMap().getView().getProjection(); //地图数据源投影坐标系
        let area = getArea(polygon, {
            projection: sourceProj,
            radius: 6378137,
        });
        let output;
        if (area > 10000) {
            output = Math.round((area / 1000000) * 100) / 100 + ' km\xB2';
        } else {
            output = Math.round(area * 100) / 100 + ' m\xB2';
        }
        return output;
    }
    /**
     * @description: 动态显示 距离
     * @param {*} feature
     * @return {*}
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
        if (type === 'Polygon') {
            // 获取内部点
            let point = geometry.getInteriorPoint();
            // 获取面积
            let output = this.formatArea(geometry);
            // 将终点样式设置到对应的终点
            this.labelStyle.setGeometry(point);
            // 终点样式的展示文本修改
            this.labelStyle.getText().setText(output);
            // 添加到样式数组中
            styles.push(this.labelStyle);
            // 为当前图形的每条线段的中点设置样式
            let count = 0;
            let line1 = new LineString(geometry.getCoordinates()[0]);
            line1.forEachSegment((start, end) => {
                let line = new LineString([start, end]);
                let output = this.formatLength(line);
                if (output == '0 m') {
                    return styles;
                }
                if (segmentStyles.length - 1 < count) {
                    // 线段之间的长度显示
                    // 添加一个线段样式
                    segmentStyles.push(this.segmentStyle.clone());
                }
                // 创建线段中点
                let segmentPoint = new Point(line.getCoordinateAt(0.5));
                // 给中点设置样式
                segmentStyles[count].setGeometry(segmentPoint);
                // 中点样式修改文本
                segmentStyles[count].getText().setText(output);
                // 添加到样式数组中
                styles.push(segmentStyles[count]);
                // 线段数+1
                count++;
            });
        } else if (
            type === 'Point' &&
            !this.modifyInteraction.getOverlay().getSource().getFeatures().length
        ) {
            this.tipPoint = geometry;
            this.tipStyle.getText().setText(this.tip);
            styles.push(this.tipStyle);
        }
        return styles;
    }
}
