<!--
 * @Author: “chenjinwei” “507725948@qq.com”
 * @Date: 2023-11-16 09:43:50
 * @LastEditors: “chenjinwei” “507725948@qq.com”
 * @LastEditTime: 2023-12-02 14:00:28
 * @FilePath: \vue2-template\src\views\three\study.vue
 * @Description:svg转三维立体
-->
<template>
    <div id="canvas"></div>
</template>
<script>
// 引入three.js
import * as THREE from "three";
// 引入扩展库OrbitControls.js
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";
import { createMultiMaterialObject } from "three/examples/jsm/utils/SceneUtils";
export default {
    name: "SvgLoader",
    data() {
        return {};
    },
    mounted() {
        // 创建场景
        let scene = this.initScene();
        // 创建物体
        let mesh = this.createMesh();
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
        var animate = function () {
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
        createMesh() {
            // 引入svgLoader
            const loader = new SVGLoader();
            let url = require("@/assets/icons/three/tree.svg");
            let group = new THREE.Group();
            loader.load(
                // resource URL
                url,
                // called when the resource is loaded
                function (data) {
                    const paths = data.paths;
                    for (let i = 0; i < paths.length; i++) {
                        const path = paths[i];
                        let shapes = SVGLoader.createShapes(path);

                        for (let j = 0; j < shapes.length; j++) {
                            const shape = shapes[j];
                            let options = {
                                depth:55,
                                bevelThickness: 2,
                                bevelSize: 0.5,
                                bevelSegments: 3,
                                bevelEnabled: true,
                                curveSegments: 12,
                                steps: 5,
                            };
                            let geometry = new THREE.ExtrudeGeometry(
                                shape,
                                options
                            );
                            // 创建法向量纹理
                            let meshMaterial = new THREE.MeshNormalMaterial({
                                flatShading: true,
                                transparent: true,
                                opacity: 0.7,
                            });
                            let boxMaterial = new THREE.MeshBasicMaterial({
                                wireframe: true,
                            });

                            let mesh = createMultiMaterialObject(geometry, [
                                meshMaterial,
                                boxMaterial,
                            ]);
                            group.add(mesh);
                        }
                        group.scale.set(0.03, 0.03, 0.03);
                        group.rotation.x = Math.PI;
                        group.position.set(-10, 30, 0);
                    }
                },
                // called when loading is in progresses
                function (xhr) {
                    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
                },
                // called when loading has errors
                function (error) {
                    console.log("An error happened");
                }
            );

            return group;
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
