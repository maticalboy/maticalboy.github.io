<!--
 * @Author: “chenjinwei” “507725948@qq.com”
 * @Date: 2023-11-29 15:16:29
 * @LastEditors: “chenjinwei” “507725948@qq.com”
 * @LastEditTime: 2023-11-30 09:48:35
 * @FilePath: \openlayers-demo\src\views\BigFile\BigFile.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
	<div>
		<div style="height: 300px">
			<h1>大文件断点续传</h1>
			<el-col style="display: flex">
				<el-upload
					class="upload-demo"
					action=""
					:on-preview="handlePreview"
					:on-remove="handleRemove"
					:before-remove="beforeRemove"
					multiple
					:limit="1"
					:on-exceed="handleExceed"
					:file-list="fileList"
					:before-upload="handleUpload">
					<el-button>
						<i class="el-icon-upload el-icon--left" size="mini"></i>
						上传
					</el-button>
				</el-upload>

				<el-button style="margin-left: 10px; height: 40px" @click="handlePause">
					<i class="el-icon-video-pause el-icon--left" size="mini"></i>
					暂停
				</el-button>
				<el-button @click="handleResume" style="height: 40px">
					<i class="el-icon-video-play el-icon--left" size="mini"></i>
					恢复
				</el-button>
				<el-button @click="clearFiles" style="height: 40px">
					<i class="el-icon-video-play el-icon--left" size="mini"></i>
					清空
				</el-button>
			</el-col>
		</div>

		<div style="width: 600px; margin-bottom: 30px">
			<el-progress
				:text-inside="true"
				:stroke-width="18"
				:percentage="percentage"></el-progress>
		</div>
	</div>
</template>
<script>
import { read } from '@/utils/vue2/readFile';
import axios from 'axios';
import SparkMD5 from 'spark-md5';
const CancelToken = axios.CancelToken;
// 创建实例
const onUploadProgress = axios.onUploadProgress;
let uploadCancel;

export default {
	data() {
		return {
			percentage: 0, // 上传进度
			fileList: [], // 文件列表
			already: [], // 已上传文件列表
			isPaused: false, // 是否暂停上传
			uploading: false, // 是否正在上传
			currentFile: null, // 当前上传的文件
			currentProgress: 0 // 当前上传的进度
		};
	},
	methods: {
		// 处理文件移除事件
		handleRemove(file, fileList) {
			console.log(file, fileList);
		},
		// 处理文件预览事件
		handlePreview(file) {
			console.log(file);
		},
		// 处理超出文件数量限制事件
		handleExceed(files, fileList) {
			this.$message.warning(
				`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
					files.length + fileList.length
				} 个文件`
			);
		},
		// 处理文件移除前的确认操作
		beforeRemove(file) {
			return this.$confirm(`确定移除 ${file.name}？`);
		},
		// 处理文件上传事件
		async handleUpload(file) {
			this.fileList.push(file); // 将文件加入文件列表

			if (!this.uploading) {
				this.uploading = true; // 开始上传
				const { name, size } = file;

				// 读取文件内容
				const content = await read(file);

				// 使用SparkMD5库计算文件内容的哈希值
				let spark = new SparkMD5.ArrayBuffer();
				spark.append(content);
				const hash = spark.end();

				// 检查本地存储是否有相同哈希值的文件已经上传过
				if (localStorage.getItem(`${hash}`)) {
					this.percentage = ~~localStorage.getItem(`${hash}`);
				}

				// 检查是否已经上传过一些片段
				const result = await axios.get('http://127.0.0.1:3000/api/upload_already', {
					params: { hash }
				});
				this.already = result.data.fileList;

				const chunkSize = 10 * 1024 * 1024;
				const chunkList = [];
				const chunkListLength = Math.ceil(size / chunkSize);
				// const prefix = /(.*)(\.)([0-9A-z]+)$/.exec(name)[1];
				const suffix = /\.([0-9A-z]+)$/.exec(name)[1];
				let index = 0;

				// 将文件切片成多个chunk
				while (index < chunkListLength) {
					chunkList.push({
						chunk: file.slice(index * chunkSize, (index + 1) * chunkSize),
						fileName: `${hash}_${index + 1}.${suffix}`
					});
					index++;
				}

				let count = 0;
				for (let i = 0; i < chunkListLength; i++) {
					if (this.isPaused) {
						break;
					}

					let item = chunkList[i];

					// 如果该chunk已经在已上传的部分文件列表中，则跳过该chunk继续上传下一个
					if (this.already.length > 0 && this.already.includes(item.fileName)) {
						count++;
						this.percentage = Math.floor((count / chunkListLength) * 100);
						continue;
					}

					const formData = new FormData();
					formData.append('file', item.chunk);
					formData.append('filename', item.fileName);

					// 发送POST请求上传chunk，并监听上传进度
					await axios.post('http://127.0.0.1:3000/api/upload_chunk', formData, {
						headers: {
							'Content-Type': 'multipart/form-data'
						},
						cancelToken: new CancelToken(function executor(c) {
							// executor 函数接收一个 cancel 函数作为参数
							uploadCancel = c;
						}),
						onUploadProgress: (progressEvent) => {
							console.log('我在传', progressEvent.loaded);
							this.currentFile = file;
							// 显示的进度
							this.currentProgress = Math.floor(
								((i * chunkSize + progressEvent.loaded) / size) * 100
							);
							this.percentage = this.currentProgress;
						}
					});

					count++;
					// 实际保存的进度
					let percentage = Math.floor((count / chunkListLength) * 100);
					localStorage.setItem(`${hash}`, percentage.toString());

					if (count === chunkListLength) {
						// 完成所有chunk的上传后，发送请求进行文件合并
						await axios.get('http://127.0.0.1:3000/api/upload_merge', {
							params: { hash }
						});
						this.$msgbox({
							type: 'success',
							message: '上传成功！'
						});
						this.percentage = 0;
						this.uploading = false;
						return;
					}
				}
			}
		},

		handlePause() {
			console.log('处理暂停事件');
			this.isPaused = true;
			uploadCancel();
			// 停止上传
			this.uploading = false;
		},

		async handleResume() {
			console.log('处理恢复事件');
			this.isPaused = false; // 设置为false以继续上传

			if (this.currentFile && this.currentProgress > 0 && this.currentProgress < 100) {
				const { name, size } = this.currentFile;
				const content = await read(this.currentFile);

				// 使用SparkMD5库计算文件内容的哈希值
				let spark = new SparkMD5.ArrayBuffer();
				spark.append(content);
				const hash = spark.end();
				const chunkSize = 10 * 1024 * 1024;
				const chunkListLength = Math.ceil(size / chunkSize);
                // const prefix = /(.*)(\.)([0-9A-z]+)$/.exec(name)[1];
				const suffix = /\.([0-9A-z]+)$/.exec(name)[1];
				let count = Math.floor((this.currentProgress / 100) * chunkListLength); // 将count的初始值设置为恢复进度对应的索引号

				for (let i = count; i < chunkListLength; i++) {
					if (this.isPaused) {
						break;
					}

					let item = {
						chunk: this.currentFile.slice(i * chunkSize, (i + 1) * chunkSize),
						fileName: `${hash}_${i + 1}.${suffix}`
					};

					const formData = new FormData();
					formData.append('file', item.chunk);
					formData.append('filename', item.fileName);

					// 发送POST请求上传chunk，并监听上传进度
					await axios.post('http://127.0.0.1:3000/api/upload_chunk', formData, {
						headers: {
							'Content-Type': 'multipart/form-data'
						},
						cancelToken: new CancelToken(function executor(c) {
							// executor 函数接收一个 cancel 函数作为参数
							uploadCancel = c;
						}),
						onUploadProgress: (progressEvent) => {
							console.log('我在传1', progressEvent.loaded);
							this.currentProgress = Math.floor(
								((i * chunkSize + progressEvent.loaded) / size) * 100
							);
							this.percentage = this.currentProgress;
						}
					});

					count++;
					// 真实存储的进度
					let percentage = Math.floor((count / chunkListLength) * 100);
					localStorage.setItem(`${hash}`, percentage.toString());

					if (count === chunkListLength) {
						// 完成所有chunk的上传后，发送请求进行文件合并
						await axios.get('http://127.0.0.1:3000/api/upload_merge', {
							params: { hash }
						});
						this.$msgbox({
							type: 'success',
							message: '上传成功！'
						});
						this.uploading = false;
						return;
					}
				}
			} else if (this.fileList.length > 0) {
				// 如果没有当前文件但是文件列表中还有文件，则取最后一个文件继续上传
				const lastFile = this.fileList[this.fileList.length - 1];
				this.handleUpload(lastFile);
			}
		},

		clearFiles() {
			console.log('处理清空事件');
			this.fileList = [];
			this.percentage = 0;
			localStorage.clear();
		}
	}
};
</script>
<style lang="scss" scoped>
.simple-upload-container {
	width: 100%;
	border: 1px solid #d2d2d2;
	border-radius: 4px;
	background-color: #fff;
	padding-bottom: 15px;
	padding: 10px;

	.progress-box {
		width: 100%;
	}

	.total-progress {
		margin-bottom: 15px;

		.btns {
			position: relative;

			.select-file-input {
				position: absolute;
				display: inline-block;
				left: 0;
				top: 0;
				border: none;
				opacity: 0;
				width: 96px;
				height: 28px;
			}
		}
	}

	.file-list {
		.list-item {
			padding: 8px 10px;
			display: flex;
			justify-content: center;
			justify-items: center;
			line-height: 25px;
			position: relative;

			&:hover .item-chunk-box {
				display: block;
			}

			div {
				flex: 1;
				margin-top: 6px;
			}

			.item-name {
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				margin-right: 6px;

				.svg-icon {
					font-size: 22px;
					vertical-align: sub;
				}
			}

			.item-status {
				flex: 0 0 10%;
				text-align: center;
				text-align: left;

				.el-icon-circle-check {
					color: #67c23a;
				}

				.el-icon-circle-close {
					color: #f00;
				}
			}

			.item-chunk-box {
				display: none;
				transition: all 3s;
				position: absolute;
				top: 0;
				left: 40px;
				z-index: 10;
			}

			.item-progress {
				flex: 0 0 60%;
			}
		}
	}

	.upload-tip {
		font-size: 12px;
		color: #606266;
		margin-top: 7px;
	}

	.el-progress {
		width: 80%;
		display: inline-block;
	}

	>>> .el-collapse-item__header {
		height: auto;
	}
}
</style>
