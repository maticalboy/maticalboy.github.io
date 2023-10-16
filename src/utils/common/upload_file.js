/**
 * @description: 读取文本内容
 * @param {*} file
 * @return {*}
 */
export const readFile = (file) => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = (event) => {
			resolve(event.target.result);
		};
		reader.onerror = (event) => {
			reject(error);
		};
		reader.readAsText(file); // 使用readAsText方法读取文件内容
	});
};
/**
 * @description: file转base64
 * @param {*} file
 * @return {*}
 */
export const fileToBase64 = (file) => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => {
			resolve(reader.result);
		};
		reader.onerror = (error) => {
			reject(error);
		};
		reader.readAsDataURL(file);
	});
};
/**
 * @description: base64转blob （这个图片太大，应该压缩）
 * @param {*} base64
 * @return {*}
 */
export const base64toBlob = (base64) => {
	let arr = base64.split(','),
		mime = arr[0].match(/:(.*?);/)[1],
		bstr = atob(arr[1]),
		n = bstr.length,
		u8arr = new Uint8Array(n);
	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}
	return new Blob([u8arr], { type: mime });
};

/**
 * @description:文件压缩转blob
 * @param {*} file
 * @param {*} maxWidth
 * @param {*} maxHeight
 * @param {*} quality
 * @return {*}
 */
export const compressImage = (
	file,
	maxWidth = '200',
	maxHeight = '200',
	quality = 0.8,
	width = '200',
	height = '200'
) => {
	return new Promise((resolve, reject) => {
		fileToBase64(file)
			.then((base64) => {
				// 初始化图片
				let img = new Image();
				img.src = base64;
				img.onload = function () {
					if (width > maxWidth || height > maxHeight) {
						const ratio = Math.max(width / maxWidth, height / maxHeight);
						width /= ratio;
						height /= ratio;
					}
					// 以下是压缩过程（创建画布 绘制canvas 压缩）
					const canvas = document.createElement('canvas');
					canvas.width = width;
					canvas.height = height;

					const ctx = canvas.getContext('2d');
					ctx.drawImage(img, 0, 0, width, height);

					canvas.toBlob(
						function (blob) {
							resolve(blob);
						},
						'image/jpeg',
						quality
					);
				};
			})
			.catch((error) => {
				reject(error);
			});
	});
};
/**
 * @description: 下载文件
 * @param {*} file
 * @param {*} fileType
 * @param {*} fileName
 * @return {*}
 */
export const download = (blob, fileName) => {
	const downloadElement = document.createElement('a');
	const href = window.URL.createObjectURL(blob); // 创建下载的链接
	downloadElement.href = href;
	downloadElement.download = fileName; // 下载后文件名
	document.body.appendChild(downloadElement);
	downloadElement.click(); // 点击下载
	document.body.removeChild(downloadElement); // 下载完成移除元素
	window.URL.revokeObjectURL(href); // 释放掉blob对象
};
/**
 * @description: blob转base64 （实用性不大）
 * @param {*} blob
 * @param {*} contentType
 * @return {*}
 */
export const blobToDataURL = (blob, contentType) => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => {
			resolve(reader.result);
		};
		reader.onerror = (error) => {
			reject(error);
		};
		reader.readAsDataURL(blob, contentType);
	});
};
