<template>
	<div id="mapCon">
		<h2 class="h-title">计算距离和面积 calculatedLengthAndArea</h2>
		<div id="menu">
			<label>Geometry type &nbsp;</label>
			<el-select v-model="typeValue" placeholder="请选择" @change="typeChange">
				<el-option value="length" label="Length"></el-option>
				<el-option value="area" label="Area"></el-option>
			</el-select>
			<el-checkbox v-model="geodesic">use geodesic measures</el-checkbox>
		</div>
		<!-- <el-button type="primary" @click="addInteraction">测距测面</el-button> -->
		<div id="map" class="map-x"></div>
	</div>
</template>
<script>
import 'ol/ol.css';
import { Map, View } from 'ol';
import { unByKey } from 'ol/Observable';
import { getArea, getLength } from 'ol/sphere';
import { Heatmap as HeatmapLayer, Tile as TileLayer } from 'ol/layer';
import XYZ from 'ol/source/XYZ';
import VectorLayer from 'ol/layer/Vector';
import { Vector as VectorSource } from 'ol/source';
import { Polygon, LineString } from 'ol/geom';
import { Style, Circle as CircleStyle, Icon, Fill, RegularShape, Stroke, Text } from 'ol/style';
import Overlay from 'ol/Overlay';
import { Draw } from 'ol/interaction';
export default {
	data() {
		return {
			map: null,
			source: null,
			vector: null,
			draw: null,
			// 当前绘制的要素（Currently drawn feature.）
			sketch: null,
			// 帮助提示框对象（The help tooltip element.）
			helpTooltipElement: null,
			// 帮助提示框显示的信息（Overlay to show the help messages.）
			helpTooltip: '',
			// 测量工具提示框对象（The measure tooltip element. ）
			measureTooltipElement: null,
			// 测量工具提示框显示的信息（Overlay to show the measurement.）
			measureTooltip: '',
			// 当用户正在绘制多边形时的提示信息文本
			continuePolygonMsg: 'Click to continue drawing the polygon',
			// 当用户正在绘制线时的提示信息文本
			continueLineMsg: 'Click to continue drawing the line',
			// 测量类型
			typeValue: 'length',
			// 测地学方式
			geodesic: false
		};
	},
	mounted() {
		this.initMap();
		this.createHelpTooltip();
		this.createMeasureTooltip();
		this.addVectorLayer();
		this.addInteraction();
	},
	methods: {
		initMap() {
			this.map = new Map({
				target: 'map',
				view: new View({
					center: [0, 0], //地图初始中心点
					zoom: 4 //地图初始显示级别
				}),
				layers: [
					new TileLayer({
						title: '天地图矢量图层',
						source: new XYZ({
							url: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",
							wrapX: false
						})
					}),
				]
			});
		},
		/**
		 * @description: 创建一个新的帮助提示框
		 * @return {*}
		 */
		createHelpTooltip() {
			if (this.helpTooltipElement) {
				this.helpTooltipElement.parentNode.removeChild(this.helpTooltipElement);
			}
			this.helpTooltipElement = document.createElement('div');
			this.helpTooltipElement.className = 'tooltip hidden';
			this.helpTooltip = new Overlay({
				element: this.helpTooltipElement,
				offset: [15, 0],
				positioning: 'center-left'
			});
			this.map.addOverlay(this.helpTooltip);
		},
		/**
		 * @description: 创建一个新的测量工具提示框（tooltip）
		 * @return {*}
		 */
		createMeasureTooltip() {
			if (this.measureTooltipElement) {
				this.measureTooltipElement.parentNode.removeChild(this.measureTooltipElement);
			}
			this.measureTooltipElement = document.createElement('div');
			this.measureTooltipElement.className = 'tooltip tooltip-measure';
			this.measureTooltip = new Overlay({
				element: this.measureTooltipElement,
				offset: [0, -15],
				positioning: 'bottom-center'
			});
			this.map.addOverlay(this.measureTooltip);
		},
		/**
		 * @description: 加载测量的绘制矢量层
		 * @return {*}
		 */
		addVectorLayer() {
			this.source = new VectorSource({});
			this.vector = new VectorLayer({
				source: this.source,
				style: new Style({
					fill: new Fill({
						color: 'rgba(255, 255, 255, 0.2)' //填充颜色
					}),
					stroke: new Stroke({
						color: '#ffcc33', //边框颜色
						width: 2 // 边框宽度
					}),
					image: new CircleStyle({
						radius: 7,
						fill: new Fill({
							color: '#ffcc33'
						})
					})
				})
			});
			this.map.addLayer(this.vector);
			// 地图容器绑定鼠标移动事件，动态显示帮助提示框内容
			this.map.on('pointermove', this.pointerMoveHandler);
			//地图绑定鼠标移出事件，鼠标移出时为帮助提示框设置隐藏样式
			this.map.getViewport().addEventListener('mouseout', () => {
				this.helpTooltipElement.classList.add('hidden');
			});
		},
		/**
		 * @description: 鼠标移动事件
		 * @return {*}
		 */
		pointerMoveHandler(evt) {
			if (evt.dragging) {
				return;
			}
			/** @type {string} */
			let helpMsg = 'Click to start drawing'; //当前默认提示信息
			//判断绘制几何类型设置相应的帮助提示信息
			if (this.sketch) {
				var geom = this.sketch.getGeometry();
				if (geom instanceof Polygon) {
					//绘制多边形时提示相应内容
					helpMsg = this.continuePolygonMsg;
				} else if (geom instanceof LineString) {
					//绘制线时提示相应内容
					helpMsg = this.continueLineMsg;
				}
			}
			//将提示信息设置到对话框中显示
			this.helpTooltipElement.innerHTML = helpMsg;
			//设置帮助提示框的位置
			this.helpTooltip.setPosition(evt.coordinate);
			// 移除帮助提示框的隐藏样式进行显示
			this.helpTooltipElement.classList.remove('hidden');
		},
		/**
		 * @description: 加载交互绘制控件
		 * @return {*}
		 */
		addInteraction() {
			let type = this.typeValue == 'area' ? 'Polygon' : 'LineString';
			this.draw = new Draw({
				source: this.source,
				type: type,
				style: new Style({
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
				})
			});
			let listener;
			// 绑定交互绘制工具开始绘制的事件
			this.draw.on(
				'drawstart',
				(evt) => {
					// set sketch
					this.sketch = evt.feature; //绘制的要素

					/** @type {ol.Coordinate|undefined} */
					var tooltipCoord = evt.coordinate; // 绘制的坐标
					//绑定change事件，根据绘制几何类型得到测量长度值或面积值，并将其设置到测量工具提示框中显示
					listener = this.sketch.getGeometry().on('change', (evt) => {
						var geom = evt.target; //绘制几何要素
						var output;
						if (geom instanceof Polygon) {
							output = this.formatArea(/** @type {ol.geom.Polygon} */ (geom)); //面积值
							tooltipCoord = geom.getInteriorPoint().getCoordinates(); //坐标
						} else if (geom instanceof LineString) {
							output = this.formatLength(/** @type {ol.geom.LineString} */ (geom)); //长度值
							tooltipCoord = geom.getLastCoordinate(); //坐标
						}
						this.measureTooltipElement.innerHTML = output; //将测量值设置到测量工具提示框中显示
						this.measureTooltip.setPosition(tooltipCoord); //设置测量工具提示框的显示位置
					});
				},
				this
			);
			// 绑定交互绘制工具结束绘制的事件
			this.draw.on(
				'drawend',
				(evt) => {
					this.measureTooltipElement.className = 'tooltip tooltip-static'; //设置测量提示框的样式
					this.measureTooltip.setOffset([0, -7]);
					// unset sketch
					this.sketch = null; //置空当前绘制的要素对象
					// unset tooltip so that a new one can be created
					this.measureTooltipElement = null; //置空测量工具提示框对象
					this.createMeasureTooltip(); //重新创建一个测试工具提示框显示结果
					unByKey(listener);
				},
				this
			);
			this.map.addInteraction(this.draw);
		},
		/**
		 * @description: 用户切换选择测量类型（长度/面积）
		 * @return {*}
		 */
		typeChange() {
			this.map.removeInteraction(this.draw); //移除绘制图形交互
			this.addInteraction(); //添加绘图进行测量
		},
		/**
		 * @description: 测量长度输出
		 * @param {*} line
		 * @return {*}
		 */
		formatLength(line) {
			var length;
			//若使用测地学方法测量
			if (this.geodesic) {
				var sourceProj = this.map.getView().getProjection(); //地图数据源投影坐标系
				length = getLength(line, { projection: sourceProj, radius: 6378137 });
			} else {
				length = Math.round(line.getLength() * 100) / 100; //直接得到线的长度
			}
			var output;
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
			var area;
			if (this.geodesic) {
				//若使用测地学方法测量
				var sourceProj = this.map.getView().getProjection(); //地图数据源投影坐标系
				var geom = /** @type {ol.geom.Polygon} */ (
					polygon.clone().transform(sourceProj, 'EPSG:4326')
				); //将多边形要素坐标系投影为EPSG:4326
				area = Math.abs(getArea(geom, { projection: sourceProj, radius: 6378137 })); //获取面积
			} else {
				area = polygon.getArea(); //直接获取多边形的面积
			}
			var output;
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
<style scoped>
#mapCon {
	width: 100%;
	height: 95%;
	/* position: absolute; */
}

#menu {
	margin:0 auto;
    text-align: center;
}

.checkbox {
	left: 20px;
}
/**
        * 提示框的样式信息
        */
::v-deep .tooltip {
	position: relative;
	background: rgba(0, 0, 0, 0.5);
	border-radius: 4px;
	color: white;
	padding: 4px 8px;
	opacity: 0.7;
	white-space: nowrap;
}

::v-deep .tooltip-measure {
	opacity: 1;
	font-weight: bold;
}

::v-deep .tooltip-static {
	background-color: #ffcc33;
	color: black;
	border: 1px solid white;
}

::v-deep .tooltip-measure:before,
.tooltip-static:before {
	border-top: 6px solid rgba(0, 0, 0, 0.5);
	border-right: 6px solid transparent;
	border-left: 6px solid transparent;
	content: '';
	position: absolute;
	bottom: -6px;
	margin-left: -7px;
	left: 50%;
}

::v-deep .tooltip-static:before {
	border-top-color: #ffcc33;
}
</style>
