<template>
    <div class="home">
      <mavon-editor :codeStyle="codeStyle" :toolbars="toolbars" v-model="content" :ishljs="true" ref="md" @change="change"/>
      <el-button @click="outputENter">输出</el-button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        content: "这里是markdown编辑的内容",
        page_article:undefined,
        html_content:undefined,
        md_content:undefined,
        toolbars: {
          bold: true, // 粗体
          italic: true, // 斜体
          header: true, // 标题
          underline: true, // 下划线
          strikethrough: true, // 中划线
          mark: true, // 标记
          superscript: true, // 上角标
          subscript: true, // 下角标
          quote: true, // 引用
          ol: true, // 有序列表
          ul: true, // 无序列表
          link: true, // 链接
          imagelink: true, // 图片链接
          code: true, // code
          table: true, // 表格
          fullscreen: true, // 全屏编辑
          readmodel: true, // 沉浸式阅读
          htmlcode: true, // 展示html源码
          help: true, // 帮助
          undo: true, // 上一步
          redo: true, // 下一步
          trash: true, // 清空
          save: true, // 保存（触发events中的save事件）
          navigation: true, // 导航目录
          alignleft: true, // 左对齐
          aligncenter: true, // 居中
          alignright: true, // 右对齐
          subfield: true, // 单双栏模式
          preview: true // 预览
        },
        codeStyle:'monokai-sublime',//主题
        test_html:undefined
      };
    },
    methods:{
      outputENter(){
        // console.log(JSON.stringify(this.content))
        // console.log(this.$refs.md.d_render)
        // console.log(this.$refs.md.d_value)
        console.log(JSON.stringify(this.test_html))   //就用这个存数据库  然后进行回显即可
        this.$axios.post("http://127.0.0.1:3009",{
          params:{
            msg:this.test_html
          }
        }).then((res)=>{
          console.log(res)
          console.log("响应成功")
        })
      },
      change(value, render){
        // render 为 markdown 解析后的结果
        this.test_html = render;
      }
    }
  };
  </script>
  
  