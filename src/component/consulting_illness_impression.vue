<template>
  <div>
    <div id="header" class="doctor_header">
      <div class="header_Left"><p onclick="return_before()"></p></div>
      <div class="header_center font18">病情印象</div>
      <div class="header_right"></div>
    </div>
    <div id="container">
      <div class="search_box bgf8">
        <div class="search_box_btn flex_cont bgfff">
          <input class="flex_item font10 text" type="text" placeholder="请输入疾病名称">
          <p class="search_btn"></p>
        </div>
      </div>
      <section>
        <div class="div_padding">
          <p class="black_title">已选</p>
          <ul id="selected_area" class="paragraph"></ul>
        </div>
        <p class="gray_1"></p>
        <div class="div_padding">
          <p class="black_title">常用</p>
          <ul id="choose_area" class="paragraph">
            <li data-id="0">常用</li>
            <li data-id="1">病情</li>
            <li data-id="2">病情病</li>
            <li data-id="3">常用</li>
            <li data-id="4">病情</li>
            <li data-id="5">病情病</li>
            <li data-id="6">病情病情</li>
            <li data-id="7">常用</li>
            <li data-id="8">病情</li>
            <li data-id="9">病情病</li>
            <li data-id="10">病情病情</li>
          </ul>
        </div>
      </section>
    </div>
    <footer id="btn_area">
      <router-link to="/consulting/consulting">
        <div id="big_btn1">确定</div>
      </router-link>
    </footer>
  </div>
</template>
<!--<script src="../public/js/consulting/consulting_illness_impression.js"></script>-->
<script>
  import $ from 'jquery'
  export default{
    data(){
      return{

      }
    },
    created: function () {
      // 页面加载时跳转
      // this.loading();
    },
    methods: {

    }
  }
</script>
<style scoped>
  #container {
    margin: 45px 0 50px 0;
  }
  section{
    margin: 50px 0 94px;
  }
  #search_box{
    padding: 10px 18px;
  }
  .search_box{
    position: fixed;
    left: 0;
    top: 45px;
    width: 100%;
    padding: 10px 0;
    z-index: 999;
  }
  .search_box_btn{
    margin: 0 20px;
    padding: 5px 5px 5px 15px;
    border-radius: 36px;
  }
  .search_box_btn input{
    border: none;
    outline: none;
    background: none;
  }
  .search_btn{
    background: url("../public/img/contracted_user/search_btn.png") no-repeat center;
    background-size: 20px;
    width: 27px;
    height: 27px;
  }
  section{
    margin-top: 57px;
  }
  .div_padding{
    padding: 0 18px;
    background: #fff;
  }
  .black_title{
    padding: 0 6px;
    line-height: 2.5;
    border-bottom: 1px solid #eee;
  }
  #choose_area,#selected_area{
    padding: 8px 6px;
    overflow: hidden;
  }
  #selected_area>li,#choose_area>li{
    line-height: 1.5;
    margin-right: 10px;
    float: left;
    display: inline-block;
  }
  #choose_area>li{
    border-radius: 3px;
    border: 1px solid #eee;
    padding: 2px 6px;
    margin-bottom: 6px;
  }
  #choose_area>li.selected{
    color: #fff;
    background: #0eced4;
    border: 1px solid #0eced4;
  }
  footer#btn_area{
    padding: 10px 40px 20px 40px;
    position: fixed;
    bottom: 0px;
    left: 0px;
    right: 0px;
    background: #f4f4f4;
  }
  #big_btn1{
    height: 44px;
    line-height: 44px;
    text-align: center;
    border-radius: 3px;
    margin-bottom: 20px;
    color: #fff;
  }
  #big_btn1{
    background: #008ba4;
  }
</style>
