/*
 * @Author: “chenjinwei” “507725948@qq.com”
 * @Date: 2023-12-18 16:21:12
 * @LastEditors: “chenjinwei” “507725948@qq.com”
 * @LastEditTime: 2023-12-19 14:49:02
 * @FilePath: \maticalboy.github.io\src\utils\threeDemo.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 引入three.js
import * as THREE from "three";
// 引入gui
import * as dat from 'dat.gui';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
export default class ThreeJSInitializer {
    constructor(containerId) {
        this.containerId = containerId;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;

        this.model = null;
        this.skeleton = null;
        this.mixer = null;
        this.clock = null;

        this.actions = [];
        this.active = 2;
        this.animations = [];
    }

    init() {
        // 获取容器元素
        const container = document.getElementById(this.containerId);

        // 创建场景
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xa0a0a0);
        this.scene.fog = new THREE.Fog(0xa0a0a0, 10, 50);

        // 创建相机
        const width = container.clientWidth;
        const height = container.clientHeight;
        this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        this.camera.position.set(1, 2, -3);
        this.camera.lookAt(0, 1, 0);

        this.clock = new THREE.Clock();

        // 创建渲染器
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(width, height);
        this.renderer.shadowMap.enabled = true
        container.appendChild(this.renderer.domElement);

        // 添加灯光
        // const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        // this.scene.add(ambientLight);

        // const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        // directionalLight.position.set(0, 1, 1);
        // this.scene.add(directionalLight);
        const hemiLight = new THREE.HemisphereLight(0xffffff, 0x8d8d8d, 3);
        hemiLight.position.set(0, 20, 0);
        this.scene.add(hemiLight);

        const dirLight = new THREE.DirectionalLight(0xffffff, 3);
        dirLight.position.set(- 3, 10, - 10);
        dirLight.castShadow = true;
        dirLight.shadow.camera.top = 2;
        dirLight.shadow.camera.bottom = - 2;
        dirLight.shadow.camera.left = - 2;
        dirLight.shadow.camera.right = 2;
        dirLight.shadow.camera.near = 0.1;
        dirLight.shadow.camera.far = 40;
        this.scene.add(dirLight);

        const mesh = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), new THREE.MeshPhongMaterial({ color: 0xcbcbcb, depthWrite: false }));
        mesh.rotation.x = - Math.PI / 2;
        mesh.receiveShadow = true;
        this.scene.add(mesh);

        // 添加其他对象或效果
        // const geometry = new THREE.BoxGeometry(1, 1, 1);
        // const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
        // const cube = new THREE.Mesh(geometry, material);
        // this.scene.add(cube);

        const loader = new GLTFLoader();
        loader.load('models/gltf/Soldier.glb', (gltf) => {

            this.model = gltf.scene;
            this.scene.add(this.model);
            // 创建控制面板
            this.createPanel();
            // 添加阴影
            this.model.traverse(function (object) {
                if (object.isMesh) object.castShadow = true;
            });

            // 获取骨骼
            this.skeleton = new THREE.SkeletonHelper(this.model);
            this.skeleton.visible = true;
            this.scene.add(this.skeleton);

            // 获取动画
            this.animations = gltf.animations;

            // 跑
            let runAction = new THREE.AnimationMixer(this.model);
            runAction.clipAction(this.animations[1]);
            // 放松动作
            let idleAction = new THREE.AnimationMixer(this.model);
            idleAction.clipAction(this.animations[2]);
            // 步行
            let walkAction = new THREE.AnimationMixer(this.model);
            walkAction.clipAction(this.animations[3]).play();

            this.actions = [runAction, idleAction, walkAction];

            // 渲染场景
            this.renderScene();

        });

        //轨道控制器
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        // 如果相机控件修改了相机参数 重新调用渲染器
        this.controls.addEventListener("change", () => {
            this.renderer.render(this.scene, this.camera);
        });


    }
    // 创建GUI面板
    createPanel = () => {
        const panel = new dat.GUI({ width: 310 });
        document.getElementById("gui").appendChild(panel.domElement);
        panel.domElement.style.position = "absolute";
        panel.domElement.style.right = "0px";
        let settings = {
            idle: false // 放松
        };
        panel.add(settings, 'idle').name('放松').onChange(this.runIdleAction);
    };
    // 放松
    runIdleAction = (value) => {
        if (value) {
            // 将跑、走动画停止，开启放松动画
            this.actions[0].clipAction(this.animations[1]).stop();
            this.actions[2].clipAction(this.animations[3]).stop();
            this.actions[1].clipAction(this.animations[2]).play();
            // 更新激活的动作
            this.active = 1;
        } else {
            // 变为走
            this.actions[0].clipAction(this.animations[1]).stop();
            this.actions[2].clipAction(this.animations[3]).play();
            this.actions[1].clipAction(this.animations[2]).stop();
            // 更新激活的动作
            this.active = 2;
        }
    };
    renderScene() {
        requestAnimationFrame(() => this.renderScene());
        // 获取当前秒数
        const delta = this.clock.getDelta();
        // 更新动画混合器、轨道控制器、性能监听器
        this.actions[this.active].update(delta);
        // 渲染场景
        this.renderer.render(this.scene, this.camera);
    }
}
