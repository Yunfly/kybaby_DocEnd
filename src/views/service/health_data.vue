<template>
  <div>
    <div id="header" class="doctor_header">
      <div class="header_Left"><p @click="return_before()"></p></div>
      <div class="header_center font18">健康数据</div>
      <div class="header_right"></div>
    </div>
    <div id="container">
      <div>
        <iframe frameborder="0" width="100%" height="100%" src="https://wj.qq.com/s/1173758/9642"></iframe>
      </div>
    </div>
  </div>

</template>

<script>
  import $j from 'jquery'
  export default{
    data(){
      return{

      }
    },
    created: function () {

    },
    updated:function(){

    },
    mounted:function(){
      $(function () {
        $('#container>div').height($(document).height()-45);
      });
    },
    components:{

    },
    methods: {

    }
  }
</script>
<style scoped>
  #container{
    margin: 45px 0 0;
  }
  #container>div{
    width: 100%;
    height: 100%;
  }
</style>
