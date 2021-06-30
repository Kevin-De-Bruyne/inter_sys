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
            <div class="detail">来访人：{{detail.unit}}</div>
            <div class="detail">来访人数:{{detail.together}}</div>
          </div>
          <div style="text-align:left;font-size:15px;margin-top:10px;">{{status_text}}</div>
      </div>
      </template>
  </div>
</template>

<script>
import Header from 'components/header'
export default {
 data(){
     return{
       id:this.$route.query.id,
       detail:'',
       status_text:''
     }
 },
 components:{
     Header
 },
 created(){
   this.getDetail()
 },
 methods:{
   getDetail(){
     this.$get('/api/client/checkdetail/'+this.id).then(res=>{
       this.detail=res.data
        if(this.detail.status==0){
         this.status_text='邀请中'
       }else if(this.detail.status==1){
         this.status_text='已邀请'
       }else if(this.detail.status==2){
         this.status_text='已失效'
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