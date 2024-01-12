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
            <div class="web-name">{{ webInfo.name }}</div>
            <div class="web-info">
                <div class="blog-info-box">
                    <span>文章</span>
                    <span class="blog-info-num">{{ webInfo.articleNum }}</span>
                </div>
                <div class="blog-info-box">
                    <span>分类</span>
                    <span class="blog-info-num">{{
                        webInfo.classification
                    }}</span>
                </div>
                <div class="blog-info-box">
                    <span>访问量</span>
                    <span class="blog-info-num">{{ 9999 }}</span>
                </div>
            </div>
            <a
                class="collection-btn"
                href="https://github.com/maticalboy"
                target="_blank"
            >
                <i class="el-icon-github" style="margin-right: 2px"></i>github
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
import { throttle } from "@/utils/common/debounce_throttle";
export default {
    name: "AsidePost",
    props: {
        webInfo: {
            type: Object,
            default: () => {
                return {
                    avatar: require("@/assets/images/home/avatar.jpg"),
                    name: "陈饱饱",
                    articleNum: 0,
                    classification: 0,
                };
            },
        },
        articleSearch: {
            type: "",
            default: "",
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
    methods: {
        selectArticle: throttle(function () {
            this.$message("当前搜索不可用");
        }, 3000),
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
    border-radius: .625rem;
    position: relative;
    overflow: hidden;
    .user-avatar {
        cursor: pointer;
        transition: all 0.3s;
        user-select: none;
    }
    .user-avatar:hover {
        transform: rotate(666turn);
        transition-delay: 1s;
        transition-property: all;
        transition-duration: 59s;
        transition-timing-function: cubic-bezier(0.34, 0, 0.84, 1);
    }
    .web-name {
        font-size: 1.875rem;
        font-weight: bold;
        margin: 1.25rem 0;
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
                margin-top: .75rem;
            }
        }
    }
    &:not(:first-child) {
        z-index: 10;
    }
    .collection-btn {
        position: relative;
        margin-top: .75rem;
        background: var(--lightGreen);
        cursor: pointer;
        width: 65%;
        height: 2.1875rem;
        border-radius: 16px;
        text-align: center;
        line-height: 2.1875rem;
        text-decoration: none;
        color: var(--white);
        overflow: hidden;
        z-index: 1;
        margin-bottom: 1.5625rem;
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
            border-radius: 16px;
            z-index: -1;
        }

        &:hover::before {
            transform: scaleX(1);
        }
    }
}

.card-content2 {
    .card-content2-title {
        font-size: 1.125rem;
        margin-bottom: 1.25rem;
    }

    .card-content2-icon {
        color: var(--red);
        margin-right: .3125rem;
        animation: scale 1s ease-in-out infinite;
    }

    .aside-post-detail {
        display: flex;
        cursor: pointer;
    }

    .aside-post-image {
        width: 40%;
        border-radius: 3.2px;
        margin-right: .5rem;
        overflow: hidden;
    }

    .error-aside-image {
        background: var(--themeBackground);
        color: var(--white);
        padding: .625rem;
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
        margin-bottom: 1.25rem;
        color: var(--greyFont);
        font-size: .75rem;
    }
}

.search {
    .ais-SearchBox-input {
        padding: 0 .875rem;
        height: 1.875rem;
        width: calc(100% - 3.125rem);
        outline: 0;
        border: .125rem solid var(--lightGreen);
        border-right: 0;
        border-radius: 2.5rem 0 0 2.5rem;
        color: var(--maxGreyFont);
        background: var(--white);
    }

    .ais-SearchBox-submit {
        height: 1.875rem;
        width: 3.125rem;
        border: .125rem solid var(--lightGreen);
        border-left: 0;
        border-radius: 0 2.5rem 2.5rem 0;
        background: var(--white);
        cursor: pointer;
    }
}
</style>
