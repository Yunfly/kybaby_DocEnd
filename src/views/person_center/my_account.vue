<template>
  <div id="my_account">
    <div id="header" class="doctor_header">
      <div class="header_Left" v-on:click="return_before()"><p></p></div>
      <div class="header_center font18">我的账户</div>
    </div>

    <div id="container">
      <div class="account_list flex_cont">
        <div>
          <img src="../../public/img/person_center/rest_money.png" height="45" width="54"/>
          <span>余额</span>
        </div>
        <router-link to="/my_account/balance" class="flex_item">
          <div class="text-right">
            <span class="col9a">{{balance}} 元</span>
            <!--<div class="header_Right" ><p></p></div>-->
          </div>
        </router-link>
        <!--<div class="cf"></div>-->
      </div>
      <div class="account_list flex_cont">
        <div>
          <img src="../../public/img/person_center/jifen.png" height="45" width="54"/>
          <span>积分</span>
        </div>
        <router-link to="/my_account/point" class="flex_item">
          <div class="text-right">
            <span class="col9a">{{point}} 分</span>
            <!--<div class="header_Right" onclick=""><p></p></div>-->
          </div>
        </router-link>
        <!--<div class="cf"></div>-->
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    name:'about_us',
    data(){
      return{
        balance:'',
        point:''
      }
    },
    mounted:function(){
      var that = this
      this.$ajax.post(host+'accountManage.action','action=all')
        .then(function(result){
          that.balance = result.data.balance
          that.point = result.data.point

        })
    }
  }
</script>
<style scoped>
  body{
    background: #f8f8f8;
  }
  #container {
    margin: 45px 0 50px 0;
    background-color: #fff;
  }
  .account_list{
    height: 47px;
    border-bottom: 1px solid #eee;
    margin: 0px 18px;
    padding: 0 12px 0 6px;
    line-height: 48px;
    background: url(../../public/img/right.png) no-repeat right 6px center;
    background-size: 9px;
  }
  .account_list:last-child{
    border:none;
  }
  .account_list span{
    padding:0 10px;
  }
  .account_list .float-right{
    /*width:46%;*/
  }
  .account_list img{
    width:18px;
    height:auto;
    vertical-align: -3px;
  }
  .gray_3{ margin-top:10px;}
</style>
