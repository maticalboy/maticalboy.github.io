<!--
 * @Author: “chenjinwei” “507725948@qq.com”
 * @Date: 2023-11-16 09:43:50
 * @LastEditors: “chenjinwei” “507725948@qq.com”
 * @LastEditTime: 2023-11-28 09:37:33
 * @FilePath: \vue2-template\src\views\three\study.vue
 * @Description: 轨道控制
-->
<template>
    <div id="canvas" @click="start = !start"></div>
</template>
<script>
// 引入three.js
import * as THREE from "three";
// 引入扩展库OrbitControls.js
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
export default {
    name: "UserControl",
    data() {
        return {
            start: false,
        };
    },
    mounted() {
        // 创建场景
        let scene = new THREE.Scene();
        // 创建相机
        let camera = new THREE.PerspectiveCamera(75, 500 / 500, 0.1, 1000);
        // 修改相机位置
        camera.position.y = 500;
        camera.lookAt(new THREE.Vector3(0, 0, 0));
        // 创建渲染器
        let renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(500, 500);
        document.getElementById("canvas").appendChild(renderer.domElement);

        // 添加环境光
        scene.add(new THREE.AmbientLight(0x404040));
        // 创建平行光
        let light = new THREE.DirectionalLight(0xffffff, 1.5);
        light.position.set(0, 20, 0);
        scene.add(light);

        // 设置自定义纹理贴图
        const textureLoader = new THREE.TextureLoader();
        let url = require("@/assets/images/three/texture.png");
        const texture = textureLoader.load(url);
        //定义纹理在水平和垂直方向简单的重复到无穷大。
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        //定义纹理的各向异性
        texture.anisotropy = 16;

        // 创建材质
        let material = new THREE.MeshLambertMaterial({
            map: texture,
            side: THREE.DoubleSide,
        });
        //车床模型
        var points = [];

        for (var i = 0; i < 50; i++) {
            points.push(
                new THREE.Vector2(
                    Math.sin(i * 0.2) * Math.sin(i * 0.1) * 15 + 50,
                    (i - 5) * 2
                )
            );
        }
        //（一个vector2的数组分别代表xy轴，生成圆周段的数目，开始弧度，绘制弧度）
        let geometry10 = new THREE.LatheGeometry(points, 20);
        const mesh10 = new THREE.Mesh(geometry10, material);
        mesh10.position.set(0, 0, -100);
        scene.add(mesh10);

        // 设置相机控件轨道控制器OrbitControls
        let controls = new OrbitControls(camera, renderer.domElement);
        //更新控制器
        controls.update();
        // 如果相机控件修改了相机参数 重新调用渲染器
        controls.addEventListener("change", function () {
            renderer.render(scene, camera);
            // 使动画循环使用时阻尼或自转 意思是否有惯性
            controls.enableDamping = true;
            //动态阻尼系数 就是鼠标拖拽旋转灵敏度
            //controls.dampingFactor = 0.25;
            //是否可以缩放
            // controls.enableZoom = true;
            //是否自动旋转
            // controls.autoRotate = true;
            //设置相机距离原点的最远距离
            // controls.minDistance = 200;
            //设置相机距离原点的最远距离
            // controls.maxDistance = 600;
            //是否开启右键拖拽
            // controls.enablePan = true;
        });
        function animate() {
            //更新控制器
            controls.update();
            // 渲染
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        }
        animate();
    },
};
</script>
