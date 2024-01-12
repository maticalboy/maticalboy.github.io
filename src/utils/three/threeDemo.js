/*
 * @Author: “chenjinwei” “507725948@qq.com”
 * @Date: 2023-12-18 16:21:12
 * @LastEditors: “chenjinwei” “507725948@qq.com”
 * @LastEditTime: 2023-12-18 16:48:04
 * @FilePath: \maticalboy.github.io\src\utils\threeDemo.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 引入three.js
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
export default class ThreeJSInitializer {
    constructor(containerId) {
        this.containerId = containerId;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls=null;
    }

    init() {
        // 获取容器元素
        const container = document.getElementById(this.containerId);

        // 创建场景
        this.scene = new THREE.Scene();

        // 创建相机
        const width = container.clientWidth;
        const height = container.clientHeight;
        this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        this.camera.position.set(0, 0, 5);

        // 创建渲染器
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(width, height);
        container.appendChild(this.renderer.domElement);

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
        this.controls.addEventListener("change", ()=> {
            this.renderer.render(this.scene, this.camera);
        });

        // 渲染场景
        this.renderScene();
    }

    renderScene() {
        requestAnimationFrame(() => this.renderScene());
        // 渲染场景
        this.renderer.render(this.scene, this.camera);
    }
}
