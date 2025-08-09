<template>
    <div style="width: 100; height: 100vh">
        <div class="image-containor">
            <div
                style="
                    width: 50%;
                    box-sizing: border-box;
                    border: 1px solid #000;
                "
            ></div>

            <div
                style="
                    width: 50%;
                    box-sizing: border-box;
                    border: 1px solid #000;
                "
            ></div>
        </div>
        <div class="image-containor">
            <div
                style="
                    width: 50%;
                    box-sizing: border-box;
                    border: 1px solid #000;
                "
            ></div>

            <div
                style="
                    width: 50%;
                    box-sizing: border-box;
                    border: 1px solid #000;
                "
            ></div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {};
    },
};
</script>
<style lang="less" scoped>
.image-containor {
    width: 100%;
    height: 50%;
    display: flex;
    flex-direction: row;
}
</style>
