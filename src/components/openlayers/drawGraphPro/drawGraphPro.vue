<template>
	<div class="vm">
		<h2 class="h-title">绘制图形Element drawGraphPro</h2>
		<el-select v-model="selectValue" @change="selectChange">
			<el-option
				v-for="item in selectList"
				:key="item.value"
				:label="item.label"
				:value="item.value"></el-option>
		</el-select>
		<div id="map" class="map-x"></div>
	</div>
</template>
<script>
import 'ol/ol.css';
import { Feature, Map, View } from 'ol';
import { Tile as TileLayer } from 'ol/layer';
import XYZ from 'ol/source/XYZ';
import { getArea, getLength } from 'ol/sphere';
import { fromLonLat, transform, toLonLat, Projection, get as getProjection } from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import { Vector as VectorSource } from 'ol/source';
import { Polygon, LineString } from 'ol/geom';
import Point from 'ol/geom/Point.js';
import { Style, Circle as CircleStyle, Icon, Fill, RegularShape, Stroke, Text } from 'ol/style';
import { Draw } from 'ol/interaction';
import { createRegularPolygon, createBox } from 'ol/interaction/Draw.js';
// 默认基础样式
const style = new Style({
	fill: new Fill({
		color: 'blue'
	}),
	stroke: new Stroke({
		color: 'blue',
		lineDash: [10, 10],
		width: 2
	}),
	image: new CircleStyle({
		radius: 5,
		stroke: new Stroke({
			color: 'rgba(0, 0, 0, 0.7)'
		}),
		fill: new Fill({
			color: 'rgba(255, 255, 255, 0.2)'
		})
	})
});
// 终点显示的总长样式
export default {
	data() {
		return {
			selectList: [
				{
					label: '清空绘制图形',
					value: 'None'
				},
				{
					label: '点',
					value: 'Point'
				},
				{
					label: '线',
					value: 'LineString'
				},
				{
					label: '多边形',
					value: 'Polygon'
				},
				{
					label: '圆',
					value: 'Circle'
				},
				{
					label: '正方形',
					value: 'Square'
				},
				{
					label: '长方形',
					value: 'Box'
				}
			],
			selectValue: 'None',
			draw: '',
			map: null,
			source: null
		};
	},
	mounted() {
		this.initMap();
		this.initVector();
	},
	methods: {
		initMap() {
			this.map = new Map({
				target: 'map',
				layers: [
					new TileLayer({
						source: new XYZ({
							//黑色底图
							url: 'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}'
						}),
						visible: true
					})
				],
				view: new View({
					center: fromLonLat([116.39, 39.9]),
					zoom: 4
				})
			});
		},
		initVector() {
			this.source = new VectorSource();
			let vector = new VectorLayer({
				source: this.source,
				style: (feture) => this.getStyle(feture)
			});
			this.map.addLayer(vector);
		},
		selectChange(val) {
			if (this.draw) {
				this.map.removeInteraction(this.draw);
			}
			if (val == 'None') {
				return;
			}
			let type = val;
			let geometryFunction;
			if (val == 'Square') {
				// 正方形
				type = 'Circle';
				geometryFunction = createRegularPolygon(4);
			} else if (val == 'Box') {
				// 矩形
				type = 'Circle';
				geometryFunction = createBox();
			}
			this.draw = new Draw({
				source: this.source,
				type: type,
				snapTolerance: 40, //添加精准绘制
				geometryFunction: geometryFunction,
				style: (feture) => this.getStyle(feture)
			});
			this.map.addInteraction(this.draw);
			return;
		},
		/**
		 * @description: 动态返回样式
		 * @param {*} feature
		 * @return {*}
		 */
		getStyle(feature) {
			let styles = [style];
			let type = feature.getGeometry().getType();
			if (type === 'LineString') {
				let output = this.formatLength(feature.getGeometry());
				let point = new Point(feature.getGeometry().getLastCoordinate());
				let labelStyle = this.getLabelStyle()
                labelStyle.setGeometry(point);
				labelStyle.getText().setText(output);
				styles.push(labelStyle);
			} else if (type === 'Polygon') {
				// 获取内部点
				let point = feature.getGeometry().getInteriorPoint();
				// 获取面积
				let output = this.formatArea(feature.getGeometry());
				// 将终点样式设置到对应的终点
				let labelStyle = this.getLabelStyle()
                labelStyle.setGeometry(point);
				// 终点样式的展示文本修改
				labelStyle.getText().setText(output);
				// 添加到样式数组中
				styles.push(labelStyle);
			}
            console.log(styles)
			return styles;
		},
		getLabelStyle() {
			return new Style({
				text: new Text({
					font: '14px Calibri,sans-serif',
					fill: new Fill({
						color: 'red'
					}),
					backgroundFill: new Fill({
						color: 'rgba(255, 255, 255, 0.2)'
					}),
					padding: [3, 3, 3, 3],
					textBaseline: 'bottom',
					offsetY: -15
				}),
				image: new RegularShape({
					radius: 8,
					points: 3,
					angle: Math.PI,
					displacement: [0, 10],
					fill: new Fill({
						color: 'rgba(0, 0, 0, 0.7)'
					})
				})
			});
		},
		/**
		 * @description: 测量长度输出
		 * @param {*} line
		 * @return {*}
		 */
		formatLength(line) {
			let length;
			//若使用测地学方法测量
			if (this.geodesic) {
				let sourceProj = this.map.getView().getProjection(); //地图数据源投影坐标系
				length = getLength(line, { projection: sourceProj, radius: 6378137 });
			} else {
				length = Math.round(line.getLength() * 100) / 100; //直接得到线的长度
			}
			let output;
			if (length > 100) {
				output = Math.round((length / 1000) * 100) / 100 + ' ' + 'km'; //换算成KM单位
			} else {
				output = Math.round(length * 100) / 100 + ' ' + 'm'; //m为单位
			}
			return output; //返回线的长度
		},
		/**
		 * @description: 测量面积输出
		 * @param {*} polygon
		 * @return {*}
		 */
		formatArea(polygon) {
			let area;
			if (this.geodesic) {
				//若使用测地学方法测量
				let sourceProj = this.map.getView().getProjection(); //地图数据源投影坐标系
				let geom = /** @type {ol.geom.Polygon} */ (
					polygon.clone().transform(sourceProj, 'EPSG:4326')
				); //将多边形要素坐标系投影为EPSG:4326
				area = Math.abs(getArea(geom, { projection: sourceProj, radius: 6378137 })); //获取面积
			} else {
				area = polygon.getArea(); //直接获取多边形的面积
			}
			let output;
			if (area > 10000) {
				output = Math.round((area / 1000000) * 100) / 100 + ' ' + 'km<sup>2</sup>'; //换算成KM单位
			} else {
				output = Math.round(area * 100) / 100 + ' ' + 'm<sup>2</sup>'; //m为单位
			}
			return output; //返回多边形的面积
		}
	}
};
</script>
