<!--
 * @Author: “chenjinwei” “507725948@qq.com”
 * @Date: 2023-12-18 16:24:35
 * @LastEditors: “chenjinwei” “507725948@qq.com”
 * @LastEditTime: 2024-01-12 15:50:41
 * @FilePath: \maticalboy.github.io\src\views\three\Demo.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div id="threeDemo"></div>
</template>
<script>
import ThreeJSInitializer from "@/utils/three/threeDemo.js";
export default {
    name: "Demo",
    data() {
        return {
            demo: null,
        };
    },
    mounted() {
        this.demo = new ThreeJSInitializer("threeDemo");
        this.demo.init();
        while (this.demo.scene.children.length > 0) {
            this.demo.scene.remove(this.demo.scene.children[0]);
        }
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
