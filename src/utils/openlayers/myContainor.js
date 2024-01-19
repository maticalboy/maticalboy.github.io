import { Map, View } from "ol";
import Tile from "ol/layer/Tile";
import XYZ from "ol/source/XYZ.js";
import { fromLonLat, transformExtent } from 'ol/proj';
export default class MyContainor {
    constructor() {
        // 初始化容器
        this.map = this.createMap()
        this.allLayers = []
        this.allInteractions = []
        this.visibleLayers = []
        this.visibleInteractions = []
        this.currentMapSource = null;
        this.mapSourceIds = ['vec_w', 'cva_w', 'ChinaOnlineStreetPurplishBlue']
    }

    // 添加其他方法...
    createMap() {
        let map = new Map({
            target: "map", // 对应页面里 id 为 map 的元素
            layers: [
                // 图层
                new Tile({
                    source: new XYZ({
                        url:
                            "http://t0.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=49d0c416ba07ffa62dbf768c6f733645",
                        wrapX: false,
                    }),
                    id:
                        "map-vec_w", // 对应页面里 id 为 map 的元素
                    visible: false,
                }),
                new Tile({
                    source: new XYZ({
                        url:
                            "http://t0.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=49d0c416ba07ffa62dbf768c6f733645",
                        wrapX: false,
                    }),
                    id:
                        "map-cva_w", // 对应页面里 id 为 map 的元素
                    visible: false,
                }),
                new Tile({
                    source: new XYZ({
                        url:
                            "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",
                        wrapX: false,
                    }),
                    id:
                        "map-ChinaOnlineStreetPurplishBlue", // 对应页面里 id 为 map 的元素
                    visible: false,
                }),
                new Tile({
                    source: new XYZ({
                        tileUrlFunction: (t) => {
                            var zoom = t[0];
                            var tile = {
                                x: t[1],
                                y: -(t[2] + 1)
                            };
                            var tileSize = [512, 512];
                            const half = tileSize[0] / 2;
                            const lineheight = 48;
                            var tileSize = [512, 512];
                            //创建Canvas
                            const context = this.createCanvasContext2D(tileSize[0], tileSize[0]);
                            //填充样式
                            context.fillStyle = 'rgba(184, 184, 184, 0.8)';
                            //文字位置
                            context.textAlign = 'center';
                            context.textBaseline = 'middle';
                            //文字字体大小
                            context.font = '48px microsoft yahei';
                            //倾斜角度
                            context.rotate((Math.PI / 180) * 30);
                            //文字内容
                            context.fillText(`仅供参考`, half, half);
                            //返回base64
                            return context.canvas.toDataURL();
                        },
                        extent: transformExtent([-180, -85, 180, 85], 'EPSG:4326', 'EPSG:3857')
                    }),
                    id: 'waterPrint',
                    visible: false,
                })
            ],
            view: new View({
                // 地图视图
                projection: "EPSG:4326", // 坐标系，有EPSG:4326和EPSG:3857
                center: [114.064839, 22.548857], // 深圳坐标
                minZoom: 10, // 地图缩放最小级别
                zoom: 12, // 地图缩放级别（打开页面时默认级别）
            }),

        })
        return map
    }
    /**
     * @description: 获取当前所有图层
     * @return {*}
     */
    getAllLayers() {
        return this.map.getLayers().getArray()
    }
    /**
     * @description: 获取当前可见图层
     * @return {*}
     */
    getVisibleLayers() {
        return this.map.getLayers().getArray().filter(item => item.getVisible())
    }
    /**
     * @description: 获取当前所有交互
     * @return {*}
     */
    getAllInteractions() {
        return this.map.getInteractions().getArray()
    }
    /**
     * @description: 获取当前可见交互
     * @return {*}
     */
    getVisibleInteractions() {
        return this.map.getInteractions().getArray().filter(item => item.getActive())
    }
    /**
     * @description: 重置当前的地图图源
     * @return {*}
     */
    resetAllMapSource() {
        this.getAllLayers().filter(item => {
            if (item.get("id")?.startsWith("map-")) {
                item.setVisible(false)
            }
        })
    }
    /**
     * @description: 设置地图源
     * @return {*}
     */
    setMapSource(id) {
        this.resetAllMapSource()
        let currentMapSources = this.getAllLayers().filter(item => {
            return item.get("id")?.substring(4) == id
        })
        if (currentMapSources.length) {
            this.currentMapSource = currentMapSources[0];

        } else {
            console.log("地图源不存在")
        }
        this.currentMapSource.setVisible(true);
    }
    /**
     * @description: 随机切换地图源
     * @return {*}
     */
    radomChangeMapSource() {
        this.resetAllMapSource()
        let index = Math.floor(Math.random() * this.mapSourceIds.length)
        let mapSourceId = this.mapSourceIds[index]
        let currentMapSources = this.getAllLayers().filter(item => {
            return item.get("id")?.substring(4) == mapSourceId
        })
        this.currentMapSource = currentMapSources[0];
        this.currentMapSource.setVisible(true);
    }
    /**
     * @description: 创建canvas
     * @return {*}
     */
    createCanvasContext2D(opt_width, opt_height) {
        const canvas = document.createElement('canvas');
        if (opt_width) {
            canvas.width = opt_width;
        }
        if (opt_height) {
            canvas.height = opt_height;
        }
        return canvas.getContext('2d');

    }
    /**
     * @description: 展示水印
     * @return {*}
     */
    showWaterPrint() {
        let waterLayer = this.getAllLayers().find(item => item.get("id") == "waterPrint")
        waterLayer.setVisible(true)
    }
}
