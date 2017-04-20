<template>
  <div>
    <div id="header" class="doctor_header">
      <div class="header_Left" @click="return_before()"><p></p></div>
      <div class="header_center font18">服务跟踪</div>
      <div class="header_right"></div>
    </div>
    <div id="container">
      <div id="progress_bar">
        <div class="flex_cont flex_simple">
          <div class="flex_item green_now">出发<span></span></div>
          <div class="flex_item gray_before">开始服务<span></span></div>
          <div class="flex_item gray_before">服务中<span></span></div>
          <div class="flex_item gray_before">健康教育<span></span></div>
          <div class="flex_item gray_before">服务完成<span></span></div></div>
      </div>
      <div id="div1">

      </div>
      <div id="div2">

      </div>
      <div id="div3">

      </div>
      <div id="div4">

      </div>
      <!--<div id="div5">-->
        <!--<div id="result_error">-->
          <!--<img src="images/org_huaxi/successful.png" alt=""/>-->
          <!--<p id="result_state"></p>-->
        <!--</div>-->
      <!--</div>-->
      <!--<p id="button_one" class="big_button big_btn_style">确认出发</p>-->
      <p id="button_two" class="big_button"></p>
    </div>
    <footer id="footer_btn">
      <p id="big_button"></p>
    </footer>
  </div>
</template>
<script>
  import '../../public/css/door_bespeak_open/door_server.css';
  import doorServiceTrack from '../../public/js/door/doo_service_track';
  export default {
    data(){
      return{
        serviceTrack:null,
        orderId:null
      }
    },
    created: function () {
      this.orderId = this.$route.query.id;
    },
    mounted:function (){
      var _this=this;
      _this.serviceTrack=doorServiceTrack(_this.orderId);
      _this.serviceTrack.getOperatorFlowNodeInfo();
    },
    methods:{

    }
  }
</script>
<style scoped>
  #progress_bar span{
    display: inline-block;
    width: 10px;
    height: 10px;
    position: absolute;
    bottom: -7px;
    left: -1px;
  }
  #progress_bar>div>div{
    padding: 6px 0;
    position: relative;
    color: #858585;
    font-size: 12px;
  }
  #progress_bar{
    padding: 8px 18px;
  }
  .green_now,.gray_before{
    border-bottom: 4px solid #E3E3E3;
    transition: .5s;
  }
  .green_after{
    border-bottom: 4px solid #13b9d7;
    transition: .5s;
  }
  #progress_bar>div>div:last-child {
    border-bottom: 4px solid #f4f4f4;
  }
  #progress_bar .green_now>span{
    bottom: -8px;
    width: 12px;
    height: 12px;
    background: url('../../public/img/door/sever_now.png')no-repeat left center;
    background-size: 12px;
  }
  #progress_bar .gray_before>span{
    background: url('../../public/img/door/sever_before.png')no-repeat left center;
    background-size: 10px;
  }
  #progress_bar .green_after>span{
    background: url('../../public/img/door/sever_after.png')no-repeat left center;
    background-size: 10px;
  }
  #div2,#div3,#div4,#div5,#button_two{
    display: none;
  }
  #div2{
    padding-top: 15px;
  }
  #div3,#div4{
    padding: 10px 28px;
  }
  #button_two{
    margin-top: 10px;
    background: #f4f4f4;
    border: 1px solid #13b9d7;
    color: #13b9d7;
  }
</style>
