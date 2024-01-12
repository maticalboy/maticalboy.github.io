<!--
 * @Author: “chenjinwei” “507725948@qq.com”
 * @Date: 2023-11-16 09:43:50
 * @LastEditors: “chenjinwei” “507725948@qq.com”
 * @LastEditTime: 2023-11-24 11:33:40
 * @FilePath: \vue2-template\src\views\three\study.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
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
    name: "ImageUtils",
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
        camera.position.z = 25;
        // 创建渲染器
        let renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(500, 500);
        document.getElementById("canvas").appendChild(renderer.domElement);

        // 创建平行光
        let light = new THREE.DirectionalLight(0xffffff, 1.5);
        light.position.set(0, 0, 20);
        scene.add(light);

        // 创建几何体
        let geometry = new THREE.BoxGeometry(10, 10, 10);
        // 设置自定义纹理贴图
        const textureLoader = new THREE.TextureLoader();
        let url = require("@/assets/images/three/texture.png");
        const texture = textureLoader.load(url);
        // 创建材质
        let material = new THREE.MeshPhongMaterial({
            map: texture,
        });
        // 创建网格模型
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        // 渲染
        renderer.render(scene, camera);
        //动画函数
        var animate = () => {
            // 一秒钟调用60次
            requestAnimationFrame(animate);
            if (this.start) {
                // 每次调用使模型沿xy轴旋转
                mesh.rotation.x += 0.01;
                mesh.rotation.y += 0.02;
            }

            // 渲染相机和场景
            renderer.render(scene, camera);
        };
        animate();
    },
};
</script>
