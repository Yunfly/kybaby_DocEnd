<template>
  <div>
    <div class="header_box gradient_bg">
      <div id="header" class="doctor_header">
        <div class="header_Left"></div>
        <div class="header_center font18">签约用户</div>
        <div class="header_right">
          <router-link to="/contracted_user/contracted_user_list"><div class="list_show"></div></router-link>
        </div>
      </div>
    </div>
    <div class="loop_img_box" id="loop_img_box">
      <div class="swiper-container swiper-container-horizontal" id="loop_img">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="item in package_list" v-bind:data="item.id">
            <div class="swiper_box">
              <router-link v-bind:to="{path:'/contracted_user/contracted_user_all', query:{id:item.id}}">
                <div class="swiper_box_img">
                  <img v-bind:src=imgUrl+item.imagePath class="img-responsive">
                </div>
                <p class="swiper_box_title text font12">{{item.packageShowName}}</p>
                <p class="gray_3"></p>
                <div class="swiper_box_text paragraph font10" v-html="item.packageDescription">{{item.packageDescription}}</div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
    <div id="container" class="container_box">

    </div>

    <side-footer></side-footer>
  </div>
</template>

<script>
  import $ from 'jquery'
  import SideFooter from '../../component/footer.vue'
  import Swiper from 'swiper'
  require('../../public/css/swiper.min.css');
  export default {
    data() {
      return {
        imgUrl : urlWay.fileserver,
        package_list : '',
        isShow:false
      }
    },
    components:{
      SideFooter
    },
    created : function () {
      this.getPackageList();
    },
    mounted : function () {
        var that = this;
        setTimeout(function () {
          $("#loop_img_box").css('opacity','1')
        },800)

    },
    methods : {
      getPackageList : function () {
        var that = this;
        this.$ajax.post(urlWay.fdmanageHost+'fdService.action',"action=getFdServicePackageList")
          .then(function(result){
            if(result.data.listPackages != null) {
              that.package_list = result.data.listPackages;
            }
          })
          .then(function () {
            that.configSwiper();
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      configSwiper : function () {
        var swiper = new Swiper('#loop_img', {
          pagination: false,
          slidesPerView: 1.6,
          centeredSlides: true,
          paginationClickable: false,
          spaceBetween: "10%",
          prevButton:'.swiper-button-prev',
          nextButton:'.swiper-button-next'
        });
      }
    }
  }
</script>

<style scoped>
  #loop_img_box{
    opacity: 0; transition: all 0.6s
  }
  .header_box{
    position: fixed;
    left: 0;
    top: 0px;
    width: 100%;
    height: 155px;
    z-index: 999;
  }
  .header_box #header{
    background: none;
  }
  .list_show{
    background: url("../../public/img/contracted_user/list_show_btn.png") no-repeat right 18px center;
    background-size: 20px;
    height: 45px;
  }
  .loop_img_box{
    position: relative;
    margin-top: 111px;
    width: 100%;
    /*height: 385px;*/
    z-index:1000;
  }
  #loop_img_box .swiper-container, #loop_img_box .swiper-container .swiper-wrapper,#loop_img_box .swiper-container .swiper-wrapper .swiper-slide{
    width: 100%;
    height: 100%;
  }
  #loop_img_box .swiper-container .swiper-wrapper .swiper-slide{
    width: 100%;
    height: 100%;
  }
  #loop_img_pagin{
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
  }
  #loop_img_pagin .swiper-pagination-bullet{
    margin: 0 5px;
    width: 5px;
    height: 5px;
    border: 1px solid #ffffff;
    background: none;
    border-radius: 50%;
    opacity: 0.5;
  }
  #loop_img_pagin .swiper-pagination-bullet-active{
    background: #ffffff;
    opacity: 1;
  }
  #loop_img_box .swiper-button-prev{
    width: 15px;
    height: 27px;
    left: 13%;
    background-image: url("../../public/img/contracted_user/left_btn.png");
    background-size: 15px 27px;
  }
  #loop_img_box .swiper-button-next{
    width: 15px;
    height: 27px;
    right: 13%;
    background-image: url("../../public/img/contracted_user/right_btn.png");
    background-size: 15px 27px;
  }
  #loop_img_box .swiper-container .swiper-wrapper .swiper-slide{
    background: #ffffff;
    border-radius: 6px;
    box-shadow: 0px 0px 6px 0px rgba(225,225,225,0.3);
    height: 100%;
    opacity: 0.5;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-perspective: 1000px;
    perspective: 1000px;
    -webkit-transition: .3s;
    transition: .3s;
    -webkit-transform: scale(0.8);
    transform: scale(0.8);
  }
  #loop_img_box .swiper-container .swiper-wrapper .swiper-slide-active{
    top: 0;
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  .swiper_box{
    padding: 10px;
  }
  .swiper_box_img{
    width: 100%;
  }
  .swiper_box_title{
    width: 100%;
    margin: 15px 0;
    text-align: center;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .swiper_box_text{
    width: 100%;
    height: 34px;
    margin: 10px 0;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    line-height: 1.5;
    text-align: justify;
  }
</style>
