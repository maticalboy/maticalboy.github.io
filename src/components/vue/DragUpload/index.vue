<template>
    <div style="margin: 0 auto">
        <div class="drag-upload-view">
            <img class="show-img-box" alt="" :src="showImg" ref="showImg" />
            <div>{{ fileName }}</div>
            <div class="drag-upload-box">
                <drag-upload @uploadFile="uploadFile"></drag-upload>
            </div>
        </div>
    </div>
</template>
<script>
import { blobToBase64 } from "@/utils/common/fileTool";
export default {
    name: "DragUploadView",
    components: {
        DragUpload: () => import("@/components/common/DragUpload"),
    },
    data() {
        return {
            // 文件
            fileName: "",
            showImg: "",
        };
    },
    methods: {
        // 文件上传
        uploadFile(file) {
            blobToBase64(file, (base64String) => {
                this.fileName = file.name;
                this.showImg = base64String;
            });
        },
    },
};
</script>
<style lang="less" scoped>
// 文件
.drag-upload-view {
    .show-img-box {
        width: 200px;
    }
    .drag-upload-box {
        width: 200px;
        height: 200px;
    }
}
</style>
