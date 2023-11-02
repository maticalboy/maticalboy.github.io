<!--
 * @Author: “chenjinwei” “507725948@qq.com”
 * @Date: 2023-11-02 09:17:29
 * @LastEditors: “chenjinwei” “507725948@qq.com”
 * @LastEditTime: 2023-11-02 09:28:51
 * @FilePath: \openlayers-demo\src\views\waterMark\WaterMark.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
	<div class="vm">
		<h2 class="h-title">地图瓦片图层添加水印</h2>
		<div id="map" class="map-x"></div>
	</div>
</template>

<script>
import 'ol/ol.css';
import { Map, View } from 'ol';
import Tile from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ.js';
import { fromLonLat, transformExtent } from 'ol/proj';

export default {
	name: 'Zoom',
	data() {
		return {
			map: null
		};
	},
	methods: {
		// 初始化地图
		initMap() {
			this.map = new Map({
				target: 'map',
				layers: [
					// 图层
					new Tile({
						source: new XYZ({
							url: 'http://t0.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=49d0c416ba07ffa62dbf768c6f733645',
							wrapX: false
						})
					}),
					new Tile({
						source: new XYZ({
							url: 'http://t0.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=49d0c416ba07ffa62dbf768c6f733645',
							wrapX: false
						})
					}),
					this.getWaterMarkLayer()
				],
				view: new View({
					// projection: "EPSG:4326",
					center: fromLonLat([116.404177, 39.909652]),
					zoom: 6 // 默认缩放级别
				})
			});
		},
		// 创建canvas
		createCanvasContext2D(opt_width, opt_height) {
			const canvas = document.createElement('canvas');
			if (opt_width) {
				canvas.width = opt_width;
			}
			if (opt_height) {
				canvas.height = opt_height;
			}
			return canvas.getContext('2d');
		},
		//水印瓦片图层
		getWaterMarkLayer() {
			let tiles = new Tile({
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
				})
			});
			return tiles;
		}
	},
	mounted() {
		this.initMap();
	}
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/varibles.scss';
</style>
