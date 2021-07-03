<template>
  <div class="sp_detail">
      <template>
      <Header title="详情"/>
      <div class="content">
          <div class="top">
            <div class="title">拜访单位：{{detail.interview_unit}}</div>
            <div class="detail">楼层：{{detail.interview_floor}}</div>
            <div class="detail">办公室：{{detail.interview_office}}</div>
          </div>
          <div class="center">
            <div class="detail">邀请人：{{detail.interview_realname}}</div>
            <div class="detail">电话：{{detail.interview_mobile}}</div>
            <div class="detail">公司：{{detail.interview_unit}}</div>
          </div>
          <div class="bottom">
            <div class="detail">邀请时间：{{detail.apply_time}}</div>
            <div class="detail">来访人：{{detail.realname}}</div>
            <div class="detail">来访人数:{{detail.together}}</div>
          </div>
          <div style="text-align:left;font-size:15px;margin-top:10px;">{{status_text}}</div>
          <div class="qrcode" v-if="$route.query.type==1 && detail.interview_status==1">
               <vue-qr  :text="JSON.stringify(qrcode)" :size="200"></vue-qr>
         </div>
      </div>
      </template>
  </div>
</template>

<script>
  import vueQr from 'vue-qr'
import Header from 'components/header'
export default {
 data(){
     return{
       id:this.$route.query.id,
       detail:'',
       status_text:'',
        qrcode:{},
     }
 },
 components:{
     Header,
     vueQr
 },
 created(){
   this.getDetail()
    this.dataRefreh();
 },
  mounted(){
     this.initData();
   },
    destroyed(){
    // 在页面销毁后，清除计时器
    this.clear();
   },
 methods:{
    initData(){
      this.qrcode={
     codeID:this.$route.query.id,
     codeTime:new Date().getTime()
   }
   },
    dataRefreh() {
      // 计时器正在进行中，退出函数
      if (this.intervalId != null) {
        return;
      }
      // 计时器为空，操作
      this.intervalId = setInterval(() => {
        console.log("刷新" + new Date());
        this.initData(); //加载数据函数
      }, 60000);
    }, 
    // 停止定时器
    clear() {
      clearInterval(this.intervalId); //清除计时器
      this.intervalId = null; //设置为null
    },
   getDetail(){
     this.$get('/api/client/checkdetail/'+this.id).then(res=>{
       this.detail=res.data
       let role_id=localStorage.getItem('role_id')
       if(role_id==0){
        if(this.detail.status==0){
         this.status_text='邀请中'
       }else if(this.detail.status==1){
         this.status_text='已邀请'
       }else if(this.detail.status==2){
         this.status_text='已失效'
       }else{
         this.status_text='已结束'
       }
       }else{
        if(this.detail.interview_status==-1){
           this.status_text='审批中'
        }else if(this.detail.interview_status==1){
         this.status_text='已接受'
       }else if(this.detail.interview_status==2){
         this.status_text='已失效'
       }else{
         this.status_text='已结束'
       }
       }
     })
       
   }
 }
}
</script>

<style lang="scss" scoped>
    .content{
        padding: 50px 20px; 
        .qrcode{
            margin-top: 15px;
            width: 140px;
            height: 140px;
            margin: 0 auto;
        }
        .top{
            line-height: 25px;
            text-align: left;
        }
        .title{
            font-size: 14px;
            font-weight: bold;
        }
        .detail{
            font-size: 11px;
            color: rgb(152,141,141);
        }
        .center{
            margin-top: 15px;
            line-height: 25px;
            text-align: left;
        }
          .bottom{
            margin-top: 15px;
            line-height: 25px;
            text-align: left;
        }
        .review{
          display: flex;
          justify-content: space-around;
          margin-top: 20px;
          .agree{
            padding: 7px 30px;
            border: 2px solid rgb(144,215,143);
            border-radius: 7px;
          }
           .refuse{
            padding: 7px 30px;
             border: 2px solid rgb(144,215,143);
             border-radius: 7px;
          }
        }
    }
</style>