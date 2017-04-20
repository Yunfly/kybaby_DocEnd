
<template>
  <div>
    <div id="header" class="doctor_header">
      <div class="header_Left" v-on:click="return_before()"><p></p></div>
      <div class="header_center font18">设置</div>
    </div>
    <div id="container_full" class="bgfff">
      <ul class="font12 config_list">
        <router-link to="/config/change_phone">
          <li>
            <span>修改手机号</span>
            <!--<div class="header_Right" onclick=""><p class="float-right"></p></div>-->
          </li>
        </router-link>
        <li>
          <span>客服电话</span>
          <p class="text-right">400-0122-149</p>
          <!--<div class="header_Right" onclick=""><p class="float-right"></p></div>-->
        </li>
        <router-link to="/config/change_password">
          <li>
            <p>修改密码</p>
            <!--<div class="header_Right" onclick=""><p class="float-right"></p></div>-->
          </li>
        </router-link>
        <router-link to="/config/feedback">
          <li>
            <p>意见反馈</p>
            <!--<div class="header_Right" onclick=""><p class="float-right"></p></div>-->
          </li>
        </router-link>
        <router-link to="/config/about_us">
          <li>
            <p>关于我们</p>
            <!--<div class="header_Right" onclick=""><p class="float-right"></p></div>-->
          </li>
        </router-link>
        <li>
          <p>版本信息</p>
          <p class="text-right">1.1</p>
          <!--<div class="header_Right" onclick=""><p class="float-right"></p></div>-->
        </li>
      </ul>
    </div>

    <div id="quick_btn">
      <div @click="orgOutLogin">
        <button type="submit" class="btn btn_block font16">切换账户</button>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return{

      }
    },
    methods:{
      orgOutLogin:function(){
        var _this=this;
        _this.$ajax.post(urlWay.orgBusinessHost+'orgLogin.action','action=orgOutLogin')
          .then(function (result) {
            _this.$router.push({path:'/login'});
        });
      }
    }
  }
</script>
<style scoped>
  .container_full{
    margin-top:0;
  }
  .config_list li:hover{
    background-color: #eee;
  }
  .text-right{
    float:right;
    margin-right: 18px;
    color: #9a9a9a;
  }
  .config_list li p:nth-child(1){
    width:25%;
    display: inline-block;
  }
  .config_list li p:nth-child(2){
    width:55%;
    display: inline-block;
  }
  /*.header_Right{*/
    /*width: 10%;*/
    /*float: right;*/
    /*color: #c8c8c8;*/
  /*}*/
  /*.header_Right p {*/
    /*background: url(../../public/img/right.png) no-repeat;*/
    /*background-size: 100% 100%;*/
    /*width: 9px;*/
    /*height: 13px;*/
    /*position: relative;*/
    /*top: 17px;*/
  /*}*/
  .config_list li{
    line-height: 48px;
    height:48px;
    border-bottom:1px solid #eee;
    padding:0 6px;
    background: url(../../public/img/right.png) no-repeat right 6px center;
    background-size: 8px;
  }
  #quick_btn{
    position: fixed;
    width:100%;
    background-color: #f8f8f8;
    height:44px;
  }
  #quick_btn div{
    width:85%;
    margin:0 auto;
  }
  ul>li:last-child{
    border-bottom: 0;
  }
  .config_list{
    padding: 0 18px;
  }
</style>
