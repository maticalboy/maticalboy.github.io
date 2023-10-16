<template>
	<div>
		<h2 class="h-title">轨迹回放</h2>
		<div id="map" class="map-x"></div>
	</div>
</template>
<script>
import 'ol/ol.css';
import { Feature, Map, View } from 'ol';
import { Tile as TileLayer } from 'ol/layer';
import XYZ from 'ol/source/XYZ';
import { fromLonLat, transform } from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import { Vector as VectorSource } from 'ol/source';
import { LineString, MultiPolygon } from 'ol/geom';
import Point from 'ol/geom/Point.js';
import { Style, Circle as CircleStyle, Icon, Fill, RegularShape, Stroke, Text } from 'ol/style';
export default {
	data() {
		return {
			map: null,
			styles: {
				route: new Style({
					stroke: new Stroke({
						color: '#bfa',
						width: 2
					})
				}),
				goMark: new Style({
					image: new CircleStyle({
						radius: 7,
						// snapToPixel: false,
						fill: new Fill({ color: 'black' }),
						stroke: new Stroke({
							color: 'white',
							width: 2
						})
					})
				}),
				startMarker: new Style({
					image: new Icon({
						anchor: [0.5, 1],
						src: require('@/assets/joystick_flat.png'),
						scale: 0.2
					})
				}),
				endMarker: new Style({
					image: new Icon({
						anchor: [0.5, 1],
						src: require('@/assets/joystick_flat.png'),
						scale: 0.2,
						offset: [-10, -35]
					})
				})
			},
			featureMove: {},
			carPoints: [], //车还要走的点
			routeIndex: 0, //当前小车所在的路段
			timer: {},
			coordinates: [
				[10836932.628965743, 4998172.218425438],
				[10638182.82599503, 3781582.515392581],
				[10897159.841987172, 3552719.105911153],
				[11120000.530166456, 4986126.775821152],
				[11360909.382252172, 4895785.956289009],
				[11053750.595842887, 3420219.23726401],
				[11294659.4479286, 3257605.7621061527],
				[11565681.906525029, 4823513.300663294],
				[11866817.971632171, 4757263.366339724],
				[11535568.300014313, 3185333.1064804387],
				[11812613.479912885, 3058855.959135439],
				[12125794.987624314, 4721127.038526867],
				[12402840.167522885, 4684990.710714009],
				[12023408.725487886, 2926356.090488296],
				[12300453.905386457, 2860106.1561647244],
				[12643749.0196086, 4630786.218994724],
				[12866589.707787886, 4510331.792951867],
				[12547385.478774315, 2878174.3200711533],
				[12932839.642111458, 2878174.3200711533],
				[13113521.281175744, 3751468.908881867],
				[13125566.723780029, 4739195.202433295],
				[13691702.526181456, 5425785.43087758],
				[13553179.936232172, 6112375.659321865],
				[12920794.199507171, 5407717.266971151],
				[12065567.774602886, 4974081.3332168665],
				[12788294.330860028, 4895785.956289009]
			],
			carPoint: {}
		};
	},
	mounted() {
		this.initMap();
        this.addPointAndView()
	},
	methods: {
		initMap() {
			this.map = new Map({
				target: 'map',
				view: new View({
					center: fromLonLat([120.9800615193, 29.1326618704]),
					zoom: 14
				}),
				layers: [
					new TileLayer({
						source: new XYZ({
							//黑色底图
							url: 'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}'
						}),
						visible: true
					})
				]
			});
		},
		async addPointAndView() {
			//画轨迹线
			await this.drawLine();
			//开始动
			this.moveStart();
		},
		//轨迹线  把每个点连起来
		drawLine() {
			let line = new Feature({
				geometry: new LineString(this.coordinates)
			});
			let source = new VectorSource({
				features: [line]
			});
			let lineLayer = new VectorLayer({
				source: source
			});
			this.map.addLayer(lineLayer);
		},
		//创建小车这个要素
		moveStart() {
			//坐标转换 方便计算下一个位置
			this.dotsData = this.coordinates.map((item) => {
				return transform(item, 'EPSG:3857', 'EPSG:4326');
			});
			//深复制车的位置，不在原数组改变，方便重新播放
			this.carPoints = [...this.dotsData];

			this.carPoint = new Feature({
				geometry: new Point(fromLonLat(this.carPoints[0]))
			});
			this.carPoint.setStyle(
				new Style({
					image: new Icon({
						src: require('@/assets/car.png'),
						scale: 0.2,
						anchor: [0.5, 0.5],
						rotation: -this.countRotate()
					})
				})
			);
			let source = new VectorSource({
				features: [this.carPoint]
			});
			this.carLayer = new VectorLayer({
				source: source
			});
			this.map.addLayer(this.carLayer);
			this.timeStart();
		},
		//计时器开始
		timeStart() {
			this.timer = setInterval(() => {
				if (this.routeIndex + 1 >= this.carPoints.length) {
					//重头开始
					this.routeIndex = 0;
					//移除要素
					this.carLayer.getSource().removeFeature(this.carPoint);
					clearInterval(this.timer);
					//重复运动
					this.addPointAndView(); //自动开启功能
					return;
				}
				// 到达下一个点了 需要变化角度
				if (this.nextPoint() === this.carPoints[this.routeIndex + 1]) {
					this.routeIndex++;
					this.carPoint.getStyle().getImage().setRotation(-this.countRotate());
				}
				//改变坐标点
				this.carPoint
					.getGeometry()
					.setCoordinates(fromLonLat(this.carPoints[this.routeIndex]));
			}, 10);
		},
		//计算下一个点的位置
		//这里的算法是计算了两点之间的点   两点之间的连线可能存在很多个计算出来的点
		nextPoint() {
			let routeIndex = this.routeIndex;
			let p1 = this.map.getPixelFromCoordinate(fromLonLat(this.carPoints[routeIndex])); //获取在屏幕的像素位置
			let p2 = this.map.getPixelFromCoordinate(fromLonLat(this.carPoints[routeIndex + 1]));
			let dx = p2[0] - p1[0];
			let dy = p2[1] - p1[1];
			//打印可见  在没有走到下一个点之前，下一个点是不变的，前一个点以这个点为终点向其靠近
			let distance = Math.sqrt(dx * dx + dy * dy);
			if (distance <= 1) {
				return this.carPoints[routeIndex + 1];
			} else {
				let x = p1[0] + dx / distance;
				let y = p1[1] + dy / distance;
				let coor = transform(
					this.map.getCoordinateFromPixel([x, y]),
					'EPSG:3857',
					'EPSG:4326'
				);
				this.carPoints[routeIndex] = coor; //这里会将前一个点重新赋值  要素利用这个坐标变化进行移动
				return this.carPoints[routeIndex];
			}
		},
		//计算两点之间的角度  算旋转角度
		countRotate() {
			let i = this.routeIndex,
				j = i + 1;
			if (j === this.carPoints.length) {
				i--;
				j--;
			}
			let p1 = this.carPoints[i];
			let p2 = this.carPoints[j];
			// console.log(Math.atan2(p2[0] - p1[0], p2[1] - p1[1]),p2[0] - p1[0],p2[1] - p1[1])
			return Math.atan2(p2[1] - p1[1], p2[0] - p1[0]);
		}
	}
};
</script>
