<!--
 * @Author: “chenjinwei” “507725948@qq.com”
 * @Date: 2023-11-30 10:30:33
 * @LastEditors: “chenjinwei” “507725948@qq.com”
 * @LastEditTime: 2023-12-02 14:09:18
 * @FilePath: \openlayers-demo\src\views\Process\Process.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
	<div>
		<div class="circle">
			<svg id="progress-circle" width="300" height="300">
				<circle r="140" cx="150" cy="150" stroke-width="21" fill="transparent" />
			</svg>
			<div class="circle-mask">
				<div class="process-value">{{ progress1 }}%</div>
			</div>
		</div>
		<div class="box">
			<div class="inverted">
				<div class="inverted-item">888w/12</div>
				<div class="inverted-item">{{ progress1 }}%</div>
			</div>
		</div>
		<transition>
			<div class="loading-container">
				<div class="loading-text">{{ text }}</div>
				<div class="loading-wrapper">
					<div class="loading-progress">
						<div
							class="loading-progress-content"
							:style="{ width: progress1 + '%' }"></div>
						<!-- 叶子区域 -->
					</div>
					<div class="loading-fan fan-container">
						<img
							class="fan"
							:class="{ 'fan-close': progress1 === 100 }"
							src="@/assets/images/vue2/process/fengshan.png"
							alt="风扇" />
						<img
							class="max"
							v-if="progress1 === 100"
							src="@/assets/images/vue2/process/fengshan.png"
							alt="100%" />
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>
<script>
export default {
	name: 'Process',
	data() {
		return {
			// 周长
			circumference: 0,
			// 操作的圆
			circle: null,
			// 当前的进度
			progress1: 0,
			// 定时器
			leafIntervalArr: [],
			text: 'loading...'
		};
	},
	mounted() {
		this.circle = document.querySelector('#progress-circle circle');
		const radius = this.circle.r.baseVal.value;
		this.circumference = radius * 2 * Math.PI;
		this.interval = setInterval(() => {
			this.progress1 = (this.progress1 + 10) % 101;
			//设置初始进度
			this.upDateProcess(this.progress1);
			this.modifyProg(this.progress1);
		}, 1000);
		this.randomLeaf();
	},
	beforeDestroy() {
		clearInterval(this.interval);
		for (let i = 0; i < this.leafIntervalArr.length; i++) {
			clearInterval(this.leafIntervalArr[i]);
		}
	},
	methods: {
		upDateProcess(prog) {
			let percent = 100 - prog;
			let progress = this.circumference - (percent / 100) * this.circumference;
			this.circle.style.strokeDashoffset = -progress;
		},
		modifyProg(prog) {
			let val = 100 - prog;
			document.getElementsByClassName('box')[0].style.setProperty('--d', val + '%');
		},
		randomLeaf() {
			this.leafIntervalArr = new Array(5);
			for (let i = 0; i < 5; i++) {
				let leaf = document.createElement('img');
				leaf.className = 'leaf';
				leaf.src = require('@/assets/images/vue2/process/leaf.png');
				leaf.alt = '叶子';
				console.log(document.querySelector('.loading-progress'));
				document.querySelector('.loading-progress').appendChild(leaf);
				let activeLeaf = document.querySelectorAll('.leaf')[i];
				let x = Math.random() * 100 + 250;
				let y = Math.random() * 30;
				activeLeaf.style.left = x + 'px'; //初始坐标x
				activeLeaf.style.top = y + 'px'; //初始坐标y
				// 随机时间 1~5s
				this.leafIntervalArr[i] = setInterval(() => {
					x = x - Math.random() * 25; //运动速度
					y = y + Math.random() * 25 - 10;
					if (x < 0) {
						x = Math.random() * 50 + 250;
						y = Math.random() * 30;
					}
					activeLeaf.style.left = x + 'px';
					activeLeaf.style.top = y + 'px';
					activeLeaf.style.transform = 'rotate(' + Math.random() * 60 + 'deg)';
				}, Math.random() * 50 + 80);
			}
		}
	},
	watch: {
		progress1(val) {
			this.text = 'loading...' + this.progress1 + '%';
			if (val == 100) {
				for (let i = 0; i < this.leafIntervalArr.length; i++) {
					clearInterval(this.leafIntervalArr[i]);
				}
				clearInterval(this.interval);
				this.text = 'success!' + this.progress1 + '%';
			}
		}
	}
};
</script>
<style lang="scss" scoped>
.circle {
	width: 300px;
	height: 300px;
	background: conic-gradient(
		#179067,
		#62e317,
		#d7f10f,
		#ffc403,
		#fcc202,
		#ff7327,
		#ff7327,
		#ff5800,
		#ff5900,
		#f64302,
		#ff0000,
		#ff0000
	);
	border-radius: 50%;
	position: relative;
	#progress-circle circle {
		stroke-dasharray: 880;
		stroke: #f2f2f2;
	}

	#progress-circle {
		transform: rotate(-90deg);
	}

	.circle-mask {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 2;
		width: 260px;
		height: 260px;
		background: #fff;
		border-radius: 50%;
		.process-value {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
	}
}

.box {
	background: #ebebeb;
	width: 300px;
	border-radius: 24px;
	overflow: hidden;
	--d: 20%;
	.inverted {
		padding: 0 8px;
		display: flex;
		justify-content: space-between;
		background: linear-gradient(-90deg, #000 var(--d), #fff 0) no-repeat,
			linear-gradient(-90deg, #0000 var(--d), rgb(192, 23, 23) 0) no-repeat;
		-webkit-background-clip: text, padding-box;
		background-clip: text, padding-box;
		color: #0000;
		font-weight: bold;
		cursor: pointer;
	}
}
.loading-container {
	width: 300px;
	height: 300px;
	background-color: #e3b12fd0;
	display: flex;
	justify-content: center;
	align-content: center;
	align-items: center;
	flex-wrap: wrap;
	position: fixed;
	top: 0;
	right: 0;
	.loading-text {
		width: 100%;
		text-align: center;
		font-size: 20px;
		font-weight: bold;
		color: rgb(255, 168, 0);
		margin-bottom: 20px;
	}

	.loading-wrapper {
		width: 300px;
		height: 48px;
		background-color: #eed385d2;
		border-radius: 24px;
		position: relative;
		z-index: 9;
	}

	.loading-progress {
		width: 260px;
		height: 36px;
		background-color: #eed385d2;
		border-top-left-radius: 16px;
		border-bottom-left-radius: 16px;
		margin: 6px 0 6px 6px;
		overflow: hidden;
		position: absolute;
		top: 0;
		left: 0;
	}

	.loading-progress-content {
		width: 0;
		height: 36px;
		background-color: rgb(255, 168, 0);
		transition: all 0.5s;
		position: relative;
		z-index: 9;
	}

	.loading-fan {
		width: 48px;
		height: 48px;
		border-radius: 50%;
		background-color: rgb(251, 205, 81);
		border: 3px solid rgba(255, 255, 255, 0.6);
		box-sizing: border-box;
		position: absolute;
		top: 0;
		right: 0;
		z-index: 9;
	}

	.fan {
		width: 36px;
		height: 36px;
		position: absolute;
		top: 3px;
		left: 4px;
		animation: spin 2s infinite linear;
	}

	.fan-close {
		animation: fanClose 1.3s 1 linear;
		animation-fill-mode: forwards;
	}

	.max {
		width: 36px;
		height: 36px;
		position: absolute;
		top: 3px;
		left: 3px;
		animation: maxFont 1.3s 1 linear;
		animation-fill-mode: forwards;
	}
}
/deep/ .leaf {
	width: 15px;
	height: 15px;
	position: absolute;
	top: 0;
	left: 260px;
	transition: all 0.01s;
}
@keyframes spin {
	from {
		transform: rotate(360deg);
	}
	to {
		transform: rotate(0deg);
	}
}

@keyframes fanClose {
	from {
		transform: rotate(360deg) scale(1);
	}
	to {
		transform: rotate(0deg) scale(0);
	}
}

@keyframes maxFont {
	from {
		transform: scale(0);
	}
	to {
		transform: scale(1);
	}
}
</style>
