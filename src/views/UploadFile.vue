<!--
 * @Author: “chenjinwei” “507725948@qq.com”
 * @Date: 2023-09-23 15:29:47
 * @LastEditors: “chenjinwei” “507725948@qq.com”
 * @LastEditTime: 2023-09-25 09:30:56
 * @FilePath: \vue2-basic-version\src\views\UploadFile.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
	<div>
        <upload-file></upload-file>
    </div>
</template>

<script>
import UploadFile from '@/components/Upload/index';
export default {
	name: 'UploadFile1',
	components: {
		UploadFile,
	},
	data() {
		return {
			imgUrl: '',
			text: '',
			blobs: ''
		};
	},
};
</script>
