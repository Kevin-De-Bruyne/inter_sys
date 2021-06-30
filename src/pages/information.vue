<template>
  <div class="information">
      <Header title="基本资料"/>
      <div class="content">
          <div class="info_list" @click="showName=true">
              <div class="info_l">姓名</div>
              <div class="info_r">{{user.name}}</div>
          </div>
           <div class="info_list" @click="showPhone=true">
              <div class="info_l">手机号码</div>
              <div class="info_r">{{user.phone}}</div>
          </div>
           <div class="info_list" @click="showCard=true">
              <div class="info_l">身份证号码</div>
              <div class="info_r">{{user.id_card}}</div>
          </div>
           <!-- <div class="info_list" @click="showCompany=true">
              <div class="info_l">单位</div>
              <div class="info_r">广州慧鼎科技有限公司</div>
          </div> -->
      </div>
<!-- 姓名 -->
   <van-dialog
    v-model="showName"
    title="修改姓名"
    show-cancel-button
    :beforeClose="chargeBtn"
  >
<!--输入框-->
    <van-field
      v-model="name"
      rows="1"
      autosize
      label="姓名"
      type="textarea"
      placeholder="请输入姓名"
    />
  </van-dialog>

  <!-- 电话 -->
     <van-dialog
    v-model="showPhone"
    title="修改手机号"
    show-cancel-button
    :beforeClose="chargeBtn2"
  >
<!--输入框-->
    <van-field
      v-model="phone"
      rows="1"
      autosize
      label="电话"
      type="textarea"
      placeholder="请输入电话"
    />
  </van-dialog>

  <!-- 身份证 -->
     <van-dialog
    v-model="showCard"
    title="修改身份证号码"
    show-cancel-button
    :beforeClose="chargeBtn3"
  >
<!--输入框-->
    <van-field
      v-model="card"
      rows="1"
      autosize
      label="身份证"
      type="textarea"
      placeholder="请输入身份证号码"
    />
  </van-dialog>

  <!-- 单位 -->
  <van-dialog
    v-model="showCompany"
    title="弹出框"
    show-cancel-button
    :beforeClose="chargeBtn4"
  >
<!--输入框-->
    <van-field
      v-model="company"
      rows="1"
      autosize
      label="单位"
      type="textarea"
      placeholder="请输入单位"
    />
  </van-dialog>
  </div>
</template>

<script>
import Header from 'components/header'
export default {
 data(){
     return{
      showName:false,
      showPhone:false,
      showCard:false,
      showCompany:false,
      message1:'',
      message2:'',
      message3:'',
      message4:'',
      name:'',
      phone:'',
      card:'',
      company:'',
      user:{}
     }
 },
 components:{
     Header
 },
 mounted(){
   let userInfo=this.$route.query.userInfo
   this.$store.commit('changeUserInfo',userInfo)
   this.user=JSON.parse(this.$store.state.userInfo)
   this.name=this.user.name
   this.phone=this.user.phone
   this.card=this.user.id_card
   console.log(this.user)
 },
 methods:{
      chargeBtn(action, done) {//确认or取消
      if (action === 'cancel') {//取消按钮
        done();
      } else if (action === 'confirm') {//确定按钮
          //向后端传值并关闭dialog弹出框
            this.showName = false;
             let header={
              'apply-secret':this.sercet,
             }   
             let data={
               name:this.name
             }
            this.$post('/api/client/staff/update/'+this.$route.query.id,data,header).then(res=>{
               if(res.code==1){
                this.showtitle(res.msg).then(res=>{
                  this.$get('/api/client/getstaff',{
                    openid:this.$store.state.token
                  }).then(res=>{
                    this.user.name=res.data.name
                  })
                })
              }
            })
          };
        this.message1='';
        done();
     },
       chargeBtn2(action, done) {//确认or取消
      if (action === 'cancel') {//取消按钮
        done();
      } else if (action === 'confirm') {//确定按钮
          //向后端传值并关闭dialog弹出框
            this.showPhone = false;
             let header={
              'apply-secret':this.sercet,
             }   
             let data={
               phone:this.phone
             }
            this.$post('/api/client/staff/update/'+this.$route.query.id,data,header).then(res=>{
              if(res.code==1){
                 this.showtitle(res.msg).then(res=>{
                  this.$get('/api/client/getstaff',{
                    openid:this.$store.state.token
                  }).then(res=>{
                    this.user.phone=res.data.phone
                  })
                })
              }
            })
          };
        this.message2='';
        done();
     },
        chargeBtn3(action, done) {//确认or取消
      if (action === 'cancel') {//取消按钮
        done();
      } else if (action === 'confirm') {//确定按钮
          //向后端传值并关闭dialog弹出框
            this.showCard = false;
            let header={
              'apply-secret':this.sercet,
             }   
             let data={
               id_card:this.card
             }
            this.$post('/api/client/staff/update/'+this.$route.query.id,data,header).then(res=>{
              if(res.code==1){
                this.showtitle(res.msg).then(res=>{
                  this.$get('/api/client/getstaff',{
                    openid:this.$store.state.token
                  }).then(res=>{
                    this.user.id_card=res.data.id_card
                  })
                })
              }
            })
          };
        this.message3='';
        done();
     },
        chargeBtn4(action, done) {//确认or取消
      if (action === 'cancel') {//取消按钮
        done();
      } else if (action === 'confirm') {//确定按钮
          //向后端传值并关闭dialog弹出框
            this.showCompany = false;
          };
        this.message4='';
        done();
     }
 }
}
</script>

<style lang="scss" scoped>
    /deep/ .van-dialog__confirm{
      color: rgb(5,129,253);
    }
    .content{
        padding-top: 40px;
    }
    .info_list{
        padding: 10px 20px;
        display: flex;
        border-bottom: 2px solid rgb(229,229,229);
        .info_l{
            width:80px;
            font-size: 11px;
            text-align: left;
        }
        .info_r{
            color: rgb(136,143,180);
            font-size: 11px;
        }
    }
</style>