import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:localStorage.getItem('token'),
    is_phone:Boolean(localStorage.getItem('login')),
    userInfo:localStorage.getItem('userInfo'),
    tab:0
  },
  mutations: {
    setToken(state,token){
      localStorage.setItem('token',token)
      state.token=token
    },
    hasLogin(state,phone){
      localStorage.setItem('login',phone)
      state.is_phone=phone
    },
    changeUserInfo(state,userInfo){
      localStorage.setItem('userInfo',userInfo)
      state.userInfo=userInfo
    },
    changeTab(state,tab){
      state.tab=tab
    }
  },
  actions: {
  },
  modules: {
  }
})
