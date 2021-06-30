<template>
    <div class="yuyue">
        <Header title="访客邀请"/>
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
                  <input type="text" placeholder="请输入拜访单位" v-model="interview_unit"/>
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
               <div class="content_list">
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
                <div class="content_list">
                    <div class="content_name">
                       <span>车牌号</span>
                    </div>
                     <input type="text" placeholder="请输入车牌号，例如粤AXXXXXX" v-model="car_num"/>
                </div>
                <div class="content_list">
                    <div class="content_name">
                       <span>随行人数</span>
                    </div>
                     <input type="text" placeholder="请输入人数，例如3" style="width:30%;" v-model="together"/>人
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
         <div class="apply_box">
            <div class="apply_title">
                <span>穗康码</span>
            </div>
            <van-uploader :after-read="afterRead" v-model="fileList" :max-count="1"/>
        </div>
        <!-- 行程大数据截图 -->
        <div class="apply_box">
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
               unit:'',
               car_num:'',
               reason:'',
               together:'',
               health_code:'',
               journey_code:'',
               detail:'',
               department:''
          }
      },
      components:{
          Header
      },
      mounted(){
        console.log(this.$route.query.id)
        this.getInfo()
    
   
      },
      methods:{
      getInfo(){
        let id=this.$route.query.id
        this.$get('/api/client/checkdetail/'+id).then(res=>{
        this.interview_unit=res.data.interview_unit
        this.interview_floor=res.data.interview_floor
        this.interview_office=res.data.interview_office
        this.formDate=res.data.start_time
        this.interview_realname=res.data.interview_realname
        this.interview_mobile=res.data.interview_mobile
        this.realname=res.data.realname
        this.mobile=res.data.mobile
        this.unit=res.data.unit
        this.together=res.data.together
        this.reason=res.data.reason
        this.department=res.data.department
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
          let id=this.$route.query.id
          let header={
             'apply-secret':this.sercet,
          }
            let data={
                id_card:this.id_card,
                car_num:this.car_num,
                health_code:this.health_code,
                journey_code:this.journey_code,
            }
            if(this.id_card==''){
                this.showtitle('请输入身份证号码')
             }else if(this.health_code==''){
              this.showtitle('请上传穗康码截图')
            }else if(this.journey_code==''){
              this.showtitle('请上传行程大数据截图')
          } else{
              this.$post('/api/client/guest/update/'+id,data,header).then(res=>{
                  if(res.code==1){
                      this.showtitle(res.msg).then(res=>{
                      this.$router.push('/visit')
                  })
                  }else{
                      this.showtitle(res.msg)
                  }
              })
            }
            
        }
      }
  }
  </script>
  
  <style lang="scss" scoped>
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
          position: fixed;
          bottom: 60px;
          display: flex;
          width: 100%;
          justify-content: center;
          color: white;  
          .btn{
             background-color: rgb(5,129,253);
             border-radius: 5px;
             padding: 5px 65px;
          }
       }
  </style>