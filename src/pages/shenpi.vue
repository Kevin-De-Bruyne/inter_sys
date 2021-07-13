<template>
  <div class="record">
      <div class="topHead">
          <Header title="审批记录" @click="head">
              
          </Header>
          <!-- <hello-world/> -->
          <div class="top" ref="list">
          <div class="top_search">
              <input  placeholder="请输入访客姓名" v-model="name"/>
              <span class="iconfont icon-sousuo" @click="search"></span>
          </div>  
         </div>
      </div>
      <!-- <div>{{statusClick}}</div> -->
      <van-skeleton title avatar :row="11" :loading="loading" class="sk">
        <div>实际内容</div>
      </van-skeleton>
     <list @active="activeClick">
         <template slot-scope="scope" v-if="index==0 || index==1 || index==3">
                <span class="date">申请时间：{{scope.created_at.created_at}}</span>
                 <span class="date">拜访时间：{{scope.created_at.apply_time}}</span>
         </template>
         <!-- <template slot-scope="scopes" v-if="index==0 || index==1 || index==3">
                <span class="date">拜访时间：{{scopes.apply_time}}</span>
         </template> -->
     </list>
  </div>
</template>

<script>
var test = (function(a) {
    console.log(a)
    console.log(1111)
    return function(b) {
         console.log(222)
        console.log(b)
        return a + b;
    }
} (function(a, b) {
    console.log(333)
    return b;
}(1, 2))); 
console.log(test(4));
import {Toast} from 'vant'
import Header from 'components/header'
import List from 'components/List'
import HelloWorld from 'components/HelloWorld'
export default {
    data(){
        return{
           active:0,
           loading:true,
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
          index:'',
          last_page:'',
          is_show:false
        }
    },
    components:{
        Header,
        HelloWorld,
        List
    },
    computed:{
        statusClick({page}){
            // return(data)=>{
            //     if(data==0){
            //         return '审核中'
            //     }else if(data==1){
            //         return '已通过'
            //     }else if(data==2){
            //         return '被驳回'
            //     }else if(data==3){
            //         return '已失效'
            //     }else{
            //         return '已结束'
            //     }
            // }
            return page
        }
    },
    methods:{
        activeClick(e){
            this.index=e
        },
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
            this.loading=false
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
.sk{
    margin-top: 150px;
}
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
            min-width: 190px;
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