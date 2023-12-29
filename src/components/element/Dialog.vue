<!--
 * @Author: “chenjinwei” “507725948@qq.com”
 * @Date: 2023-12-29 08:53:41
 * @LastEditors: “chenjinwei” “507725948@qq.com”
 * @LastEditTime: 2023-12-29 09:39:45
 * @FilePath: \maticalboy.github.io\src\components\element\Dialog.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div>
        <el-dialog
            v-dialog-drag
            :title="dialogInfo.dialogTitle"
            :visible.sync="dialogInfo.dialogVisible"
            :width="dialogInfo.dialogWidth"
            :top="dialogInfo.dialogTop"
            :modal="dialogInfo.dialogModal"
            :close-on-click-modal="dialogInfo.dialogCloseOnClickModal"
            :append-to-body="dialogInfo.dialogAppendToBody"
        >
            <div slot="title" class="el-dialog__title">
                <span class="title-name">name</span>
            </div>
            <slot name="content"></slot>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirm"
                    >确 定</el-button
                >
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name: "Dialog",
    props: {
        dialogInfo: {
            type: Object,
            default: () => {
                return {
                    dialogVisible: true,
                    dialogTitle: "提示",
                    dialogWidth: "446px",
                    dialogModal: false,
                    dialogCloseOnClickModal: false,
                    dialogCloseOnPressEscape: false,
                    dialogShowClose: true,
                    dialogTop: "15vh",
                    dialogAppendToBody: true,
                };
            },
        },
    },
    data() {
        return {};
    },
    methods:{
        confirm(){
            this.$emit('confirm')
        }
    }
};
</script>
<style lang="less" scoped>
/**
 * @description: 去除默认的遮罩层
 * @return {*}
 */
::v-deep .el-dialog__wrapper {
    pointer-events: none;
}
::v-deep .el-dialog {
    pointer-events: auto;
}
/**
 * @description: 弹窗头部样式
 * @return {*}
 */
::v-deep .el-dialog__header {
    padding: 14px 10px 13px 10px;
    height: 40px;
    border-bottom: 1px solid #e8e8e8;
    box-sizing: border-box;
    .el-dialog__title {
        font-size: 12px;
        font-family: Source Han Sans CN;
        font-weight: 600;
        color: #000000;
        line-height: 1;
    }
    .el-dialog__headerbtn {
        top: 14px;
        right: 10px;
        font-size: 10px;
    }
}
/**
 * @description: 底部按钮样式
 * @return {*}
 */
::v-deep .el-dialog__footer {
    height: 40px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 10px;
    border-top: 1px solid #e8e8e8;
    .el-button--primary {
        width: 60px;
        height: 24px;
        background: #3370ff;
        padding: 6px 18px 7px 18px;
        border-radius: 2px;
        border: none;
        font-size: 12px;
        span {
            font-size: 12px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: #ffffff;
        }
        &:hover {
            box-shadow: 0 0 10px 5px rgba(51, 112, 255, 0.5);
        }
    }
    .el-button--default {
        width: 60px;
        height: 24px;
        background-color: #ffffff;
        padding: 5px 18px 7px 18px;
        border: 1px solid #d4d4d4;
        border-radius: 2px;
        font-size: 12px;
        span {
            font-size: 12px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: #333333;
        }
        &:focus,
        &:hover {
            border-color: #c6e2ff;
            background-color: #ecf5ff;
            span {
                color: #409eff;
            }
        }
    }
    .apply-button {
        width: 60px;
        height: 24px;
        border: 1px solid #3370ff;
        background-color: #ffffff;
        border-radius: 2px;
        padding: 4px 17px 6px 17px;
        span {
            font-size: 12px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: #3370ff;
        }
        &:hover,
        &:focus {
            background: #3370ff;
            span {
                color: #ffffff;
            }
        }
    }
}
/**
 * @description: 弹窗内容
 * @return {*}
 */
 ::v-deep .el-dialog__body {
    min-height: 120px;
    max-height: 500px;
    padding: 10px;
 }
</style>
