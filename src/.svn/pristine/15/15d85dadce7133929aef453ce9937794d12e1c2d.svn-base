<template>
  <div id="about_us">
    <div id="header" class="doctor_header">
      <div class="header_Left" v-on:click="return_before()"><p></p></div>
      <div class="header_center font18">关于我们</div>
    </div>
    <div id="container_full">
      <iframe frameborder="0" width="100%" height="100%" v-bind:src="url"></iframe>
    </div>
  </div>

</template>
<script>
  import css from '../../public/css/person_center/config.css'
  export default{
      name:'about_us',
    data(){
      return{
        url:urlWay.fileserver+'/kybabyBG/admin/webPage/aboutUs.html?doctor'
      }
    },
    methods:{
      return_before:function(){
        window.history.back();
      }
    }
  }
</script>
<style scoped>
  #container_full{
    margin:  0;
  }
  #container {
    margin: 58px 0 50px;
  }
  iframe{
    min-height: 400px;
    border: none;
  }
</style>
