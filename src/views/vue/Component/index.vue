<template>
    <div>
        <Dialog @confirm="confirm" :dialogInfo="dialogInfo">
            <template v-slot:title>
                <span class="title-name">name</span>
            </template>
            <template v-slot:content>
                <Form :formInfo="formInfo"></Form>
            </template>
            <template v-slot:footer>
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirm">确 定</el-button>
            </template>
        </Dialog>
    </div>
</template>
<script>

export default {
    name: "MyComponent",
    components: {
        Dialog: () => import("@/components/element/Dialog"),
        Form: () => import("@/components/element/Form"),
    },
    data() {
        return {
            dialogInfo: {
                // 弹窗是否显示
                dialogVisible: true,
                // 弹窗标题
                dialogTitle: "提示",
                // 弹窗宽度
                dialogWidth: "446px",
                // 弹窗内容高度
                dialogBodyHeight: "446px",
                // 弹窗遮罩层
                dialogModal: false,
                // 点击遮罩层是否关闭弹窗
                dialogCloseOnClickModal: false,
                // 是否可以通过按下 ESC 关闭弹窗
                dialogCloseOnPressEscape: false,
                // 是否显示关闭按钮
                dialogShowClose: true,
                // 弹窗位置
                dialogTop: "15vh",
                // 是否插入body元素
                dialogAppendToBody: false,
                // 是否可拖拽
                dialogDragable: true,
            },
            formInfo: [
                [
                    {
                        label: "审批人",
                        prop: "user",
                        type: "input",
                        value: "",
                        prefixIcon: "el-icon-search",
                        placeholder: "审批人",
                        disabled: false,
                        clearable: true,
                        showPassword: true,
                    },
                    {
                        label: "活动区域",
                        prop: "region",
                        type: "select",
                        options: [
                            { label: '全选', value: '全选' },
                            { label: "区域一", value: "shanghai" },
                            { label: "区域二", value: "北京", disabled: true },
                        ],
                        value: [],
                        disabled: false,
                        clearable: true,
                        filterable: true,
                        multiple: true,
                        position:[0,1],
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
                        isIndeterminate:false,
                        checkAll:false,
                        position:[2,0],
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
            ],
        };
    },
    methods: {
        confirm() {
            this.formInfo = this.formInfo.flat();
            console.log(this.formInfo);
            this.formInfo = this.$options.data().formInfo;
        },
    },
};
</script>
<style lang="less" scoped></style>
