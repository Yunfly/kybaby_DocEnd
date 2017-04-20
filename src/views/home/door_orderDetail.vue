<template>
  <div>
    <div id="header" class="doctor_header">
      <div class="header_Left" v-on:click="return_before()"><p></p></div>
      <div class="header_center">订单详情</div>
      <div class="header_right"></div>
    </div>
    <div id="container">
      <div id="order_state">{{item.orderStatus}}</div>
      <div id="pack_info" class="flex_cont flex_simple">
        <img :src="item.consultBabyInfo.headImg?(imgUrl+ item.consultBabyInfo.headImg):(imgUrl+headImg)"/>
        <p class="flex_item">
          <span id="pack_name">{{item.product.name}}</span><br>
        </p>
      </div>
      <div class="info_item">
        <div id='user_door_info'>
          <p>{{item.contactName}}<span id="user_phone">{{item.contactPhone}}</span></p>
          <p id="user_address">地址：{{item.contactDetailAddress}}</p>
        </div>
        <div class="flex_cont">上门时间<p class="flex_item details_info">{{item.bespokeDate}}  {{item.bespokeTime}}</p></div>
        <div class="flex_cont">服务对象<p class="flex_item details_info">{{item.consultBabyInfo.babyName}}</p></div>
      </div>
    </div>
    <!--<footer id="footer_btn">-->

    <!--</footer>-->
    <footer v-show="!((item.orderStatus=='已派单' && !(timeDifference(item.bespokeDate+' '+item.bespokeTime.substr(0,5)+':00',currentTime)) && item.orderChangeRecord=='已申请')||item.orderStatus.indexOf('取消')>-1)">
      <ul class="flex_cont" v-if="item.orderStatus=='已派单' && (timeDifference(item.bespokeDate+' '+item.bespokeTime.substr(0,5)+':00',currentTime)) && item.orderChangeRecord!='已申请'">
        <li class="flex_item" v-on:click="change(item.id)">
          <p>改派申请</p>
        </li>
        <li class="flex_item">
          <router-link :to="{path:'/door_health_records',query: {id:item.id}}">
            <p>查看档案</p>
          </router-link>
        </li>
        <li class="flex_item">
          <router-link :to="{path:'/door_service_track',query: {id:item.id}}">
            <p>服务跟踪</p>
          </router-link>
        </li>
      </ul>
      <ul class="flex_cont" v-else-if="(item.orderStatus=='已派单' && !(timeDifference(item.bespokeDate+' '+item.bespokeTime.substr(0,5)+':00',currentTime)) && item.orderChangeRecord!='已申请')||item.orderStatus=='服务中'">
        <li class="flex_item">
          <router-link :to="{path:'/door_health_records',query: {id:item.id}}">
            <p>查看档案</p>
          </router-link>
        </li>
        <li class="flex_item">
          <router-link :to="{path:'/door_service_track',query: {id:item.id}}">
            <p>服务跟踪</p>
          </router-link>
        </li>
      </ul>
      <ul class="flex_cont" v-else-if="item.orderStatus=='已派单' && (timeDifference(item.bespokeDate+' '+item.bespokeTime.substr(0,5)+':00',currentTime)) && item.orderChangeRecord=='已申请'">
        <li class="flex_item" v-on:click="change(item.id)">
          <p>改派申请</p>
        </li>
      </ul>
      <ul class="flex_cont" v-else-if="(item.orderStatus=='已派单' && !(timeDifference(item.bespokeDate+' '+item.bespokeTime.substr(0,5)+':00',currentTime)) && item.orderChangeRecord=='已申请')||item.orderStatus.indexOf('取消')>-1"></ul>
      <ul class="flex_cont" v-else>
        <li class="flex_item">
          <router-link :to="{path:'/door_service_track',query: {id:item.id}}">
            <p>服务跟踪</p>
          </router-link>
        </li>
      </ul>
    </footer>
  </div>
</template>
<script>
  export default{
    data(){
      return{
        item:'',
        imgUrl : urlWay.fileserver,
        headImg:'/kybabyBG/admin/images/userFaceIcon/lt_user.png',
        currentTime:'',
      }
    },
    created: function () {
      this.orderId = this.$route.query.id;
      this.currentTime=new Date();
    },
    mounted:function(){
      var that = this;
      var id = this.orderId;
      this.$ajax.post(urlWay.orderHost + 'orderChangeRecord.action?whoLoginFlag=doctor',
          'action=getOrderInfoDataByOrderInfoId&orderInfo.id='+id)
        .then(function(res){
          that.item = res.data.orderInfo;
        })
    },
    methods: {
      change:function(id){
        var that = this;
        this.$ajax.post(urlWay.orderHost + 'orderChangeRecord.action?whoLoginFlag=doctor',
            'action=getOrderChangeRecordByDoctorId&orderInfo.id='+id)
          .then(function(res){
            that.content = res.data;
            if(that.content.mes == "成功") {
              if (that.content.orderChangeRecordList == null) {
                return;
              }else{
                if(that.content.orderChangeRecordList.length==0 || that.content.orderChangeRecordList[0].status=="已关闭"){
                  that.url = '/door_apply_change';
                }else if(that.content.orderChangeRecordList[0].status=="已申请"){
                  that.url = '/door_reassign_record';
                }
              }
              that.$router.push({path:that.url,query:{id:id}});
            }else if(that.content.mes == "已超时"){
              alert('上门前4小时内不能发起改派');
            }
          })
      },
      timeDifference:function(orderTime,now){//服务时间与当前时间差
        var startTime=new Date(orderTime);
        var difference=(startTime.getTime()-now.getTime())/3600000;
        if(difference<4){
          return false;
        }
        return true;
      }
    }
  }
</script>
<style scoped>
  footer{
    padding: 14px 0;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    text-align: center;
    box-shadow: 1px 1px 5px 2px rgba(0,0,0,.1);
    color: #23c9e7;
  }
  footer a{
    color: #23c9e7;
  }
  footer li{
    border-right:1px solid #eee;
  }
  #container {
    margin: 45px 0 50px 0;
  }
  .padding{
    padding: 40px 40px 20px 40px;
  }
  #order_state{
    margin-left: 24px;
    padding-left: 24px;
    height: 43px;
    background: url(../../public/img/door/order_status.png)no-repeat left center;
    background-size: 18px;
    line-height: 43px;
    color: #9a9a9a;
    font-size: 13px;
  }
  #pack_info{
    padding: 12px 24px;
    background: #fff;
    margin-bottom: 8px;
  }
  #pack_info>img{
    width: 50px;
    height: 50px;
  }
  #pack_name,#user_phone,#pack_name{
    margin-left: 10px;
  }
  #user_phone,#user_address{
    color: #9a9a9a;
  }
  #user_door_info{
    padding: 10px 6px;
    line-height: 1.6;
  }
  .info_item{
    padding: 0 18px;
    line-height: 40px;
    background: #fff;
  }
  .info_item>div{
    padding: 0 6px;
    border-bottom: 1px solid #e8e8e8;
  }
  .info_item>div:last-child{
    border-bottom: 0px;
  }
  .details_info{
    text-align: right;
  }
  /*#choose_user{*/
  /*color: #9a9a9a;*/
  /*margin-right: 20px;*/
  /*font-size: 12px;*/
  /*}*/
  /*#footer.balance_footer {*/
  /*background: url(../../public/img/door/main_foot.png)no-repeat center;*/
  /*background-size: 100% 100%;*/
  /*text-align: center;*/
  /*color: #1CBA93;*/
  /*padding: 5px 0 2px;*/
  /*}*/
  /*.left_border {*/
  /*border-right: 1px solid #e8e8e8;*/
  /*}*/
</style>
<!--<script src="js/modernizr-2.8.3.min.js"></script>-->
<!--<script src="js/jquery-2.1.3.js"></script>-->
<!--<script src="js/config.js"></script>-->
<!--<script src="js/main.js"></script>-->
<!--<script src="js/plugins.js"></script>-->
<!--<script src="js/door_order_details.js"></script>-->

