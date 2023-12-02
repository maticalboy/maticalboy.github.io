<!--
 * @Author: “chenjinwei” “507725948@qq.com”
 * @Date: 2023-11-16 09:43:50
 * @LastEditors: “chenjinwei” “507725948@qq.com”
 * @LastEditTime: 2023-11-28 09:35:12
 * @FilePath: \vue2-template\src\views\three\study.vue
 * @Description: 阴影
-->
<template>
    <div id="canvas" @click="start = !start">
        <div id="stats"></div>
        <div id="container"></div>
    </div>
</template>
<script>
// 引入three.js
import * as THREE from "three";
// 引入扩展库OrbitControls.js
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
// 性能检测
import Stats from "three/examples/jsm/libs/stats.module";
//  加载 WebGl 探测器
import WEBGL from "three/examples/jsm/capabilities/WebGL.js";
export default {
    name: "CastShadow",
    data() {
        return {
            start: false,
        };
    },
    mounted() {
        this.init();
        this.operation();
        if (WEBGL.isWebGLAvailable()) {
            // Initiate function or other initializations here
            this.animate();
        } else {
            const warning = WEBGL.getWebGLErrorMessage();
            document.getElementById("container").appendChild(warning);
        }
    },
    methods: {
        init() {
            // 初始化场景
            this.scene = new THREE.Scene();
            // 初始化相机
            this.camera = new THREE.PerspectiveCamera(
                75,
                window.innerWidth / window.innerHeight,
                0.1,
                1000
            );
            // 初始化渲染器
            this.renderer = new THREE.WebGLRenderer({ antialias: true });
            // 初始化渲染
            this.renderer.setSize(500, 500);
            document
                .getElementById("canvas")
                .appendChild(this.renderer.domElement);
            // 设置相机控件轨道控制器OrbitControls
            this.controls = new OrbitControls(
                this.camera,
                this.renderer.domElement
            );
            //更新控制器
            this.controls.update();
            // 如果相机控件修改了相机参数 重新调用渲染器
            this.controls.addEventListener("change", () => {
                this.renderer.render(this.scene, this.camera);
            });
            //初始化性能插件
            this.stats;
            this.stats = new Stats();
            document.getElementById("stats").appendChild(this.stats.dom);
            this.stats.domElement.style.position = "absolute";

            this.stats.domElement.style.left = "0px";

            this.stats.domElement.style.top = "0px";
        },
        operation() {
            // 相机
            this.camera.position.set(0, 10, 10);
            this.camera.lookAt({
                x: 0,
                y: 0,
                z: 0,
            });

            // 初始化材质
            this.planeMaterial = new THREE.MeshPhongMaterial({
                color: 0x6c6c6c,
            });
            // 初始化平面
            this.plane = new THREE.Mesh(
                new THREE.PlaneGeometry(300, 300),
                this.planeMaterial
            );
            this.plane.rotation.x = -Math.PI / 2;
            this.scene.add(this.plane);
            // 初始化灯光
            this.scene.add(new THREE.AmbientLight(0xffffff));
            this.light = new THREE.DirectionalLight(0xffffff, 1.75);
            this.light.position.set(30, 10, 10);
            // 优化投影
            this.light.shadow.camera.top=3
            this.light.shadow.camera.right=6
            this.light.shadow.camera.bottom=-3
            this.light.shadow.camera.left=-2
            this.light.shadow.camera.near=20
            this.light.shadow.camera.far=35
            this.scene.add(this.light);
            let cameraHelper=new THREE.CameraHelper(this.light.shadow.camera)
            this.scene.add(cameraHelper)
            // 初始化物体
            let boxGeometry = new THREE.BoxGeometry(1, 1, 1);
            let boxMaterial = new THREE.MeshLambertMaterial({
                color: 0x0aeedf,
            });
            this.cube = new THREE.Mesh(boxGeometry, boxMaterial);
            this.cube.position.set(0,0,0);
            // 初始化球
            let sphereGeometry = new THREE.SphereGeometry(1, 10, 10);
            let sphereMaterial = new THREE.MeshLambertMaterial({
                color: 0x0aeedf,
            })
            this.cube1=new THREE.Mesh(sphereGeometry,sphereMaterial);
            this.cube1.position.set(10,1,0);
            this.scene.add(this.cube1);
            //辅助工具
            const axesHelper = new THREE.AxesHelper(1);
            this.scene.add(axesHelper);
            this.scene.add(this.cube);

            // 开启阴影
            this.cube.castShadow = true;
            this.cube1.castShadow = true;
            this.light.castShadow = true;
            this.plane.receiveShadow = true;
            this.renderer.shadowMap.enabled = true;
            this.renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
        },
        animate() {
            //更新控制器
            this.controls.update();
            // this.cube.rotation.x += 0.01;
            // 渲染
            this.renderer.render(this.scene, this.camera);
            //更新性能插件
            this.stats.update();
            requestAnimationFrame(this.animate);
        },
    },
};
</script>
<style lang="less" scoped>
#stats,
#container {
    position: relative;
}
</style>
