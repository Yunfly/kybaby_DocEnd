<template>
  <div class="bgfff">
    <div id="header" class="doctor_header">
      <div class="header_Left" v-on:click="return_before()"><p></p></div>
      <div class="header_center font18">积分兑现</div>
      <div class="header_right"></div>
    </div>
    <div id="container_full" class="bgfff">
      <p class="takebalance_input"><input type="text" placeholder="请输入兑现积分" id="pointNum"></p>
      <p class="gray_3"></p>
      <p class="takebalance_note" style="color: yellowgreen">注：积分需要达到500以上才可兑换</p>
    </div>
    <div id="footer" @click="takePoint">
      <div class="btn_box">
        <button type="submit" id="cbUserAgreement" class="btn btn_block font16">提交</button>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery';
  import ale from '../../ale.js';
  import common from '../../public/js/common';
  export default {
    data(){
      return {

      }
    },
    components:{

    },
    created:function(){

    },
    mounted:function() {

    },
    methods:{
      takePoint:function(){
        var _this=this;
        if($("#pointNum").val()==""||$("#pointNum").val()==null){
          ale("请输入兑换积分数");
        }
        else{
          $.ajax({
            type : 'post',
            async: false ,
            url : host+'accountManage.action',
            data : {action:"takePoint",takePoint:$("#pointNum").val()},
            success : function(result) {
              if(result.mes=="积分小于500"){
                ale(result.mes);
              }
              if(result.mes=="积分不足"){
                ale(result.mes);
              }
              if(result.mes=="不是100的倍数"){
                ale("输入积分数为100的倍数");
              }
              if(result.mes=="成功"){
                common().return_before();
              }
              if(result.mes=="请登录"){
                _this.$router.push('/login');
              }
            }
          });
        }
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
  /*余额提现 积分兑现 takebalance takepoint*/
  .takebalance_input {
    width: 80%;
    padding: 0 10%;
    margin-top: 10px;
    background: #fff;
    height: 50px;
    line-height: 50px;
  }
  .takebalance_input input {
    width: 100%;
    border: none;
  }
  .takebalance_note {
    width: 90%;
    margin: 0 auto;
    font-size: 0.75em;
    padding-top: 10px;
  }

</style>
