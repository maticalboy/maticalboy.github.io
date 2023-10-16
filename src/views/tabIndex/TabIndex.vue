<!--
 * @Author: “chenjinwei” “507725948@qq.com”
 * @Date: 2023-10-13 08:44:52
 * @LastEditors: “chenjinwei” “507725948@qq.com”
 * @LastEditTime: 2023-10-13 09:25:27
 * @FilePath: \openlayers-demo\vue2-openlayers\src\views\tabIndex\TabIndex.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="vm">
        <h2 class="h-title">点击激活地图 tabindex</h2>
        <div tabindex="2" id="map" class="map-x"></div>
        <div class="explain">
            <p>通过给地图容器设置 tabindex="2" 来控制默认不会选中地图。</p>
            <p>只有当鼠标点击地图时，才能进行缩放等操作。</p>
            <p>如果没选中地图，即使在地图上滑动滚轮，也不会操作到地图。</p>
            <p>在vs code中 输入Lorem+数字，再按tab或回车 就会出现以下内容。</p>
        </div>
        <div class="content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio,
            earum voluptatum. Culpa consequatur reiciendis ea iure quis
            voluptatibus dolore laborum perferendis inventore, eaque harum
            quisquam earum recusandae nesciunt, expedita incidunt iste. Facilis
            fuga ut neque deserunt omnis magni aperiam officiis. Architecto
            officiis qui eius, facere facilis quis, omnis placeat, autem
            excepturi tempora eveniet culpa beatae consectetur repellendus
            tenetur ad molestias explicabo veniam blanditiis? Amet consectetur
            necessitatibus obcaecati, praesentium possimus sunt dolore magnam
            nostrum quidem atque minima fugiat quaerat recusandae nisi?
        </div>
    </div>
</template>

<script>
import "ol/ol.css";
import { Map, View } from "ol";
import Tile from "ol/layer/Tile";
import XYZ from "ol/source/XYZ.js";

export default {
    name: "TabIndex",
    data() {
        return {
            map: null,
        };
    },
    methods: {
        initMap() {
            this.map = new Map({
                target: "map",
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
                    center: [113.120444, 23.034742],
                    zoom: 4,
                }),
            });
        },
    },
    mounted() {
        this.initMap();
    },
};
</script>

<style lang="scss" scoped>
.content {
    width: 100px;
    margin: 10px auto;
}
</style>
