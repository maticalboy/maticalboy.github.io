<template>
    <div class="containor">
        <!-- el过渡动画 -->
        <transition name="el-fade-in-linear">
            <!-- 导航栏 -->
            <div class="toolbar-content myBetween">
                <!-- 网站名称 -->
                <div class="toolbar-title">
                    <h2 @click="$router.push({ path: '/' })">
                        {{ "Admin" }}
                    </h2>
                </div>
                <!-- 导航栏 -->
                <ul class="page-title">
                    <li
                        v-for="(item, index) in menu"
                        :key="index"
                        @click="travel(item)"
                    >
                        {{ item.name }}
                    </li>
                </ul>
            </div>
        </transition>
        <!-- 背景 -->
        <div ref="centerBg" class="centerBg">
            <div v-if="len" class="mask">
                <div
                    class="grid"
                    :style="{ gridTemplateColumns: `repeat(${col}, 1fr)` }"
                >
                    <div
                        v-for="index in row * col"
                        :key="index"
                        class="col"
                        :style="
                            getCellStyle(
                                Math.floor((index - 1) / col) + 1,
                                ((index - 1) % col) + 1
                            )
                        "
                    />
                </div>
            </div>
            <!-- 中间的文字 -->
            <div class="signature-wall myCenter my-animation-hideToShow">
                <h1 class="playful">
                    <div class="title" title="HI,CHEN" @click="refreshBg">
                        HI,CHEN
                    </div>
                </h1>
                <div class="printer">
                    <Printer :printerInfo="printerInfo">
                        <template slot="paper" slot-scope="scope">
                            <h3>
                                {{ scope.content }}
                                <span class="cursor">|</span>
                            </h3>
                        </template>
                    </Printer>
                </div>
                <div id="bannerWave1"></div>
                <div id="bannerWave2"></div>
                <i
                    class="el-icon-arrow-down"
                    @click="navigation('.page-container-wrap')"
                ></i>
            </div>
        </div>
        <!-- 首页内容 -->
        <div class="page-container-wrap">
            <div class="page-container">
                <div v-for="i in 40" :key="i">
                    {{ "我还没想好写什么" }}
                </div>
            </div>
        </div>
        <!-- 页脚 -->
        <!-- <div style="background: 'black'">
            <myFooter></myFooter>
        </div> -->
    </div>
</template>

<script>
import HomeQuest from "@/request/api/home.js";
export default {
    components: {
        Printer: () => import("@/components/common/printer"),
    },
    data() {
        return {
            centerBg: null,
            row: 0,
            col: 0,
            len: 0,
            // 控制mask遮罩的显示 1是全白遮罩
            opicty: 1,
            printerInfo: "你看对面的青山多漂亮",
            menu: [
                { name: "首页", url: "/home" },
                { name: "three", url: "/three" },
                { name: "openlayers", url: "/openlayers" },
                { name: "vue2", url: "/vue2" },
            ],
        };
    },
    mounted() {
        this.initGrid();
        this.bgLoad();
        // 初始化文字内容
        this.initPrintInfo();
        // 滚动隐藏头部导航拦
        window.addEventListener("scroll", () => {
            let header = document.getElementsByClassName("toolbar-content")[0];
            header.classList.toggle("sticky", window.scrollY > 60);
        });
    },
    methods: {
        async initPrintInfo() {
            let info = await HomeQuest.getLover();
            this.printerInfo = info.content;
        },
        // 定义网格样式
        getCellStyle(rowIndex, colIndex) {
            return {
                width: `${this.len}px`,
                transition: `opacity ${100 + Math.random() * 500}ms ${
                    ((colIndex + rowIndex / 2) / 20) * Math.random() * 500
                }ms`,
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
            this.len =
                Math.min(imageWidth, imageHeight) / Math.sqrt(maxGridCount);
            this.col = Math.ceil(imageWidth / this.len);
            this.row = Math.ceil(imageHeight / this.len);
        },
        // 图片加载完成后
        bgLoad() {
            const urlMatch =
                "http://pic.616pic.com/bg_w1180/00/03/57/voXsmWh7He.jpg!/fw/1120";
            const image = new Image();
            image.src = urlMatch;
            let centerBg = this.$refs.centerBg;
            image.onload = () => {
                setTimeout(() => {
                    this.opicty = +!this.opicty;
                    centerBg.style.setProperty("--o", this.opicty);
                }, 800);
            };
        },
        refreshBg() {
            this.opicty = +!this.opicty;
            this.$refs.centerBg.style.setProperty("--o", this.opicty);
            // 现在是空白 应该在变化一次变为透明
            if (this.opicty == 1) {
                setTimeout(() => {
                    this.opicty = +!this.opicty;
                    this.$refs.centerBg.style.setProperty("--o", this.opicty);
                }, 1200);
            }
        },
        navigation(selector) {
            let pageId = document.querySelector(selector);
            window.scrollTo({
                top: pageId.offsetTop,
                behavior: "smooth",
            });
            // 禁止滚动
            // document.body.style.overflow = "hidden";
        },
        travel(item) {
            this.$router.push(item.url);
        },
    },
};
</script>

<style lang="scss" scoped>
* {
    margin: 0;
    padding: 0;
}



// 整体
.containor{
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
}
// 头部导航
.toolbar-content {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 60px;
    box-sizing: border-box;
    color: white;
    z-index: 100;
    transition: all 0.5s ease-in-out;
     position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    box-shadow: 0 1px 3px 0 rgba(0, 34, 77, 0.05);
    padding: 0 20px;
    overflow: hidden;
    .page-title {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        list-style: none;
        flex: 1;
        li {
            height: 50px;
            line-height: 50px;
            cursor: pointer;
        }
    }
}
.sticky {
    /* 粘性布局位置，不随滚动条滚动 */
    position: fixed;
    top: 0;
    left: 0;
    opacity: 0;
    overflow: hidden;
}
// 主页内容
.page-container-wrap {
    position: relative;
    z-index: 1;
    overflow-x: hidden;
}
// 主页开屏
.centerBg {
    --o: 1;
    --img: url("http://pic.616pic.com/bg_w1180/00/03/57/voXsmWh7He.jpg!/fw/1120");
    background: var(--img) center center/cover;
    height: 100vh;
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
        cursor: pointer;
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
}
// 中间的文字
.signature-wall {
    /* 向下排列 */
    display: flex;
    flex-direction: column;
    position: relative;
    user-select: none;
    height: 100vh;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    width: 100%;
    .playful {
        color: white;
        font-size: 40px;
    }
    .printer {
        cursor: pointer;
        color: white;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 10px;
        padding-left: 10px;
        padding-right: 10px;
        padding-top: 10px;
        padding-bottom: 10px;
    }

    #bannerWave1 {
        height: 84px;
        background: url(@/assets/images/home/bannerwave1.png) repeat-x;
        position: absolute;
        width: 200%;
        bottom: 0;
        z-index: 10;
        animation: gradientBG 120s linear infinite;
    }

    #bannerWave2 {
        height: 100px;
        background: url(@/assets/images/home/bannerwave1.png) repeat-x;
        position: absolute;
        width: 400%;
        bottom: 0;
        z-index: 5;
        animation: gradientBG 120s linear infinite;
    }
    .my-animation-hideToShow {
        animation-name: hideToShow;
    }
    .el-icon-arrow-down {
        font-size: 40px;
        font-weight: bold;
        color: white;
        position: absolute;
        bottom: 60px;
        animation: my-shake 1.5s ease-out infinite;
        z-index: 15;
        cursor: pointer;
    }
    /* 显示 */
    @keyframes hideToShow {
        from {
            opacity: 0;
        }

        to {
            opacity: 1;
        }
    }
    /* 背景位置移动 */
    @keyframes gradientBG {
        0% {
            background-position: 0 50%;
        }

        50% {
            background-position: 100% 50%;
        }

        100% {
            background-position: 0 50%;
        }
    }
    /* 下移 */
    @keyframes my-shake {
        0% {
            opacity: 1;
            transform: translateY(0px);
        }

        30% {
            opacity: 0.5;
            transform: translateY(25px);
        }

        100% {
            opacity: 1;
            transform: translateY(0px);
        }
    }

    .page-container {
        display: flex;
        justify-content: center;
        width: 90%;
        padding: 0 20px 40px 20px;
        margin: 0 auto;
        flex-direction: row;
    }

    .recent-posts {
        width: 70%;
    }

    .announcement {
        padding: 22px;
        border: 1px dashed var(--lightGray);
        color: var(--greyFont);
        border-radius: 10px;
        display: flex;
        max-width: 780px;
        margin: 40px auto 40px;
    }

    .announcement i {
        color: var(--themeBackground);
        font-size: 22px;
        margin: auto 0;
        animation: scale 0.8s ease-in-out infinite;
    }

    .announcement div div {
        margin-left: 20px;
        line-height: 30px;
    }

    .aside-content {
        width: calc(30% - 40px);
        user-select: none;
        margin-top: 40px;
        margin-right: 40px;
        max-width: 300px;
        float: right;
    }

    .pagination-wrap {
        display: flex;
        justify-content: center;
        margin-top: 40px;
    }

    .pagination {
        padding: 13px 15px;
        border: 1px solid var(--lightGray);
        border-radius: 3rem;
        color: var(--greyFont);
        width: 100px;
        user-select: none;
        cursor: pointer;
        text-align: center;
    }

    .pagination:hover {
        border: 1px solid var(--themeBackground);
        color: var(--themeBackground);
        box-shadow: 0 0 5px var(--themeBackground);
    }
}
</style>
