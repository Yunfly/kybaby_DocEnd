<template>

  <div  class="bgfff">
    <div id="header" class="doctor_header">
      <div class="header_Left" v-on:click="$router.push('/index')"><p></p></div>
      <div class="header_center font18">儿保订单</div>
      <div class="header_right">
        <div class="more_btn"></div>
      </div>
      <div class="cf"></div>
      <div class="order_btn">
        <div><router-link to="/outpatient_order">儿科订单</router-link></div>

        <div class="active"><router-link to="/his_order">儿保订单 </router-link></div>
      </div>
      <div>
        <nav class="flex_cont font12">
          <div class="tag_menu flex_item" v-on:click="setStatus('全部',true,0)">全部</div>
          <div class="tag_menu flex_item" v-on:click="setStatus('已预约','',1,'已会面')">已预约</div>
          <div class="tag_menu flex_item" v-on:click="setStatus('已完成','',2)">已完成</div>
          <div class="tag_menu flex_item" v-on:click="setStatus('用户取消','',3)">已取消</div>
        </nav>
        <div class="content_tab_box flex_cont">
          <div class="content_center tab_logo_box"  v-bind:style="{ marginLeft:idx*25+'%' }">
            <div class="tab_logo"></div>
          </div>
        </div>
      </div>
    </div>
    <div id="container_full" class="bgfff">

      <section>
        <ul id="all_list" class="list_box">
          <li v-for="item in orders" :attr="item.status"  v-show="showAll || (item.status==statusNOW)||item.status==statusElse">
            <div class="flex_cont">
              <div class="head_img flex_item">
                <img  v-bind:src=imgUrl+item.userInfo.userImage />
                <p class="font10">{{item.userInfo.babyName}}</p>
              </div>
              <div class="flex_item flex_simple">
                <p class="li_date font10 ">门诊日期 : <span>{{item.operationTime.substring(0,10)}}</span></p>
                <p class="li_time font10">{{item.operationTime.substring(10,19)}}</p>
                <p class="li_address font10 ">{{item.hospitalBasicInfo.address}}</p>
              </div>
              <div class="flex_item flex_simple">
                <p class="li_type font10 ">{{ item.payMethod=="余额支付" ? '普通用户' : '签约用户' }}</p>
              </div>
            </div>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>
<script>
  // require('../../public/css/animate.css')
   import $j from 'jquery'
  export default{
    data(){
      return{
        orders:'',
        showAll:false,
        statusNOW:'全部',
        statusElse:'',
        idx:0,
        imgUrl : urlWay.fileserver,
      }
    },
    created: function () {
      // 页面加载时跳转
      // this.loading();
    },
    activated:function(){
       this.getMsg()
    },
    mounted:function(){

    },
    methods: {
        getMsg:function(){
          var that = this
          this.$ajax.post(urlWay.fdmanageHost+'fdService.action','action=getChildcareOrderList')
            .then(function(result){
              that.orders = result.data.userChildcareAppointmentInfoList;
              that.setStatus('全部',true);
            })
            .catch(function (error) {
              console.log(error);
            });
        },
      setStatus(st,flag,index,statusElse){
        this.showAll = flag?true:false;
        this.statusNOW = st;
        this.idx = index;
        this.statusElse = statusElse;
      }
      }
    }
</script>
<style scoped>
  body{
    background: #f4f4f4;
  }
  nav{
    padding: 12px 0 4px;
    text-align: center;
  }
  .li_type{
    color: #0eced4;
  }
  .order_btn div a{ color:#fff}
  .active a{
    color: #0eced4!important;
  }
  .li_address,.li_time{
    color: #9a9a9a;
  }
  section>ul{
    border-radius: 3px;
    box-shadow: 0px 0px 6px 0px rgba(225,225,225,0.3);
    background: #fff;
  }
  section li{
    padding: 15px 6px;
    border-bottom: 1px solid #eee;
    line-height: 20px;
  }
  section li:last-child{
    border-bottom: 0;
  }
  nav{
    color: #9a9a9a;
  }
  nav>div.selected{
    color: #13b9d7;
    /*font-size: 1.6rem;*/
  }
  /*三角形*/
  .tab_logo {
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid #ffffff;
    text-align: center;
  }
  .tab_logo_box {
    width: 25%;
    transition-delay: 0.24s;
    transition: all 0.4s;
  }
  .content_center {
    display: -webkit-box;
    -webkit-box-align: center;
    -webkit-box-pack: center;
  }
  #reservation_list,#complete_list,#cancel_list{
    display: none;
  }
  .tab_logo_box {  width:25%;}
  ul li{
    border-bottom:1px solid #eee;
    padding-top:10px;
  }
  #container_full{
    margin-top:183px;
  }
  .doctor_header{
    height:auto!important;
  }
  .order_btn{
    padding-bottom: 10px;
    margin:30px 0;
  }
  .order_btn div{
    display: inline-block;
    padding:5px 10px;
    margin:0;
  }
  .order_btn div:first-child{
    border:1px solid #eee;
    border-top-left-radius: 16px;
    border-bottom-left-radius: 16px;
    margin-right: -2px;
  }
  .order_btn div:last-child{
    border:1px solid #eee;
    border-top-right-radius: 16px;
    border-bottom-right-radius: 16px;
    margin-left: -2px;
  }
  .order_btn .active{
    background-color: #fff;
    color: #0eced4;
  }
  .tag_menu,.select{
    color: #fff;
  }
  .head_img img{
    width: 55px;
    height: 55px;
    border-radius: 50%;
  }
  .head_img p {
    line-height:2.8rem;
  }
  .list_box .flex_cont .flex_item:nth-child(1){
    flex:0 0 30%;
    text-align: center;
  }
  .list_box .flex_cont .flex_item:nth-child(2){
    flex:0 0 50%;
    line-height:2rem;
  }
  .list_box .flex_cont .flex_item:nth-child(3){
    flex:0 0 20%;
  }
</style>
