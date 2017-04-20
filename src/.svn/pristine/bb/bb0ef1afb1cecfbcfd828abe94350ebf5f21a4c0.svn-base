<template>
  <div class="bgfff">
    <div id="header" class="doctor_header">
      <div class="header_Left" v-on:click="return_before()"><p></p></div>
      <div class="header_center font18">选择服务地址</div>
      <div class="header_right">
        <!--<span @click="delResource" class="delResource hidden">删除</span>-->
      </div>
    </div>
    <div id="container_full" class="bgfff">
      <div class="info_item">
        <div class="right_arrow flex_cont flex_simple">上门类型<p class="flex_item small_gray right_txt"
                                                              id="door_server_type">请选择</p></div>
        <div class="right_arrow flex_cont flex_simple">出发地址<p class="flex_item small_gray right_txt"
                                                              id="door_server_address"
                                                              @click="chooseAddress">请选择</p></div>
        <div class="right_arrow flex_cont flex_simple">服务日期<p class="flex_item small_gray right_txt"
                                                              id="door_server_date">请选择</p></div>
      </div>
      <p class="gray_title">选择服务时间</p>
      <div id="server_time">

      </div>
    </div>
    <!--footer-->
    <div id="footer">
      <div class="btn_box">
        <button type="submit" @click="saveOpenTime" id="cbUserAgreement" class="btn btn_block font16">保存</button>
      </div>
    </div>
    <!--layer-->
    <div id="layer_box">
      <div id="layer_div">
        <div id="door_type">
          <p class="layer_title">上门类型</p>

          <div>
            <div class="layer_list" data-id="0">
              <ul>

              </ul>
            </div>
          </div>
        </div>
        <div id="door_server_time">
          <p class="layer_title">服务时间</p>
          <div>
            <div class="layer_list" data-id="1">
              <ul>
                <li data-week="周一">周一</li>
                <li data-week="周二">周二</li>
                <li data-week="周三">周三</li>
                <li data-week="周四">周四</li>
                <li data-week="周五">周五</li>
                <li data-week="周六">周六</li>
                <li data-week="周日">周日</li>
              </ul>
              <p class="sure bottom_button">确定</p>
            </div>
          </div>
        </div>
        <div id="door_server_hours">
          <p class="layer_title">选择时间</p>

          <div>
            <div class="layer_list" data-id="2">
              <ul>

              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import '../../public/css/door_bespeak_open/door_server.css';
  import '../../public/css/door_bespeak_open/door_server_address.css';
  import $ from 'jquery';
  import doorServerAddress from '../../public/js/door_bespeak_open/door_server_address';
  export default {
    data(){
      return {
        serverAddress:null
      }
    },
    mounted:function (){
      var _this=this;
      _this.serverAddress=doorServerAddress(_this.$route.params);
      var s=_this.serverAddress;
      s.getProductList();
    },
    methods:{
      chooseAddress:function (){
        this.serverAddress.chooseAddress();
      },
      saveOpenTime:function (){
        this.serverAddress.saveOpenTime();
      },
      delResource:function (){
        this.serverAddress.delResource();
      }
    }

  }
</script>

<style scoped>
  #footer {
    padding-top: 0;
    height: 45px;
    background: #f8f8f8;
  }
  .btn_box {
    padding: 0 40px;
  }
  .hidden {
    display: none;
  }

</style>

