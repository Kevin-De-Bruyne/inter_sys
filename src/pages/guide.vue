<template>
    <div class="whole">
        <Header title="掌静脉指南"/>
        <div class="guide" v-html="data.web_guide"></div>
    </div>
    
</template>

<script>
import Header from 'components/header'
import informationVue from './information.vue'
export default {
 data(){
     return{
         data:{}
     }
 },
 components:{
        Header
 },
 created(){
     this.get()
 },
 methods:{
    get(){
      this.$get('/api/client/getconfig').then(res=>{
          this.data=res.data
      })
    }
 }
}
</script>

<style lang='scss' scoped>
    .guide{
        margin-top: 50px;
    }
</style>