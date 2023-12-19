/*
 * @Author: “chenjinwei” “507725948@qq.com”
 * @Date: 2023-12-18 16:21:12
 * @LastEditors: “chenjinwei” “507725948@qq.com”
 * @LastEditTime: 2023-12-19 11:13:22
 * @FilePath: \maticalboy.github.io\src\utils\threeDemo.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 引入three.js
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
export default class ThreeJSInitializer {
    constructor(containerId) {
        this.containerId = containerId;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.clock = null;
        this.mixer = null;
    }

    init() {
        this.clock = new THREE.Clock();
        // 获取容器元素
        const container = document.getElementById(this.containerId);


        // 创建场景
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xbfe3dd);


        // 创建相机
        const width = container.clientWidth;
        const height = container.clientHeight;
        this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        this.camera.position.set(5, 2, 8);

        // 创建渲染器
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(width, height);
        container.appendChild(this.renderer.domElement);

        // 辐射度贴图是一种用于模拟光照和反射的纹理，可以用于增强场景的真实感和光照效果。
        const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
        this.scene.environment = pmremGenerator.fromScene(new RoomEnvironment(this.renderer), 0.04).texture;

        // 添加灯光
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(0, 1, 1);
        this.scene.add(directionalLight);

        // 添加其他对象或效果
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        this.scene.add(cube);

        //轨道控制器
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        // 如果相机控件修改了相机参数 重新调用渲染器
        this.controls.addEventListener("change", () => {
            this.renderer.render(this.scene, this.camera);
        });
        // 加载 glTF 模型文件中使用了 Draco 压缩的部分
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('jsm/libs/draco/gltf/');

        const loader = new GLTFLoader();
        loader.setDRACOLoader(dracoLoader);
        loader.load("models/gltf/LittlestTokyo.glb", (gltf) => {

            const model = gltf.scene;
            model.position.set(1, 1, 0);
            model.scale.set(0.01, 0.01, 0.01);
            this.scene.add(model);

            this.mixer = new THREE.AnimationMixer(model);
            this.mixer.clipAction(gltf.animations[0]).play();

            // 渲染场景
            this.renderScene();

        }, undefined, function (e) {

            console.error(e);

        });



    }

    renderScene() {
        requestAnimationFrame(() => this.renderScene());
        const delta = this.clock.getDelta();

        this.mixer.update(delta);

        // 渲染场景
        this.renderer.render(this.scene, this.camera);
    }
}
