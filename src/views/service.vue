<template>

  <div id="secondcomponent">
    <div id="container">
      <section class="service_section">
        <ul class="flex_cont flex_simple">
          <li class="flex_item" @click="dosomething">
            <router-link to="/door_bespeak_open/door_bespeak_open">
              <div class="flex_cont flex_simple"><img src="../assets/img/server/door_service.png" style="width:13.2vw"/></div>
              <p>上门服务</p>
            </router-link>
          </li>
          <li class="flex_item">
            <router-link to="/service/visit_record">
              <div class="flex_cont flex_simple"><img src="../assets/img/server/visit_record.png" style="width:11.3vw"/></div>
              <p>坐诊记录</p>
            </router-link>
          </li>
        </ul>
        <ul class="flex_cont flex_simple">
          <li class="flex_item">
            <router-link to="/service/historical_consultation">
              <div class="flex_cont flex_simple"><img src="../assets/img/server/history_consult.png" style="width:12vw"/></div>
              <p>历史咨询</p>
            </router-link>
          </li>
          <li class="flex_item">
            <router-link to="/service/lecture_online">
              <div class="flex_cont flex_simple"><img src="../assets/img/server/online_lecture.png"/></div>
              <p>线上讲座</p>
            </router-link>
          </li>
        </ul>
        <ul class="flex_cont flex_simple">
          <li class="flex_item">
            <router-link to="/service/lecture_offline">
              <div class="flex_cont flex_simple"><img src="../assets/img/server/offline_lecture.png" style="width:15vw"/></div>
              <p>线下讲座</p>
            </router-link>
          </li>
          <li class="flex_item">
            <router-link to="/service/article_manuscripts">
              <div class="flex_cont flex_simple"><img src="../assets/img/server/article_manuscripts.png"/></div>
              <p>文章约稿</p>
            </router-link>
          </li>
        </ul>
        <ul class="flex_cont flex_simple">
          <li class="flex_item">
            <router-link to="/service/doctor_circle">
              <div class="flex_cont flex_simple"><img src="../assets/img/server/doctor_circle.png" style="width: 12.8vw"/></div>
              <p>医生圈</p>
            </router-link>
          </li>
          <li class="flex_item">
            <router-link to="/service/health_data">
              <div class="flex_cont flex_simple"><img src="../assets/img/server/health_data.png"/></div>
              <p>健康数据</p>
            </router-link>
          </li>
        </ul>
      </section>
    </div>
    <side-footer></side-footer>
  </div>
</template>

<script>
  import SideFooter from '../component/footer.vue'
  export default {
    data() {
      return {

      }
    },
    components:{
      SideFooter
    },
    methods:{
      dosomething:function(){
        sessionStorage.setItem('whoLoginFlag','doctor');
      }
    }
  }
</script>

<style scoped>
  #container {margin-top:0;}
  #secondcomponent{
    background: url('../public/img/server/service_bg.png')no-repeat;
    background-size: cover;
    height:100vh;
  }
  #header{
    transition: .5s;
  }
  #header.transparent{
    background: rgba(255,255,255,0);
  }
  .service_section{
    margin-top: 10vh;
    background: rgba(255,255,255,.96);
    text-align: center;
    box-shadow: 0px 0px 6px 0px rgba(225,225,225,0.3);
    border-radius: 3px;
  }
  .service_section>ul{
    border-bottom: 1px solid #eee;
  }
  .service_section>ul:last-child{
    border-bottom: 0px;
  }
  .service_section>ul>li{
    padding: 16px 0;
  }
  .service_section>ul>li:nth-child(1){
    border-right: 1px solid #eee;
  }
  .service_section>ul>li div{
    height: 9.5vh;
  }
  .service_section img{
    margin: 0 auto;
    width: 12.6vw;
  }
  .service_section p{
    /*margin-top: 10px;*/
    /*font-size: 14px;*/
  }

</style>
