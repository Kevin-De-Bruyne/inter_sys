<template>
    <div class="sp_detail">
        <Header title=""/>
            <div class="qrcode">
              <span style="font-size:20px;">请先关注公众号</span>
               <vue-qr  :text="url" :size="300"></vue-qr>
            </div>
   </div>
  </template>
  
  <script>
  import vueQr from 'vue-qr'
  import Header from 'components/header'
  export default {
   data(){
       return{
         detail:'',
         status_text:'',
         qrcode:{},
         url:'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzkzMjI1NDU2NQ==#wechat_redirect'
       }
   },
   components:{
       Header,
       vueQr
   },
   computed:{

   },
   created(){

   },
   methods:{

   }
  }
  </script>
  
  <style lang="scss" scoped>
     .qrcode{
              margin-top: 115px;
              width: 100%;
              height: 140px;
              display: flex;
              align-items: center;
              justify-content: center;
              flex-direction: column;
          }
      .content{
          padding: 50px 20px; 
         
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