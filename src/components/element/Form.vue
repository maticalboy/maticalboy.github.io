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
                        :class="[
                            'input-style',
                            { 'has-prefix': item.prefixIcon ? true : false },
                        ]"
                        :clearable="item.clearable"
                        v-model="item.value"
                        :disabled="item.disabled"
                        :show-password="item.showPassword"
                        :suffix-icon="item.suffixIcon"
                        :prefix-icon="item.prefixIcon"
                        :placeholder="item.placeholder"
                    ></el-input>
                    <el-select
                        v-else-if="item.type == 'select'"
                        v-model="item.value"
                        :class="[
                            {
                                'select-multiple': item.multiple,
                            },
                        ]"
                        :disabled="item.disabled"
                        :multiple="item.multiple"
                        :collapse-tags="item.multiple"
                        :clearable="item.clearable"
                        :filterable="item.filterable"
                        allow-create
                        default-first-option
                        :popper-append-to-body="false"
                        :placeholder="item.placeholder"
                        @change="
                            multipleHandle($event, item.position, item.prop)
                        "
                    >
                        <el-option
                            v-for="option in item.options"
                            :key="option.label"
                            :label="option.label"
                            :value="option.value"
                            :disabled="option.disabled"
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
                    <template v-else-if="item.type == 'checkbox'">
                        <el-checkbox
                            :indeterminate="item.isIndeterminate"
                            v-model="item.checkAll"
                            @change="
                                handleCheckAllChange($event, item.position)
                            "
                            >全选</el-checkbox
                        >
                        <el-checkbox-group
                            v-model="item.value"
                            :placeholder="item.placeholder"
                            @change="
                                handleCheckedCitiesChange($event, item.position)
                            "
                        >
                            <el-checkbox
                                v-for="check in item.checks"
                                :key="check.label"
                                :label="check.label"
                                :disabled="check.disabled"
                            ></el-checkbox>
                        </el-checkbox-group>
                    </template>

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
import multipleMixin from "@/mixin/select_mixin";
export default {
    name: "Form",
    mixins: [multipleMixin],
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
    methods: {
        /**
         * @description: el-select全选功能
         * @param {*} node node是当前已选中的option列表
         * @param {*} type type是当前下拉框的属性名字, 自己随便取,这里我和data中的数据保持一致,为了后续动态创建参数保存上一次的已选择的option列表
         * @return {*}
         */
        multipleHandle(node, type, name) {
            this.multipleHandleMixin(node, type, name);
        },
        /**
         * @description: 全选控制
         * @param {*} val
         * @return {*}
         */
        handleCheckAllChange(val, position) {
            console.log(
                val,
                position,
                this.formInfo[position[0]][position[1]].checks.map((item) => {
                    return item.value;
                })
            );
            this.formInfo[position[0]][position[1]].value = val
                ? this.formInfo[position[0]][position[1]].checks.map((item) => {
                      return item.label;
                  })
                : [];
            this.formInfo[position[0]][position[1]].isIndeterminate = false;
        },
        /**
         * @description: 单选控制
         * @param {*} value
         * @return {*}
         */
        handleCheckedCitiesChange(value, position) {
            let checkedCount = value.length;
            console.log(value);
            this.formInfo[position[0]][position[1]].checkAll =
                checkedCount ===
                this.formInfo[position[0]][position[1]].checks.length;
            this.formInfo[position[0]][position[1]].isIndeterminate =
                checkedCount > 0 &&
                checkedCount <
                    this.formInfo[position[0]][position[1]].checks.length;
        },
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
        margin-left: 5px;
        line-height: 1;
    }
}
/**
 * @description: 输入框的样式
 * @return {*}
 */
::v-deep .el-input {
    width: 120px;
    height: auto;
    color: #555;
    border: none;
    box-sizing: border-box;
    .el-input__inner {
        width: 120px;
        height: auto;
        line-height: 1;
        box-sizing: border-box;
        padding: 5px 12px 5px 8px;
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
    .el-input__suffix,
    .el-input__prefix {
        .el-input__icon {
            line-height: 30px;
        }
    }
    &.has-prefix {
        .el-input__inner {
            padding-left: 26px;
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
    height: auto;
    .el-input__icon {
        line-height: 30px;
    }
    .el-select-dropdown {
        position: absolute !important;
        left: 0 !important;
        min-width: 120px;
        .el-select-dropdown__item {
            font-size: 12px;
            width: 120px;
            height: 24px;
            box-sizing: border-box;
            padding: 0 0 0 15px;
            line-height: 24px;
            &.selected {
                color: #3370ff;
                font-weight: 700;
            }
        }
    }
    .el-select__tags {
        max-width: 78px;
        height: auto;
        top: 0;
        transform: translateY(0);
        span {
            display: flex;
        }
        .el-select__input {
            min-width: 60px;
            margin-left: 8px;
        }
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
            line-height: 30px;
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
::v-deep .el-checkbox__input.is-checked,
::v-deep .el-checkbox__input.is-indeterminate {
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
