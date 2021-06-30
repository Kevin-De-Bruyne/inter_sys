<template>
  <div class="sp_detail">
      <template v-if="detail.status==2">
      <Header title="详情"/>
      <div class="content">
          <div class="top">
            <div class="title">拜访单位：{{detail.interview_unit}}</div>
            <div class="detail">楼层：{{detail.interview_floor}}</div>
            <div class="detail">办公室：{{detail.interview_office}}</div>
          </div>
          <div class="center">
            <div class="detail">访客：{{detail.interview_realname}}</div>
            <div class="detail">电话：{{detail.interview_mobile}}</div>
            <div class="detail">部门：{{detail.department}}</div>
          </div>
          <div class="bottom">
            <div class="detail">申请时间：{{detail.created_at}}</div>
            <div class="detail">拜访时间：{{detail.apply_time}}</div>
            <div class="detail">来访人：{{detail.realname}}</div>
            <div class="detail">来访人数：{{detail.together}}</div>
          </div>
          <div style="text-align:left;font-size:15px;margin-top:10px;">{{status_text}}</div>
      </div>
      </template>

        <template v-if="detail.status==1">
      <Header title="详情"/>
      <div class="content">
          <div class="top">
            <div class="title">拜访单位：广州慧鼎科技有限公司</div>
            <div class="detail">楼层：18楼</div>
            <div class="detail">办公室：1809号</div>
          
          <div class="detail">访客：{{detail.interview_realname}}</div>
          <div class="detail">电话：{{detail.interview_mobile}}</div>
          <div class="detail">部门：{{detail.department}}</div>
          <div class="detail">开始时间：{{detail.start_time}}</div>
          <div class="detail">结束时间：{{detail.end_time}}</div>
          <div class="detail">来访人：{{detail.realname}}</div>
          <div class="detail">来访人数：{{detail.together}}</div>
          <!-- <div class="qrcode">
            <vue-qr  :text="JSON.stringify(qrcode)" :size="250"></vue-qr>
          </div> -->
           <div style="text-align:left;font-size:15px;margin-top:10px;">{{status_text}}</div>
          </div>
      </div>
      </template>

       <template v-if="detail.status==0">
      <Header title="详情"/>
      <div class="content">
          <div class="top">
            <div class="title">拜访单位：{{detail.interview_unit}}</div>
            <div class="detail">楼层：{{detail.interview_floor}}</div>
            <div class="detail">办公室：{{detail.interview_office}}</div>
          </div>
          <div class="center">
            <div class="detail">访客：{{detail.interview_realname}}</div>
            <div class="detail">电话：{{detail.interview_mobile}}</div>
            <div class="detail">部门：{{detail.department}}</div>
          </div>
          <div class="bottom">
            <div class="detail">申请时间：{{detail.created_at}}</div>
            <div class="detail">拜访时间：{{detail.apply_time}}</div>
            <div class="detail">来访人：{{detail.realname}}</div>
            <div class="detail">来访人数：{{detail.together}}</div>
          </div>
         <div class="review">
           <div class="refuse" @click="refuse">拒绝预约</div>
           <div class="agree" @click="show=true">同意预约</div>
         </div>
      </div>
        <van-popup v-model="show"  position="bottom">
         <van-datetime-picker
           v-model="currentDate"
          type="datetime"
          title="选择开始时间"
          :min-date="minDate"
          :max-date="maxDate"
          @confirm="confirm"
        />
        </van-popup>
        <!-- -----------结束时间弹窗 -->
        <van-popup v-model="show2"  position="bottom">
         <van-datetime-picker
           v-model="currentDate"
          type="datetime"
          title="选择结束时间"
          :min-date="minDate"
          :max-date="maxDate"
          @confirm="confirm2"
        />
        </van-popup>
      </template>

      <template v-if="detail.status==3">
      <Header title="详情"/>
      <div class="content">
          <div class="top">
            <div class="title">拜访单位：{{detail.interview_unit}}</div>
            <div class="detail">楼层：{{detail.interview_floor}}</div>
            <div class="detail">办公室：{{detail.interview_office}}</div>
          </div>
          <div class="center">
            <div class="detail">访客：{{detail.interview_realname}}</div>
            <div class="detail">电话：{{detail.interview_mobile}}</div>
            <div class="detail">部门：{{detail.department}}</div>
          </div>
          <div class="bottom">
            <div class="detail">申请时间：{{detail.created_at}}</div>
            <div class="detail">拜访时间：{{detail.apply_time}}</div>
            <div class="detail">来访人：{{detail.realname}}</div>
            <div class="detail">来访人数：{{detail.together}}</div>
          </div>
          <div style="text-align:left;font-size:15px;margin-top:10px;">{{status_text}}</div>
      </div>
      </template>
  </div>
</template>

<script>
import vueQr from 'vue-qr'
import Header from 'components/header'
import {Dialog} from 'vant'
export default {
 data(){
     return{
       type:'',
       id:'',
       detail:{},
       status_text:'',
       status:'',
       show:false,
       show2:false,
       minDate: new Date(2020, 0, 1),
       maxDate: new Date(2025, 10, 1),
       currentDate: new Date,
       formDate:'',
       formDate2:'',
       imageUrl: require("../assets/home_icon.png"),
       qrcode:{}
     }
 },
 components:{
     Header,
     vueQr
 },
 created(){
    this.dataRefreh();
 },
 destroyed(){
    // 在页面销毁后，清除计时器
    this.clear();
},
 mounted(){
   this.initData()
   console.log(new Date().getTime())
   this.type=this.$route.query.index
   this.id=this.$route.query.id
   this.getDetail()
 },
 methods:{
   // 定时刷新数据函数
   initData(){
      this.qrcode={
     codeID:this.$route.query.id,
     codeTime:new Date().getTime()
   }
   },
    dataRefreh() {
      // 计时器正在进行中，退出函数
      if (this.intervalId != null) {
        return;
      }
      // 计时器为空，操作
      this.intervalId = setInterval(() => {
        console.log("刷新" + new Date());
        this.initData(); //加载数据函数
      }, 60000);
    }, 
    // 停止定时器
    clear() {
      clearInterval(this.intervalId); //清除计时器
      this.intervalId = null; //设置为null
    },
    refuse(){
      Dialog.confirm({
         title: '',
         message: '你确定要拒绝申请吗',
     })
     .then(() => {
      // on confirm
       let header={
         'apply-secret':this.sercet
        }
       let data={
            guest_id:this.id,
            status:2
        }
         this.$post('/api/client/check',data,header).then(res=>{
             if(res.code==1){
               this.showtitle('已拒绝！').then(res=>{
                 this.$router.go(-1)
               })
             }
          })
     })
     .catch(() => {
     // on cancel
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
          console.log(formDate)
          this.formDate=formDate
          this.show=false
          this.show2=true
      },
      confirm2(e){
           let header={
           'apply-secret':this.sercet
            } 
          console.log(e)
          let year=e.getFullYear()
          let month=e.getMonth()+1
          let day=e.getDate()
          let hour=e.getHours()
          let minute=e.getMinutes()
          let second=e.getSeconds()
          console.log(year,month,day,hour,minute,second)
          let formDate=year+'-'+(month<10?'0'+month:month)+'-'+(day<10?'0'+day:day)+' '+(hour<10?'0'+hour:hour)+':'+(minute<10?'0'+minute:minute)
          console.log(formDate)
          this.formDate2=formDate
          this.show2=false
           let data={
            guest_id:this.id,
            status:1,
            start_time:this.formDate,
            end_time:this.formDate2
          }
          this.$post('/api/client/check',data,header).then(res=>{
             if(res.code==1){
               this.showtitle('审核成功').then(res=>{
                 this.$router.go(-1)
               })
             }
          })
      },
   getDetail(){
     this.$get('/api/client/checkdetail/'+this.id).then(res=>{
       this.detail=res.data
       if(this.detail.status==0){
         this.status_text='审批中'
       }else if(this.detail.status==1){
         this.status_text='已通过'
       }else if(this.detail.status==2){
         this.status_text='被驳回'
       }else if(this.detail.status==3){
         this.status_text='已失效'
       }
     })
   }
 }
}
</script>

<style lang="scss" scoped>
    .content{
        padding: 50px 20px; 
        .qrcode{
            margin-top: 15px;
            width:100%;
            height: 200px;
            display: flex;
            justify-content: center;
        }
        .top{
            line-height: 25px;
            text-align: left;
        }
        .title{
            font-size: 14px;
            font-weight: bold;
        }
        .detail{
            font-size: 11px;
            color: rgb(152,141,141);
        }
        .center{
            margin-top: 15px;
            line-height: 25px;
            text-align: left;
        }
          .bottom{
            margin-top: 15px;
            line-height: 25px;
            text-align: left;
        }
        .review{
          display: flex;
          justify-content: space-around;
          color: rgb(144,215,143);
          margin-top: 20px;
          .agree{
            padding: 7px 30px;
            border: 2px solid rgb(144,215,143);
            border-radius: 7px;
          }
           .refuse{
            padding: 7px 30px;
             border: 2px solid rgb(144,215,143);
             border-radius: 7px;
          }
        }
    }
</style>