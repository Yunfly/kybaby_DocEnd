<template>
  <div>
    <div id="header" class="doctor_header">
      <div class="header_Left" @click="return_before()"><p></p></div>
      <div class="header_center font18">健康档案</div>
      <div class="header_right"></div>
    </div>
    <div id="container">
      <div class="info_item">
        <router-link :to="{path:'/door_basic_archives',query: {id:id}}">
          <div class="flex_cont right_arrow" id="basic">基础档案</div>
        </router-link>
        <router-link :to="{path:'/door_development_archives',query: {id:id}}">
          <div class="flex_cont right_arrow" id="development">发展档案</div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
  import $j from 'jquery'
  export default{
    data(){
      return{
        id:''
      }
    },
    mounted:function(){
      var that = this;
      that.id = this.$route.query.id;
    }
  }
</script>

<style scoped>
  #container {
    margin: 45px 0 50px 0;
  }
  .info_item {
    padding: 0 18px;
    line-height: 44px;
    background: #fff;
  }
  .info_item>a>div {
    padding: 0 6px;
  }
  #basic{
    border-bottom: 1px solid #eee;
  }
  .right_arrow {
    background: url(../../public/img/right.png)no-repeat right 8px center;
    background-size: 9px;
  }
</style>
