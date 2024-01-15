<template>
    <div class="slider-container">
        <input
            type="range"
            :min="min"
            :max="max"
            :value="value"
            class="slider"
            @input="updateValue"
            @mouseup="onMouseUp"
            ref="slider"
        />
        <span class="slider-value">{{ value }}</span>
    </div>
</template>

<script>
export default {
    name: "Slider",
    props: {
        min: {
            type: Number,
            default: 1,
        },
        max: {
            type: Number,
            default: 100,
        },
        value: {
            type: Number | String,
            required: true,
        },
    },
    methods: {
        updateValue(event) {
            const newValue = event.target.value;
            this.$emit("input", newValue);
        },
        onMouseUp() {
            this.$emit("change");
        },
    },
    mounted() {
        // 设置初始值
        this.$refs.slider.value = this.value;
    },
};
</script>

<style scoped lang="less">
.slider-container {
    position: relative;
    width: 100%;
    height: 20px;
    overflow: hidden;

    .slider {
        -webkit-appearance: none;
        appearance: none;
        width: 100%;
        height: 100%;
        background-color: transparent;
        outline: none;
        margin: 0;
        padding: 0;
        cursor: pointer;
        position: relative;

        &::-webkit-slider-runnable-track {
            background: linear-gradient(to right, #2196f3, #ffc107);
            height: 100%;
        }

        &::-moz-range-track {
            background: linear-gradient(to right, #2196f3, #ffc107);
            height: 100%;
        }

        &::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 30px;
            height: 20px;
            background-color: #fff;
            cursor: pointer;
            position: relative;
            z-index: 2;
            border-radius: 5px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3); /* 添加阴影效果 */
        }

        &::-moz-range-thumb {
            width: 30px;
            height: 20px;
            background-color: #fff;
            cursor: pointer;
            position: relative;
            z-index: 2;
            border-radius: 5px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3); /* 添加阴影效果 */
        }
    }

    .slider-value {
        display: block;
        font-size: 16px;
        color: #000;
        text-align: center;
        margin-top: 10px;
        transition: opacity 0.2s;
    }
}
</style>
