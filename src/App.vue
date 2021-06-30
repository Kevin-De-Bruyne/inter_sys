<template>
  <div id="app">
    <div id="nav">
      <router-view></router-view>
      <!-- <van-tabbar v-model="active">
        <van-tabbar-item icon="passed">标签</van-tabbar-item>
        <van-tabbar-item icon="more-o">标签</van-tabbar-item>
        <van-tabbar-item icon="shop-o">标签</van-tabbar-item>
        <van-tabbar-item icon="wap-home-o">标签</van-tabbar-item>
      </van-tabbar> -->
      <!-- <tab-bar></tab-bar> -->
    </div>
  </div>
</template>
<script>
  import TabBar from 'components/TabBar.vue'
  export default {
  data() {
    return {
      active: 0
    };
  },
  components:{
    TabBar
  }
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* height: 100vh; */
}

#nav {
  /* padding-bottom: 30px; */
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
