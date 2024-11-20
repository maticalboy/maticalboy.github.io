import { Draw, Interaction } from "ol/interaction";
import { createBox, createRegularPolygon } from "ol/interaction/Draw";
import LineString from "ol/geom/LineString";
import Circle from "ol/geom/Circle";
import Polygon, { fromCircle } from "ol/geom/Polygon";
import Stroke from "ol/style/Stroke";
import { Style } from "ol/style";
import { distance, equals } from "ol/coordinate";
import Fill from 'ol/style/Fill';
import CircleStyle from 'ol/style/Circle';
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Feature } from "ol";
// import jsts from "../../utils/common/jsts";
export default class HAEditDrawInteraction extends Interaction {
    constructor() {
        super({
            handleEvent: function (mapBrowserEvent) {
                return true
            },
        });
        // 当前交互是否激活
        this.active = false;
        // draw交互
        this.drawInteraction = null;
        // 矢量图层
        this.vectorLayer = null;
        // 拖拽的图层
        this.dragLayer = null;
        // 当前feature选中的样式
        this.selectedStyle = new Style({
            stroke: new Stroke({
                color: '#0e97fa',
                width: 3,
            }),
            fill: new Fill({
                color: [255, 0, 0, 0.2],
            }),
            zIndex: 1,
        });
        // 默认样式
        this.defaultStyle = new Style({
            stroke: new Stroke({
                // color: "#0e97fa",
                width: 10,
            }),
            fill: new Fill({
                color: [0, 0, 0, 0.2],
            }),
        });
        // 绘制图形
        this.currentDrawGraphicType = "polygon"
        // 绘制模式
        this.currentDrawMode = "new"
        // 是否保留上一个绘制的feature
        this.save = true
        // 图层是否可见
        this.visible = true
        // 默认样式颜色
        this.defaultColor = "rgba(255, 69, 0, 0.68)"
        // 选择功能是否开启
        this.selectStatus = false;
    }
    /**
     * @description: 给地图添加点击事件 选中feature
     * @return {*}
     */
    addSelectEvent(){

    }
    /**
     * @description: 初始化栅格图层上用于绘制交互的矢量图层
     * @return {*}
     */
    initVectorLayer() {
        if (this.vectorLayer) this.getMap().removeLayer(this.vectorLayer)
        let vectorLayer = new VectorLayer({
            zIndex: 2000,
            source: new VectorSource({}),
        });
        // vectorLayer.set("name", this.currentLayer.name);
        this.vectorLayer = vectorLayer;
        this.getMap().addLayer(this.vectorLayer)
        if (this.dragLayer) this.getMap().removeLayer(this.dragLayer)
        let dragLayer = new VectorLayer({
            zIndex: 2000,
            source: new VectorSource({}),
        });
        // vectorLayer.set("name", this.currentLayer.name);
        this.dragLayer = dragLayer;
        this.getMap().addLayer(this.dragLayer)
    }
    /**
     * @description: 初始化draw交互
     * @return {*}
     */
    initDrawInteraction(type) {
        if (this.drawInteraction) this.getMap().removeInteraction(this.drawInteraction)
        let source = this.vectorLayer.getSource();
        switch (type) {
            case "Square":
                this.drawInteraction = new Draw({
                    source: source,
                    type: "Circle",
                    geometryFunction: createBox(),
                });
                break;
            case "circle":
                this.drawInteraction = new Draw({
                    source: source,
                    type: "Circle",
                });
                break;
            case "polygon":
                this.drawInteraction = new Draw({
                    source: source,
                    type: "Polygon",
                });
                break;
            case "lasso":
                this.drawInteraction = new Draw({
                    source: source,
                    type: "Polygon",
                    freehand: true,
                });
        }
        this.setActive(false);
        this.getMap().addInteraction(this.drawInteraction)
        this.drawInteraction.on("drawstart", (e) => {
            // 清除所有没有坐标的feature
            this.vectorLayer
                .getSource()
                .getFeatures()
                .map((item) => {
                    if (item.getGeometry().get("clear") == true) {
                        this.vectorLayer.getSource().removeFeature(item)
                    }
                });
        });
        this.drawInteraction.on("drawend", (event) => {
            // 首先获取当前选中的feature
            let currentFeature = this.vectorLayer
                .getSource()
                .getFeatures()
                .filter((item) => {
                    return item.get("selected");
                })[0];
            // 根据绘制模式重新生成最新的feature
            let operateFeature;

            // 根据绘制模式生成不同的绘制效果
            switch (this.currentDrawMode) {
                case "new":
                    currentFeature?.set("selected", false);
                    currentFeature?.setStyle(this.defaultStyle)
                    let defaultStyle = this.getDefaultStyle()
                    currentFeature?.setStyle(defaultStyle)
                    event.feature.set("selected", true);
                    operateFeature = event.feature;
                    // 如果是不保留之前的feature
                    if (!this.save) {
                        this.vectorLayer.getSource().clear()
                    }
                    break;
                case "merge":
                case "resection":
                case "intersection":
                    // 合并 切除 交集
                    operateFeature = this.operateFeature(
                        currentFeature,
                        event.feature,
                        this.currentDrawMode
                    );
                    break;
                default:
                    break;
            }
            // 将当前新的feature进行样式修改
            operateFeature.setStyle(this.selectedStyle);
            // 只可以确保之前的feature样式得到修改
            // this.upDateSelectedStatus();
            console.log(this.vectorLayer
                .getSource()
                .getFeatures())
        });
    }
    getDefaultStyle() {
        return new Style({
            stroke: new Stroke({
                color: this.defaultColor,
                width: 10,
            }),
            fill: new Fill({
                color: [0, 0, 0, 0.2],
            }),
        }
        )
    }
    /**
     * @description: 更新当前图层矢量要素的样式
     * @return {*}
     */
    upDateSelectedStatus() {
        this.vectorLayer
            .getSource()
            .getFeatures()
            .map((item) => {
                if (item.get("selected")) {
                    item.setStyle(this.selectedStyle);
                    item.getStyle().getStroke().setColor(this.activeColor)
                } else {
                    item.setStyle(this.defaultStyle);
                }
            });
    }
    /**
     * @description: 融合，切割，相交，相差
     * @return {*}
     */
    operateFeature(feature1, feature2, type) {
        return
        let geometry1 = feature1.getGeometry();
        let geometry2 = feature2.getGeometry();
        if (feature1.getGeometry().getType() != "Polygon") {
            geometry1 = new fromCircle(geometry1);
        }
        if (feature2.getGeometry().getType() != "Polygon") {
            geometry2 = new fromCircle(geometry2);
        }
        let operateGeometry;
        switch (type) {
            // case "merge":
            //     operateGeometry = jsts.union(geometry1, geometry2);
            //     break;
            // case "resection":
            //     operateGeometry = jsts.getDifference(geometry1, geometry2);
            //     break;
            // case "intersection":
            //     operateGeometry = jsts.intersects(geometry1, geometry2);
            //     break;
            default:
                break;
        }
        let operateFeature = new Feature({});
        operateFeature.setGeometry(operateGeometry);
        operateFeature.set("selected", true);
        // 需要删除当前正在绘制的feature和选中的feature,使用nexttick确保新绘制的已经添加到图层中
        let vectorLayer = this.vectorLayer;
        vectorLayer.getSource().removeFeature(feature1);
        // vectorLayer.getSource().removeFeature(feature2);
        // feature2是当前正在绘制的feature,无法删除
        feature2.getGeometry().set("clear", true)
        if (feature2.getGeometry().getType() == "Circle") {
            feature2.getGeometry().setRadius(0)
        } else {
            feature2.getGeometry().setCoordinates([])
        }
        // 如果是不保留之前的feature
        if (!this.save) {
            this.vectorLayer.getSource().clear()
        }
        vectorLayer.getSource().addFeature(operateFeature);
        return operateFeature;
    }
    /**
     * @description: 切换绘制图形形状
     * @return {*}
     */
    changeDrawGraphicType() {
        // 先移除之前的交互
        this.getMap().removeInteraction(this.drawInteraction);
        // 初始化新的交互
        this.initDrawInteraction(
            this.currentDrawGraphicType
        );
        this.getMap().addInteraction(this.drawInteraction);
    }
    /**
     * 设置是否激活
     * @param active
     */
    setActive(active) {
        this.active = active
        this.drawInteraction?.setActive(active)
        super.setActive(active)
    }

    /**
     * 获取交互是否激活
     * @returns {boolean}
     */
    getActive() {
        return this.active
    }

}
