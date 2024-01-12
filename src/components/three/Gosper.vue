<!--
 * @Author: “chenjinwei” “507725948@qq.com”
 * @Date: 2023-11-16 09:43:50
 * @LastEditors: “chenjinwei” “507725948@qq.com”
 * @LastEditTime: 2023-11-29 11:40:11
 * @FilePath: \vue2-template\src\views\three\study.vue
 * @Description: 高斯帕曲线
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
    name: "Gosper",
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
        createMesh() {
            //获取点的位置
            const points = this.gosper(3, 60);
            const mapPoints = points
                .map((item) => {
                    return [item.x, item.y, item.z];
                })
                .flat();
            // 获取对应的颜色
            const colors = points
                .map((item) => {
                    return [
                        Math.random() * 1,
                        Math.random() * 1,
                        Math.random() * 1,
                    ];
                })
                .flat();

            // 定义物体
            let geometry = new THREE.BufferGeometry();
            geometry.setAttribute(
                "position",
                new THREE.Float32BufferAttribute(mapPoints, 3)
            );
            geometry.setAttribute(
                "color",
                new THREE.Float32BufferAttribute(colors, 3)
            );
            //定义直线纹理
            const material = new THREE.LineBasicMaterial({
                // color: 0x0000ff,
                opacity: 1.0, //设置透明度
                linewidth: 1, //设置线的宽度
                vertexColors: true, //设置这个可以给每个顶点指定一种颜色
            });
            //初始化线
            let line = new THREE.Line(geometry, material);
            return line;
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
        /**
         * @description: 高斯帕曲线生成函数gosper
         * @param {*} a 密度
         * @param {*} b 大小
         * @return {*}
         */
        gosper(a, b) {
            var turtle = [0, 0, 0];
            var points = [];
            var count = 0;

            rg(a, b, turtle);

            return points;

            function rt(x) {
                turtle[2] += x;
            }

            function lt(x) {
                turtle[2] -= x;
            }

            function fd(dist) {
                //                ctx.beginPath();
                points.push({
                    x: turtle[0],
                    y: turtle[1],
                    z: Math.sin(count) * 5,
                });
                //                ctx.moveTo(turtle[0], turtle[1]);

                var dir = turtle[2] * (Math.PI / 180);
                turtle[0] += Math.cos(dir) * dist;
                turtle[1] += Math.sin(dir) * dist;

                points.push({
                    x: turtle[0],
                    y: turtle[1],
                    z: Math.sin(count) * 5,
                });
                //                ctx.lineTo(turtle[0], turtle[1]);
                //                ctx.stroke();
            }

            function rg(st, ln, turtle) {
                st--;
                ln = ln / 2.6457;
                if (st > 0) {
                    //                    ctx.strokeStyle = '#111';
                    rg(st, ln, turtle);
                    rt(60);
                    gl(st, ln, turtle);
                    rt(120);
                    gl(st, ln, turtle);
                    lt(60);
                    rg(st, ln, turtle);
                    lt(120);
                    rg(st, ln, turtle);
                    rg(st, ln, turtle);
                    lt(60);
                    gl(st, ln, turtle);
                    rt(60);
                }
                if (st == 0) {
                    fd(ln);
                    rt(60);
                    fd(ln);
                    rt(120);
                    fd(ln);
                    lt(60);
                    fd(ln);
                    lt(120);
                    fd(ln);
                    fd(ln);
                    lt(60);
                    fd(ln);
                    rt(60);
                }
            }

            function gl(st, ln, turtle) {
                st--;
                ln = ln / 2.6457;
                if (st > 0) {
                    //                    ctx.strokeStyle = '#555';
                    lt(60);
                    rg(st, ln, turtle);
                    rt(60);
                    gl(st, ln, turtle);
                    gl(st, ln, turtle);
                    rt(120);
                    gl(st, ln, turtle);
                    rt(60);
                    rg(st, ln, turtle);
                    lt(120);
                    rg(st, ln, turtle);
                    lt(60);
                    gl(st, ln, turtle);
                }
                if (st == 0) {
                    lt(60);
                    fd(ln);
                    rt(60);
                    fd(ln);
                    fd(ln);
                    rt(120);
                    fd(ln);
                    rt(60);
                    fd(ln);
                    lt(120);
                    fd(ln);
                    lt(60);
                    fd(ln);
                }
            }
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
