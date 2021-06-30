<template>
  <div class="home">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
     <van-swipe-item v-for="(item,index) in 1" :key="index" @click="swipeClick">
       <img :src="data.web_logo" alt="" class="swiper_image">
     </van-swipe-item>
   </van-swipe>
   <!-- 服务区域 -->
   <div class="serve">
     <div class="serve_t" @click="$router.push('/appointment')">服务</div>
     <div class="serve_b">
       <div class="serve_b_list" v-for="(item,index) in list" :key="index" @click="$router.push(item.url)">
         <span class="serve_name">{{item.name}}</span>
         <div class="serve_icon" :style="{background:item.bgc}">
           <span :class="item.icon"></span>
         </div>
       </div>
     </div>
   </div>
  <tab-bar></tab-bar>
  </div>
</template>

<script>
import {Toast} from 'vant'
// @ is an alias to /src
export default {
  name: 'Home',
  data(){
    return{
      id:3,
      isActive:true,
      activeColor:'purple',
      data:{},
      list:[
        {
          name:'访问申请',
          bgc:'rgb(242,241,0)',
          icon:'iconfont icon-icon-',
          url:'/appointment?type=1'
        },
         {
          name:'访客邀请',
          bgc:'rgb(254,104,103)',
          icon:'iconfont icon-car',
          url:'/appointment?type=2'
        },
         {
          name:'访问记录',
          bgc:'rgb(9,155,244)',
          icon:'iconfont icon-shenqingjilu-2',
          url:'/visit'

        },
         {
          name:'邀请记录',
          bgc:'rgb(9,155,244)',
          icon:'iconfont icon-shenqingjilu-2',
          url:'/invite'
        },
         {
          name:'访客审批',
          bgc:'rgb(9,155,244)',
          icon:'iconfont icon-shenqingjilu-2',
          url:'/shenpi'
        },
         {
          name:'通行二维码',
          bgc:'rgb(29,6,14)',
          icon:'iconfont icon-ai-code'
        },
      ]
    }
  },
  components: {
  },
  methods:{
    swipeClick(e){
      console.log(e)
    },
    get(){
      this.$get('/api/client/getconfig').then(res=>{
          this.data=res.data
      })
    },
//           beforeDestroy(){
// this.$bus.$off('alen')
//     },
    post(){
      this.$post('/user',{
          nickname:'赵丽颖',
          portrait:111
      }).then(res=>{

      })
    }
  },
  created(){
    this.get()
    // this.post()
  },
  mounted(){

  }
}
</script>
<style lang="scss" scoped>
.home{
  background-color:rgb(241,242,247);
  height: 100vh;
}
/deep/ .van-swipe__indicator{
  width: 8px;
  height: 8px;
}
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    // line-height: 150px;
    height: 150px;
    text-align: center;
    background-color: #39a9ed;
  }
  .swiper_image{
    width: 100%;
    height: 100%;
  }
  .serve{
    padding:5px 10% 10px 10%;
    background-color: #fff;
    margin-top: 15px;
     border-bottom-left-radius: 8px;
     border-bottom-right-radius: 8px;
    box-shadow: 1px 3px 5px rgb(221,222,226);
    display: flex;
    flex-direction: column;
    .serve_t{
      font-size: 13px;
      font-weight: bold;
      text-align: left;
    }
    .serve_b{
      display: flex;
      flex-wrap: wrap;
      align-content: flex-start;
      margin-top: 10px;
     .serve_b_list:after{
       height: 25px;
       background: rgb(236,236,236);
       width: 2px;
       content: '';
     }
     .serve_b_list:nth-child(even)::after{
       height: 0px;
     }
     .serve_b_list:nth-child(even){
       .serve_name{
         padding-left: 18px;
       }
       
     }
     .serve_b_list:nth-child(3){
       border-bottom: 0;
     }
      .serve_b_list:nth-child(4){
       border-bottom: 0;
     }
     .serve_b_list{
       height: 60px;
       flex: 0 0 50%;
       display: flex;
       flex-direction: row;
       justify-content:space-between;
       align-items: center;
       margin-bottom: 10px;
       border-bottom: 1px solid rgb(236,236,236);
       .serve_name{
         font-size: 12px;
       }
       .serve_icon{
         width: 35px;
         height: 35px;
         border-radius: 50%;
         display: flex;
         align-items: center;
         justify-content: center;
         color: white;
         .iconfont{
           font-size: 17px;
         }
         img{
           width: 100%;
           height: 100%;
           border-radius: 50%;
         }
       }
     }
    }
  }
</style>