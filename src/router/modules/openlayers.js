export default {
    path: '/openlayers',
    redirect: '/openlayers/firstMap',
    component: () => import('@/layout/openlayers/example'),
    children: [
        {
            path: 'veryBigProgram',
            name: 'VeryBigProgram',
            title: "openlayers总结",
            component: () => import('@/components/openlayers/VeryBigProgram/index')
        },
        {
            path: 'firstMap',
            name: 'FirstMap',
            title: "地图",
            component: () => import('@/components/openlayers/firstMap/FirstMap')
        },
        {
            path: 'popup',
            name: 'Popup',
            title: "弹窗",
            component: () => import('@/components/openlayers/popup/Popup')
        },
        {
            path: 'mapMarker',
            name: 'MapMarker',
            title: "标记",
            component: () => import('@/components/openlayers/mapMarker/MapMarker')
        },
        {
            path: 'zoom',
            name: 'Zoom',
            title: "地图缩放级别",
            component: () => import('@/components/openlayers/zoom/Zoom.vue')
        },
        {
            path: 'tabindex',
            name: 'TabIndex',
            title: "单击激活地图",
            component: () => import('@/components/openlayers/tabIndex/TabIndex')
        },
        {
            path: 'changeTarget',
            name: 'ChangeTarget',
            title: "切换地图容器",
            component: () => import('@/components/openlayers/changeTarget/ChangeTarget')
        },
        {
            path: 'synchronization',
            name: 'Synchronization',
            title: "同步两个地图",
            component: () => import('@/components/openlayers/synchronization/Synchronization')
        },
        {
            path: 'preloadMap',
            name: 'PreloadMap',
            title: "预加载",
            component: () => import('@/components/openlayers/preloadMap/PreloadMap')
        },
        {
            path: 'vectorJSON',
            name: 'VectorJSON',
            title: "矢量图",
            component: () => import('@/components/openlayers/vectorJSON/VectorJSON')
        },
        {
            path: 'vectorHigh',
            name: 'VectorHigh',
            title: "矢量图",
            component: () => import('@/components/openlayers/vectorHigh/vectorHigh')
        },
        {
            path: 'rotationMap',
            name: 'RotationMap',
            title: "旋转",
            component: () => import('@/components/openlayers/rotationMap/RotationMap')
        },
        {
            path: 'viewAnimate',
            name: 'ViewAnimate',
            title: "动画",
            component: () => import('@/components/openlayers/viewAnimate/ViewAnimate')
        },
        {
            path: 'graticule',
            name: 'Graticule',
            title: "网格",
            component: () => import('@/components/openlayers/graticule/Graticule')
        },
        {
            path: 'heatmap',
            name: 'Heatmap',
            title: "热力图",
            component: () => import('@/components/openlayers/heatmap/heatmap')
        },
        {
            path: 'scaleLine',
            name: 'ScaleLine',
            title: "比例尺控件",
            component: () => import('@/components/openlayers/scaleLine/ScaleLine')
        },
        {
            path: 'fullScreen',
            name: 'FullScreen',
            title: "全屏控件",
            component: () => import('@/components/openlayers/fullScreen/FullScreen')
        },
        {
            path: 'zoomToExtent',
            name: 'ZoomToExtent',
            title: "导览控件",
            component: () => import('@/components/openlayers/zoomToExtent/ZoomToExtent')
        },
        {
            path: 'overviewMap',
            name: 'OverviewMap',
            title: "总览控件",
            component: () => import('@/components/openlayers/overviewMap/OverviewMap')
        },
        {
            path: 'mousePosition',
            name: 'MousePosition',
            title: "鼠标位置控件",
            component: () => import('@/components/openlayers/mousePosition/MousePosition')
        },
        {
            path: 'zoomSlider',
            name: 'ZoomSlider',
            title: "缩放滑块控件",
            component: () => import('@/components/openlayers/zoomSlider/ZoomSlider')
        },
        {
            path: 'layerSet',
            name: 'LayerSet',
            title: "图层组",
            component: () => import('@/components/openlayers/layerSet/LayerSet')
        },
        {
            path: 'setZIndex',
            name: 'SetZIndex',
            title: "控制图层层叠关系",
            component: () => import('@/components/openlayers/setZIndex/SetZIndex')
        },
        {
            path: 'setResolution',
            name: 'SetResolution',
            title: "限制分辨率",
            component: () => import('@/components/openlayers/setResolution/SetResolution')
        },
        {
            path: 'setExtent',
            name: 'SetExtent',
            title: "按限制范围加载图层",
            component: () => import('@/components/openlayers/setExtent/SetExtent')
        },
        {
            path: 'coverageModal',
            name: 'CoverageModal',
            title: "图层遮罩效果",
            component: () => import('@/components/openlayers/coverageModal/coverageModal')
        },
        {
            path: 'setSource',
            name: 'SetSource',
            title: "设置图层的源",
            component: () => import('@/components/openlayers/setSource/SetSource')
        },
        {
            path: 'simplenessLabel',
            name: 'SimplenessLabel',
            title: "简单的标记",
            component: () => import('@/components/openlayers/simplenessLabel/SimplenessLabel')
        },
        {
            path: 'brightMark',
            name: 'BrightMark',
            title: "定义标记颜色",
            component: () => import('@/components/openlayers/brightMark/BrightMark')
        },
        {
            path: 'polymerization',
            name: 'Polymerization',
            title: "聚合数据",
            component: () => import('@/components/openlayers/polymerization/Polymerization')
        },
        {
            path: 'basicDraw',
            name: 'BasicDraw',
            title: "绘制点、线、面",
            component: () => import('@/components/openlayers/basicDraw/basicDraw')
        },
        {
            path: 'drawGraph',
            name: 'DrawGraph',
            title: "绘制图形",
            component: () => import('@/components/openlayers/drawGraph/drawGraph')
        },
        {
            path: 'freeDrawing',
            name: 'FreeDrawing',
            title: "自由绘制图形",
            component: () => import('@/components/openlayers/freeDrawing/freeDrawing')
        },
        {
            path: 'arrowLine',
            name: 'ArrowLine',
            title: "带箭头的线段 ",
            component: () => import('@/components/openlayers/arrowLine/arrowLine')
        },
        {
            path: 'snapGraph',
            name: 'SnapGraph',
            title: "修改已绘制的图形",
            component: () => import('@/components/openlayers/snapGraph/snapGraph')
        },
        {
            path: 'mouseRotationMap',
            name: 'MouseRotationMap',
            title: "鼠标拖拽旋转/缩放",
            component: () => import('@/components/openlayers/mouseRotationMap/mouseRotationMap')
        },
        {
            path: 'calculatedLength',
            name: 'CalculatedLength',
            title: "计算长度",
            component: () => import('@/components/openlayers/calculatedLength/calculatedLength')
        },
        {
            path: 'calculatedArea',
            name: 'CalculatedArea',
            title: "计算面积",
            component: () => import('@/components/openlayers/calculatedArea/calculatedArea')
        },
        {
            path: 'drawGraphPro',
            name: 'DrawGraphPro',
            title: "绘制图形Element",
            component: () => import('@/components/openlayers/drawGraphPro/drawGraphPro')
        },
        {
            path: 'calculated',
            name: 'Calculated',
            title: "绘制长度和面基",
            component: () => import('@/components/openlayers/calculated/Calculated')

        },
        {
            path: 'trackPlayback',
            name: 'TrackPlayback',
            title: "轨迹回放",
            component: () => import('@/components/openlayers/trackPlayback/TrackPlayback')

        },
        {
            path: 'waterMark',
            name: 'WaterMark',
            title: "添加水印",
            component: () => import('@/components/openlayers/waterMark/WaterMark')

        },
    ]
}
