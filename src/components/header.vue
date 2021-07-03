<template>
   <div class="header">
       <span class="iconfont icon-fanhui" @click="back"></span>
       <span class="iconfont iconfont icon-shouye" @click="home"></span>
       <span class="title">{{title}}</span>
   </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    props:{
        title:{
            type:String,
            default:''
        }
    },
    methods:{
        back(){
            this.$router.go(-1)
            this.$bus.$emit('alen',555)
        },
        home(){
            this.$router.push('/')
        }
    }
}
</script>

<style lang="scss" scoped>
    .header{
        height: 40px;
        background-color: rgb(5,129,253);
        width: 100%;
        position: fixed;
        top: 0;
        display: flex;
        justify-content: flex-start;
        line-height: 40px;
        z-index: 1200;
        .iconfont{
            margin-left: 10px;
            color: white;
        }
        .title{
            margin-left: 10px;
            color: white;
        }
    }
</style>