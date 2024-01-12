<!--
 * @Author: “chenjinwei” “507725948@qq.com”
 * @Date: 2023-11-16 09:43:50
 * @LastEditors: “chenjinwei” “507725948@qq.com”
 * @LastEditTime: 2023-11-27 10:55:33
 * @FilePath: \vue2-template\src\views\three\study.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
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
// 字体加载器
import { FontLoader } from "three/addons/loaders/FontLoader.js";
// 字体模型
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
export default {
    name: "FontLoader",
    data() {
        return {
            start: false,
        };
    },
    mounted() {
        // 创建场景
        let scene = new THREE.Scene();
        // 创建相机
        let camera = new THREE.PerspectiveCamera(75, 500 / 500, 0.1, 10000);
        // 修改相机位置
        camera.position.z = 1000;
        camera.lookAt(new THREE.Vector3(0, 0, 0));
        // 创建渲染器
        let renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(500, 500);
        document.getElementById("canvas").appendChild(renderer.domElement);

        // 添加环境光
        scene.add(new THREE.AmbientLight(0x404040));
        // 创建平行光
        let light = new THREE.DirectionalLight(0xffffff, 8);
        light.position.set(200, 0, 200);
        scene.add(light);

        // 创建材质
        const materials = [
            new THREE.MeshPhongMaterial({
                color: 0xffffff,
                flatShading: true,
            }),
            new THREE.MeshPhongMaterial({ color: 0xff0000 }), //back
        ];
        // 实例化frontloader
        const loader = new FontLoader();
        const font1 = loader.load(
            // 资源URL
            "fonts/helvetiker_regular.typeface.json",
            function (font) {
                // 创建网格模型
                const geometry = new TextGeometry("Hello THREE.JS!", {
                    font: font,
                    size: 80,
                    height: 20,
                    curveSegments: 4,
                    bevelEnabled: true,
                    bevelThickness: 10,
                    bevelSize: 8,
                    bevelSegments: 5,
                });
                // 获取边界使文字的中心 对准0 点
                geometry.computeBoundingBox();
                // console.log(geometry.boundingBox);
                const xOffset =
                    (geometry.boundingBox.max.x - geometry.boundingBox.min.x) /
                    2;
                const textMesh1 = new THREE.Mesh(geometry, materials);
                textMesh1.position.set(-xOffset, 0, 0);
                scene.add(textMesh1);
            }
        );
        const font2 = loader.load(
            // 资源URL
            "fonts/YEFONTDianYingPangBaiTi_Regular.json",
            function (font) {
                // 创建网格模型
                const geometry2 = new TextGeometry("风萧萧兮易水寒", {
                    font: font,
                    size: 80,
                    height: 20,
                    curveSegments: 4,
                    bevelEnabled: true,
                    bevelThickness: 10,
                    bevelSize: 8,
                    bevelSegments: 5,
                });
                // 获取边界使文字的中心 对准0 点
                geometry2.computeBoundingBox();
                // console.log(geometry.boundingBox);
                const xOffset =
                    (geometry2.boundingBox.max.x - geometry2.boundingBox.min.x) /
                    2;
                const textMesh2 = new THREE.Mesh(geometry2, materials);
                textMesh2.position.set(-xOffset,150,0);
                scene.add(textMesh2);
            }
        );

        // 设置相机控件轨道控制器OrbitControls
        let controls = new OrbitControls(camera, renderer.domElement);
        //更新控制器
        controls.update();
        // 如果相机控件修改了相机参数 重新调用渲染器
        controls.addEventListener("change", function () {
            renderer.render(scene, camera);
        });
        //初始化性能插件
        var stats;
        stats = new Stats();
        document.getElementById("stats").appendChild(stats.dom);
        stats.domElement.style.position = "absolute";

        stats.domElement.style.left = "0px";

        stats.domElement.style.top = "0px";
        function animate() {
            //更新控制器
            controls.update();
            // 渲染
            renderer.render(scene, camera);
            //更新性能插件
            stats.update();
            requestAnimationFrame(animate);
        }
        if (WEBGL.isWebGLAvailable()) {
            // Initiate function or other initializations here
            animate();
        } else {
            const warning = WEBGL.getWebGLErrorMessage();
            document.getElementById("container").appendChild(warning);
        }
    },
};
</script>
<style lang="less" scoped>
#stats,
#container {
    position: relative;
}
</style>
