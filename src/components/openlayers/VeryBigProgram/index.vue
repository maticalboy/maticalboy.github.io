<!--
 * @Author: “chenjinwei” “507725948@qq.com”
 * @Date: 2023-10-13 08:44:52
 * @LastEditors: “chenjinwei” “507725948@qq.com”
 * @LastEditTime: 2024-01-19 15:41:01
 * @FilePath: \openlayers-demo\vue2-openlayers\src\views\firstMap\FirstMap.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="vm">
        <h2 class="h-title">第一个地图</h2>
        <div class="tool">
            <button @click="changeMapSource">随机切换地图源</button>
            <button @click="changeMapSource($event, 'vec_w')">
                手动切换地图源vec_w
            </button>
            <button @click="changeMapSource($event, 'cva_w')">
                手动切换地图源cva_w
            </button>
            <button
                @click="
                    changeMapSource($event, 'ChinaOnlineStreetPurplishBlue')
                "
            >
                手动切换地图源ChinaOnline
            </button>

            <button @click="showWaterPrint">图层添加水印</button>
            <button @click="caculateLength">测距</button>
            <button @click="caculateArea">测面</button>
        </div>
        <div id="map" class="map-x"></div>
        <div class="explain">
            <p>
                Map：地图容器，核心部分，可加载各类地图与功能控件，用于渲染、表现动态地图。
            </p>
            <p>target：目标元素</p>
            <p>
                layers：图层，包含多个调用数据的子类，由子类的实例加载地图数据，必须结合图层数据源匹配使用。
            </p>
            <p>
                view：地图视图，控制地图缩放等基本交互，以及地图投影坐标系、地图中心点、分辨率、旋转角度等。
            </p>
        </div>
    </div>
</template>

<script>
import MyContainor from "@/utils/openlayers/myContainor.js";
import MyCacuateInteractionContainor from "@/utils/openlayers/myCaculateLengthContainor.js";
import MyCaculateAreaInteractionContainor from "@/utils/openlayers/myCaculateAreaContainor.js";
export default {
    name: "FirstMap",
    data() {
        return {
            containor: {},
            drawInteractionAreaContainor: null,
            drawInteractionLengthContainor: null,
        };
    },
    methods: {
        /**
         * @description: 初始化容器
         * @return {*}
         */
        initContainor() {
            this.containor = new MyContainor();
        },
        /**
         * @description: 添加测距交互
         * @return {*}
         */
        initCaculateLengthContainor() {
            //初始化及添加到map 测距交互
            this.drawInteractionLengthContainor =
                new MyCacuateInteractionContainor();
            this.containor.map.addLayer(
                this.drawInteractionLengthContainor.vectorLayer
            );
            this.containor.map.addInteraction(
                this.drawInteractionLengthContainor.drawInteraction
            );
        },
        /**
         * @description: 添加测面交互
         * @return {*}
         */
        initCaculateAreaContainor() {
            //初始化及添加到map 测面交互
            this.drawInteractionAreaContainor =
                new MyCaculateAreaInteractionContainor();
            this.containor.map.addLayer(
                this.drawInteractionAreaContainor.vectorLayer
            );
            this.containor.map.addInteraction(
                this.drawInteractionAreaContainor.drawInteraction
            );
            this.containor.map.addInteraction(
                this.drawInteractionAreaContainor.modifyInteraction
            );
        },
        /**
         * @description: 显示当前的测距交互
         * @return {*}
         */
        caculateLength() {
            this.drawInteractionLengthContainor.drawInteraction.setActive(
                !this.drawInteractionLengthContainor.drawInteraction.getActive()
            );
            if(this.drawInteractionLengthContainor.drawInteraction.getActive()){
                this.drawInteractionAreaContainor.drawInteraction.setActive(false);
            }
        },
        /**
         * @description: 开启当前的测面交互
         * @return {*}
         */
        caculateArea() {
            this.drawInteractionAreaContainor.drawInteraction.setActive(
                !this.drawInteractionAreaContainor.drawInteraction.getActive()
            );
            if(this.drawInteractionAreaContainor.drawInteraction.getActive()){
                this.drawInteractionLengthContainor.drawInteraction.setActive(false);
            }
        },
        /**
         * @description: 随机切换地图源
         * @return {*}
         */
        changeMapSource(e, id) {
            if (id) {
                this.containor.setMapSource(id);
                return;
            }
            this.containor.radomChangeMapSource();
        },
        /**
         * @description: 展示爱水印
         * @return {*}
         */
        showWaterPrint() {
            this.containor.showWaterPrint();
        },
    },
    mounted() {
        // 初始化地图容器
        this.initContainor();
        // 初始化计算容器
        this.initCaculateLengthContainor();
        // 初始化计算面积容器
        this.initCaculateAreaContainor();
        // 设置一个右键事件用来取消绘画
        this.containor.map.on("contextmenu", (e) => {
            e.preventDefault();
            if (
                this.drawInteractionLengthContainor.drawInteraction.getActive()
            ) {
                // 移除最后的右击的点
                this.drawInteractionLengthContainor.drawInteraction.removeLastPoint();
                // 结束绘制
                this.drawInteractionLengthContainor.drawInteraction.finishDrawing();
                // 移除交互
                this.drawInteractionLengthContainor.drawInteraction.setActive(
                    false
                );
                // 删除单点的元素
                for (
                    let i = 0;
                    i < this.drawInteractionLengthContainor.pointFeature.length;
                    i++
                ) {
                    this.drawInteractionLengthContainor.vectorSource.removeFeature(
                        this.drawInteractionLengthContainor.pointFeature[i]
                    );
                }
                this.drawInteractionLengthContainor.pointFeature = [];
            } else if (
                this.drawInteractionAreaContainor.drawInteraction.getActive()
            ) {
                this.drawInteractionAreaContainor.drawInteraction.finishDrawing();
                this.drawInteractionAreaContainor.drawInteraction.setActive(
                    false
                );
                this.drawInteractionAreaContainor.modifyInteraction.setActive(
                    false
                );
            }
        });
    },
};
</script>

<style lang="less" scoped>
.tool {
    width: 500px;
    position: absolute;
    left: 0;
    top: 0;
}
</style>
