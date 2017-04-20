<template>
  <div>
    <div class="header_box">
      <div id="header" class="doctor_header">
        <div class="header_Left"><p @click="return_before()"></p></div>
        <div class="header_center font18">历史咨询</div>
        <div class="header_right"></div>
      </div>
      <div class="content_tab_box flex_cont bgf8" data-type="0">
        <p class="tab_menu flex_item text-center font14" v-bind:class="{'tab_menu_active' : isShow == '0'}" v-on:click="tabMenu(0)">付费咨询</p>
        <p class="tab_menu flex_item text-center font14" v-bind:class="{'tab_menu_active' : isShow == '1'}" v-on:click="tabMenu(1)">签约用户咨询</p>
        <p class="tab_menu flex_item text-center font14" v-bind:class="{'tab_menu_active' : isShow == '2'}" v-on:click="tabMenu(2)">套餐咨询</p>
      </div>
      <div class="tab_box flex_cont bgf8">
        <div class="content_center flex_item">
            <div class="tab_logo" v-show="isShow =='0'" v-bind:class="menu_slide"></div>
        </div>
        <div class="content_center flex_item">
            <div class="tab_logo" v-show="isShow == '1'" v-bind:class="menu_slide"></div>
        </div>
        <div class="content_center flex_item">
            <div class="tab_logo" v-show="isShow == '2'" v-bind:class="menu_slide"></div>
        </div>
      </div>
    </div>
    <div id="container" class="container_box">
        <div v-show="isShow == '0'" v-bind:class="menu_slide">
          <ul class="content_list_box" data-type="0">

            <li v-for="(item, index) in consult_pay">
              <router-link  :to="{path:'/consulting/history_consulting_details',query: {id:item.logId,packageId:item.packageId,isTag:item.ifAdd,userId:item.userId,userType:item.userType}}" >
            <p class="gray_3" v-if="index != 0"></p>
            <div class="list_model flex_cont content_center">
              <p class="list_model_img">
                <img v-bind:src=imgUrl+item.imgurl class="img_box">
              </p>
              <div class="flex_item">
                <div class="flex_cont">
                  <p class="flex_item font12 text">{{item.name}}</p>
                  <p class="font10 paragraph">{{item.time}}</p>
                </div>
                <p class="item_cont single_ellipsis font10 paragraph">{{item.content}}</p>
              </div>
            </div>
            </router-link>
            </li>

          </ul>
        </div>

        <div v-show="isShow == '1'" v-bind:class="menu_slide">
          <ul class="content_list_box" data-type="1">
            <li v-for="(item, index) in consult_sign">
              <router-link  :to="{path:'/consulting/history_consulting_details',query: {id:item.logId,packageId:item.packageId,isTag:item.ifAdd,userId:item.userId,userType:item.userType}}" >
              <p class="gray_3" v-if="index != 0"></p>
              <div class="list_model flex_cont content_center">
                <p class="list_model_img">
                  <img v-bind:src=imgUrl+item.imgurl class="img_box">
                </p>
                <div class="flex_item">
                  <div class="flex_cont">
                    <p class="flex_item font12 text">{{item.name}}</p>
                    <p class="font10 paragraph">{{item.time}}</p>
                  </div>
                  <p class="item_cont single_ellipsis font10 paragraph">{{item.content}}</p>
                </div>
              </div>
              </router-link>
            </li>
          </ul>
        </div>

      <div v-show="isShow == '2'" v-bind:class="menu_slide">
          <ul class="content_list_box" data-type="1">
            <li v-for="(item, index) in consult_package">
              <router-link  :to="{path:'/consulting/history_consulting_details',query: {id:item.logId,packageId:item.packageId,isTag:item.ifAdd,userId:item.userId,userType:item.userType}}" >
              <p class="gray_3" v-if="index != 0"></p>
              <div class="list_model flex_cont content_center">
                <p class="list_model_img">
                  <img v-bind:src=imgUrl+item.imgurl class="img_box">
                </p>
                <div class="flex_item">
                  <div class="flex_cont">
                    <p class="flex_item font12 text">{{item.name}}</p>
                    <p class="font10 paragraph">{{item.time}}</p>
                  </div>
                  <p class="item_cont single_ellipsis font10 paragraph">{{item.content}}</p>
                </div>
              </div>
              </router-link>
            </li>
          </ul>
        </div>
    </div>
  </div>
</template>
<script>
  import $ from "jquery"
  export default {
    data () {
      return {
        imgUrl : urlWay.fileserver,
        consult_pay : [],
        consult_sign : [],
        consult_package : [],
        pay_type : '2',
        sign_type : '1,3',
        package_type : '4',
        defaultImg : '/kybabyBG/admin/images/userFaceIcon/lt_user.png',
        isShow : '0',
        isHide : true,
        menu_index : 0,
        menu_slide : "animated bounceInRight"
      }
    },
    components : {

    },
    created : function () {
      this.getConsultList(this.pay_type, this.consult_pay);
      this.getConsultList(this.sign_type, this.consult_sign);
      this.getConsultList(this.package_type, this.consult_package);
    },
    mounted : function () {

    },
    methods : {
      getConsultList : function (type, listData) {
        var that = this;

        this.$ajax.post(host+'consultManage.action',"action=getAll&isEnd=Y&userType="+type)
          .then(function(result){
            if(result.data.mes=="成功") {
              for(var i = 0; i < result.data.userInfoStrList.length; i++) {
                listData.push({
                  "logId": result.data.someCousultStrList[i].split("::")[0],
                  "packageId" : result.data.someCousultStrList[i].split("::")[5],
                  "userId" : result.data.someCousultStrList[i].split("::")[9],
                  "userType" : result.data.someCousultStrList[i].split("::")[3],
                  "name" : result.data.userInfoStrList[i].split("::")[0],
                  "imgurl" : (result.data.userInfoStrList[i].split("::")[1] != "null" ? result.data.userInfoStrList[i].split("::")[1] : that.defaultImg),
                  "content" : result.data.someCousultStrList[i].split("::")[1],
                  "time" : result.data.someCousultStrList[i].split("::")[2]
                });
              }
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      tabMenu : function (index) {
        if(index != this.isShow) {
          this.isShow = index;
          this.menuSlide(index);
        }
      },
      menuSlide : function (index) {
        if(this.menu_index != index) {
          if(this.menu_index > index) {
            this.menu_slide = "animated bounceInRight"
          } else {
            this.menu_slide = "animated bounceInLeft"
          }

          this.menu_index = index;
        }
      }
    }
  }
</script>
<style scoped>
  .header_box{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 999;
  }
  .content_center{
    display: -webkit-box;
    -webkit-box-align: center;
    -webkit-box-pack: center;
  }
  .hidden{
    display: none;
  }
  .content_tab_box{
    margin: 45px 18px 0;
  }
  .tab_menu{
    padding: 10px 0 5px;
    color: #c2c2c2;
  }
  .tab_menu_active{
    color: #13b9d7;
  }
  .tab_box{
    width: 100%;
    z-index: 999;
  }
  .tab_logo_move{
    margin-left: 50%;
  }
  .tab_logo_box{
    width: 50%;
  }
  .tab_logo{
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid #ffffff;
    text-align: center;
  }
  #container{
    margin: 87px 18px 0;
  }
  .content_list_box{
    background: #ffffff;
    border-radius: 6px;
  }
  .list_model{
    padding: 15px 10px;
  }
  .list_model_img{
    width: 54px;
    height: 54px;
    margin-right: 10px;
  }
  .img_box{
    width: 100%;
    height: 100%;
  }
  .list_model_img, .list_model_img img{
    border-radius: 50%;
  }
  .single_ellipsis{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .item_cont{
    width: 100%;
    height: 19px;
    line-height: 1.5;
  }
</style>
