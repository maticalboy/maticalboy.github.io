<template>
    <div class="container">
        <span class="text">{{content}}</span>
    </div>
</template>
<script>
export default {
    props:{
        content:{
            type:String,
            default:'Duyi'
        }
    }
}
</script>
<style lang="less" scoped>
.container {
    width: 100%;
    height: 100%;
    margin-top: 50px;
    text-align: center;
    background-color: #fff;
    filter: contrast(30);
    .text {
        font-size: 100px;
        color: #000;
        letter-spacing: -50px;
        animation: showup 3s forwards;
    }

}
</style>
