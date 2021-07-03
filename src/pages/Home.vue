<template>
  <div class="home">
    <!-- <drop-down @inputValue="getInputValue" @item-click="itemClick" :itemlist="itemlist" :placeholder="placeholder" :nodatatext="nodatatext"></drop-down> -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
     <van-swipe-item @click="swipeClick">
       <img :src="data.web_logo" alt="" class="swiper_image">
     </van-swipe-item>
   </van-swipe>
   <!-- 服务区域 -->
   <div class="serve">
     <div class="serve_t" @click="$router.push('/appointment')">服务</div>
     <div class="serve_b" v-if="role_show==0">
       <!-- 访客邀请 -->
         <div class="serve_b_list" @click="$router.push('/appointment?type=2')">
         <span class="serve_name">访客邀请</span>
         <div class="serve_icon" style="background:rgb(254,104,103);">
           <span class="iconfont icon-car"></span>
         </div>
         </div>
       <!-- 邀请记录 -->
        <div class="serve_b_list" @click="$router.push('/invite')">
         <span class="serve_name">邀请记录</span>
         <div class="serve_icon" style="background:rgb(9,155,244);">
           <span class="iconfont icon-shenqingjilu-2"></span>
         </div>
         </div>
        <!-- 访客审批 -->
         <div class="serve_b_list" @click="$router.push('/shenpi')">
         <span class="serve_name">访客审批</span>
         <div class="serve_icon" style="background:rgb(9,155,244);">
           <span class="iconfont icon-shenqingjilu-2"></span>
         </div>
         </div>
     </div>
     <!-- ————————————————————普通访客 -->
     <div class="serve_b" v-else>
       <!-- 访客邀请 -->
         <div class="serve_b_list" @click="$router.push('/appointment?type=1')">
         <span class="serve_name">访问申请</span>
         <div class="serve_icon" style="background:rgb(242,241,0);">
           <span class="iconfont icon-icon-"></span>
         </div>
         </div>
       <!-- 访问记录 -->
        <div class="serve_b_list" @click="$router.push('/visit')">
         <span class="serve_name">访问记录</span>
         <div class="serve_icon" style="background:rgb(9,155,244);">
           <span class="iconfont icon-shenqingjilu-2"></span>
         </div>
         </div>
       <!-- 邀请记录 -->
         <div class="serve_b_list" @click="$router.push('/is_invite')">
         <span class="serve_name">邀请记录</span>
         <div class="serve_icon" style="background:rgb(9,155,244);">
           <span class="iconfont icon-shenqingjilu-2"></span>
         </div>
         </div>
        <!-- 访客审批 -->
         <div class="serve_b_list" @click="$router.push('/pass_code')">
         <span class="serve_name">通行二维码</span>
         <div class="serve_icon" style="background:rgb(29,6,14);">
           <span class="iconfont icon-ai-code"></span>
         </div>
         </div>
     </div>
   </div>
  <tab-bar></tab-bar>
  </div>
</template>

<script>
import dropDown from "../components/droodown"
// @ is an alias to /src
export default {
  name: 'Home',
  data(){
    return{
      id:3,
      isActive:true,
      role_show:localStorage.getItem('role_id'),
      activeColor:'purple',
      data:{},
      list:[
        {
          name:'访问申请',
          bgc:'rgb(242,241,0)',
          icon:'iconfont icon-icon-',
          url:'/appointment?type=1',
          show:this.role_show==1?true:false
        },
         {
          name:'访客邀请',
          bgc:'rgb(254,104,103)',
          icon:'iconfont icon-car',
          url:'/appointment?type=2',
          show:this.role_show==0?true:false
        },
         {
          name:'访问记录',
          bgc:'rgb(9,155,244)',
          icon:'iconfont icon-shenqingjilu-2',
          url:'/visit',
          show:this.role_show==1?true:false
        },
         {
          name:'邀请记录',
          bgc:'rgb(9,155,244)',
          icon:'iconfont icon-shenqingjilu-2',
          url:'/is_invite',
          show:this.role_show==0?true:false
        },
         {
          name:'访客审批',
          bgc:'rgb(9,155,244)',
          icon:'iconfont icon-shenqingjilu-2',
          url:'/shenpi',
          show:this.role_show==0?true:false
        },
         {
          name:'通行二维码',
          bgc:'rgb(29,6,14)',
          icon:'iconfont icon-ai-code',
          url:'/pass_code',
          show:this.role_show==1?true:false
        }
      ],
      itemlist: [
        {name:'啊啊'},
        {name:'啊这'},
         {name:'哈哈'},
         
      ],
      placeholder: "搜索",
      nodatatext: "暂无数据",
      selectValue: ""
    }
  },
  components: {
    dropDown
  },
  watch:{
    itemlist:{
      handler(newval,oldval){
        // console.log(newval)
      },
      deep: true,
      immediate:true
    }
  },
  methods:{
     itemClick(data) {
      this.selectValue= data
    },
    getInputValue(searchvalue) {
      console.log(searchvalue)
      // 请求获取筛选列表
      
    },
    swipeClick(){
       window.location.href='https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzkzMjI1NDU2NQ==#wechat_redirect'
    },
    get(){
      this.$get('/api/client/getconfig').then(res=>{
          this.data=res.data
      })
    },
    post(){
      this.$post('/user',{
          nickname:'赵丽颖',
          portrait:111
      }).then(res=>{

      })
    },
    getUserInfo(){
          let data={
              openid:this.$store.state.token
          }
          this.$get('/api/client/getstaff',data).then(res=>{
            //   if(res.data==null){
            //        this.showtitle('请先绑定手机号').then(res=>{
            //            this.$router.push('/bindPhone')
            //        })
            //   }
            if(res.data.staff_role_id!=null){
                localStorage.setItem('role_id',1)
            }else{
                localStorage.setItem('role_id',0)
            }
            
            // localStorage.setItem('role_id',null)
            localStorage.setItem('id',res.data.id)
            this.role_show=localStorage.getItem('role_id')
          })
    }
  },
  created(){
    // this.getUserInfo()
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
    //  .serve_b_list:after{
    //    height: 25px;
    //    background: rgb(236,236,236);
    //    width: 2px;
    //    content: '';
    //  }
     .serve_b_list:nth-child(even)::after{
       height: 0px;
     }
    //  .serve_b_list:nth-child(even){
    //    .serve_name{
    //      padding-left: 18px;
    //    }
       
    //  }
     .serve_b_list:nth-child(3){
       border-bottom: 0;
     }
      .serve_b_list:nth-child(4){
       border-bottom: 0;
     }
     .serve_sb{
      width: 50%;
     }
     .serve_b_list{
       height: 60px;
       flex: 0 0 50%;
       display: flex;
       flex-direction: row;
       justify-content:space-between;
       align-items: center;
       margin-bottom: 10px;
      //  border-bottom: 1px solid rgb(236,236,236);
       .serve_name{
         font-size: 12px;
       }
       .serve_icon{
         width: 35px;
         height: 35px;
         margin-right: 15px;
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