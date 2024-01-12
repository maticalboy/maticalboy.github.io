export default {
    path: '/three',
    redirect: '/three/study',
    component: () => import('@/layout/three/example'),
    children: [
        {
            path: 'study',
            title: '总览学习',
            component: () =>
                import('@/components/three/Study.vue')
        },
        {
            path: 'drawLine',
            title: '绘制线',
            component: () => {
                return import('@/components/three/DrawLine.vue')
            }
        },
        {
            path: 'imageUtils',
            title: '自定义纹理',
            component: () => {
                return import('@/components/three/ImageUtils.vue')
            }
        },
        {
            path: 'gridLine',
            title: '网格',
            component: () => {
                return import('@/components/three/GridLine.vue')
            }
        },
        {
            path: 'builtGeometry',
            title: '内置几何',
            component: () => {
                return import('@/components/three/BuiltGeometry.vue')
            }
        },
        {
            path: 'userControl',
            title: '用户交互',
            component: () => {
                return import('@/components/three/UserControl.vue')
            }
        },
        {
            path: 'stats',
            title: '性能检测',
            component: () => {
                return import('@/components/three/Stats.vue')
            }
        },
        {
            path: 'fontLoader',
            title: '三维字体',
            component: () => {
                return import('@/components/three/FontLoader.vue')
            }
        },
        {
            path: 'castShadow',
            title: '阴影',
            component: () => {
                return import('@/components/three/CastShadow.vue')
            }
        },
        {
            path: 'gui',
            title: 'GUI',
            component: () => {
                return import('@/components/three/Gui.vue')
            }
        },
        {
            path: 'senceFog',
            title: '场景雾化',
            component: () => {
                return import('@/components/three/SenceFog.vue')
            }
        },
        {
            path: 'flyControls',
            title: '飞行控制器',
            component: () => {
                return import('@/components/three/FlyControls.vue')
            }
        },
        {
            path: 'lensFlares',
            title: '光晕',
            component: () => {
                return import('@/components/three/LensFlares.vue')
            }
        },
        {
            path: 'blendMateria',
            title: '材质融合',
            component: () => {
                return import('@/components/three/BlendMateria.vue')
            }
        },
        {
            path: 'gosper',
            title: '高斯帕曲线',
            component: () => {
                return import('@/components/three/Gosper.vue')
            }
        },
        {
            path: 'convexGeometry',
            title: '凸包',
            component: () => {
                return import('@/components/three/ConvexGeometry.vue')
            }
        },
        {
            path: 'latheGeometry',
            title: '机床模型',
            component: () => {
                return import('@/components/three/LatheGeometry.vue')
            }
        },
        {
            path: 'extrudeGeometry',
            title: '二维拉伸几何',
            component: () => {
                return import('@/components/three/ExtrudeGeometry.vue')
            }
        },
        {
            path: 'tubeGeometry',
            title: '三维管道',
            component: () => {
                return import('@/components/three/TubeGeometry.vue')
            }
        },
        {
            path: 'svgLoader',
            title: 'svg转三维立体',
            component: () => {
                return import('@/components/three/SvgLoader.vue')
            }
        },
        {
            path: 'parametricGeometry',
            title: '公式几何体',
            component: () => {
                return import('@/components/three/ParametricGeometry.vue')
            }
        },
        {
            path: 'raycaster',
            title: '点击事件',
            component: () => {
                return import('@/components/three/Raycaster.vue')
            }
        },
        {
            path: 'canvasPoint',
            title: '糖豆人',
            component: () => {
                return import('@/components/three/CanvasPoint.vue')
            }
        },
        {
            path: 'rain',
            title: '下雨',
            component: () => {
                return import('@/components/three/Rain.vue')
            }
        },
        {
            path: 'demo',
            title: 'demo',
            component: () => {
                return import('@/components/three/Demo.vue')
            }
        },
        {
            path: 'house',
            title: '移动的房子',
            component: () => {
                return import('@/components/three/House.vue')
            }
        },
        {
            path: 'people',
            title: '移动的人',
            component: () => {
                return import('@/components/three/People.vue')
            }
        },
        {
            path: 'vr',
            title: 'VR',
            component: () => {
                return import('@/components/three/VR.vue')
            }
        }
    ]
}

