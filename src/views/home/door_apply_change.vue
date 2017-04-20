<template>
  <div>
    <div id="header" class="doctor_header">
      <div class="header_Left" @click="return_before()"><p></p></div>
      <div class="header_center font18">改派申请</div>
      <div class="header_right"></div>
    </div>
    <div id="container">
      <p class="gray_title">如果预约时间内不能提供上门服务，请在此申请改派其他医生、护士或技师</p>
      <div class="info_item" id="apply_info">
        <div class="flex_cont flex_simple order_num">订单编号<p class="flex_item paragraph right_txt">{{item.orderNum}}</p></div>
        <div class="flex_cont flex_simple">服务项目<p class="flex_item paragraph right_txt">{{item.product.name}}</p></div>
      </div>
      <p class="gray_title">改派原因</p>
      <div class="change_why">
        <textarea v-model="message"></textarea>
      </div>
    </div>
    <div class="padding">
      <!--<router-link :to="{path:'/door_service_track',query: {id:item.id}}">-->
        <button class="btn btn_block font16" v-on:click="submit(item.doctorId)">提交</button>
      <!--</router-link>-->
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return{
        item:'',
        imgUrl : urlWay.fileserver,
        headImg:'/kybabyBG/admin/images/userFaceIcon/lt_user.png'
      }
    },
    created: function () {
      this.orderId = this.$route.query.id;
    },
    mounted:function(){
      var that = this;
  var id = this.orderId;
  var whoLoginFlag=sessionStorage.getItem('whoLoginFlag');
  console.log(whoLoginFlag);
  this.$ajax.post(urlWay.orderHost + 'orderChangeRecord.action?whoLoginFlag='+whoLoginFlag,
    'action=getOrderInfoDataByOrderInfoId&orderInfo.id='+id)
    .then(function(res){
      that.item = res.data.orderInfo;
    })
  },
  methods: {
      submit:function(doctorInfoId){
        var text = this.message;
        if(text==''||text==null||text==undefined){
          alert("请填写改派申请");
          return;
        };
        var that = this;
        var id = this.orderId;
        this.$ajax.post(urlWay.orderHost + 'orderChangeRecord.action?whoLoginFlag=doctor',
            'action=saveOrderChangeRecord&orderChangeRecord.orderInfo.id='+id+'&' +
            'orderChangeRecord.oldDoctorId='+doctorInfoId+'&orderChangeRecord.applicationReason='+text)
          .then(function(res){
            that.content = res.data;
            window.history.back();
          })
      }
    }
  }
</script>
<style scoped>
  #container {
    margin: 45px 0 50px 0;
  }
  .padding{
    padding: 40px 40px 20px 40px;
  }
  .change_why{
    background: #fff;
    padding: 10px 24px;
  }
  .change_why>textarea{
    border: none;
    resize: none;
    width: 100%;
    height: 80px;
    outline: none;
    line-height: 24px;
  }
  .gray_title {
    color: #9a9a9a;
    padding: 8px 24px;
  }
  .info_item {
    padding: 0 20px;
    line-height: 50px;
    background: #fff;
  }
  .order_num{
    border-bottom: 1px solid #eee;
  }
  .info_item>div {
    padding: 0 6px;
  }
  .right_txt {
    margin-right: 20px;
    text-align: right;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
  }
</style>
