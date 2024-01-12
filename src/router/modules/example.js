import ExampleLayout from '@/layout/three/example'

export default {
    path: '/example',
    redirect: '/example/test',
    component: ExampleLayout,
    children: [
        {
            path: 'test',
            component: () =>
                import(/* webpackChunkName: 'Test' */ '@/components/example/Test.vue')
        },
    ]
}
