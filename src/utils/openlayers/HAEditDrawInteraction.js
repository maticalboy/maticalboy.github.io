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
import jsts from "../../utils/common/jsts";
export default class HAEditDrawInteraction extends Interaction {
    constructor() {
        super({
            handleEvent: function (mapBrowserEvent) {
                return true
            }
        });
        // 当前交互是否激活
        this.active = false;
        // draw交互
        this.drawInteraction = null;
        // 矢量图层
        this.vectorLayer = null;
        this.dragLayer = null;
        this.selectedStyle = new Style({
            stroke: new Stroke({
                color: [255, 0, 0, 0.6],
                width: 3,
            }),
            fill: new Fill({
                color: [255, 0, 0, 0.2],
            }),
            zIndex: 1,
        });
        this.defaultStyle = new Style({
            stroke: new Stroke({
                color: "#0e97fa",
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
        // 默认样式
        // this.style = this.getDefaultStyleFunction()
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
        console.log(6969, type)
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
                console.log(this.drawInteraction)
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
                    console.log(item)
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
            console.log(this.vectorLayer
                .getSource()
                .getFeatures())
            // 根据绘制模式重新生成最新的feature
            let operateFeature;

            // 根据绘制模式生成不同的绘制效果
            switch (this.currentDrawMode) {
                case "new":
                    currentFeature?.set("selected", false);
                    event.feature.set("selected", true);
                    operateFeature = event.feature;
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
            operateFeature.setStyle(this.selectedStyle);
            // 确保操作完的要素已经加载在图层上
            // this.$nextTick(() => {
            //     this.upDateSelectedStatus();
            // });
            this.upDateSelectedStatus();
        });
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
                console.log(item,'pppp')
                if (item.get("selected")) {
                    item.setStyle(this.selectedStyle);
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
            case "merge":
                operateGeometry = jsts.union(geometry1, geometry2);
                break;
            case "resection":
                operateGeometry = jsts.getDifference(geometry1, geometry2);
                break;
            case "intersection":
                operateGeometry = jsts.intersects(geometry1, geometry2);
                break;
            default:
                break;
        }
        let operateFeature = new Feature({});
        operateFeature.setGeometry(operateGeometry);
        operateFeature.set("selected", true);
        // this.$nextTick(() => {
        //     // 需要删除当前正在绘制的feature和选中的feature,使用nexttick确保新绘制的已经添加到图层中
        //     let vectorLayer = this.vectorLayer;
        //     vectorLayer.getSource().removeFeature(feature1);
        //     vectorLayer.getSource().removeFeature(feature2);
        //     vectorLayer.getSource().addFeature(operateFeature);
        //     this.upDateSelectedStatus();
        // });
        // 需要删除当前正在绘制的feature和选中的feature,使用nexttick确保新绘制的已经添加到图层中
        let vectorLayer = this.vectorLayer;
        // vectorLayer.getSource().removeFeature(feature1);
        // vectorLayer.getSource().removeFeature(feature2);
        feature1.getGeometry().set("clear",true)
        if(feature1.getGeometry().getType()== "Circle"){
            feature1.getGeometry().setRadius(0)
        }else{
            feature1.getGeometry().setCoordinates([])
        }
        feature2.getGeometry().set("clear",true)
        if(feature2.getGeometry().getType()== "Circle"){
            feature2.getGeometry().setRadius(0)
        }else{
            feature2.getGeometry().setCoordinates([])
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
    /**
     * 创建编辑样式
     * @returns {Object<import("../geom/Geometry.js").Type, Array<Style>>}
     */
    // createEditingStyle() {
    //     /** @type {Object<import("../geom/Geometry.js").Type, Array<Style>>} */
    //     const styles = {};
    //     const white = [255, 255, 255, 1];
    //     const blue = [0, 153, 255, 1];
    //     const red = [255, 0, 0, 1];
    //     const width = 1;
    //     styles['Polygon'] = [
    //         new Style({
    //             fill: new Fill({
    //                 color: [255, 255, 255, 0.5],
    //             }),
    //             stroke: new Stroke({
    //                 color: red,
    //                 width: width,
    //                 lineDash: [5, 5],
    //             })
    //         }),
    //     ];
    //     styles['MultiPolygon'] = styles['Polygon'];

    //     styles['LineString'] = [
    //         new Style({
    //             stroke: new Stroke({
    //                 color: white,
    //                 width: width + 2,
    //             }),
    //         }),
    //         new Style({
    //             stroke: new Stroke({
    //                 color: red,
    //                 width: width,
    //                 lineDash: [5, 5],
    //             }),
    //         }),
    //     ];
    //     styles['MultiLineString'] = styles['LineString'];

    //     styles['Circle'] = styles['Polygon'].concat(styles['LineString']);

    //     styles['Point'] = [
    //         new Style({
    //             image: new CircleStyle({
    //                 radius: 6,
    //                 fill: new Fill({
    //                     color: blue,
    //                 }),
    //                 stroke: new Stroke({
    //                     color: white,
    //                     width: 1.5,
    //                 }),
    //             }),
    //             zIndex: Infinity,
    //         }),
    //     ];
    //     styles['MultiPoint'] = styles['Point'];

    //     styles['GeometryCollection'] = styles['Polygon'].concat(
    //         styles['LineString'],
    //         styles['Point']
    //     );

    //     return styles;
    // }
    /**
     * 获取默认样式
     * @returns {function(*, *): *}
     */
    getDefaultStyleFunction() {
        const styles = this.createEditingStyle();
        return function (feature, resolution) {
            return styles[feature.getGeometry().getType()];
        };
    }
}
