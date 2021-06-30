<template>
  <div class="tabbar">
      <div class="tabbar_list" v-for="(item,index) in tabBar" :key="index" @click="tabbarClick(index,item.path)">
          <div class="tabbar_t">
              <!-- <img src="" alt=""> -->
              <span :class="[{'active':$route.path==item.path},item.icon]"></span>
          </div>
           <div class="tabbar_b" :class="{'active':$route.path==item.path}">{{item.name}}</div>

      </div>
  </div>
</template>

<script>
export default {
 data(){
     return{
         tabBar:[
             {
                 icon:'iconfont icon-shouye',
                 name:'首页',
                 path:'/home'
             },
             {
                 icon:'iconfont icon-geren',
                 name:'我的',
                 path:'/mine'
             }
         ],
         tabIndex:0
     }
 },
 methods:{
     tabbarClick(index,path){
         this.tabIndex=index
         console.log(this.tabIndex)
         this.$router.push(path)
     }
 }
}
</script>

<style lang="scss" scoped>
 .active{
      color: rgb(5,129,253);
   }
    .tabbar{
        background-color: #fff;
        display: flex;
        position: fixed;
        padding: 5px 0;
        bottom: 0;
        border-top: 1px solid rgb(221,221,221);
        width: 100%;
        .tabbar_list{
            flex: 0 0 50%;
            display: flex;
            flex-direction: column;
            align-items: center;
            .iconfont{
                font-size: 21px;
            }
            .tabbar_t{
                // width: 20px;
                // height: 20px;
                // background-color: red;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .tabbar_b{
                font-size: 9px;
                // margin-top: 5px;
            }
        }
        
    }
</style>