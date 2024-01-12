<!--
 * @Author: “chenjinwei” “507725948@qq.com”
 * @Date: 2023-11-16 09:43:50
 * @LastEditors: “chenjinwei” “507725948@qq.com”
 * @LastEditTime: 2023-11-24 15:11:35
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
    name: "GridLine",
    data() {
        return {
            start: false,
        };
    },
    mounted() {
        // 创建场景
        let scene = new THREE.Scene();
        // 创建相机
        let camera = new THREE.PerspectiveCamera(75, 500 / 500, 0.1, 2000);
        // 修改相机位置
        camera.position.y = 330;
        camera.lookAt(new THREE.Vector3(0, 0, 0));
        // 创建渲染器
        let renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(500, 500);
        document.getElementById("canvas").appendChild(renderer.domElement);

        // 创建平行光
        let light = new THREE.DirectionalLight(0xffffff, 1.5);
        light.position.set(0, 300, 0);
        scene.add(light);

        // 创建辅助线
        let axesHelper = new THREE.AxesHelper(200);
        scene.add(axesHelper);

        // 创建几何体
        let geometry = new THREE.BufferGeometry();
        // 创建坐标点
        let vertices = new Float32Array([-250, 0, 0, 250, 0, 0]);
        // 转化
        let attribute = new THREE.BufferAttribute(vertices, 3);
        geometry.attributes.position = attribute;

        for (let i = 0; i < 21; i++) {
            // 创建材质
            let material = new THREE.LineBasicMaterial({
                color: this.randomColor(),
                opacity: 1,
            });
            // 创建网格模型
            const mesh = new THREE.Line(geometry, material);
            mesh.position.z = i * 25 - 250;

            const mesh1 = new THREE.Line(geometry, material);
            mesh1.position.x = i * 25 - 250;
            mesh1.rotation.y = (90 * Math.PI) / 180;
            scene.add(mesh);
            scene.add(mesh1);
        }

        // 渲染
        renderer.render(scene, camera);
    },
    methods: {
        //生成随机颜色
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
    },
};
</script>
