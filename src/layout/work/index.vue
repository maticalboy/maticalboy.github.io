<template>
    <div class="work">
        <el-container style="height: 100%">
            <el-header class="work-header">Header</el-header>
            <el-container style="height: calc(100% - 50px)">
                <el-aside width="300px" style="height: 100%">
                    <el-menu
                        default-active="1"
                        class="el-menu-vertical-demo"
                        :router="true"
                        @open="handleOpen"
                        @close="handleClose"
                    >
                        <template v-for="fatherItem in menus">
                            <el-submenu
                                :index="fatherItem.index"
                                :key="fatherItem.id"
                            >
                                <template slot="title">
                                    <i class="el-icon-location"></i>
                                    <span>{{ fatherItem.title }}</span>
                                </template>
                                <el-menu-item
                                    v-for="childItem in fatherItem.menus"
                                    :key="childItem.id"
                                    :index="childItem.index"
                                    >{{ childItem.title }}</el-menu-item
                                >
                            </el-submenu>
                        </template>
                    </el-menu>
                </el-aside>
                <el-main style="height: 100%">
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
        <live2d
            :style="style"
            :model="['Potion-Maker/Pio', 'school-2017-costume-yellow']"
            :direction="direction"
            :size="size"
        ></live2d>
    </div>
</template>
<script>
import live2d from "@/layout/live2D/Live2D.vue";
import autofit from "autofit.js";
export default {
    components: {
        live2d,
    },
    mounted() {
        autofit.init({
            el: ".work",
            ignore: [
                {
                    el: "#map", //必填
                },
            ],
        });
    },
    beforeDestroy() {
        if (autofit) autofit.off();
    },
    data() {
        return {
            style: "position: fixed; bottom: 0; right: 20px;",
            size: 350,
            direction: "right",
            menus: [
                {
                    id: "1",
                    index: "/work/fit",
                    title: "页面自适应",
                    menus: [
                        {
                            id: "1-1",
                            index: "/work/autofit",
                            title: "autoFit",
                        },
                    ],
                },
                {
                    id: "2",
                    index: "/work/openlayers",
                    title: "地图",
                    menus: [
                        {
                            id: "1-1",
                            index: "/work/openlayers/ext",
                            title: "矢量拖拽，缩放",
                        },
                    ],
                },
            ],
        };
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
    },
};
</script>
<style lang="less" scoped>
.work-header {
    display: flex;
    height: 50px;
    padding: 20px;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    box-sizing: border-box;
}
:deep(.el-main) {
    // width: calc(100% - 300px);
    width: 1600px;
    margin: 0;
    padding: 0;
}
</style>
