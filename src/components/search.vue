<template>
    <div>
          <div class="popList" v-if="show">
            <div v-for="(item,index) in dataList" :key="index" class="list" @click="listClick(index,item)">
              <span :style="{color:listIndex==index?'rgb(5,129,253)':''}">{{item.name}}</span>
              <span class="iconfont icon-arrow-right" style="color:rgb(5,129,253);" v-if="listIndex==index"></span>
            </div>
          </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
   
        }
    },
    props:{
        inputValue:{
            type:String,
            default:''
        },
        dataList:{
            type:Array,
            default:[]
        },
        show:{
            type:Boolean,
            default:false
        },
        listIndex:{
            type:Number,
            default:0
        }
    },
    methods:{
        listClick(index,item){
          this.$emit('clicks',item.name,index)
      }
    }
}
</script>

<style lang='scss' scoped>
    .popList{
    // padding: 10px;
    margin-top: 10px;
    text-align: left;
    padding-left: 20px;

    padding-right: 20px;
    .list{
        line-height: 20px;
            display: flex;
        justify-content: space-between;
   
    }
}
</style>