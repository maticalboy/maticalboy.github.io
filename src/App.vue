<template>
    <div id="app">
        <image-processing></image-processing>
    </div>
</template>

<script>
import ImageProcessing from "@/components/ImageProcessing";
export default {
    name: "App",
    components: {
        ImageProcessing,
    },
};
</script>

<style>
html,
body,
#app {
    height: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    font-size: 12px;
    min-width: 860px;
}

body {
    margin: 0;
}
</style>
