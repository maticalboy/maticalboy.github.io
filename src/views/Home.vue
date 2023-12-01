<template>
	<div ref="centerBg" class="centerBg">
		<!-- mask -->
		<div v-if="len" class="mask">
			<div class="grid" :style="{ gridTemplateColumns: `repeat(${col}, 1fr)` }">
				<div
					v-for="index in row * col"
					:key="index"
					class="col"
					:style="
						getCellStyle(Math.floor((index - 1) / col) + 1, ((index - 1) % col) + 1)
					" />
			</div>
		</div>
		<!-- title -->
		<div class="title" title="HI,CHEN">HI,CHEN</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			centerBg: null,
			row: 0,
			col: 0,
			len: 0
		};
	},
    mounted(){
        this.initGrid()
        this.bgLoad()
    },
	methods: {
		// 定义网格样式
		getCellStyle(rowIndex, colIndex) {
			return {
				width: `${this.len}px`,
				transition: `opacity ${100 + Math.random() * 500}ms ${
					((colIndex + rowIndex / 2) / 20) * Math.random() * 500
				}ms`
			};
		},
		// 初始化网格
		initGrid() {
			const imageWidth = window.innerWidth;
			const imageHeight = window.innerHeight;
			const maxGridCount =
				window.innerWidth > 1920
					? 1000
					: window.innerWidth > 1080
					? 600
					: window.innerWidth > 640
					? 400
					: 100;
			this.len = Math.min(imageWidth, imageHeight) / Math.sqrt(maxGridCount);
			this.col = Math.ceil(imageWidth / this.len);
			this.row = Math.ceil(imageHeight / this.len);
		},
		// 图片加载完成后
		bgLoad() {
			const urlMatch = 'http://pic.616pic.com/bg_w1180/00/03/57/voXsmWh7He.jpg!/fw/1120'
			const image = new Image();
			image.src = urlMatch;
			image.onload = () => {
				setTimeout(() => {
					this.$refs.centerBg.style.setProperty('--o', 0);
					setTimeout(() => {
						this.len = 0;
					}, 2000);
				}, 800);
			};
		}
	}
};
</script>

<style lang="scss" scoped>
* {
	margin: 0;
	padding: 0;
}

.centerBg {
	--o: 1;
	--img: url('http://pic.616pic.com/bg_w1180/00/03/57/voXsmWh7He.jpg!/fw/1120');

	background: var(--img) center center/cover;
	height: 100vh;
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	overflow: hidden;

	/* css原生嵌套语法 */
	& .grid {
		display: grid;
	}

	& .col {
		background: white;
		opacity: var(--o);
		aspect-ratio: 1 / 1;
	}
}

.mask {
	position: absolute;
	inset: 0;
}

.title {
	filter: blur(10px);
	letter-spacing: -3rem;
	color: white;
	font-size: 3.75rem;
	font-weight: 800;
	line-height: 1;
	-webkit-text-stroke: 1px black;
	animation: glitch 1s 0.5s linear infinite, expand 1s forwards;
}

.title:before,
.title:after {
	content: attr(title);
	position: absolute;
	left: 0;
}

.title:before {
	animation: glitchTop 1s 0.5s linear infinite;
	clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%);
}

.title:after {
	animation: glitchBotom 1.5s 0.5s linear infinite;
	clip-path: polygon(0 67%, 100% 67%, 100% 100%, 0 100%);
}

@keyframes expand {
	to {
		letter-spacing: 0.4rem;
		filter: blur(0px);
	}
}

@keyframes glitch {
	2%,
	64% {
		transform: translate(2px, 0) skew(0deg);
	}

	4%,
	60% {
		transform: translate(-2px, 0) skew(0deg);
	}

	62% {
		transform: translate(0, 0) skew(5deg);
	}
}

@keyframes glitchTop {
	2%,
	64% {
		transform: translate(2px, -2px);
	}

	4%,
	60% {
		transform: translate(-2px, 2px);
	}

	62% {
		transform: translate(13px, -1px) skew(-13deg);
	}
}

@keyframes glitchBotom {
	2%,
	64% {
		transform: translate(-2px, 0);
	}

	4%,
	60% {
		transform: translate(-2px, 0);
	}

	62% {
		transform: translate(-22px, 5px) skew(21deg);
	}
}
</style>
