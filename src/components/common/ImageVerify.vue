<template>
    <div :id="uid" class="canvas-container">
        <img
            alt=""
            src="@/assets/images/home/刷新.png"
            class="refresh-icon"
            title=""
            @click="init()"
        />
        <canvas ref="canvas" class="canvas"> </canvas>
        <Slider
            id="JSlider"
            v-model="sliderValue"
            :min="1"
            :max="100"
            @input="onSliderChange(sliderValue)"
            @change="confirmSlider()"
        />
        <canvas
            ref="canvas2"
            class="canvas canvas-slider"
            :style="'left:' + startLeft + 'px'"
        ></canvas>
    </div>
</template>

<script>
import { getUId } from "@/utils/common/strTool";
import { getRandomNum } from "@/utils/common/numsFormat";
export default {
    name: "JImgVerify",
    components: {
        Slider: () => import("@/components/common/Slider.vue"),
    },
    props: {
        cutPathList: {
            type: Array,
            default: () => {
                return [
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
                ];
            },
        },
        imgSrc: {
            type: String,
            default: require("@/assets/images/home/avatar.jpg"),
        },
        passDiff: {
            type: Number | String,
            default: 3,
        },
        isRandomPath: {
            type: Boolean,
            default: true,
        },
        failedText: {
            type: String,
            default: "验证不通过",
        },
        fillStyle: {
            type: String,
            default: "",
        },
        strokeStyle: {
            type: String,
            default: "red",
        },
    },
    created() {
        this.setUid();
    },
    mounted() {
        this.init();
    },
    data() {
        return {
            sliderValue: 0,
            canvasSliderLeft: 0,
            originLeft: 0,
            startLeft: 0,
            cutPath: [],
            width: 0,
            height: 0,
            sliderWidth: 0,
            uid: "",
            sliderInfo: {
                maxX: "",
                minX: "",
            },
            startSliding: false,
        };
    },
    computed: {},
    methods: {
        setUid() {
            this.uid = "JImgVerify-" + getUId();
        },
        getXObj(arr) {
            const obj = {
                minX: Infinity,
                maxX: -Infinity,
                minY: Infinity,
                maxY: -Infinity,
            };
            arr.forEach((item) => {
                obj.minX = Math.min(obj.minX, item.x);
                obj.maxX = Math.max(obj.maxX, item.x);
                obj.minY = Math.min(obj.minY, item.y);
                obj.maxY = Math.max(obj.maxY, item.y);
            });
            return obj;
        },
        init() {
            const content = document.getElementById(this.uid);
            this.width = content.offsetWidth + "px";
            this.height = content.offsetHeight + "px";
            this.cutPath = [];
            this.cutPathList.forEach((item) => {
                this.cutPath.push([item.x, item.y]);
            });
            this.sliderValue = 0;
            this.canvasSliderLeft = 0;
            this.originLeft = 0;
            this.startLeft = 0;
            this.initData();
        },
        async initData() {
            const xObj = this.getXObj(this.cutPathList);
            const difX = getRandomNum(
                -xObj.minX + xObj.maxX - xObj.minX,
                parseInt(this.width) - xObj.maxX
            );
            const difY = getRandomNum(
                -xObj.minY + xObj.maxY - xObj.minY,
                parseInt(this.height) - xObj.maxY
            );
            let maxX = -Infinity,
                minX = Infinity;
            this.cutPath.forEach((pos) => {
                pos[0] += difX;
                pos[1] += difY;
                maxX = Math.max(maxX, pos[0]);
                minX = Math.min(minX, pos[0]);
            });
            this.canvasSliderLeft = -(maxX + 10) + "px";
            this.originLeft = -minX;
            this.startLeft = -minX;
            this.sliderWidth = maxX - minX;
            this.sliderInfo = {
                maxX,
                minX,
            };
            // this.$message.show("加载中……");
            await this.cutImgSlider();
            await this.getImgSlider();
            // this.$message.hide();
        },
        onSliderChange(sliderValue) {
            if (!this.startSliding) {
                this.startSliding = true;
                this.$emit("start");
            }
            const left = parseInt(this.width) * (sliderValue / 100);
            this.startLeft = Math.min(
                parseInt(this.originLeft) + parseInt(left),
                parseInt(this.width) - this.sliderInfo.maxX
            );
        },
        confirmSlider() {
            if (Math.abs(this.startLeft) <= this.passDiff) {
                this.$message({
                    message: "验证通过",
                    type: "success",
                });
            } else if (this.failedText) {
                this.$message.error(this.failedText);
            }
            setTimeout(() => {
                this.init();
            }, 1000);
            this.startSliding = false;
            this.$emit("end", Math.abs(this.startLeft) <= this.passDiff);
        },
        cutImgSlider() {
            return new Promise((resolve) => {
                const canvas = this.$refs.canvas;
                const ctx = canvas.getContext("2d");
                const image = new Image();
                image.onload = () => {
                    image.width = parseInt(this.width);
                    image.height = parseInt(this.height);
                    canvas.width = image.width;
                    canvas.height = image.height;
                    // 绘制图片
                    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
                    // 创建镂空区域的路径
                    this.cutImg(ctx, this.cutPath, image, canvas);
                    // 在路径内部清除像素
                    if (this.fillStyle) {
                        ctx.fillStyle = this.fillStyle; // 设置填充颜色
                    } else {
                        ctx.globalCompositeOperation = "destination-out";
                    }
                    ctx.fill();
                    resolve();
                };
                image.src = this.imgSrc;
            });
        },
        cutImg(ctx, cutPath, image, canvas) {
            ctx.beginPath();
            ctx.moveTo(...cutPath[0]);
            for (let i = 1; i < cutPath.length; i++) {
                ctx.lineTo(...cutPath[i]);
            }
            ctx.closePath();
        },
        getImgSlider() {
            return new Promise((resolve) => {
                const canvas = this.$refs.canvas2;
                const ctx = canvas.getContext("2d");
                const image = new Image();
                image.onload = () => {
                    image.width = parseInt(this.width);
                    image.height = parseInt(this.height);
                    canvas.width = image.width;
                    canvas.height = image.height;

                    // 定义剪切路径
                    this.cutImg(ctx, this.cutPath, image, canvas);
                    if (this.strokeStyle) {
                        ctx.strokeStyle = this.strokeStyle;
                    }
                    ctx.stroke();
                    ctx.clip();

                    // 绘制图片
                    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
                    resolve();
                };
                image.src = this.imgSrc;
            });
        },
    },
};
</script>

<style lang="less" scoped>
.canvas-container {
    position: relative;
    width: 100%;
    height: 100%;
    .refresh-icon {
        width: 20px;
        height: 20px;
        position: absolute;
        top: 0.3rem;
        right: 0.6rem;
        cursor: pointer;
    }
    .canvas {
        display: block;
        width: 100%;
        height: 100%;
    }
    .canvas-slider {
        position: absolute;
        top: 0;
        left: 0;
    }
}
</style>
