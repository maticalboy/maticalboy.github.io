<!--
 * @Author: “chenjinwei” “507725948@qq.com”
 * @Date: 2023-09-23 15:29:47
 * @LastEditors: “chenjinwei” “507725948@qq.com”
 * @LastEditTime: 2023-11-02 15:10:05
 * @FilePath: \vue2-basic-version\src\views\UploadFile.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
	<div>
		<input type="file" id="fileInput" @change="change" />
		<img alt="" id="uploadImg" :src="imgUrl" style="width: 100px; height: 100px" />
		<div id="uploadText"></div>
		<div class="progress">
			<div class="progress-bar"></div>
		</div>
		<el-button v-show="blobs != ''" @click.stop="download(blobs, '附件.png')">
			下载文件
		</el-button>
	</div>
</template>

<script>
import { download, compressImage } from '@/utils/common/upload_file';
export default {
	name: 'UploadFile',
	data() {
		return {
			imgUrl: '',
			text: '',
			blobs: ''
		};
	},
	methods: {
		download,
		/**
		 * @description: 选择文件触发
		 * @param {*} e
		 * @return {*}
		 */
		change(e) {
			const file = e.target.files[0];
			const type = file.type.split('/')[0];
			console.log('type', type);
			switch (type) {
				case 'image':
					// this.dealImg(file);
					let arr = this.sliceFile(file, 5 * 1024);
					this.uploadChunk(arr);
					break;
			}
		},
		/**
		 * @description: 处理文件
		 * @param {*} file
		 * @return {*}
		 */
		dealImg(file) {
			console.log(file, '压缩前的文件');
			compressImage(file).then((blob) => {
				this.blobs = blob;
				this.imgUrl = window.URL.createObjectURL(blob); //换成blob地址 代码量少
				const file1 = new File([blob], file.name, {
					type: 'image/png', // 这里的格式可以是jpg，png，gif，png等，都试了下，压缩大小不变
					lastModified: Date.now()
				});
				console.log(file1, '压缩后的文件', blob);
			});
		},
		/**
		 * @description: 对文件进行切片
		 * @param {*} file
		 * @param {*} size
		 * @return {*}
		 */
		sliceFile(file, size) {
			let totalChunks = Math.ceil(file.size / size);
			const fileChunkList = [];
			let cur = 0;
			while (cur < file.size) {
				const fileInfo = {
					fileName: file.name,
					totalChunks,
					currentChunk: cur / size
				};
				fileChunkList.push({
					file: file.slice(cur, cur + size),
					fileInfo
				});
				cur += size;
			}
			return fileChunkList;
		},
		/**
		 * @description: 上传切片数组
		 * @param {*} chunk
		 * @return {*}
		 */
		uploadChunk(chunk) {
			let progressBar = document.getElementsByClassName('progress-bar')[0]; // 进度条（里面的div）
			let load = 0;
			let total = chunk.length * 5 * 1024;
			for (let i = 0; i < chunk.length; i++) {
				const xhr = new XMLHttpRequest();
				xhr.onreadystatechange = function () {
					if (xhr.readyState === 4) {
						console.log(xhr.response);
						load += 5 * 1024;
					}
				};
				xhr.open('POST', '/api/upload', true);
				xhr.upload.onprogress = function (e) {
					console.log(e.loaded, e.total);
					// 监听上传进度
					if (e.lengthComputable) {
						progressBar.style.width = ((e.loaded + load) / total) * 100 + '%';
						console.log(((e.loaded + load) / total) * 100 + '%');
						// 修改进度条宽度百分比
						// e.loaded 为当前已上传的大小，e.total为文件总大小。
					}
				};

				let form = new FormData();
				form.append('file', chunk[i].file);
				form.append('fileInfo', chunk[i].fileInfo);
				xhr.send(form);
			}
		}
	}
};
</script>
<style lang="scss" scoped>
.progress {
	background: black;
	width: 250px;
	height: 10px;
	.progress-bar {
		width: 0;
		background: #bfa;
		height: 10px;
	}
}
</style>
