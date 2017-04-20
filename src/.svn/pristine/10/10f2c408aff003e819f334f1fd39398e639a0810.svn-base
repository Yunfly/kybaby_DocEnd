<template>
  <div>
  <div id="header" class="doctor_header">
    <div class="header_Left" v-on:click="return_before()"><p></p></div>
    <div class="header_center font18">意见反馈</div>
  </div>
  <div id="container_full">
    <form action="">
      <textarea name="" id="textarea" class="font12 bgfff"  rows="10" placeholder="请输入您的宝贵意见"></textarea>
      <div class="feedback_btn">
        <button type="button" @click="foo" id="cbUserAgreement" class="btn btn_block font16">提交</button>
      </div>
    </form>
  </div>
  </div>
</template>
<script>
  import $j from 'jquery'
  import ale from '../../ale'
export default{
    date(){
        return{
          textarea:''
        }
    },
    methods:{
        foo:function () {
            var that = this;
          if($j('#textarea').val().trim() == ''){
            ale('请输入反馈意见');
          }else{
            ale('提交成功');
            setTimeout(function(){
              that.$router.push('/index')
            },2500);
          }
        }
    }
}
</script>
<style scoped>
  textarea{
    border: none;
    outline: none;
    width: 90%;
    resize: none;
    padding: 5%;
    line-height: 1.5rem;
  }
  .feedback_btn {
    padding: 40px 40px 20px 40px;
  }
</style>
