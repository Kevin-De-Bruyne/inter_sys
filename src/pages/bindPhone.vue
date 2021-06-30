<template>
  <div class="bindPhone">
     <Header title="绑定手机号"/>
     <div class="banner">
         <img src="~assets/banner.jpg" alt="">
     </div>
     <div class="phone">
         <div class="title">绑定手机</div>
         <div class="bphone">
             <input type="text" placeholder="请输入手机号码" v-model="phone"/>
         </div>
         
         <div class="code">
                 <input type="text"  placeholder="验证码"  class="code_box" v-model="yanzheng"/>
                 <div class="codeNum" @click="getCode">
                     <span>{{codetext}}</span>
                 </div>
         </div>
         <!-- 绑定手机号 -->
         <div class="submit" @click="bindPhone">
             绑定
         </div>
     </div>
  </div>
</template>

<script>
import Header from 'components/header'
export default {
    data(){
        return{
            codetext:'获取验证码',
            phone:'',
            yanzheng:''
        }
    },
    components:{
        Header
    },
    methods:{
        bindPhone(){
            let data={
                mobile:this.phone,
                openid:this.$store.state.token,
                code:this.yanzheng
            }
            this.$get('/api/client/bindingmobile',data).then(res=>{
                if(res.code==1){
                    this.showtitle(res.msg).then(res=>{
                        this.$store.commit('hasLogin',true)
                        this.$router.push('/mine')
                    })
                }else{
                    this.showtitle(res.msg)
                }
            })
        },
        getCode(){
            if(this.phone==''){
                this.showtitle('请输入手机号码')
            }else{
             this.get()
            }
        },
        get(){
            if(this.codetext=='获取验证码'){
              this.$get('/api/client/sendSms',{
                phone:this.phone
            }).then(res=>{
                this.showtitle(res.msg)
                if(res.code==1){
                this.codetext=60
                let ti=setInterval(()=>{
                if(this.codetext<=0){
                    this.codetext='获取验证码'
                    clearInterval(ti)
                    return
                }
                this.codetext--
               },1000)
                }
            })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .banner{
        width: 100%;
        height: 215px;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .phone{
        padding: 10px;
        display: flex;
        align-items: center;
        flex-direction: column;
        .title{
            font-size: 16px;
            font-weight: bold;
            margin-top: 10px;
            text-align: left;
        }
        .bphone{
            width: 80%;
            margin-top: 10px;
            // margin: 0 auto;
            font-size: 12px;
            display: flex;
            justify-content: flex-start;
            input{
                width: 100%;
                 padding: 5px 0 5px 10px;
            }
        }
        .code{
            display: flex;
            width: 80%;
            // margin:0 auto;
            justify-content: space-between;
            .code_box{
             width: 70%;
            margin-top: 15px;
            padding: 5px 0 5px 10px;
            // margin: 0 auto;
            font-size: 12px;
            margin-right: 15px;
            }
            .codeNum{
                padding: 1px 10px;
                border-radius: 5px;
                border: 2px solid rgb(203,203,203);
                white-space: nowrap;
                font-size: 11px;
                margin-top: 15px;
                display: flex;
                align-items: center;
            }
        }
     .submit{
         padding: 5px 80px;
         margin-top: 20px;
         background-color: rgb(26,173,25);
         color: white;
         font-size: 12px;
         border-radius: 3px;
     }
    }
</style>