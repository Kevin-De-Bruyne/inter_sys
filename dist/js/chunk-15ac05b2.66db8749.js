(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-15ac05b2"],{"2c01":function(t,e,n){},"4c4a":function(t,e,n){t.exports=n.p+"img/banner.bfebfea0.jpg"},"58ad":function(t,e,n){"use strict";n("2c01")},"71c2":function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"header"},[n("span",{staticClass:"iconfont icon-fanhui",on:{click:t.back}}),n("span",{staticClass:"title"},[t._v(t._s(t.title))])])},s=[],a={data:function(){return{}},props:{title:{type:String,default:""}},methods:{back:function(){this.$router.go(-1),this.$bus.$emit("alen",555)}}},o=a,c=(n("8a9f"),n("2877")),r=Object(c["a"])(o,i,s,!1,null,"1e1d6547",null);e["a"]=r.exports},"8a9f":function(t,e,n){"use strict";n("b3a8")},b3a8:function(t,e,n){},e4e0:function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"bindPhone"},[n("Header",{attrs:{title:"绑定手机号"}}),t._m(0),n("div",{staticClass:"phone"},[n("div",{staticClass:"title"},[t._v("绑定手机")]),n("div",{staticClass:"bphone"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.phone,expression:"phone"}],attrs:{type:"text",placeholder:"请输入手机号码"},domProps:{value:t.phone},on:{input:function(e){e.target.composing||(t.phone=e.target.value)}}})]),n("div",{staticClass:"code"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.yanzheng,expression:"yanzheng"}],staticClass:"code_box",attrs:{type:"text",placeholder:"验证码"},domProps:{value:t.yanzheng},on:{input:function(e){e.target.composing||(t.yanzheng=e.target.value)}}}),n("div",{staticClass:"codeNum",on:{click:t.getCode}},[n("span",[t._v(t._s(t.codetext))])])]),n("div",{staticClass:"submit",on:{click:t.bindPhone}},[t._v(" 绑定 ")])])],1)},s=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"banner"},[i("img",{attrs:{src:n("4c4a"),alt:""}})])}],a=n("71c2"),o={data:function(){return{codetext:"获取验证码",phone:"",yanzheng:""}},components:{Header:a["a"]},methods:{bindPhone:function(){var t=this,e={mobile:this.phone,openid:this.$store.state.token,code:this.yanzheng};this.$get("/api/client/bindingmobile",e).then((function(e){1==e.code?t.showtitle(e.msg).then((function(e){t.$store.commit("hasLogin",!0),t.$router.push("/mine")})):t.showtitle(e.msg)}))},getCode:function(){""==this.phone?this.showtitle("请输入手机号码"):this.get()},get:function(){var t=this;"获取验证码"==this.codetext&&this.$get("/api/client/sendSms",{phone:this.phone}).then((function(e){if(t.showtitle(e.msg),1==e.code){t.codetext=60;var n=setInterval((function(){if(t.codetext<=0)return t.codetext="获取验证码",void clearInterval(n);t.codetext--}),1e3)}}))}}},c=o,r=(n("58ad"),n("2877")),l=Object(r["a"])(c,i,s,!1,null,"4a520259",null);e["default"]=l.exports}}]);
//# sourceMappingURL=chunk-15ac05b2.66db8749.js.map