<!--
 * @Author: “chenjinwei” “507725948@qq.com”
 * @Date: 2023-10-13 08:44:52
 * @LastEditors: “chenjinwei” “507725948@qq.com”
 * @LastEditTime: 2023-10-13 14:40:33
 * @FilePath: \openlayers-demo\vue2-openlayers\src\views\setResolution\SetResolution.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="vm">
        <h2 class="h-title">
            限制图层的最大/最小分辨率 minResolution / maxResolution
        </h2>
        <div class="explain">
            <p>在限制的范围之内时显示图层，在限制的范围之外时不显示图层</p>
            <p>
                只有当指定图层在 minResolution 和 maxResolution 范围内，才显示。
            </p>
        </div>
        <div id="map" class="map-x"></div>
    </div>
</template>

<script>
import "ol/ol.css";
import { Map, View } from "ol";
import Tile from "ol/layer/Tile";
import { XYZ, TileJSON } from "ol/source";

export default {
    name: "Resolution",
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
                                "http://t0.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=49d0c416ba07ffa62dbf768c6f733645",
                            wrapX: false,
                        }),
                    }),
                    new Tile({
                        source: new XYZ({
                            url:
                                "http://t0.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=49d0c416ba07ffa62dbf768c6f733645",
                            wrapX: false,
                        }),
                        // minResolution: 20,
                        maxResolution: 4000,
                    }),
                ],
                view: new View({
                    center: [653600, 5723680],
                    zoom: 5,
                }),
            });
        },
    },
    mounted() {
        this.initMap();
    },
};
</script>

<style></style>
