<template>
    <div class="upload-file">
        <el-upload
            :action="uploadFileUrl"
            :before-upload="handleBeforeUpload"
            :file-list="fileList"
            show-file-list
            drag
            multiple
            :limit="limit"
            :on-error="handleUploadError"
            :on-exceed="handleExceed"
            :on-success="handleUploadSuccess"
            :on-preview="handleUploadedPreview"
            :before-remove="beforeDelete"
            :on-remove="handleDelete"
            class="uploader"
            ref="upload"
        >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
                将文件拖到此处，或 <em>选取文件</em> 上传
            </div>

            <!-- 上传按钮 -->
            <!--<el-button size="mini" type="primary">选取文件</el-button>-->

            <!-- 上传提示 -->
            <div class="el-upload__tip" slot="tip" v-if="showTip">
                <template v-if="fileSize">
                    请上传大小不超过
                    <b style="color: #f56c6c"> {{ fileSize }} KB</b>
                </template>
                <template v-if="fileType">
                    格式为
                    <b style="color: #f56c6c">{{ fileType.join("/") }}</b>
                    的文件</template
                >
            </div>
        </el-upload>
    </div>
</template>
<script>
export default {
    props: {
        // 上传文件数量限制
        limit: {
            type: Number,
            default: 5,
        },
        // 单个上传文件大小限制
        fileSize: {
            type: Number,
            default: 500,
        },
        // 允许上传的文件类型, 例如['png', 'jpg', 'jpeg']
        fileType: {
            type: Array,
            default: () => [
                "doc",
                "xls",
                "ppt",
                "txt",
                "pdf",
                "png",
                "jpg",
                "jpeg",
            ],
        },
        // 是否显示文件上传提示
        isShowTip: {
            type: Boolean,
            default: true,
        },
    },
    computed: {
        // 是否显示提示
        showTip() {
            return this.isShowTip && (this.fileType || this.fileSize);
        },
    },
    data() {
        return {
            // 上传的图片请求地址
            uploadFileUrl: "http://localhost:8088/file/upload",
            fileList: [],
            notifyPromise: Promise.resolve(),
        };
    },
    methods: {
        // 上传前校检格式和大小
        handleBeforeUpload(file) {
            // 校检文件类型
            if (this.fileType) {
                let fileExtension = "";
                if (file.name.lastIndexOf(".") > -1) {
                    fileExtension = file.name.slice(
                        file.name.lastIndexOf(".") + 1
                    );
                }
                const isTypeOk = this.fileType.some((type) => {
                    return fileExtension && fileExtension.indexOf(type) > -1;
                });
                if (!isTypeOk) {
                    this.warningNotify(
                        `文件格式不正确，请上传${this.fileType.join(
                            "/"
                        )}格式文件！`
                    );
                    return false;
                }
            }
            // 校检文件大小
            if (this.fileSize) {
                // KB
                const fileSize = file.size / 1024;
                const isLt = fileSize < this.fileSize;
                if (!isLt) {
                    this.warningNotify(
                        `上传文件大小不能超过 ${this.fileSize} KB!`
                    );
                    return false;
                }
            }
            // 开始上传
            this.loading = this.$loading({
                lock: true,
                text: "上传中...",
                background: "rgba(0, 0, 0, 0.7)",
            });
            return true;
        },
        
        // 文件个数超出限制
        handleExceed() {
            this.$message.warning(`上传文件数量不能超过 ${this.limit} 个!`);
        },

        // 上传失败
        handleUploadError(err) {
            this.$message.error(`上传失败[${err}], 请重试`);
            this.loading.close();
        },

        // 上传成功回调
        handleUploadSuccess(res, file, fileList) {
            if (res.resultCode === 200) {
                file["url"] = res.data.path;
                //this.fileList.push(file);  报错 Cannot set properties of null (setting 'status')
                this.$message.success("上传成功");
                this.loading.close();
            } else {
                this.handleUploadError(res.message);
            }
        },

        // 删除上传文件前
        beforeDelete(file, fileList) {
            this.fileList = fileList;
            if (file.status === "success") {
                return this.$confirm(`确定删除文件【${file.name}】`);
            }
        },

        // 删除上传文件
        handleDelete(file, fileList) {
            if (file.status === "success") {
                let filePath = file.url;
                let fileIndex;
                this.fileList.forEach((it, index) => {
                    if (it.url === filePath) {
                        fileIndex = index;
                    }
                });
                // 删除已上传的文件
                this.uploadFileDelete(filePath, fileIndex);
            }
        },

        uploadFileDelete(filePath, fileIndex) {
            let _this = this;
            if (fileIndex >= 0) {
                this.axios({
                    method: "DELETE",
                    url: "/file/upload/delete",
                    headers: { "content-type": "application/json" },
                    data: filePath,
                })
                    .then((response) => {
                        let data = response.data;
                        if (data.resultCode === 200) {
                            this.$message({
                                type: "success",
                                message: data.message,
                            });
                            _this.fileList.splice(fileIndex, 1);
                        } else {
                            this.$message.error(data.message);
                        }
                    })
                    .catch((error) => {
                        this.$message.error(error);
                    });
            } else {
                this.$message.error("未找到上传文件，无法删除");
            }
        },

        warningNotify(msg) {
            let _this = this;
            this.notifyPromise = this.notifyPromise
                .then(_this.$nextTick)
                .then(() => {
                    _this.$notify({
                        type: "warning",
                        title: "警告",
                        message: msg,
                        duration: 2000,
                    });
                });
        },
    },
};
</script>
