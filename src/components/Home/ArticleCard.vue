<template>
    <div class="articleCard shadow-box">
        <!-- 封面 -->
        <div class="article-image">
            <el-image class="my-el-image" v-once lazy :src="''" fit="cover">
                <div
                    slot="error"
                    class="image-slot myCenter"
                    style="background-color: var(--lightGreen)"
                >
                    <div class="error-text">
                        <div>遇事不决，可问春风</div>
                    </div>
                </div>
            </el-image>
        </div>
        <div class="article-content">
            <!-- 时间 -->
            <div class="article-time">
                <svg
                    viewBox="0 0 1024 1024"
                    width="14"
                    height="14"
                    style="vertical-align: -2px"
                >
                    <path
                        d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z"
                        fill="#409EFF"
                    ></path>
                    <path
                        d="M654.222222 256c-17.066667 0-28.444444 11.377778-28.444444 28.444444v56.888889c0 17.066667 11.377778 28.444444 28.444444 28.444445s28.444444-11.377778 28.444445-28.444445v-56.888889c0-17.066667-11.377778-28.444444-28.444445-28.444444zM369.777778 256c-17.066667 0-28.444444 11.377778-28.444445 28.444444v56.888889c0 17.066667 11.377778 28.444444 28.444445 28.444445s28.444444-11.377778 28.444444-28.444445v-56.888889c0-17.066667-11.377778-28.444444-28.444444-28.444444z"
                        fill="#FFFFFF"
                    ></path>
                    <path
                        d="M725.333333 312.888889H711.111111v28.444444c0 31.288889-25.6 56.888889-56.888889 56.888889s-56.888889-25.6-56.888889-56.888889v-28.444444h-170.666666v28.444444c0 31.288889-25.6 56.888889-56.888889 56.888889s-56.888889-25.6-56.888889-56.888889v-28.444444h-14.222222c-22.755556 0-42.666667 19.911111-42.666667 42.666667v341.333333c0 22.755556 19.911111 42.666667 42.666667 42.666667h426.666666c22.755556 0 42.666667-19.911111 42.666667-42.666667v-341.333333c0-22.755556-19.911111-42.666667-42.666667-42.666667zM426.666667 654.222222h-56.888889c-17.066667 0-28.444444-11.377778-28.444445-28.444444s11.377778-28.444444 28.444445-28.444445h56.888889c17.066667 0 28.444444 11.377778 28.444444 28.444445s-11.377778 28.444444-28.444444 28.444444z m227.555555 0h-56.888889c-17.066667 0-28.444444-11.377778-28.444444-28.444444s11.377778-28.444444 28.444444-28.444445h56.888889c17.066667 0 28.444444 11.377778 28.444445 28.444445s-11.377778 28.444444-28.444445 28.444444z m0-113.777778h-56.888889c-17.066667 0-28.444444-11.377778-28.444444-28.444444s11.377778-28.444444 28.444444-28.444444h56.888889c17.066667 0 28.444444 11.377778 28.444445 28.444444s-11.377778 28.444444-28.444445 28.444444z"
                        fill="#FFFFFF"
                    ></path>
                </svg>
                发布于 {{ article.createTime }}
            </div>
            <!-- 内容 -->
            <div class="article-desc">
                {{ article.articleContent }}
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        article: {
            type: Object,
            default: () => {
                return {
                    createTime: "2024-1-12",
                    articleContent: "文章内容",
                    articleId: "文章ID",
                };
            },
        },
    },
};
</script>
<style lang="less" scoped>
.articleCard {
    width: 300px;
    height: 400px;
    margin: 10px;
    .article-image {
        height: 50%;
    }
    .article-content {
        border-radius: 0.625rem;
        position: relative;
        overflow: hidden;
        .article-time{
            margin-bottom: 10px;
        }
        .article-desc {
            font-size: 13px;
            line-height: 1.4;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }
    }
}
</style>
