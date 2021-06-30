<template>
  <div class="record">
      <div class="topHead">
          <Header title="审批记录" @click="head"/>
          <!-- <hello-world/> -->
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
                     <template v-if="list">
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
                         <span class="date" v-if="item.status==1 && item.start_time!=null && item.end_time!=null">有效期:{{item.start_time+'-'+item.end_time}}</span>
                         <span class="date" v-if="activeIndex==1 || activeIndex==3 || activeIndex==0">申请时间：{{item.created_at}}</span>
                         <span class="date" v-if="activeIndex==1 || activeIndex==3 || activeIndex==0">拜访时间：{{item.apply_time}}</span>
                         <span class="date" style="color:rgb(5,129,253)">审核状态：{{statusClick(item.status)}}</span>
                        </div>
                        <div class="icon">
                         <span class="iconfont icon-arrow-right"></span>
                        </div>
                       </div>
                       <!-- <div style="margin-top:10px;" v-if="page<last_page">下拉加载更多...</div> -->
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
import {Toast} from 'vant'
import Header from 'components/header'
import HelloWorld from 'components/HelloWorld'
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
                   name:'已通过'
               },
                {
                   name:'被驳回'
               },
                {
                   name:'已失效'
               },
                {
                   name:'已结束'
               },
           ],
          page:1,
          pagesize:6,
          list:[],
          status:'',
          name:'',
          last_page:'',
          is_show:false
        }
    },
    components:{
        Header,
        HelloWorld
    },
    computed:{
        statusClick(){
            return(data)=>{
                if(data==0){
                    return '审核中'
                }else if(data==1){
                    return '已通过'
                }else if(data==2){
                    return '被驳回'
                }else if(data==3){
                    return '已失效'
                }else{
                    return '已结束'
                }
            }
        }
    },
    methods:{
        go(e){
            this.page=1
            this.list=[]
            console.log(e)
            this.activeIndex=e
            if(e==0){
                this.status=''
            }else{
                this.status=e-1
            }
            
            this.getList()
        },
        head(){
            
        },
        listDetail(index,id,status){
            this.$router.push({path:'/shenpi_detail',query:{index:index,id:id,status:status}})
            this.$store.commit('changeTab',index)
        },
         getList(){
         this.$get('/api/client/checklist',{
         staff_id:localStorage.getItem('id'),
         page:this.page,
         pagesize:this.pagesize,
         status:this.status,
         realname:this.name
      }).then(res=>{
        //   console.log(res)
        if(res.code==1){
             this.list=res.data.data
            if(this.list==''){
                this.is_show=true
            }else{
                 this.is_show=false
            }
           this.last_page=res.data.last_page
        }
      
      })
     },
     search(){
         this.page=1
          this.$get('/api/client/checklist',{
         staff_id:localStorage.getItem('id'),
         page:this.page,
         pagesize:this.pagesize,
         status:this.status,
         realname:this.name
      }).then(res=>{
          this.list=res.data.data
      })
     }
    },
    created(){
         this.getList()
    },
    mounted(){
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
          console.log(that.page)
          if(that.page<that.last_page && that.$route.path=='/shenpi'){
            (that.page)++
             that.showLoading('加载中...').then(res=>{
                  that.getList()
             })
          }else{
                if(that.$route.path=='/shenpi'){
                  that.showtitle('没有更多了')
              }
          }
        } 
      }
    },
    // destroyed(){
    //     this.$bus.$off('alen')
    // }
}
</script>

<style lang="scss" scoped>
.topHead{
    position: fixed;
    top:0;
    width: 100%;
    z-index: 1300;
}
/deep/ .van-tabs__wrap{
    position: fixed;
    top:80px;
    width: 100%;
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
        .content_list:last-child{
            border-bottom:0;
        }
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
            align-items: center;
            justify-content: center;
            border: 1px solid rgb(223,223,223);
            img{
                width: 100%;
                height: 100%;
                 border-radius: 50%;
            }
        }
        .info{
            display: flex;
            min-width: 170px;
            flex-direction: column;
            text-align-last: left;
            line-height: 20px;
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