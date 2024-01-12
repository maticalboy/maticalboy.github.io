<!--
 * @Author: “chenjinwei” “507725948@qq.com”
 * @Date: 2023-11-16 09:43:50
 * @LastEditors: “chenjinwei” “507725948@qq.com”
 * @LastEditTime: 2023-12-05 16:30:05
 * @FilePath: \vue2-template\src\views\three\study.vue
 * @Description: 给物体添加绑定事件
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
    name: "Raycaster",
    data() {
        return {};
    },
    mounted() {
        // 创建场景
        let scene = this.initScene();
        // 创建相机
        let camera = this.createCamera();
        // 创建物体
        let mesh = this.createMesh(scene, camera);
        // 将物体添加到场景中
        // scene.add(mesh);

        // 设置相机位置
        camera.position.set(0, 0, 25);
        // 设置相机观察点
        camera.lookAt({ x: 0, y: 0, z: 0 });
        // 创建辅助坐标系
        let axesHelper = this.createAxesHelper();
        // 将辅助坐标系添加到scene里
        // scene.add(axesHelper);
        // 添加光源
        let light = this.createLight();
        // 将光源添加到场景
        scene.add(light);
        // 添加光源辅助
        let lightHelper = this.createLightHelper(light);
        // 将辅助光源添加到场景
        // scene.add(lightHelper);

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
        var animate = () => {
            // 一秒钟调用60次
            requestAnimationFrame(animate);
            // 每次调用使模型沿xy轴旋转
            // mesh.rotation.x += 0.01;
            // mesh.rotation.y += 0.02;
            // 渲染相机和场景
            renderer.render(scene, camera);
        };
        animate();
        //  为模型绑定点击事件
        renderer.domElement.addEventListener("click", (event) => {
            let raycaster = new THREE.Raycaster();
            let mouse = new THREE.Vector2();
            let som = document.getElementById("canvas").getBoundingClientRect();
            console.log(event.clientX - som.x, event.clientY - som.y);
            // 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)
            mouse.x = ((event.clientX - som.x) / 500) * 2 - 1;
            mouse.y = -((event.clientY - som.y) / 500) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(scene.children);
            // 根据它来判断点击的什么，length为0即没有点击到模型
            if (intersects.length) {
                intersects[0].object.material.color.set(0xff0000);
            }
        }),
            false;
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
        createMesh(scene, camera) {
            // 创建几何体
            const geometry = new THREE.BoxGeometry(25, 25, 25);
            const obj = new THREE.Object3D();
            for (let i = 0; i < 30; i++) {
                // 创建材质 绿色
                const material = new THREE.MeshLambertMaterial({
                    color: this.randomColor(), //设置材质颜色
                    // transparent: true, //开启透明
                    // opacity: 0.5, //设置透明度
                });
                // 创建物体
                const mesh = new THREE.Mesh(geometry, material);
                mesh.position.x = 800 * (2.0 * Math.random() - 1.0);
                mesh.position.y = 800 * (2.0 * Math.random() - 1.0);
                mesh.position.z = 800 * (2.0 * Math.random() - 1.0);

                mesh.rotation.x = Math.random() * Math.PI;
                mesh.rotation.y = Math.random() * Math.PI;
                mesh.rotation.z = Math.random() * Math.PI;
                scene.add(mesh);
            }
            // return obj;
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
            pointLight.position.set(100, 100, 100);
            //点光源放在x轴上
            const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
            //平行光源放在x轴上
            directionalLight.position.set(100, 50, 50);
            const ambientLight = new THREE.AmbientLight(0x444444, 100);
            return ambientLight;
        },
        //随机生成颜色
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
                strHex = "#",
                index;
            for (var i = 0; i < 6; i++) {
                index = Math.round(Math.random() * 15);
                strHex += arrHex[index];
            }
            return strHex;
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
