<template>
  <div class="mine">
      <div class="top">
          <div class="top_l">
              <span style="font-size:17px;font-weight:bold;">您好,{{data.name}}</span>
              <span>电话：{{data.phone}}</span>
          </div>
          <div class="top_r">
              <!-- <span class="iconfont icon-shezhi" @click="$router.push('/information')"></span> -->
              <div class="icon">
                  <img :src="data.avatar" alt="">
              </div>
          </div>
      </div>
      <div class="bottom" @click="information">
          <div class="bottom_list"> 
              基本资料
          </div>
      </div>
      <div class="bottom" @click="$router.push('/guide')">
          <div class="bottom_list">
              掌静脉指南
          </div>
      </div>
      <div class="bottom">
          <div class="bottom_list">
              掌静脉
          </div>
      </div>
      <!-- <van-uploader :after-read="afterRead" v-model="fileList"/> -->
       <tab-bar></tab-bar>
  </div>
</template>

<script>
export default {
    data(){
        return{
            fileList:[],
            data:{},
            userInfo:{}
        }
    },
    methods:{
      afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file.file);
      },
      get(){
          let data={
              openid:this.$store.state.token
          }
          this.$get('/api/client/getstaff',data).then(res=>{
            //   if(res.data==null){
            //        this.showtitle('请先绑定手机号').then(res=>{
            //            this.$router.push('/bindPhone')
            //        })
            //   }
            this.data=res.data
            if(res.data.staff_role_id!=null){
                console.log(444)
                localStorage.setItem('role_id',0)
            }else{
                 console.log(444)
                localStorage.setItem('role_id',1)
            }
            
            // localStorage.setItem('role_id',null)
            localStorage.setItem('id',res.data.id)
            this.userInfo={
                name:res.data.name,
                phone:res.data.phone,
                id_card:res.data.id_card
            }
          })
      },
      information(){
          this.$router.push({path:'/information',query:{userInfo:JSON.stringify(this.userInfo),id:this.data.id}})
      }
    },
    mounted(){
        this.get()
    }
}
</script>

<style lang="scss" scoped>
    .mine{
        .top{
            padding: 13px;
            background-color:rgb(5,129,253);
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            .top_l{
                display: flex;
                flex-direction: column;
                color: white;
                font-weight: normal;
                font-size: 11px;
                line-height: 25px;
                text-align: left;
            }
            .top_r{
                display: flex;
                flex-direction: column;
                .iconfont{
                    color: white;
                    font-size: 15px;
                }
                .icon{
                     border-radius: 50%;
                     width: 40px;
                     height: 40px;
                     background-color: #fff;
                     margin-top: 10px;
                     img{
                         width: 100%;
                         height: 100%;
                         border-radius: 50%;
                     }
                }
            }
        }
        .bottom{
            display: flex;
            border-bottom: 2px solid rgb(221,221,221);
            .bottom_list{
                padding: 13px;
                font-size: 11px;
                font-weight: 600;
            }
        }
    }
</style>