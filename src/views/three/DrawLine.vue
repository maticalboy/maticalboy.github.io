<!--
 * @Author: “chenjinwei” “507725948@qq.com”
 * @Date: 2023-11-16 09:43:50
 * @LastEditors: “chenjinwei” “507725948@qq.com”
 * @LastEditTime: 2023-11-24 11:04:58
 * @FilePath: \vue2-template\src\views\three\study.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div id="canvas"></div>
</template>
<script>
// 引入three.js
import * as THREE from "three";
// 引入扩展库OrbitControls.js
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
export default {
    name: "DrawLine",
    data() {
        return {};
    },
    mounted() {
        // 创建场景
        let scene = new THREE.Scene();
        // 创建相机
        let camera = new THREE.PerspectiveCamera(
            75,
            500 / 500,
            0.1,
            1000
        );
        // 修改相机位置
        camera.position.z = 25;
        // 创建渲染器
        let renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(500,500);
        document.getElementById("canvas").appendChild(renderer.domElement);

        // 定义先的基本材料
        let material = new THREE.LineBasicMaterial({ color: 0x0000ff });
        // 定义物体
        let geometry = new THREE.BufferGeometry();
        // 定义物体顶点坐标
        let vertices = new Float32Array([-10, 0, 0, 10, 0, 0, 0, 10, 0]);
        // 数据转化为缓冲区数据
        let attribute = new THREE.BufferAttribute(vertices, 3);
        // 缓冲区设置定点位置
        geometry.attributes.position = attribute;
        //初始化线
        let line = new THREE.Line(geometry, material);
        // 将线添加到场景中
        scene.add(line);
        // 渲染
        renderer.render(scene, camera);
    },
    methods: {
        /**
         * @description: 创建3D场景对象Scene
         * @return {*}
         */
        initScene() {
            const scene = new THREE.Scene();
            return scene;
        },
        /**
         * @description: 创建物体
         * @return {*}
         */
        createMesh() {
            // 创建几何体
            const geometry = new THREE.BoxGeometry(5, 5, 5);
            // 创建材质 绿色
            const material = new THREE.MeshLambertMaterial({
                color: 0x00ff00, //设置材质颜色
                // transparent: true, //开启透明
                // opacity: 0.5, //设置透明度
            });
            // 创建物体
            const mesh = new THREE.Mesh(geometry, material);
            return mesh;
        },
        /**
         * @description: 创建相机
         * @return {*}
         */
        createCamera() {
            // 初始化投影宽高
            const width = 500;
            const height = 500;
            // 创建透视投影相机
            const camera = new THREE.PerspectiveCamera(
                75,
                width / height,
                0.1,
                1000
            );
            return camera;
        },
        /**
         * @description: 创建渲染器
         * @return {*}
         */
        createRenderer() {
            const renderer = new THREE.WebGLRenderer();
            renderer.setSize(500, 500);
            return renderer;
        },
        /**
         * @description: 创建辅助坐标系
         * @return {*}
         */
        createAxesHelper() {
            const axesHelper = new THREE.AxesHelper(100);
            return axesHelper;
        },
        /**
         * @description: 创建辅助光源
         * @return {*}
         */
        createLightHelper(pointLight) {
            const pointLightHelper = new THREE.PointLightHelper(
                pointLight,
                1.0
            );
            return pointLightHelper;
        },
        /**
         * @description: 创建光源
         * @return {*}
         */
        createLight() {
            //点光源：两个参数分别表示光源颜色和光照强度
            // 参数1：0xffffff是纯白光,表示光源颜色
            // 参数2：1.0,表示光照强度，可以根据需要调整
            const pointLight = new THREE.PointLight(0xffffff, 100.0);
            //点光源位置
            pointLight.position.set(100, 0, 0);
            //点光源放在x轴上
            const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
            //平行光源放在x轴上
            directionalLight.position.set(100, 50, 50);
            return directionalLight;
        },
    },
};
</script>
<style lang="scss" scoped>
#canvas {
    margin: 0 auto;
    width: 500px;
    height: 500px;
}
</style>
