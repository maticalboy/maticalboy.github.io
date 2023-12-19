/*
 * @Author: “chenjinwei” “507725948@qq.com”
 * @Date: 2023-12-18 16:21:12
 * @LastEditors: “chenjinwei” “507725948@qq.com”
 * @LastEditTime: 2023-12-19 16:38:27
 * @FilePath: \maticalboy.github.io\src\utils\threeDemo.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 引入three.js
import * as THREE from "three";
import {RGBELoader} from "three/examples/jsm/loaders/RGBELoader"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
export default class ThreeJSInitializer {
    constructor(containerId) {
        this.containerId = containerId;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
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
        //创建一个半径为1，经纬度分段数位20的球
        const boxBufferGeometry = new THREE.BoxGeometry(5, 5, 5);
        //纹理加载器
        let textureLoader = new THREE.TextureLoader();
        const pngs = [
            '4_l.jpg',
            '4_r.jpg',
            '4_u.jpg',
            '4_d.jpg',
            '4_b.jpg',
            '4_f.jpg'
        ];
        let materials = [];
        pngs.forEach((item, index) => {
            let cubeTextureLoader = textureLoader.load(`image/${item}`);
            if (index == 3 || index == 2) {
                cubeTextureLoader.rotation = Math.PI;
                cubeTextureLoader.center = new THREE.Vector2(0.5, 0.5)
            }
            materials.push(new THREE.MeshStandardMaterial({ map: cubeTextureLoader }))
        })
        //根据几何体和材质创建物体
        const mesh = new THREE.Mesh(boxBufferGeometry, materials);
        mesh.geometry.scale(1, 1, -1)
        //将物体加入到场景
        // this.scene.add(mesh);

        //创建一个半径为1，经纬度分段数位20的球
        const sphereBufferGeometry = new THREE.SphereGeometry(5, 50, 50);
        //纹理加载器
        let rgbeLoader = new RGBELoader();
        rgbeLoader.load('models/gltf/hayloft_4k.hdr', loader => {
            //纹理加载器加载图片
            const material = new THREE.MeshStandardMaterial({
                map: loader
            });
            //根据几何体和材质创建物体
            const mesh = new THREE.Mesh(sphereBufferGeometry, material);
            mesh.geometry.scale(1, 1, -1);
            //将物体加入到场景
            this.scene.add(mesh);
        })
        //轨道控制器
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        // 如果相机控件修改了相机参数 重新调用渲染器
        this.controls.addEventListener("change", () => {
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
