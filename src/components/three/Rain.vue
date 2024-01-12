<!--
 * @Author: “chenjinwei” “507725948@qq.com”
 * @Date: 2023-11-16 09:43:50
 * @LastEditors: “chenjinwei” “507725948@qq.com”
 * @LastEditTime: 2023-12-07 17:11:51
 * @FilePath: \vue2-template\src\views\three\study.vue
 * @Description 下雨的效果
-->
<template>
    <div id="canvas"></div>
</template>
<script>
// 引入three.js
import * as THREE from "three";
// 引入扩展库OrbitControls.js
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Vector } from "ol/layer";
export default {
    name: "Rain",
    data() {
        return {};
    },
    mounted() {
        // 创建场景
        let scene = this.initScene();
        let obj = {
            size: 2,
            transparent: true,
            opacity: 0.6,
            vertexColors: true,
            color: 0xffffff,
            sizeAttenuation: true,
            rotateSystem: false,
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
        function render() {
            for (let i = 0; i < mesh.children.length; i++) {
                //产生雨滴动画效果
                let v = mesh.children[i].position;
                let userData = mesh.children[i].userData;
                v.y = v.y - userData.velocityY * 3;
                v.x = v.x - userData.velocityX * 0.5;

                if (v.y <= -60) v.y = 60;
                if (v.x <= -20 || v.x >= 20) userData.x = userData.x * -1;

                //设置实时更新网格的顶点信息
                mesh.children[i].position.verticesNeedUpdate = true;
            }

            renderer.render(scene, camera);
        }
        //动画函数
        let animate = function () {
            render();
            // 一秒钟调用60次
            requestAnimationFrame(animate);
            // 每次调用使模型沿xy轴旋转
            // mesh.rotation.x += 0.01;
            // mesh.rotation.y += 0.02;
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
            let range = 120;
            let obj = new THREE.Object3D();
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
            for (let i = 0; i < 100; i++) {
                let particle = new THREE.Vector3(
                    Math.random() * range - range / 2,
                    Math.random() * range - range / 2,
                    Math.random() * range - range / 2
                );
                geometry.setAttribute(
                    "position",
                    new THREE.Float32BufferAttribute(particle, 3)
                );
                geometry.setAttribute(
                    "color",
                    new THREE.Float32BufferAttribute([1, 1, 1], 3)
                );

                // 创建物体
                let mesh = new THREE.Points(geometry, material);
                mesh.verticesNeedUpdate = true;
                mesh.userData = {
                    velocityX: (Math.random() - 0.5) / 3,
                    velocityY: 0.1 + Math.random() / 5,
                };
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
            const directionalLight = new THREE.DirectionalLight(
                0xffffff,
                100.0
            );
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
            let url = require("@/assets/images/three/rain.png");
            let texture = new THREE.TextureLoader().load(url);
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
