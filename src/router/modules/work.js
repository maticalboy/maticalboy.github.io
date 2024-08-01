import workLayout from '@/layout/work'

export default {
    path: '/work',
    component: workLayout,
    children: [
        {
            path: 'autofit',
            component: () =>
                import('@/components/work/autoFit.vue')
        },
        {
            path: 'openlayers/ext',
            component: () =>
                import('@/components/work/Ext.vue')
        },
    ]
}
