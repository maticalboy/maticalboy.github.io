<!--
 * @Author: “chenjinwei” “507725948@qq.com”
 * @Date: 2023-10-26 11:49:01
 * @LastEditors: “chenjinwei” “507725948@qq.com”
 * @LastEditTime: 2024-01-18 10:04:41
 * @FilePath: \vue2-template\vue2-template\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div id="app">
        <RouterView v-if="isRouterAlive" />
    </div>
</template>

<script>
export default {
    provide() {
        return {
            reload: this.reload,
        };
    },
    data() {
        return {
            isRouterAlive: true,
        };
    },
    watch: {
        $route: "routeChange",
    },
    methods: {
        reload() {
            this.isRouterAlive = false;
            this.$nextTick(() => (this.isRouterAlive = true));
        },
        routeChange(newVal, oldVal) {
            if (newVal.name == oldVal.name) {
                this.reload();
            }
        },
    },
    metaInfo: {
        titleTemplate: (title) => {
            return title
                ? `${title} - ${process.env.VUE_APP_TITLE}`
                : process.env.VUE_APP_TITLE;
        },
    },
};
</script>
<style lang="scss">
@import "@/assets/styles/css/mixins.scss";
body {
    display: block;
    margin: 0 !important;
}
#canvas {
    margin: 0 auto;
    width: 500px;
    height: 500px;
}
.root-view {
    flex: 1;
    height: 100vh;
    overflow: hidden;
  }
// pub
.h-title {
    @include headTitle();
}
.map-x {
    @include mapStyle();
}
.vm {
    height: 100vh;
    width: 100%;
    position: relative;
    overflow: auto;
}

</style>
