<template>
  <div>
    <div id="header" class="doctor_header">
      <div class="header_Left"><p @click="return_before()"></p></div>
      <div class="header_center font18">帖子正文</div>
      <router-link v-bind:to="{path:'/service/doctor_circle/communion_circle/circle_post_comment', query:{id:post_id}}">
        <div class="header_right">
          <!--<div id="post_comment"></div>-->
          <span class="font10">评论</span>
        </div>
      </router-link>
    </div>

    <div id="container" class="container_box bgfff">
      <div class="post_text_header flex_cont bgfff">
        <div class="post_text_img">
          <img src="" id="head_img" class="img-responsive">
        </div>
        <div class="post_text_mess flex_item content_center">
          <div class="post_text_mess_box">
            <p class="font12 text post_user_name">{{post_list.doctorName}}</p>
            <p class="font10 paragraph post_user_time">{{post_list.dateStr}}</p>
          </div>
        </div>
        <div class="post_text_logo content_center"><p></p></div>
      </div>
      <p class="gray_1"></p>
      <div class="post_text_cont">
        <p class="font12 text post_text_title">{{post_list.postInfoTitle}}</p>
        <div class="flex_cont font12 paragraph post_label_box">
          <p class="post_text_label" v-for="item in post_list.postInfoLabelNameList">{{item}}</p>
          <p class="flex_item"></p>
          <p class="post_text_read font10">{{post_list.browseNum}}</p>
        </div>
      </div>
      <div class="post_p18">
        <p class="gray_3"></p>
      </div>
      <div class="post_text_cont post_text font10 paragraph" id="post_html">

      </div>
      <!--<p class="post_text_cont post_cont_img">-->
      <!--<img src="../../public/img/circle_text/list_img.png" class="img-responsive">-->
      <!--</p>-->
    </div>

    <!--<div id="footer_box" class="flex_cont font10 paragraph bgfff">-->
      <!--<div class="flex_item content_center">-->
        <!--<p class="fabulous_btn">{{post_list.pointNum}}</p>-->
      <!--</div>-->
      <!--<div class="flex_item content_center">-->
        <!--<p class="comment_btn">{{post_list.replyNum}}</p>-->
      <!--</div>-->
      <!--<div class="flex_item content_center">-->
        <!--<p class="share_btn"></p>-->
      <!--</div>-->
    <!--</div>-->
  </div>
</template>
<script>
  import $ from 'jquery'

  export default {
    data() {
      return {
        imgUrl : urlWay.fileserver,
        post_id : '',
        post_list : ''
      }
    },
    components : {

    },
    created : function () {
      this.post_id = this.$route.query.id;
      this.getPostDetail(this.post_id);
    },
    mounted () {

    },
    methods : {
      getPostDetail : function (id) {
        var that = this;

        this.$ajax.post(ringHost+'getDoctorRringInfo.action',"action=detail&postInfoId="+id)
          .then(function(result){
            if(result.data.mes=="操作成功") {
              that.post_list = result.data;

              $("#post_html").html(that.post_list.postInfoContent.toString().replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&nbsp;/g,' '));

              $("#post_html img").each(function () {
                var src=$(this).prop('src');
                var startIndex=src.indexOf('/kybabyBG');

                if(startIndex>-1){
                  $(this).prop('src',urlWay.fileserver+src.substring(startIndex));
                }
              });

              $("#head_img").attr("src", that.imgUrl + that.post_list.doctorImg);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  }

</script>
<style scoped>
  .header_right #post_comment{
    background: url("../../public/img/circle_text/more_menu_btn.png") no-repeat center right 18px;
    background-size: 20px;
    height: 100%;
  }
  .header_right span{
    padding: 2px 10px;
    border: 1px solid #ffffff;
    border-radius: 14px;
    color: #ffffff;
  }
  #container.container_box{
    margin: 45px 0 50px;
  }
  .post_text_header{
    padding: 10px 28px;
  }
  .post_text_img{
    width: 54px;
    height: 54px;
    margin: 0 10px 0 6px;
  }
  .post_text_img, .post_text_img img{
    border-radius: 50%;
  }
  .post_text_mess_box{
    width: 100%;
  }
  .content_center{
    display: -webkit-box;
    -webkit-box-align: center;
    -webkit-box-pack: center;
  }
  .post_user_time{
    margin-top: 10px;
  }
  .post_text_logo{
    height: 54px;
  }
  .post_text_logo p{
    background: url("../../public/img/circle_text/post_logo.png") no-repeat center;
    background-size: 23px;
    width: 23px;
    height: 23px;
  }
  .post_text_cont{
    padding: 0 28px;
  }
  .post_text_title{
    padding-top: 15px;
    text-align: justify;
    line-height: 1.5;
    word-wrap: break-word;
  }
  .post_label_box{
    padding: 10px 0;
  }
  .post_text_label{
    background: url("../../public/img/circle_text/label_btn.png") no-repeat left center;
    background-size: 13px 16px;
    height: 16px;
    padding-left: 18px;
    margin-right: 10px;
    line-height: 16px;
  }
  .post_text_read{
    background: url("../../public/img/circle_text/read_btn.png") no-repeat left center;
    background-size: 15px 12px;
    height: 16px;
    padding-left: 20px;
    line-height: 16px;
  }
  .post_p18{
    padding: 0 18px;
  }
  .post_text{
    text-align: justify;
    line-height: 1.5;
    padding-top: 10px;
    padding-bottom: 10px;
    word-wrap:break-word;
  }
  .post_cont_img{
    padding-top: 10px;
    padding-bottom: 10px;
  }
  #footer_box{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 50px;
    box-shadow: 0px 0px 6px 1px rgba(225,225,225,0.3);
  }
  .fabulous_btn{
    background: url("../../public/img/circle_text/fabulous_btn.png") no-repeat left center;
    background-size: 16px 18px;
    height: 18px;
    padding-left: 21px;
  }
  .comment_btn{
    background: url("../../public/img/circle_text/comment_btn.png") no-repeat left center;
    background-size: 19px 18px;
    height: 18px;
    padding-left: 24px;
  }
  .share_btn{
    background: url("../../public/img/circle_text/share_btn.png") no-repeat left center;
    background-size: 19px 18px;
    height: 18px;
    padding-left: 24px;
  }
</style>
