<template>
    <div>
        <!-- 网站信息 -->
        <div class="card-content1 shadow-box background-opacity">
            <el-avatar
                style="margin-top: 20px"
                class="user-avatar"
                :size="120"
                :src="webInfo.avatar"
            ></el-avatar>
            <div class="web-name">{{ 6666 }}</div>
            <div class="web-info">
                <div class="blog-info-box">
                    <span>文章</span>
                    <span class="blog-info-num">{{ 999 }}</span>
                </div>
                <div class="blog-info-box">
                    <span>分类</span>
                    <span class="blog-info-num">{{ 888 }}</span>
                </div>
                <div class="blog-info-box">
                    <span>访问量</span>
                    <span class="blog-info-num">{{ 9999 }}</span>
                </div>
            </div>
            <a class="collection-btn">
                <i class="el-icon-star-off" style="margin-right: 2px"></i>朋友圈
            </a>
        </div>

        <!-- 搜索 -->
        <div
            style="
                padding: 15px;
                border-radius: 10px;
                margin-top: 30px;
                animation: hideToShow 1s ease-in-out;
            "
            class="search shadow-box background-opacity wow"
        >
            <div
                style="
                    color: var(--lightGreen);
                    font-size: 20px;
                    font-weight: bold;
                    margin-bottom: 10px;
                "
            >
                搜索
            </div>
            <div style="display: flex">
                <input
                    class="ais-SearchBox-input"
                    type="text"
                    v-model="articleSearch"
                    placeholder="搜索文章"
                    maxlength="32"
                />
                <div class="ais-SearchBox-submit" @click="selectArticle()">
                    <svg
                        style="margin-top: 3.5px; margin-left: 18px"
                        viewBox="0 0 1024 1024"
                        width="20"
                        height="20"
                    >
                        <path
                            d="M51.2 508.8c0 256.8 208 464.8 464.8 464.8s464.8-208 464.8-464.8-208-464.8-464.8-464.8-464.8 208-464.8 464.8z"
                            fill="#51C492"
                        ></path>
                        <path
                            d="M772.8 718.4c48-58.4 76.8-132.8 76.8-213.6 0-186.4-151.2-337.6-337.6-337.6-186.4 0-337.6 151.2-337.6 337.6 0 186.4 151.2 337.6 337.6 337.6 81.6 0 156-28.8 213.6-76.8L856 896l47.2-47.2-130.4-130.4zM512 776c-149.6 0-270.4-121.6-270.4-271.2S363.2 233.6 512 233.6c149.6 0 271.2 121.6 271.2 271.2C782.4 654.4 660.8 776 512 776z"
                            fill="#FFFFFF"
                        ></path>
                    </svg>
                </div>
            </div>
        </div>

        <!-- 推荐文章 -->
        <div
            style="
                padding: 25px;
                border-radius: 10px;
                margin-top: 30px;
                animation: hideToShow 1s ease-in-out;
            "
            class="card-content2 shadow-box background-opacity wow"
        >
            <div class="card-content2-title">
                <i class="el-icon-reading card-content2-icon"></i>
                <span>推荐文章</span>
            </div>
            <div
                v-for="(article, index) in recommendArticles"
                :key="index"
                @click="
                    $router.push({
                        path: '/article',
                        query: { id: article.id },
                    })
                "
            >
                <div class="aside-post-detail">
                    <div class="aside-post-image">
                        <el-image
                            class="my-el-image"
                            :src="article.articleCover"
                            fit="cover"
                        >
                            <div slot="error" class="image-slot">
                                <div class="error-aside-image">
                                    {{ article.username }}
                                </div>
                            </div>
                        </el-image>
                    </div>
                    <div class="aside-post-title">
                        {{ article.articleTitle }}
                    </div>
                </div>
                <div class="aside-post-date">
                    <i class="el-icon-date" style="color: var(--greyFont)"></i
                    >{{ article.createTime }}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "AsidePost",
    props: {
        webInfo: {
            type: Object,
            default: () => {
                return {
                    avatar: require("@/assets/logo.png"),
                };
            },
        },
        articleSearch:{
            type:'',
            default:'',
        },
        recommendArticles: {
            type: Array,
            default: () => {
                return [
                    {
                        articleCover:
                            "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
                        username: "ce",
                        articleTitle: "777",
                        createTime: "2022-03-21",
                    },
                    {
                        articleCover:
                            "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
                        username: "ce",
                        articleTitle: "777",
                        createTime: "2022-03-21",
                    },
                    {
                        articleCover:
                            "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
                        username: "ce",
                        articleTitle: "777",
                        createTime: "2022-03-21",
                    },
                ];
            },
        },
    },
};
</script>
<style lang="less" scoped>
.card-content1 {
    background: linear-gradient(
        -45deg,
        #e8d8b9,
        #eccec5,
        #a3e9eb,
        #bdbdf0,
        #eec1ea
    );
    background-size: 400% 400%;
    animation: gradientBG 10s ease infinite;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
    position: relative;
    overflow: hidden;
    .user-avatar {
        cursor: pointer;
        transition: all 0.3s;
        user-select: none;
    }
    .user-avatar:hover {
        transform: rotate(360deg);
    }
    .web-name {
        font-size: 30px;
        font-weight: bold;
        margin: 20px 0;
    }
    .web-info {
        width: 80%;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        .blog-info-box {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;
            .blog-info-num {
                margin-top: 12px;
            }
        }
    }
    &:not(:first-child) {
        z-index: 10;
    }
    .collection-btn {
        position: relative;
        margin-top: 12px;
        background: var(--lightGreen);
        cursor: pointer;
        width: 65%;
        height: 35px;
        border-radius: 1rem;
        text-align: center;
        line-height: 35px;
        color: var(--white);
        overflow: hidden;
        z-index: 1;
        margin-bottom: 25px;
        &::before {
            background: var(--gradualRed);
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            content: "";
            transform: scaleX(0);
            transform-origin: 0;
            transition: transform 0.5s ease-out;
            transition-timing-function: cubic-bezier(0.45, 1.64, 0.47, 0.66);
            border-radius: 1rem;
            z-index: -1;
        }

        &:hover::before {
            transform: scaleX(1);
        }
    }
}

.card-content2 {
    .card-content2-title {
        font-size: 18px;
        margin-bottom: 20px;
    }

    .card-content2-icon {
        color: var(--red);
        margin-right: 5px;
        animation: scale 1s ease-in-out infinite;
    }

    .aside-post-detail {
        display: flex;
        cursor: pointer;
    }

    .aside-post-image {
        width: 40%;
        border-radius: 0.2rem;
        margin-right: 8px;
        overflow: hidden;
    }

    .error-aside-image {
        background: var(--themeBackground);
        color: var(--white);
        padding: 10px;
        text-align: center;
        width: 100%;
        height: 100%;
    }

    .aside-post-title {
        width: 60%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    .aside-post-date {
        margin-bottom: 20px;
        color: var(--greyFont);
        font-size: 12px;
    }
}

.search {
    .ais-SearchBox-input {
        padding: 0 14px;
        height: 30px;
        width: calc(100% - 50px);
        outline: 0;
        border: 2px solid var(--lightGreen);
        border-right: 0;
        border-radius: 40px 0 0 40px;
        color: var(--maxGreyFont);
        background: var(--white);
    }

    .ais-SearchBox-submit {
        height: 30px;
        width: 50px;
        border: 2px solid var(--lightGreen);
        border-left: 0;
        border-radius: 0 40px 40px 0;
        background: var(--white);
        cursor: pointer;
    }
}
</style>
