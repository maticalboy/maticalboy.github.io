<!--
 * @Author: “chenjinwei” “507725948@qq.com”
 * @Date: 2023-09-23 15:29:47
 * @LastEditors: “chenjinwei” “507725948@qq.com”
 * @LastEditTime: 2023-09-25 10:00:02
 * @FilePath: \vue2-basic-version\src\views\UploadFile.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
	<div>
		<input type="file" id="fileInput" @change="change" />
		<img alt="" id="uploadImg" :src="imgUrl" style="width: 100px; height: 100px" />
		<div id="uploadText"></div>
		<el-button v-show="blobs != ''" @click.stop="download(blobs, '附件.png')">
			下载文件
		</el-button>
	</div>
</template>

<script>
import { download,compressImage } from '@/utils/common/upload_file';
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
					this.dealImg(file);
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
				console.log(file1, '压缩后的文件');
			});
		}
	}
};
</script>
