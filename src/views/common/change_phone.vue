<template>
  <div class="bgf8">
    <div id="header" class="doctor_header">
      <div class="header_Left" v-on:click="return_before()"><p></p></div>
      <div class="header_center font18">修改手机号</div>
    </div>
    <div id="container_full" class="bgf8">
      <div v-show="changePhone" >
        <div class="phone_box">
          <div class="register_list flex_cont flex_simple">
            <div class="font14">手机号 :</div>
            <input type="text" name="original_phone" id="original_phone" class="flex_simple" placeholder="请输入手机号">
          </div>
          <p class="gray_3"></p>
          <div class="register_list flex_cont flex_between flex_simple">
            <div class="font14">验证码 :</div>
            <input type="text" class="flex_simple" id="original_code" placeholder="请输入验证码">
            <button type="button" class="btn " id="get_code" @click="httpPost()">获取验证码</button>
          </div>
          <p class="gray_3"></p>
        </div>

        <div class="register_btn bgf8" >
          <button type="button" id="cbUserAgreement" class="btn btn_block font16" @click="nextStep()" >下一步</button>
        </div>
      </div>
      <div v-show="!changePhone" >
        <div class="phone_box">

          <div class="register_list flex_cont flex_simple">
            <div class="font14">手机号 :</div>
            <input type="text"  id="new_phone" class="flex_simple" placeholder="请输入新手机号">
          </div>
          <p class="gray_3"></p>
          <div class="register_list flex_cont flex_between flex_simple">
            <div class="font14">验证码 :</div>
            <input type="text" class="flex_simple" id="new_code" placeholder="请输入验证码">
            <button type="button" class="btn "  id="get_new_code" @click="newHttpPost()">获取验证码</button>
          </div>
          <p class="gray_3"></p>
        </div>

        <div class="register_btn">
          <button type="button"  class="btn btn_block font16" @click="modifyPhone()" >确定</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import $ from 'jquery'
  import ale from '../../ale'
  export default{
    data(){
      return{
        randomNum:'',
        changePhone:true
      }
    },
    mounted:function () {
      var randomNum=''
    },
    methods:{
      modify:function (){
        var that = this;
        var newPhone = $("#new_phone").val();
        var checkphone = /^1[3|4|5|7|8][0-9]{9}$/;
        if(newPhone==""||newPhone==null){
          ale("请输入手机号");
        } else if(!checkphone.test(newPhone)){
          ale("输入手机号有误");
        }
        else if($("#new_code").val()==""||$("#new_code").val()==null){
          ale("请输入验证码");
        }
        else if($("#new_code").val()!= that.randomNum){
          ale("验证码错误");
        }
        else{
          $.ajax({
            type : 'post',
            async: false ,
            url : host+'modifyPhone.action',
            data : {action:"modifyPhone",newPhone:newPhone},
            success : function(result) {
              //ale(result.mes);
              if(result.mes=="成功"){
                that.$router.push("/login");
              }else{
                ale("请检查您输入的手机号和验证码!");
              }
            }
          });
        }
      },
      numReduce:function (){
        var that = this;
        //发送验证码
        var ttt=60;
        (function num(){
          ttt--;
          if(ttt <= 0){
            ttt = 60;
            $('#get_code').attr('onclick','httpPost()').text('获取验证码').css({'backgroundColor':'#50c1e9','pointer-events':'auto'});
          }else{
            $('#get_code').removeAttr('onclick').css({'backgroundColor':'#dadada','pointer-events':'none'})
            $('#get_code').text("("+ttt+"s)");
            setTimeout(num, 1000);
          }
        })()

      },
      numReduce_next:function (){
        var that = this;
        //发送验证码
        var ttt=60;
        (function num(){
          ttt--;
          if(ttt <= 0){
            ttt = 60;
            $('#get_new_code').attr('onclick','httpPost()').text('获取验证码').css({'backgroundColor':'#50c1e9','pointer-events':'auto'});
          }else{
            $('#get_new_code').removeAttr('onclick').css({'backgroundColor':'#dadada','pointer-events':'none'})
            $('#get_new_code').text("("+ttt+"s)");
            setTimeout(num, 1000);
          }
        })()

      },
      httpPost:function (){
        var that = this
        var mobile = $("#original_phone").val();
        if(mobile==null||mobile==""){
          ale("请输入手机号");
        }
        else{
          $.ajax({
            type : 'post',
            async: false ,
            url : host+'httpPost.action',
            data : {action:"change",mobile:mobile},
            success : function(result) {
              if(result.mes=="未注册"){
                ale("手机号不存在");
              }
              else if(result.mes=="请输入您的手机号"){
                ale("这不是您的手机号");
              }
              else{
                that.randomNum = result.randomNum;
                //ale(result.randomNum);
                that.numReduce();
              }
            }
          });
        }
      },
      newHttpPost:function (){
        var that = this;
        var mobile = $("#new_phone").val();
        if(mobile==null||mobile==""){
          ale("请输入手机号");
        }
        else{

          $.ajax({
            type : 'post',
            async: false ,
            url : host+'httpPost.action',
            data : {action:"regist",mobile:mobile},
            success : function(result) {
              if(result.mes=="已注册"){
                ale("手机号已被注册");
              }else{
                that.randomNum = result.randomNum;
                //ale(result.randomNum);
                that.numReduce_next();
              }
            }
          });
        }
      },
      nextStep:function () {
          var that = this;
        if($("#original_phone").val()==""||$("#original_phone").val()==null){
          ale("请输入手机号");
        }
        else if($("#original_code").val()==""||$("#original_code").val()==null){
          ale("请输入验证码");
        }
        else if($("#original_code").val()!= this.randomNum){
          ale("验证码错误");
        }else{
          that.changePhone = false;
        }
      }
    }
  }
</script>

<style scoped>
  #container_full{
    padding:0 18px;
  }
  @media screen and (max-width: 320px) {
    #get_code,#get_new_code{
      position: relative;
      right: 32px;
    }
  }
  #get_code{
    position: absolute;
    right:18px;
  }
  .phone_box{
    background: #fff;
    margin: 0 -18px;
    padding: 0 18px;
  }
  .register_list .font14{ flex:0 0 23%}
  .register_list {
    position: relative;
    height: 48px;
    padding: 0 18px;
  }
  .register_list input {
    font-size: 1.4rem;
    color: #333;
    background: none;
    border: none;
  }
  .register_list {
    position: relative;
    height: 48px;
    padding: 0 18px;
  }
  .register_btn button {
    margin-top: 8px;
  }
  .register_btn {
    padding: 40px 40px 20px 40px;
  }
  .register_list .btn {
    height: 40px;
    color: #fff;
  }
</style>
