<!--
 * @Author: “chenjinwei” “507725948@qq.com”
 * @Date: 2023-10-13 08:44:52
 * @LastEditors: “chenjinwei” “507725948@qq.com”
 * @LastEditTime: 2023-10-13 09:30:17
 * @FilePath: \openlayers-demo\vue2-openlayers\src\views\changeTarget\ChangeTarget.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="vm">
        <h2 class="h-title">切换地图容器 getTarget/setTarget</h2>
        <div class="map-bx">
            <div id="map1" class="map-x"></div>
            <div id="map2" class="map-x"></div>
        </div>
        <button class="btn" @click="changeMap">change</button>

        <div class="explain">
            <p>getTarget：获取当前地图容器id值</p>
            <p>setTarget：设置地图容器，填写id值</p>
        </div>
    </div>
</template>

<script>
import "ol/ol.css";
import { Map, View } from "ol";
import XYZ from "ol/source/XYZ.js";
import Tile from "ol/layer/Tile";
export default {
    name: "ChangeTarget",
    data() {
        return {
            map: null,
        };
    },
    methods: {
        initMap() {
            this.map = new Map({
                layers: [
                    // 图层
                    new Tile({
                        source: new XYZ({
                            url:
                                "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",
                            wrapX: false,
                        }),
                    }),
                ],
                view: new View({
                    // projection: "EPSG:4326",
                    center: [113.100774, 29.386975],
                    zoom: 4,
                }),
            });
            this.map.setTarget("map1");
        },

        // 切换容器
        changeMap() {
            // 获取当前地图容器，并进行判断
            let target = this.map.getTarget() === "map1" ? "map2" : "map1";

            // 重新设置地图容器
            this.map.setTarget(target);
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
}

.btn {
    display: block;
    margin: 0 auto;
}
</style>
