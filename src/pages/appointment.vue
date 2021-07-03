<template>
  <div class="yuyue">
      <Header :title="title"/>
      <div class="apply_box">
          <div class="apply_title">
              <span @click="$router.push('/appointmented')">时间地点</span>
          </div>
          <router-view></router-view>
          <div class="content">
              <div class="content_list">
                  <div class="content_name">
                      <span>拜访单位</span>
                  </div>
                  <input type="text" placeholder="请输入拜访单位" v-model.trim="interview_unit" @click="search"/>
              </div>
               <div class="popList" v-if="popup">
                <div v-for="(item,index) in dataList" :key="index" class="list" @click="listClick(index,item)">
                      <span :style="{color:listIndex==index?'rgb(5,129,253)':''}">{{item.name}}</span>
                      <span class="iconfont icon-arrow-right" style="color:rgb(5,129,253);" v-if="listIndex==index"></span>
                </div>
               </div>
              <div class="content_list">
                  <div class="content_name">
                      <span>楼层</span>
                  </div>
                   <input type="text" placeholder="请输入楼层" v-model="interview_floor"/>
              </div>
              <div class="content_list">
                  <div class="content_name">
                      <span>办公室</span>
                  </div>
                   <input type="text" placeholder="请输入办公室" v-model="interview_office"/>
              </div>
         <div class="apply_box">
           <div class="content_list" @click="show=true">
                  <div class="content_name">
                      <span>时间</span>
                  </div>
                  <div class="time" v-if="formDate==''">请选择拜访时间</div>
                  <div class="time" v-else>{{formDate}}</div>
           </div>
          <van-popup v-model="show"  position="bottom">
         <van-datetime-picker
           v-model="currentDate"
          type="datetime"
          title="选择拜访时间"
          :min-date="minDate"
          :max-date="maxDate"
          @confirm="confirm"
        />
        </van-popup>
       </div>
          </div>
      </div>
      <!-- -------------- -->
       <div class="apply_box">
          <div class="apply_title">
              <span>被访人</span>
          </div>
          <div class="content">
              <div class="content_list">
                  <div class="content_name">
                    <span>姓名</span>
                  </div>
                   <input type="text" placeholder="请输入姓名" v-model="interview_realname"/>
              </div>
              <div class="content_list">
                  <div class="content_name">
                    <span>电话</span>
                  </div>
                   <input type="text" placeholder="请输入电话" v-model="interview_mobile"/>
              </div>
              <div class="content_list">
                  <div class="content_name">
                     <span>单位部门</span>
                  </div>
                   <input type="text" placeholder="请输入单位部门" v-model="department"/>
              </div>
          </div>
      </div>
      <!-- ------------------ -->
       <div class="apply_box">
          <div class="apply_title">
              <span>拜访人</span>
          </div>
          <div class="content">
              <div class="content_list">
                  <div class="content_name">
                    <span>姓名</span>
                  </div>
                   <input type="text" placeholder="请输入姓名" v-model="realname"/>
              </div>
              <div class="content_list">
                  <div class="content_name">
                    <span>电话</span>
                  </div>
                   <input type="text" placeholder="请输入电话" v-model="mobile"/>
              </div>
             <div class="content_list" v-if="$route.query.type==1">
                  <div class="content_name">
                     <span>身份证</span>
                  </div>
                   <input type="text" placeholder="请输入身份证" v-model="id_card"/>
              </div>
               <div class="content_list">
                  <div class="content_name">
                     <span>单位</span>
                  </div>
                   <input type="text" placeholder="请输入单位" v-model="unit"/>
              </div>
              <div class="content_list" v-if="$route.query.type==1">
                  <div class="content_name">
                     <span>车牌号</span>
                  </div>
                   <input type="text" placeholder="请输入车牌号，例如粤AXXXXXX" v-model="car_num"/>
              </div>
              <div class="content_list">
                  <div class="content_name">
                     <span>随行人数</span>
                  </div>
                   <input type="text" placeholder="请输入人数，例如3" style="width:50%;" v-model="together"/>人
              </div>
          </div>
      </div>
      <!-- ------------------ -->
      <div class="apply_box">
          <div class="apply_title">
              <span>拜访理由</span>
          </div>
          <div class="contents">
              <textarea name="" id="" cols="30" rows="10" placeholder="请输入拜访理由" v-model="reason"></textarea>
          </div>
      </div>
      <!-- 随康码 -->
       <div class="apply_box" v-if="$route.query.type==1">
          <div class="apply_title">
              <span>穗康码</span>
          </div>
          <van-uploader :after-read="afterRead" v-model="fileList" :max-count="1"/>
      </div>
      <!-- 行程大数据截图 -->
      <div class="apply_box" v-if="$route.query.type==1">
          <div class="apply_title">
              <span>行程大数据截图</span>
          </div>
          <van-uploader :after-read="afterRead2" v-model="fileList2" :max-count="1"/>
      </div>
      <div class="submit">
          <div class="btn" @click="submit">提交</div>
      </div>
     
  </div>
</template>

<script>
// import Header from 'components/header'
import axios from 'axios'
import Header from '../components/header.vue'
const delay = (function () {
  let timer = 0
  return function (callback, ms) {
    clearTimeout(timer)
    timer = setTimeout(callback, ms)
  }
})()
export default {
    data(){
        return{
            fileList:[],
            fileList2:[],
             minDate: new Date(2020, 0, 1),
             maxDate: new Date(2025, 10, 1),
             currentDate: new Date,
             show:false,
             formDate:'',
             interview_unit:'',
             interview_floor:'',
             interview_office:'',
             interview_realname:'',
             interview_mobile:'',
             realname:'',
             mobile:'',
             id_card:'',
             popup:false,
             unit:'',
             listIndex:0,
             car_num:'',
             reason:'',
             together:'',
             health_code:'',
             journey_code:'',
             department:'',
             title:this.$route.query.type==1?'预约申请':'访客邀请',
             dataList:[]
        }
    },
    watch : {
		interview_unit () {
             delay(() => {
        this.search()
      }, 500)
    }
    },
    components:{
        Header
    },
    mounted(){
        console.log(localStorage.getItem('id'))
       console.log(document.documentElement.scrollTop ) 
 
    },
    methods:{
      listClick(index,item){
          this.listIndex=index
          this.interview_unit=item.name
          this.popup=false
      },
      search(){
          this.popup=true
          this.$get('/api/client/getcompanylist',{
              keyword:this.interview_unit
          }).then(res=>{
              this.listIndex=0
              this.dataList=res.data
          })
      },
      afterRead(file,name) {
      // 此时可以自行将文件上传至服务器    
       let data = new FormData(); 
      console.log(file.file);
      data.append("pic",file.file);
      console.log(data.get('pic'))
      let header={
           'apply-secret':this.sercet,
            "Content-Type": "multipart/form-data"
      }
      this.$post('/api/client/upload',
          data
      ,header).then(res=>{
          console.log(this.baseURL+res.path)
          this.health_code=res.path
      })
      },
      afterRead2(file) {
      // 此时可以自行将文件上传至服务器
      let data = new FormData(); 
      console.log(file.file);
      data.append("pic",file.file);
      console.log(data.get('pic'))
      let header={
           'apply-secret':this.sercet,
            "Content-Type": "multipart/form-data"
      }
      this.$post('/api/client/upload',
          data
      ,header).then(res=>{
          console.log(this.baseURL+res.path)
          this.journey_code=res.path
      })
      },
      confirm(e){
          console.log(e)
          let year=e.getFullYear()
          let month=e.getMonth()+1
          let day=e.getDate()
          let hour=e.getHours()
          let minute=e.getMinutes()
          let second=e.getSeconds()
          console.log(year,month,day,hour,minute,second)
          let formDate=year+'-'+(month<10?'0'+month:month)+'-'+(day<10?'0'+day:day)+' '+(hour<10?'0'+hour:hour)+':'+(minute<10?'0'+minute:minute)
          this.formDate=formDate
          this.show=false
      },
      submit(){
        let header={
           'apply-secret':this.sercet,
        }
          let data={
              realname:this.realname,
              id_card:this.id_card,
              together:this.together,
              unit:this.unit,
              mobile:this.mobile,
              reason:this.reason,
              apply_time:this.formDate,
              car_num:this.car_num,
              health_code:this.health_code,
              journey_code:this.journey_code,
              interview_realname:this.interview_realname,
              interview_mobile:this.interview_mobile,
              interview_unit:this.interview_unit,
              interview_floor:this.interview_floor,
              interview_office:this.interview_office,
              type:this.$route.query.type,
              staff_id:localStorage.getItem('id'),
              department:this.department
          }
          if(this.$route.query.type==1){
          if(this.interview_unit==''){
              this.showtitle('请输入拜访单位')
          }else if(this.formDate==''){
              this.showtitle('请输入拜访时间')
          }else if(this.interview_realname==''){
              this.showtitle('请输入被访人姓名')
          }else if(this.interview_mobile==''){
              this.showtitle('请输入被访人电话')
          }else if(!/^1[3456789]\d{9}$/.test(this.interview_mobile)){
              this.showtitle('被访人电话格式不对')
          } else if(this.realname==''){
              this.showtitle('请输入访客姓名')
          }else if(this.mobile==''){
              this.showtitle('请输入访客电话')
          }else if(!/^1[3456789]\d{9}$/.test(this.mobile)){
              this.showtitle('访客电话格式不对')
          }else if(this.id_card==''){
              this.showtitle('请输入身份证号码')
          }else if(this.reason==''){
              this.showtitle('请输入拜访理由')
          }else{
             this.$post('/api/client/guest',data,header).then(res=>{
                if(res.code==1){
                   this.showtitle(res.msg).then(res=>{
                       this.$router.push({path:'/visit'})
                   })
                   
                }else{
                    this.showtitle(res.msg)
                }
                
            })
          }
         }else{
          if(this.interview_unit==''){
              this.showtitle('请输入拜访单位')
          }else if(this.formDate==''){
              this.showtitle('请输入拜访时间')
          }else if(this.interview_realname==''){
              this.showtitle('请输入被访人姓名')
          }else if(this.interview_mobile==''){
              this.showtitle('请输入被访人电话')
          }else if(!/^1[3456789]\d{9}$/.test(this.interview_mobile)){
              this.showtitle('被访人电话格式不对')
          }else if(this.realname==''){
              this.showtitle('请输入访客姓名')
          }else{
                this.$post('/api/client/guest',data,header).then(res=>{
                if(res.code==1){
                     localStorage.setItem('gude_show',1)
                   this.showtitle('填写成功，请转发给其他用户').then(
                       this.$router.push({path:'/appointmented',query:{id:res.data}})
                     )
                }else{
                     this.showtitle(res.msg)
                }
                
            })
          }
    
          }
      
          
      }
    }
}
</script>

<style lang="scss" scoped>
.popList{
    // padding: 10px;
    margin-top: 10px;
    text-align: left;
    padding-left: 20px;

    padding-right: 20px;
    .list{
        line-height: 20px;
            display: flex;
        justify-content: space-between;
   
    }
}
/deep/ .van-popup--top{
    top: 110px;
}
/deep/ .van-popup--center{
    width: 80%;

}
/deep/ .van-uploader__upload{
    width: 130px;
    height: 130px;
}
/deep/ .van-uploader__preview-image{
     width: 130px;
    height: 130px;
}
    .yuyue{
        width: 100%;
        // height: 100vh;
        padding-bottom:107px;
    }
    .apply_box:nth-child(3){
        margin-top: 0;
    }
    .apply_box:nth-child(4){
        margin-top: 0;
    }
    .apply_box:nth-child(5){
        margin-top: 0;
    }
    .apply_box:nth-child(6){
        margin-top: 0;
    }
    .apply_box:nth-child(7){
        margin-top: 0;
    }
      .apply_box:nth-child(8){
        margin-top: 0;
    }
    .apply_box{
        display: flex;
        flex-direction: column;
        margin-top: 40px;
        .contents{
            padding: 5px 10px;
            textarea{
                width: 100%;
                height: 100px;
                border:none;
                resize: none;
                font-size: 11px;
            }
        }
        .apply_title{
            width: 100%;
            background-color:rgb(221,221,221);
            color: rgb(90,94,127);
            font-size: 11px;
            height: 25px;
            display: flex;
            align-items: center;
            text-align-last: left;
            span{
                padding-left: 12px;
            }
        }

        .content_list{
            width: 100%;
            height: 40px;
            background-color: #fff;
            font-size: 11px;
            text-align: left;
            display: flex;
            align-items: center;
            border-bottom: 2px solid rgb(238,238,238);
            .content_name{
              width: 60px;
             span{
                padding-left: 12px;
             }
            }
         
            input{
                outline: none;
                border: none;
                width: 70%;
                padding: 10px 20px;
            }
            .time{
                width: 70%;
                padding: 10px 20px;
            }
        }
    }
    .submit{
        // position: fixed;
        // bottom: 60px;
        display: flex;
        width: 100%;
        justify-content: center;
        color: white;  
        margin-top: 30px;
        .btn{
           background-color: rgb(5,129,253);
           border-radius: 5px;
           padding: 8px 90px;
        }
     }
</style>