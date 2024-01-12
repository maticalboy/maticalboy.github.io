<!--
 * @Author: “chenjinwei” “507725948@qq.com”
 * @Date: 2023-12-18 16:24:35
 * @LastEditors: “chenjinwei” “507725948@qq.com”
 * @LastEditTime: 2023-12-19 10:21:32
 * @FilePath: \maticalboy.github.io\src\views\three\Demo.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div id="threeDemo"></div>
</template>
<script>
import ThreeJSInitializer from "@/utils/three/House.js";

export default {
    name: "House",
    data() {
        return {
            demo: null,
        };
    },
    mounted() {
        this.demo = new ThreeJSInitializer("threeDemo");
        this.demo.init();
        // while (this.demo.scene.children.length > 0) {
        //     this.demo.scene.remove(this.demo.scene.children[0]);
        // }
        // this.init();
    },
    methods: {
        init() {

            const pmremGenerator = new THREE.PMREMGenerator(this.demo.renderer);
            this.demo.scene.background = new THREE.Color(0xbfe3dd);
            this.demo.scene.environment = pmremGenerator.fromScene(
                // 生成一个包含室内场景的辐射度贴图
                new RoomEnvironment(this.demo.renderer),
                // 表示辐射度贴图的精度或质量。较低的值会产生较模糊的贴图，而较高的值会产生更清晰的贴图
                0.04
            ).texture;
            this.demo.camera.position.set(5, 2, 8);
            const controls = this.demo.controls;
            controls.target.set(0, 0.5, 0);
            controls.update();
            controls.enablePan = false;
            controls.enableDamping = true;

            // 加载 glTF 模型文件中使用了 Draco 压缩的部分
            const dracoLoader = new DRACOLoader();
            // 设置 Draco 解码器的路径
            dracoLoader.setDecoderPath("jsm/libs/draco/gltf/");
            const loader = new GLTFLoader();
            // 通过 loader.setDRACOLoader() 方法将之前创建的 dracoLoader 对象设置为 GLTFLoader 的 DracoLoader
            loader.setDRACOLoader(dracoLoader);
            let mixer;
            this.clock = new THREE.Clock();
            loader.load(
                "models/gltf/LittlestTokyo.glb",
                (gltf) => {
                    const model = gltf.scene;
                    model.position.set(1, 1, 0);
                    model.scale.set(0.01, 0.01, 0.01);
                    this.demo.scene.add(model);

                    mixer = new THREE.AnimationMixer(model);
                    mixer.clipAction(gltf.animations[0]).play();

                    this.animate();
                },
                undefined,
                function (e) {
                    console.error(e);
                }
            );
        },
        animate() {
            requestAnimationFrame(animate);

            const delta = clock.getDelta();

            mixer.update(delta);

            controls.update();

            stats.update();

            renderer.render(scene, camera);
        },
    },
};
</script>
<style scoped>
#threeDemo {
    width: 500px;
    height: 500px;
    margin: 0 auto;
}
</style>
