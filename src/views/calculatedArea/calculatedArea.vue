<template>
	<div>
		<h2 class="h-title">计算面基 calculatedArea</h2>
		<div id="map" class="map-x"></div>
	</div>
</template>
<script>
import 'ol/ol.css';
import { Map, View } from 'ol';
import { Tile as TileLayer } from 'ol/layer';
import XYZ from 'ol/source/XYZ';
import { getLength, getArea } from 'ol/sphere';
import { fromLonLat } from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import { Vector as VectorSource } from 'ol/source';
import { LineString } from 'ol/geom';
import Point from 'ol/geom/Point.js';
import { Style, Circle as CircleStyle, Fill, RegularShape, Stroke, Text } from 'ol/style';
import { Draw, Modify } from 'ol/interaction';

// 默认基础样式
const style = new Style({
	fill: new Fill({
		color: 'rgba(255, 255, 255, 0.2)'
	}),
	stroke: new Stroke({
		color: 'rgba(0, 0, 0, 0.5)',
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
const labelStyle = new Style({
	text: new Text({
		font: '14px Calibri,sans-serif',
		fill: new Fill({
			color: 'rgba(255, 255, 255, 1)'
		}),
		backgroundFill: new Fill({
			color: 'rgba(0, 0, 0, 0.7)'
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
// 线段之间中点显示的长度样式
const segmentStyle = new Style({
	text: new Text({
		font: '12px Calibri,sans-serif',
		fill: new Fill({
			color: 'rgba(255, 255, 255, 1)'
		}),
		backgroundFill: new Fill({
			color: 'rgba(0, 0, 0, 0.4)'
		}),
		padding: [2, 2, 2, 2],
		textBaseline: 'bottom',
		offsetY: -12
	}),
	image: new RegularShape({
		radius: 6,
		points: 3,
		angle: Math.PI,
		displacement: [0, 8],
		fill: new Fill({
			color: 'rgba(0, 0, 0, 0.4)'
		})
	})
});
// 修改提示语的样式
const modifyStyle = new Style({
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
		text: 'Drag to modify',
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
// 提示语的样式
const tipStyle = new Style({
	text: new Text({
		font: '12px Calibri,sans-serif',
		fill: new Fill({
			color: 'rgba(255, 255, 255, 1)'
		}),
		backgroundFill: new Fill({
			color: 'rgba(0, 0, 0, 0.4)'
		}),
		padding: [2, 2, 2, 2],
		textAlign: 'left',
		offsetX: 15
	})
});
export default {
	data() {
		return {
			map: null,
			draw: null,
			source: null,
			modify: null,
			tipPoint: null,
			// 用于展示提示语
			tip: '',
			// 绘制中提示语
			activeTip: 'Click to continue drawing the polygon',
			// 初始提示语
			idleTip: 'Click to start measuring'
		};
	},
	mounted() {
		this.initMap();
		this.initVector();
		this.initModify();
		this.addInteraction();
	},
	methods: {
		/**
		 * @description: 初始化地图
		 * @return {*}
		 */
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
		/**
		 * @description: 初始化矢量图层
		 * @return {*}
		 */
		initVector() {
			this.source = new VectorSource();
			let vector = new VectorLayer({
				source: this.source,
				style: (feature) => {
					return this.styleFunction(feature);
				}
			});
			this.map.addLayer(vector);
		},
		/**
		 * @description: 初始化修改功能
		 * @return {*}
		 */
		initModify() {
			this.modify = new Modify({ source: this.source, style: modifyStyle });
			this.map.addInteraction(this.modify);
		},
		/**
		 * @description: 计算长度
		 * @param {*} line
		 * @return {*}
		 */
		formatLength(line) {
			const length = getLength(line);
			let output;
			if (length > 100) {
				output = Math.round((length / 1000) * 100) / 100 + ' km';
			} else {
				output = Math.round(length * 100) / 100 + ' m';
			}
			return output;
		},
		/**
		 * @description: 根据图形计算长度
		 * @param {*} line
		 * @return {*}
		 */
		formatArea(polygon) {
			const area = getArea(polygon);
			let output;
			if (area > 10000) {
				output = Math.round((area / 1000000) * 100) / 100 + ' km\xB2';
			} else {
				output = Math.round(area * 100) / 100 + ' m\xB2';
			}
			return output;
		},
		/**
		 * @description: 添加交互
		 * @return {*}
		 */
		addInteraction() {
			this.draw = new Draw({
				source: this.source,
				type: 'Polygon',
				style: (feature) => {
					return this.styleFunction(feature);
				}
			});
			// 提示语 初始化
			this.tip = this.idleTip;
			this.draw.on('drawstart', (e) => {
				// 刚开始 不允许修改
				this.modify.setActive(false);
				this.tip = this.activeTip;
			});
			// 绘制完毕 保存所有的坐标信息
			this.draw.on('drawend', (e) => {
				// 设置修改的样式 在终点
				modifyStyle.setGeometry(this.tipPoint);
				// 绘制完毕 允许修改
				this.modify.setActive(true);
				// 设置修改的样式 在拖拽点
				this.map.once('pointermove', function () {
					modifyStyle.setGeometry();
				});
				// 绘制完毕提示语 初始化
				this.tip = this.idleTip;
				// 获取绘制图形 坐标信息
				this.sktch = e.feature;
				let arr = this.sktch.getGeometry().getCoordinates()[0];
				for (let i = 0; i < arr.length - 1; i++) {
					let line = new LineString([arr[i], arr[i + 1]]);
					console.log('坐标详情', arr[i], arr[i + 1], this.formatLength(line), this.formatArea(this.sktch.getGeometry()));
				}
			});
			this.modify.setActive(true);
			this.map.addInteraction(this.draw);
		},
		/**
		 * @description: 动态显示 距离
		 * @param {*} feature
		 * @return {*}
		 */
		styleFunction(feature) {
			// 初始化样式 最后需要返回 类型 数组
			let styles = [style];
			// 中点样式初始化 一般只取数组中的一个
			let segmentStyles = [segmentStyle];
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
				labelStyle.setGeometry(point);
				// 终点样式的展示文本修改
				labelStyle.getText().setText(output);
				// 添加到样式数组中
				styles.push(labelStyle);
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
						segmentStyles.push(segmentStyle.clone());
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
				!this.modify.getOverlay().getSource().getFeatures().length
			) {
				this.tipPoint = geometry;
				tipStyle.getText().setText(this.tip);
				styles.push(tipStyle);
			}
			return styles;
		}
	}
};
</script>
