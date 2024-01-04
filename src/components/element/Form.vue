<template>
    <div>
        <el-form>
            <el-row v-for="(row, index) in formInfo" :key="index">
                <el-form-item
                    v-for="item in row"
                    :key="item.prop"
                    :label="item.label"
                >
                    <el-input
                        v-if="item.type == 'input'"
                        class="input-style"
                        v-model="item.value"
                        :placeholder="item.placeholder"
                    ></el-input>
                    <el-select
                        v-else-if="item.type == 'select'"
                        v-model="item.value"
                        filterable
                        allow-create
                        default-first-option
                        :placeholder="item.placeholder"
                    >
                        <el-option
                            v-for="option in item.options"
                            :key="option.label"
                            :label="option.label"
                            :value="option.value"
                        ></el-option>
                    </el-select>
                    <el-date-picker
                        v-else-if="item.type == 'date'"
                        v-model="item.value"
                        :placeholder="item.placeholder"
                    ></el-date-picker>
                    <label class="switch" v-else-if="item.type == 'switch'">
                        <input type="checkbox" v-model="item.value" />
                        <span class="slider"></span>
                    </label>

                    <el-checkbox-group
                        v-else-if="item.type == 'checkbox'"
                        v-model="item.value"
                        :placeholder="item.placeholder"
                    >
                        <el-checkbox
                            v-for="check in item.checks"
                            :key="check.label"
                            :label="check.label"
                            :disabled="check.disabled"
                        ></el-checkbox>
                    </el-checkbox-group>
                    <el-radio-group
                        v-else-if="item.type == 'radio'"
                        v-model="item.value"
                        :placeholder="item.placeholder"
                    >
                        <el-radio
                            v-for="radio in item.radios"
                            :key="radio.label"
                            :label="radio.label"
                        ></el-radio>
                    </el-radio-group>
                    <el-input
                        v-else-if="item.type == 'textarea'"
                        type="textarea"
                        v-model="item.value"
                        :placeholder="item.placeholder"
                    ></el-input>
                </el-form-item>
            </el-row>
        </el-form>
    </div>
</template>
<script>
export default {
    name: "Form",
    props: {
        formInfo: {
            type: Array,
            default: () => {
                return [
                    [
                        {
                            label: "审批人",
                            prop: "user",
                            type: "input",
                            value: "",
                            placeholder: "审批人",
                        },
                        {
                            label: "活动区域",
                            prop: "region",
                            type: "select",
                            options: [
                                { label: "区域一", value: "shanghai" },
                                { label: "区域二", value: "北京" },
                            ],
                            value: "",
                            placeholder: "活动区域",
                        },
                    ],
                    [
                        {
                            label: "活动时间",
                            prop: "date",
                            type: "date",
                            value: "",
                            placeholder: "活动时间",
                        },
                        {
                            label: "活动开关",
                            prop: "switch",
                            type: "switch",
                            value: "",
                        },
                    ],
                    [
                        {
                            label: "活动性质",
                            prop: "type",
                            type: "checkbox",
                            checks: [
                                { label: "美食/餐厅线上活动", value: "1" },
                                { label: "地推活动", value: "2" },
                                { label: "线下主题活动", value: "3" },
                                { label: "单纯品牌曝光", value: "4" },
                            ],
                            value: [],
                        },
                    ],
                    [
                        {
                            label: "特殊资源",
                            prop: "resource",
                            type: "radio",
                            radios: [
                                { label: "线上品牌商赞助", value: "1" },
                                { label: "线下场地免费", value: "2" },
                            ],
                            value: "",
                        },
                    ],
                    [
                        {
                            label: "活动形式",
                            prop: "desc",
                            type: "textarea",
                            value: "",
                            placeholder: "活动形式",
                        },
                    ],
                ];
            },
        },
    },
    data() {
        return {};
    },
};
</script>
<style lang="less" scoped>
/**
 * @description: form-item的基本结构
 * @return {*}
 */
::v-deep .el-form-item {
    display: inline-flex;
    align-items: center;
    margin-right: 10px;
    margin-bottom: 10px;
    .el-form-item__label {
        display: inline-block;
        width: 4em;
        text-align: justify;
        text-align-last: justify;
        letter-spacing: 0;
        padding: 0;
        line-height: 1;
        font-size: 12px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #666666;
        white-space: nowrap;
    }
    .el-form-item__content {
        margin-left: 5px !important;
        line-height: 1;
    }
}
/**
 * @description: 输入框的样式
 * @return {*}
 */
::v-deep .el-input {
    width: 120px;
    height: 24px;
    color: #555;
    border: none;
    box-sizing: border-box;
    .el-input__inner {
        width: 120px;
        height: 24px;
        box-sizing: border-box;
        padding: 7px 12px 7px 8px;
        border: 1px solid #d4d4d4;
        border-radius: 2px;
        font-size: 12px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #333333;
        &:focus {
            border-color: #007bff;
            box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
        }
        &:hover {
            box-shadow: 0 0 0 0.15vw rgba(135, 207, 235, 0.186);
        }
    }
}
/**
 * @description: 文本域的样式
 * @return {*}
 */
::v-deep .el-textarea {
    width: 360px;
    height: 60px;
    border: none;
    box-sizing: border-box;
    .el-textarea__inner {
        width: 360px;
        height: 60px;
        border: 1px solid #d4d4d4;
        border-radius: 2px;
        box-sizing: border-box;
        padding: 7px 12px 7px 8px;
        font-size: 12px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #333333;
        &:focus {
            border-color: #007bff;
            box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
        }
        &:hover {
            box-shadow: 0 0 0 0.15vw rgba(135, 207, 235, 0.186);
        }
    }
}
/**
 * @description: 选择的样式
 * @return {*}
 */
::v-deep .el-select {
    .el-input__icon {
        line-height: 24px;
    }
}
/**
 * @description: 时间选择器
 * @return {*}
 */
::v-deep .el-date-editor--date {
    .el-input__inner {
        padding-left: 26px;
    }
    .el-input__prefix,
    .el-input__suffix {
        .el-input__icon {
            line-height: 25px;
        }
    }
}
/**
 * @description: 开关
 * @return {*}
 */
.switch {
    font-size: 12px;
    position: relative;
    display: inline-block;
    width: 4em;
    height: 2em;
    /* Hide default HTML checkbox */
    input {
        opacity: 0;
        width: 0;
        height: 0;
    }
    /* The slider */
    .slider {
        position: absolute;
        cursor: pointer;
        inset: 0;
        background-color: #eee;
        transition: 0.4s;
        border-radius: 0.5em;
        box-shadow: 0 0.2em #dfd9d9;
        &:before {
            position: absolute;
            content: "";
            height: 1.5em;
            width: 1.4em;
            border-radius: 0.3em;
            left: 0.3em;
            bottom: 0.7em;
            background-color: lightsalmon;
            transition: 0.4s;
            box-shadow: 0 0.4em #bcb4b4;
        }

        &:hover::before {
            box-shadow: 0 0.2em #bcb4b4;
            bottom: 0.5em;
        }
    }
    input:checked + .slider:before {
        transform: translateX(2em);
        background: lightgreen;
    }
}
/**
 * @description: 勾选框
 * @return {*}
 */
::v-deep .el-checkbox-group {
    .el-checkbox {
        width: 160px;
        margin-right: 10px;
    }
}
::v-deep .el-checkbox__input.is-checked {
    .el-checkbox__inner {
        border-radius: 2px;
        background-color: #3370ff;
    }
    + .el-checkbox__label {
        color: #000000;
    }
}
/**
 * @description: 单选框
 * @return {*}
 */
::v-deep .el-radio-group {
    .el-radio {
        margin-right: 10px;
    }
}
::v-deep .el-radio__input.is-checked {
    .el-radio__inner {
        border-color: #3370ff;
        background: #3370ff;
        &::after {
            width: 8px;
            height: 8px;
        }
    }
    + .el-radio__label {
        color: #333333;
    }
}
</style>
