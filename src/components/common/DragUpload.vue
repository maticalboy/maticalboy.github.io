<template>
    <div class="drag-upload">
        <div
            class="upload-area"
            @dragover.prevent="handleDragOver"
            @dragleave="handleDragLeave"
            @drop.prevent="handleDrop"
            @click="handleUploadClick"
        >
            <p v-if="!isDragging" class="tip-text">{{ tipText }}</p>
            <p v-else>{{ tipConfirmText }}</p>
        </div>
        <input
            type="file"
            ref="fileInput"
            style="display: none"
            @change="handleFileSelected"
        />
    </div>
</template>

<script>
export default {
    name: "DragUpload",
    props: {
        tipText: {
            type: String,
            default: "将文件拖放到此处或点击上传",
        },
        tipConfirmText: {
            type: String,
            default: "释放文件以上传",
        },
    },
    data() {
        return {
            isDragging: false,
        };
    },
    methods: {
        handleDragOver(event) {
            event.preventDefault();
            this.isDragging = true;
        },
        handleDragLeave() {
            this.isDragging = false;
        },
        handleDrop(event) {
            event.preventDefault();
            this.isDragging = false;
            const file = event.dataTransfer.files[0];
            this.uploadFile(file);
        },
        handleUploadClick() {
            this.$refs.fileInput.click();
        },
        handleFileSelected() {
            const file = this.$refs.fileInput.files[0];
            this.uploadFile(file);
        },
        uploadFile(file) {
            this.$emit("uploadFile", file);
        },
    },
};
</script>

<style lang="less" scoped>
.drag-upload {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    border: 2px dashed #ccc;
    .upload-area {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100%;
        background-color: #f0f0f0;
        cursor: pointer;
        .tip-text {
            text-align: center;
        }
    }
}
</style>
