(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-95d9051c"],{7557:function(t,i,e){"use strict";e("8c71")},"8c71":function(t,i,e){},"95ff":function(t,i,e){"use strict";e.r(i);var a=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"sp_detail"},[1==t.detail.status?[e("Header",{attrs:{title:"详情"}}),e("div",{staticClass:"content"},[e("div",{staticClass:"top"},[e("div",{staticClass:"title"},[t._v("拜访单位："+t._s(t.detail.interview_unit))]),e("div",{staticClass:"detail"},[t._v("楼层："+t._s(t.detail.interview_floor))]),e("div",{staticClass:"detail"},[t._v("办公室："+t._s(t.detail.interview_office))])]),e("div",{staticClass:"center"},[e("div",{staticClass:"detail"},[t._v("被访人："+t._s(t.detail.interview_realname))]),e("div",{staticClass:"detail"},[t._v("电话："+t._s(t.detail.interview_mobile))]),e("div",{staticClass:"detail"},[t._v("公司："+t._s(t.detail.interview_unit))])]),e("div",{staticClass:"bottom"},[null!=t.detail.start_time&&null!=t.detail.end_time?e("div",{staticClass:"detail"},[t._v("有效时间："+t._s(t.detail.start_time+"-"+t.detail.end_time))]):t._e(),e("div",{staticClass:"detail"},[t._v("到访时间："+t._s(t.detail.apply_time))]),null!=t.detail.leave_time?e("div",{staticClass:"detail"},[t._v("离开时间:"+t._s(t.detail.leave_time))]):t._e(),e("div",{staticClass:"detail"},[t._v("来访人："+t._s(t.detail.realname))]),e("div",{staticClass:"detail"},[t._v("来访人数:"+t._s(t.detail.together))])]),e("div",{staticClass:"qrcode"},[e("vue-qr",{attrs:{text:JSON.stringify(t.qrcode),size:200}})],1)])]:[e("Header",{attrs:{title:"详情"}}),e("div",{staticClass:"content"},[e("div",{staticClass:"top"},[e("div",{staticClass:"title"},[t._v("拜访单位："+t._s(t.detail.interview_unit))]),e("div",{staticClass:"detail"},[t._v("楼层："+t._s(t.detail.interview_floor))]),e("div",{staticClass:"detail"},[t._v("办公室："+t._s(t.detail.interview_office))])]),e("div",{staticClass:"center"},[e("div",{staticClass:"detail"},[t._v("被访人："+t._s(t.detail.interview_realname))]),e("div",{staticClass:"detail"},[t._v("电话："+t._s(t.detail.interview_mobile))]),e("div",{staticClass:"detail"},[t._v("公司："+t._s(t.detail.interview_unit))])]),e("div",{staticClass:"bottom"},[null!=t.detail.start_time&&null!=t.detail.end_time?e("div",{staticClass:"detail"},[t._v("有效时间："+t._s(t.detail.start_time+"-"+t.detail.end_time))]):t._e(),e("div",{staticClass:"detail"},[t._v("到访时间："+t._s(t.detail.apply_time))]),null!=t.detail.leave_time?e("div",{staticClass:"detail"},[t._v("离开时间:"+t._s(t.detail.leave_time))]):t._e(),e("div",{staticClass:"detail"},[t._v("来访人："+t._s(t.detail.realname))]),e("div",{staticClass:"detail"},[t._v("来访人数:"+t._s(t.detail.together))])]),e("div",{staticStyle:{"text-align":"left","font-size":"15px","margin-top":"10px"}},[t._v(t._s(t.status_text))])])]],2)},s=[],l=e("658f"),d=e.n(l),n=e("71c2"),_={data:function(){return{id:this.$route.query.id,detail:"",status_text:"",qrcode:{},url:"https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzkzMjI1NDU2NQ==#wechat_redirect"}},components:{Header:n["a"],vueQr:d.a},created:function(){this.getDetail(),this.dataRefreh()},mounted:function(){this.initData()},destroyed:function(){this.clear()},methods:{initData:function(){this.qrcode={codeID:this.$route.query.id,codeTime:(new Date).getTime()}},dataRefreh:function(){var t=this;null==this.intervalId&&(this.intervalId=setInterval((function(){console.log("刷新"+new Date),t.initData()}),6e4))},clear:function(){clearInterval(this.intervalId),this.intervalId=null},getDetail:function(){var t=this;this.$get("/api/client/checkdetail/"+this.id).then((function(i){t.detail=i.data,0==t.detail.status?t.status_text="审批中":1==t.detail.status?t.status_text="已通过":2==t.detail.status&&(t.status_text="已失效")}))}}},c=_,v=(e("7557"),e("2877")),r=Object(v["a"])(c,a,s,!1,null,"1753a45c",null);i["default"]=r.exports}}]);
//# sourceMappingURL=chunk-95d9051c.7db39c8f.js.map