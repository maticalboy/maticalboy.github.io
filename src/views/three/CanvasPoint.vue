<!--
 * @Author: “chenjinwei” “507725948@qq.com”
 * @Date: 2023-11-16 09:43:50
 * @LastEditors: “chenjinwei” “507725948@qq.com”
 * @LastEditTime: 2023-12-07 16:05:41
 * @FilePath: \vue2-template\src\views\three\study.vue
 * @Description 糖豆人
-->
<template>
    <div id="canvas"></div>
</template>
<script>
// 引入three.js
import * as THREE from "three";
// 引入扩展库OrbitControls.js
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
// 引入扩展库GLTFLoader.js
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
export default {
    name: "CanvasPoint",
    data() {
        return {};
    },
    mounted() {
        // 创建场景
        let scene = this.initScene();
        let obj = {
            size: 4,
            transparent: true,
            opacity: 0.6,
            vertexColors: true,
            color: 0xffffff,
            sizeAttenuation: true,
            rotateSystem: true,
        };
        // 创建物体
        let mesh = this.createMesh(
            obj.size,
            obj.transparent,
            obj.opacity,
            obj.vertexColors,
            obj.sizeAttenuation,
            obj.color
        );
        // 将物体添加到场景中
        scene.add(mesh);
        // 创建相机
        let camera = this.createCamera();
        // 设置相机位置
        camera.position.set(0, 0, 25);
        // 设置相机观察点
        camera.lookAt(mesh.position);
        // 创建辅助坐标系
        let axesHelper = this.createAxesHelper();
        // 将辅助坐标系添加到scene里
        scene.add(axesHelper);
        // 添加光源
        let light = this.createLight();
        // 将光源添加到场景
        scene.add(light);
        // 添加光源辅助
        let lightHelper = this.createLightHelper(light);
        // 将辅助光源添加到场景
        scene.add(lightHelper);

        // 创建渲染器
        let renderer = this.createRenderer();
        // 设置相机控件轨道控制器OrbitControls
        let controls = new OrbitControls(camera, renderer.domElement);
        // 如果相机控件修改了相机参数 重新调用渲染器
        controls.addEventListener("change", function () {
            renderer.render(scene, camera);
        });
        // 将场景和相机渲染
        renderer.render(scene, camera);
        // Canvas画布插入到任意HTML元素中
        document.getElementById("canvas").appendChild(renderer.domElement);

        //动画函数
        let animate = function () {
            // 一秒钟调用60次
            requestAnimationFrame(animate);
            // 每次调用使模型沿xy轴旋转
            mesh.rotation.x += 0.01;
            mesh.rotation.y += 0.02;
            // 渲染相机和场景
            renderer.render(scene, camera);
        };
        animate();
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
        createMesh(
            size,
            transparent,
            opacity,
            vertexColors,
            sizeAttenuation,
            color
        ) {
            // 存放粒子数据的网格
            let geometry = new THREE.BufferGeometry();
            let range = 50;
            let obj = new THREE.Object3D();
            for (let i = 0; i < 100; i++) {
                let particle = new THREE.Vector3(
                    Math.random() * range - range / 2,
                    Math.random() * range - range / 2,
                    Math.random() * range - range / 2
                );
                let color = new THREE.Color(this.randomColor());
                geometry.setAttribute(
                    "position",
                    new THREE.Float32BufferAttribute(particle, 3)
                );
                geometry.setAttribute(
                    "color",
                    new THREE.Float32BufferAttribute(color, 3)
                );
                //样式化粒子的THREE.PointCloudMaterial材质
                let material = new THREE.PointsMaterial({
                    size: size,
                    transparent: transparent,
                    opacity: opacity,
                    vertexColors: vertexColors,
                    sizeAttenuation: sizeAttenuation,
                    color: color,
                    map: this.getTexture(),
                    depthTest: false, //设置解决透明度有问题的情况
                });
                material.color.set(color.r, color.g, color.b);
                // 创建物体
                let mesh = new THREE.Points(geometry, material);
                mesh.position.set(particle.x, particle.y, particle.z);
                obj.add(mesh);
            }
            return obj;
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
            pointLight.position.set(0, 0, 100);
            //点光源放在x轴上
            const directionalLight = new THREE.DirectionalLight(0xffffff, 100.0);
            //平行光源放在x轴上
            directionalLight.position.set(100, 50, 50);
            return pointLight;
        },
        /**
         * @description: 随机生成颜色
         * @return {*}
         */
        randomColor() {
            var arrHex = [
                    "0",
                    "1",
                    "2",
                    "3",
                    "4",
                    "5",
                    "6",
                    "7",
                    "8",
                    "9",
                    "a",
                    "b",
                    "c",
                    "d",
                    "e",
                    "f",
                ],
                strHex = "0x",
                index;
            for (var i = 0; i < 6; i++) {
                index = Math.round(Math.random() * 15);
                strHex += arrHex[index];
            }
            return eval(strHex);
        },
        /**
         * @description: 生成纹理
         * @return {*}
         */
        getTexture() {
            let canvas = document.createElement("canvas");
            canvas.width = 32;
            canvas.height = 32;

            let ctx = canvas.getContext("2d");
            // 绘制身体
            ctx.translate(-81, -84);

            ctx.fillStyle = "orange";
            ctx.beginPath();
            ctx.moveTo(83, 116);
            ctx.lineTo(83, 102);
            ctx.bezierCurveTo(83, 94, 89, 88, 97, 88);
            ctx.bezierCurveTo(105, 88, 111, 94, 111, 102);
            ctx.lineTo(111, 116);
            ctx.lineTo(106.333, 111.333);
            ctx.lineTo(101.666, 116);
            ctx.lineTo(97, 111.333);
            ctx.lineTo(92.333, 116);
            ctx.lineTo(87.666, 111.333);
            ctx.lineTo(83, 116);
            ctx.fill();

            // 绘制眼睛
            ctx.fillStyle = "white";
            ctx.beginPath();
            ctx.moveTo(91, 96);
            ctx.bezierCurveTo(88, 96, 87, 99, 87, 101);
            ctx.bezierCurveTo(87, 103, 88, 106, 91, 106);
            ctx.bezierCurveTo(94, 106, 95, 103, 95, 101);
            ctx.bezierCurveTo(95, 99, 94, 96, 91, 96);
            ctx.moveTo(103, 96);
            ctx.bezierCurveTo(100, 96, 99, 99, 99, 101);
            ctx.bezierCurveTo(99, 103, 100, 106, 103, 106);
            ctx.bezierCurveTo(106, 106, 107, 103, 107, 101);
            ctx.bezierCurveTo(107, 99, 106, 96, 103, 96);
            ctx.fill();

            // 绘制眼球
            ctx.fillStyle = "blue";
            ctx.beginPath();
            ctx.arc(101, 102, 2, 0, Math.PI * 2, true);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(89, 102, 2, 0, Math.PI * 2, true);
            ctx.fill();

            let texture = new THREE.Texture(canvas);
            texture.needsUpdate = true;
            return texture;
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
