<template>
    <div style="margin: 0 auto">
        <vue-markdown :source="detail"></vue-markdown>
    </div>
</template>
<script>
export default {
    name: "MarkDown",
    components: {
        VueMarkdown: () => import("vue-markdown"),
    },
    data() {
        return {
            id: 50,
            toolId: "tools.Raster.RasterCal",
            name: "栅格计算器",
            description: "我是简介",
            detail: "# 一级标题\n==标记==\n1. ![呕吐](https://p6-passport.byteacctimg.com/img/user-avatar/5156e60a4743d0c6ccefbddaa2c3e79c~90x90.awebp)\n2. 让我随便测试一下\n3.",
            type: "tool",
            children: [],
            parentId: 49,
        };
    },
};
</script>
