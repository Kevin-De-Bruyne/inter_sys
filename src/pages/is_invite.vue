<template>
    <div class="record">
        <div class="topHead">
            <Header title="邀请记录"/>
            <div class="top">
            <div class="top_search">
                <input  placeholder="请输入访客姓名" v-model="name"/>
                <span class="iconfont icon-sousuo" @click="search"></span>
            </div>  
           </div>
        </div>
           <van-tabs v-model="active" @change="go">
               <div v-for="(item,index) in tab" :key="index">
                  <van-tab :title="item.name">
                  <div class="content">
                      <template  v-if="list">
                         <div class="content_list" v-for="(item,index) in list" :key="index" @click="listDetail(activeIndex,item.id,item.status)">
                         <div class="pic" v-if="item.staff!=null">
                           <img :src="item.staff.avatar" alt="">
                         </div>
                         <div class="pic" v-else>
                           <span class="iconfont iconfont icon-geren"></span>
                         </div>
                          <div class="info">
                           <span class="name">{{item.realname}}</span>
                           <span class="company">拜访公司：{{item.unit}}</span>
                           <span class="date">邀请时间：{{item.apply_time}}</span>
                           <span class="date" style="color:rgb(5,129,253)">邀请状态：{{invite_status(item.interview_status)}}</span>
                          </div>
                          <div class="icon">
                           <span class="iconfont icon-arrow-right"></span>
                          </div>
                        </div>
                      </template>
                      <template v-if="is_show">
                           <div style="margin-top:50px;">暂无记录</div>
                      </template>
                  </div>
                  </van-tab>
               </div>
            
               <!-- <van-tab title="标签 2">内容 2</van-tab>
               <van-tab title="标签 3">内容 3</van-tab>
               <van-tab title="标签 4">内容 4</van-tab> -->
           </van-tabs>
    </div>
  </template>
  
  <script>
  import Header from 'components/header'
  export default {
      data(){
          return{
             active:0,
             activeIndex:0,
             tab:[
                 {
                     name:'全部'
                 },
                   {
                     name:'审批中'
                 },
                  {
                     name:'已接受'
                 },
                  {
                     name:'已失效'
                 },
                  {
                     name:'已结束'
                 }
             ],
            page:1,
            pagesize:6,
            list:[],
            status:'',
            name:'',
            is_show:false,
            last_page:''
          }
      },
      computed:{
          invite_status(){
              return(status)=>{
                  if(status==-1){
                       return '审批中'
                  }else if(status==1){
                      return '已接受'
                  }else if(status==4){
                      return '已失效'
                  }else{
                      return '已结束'
                  }
              }
          }
      },
      components:{
          Header
      },
      methods:{
          go(e){
              this.list=[]
              this.page=1
              console.log(e)
              this.activeIndex=e
              if(e==0){
                  this.status=''
              }else if(e==1){
                  this.status=-1
              }else{
                  this.status=e-1
              }
              
              this.getList()
          },
          listDetail(index,id){
              this.$router.push({path:'/invite_detail',query:{index:index,id:id,type:1}})
              this.$store.commit('changeTab',index)
          },
           getList(){
           this.$get('/api/client/otherinvitelist',{
           staff_id:localStorage.getItem('id'),
           page:this.page,
           pagesize:this.pagesize,
           interview_status:this.status,
           realname:this.realname
        }).then(res=>{
          //   console.log(res)
          this.list=res.data.data
           if(this.list==''){
              this.is_show=true
          }else{
             this.is_show=false
          }
           this.last_page=res.data.last_page
        })
       },
       search(){
            this.$get('/api/client/otherinvitelist',{
           staff_id:localStorage.getItem('id'),
           page:this.page,
           pagesize:this.pagesize,
           interview_status:this.status,
           realname:this.name
        }).then(res=>{
            this.list=res.data.data
        })
       }
      },
      mounted(){
          this.getList()
          var that=this
            window.onscroll = function(){
        //变量scrollTop是滚动条滚动时，距离顶部的距离
        var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
        //变量windowHeight是可视区的高度
        var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
        //变量scrollHeight是滚动条的总高度
        var scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;
          //滚动条到底部的条件
          if(scrollTop+windowHeight == scrollHeight){
          //到了这个就可以进行业务逻辑加载后台数据了
            console.log("到了底部");
            if(that.page<that.last_page && that.$route.path=='/is_invite'){
              (that.page)++
              that.showLoading('加载中...').then(res=>{
                  that.getList()
               })
            }else{
                console.log(that.$route.path)
                if(that.$route.path=='/is_invite'){
                    that.showtitle('没有更多了')
                }
                
            }
          } 
        }
      }
  }
  </script>
  
  <style lang="scss" scoped>
  .topHead{
      position: fixed;
      top:0;
      z-index: 1300;
      width: 100%;
  }
  /deep/ .van-tabs__wrap{
      position: fixed;
      top:80px;
      width: 100%;
  }
  /deep/ .van-tab--active{
      color:rgb(5,129,253);
  }
  /deep/ .van-tab--active{
      color:rgb(5,129,253);
  }
  /deep/ .van-tabs__line{
      background-color: rgb(5,129,253);
  }
  /deep/ .van-tabs__nav{
     background-color: rgb(221,221,221);
  }
      .top{
          display: flex;
          flex-direction: column;
          padding: 10px 60px;
          padding-top: 51px;
          background-color: rgb(221,221,221);
          .top_search{
               width:100%;
              display: flex;
              align-items: center;
              border:1px solid black;
              background-color: #fff;
              // justify-content: center;
              input{
                  padding:4px 10px;
                  border: none;
                  outline: none;
                  font-size: 11px;
                  width: 80%;
                  position: relative;
              }
              .icon-sousuo{
                  // position: absolute;
                  // right: 50px;
                  padding-right: 10px;
              }
              
          }
      }
      .content{
          padding-top: 115px;
          padding-bottom: 50px;
         .content_list{
          padding: 10px 10px;
          display:flex;
          border-bottom: 1px solid rgb(233,233,233);
          justify-content: space-between;
          align-items: center;
          .pic{
              width: 35px;
              height: 35px;
              border-radius: 50%;
              display: flex;
              justify-content:center;
              align-items: center;
              border: 1px solid rgb(223,223,223);
              img{
                  width: 100%;
                  height: 100%;
                  border-radius: 50%;
              }
          }
          .info{
              display: flex;
              flex-direction: column;
              text-align-last: left;
              line-height: 20px;
               min-width: 170px;
              .name{
                  font-size: 12px;
                  font-weight: bold;
              }
              .company{
                  font-size: 10px;
              }
              .date{
                  font-size: 10px;
                  color: rgb(145,141,151);
              }
          }
          .iconfont{
              font-size: 16px;
          }
       }
      }
     
  </style>