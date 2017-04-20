<template>
  <div>
    <div id="header" class="doctor_header">
        <div class="header_Left"><p @click="return_before()"></p></div>
        <div class="header_center font18">线下讲座</div>
        <div class="header_right">
            <div class="more_btn"></div>
        </div>
    </div>
    <div id="container" class="container_box bgf8">
        <ul class="lecture_box">
            <li class="bgfff" v-for="item in lists">
              <div class="flex_cont content_center">
                <p class="lecture_logo">
                  <img v-bind:src=imgUrl+item.img>
                </p>
                <p class="flex_item font10 paragraph lecture_line">
                  <span class="font12 text lecture_mr10">{{item.businessType}}</span>￥<span>{{item.money}}.00</span>
                  </br>
                  发起时间：<span class="lecture_mr10">{{item.actualStartTime}}</span>
                  </br>
                  完成时间：<span>{{item.actualEndTime}}</span>
                </p>
                <p class="lecture_btn font10 title" v-bind:class="item.state == '已确认' ? 'lecture_btn_able' : 'msg'">{{item.state}}</p>
              </div>
              <p class="gray_1"></p>
            </li>
        </ul>
    </div>
  </div>
</template>
<script>
  import $ from "jquery"
  export default {
    data () {
      return {
        imgUrl : urlWay.fileserver,
        lists : []
      }
    },
    components : {

    },
    created : function () {
      this.getLists();
    },
    mounted : function () {

    },
    methods : {
      getLists : function () {
        var that = this;
        var value = null;

        this.$ajax.post(urlWay.fdmanage+'fdService.action',"action=getOpenClinicInfoList")
          .then(function(result){
            value = result.data.openClinicInfoList;

            for(var i = 0; i < value.length; i++) {
              if(value[i].businessType == "线下讲座") {
                that.lists.push(value[i]);
              }
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
    }
  }
</script>
<style scoped>
  #container.container_box{
    margin: 45px 0;
  }
  .content_center{
    display: -webkit-box;
    -webkit-box-align: center;
    -webkit-box-pack: center;
  }
  .lecture_box li div{
    padding: 15px 18px;
  }
  .lecture_logo{
    width: 54px;
    height: 54px;
    margin-right: 10px;
  }
  .lecture_logo, .lecture_logo img{
    border-radius: 50%;
  }
  .lecture_btn{
    width: 54px;
    height: 28px;
    text-align: center;
    line-height: 28px;
    color: #c2c2c2;
    border-radius: 6px;
    margin-left: 10px;
  }
  .lecture_btn_able{
    background: #13b9d7;
    color: #ffffff;
  }
  .lecture_mr10{
    margin-right: 10px;
  }
  .lecture_line{
    line-height: 1.5;
  }
</style>
