import ExampleLayout from '@/layout/openlayers/example'

export default {
    path: '/openlayers',
    redirect: '/openlayers/firstMap',
    component: ExampleLayout,
    children: [
        {
            path: 'firstMap',
            name: 'FirstMap',
            component: () => import('@/views/openlayers/firstMap/FirstMap')
        },
        {
            path: 'popup',
            name: 'Popup',
            component: () => import('@/views/openlayers/popup/Popup')
        },
        {
            path: 'mapMarker',
            name: 'MapMarker',
            component: () => import('@/views/openlayers/mapMarker/MapMarker')
        },
        {
            path: 'zoom',
            name: 'Zoom',
            component: () => import('@/views/openlayers/zoom/Zoom.vue')
        },
        {
            path: 'tabindex',
            name: 'TabIndex',
            component: () => import('@/views/openlayers/tabIndex/TabIndex')
        },
        {
            path: 'changeTarget',
            name: 'ChangeTarget',
            component: () => import('@/views/openlayers/changeTarget/ChangeTarget')
        },
        {
            path: 'synchronization',
            name: 'Synchronization',
            component: () => import('@/views/openlayers/synchronization/Synchronization')
        },
        {
            path: 'preloadMap',
            name: 'PreloadMap',
            component: () => import('@/views/openlayers/preloadMap/PreloadMap')
        },
        {
            path: 'vectorJSON',
            name: 'VectorJSON',
            component: () => import('@/views/openlayers/vectorJSON/VectorJSON')
        },
        {
            path: 'vectorHigh',
            name: 'VectorHigh',
            component: () => import('@/views/openlayers/vectorHigh/vectorHigh')
        },
        {
            path: 'rotationMap',
            name: 'RotationMap',
            component: () => import('@/views/openlayers/rotationMap/RotationMap')
        },
        {
            path: 'viewAnimate',
            name: 'ViewAnimate',
            component: () => import('@/views/openlayers/viewAnimate/ViewAnimate')
        },
        {
            path: 'graticule',
            name: 'Graticule',
            component: () => import('@/views/openlayers/graticule/Graticule')
        },
        {
            path: 'heatmap',
            name: 'Heatmap',
            component: () => import('@/views/openlayers/heatmap/heatmap')
        },
        {
            path: 'scaleLine',
            name: 'ScaleLine',
            component: () => import('@/views/openlayers/scaleLine/ScaleLine')
        },
        {
            path: 'fullScreen',
            name: 'FullScreen',
            component: () => import('@/views/openlayers/fullScreen/FullScreen')
        },
        {
            path: 'zoomToExtent',
            name: 'ZoomToExtent',
            component: () => import('@/views/openlayers/zoomToExtent/ZoomToExtent')
        },
        {
            path: 'overviewMap',
            name: 'OverviewMap',
            component: () => import('@/views/openlayers/overviewMap/OverviewMap')
        },
        {
            path: 'mousePosition',
            name: 'MousePosition',
            component: () => import('@/views/openlayers/mousePosition/MousePosition')
        },
        {
            path: 'zoomSlider',
            name: 'ZoomSlider',
            component: () => import('@/views/openlayers/zoomSlider/ZoomSlider')
        },
        {
            path: 'layerSet',
            name: 'LayerSet',
            component: () => import('@/views/openlayers/layerSet/LayerSet')
        },
        {
            path: 'setZIndex',
            name: 'SetZIndex',
            component: () => import('@/views/openlayers/setZIndex/SetZIndex')
        },
        {
            path: 'setResolution',
            name: 'SetResolution',
            component: () => import('@/views/openlayers/setResolution/SetResolution')
        },
        {
            path: 'setExtent',
            name: 'SetExtent',
            component: () => import('@/views/openlayers/setExtent/SetExtent')
        },
        {
            path: 'coverageModal',
            name: 'CoverageModal',
            component: () => import('@/views/openlayers/coverageModal/coverageModal')
        },
        {
            path: 'setSource',
            name: 'SetSource',
            component: () => import('@/views/openlayers/setSource/SetSource')
        },
        {
            path: 'simplenessLabel',
            name: 'SimplenessLabel',
            component: () => import('@/views/openlayers/simplenessLabel/SimplenessLabel')
        },
        {
            path: 'brightMark',
            name: 'BrightMark',
            component: () => import('@/views/openlayers/brightMark/BrightMark')
        },
        {
            path: 'polymerization',
            name: 'Polymerization',
            component: () => import('@/views/openlayers/polymerization/Polymerization')
        },
        {
            path: 'basicDraw',
            name: 'BasicDraw',
            component: () => import('@/views/openlayers/basicDraw/basicDraw')
        },
        {
            path: 'drawGraph',
            name: 'DrawGraph',
            component: () => import('@/views/openlayers/drawGraph/drawGraph')
        },
        {
            path: 'freeDrawing',
            name: 'FreeDrawing',
            component: () => import('@/views/openlayers/freeDrawing/freeDrawing')
        },
        {
            path: 'arrowLine',
            name: 'ArrowLine',
            component: () => import('@/views/openlayers/arrowLine/arrowLine')
        },
        {
            path: 'snapGraph',
            name: 'SnapGraph',
            component: () => import('@/views/openlayers/snapGraph/snapGraph')
        },
        {
            path: 'mouseRotationMap',
            name: 'MouseRotationMap',
            component: () => import('@/views/openlayers/mouseRotationMap/mouseRotationMap')
        },
        {
            path: 'calculatedLength',
            name: 'CalculatedLength',
            component: () => import('@/views/openlayers/calculatedLength/calculatedLength')
        },
        {
            path: 'calculatedArea',
            name: 'CalculatedArea',
            component: () => import('@/views/openlayers/calculatedArea/calculatedArea')
        },
        {
            path: 'drawGraphPro',
            name: 'DrawGraphPro',
            component: () => import('@/views/openlayers/drawGraphPro/drawGraphPro')
        },
        {
            path: 'calculated',
            name: 'Calculated',
            component: () => import('@/views/openlayers/calculated/Calculated')

        },
        {
            path: 'trackPlayback',
            name: 'TrackPlayback',
            component: () => import('@/views/openlayers/trackPlayback/TrackPlayback')

        },
        {
            path: 'waterMark',
            name: 'WaterMark',
            component: () => import('@/views/openlayers/waterMark/WaterMark')

        },
    ]
}
