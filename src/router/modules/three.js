import ExampleLayout from '@/layout/three/example'

export default {
    path: '/three',
    redirect: '/three/study',
    component: ExampleLayout,
    children: [
        {
            path: 'study',
            component: () =>
                import(/* webpackChunkName: 'Study' */ '@/views/three/Study.vue')
        },
        {
            path: 'drawLine',
            component: () => {
                return import(/* webpackChunkName: 'DrawLine' */ '@/views/three/DrawLine.vue')
            }
        },
        {
            path: 'imageUtils',
            component: () => {
                return import(/* webpackChunkName: 'ImageUtils' */ '@/views/three/ImageUtils.vue')
            }
        },
        {
            path: 'gridLine',
            component: () => {
                return import(/* webpackChunkName: 'GridLine' */ '@/views/three/GridLine.vue')
            }
        },
        {
            path: 'builtGeometry',
            component: () => {
                return import(/* webpackChunkName: 'BuiltGeometry' */ '@/views/three/BuiltGeometry.vue')
            }
        },
        {
            path: 'userControl',
            component: () => {
                return import(/* webpackChunkName: 'UserControl' */ '@/views/three/UserControl.vue')
            }
        },
        {
            path: 'stats',
            component: () => {
                return import(/* webpackChunkName: 'Stats' */ '@/views/three/Stats.vue')
            }
        },
        {
            path: 'fontLoader',
            component: () => {
                return import(/* webpackChunkName: 'FontLoader' */ '@/views/three/FontLoader.vue')
            }
        },
        {
            path: 'castShadow',
            component: () => {
                return import(/* webpackChunkName: 'CastShadow' */ '@/views/three/CastShadow.vue')
            }
        },
        {
            path: 'gui',
            component: () => {
                return import(/* webpackChunkName: 'Gui' */ '@/views/three/Gui.vue')
            }
        },
        {
            path: 'senceFog',
            component: () => {
                return import(/* webpackChunkName: 'SenceFog' */ '@/views/three/SenceFog.vue')
            }
        },
        {
            path: 'flyControls',
            component: () => {
                return import(/* webpackChunkName: 'FlyControls' */ '@/views/three/FlyControls.vue')
            }
        },
        {
            path: 'lensFlares',
            component: () => {
                return import(/* webpackChunkName: 'LensFlares' */ '@/views/three/LensFlares.vue')
            }
        },
        {
            path: 'blendMateria',
            component: () => {
                return import(/* webpackChunkName: 'BlendMateria' */ '@/views/three/BlendMateria.vue')
            }
        },
        {
            path: 'BlendMateria.vue',
            component: () => {
                return import(/* webpackChunkName: 'BlendMateria' */ '@/views/three/BlendMateria.vue')
            }
        },
        {
            path: 'gosper',
            component: () => {
                return import(/* webpackChunkName: 'Gosper' */ '@/views/three/Gosper.vue')
            }
        },
        {
            path: 'convexGeometry',
            component: () => {
                return import(/* webpackChunkName: 'ConvexGeometry' */ '@/views/three/ConvexGeometry.vue')
            }
        },
        {
            path: 'latheGeometry',
            component: () => {
                return import(/* webpackChunkName: 'LatheGeometry' */ '@/views/three/LatheGeometry.vue')
            }
        },
        {
            path: 'extrudeGeometry',
            component: () => {
                return import(/* webpackChunkName: 'ExtrudeGeometry' */ '@/views/three/ExtrudeGeometry.vue')
            }
        },
        {
            path: 'tubeGeometry',
            component: () => {
                return import(/* webpackChunkName: 'TubeGeometry' */ '@/views/three/TubeGeometry.vue')
            }
        },
        {
            path: 'svgLoader',
            component: () => {
                return import(/* webpackChunkName: 'SvgLoader' */ '@/views/three/SvgLoader.vue')
            }
        },
        {
            path: 'parametricGeometry',
            component: () => {
                return import(/* webpackChunkName: 'ParametricGeometry' */ '@/views/three/ParametricGeometry.vue')
            }
        },
        {
            path: 'raycaster',
            component: () => {
                return import(/* webpackChunkName: 'Raycaster' */ '@/views/three/Raycaster.vue')
            }
        },
        {
            path:'canvasPoint',
            component: () => {
                return import(/* webpackChunkName: 'CanvasPoint' */ '@/views/three/CanvasPoint.vue')
            }
        },
        {
            path:'rain',
            component: () => {
                return import(/* webpackChunkName: 'Rain' */ '@/views/three/Rain.vue')
            }
        },
        {
            path:'demo',
            component: () => {
                return import(/* webpackChunkName: 'Demo' */ '@/views/three/Demo.vue')
            }
        },
        {
            path:'house',
            component: () => {
                return import(/* webpackChunkName: 'House' */ '@/views/three/House.vue')
            }
        },
        {
            path:'people',
            component: () => {
                return import(/* webpackChunkName: 'People' */ '@/views/three/People.vue')
            }
        },
        {
            path:'vr',
            component: () => {
                return import(/* webpackChunkName: 'VR' */ '@/views/three/VR.vue')
            }
        }
    ]
}
