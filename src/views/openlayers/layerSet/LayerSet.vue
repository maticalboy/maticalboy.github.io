<template>
    <div class="vm">
        <h2 class="h-title">图层组 Group</h2>
        <ul>
            <li>
                <span>底层</span>
                <fieldset id="layer0">
                    <label class="checkbox" for="visible0">
                        <input
                            id="visible0"
                            class="visible"
                            type="checkbox"
                            v-model="visible0"
                            @change="changeCheckBox('visible0', 'baseMap')"
                        />可见
                    </label>
                    <label>透明度</label>
                    <input
                        class="opacity"
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        v-model="visible0Opacity"
                        @change="changeOpacity('visible0Opacity', 'baseMap')"
                    />
                </fieldset>
            </li>
            <li>
                <span>图层组</span>
                <fieldset id="layer1">
                    <label class="checkbox" for="visible1">
                        <input
                            id="visible1"
                            class="visible"
                            type="checkbox"
                            v-model="visible1"
                            @change="changeCheckBox('visible1', 'group')"
                        />可见
                    </label>
                    <label>透明度</label>
                    <input
                        class="opacity"
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        v-model="visible1Opacity"
                        @change="changeOpacity('visible1Opacity', 'group')"
                    />
                </fieldset>
                <ul>
                    <li>
                        <span>食物危机主题图层</span>
                        <fieldset id="layer10">
                            <label class="checkbox" for="visible10">
                                <input
                                    id="visible10"
                                    class="visible"
                                    type="checkbox"
                                    v-model="visible10"
                                    @change="
                                        changeCheckBox('visible10', 'food')
                                    "
                                />可见
                            </label>
                            <label>透明度</label>
                            <input
                                class="opacity"
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                v-model="visible10Opacity"
                                @change="
                                    changeOpacity('visible10Opacity', 'food')
                                "
                            />
                        </fieldset>
                    </li>
                    <li>
                        <span>世界陆地边界图</span>
                        <fieldset id="layer11">
                            <label class="checkbox" for="visible11">
                                <input
                                    id="visible11"
                                    class="visible"
                                    type="checkbox"
                                    v-model="visible11"
                                    @change="
                                        changeCheckBox('visible11', 'land')
                                    "
                                />可见
                            </label>
                            <label>透明度</label>
                            <input
                                class="opacity"
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                v-model="visible11Opacity"
                                @change="
                                    changeOpacity('visible11Opacity', 'land')
                                "
                            />
                        </fieldset>
                    </li>
                </ul>
            </li>
        </ul>
        <div id="map" class="map-x"></div>
    </div>
</template>

<script>
import "ol/ol.css";
import { Map, View } from "ol";
import { Tile, Group } from "ol/layer";
import { XYZ, TileJSON } from "ol/source";
import { fromLonLat } from 'ol/proj';

export default {
    name: "Group",
    data() {
        return {
            map: null,
            visible0: true,
            visible0Opacity: 100,
            visible1: true,
            visible1Opacity: 100,
            visible10: true,
            visible10Opacity: 100,
            visible11: true,
            visible11Opacity: 100,
        };
    },
    methods: {
        initMap() {
            this.map = new Map({
                target: "map",
                layers: [
                    new Tile({
                        name: "baseMap",
                        source: new XYZ({
                            url:
                                "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",
                        }),
                    }),
                
                    new Group({
                        name: "group",
                        layers: [
                            new Tile({
                                name: "food",
                                source: new TileJSON({
                                    url:
                                        "https://api.tiles.mapbox.com/v4/mapbox.20110804-hoa-foodinsecurity-3month.json?securee&access_token=pk.eyJ1IjoiYWhvY2V2YXIiLCJhIjoiY2pzbmg0Nmk5MGF5NzQzbzRnbDNoeHJrbiJ9.7_-_gL8ur7ZtEiNwRfCy7Q",
                                    crossOrigin: "anonymous",
                                }),
                            }),
                            new Tile({
                                name: "land",
                                source: new TileJSON({
                                    url:
                                        "https://api.tiles.mapbox.com/v4/mapbox.world-borders-light.json?secure&access_token=pk.eyJ1IjoiYWhvY2V2YXIiLCJhIjoiY2pzbmg0Nmk5MGF5NzQzbzRnbDNoeHJrbiJ9.7_-_gL8ur7ZtEiNwRfCy7Q",
                                    crossOrigin: "anonymous",
                                }),
                            }),
                        ],
                    }),
                ],
                view: new View({
                    // projection: "EPSG:4326", // 坐标系，有EPSG:4326和EPSG:3857
                    center: fromLonLat([37.4057, 8.81566]),
                    zoom: 4, // 地图缩放级别（打开页面时默认级别）
                }),
            });
        },

        // 显示/隐藏图层
        // setVisible可以设置图层显示或隐藏
        changeCheckBox(target, name) {
            let layers = this.find(this.map, name);
            layers.setVisible(this[target]);
        },

        // 修改图层透明度
        // setOpacity可是设置图层的透明度，接收一个数值类型的参数
        changeOpacity(target, name) {
            let layers = this.find(this.map, name);
            layers.setOpacity(parseFloat(this[target]));
        },

        // 查找图层
        find(source, name) {
            let s = source.getLayers();
            for (let i = 0; i < s.getLength(); i++) {
                // 遍历所有图层
                if (s.item(i).get("name") === name) {
                    // 根据图层名，查找并返回查找到的图层
                    return s.item(i);
                }
                if (s.item(i) instanceof Group) {
                    // 递归
                    return this.find(s.item(i), name);
                }
            }
        },
    },
    mounted() {
        this.initMap();
    },
};
</script>

<style></style>
