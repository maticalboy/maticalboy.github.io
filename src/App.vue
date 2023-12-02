<!--
 * @Author: “chenjinwei” “507725948@qq.com”
 * @Date: 2023-10-26 11:49:01
 * @LastEditors: “chenjinwei” “507725948@qq.com”
 * @LastEditTime: 2023-12-02 11:47:15
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
    overflow: auto;
}
/* 滚动条 */
::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

::-webkit-scrollbar-track {
    background-color: rgba(73, 177, 245, 0.2);
}

::-webkit-scrollbar-thumb {
    background-color: #49b1f5;
    background-image: linear-gradient(
        45deg,
        rgba(255, 255, 255, 0.4) 25%,
        transparent 25%,
        transparent 50%,
        rgba(255, 255, 255, 0.4) 50%,
        rgba(255, 255, 255, 0.4) 75%,
        transparent 75%,
        transparent
    );
    border-radius: 1em;
}
</style>
