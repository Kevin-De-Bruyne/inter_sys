import Vue from 'vue'
import axios from 'axios';
import 'vant/lib/index.css';
import Vant from 'vant';
import {Toast} from 'vant'
Vue.use(Vant)
Vue.use(Toast);
// let baseurl = 'http://mall.yuelaihuism.com/'
// let baseurl = 'http://www.hdsys.com'
let baseurl = 'http://test17.xuanjibian.cn'
let sercet='base64:sMeeyxQuiQVQCAn+mYDJpJTn9DfsPN0lO9WbJyr02B0='
Vue.prototype.baseURL = baseurl
Vue.prototype.sercet=sercet
axios.defaults.baseURL = baseurl
export function get(url, params={}, headers={}){

    return new Promise((resolve, reject) => {
    axios.get(url,{
     params: params,
     headers: {
         'apply-secret':sercet
     },

    })
    .then(response => {
     resolve(response.data);
    })
    .catch(err => {
     reject(err)
    })
    })
   }

   export function post(url, data = {},headers={}){
    return new Promise((resolve, reject) => {
     axios.post(url, data,{
         headers
            // 'apply-secret':sercet,
            // "Content-Type": "multipart/form-data"
         
            // 'Authorization': 'Bearer '+'8b465d24cc7441bf79b473123611a6f51a57ac3bf880f33829d0a5997d02b944'
         
        
     })
     .then(response => {
     resolve(response.data);
     }, err => {
     reject(err)
     })
    })
    }
    axios.interceptors.response.use(res => {
        // console.log(res.data.result)
        if (res.data.code == 0) {

        }
        return res
    }, err => {
      err.message = '连接服务器失败!'
        
       Toast(err.message)
    })