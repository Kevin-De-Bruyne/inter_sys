import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {post,get} from './utils/http' 
import Vant from 'vant';
import 'vant/lib/index.css';
import iView from 'view-design';
import 'view-design/dist/styles/iview.css';
import {Toast,Tabbar, TabbarItem,Swipe, SwipeItem,Tab, Tabs,Uploader,Dialog,Field,DatetimePicker,Popup,Skeleton} from 'vant'
import  TabBar from './components/TabBar'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.use(Vant)
Vue.use(iView)
Vue.use(Toast,Tabbar, TabbarItem,Swipe, SwipeItem,Tab, Tabs,Uploader,Dialog,Field,DatetimePicker,Popup,Skeleton);
Vue.config.productionTip = false
Vue.prototype.$get=get
Vue.prototype.$post=post
Vue.component("TabBar",TabBar)
Vue.prototype.$bus = new Vue()

Vue.prototype.showtitle = (msg) => {
  return new Promise((ok, err) => {
      Toast({
          message: msg,
          duration: 1500
      })
      setTimeout(() => {
          ok()
      }, 1500);
  })
}

Vue.prototype.showLoading = (msg) => {
  return new Promise((ok, err) => {
      Toast.loading({
          message: msg,
          duration: 700
      })
      setTimeout(() => {
          ok()
      }, 1500);
  })
}

router.beforeEach((to, from, next) => {
  document.documentElement.scrollTop = 0
  if(to.matched.length==0){
    next('/404')
  }else{
    next()
  }

  Vue.prototype.$get('/api/client/checklogin').then(res=>{
    console.log(res.code)
    if(res.code==0){
      Vue.prototype.showtitle('请授权登录').then(res=>{
        window.location.href='http://test17.xuanjibian.cn/api/client/auth'
      })
    }else{
      if(to.path!='/bindPhone'){
        if(res.data.bindingmobile==0){
          store.commit('setToken',res.data.original.openid)
          Vue.prototype.showtitle('请绑定手机号').then(res=>{
            next('/bindPhone')
          })
        }else{
          store.commit('setToken',res.data.original.openid)
          Vue.prototype.$get('/api/client/checkfollow',{
            openid:store.state.token
          }).then(res=>{
            if(res.data.subscribe==0 && to.path!='/qrcode'){
              Dialog.confirm({
                title: '提醒',
                message: '请先关注公众号',
              })
                .then(() => {
                  // on confirm
                  router.push('/qrcode')
                })
                .catch(() => {
                  // on cancel
                });
            }else{
              next()
            }
          })
        }
      }else{
        next()
      }
    }
  })
  // store.commit('setToken','oZXFh6jHRTbIB5QwMQPkaC9wWsG8')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
