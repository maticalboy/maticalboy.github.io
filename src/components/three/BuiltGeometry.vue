<!--
 * @Author: “chenjinwei” “507725948@qq.com”
 * @Date: 2023-11-16 09:43:50
 * @LastEditors: “chenjinwei” “507725948@qq.com”
 * @LastEditTime: 2023-11-24 16:56:20
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
    name: "BuiltGeometry",
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
        //球形网格 （半径长度，水平块的密度，垂直块的密度）
        let geometry1 = new THREE.SphereGeometry(10, 32, 32);
        // 创建网格模型
        const mesh1 = new THREE.Mesh(geometry1, material);
        mesh1.position.set(-200, 0, -100);
        scene.add(mesh1);
        // 二十面体 （图形大小半径，大于零将不是二十面体，越大越圆滑）
        let geometry2 = new THREE.SphereGeometry(25, 0);
        // 创建网格模型
        const mesh2 = new THREE.Mesh(geometry2, material);
        mesh2.position.set(-200, 0, -150);
        scene.add(mesh2);
        //八面体（图形大小半径，大于零将不是八面体，越大越圆滑）
        let geometry3 = new THREE.OctahedronGeometry(20, 0);
        // 创建网格模型
        const mesh3 = new THREE.Mesh(geometry3, material);
        mesh3.position.set(-200, 0, -220);
        scene.add(mesh3);
        //四面体（图形大小半径，大于零将不是四面体，越大越圆滑）
        let geometry4 = new THREE.TetrahedronGeometry(20, 0);
        // 创建网格模型
        const mesh4 = new THREE.Mesh(geometry4, material);
        mesh4.position.set(-200, 0, -300);
        scene.add(mesh4);
        //长方形平面 （x轴宽度，y轴高度，x方向分段数，y方向分段数）
        let geometry5 = new THREE.PlaneGeometry(20, 30, 1, 1);
        const mesh5 = new THREE.Mesh(geometry5, material);
        mesh5.position.set(-200, 0, -50);
        scene.add(mesh5);
        // 立方体（图形大小半径，大于零将不是四面体，越大越圆滑）
        let geometry6 = new THREE.BoxGeometry(20, 20, 20, 1, 1, 1);
        // 创建网格模型
        const mesh6 = new THREE.Mesh(geometry6, material);
        mesh6.position.set(-200, 0, 0);
        scene.add(mesh6);
        //圆形平面 （半径，顶点密度，绘制起点弧度，绘制弧度）
        let geometry7 = new THREE.CircleGeometry(50, 20, 0, Math.PI * 2);
        const mesh7 = new THREE.Mesh(geometry7, material);
        mesh7.position.set(-200, 0, 100);
        scene.add(mesh7);
        // 空心圆平面 （内圆半径，外圆半径，分割面越大越圆滑，垂直外边分割面，开始绘制弧度，绘制弧度）
        let geometry8 = new THREE.RingGeometry(10, 50, 10, 5, 0, Math.PI * 2);
        const mesh8 = new THREE.Mesh(geometry8, material);
        mesh8.position.set(-200, 0, 150);
        scene.add(mesh8);
        //圆柱体 （头部圆的半径，底部圆半径，高度，上下圆顶点个数，上下面切割线条数，上下面是否显示，开始弧度，绘制弧度）
        let geometry9 = new THREE.CylinderGeometry(25, 75, 100, 40, 5);
        const mesh9 = new THREE.Mesh(geometry9, material);
        mesh9.position.set(-200, 0, 250);
        scene.add(mesh9);
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
        //救生圈 （救生圈半径，管道直径，基于管道横切顶点数，救生圈横切顶点个数）
        let geometry11 = new THREE.TorusGeometry(50, 20, 20, 20);
        const mesh11 = new THREE.Mesh(geometry11, material);
        mesh11.position.set(0, 0, 0);
        scene.add(mesh11);
        //环面扭结模型 （图形半径，管道直径，基于管道横切定点数，根据图形半径横切顶点数，绕旋转对称轴的圈数，绕环面的圆的圈数）
        let geometry12 = new THREE.TorusKnotGeometry(50, 10, 50, 20);
        const mesh12 = new THREE.Mesh(geometry12, material);
        mesh12.position.set(0, 0, 100);
        scene.add(mesh12);
        //轴辅助 （每一个轴的长度）
        let geometry13 = new THREE.AxesHelper(50);
        geometry13.position.set(0, 0, 200);
        scene.add(geometry13);
        //箭头辅助（箭头头的方向必须是vecteor3，箭头起点必须是vector3，箭头长度，颜色）
        let geometry14 = new THREE.ArrowHelper(
            new THREE.Vector3(0, 1, 0),
            new THREE.Vector3(0, 0, 0),
            50,
            0x00ffff
        );
        geometry14.position.set(200, 0, 100);
        scene.add(geometry14);
        // 渲染
        renderer.render(scene, camera);
        // 动画函数
        var animate = () => {
            // 一秒钟调用60次
            requestAnimationFrame(animate);
            if (this.start) {
                var timer = Date.now() * 0.0001;

                camera.position.x = Math.cos(timer) * 800;
                camera.position.z = Math.sin(timer) * 800;

                camera.lookAt(scene.position);
                for (var i = 0, l = scene.children.length; i < l; i++) {
                    var object = scene.children[i];

                    object.rotation.x = timer * 5;
                    object.rotation.y = timer * 2.5;
                }
            }

            // 渲染相机和场景
            renderer.render(scene, camera);
        };
        animate();
    },
};
</script>
