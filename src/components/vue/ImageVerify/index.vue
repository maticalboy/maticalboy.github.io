<template>
    <div class="content">
        <div style="width: 499px; height: 246px">
            <image-verify
                :cutPathList="cutPathList"
                :passDiff="passDiff"
                :isRandomPath="isRandomPath"
                :failedText="failedText"
                :fillStyle="fillStyle"
                :strokeStyle="strokeStyle"
                @start="start"
                @end="end"
            >
            </image-verify>
        </div>
        <div class="second-show">
            {{ second ? "已用时：" + second : "" }}
        </div>
    </div>
</template>
<script>
export default {
    name: "ImageVerifyView",
    components: {
        ImageVerify: () => import("@/components/common/ImageVerify"),
    },
    data() {
        return {
            //验证码
            cutPathList: [
                { x: 378, y: 68 },
                { x: 398, y: 67 },
                { x: 398, y: 81 },
                { x: 415, y: 80 },
                { x: 415, y: 96 },
                { x: 398, y: 96 },
                { x: 398, y: 108 },
                { x: 380, y: 108 },
                { x: 379, y: 94 },
                { x: 359.99999999999994, y: 94 },
                { x: 359, y: 83 },
                { x: 378, y: 82 },
                { x: 376, y: 69 },
            ],
            passDiff: 3,
            isRandomPath: true,
            failedText: "验证失败，请重新尝试",
            fillStyle: "#7AABD9",
            strokeStyle: "red",
            second: "",
            startTime: "",
        };
    },
    methods: {
        // 滑块
        start() {
            this.startTime = new Date().getTime();
        },
        end() {
            const second = (new Date().getTime() - this.startTime) / 1000;
            this.second = parseFloat(second).toFixed(1) + "s";
        },
    },
};
</script>
<style lang="less" scoped>
.content {
    margin: 0 auto;
    // 滑块
    .second-show {
        width: 100%;
        height: 25px;
        text-align: center;
        color: black;
        margin-top: 30px;
    }
}
</style>
