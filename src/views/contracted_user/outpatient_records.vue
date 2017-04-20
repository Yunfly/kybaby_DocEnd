<template>
  <div>
    <div id="header" class="doctor_header">
      <div class="header_Left"><p @click="return_before()"></p></div>
      <div class="header_center font18">门诊记录</div>
      <div class="header_right"></div>
    </div>
    <div id="container" class="container_box">
      <div class="list_model_box bgfff">
        <div class="list_model_group">
          <div class="list_model_cont_box">
            <div class="list_model_item" data-type="off">
              <ul>
                <li class="list_model_cont font10 paragraph" v-for="item in user_pediatric_list">
                  <p class="gray_line"></p>
                  <div class="list_model flex_cont">
                    <p class="flex_item">{{item.orderInfoClinic.appointmentDate}}</p>
                    <p class="user_ml10">儿科门诊</p>
                  </div>
                </li>
                <li class="list_model_cont font10 paragraph" v-for="item in user_care_list">
                  <p class="gray_line"></p>
                  <div class="list_model flex_cont">
                    <p class="flex_item">{{item.organChildcareOpenResources.openDate}}</p>
                    <p class="user_ml10">儿保门诊</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import $ from 'jquery'
  import SideFooter from '../../component/footer.vue'

  export default {
    data() {
      return {
        user_id : '',
        user_care_list : '',
        user_pediatric_list : ''
      }
    },
    components:{
      SideFooter
    },
    created : function () {
      this.user_id = this.$route.query.id;
      this.getUserCareList(this.user_id);
      this.getUserPediatricList(this.user_id);
    },
    mounted : function () {

    },
    methods : {
      getUserCareList : function (id) {
        var that = this;
        this.$ajax.post(urlWay.fdmanage + 'fdUserManage.action',"action=getClinicMedicalRecordsListByUser&userInfo.id="+ id)
          .then(function(result){
            if(result.data.mes == "成功") {
              that.user_pediatric_list = result.data.clinicMedicalRecordsList;
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      getUserPediatricList : function (id) {
        var that = this;
        this.$ajax.post(urlWay.fdmanage + 'fdUserManage.action',"action=getUserChildcareAppointmentInfoList&userInfo.id="+ id)
          .then(function(result){
            if(result.data.mes == "成功") {
              that.user_care_list = result.data.userChildcareAppointmentInfoList;
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
  .content_center{
    display: -webkit-box;
    -webkit-box-align: center;
    -webkit-box-pack: center;
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
    background: url("../../public/img/contracted_user/search_btn.png") no-repeat center;
    background-size: 20px;
    width: 27px;
    height: 27px;
  }
  #container.container_box{
    margin: 45px 0 0;
  }
  .list_model_box{
    width: 100%;
    margin-bottom: 10px;
  }
  .list_model_group{
    width: 100%;
  }
  .list_model_header{
    margin: 0 20px;
    height: 54px;
    line-height: 54px;
  }
  .direc_btn{
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-perspective: 1000px;
    perspective: 1000px;
    -webkit-transition: .5s;
    transition: .5s;
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  .direc_left_btn{
    background: url("../../public/img/contracted_user/direc_left_btn.png") no-repeat center;
    background-size: 9px 14px;
    width: 9px;
    height: 100%;
    margin-right: 10px;
  }
  .direc_active{
    -webkit-transform: rotate(90deg);
    transform: rotate(90deg);
    background: url("../../public/img/contracted_user/direc_down_btn.png") no-repeat center;
    background-size: 9px 14px;
  }
  .more_btn{
    background: url("../../public/img/contracted_user/more_btn.png") no-repeat center;
    background-size: 5px 20px;
    width: 5px;
    height: 100%;
  }
  .list_model_cont_box, .list_model_item{
    position: relative;
    width: 100%;
  }
  .list_model{
    margin: 0 20px;
    padding: 15px 0;
  }
  .list_model_package p{
    line-height: 1.5;
  }
  .user_sex{
    width: 10px;
    height: 14px;
    margin-top: 2px;
  }
  .user_woman{
    background: url("../../public/img/contracted_user/woman.png") no-repeat center;
    background-size: 10px 14px;
  }
  .user_man{
    background: url("../../public/img/contracted_user/man.png") no-repeat center;
    background-size: 10px 14px;
  }
  .user_ml10{
    margin-left: 10px;
  }
  .user_package{
    width: 40%;
  }
  .list_model_btn{
    padding-bottom: 10px;
  }
  .list_model_btn p{
    background: #13b9d7;
    height: 29px;
    line-height: 29px;
    text-align: center;
  }
  .list_model_btn .bgf{
    background: #ffffff;
  }
  .list_model_btn .white_line{
    width: 1px;
    height: 100%;
  }
  .gray_line{
    background: #eeeeee;
    height: 1px;
    margin: 0 20px;
  }
  .model_btn_top{
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
  }
  .model_btn_bottom{
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
  }
  .list_model_operation{
    position: absolute;
    right: 18px;
    top: 23px;
    width: 90px;
    z-index: 999;
  }
  .list_models{
    width: 100%;
    background: rgba(0, 0, 0, 0.8);
    border-radius: 4px;
  }
  .list_models li{
    width: 100%;
    height: 34px;
    text-align: center;
    line-height: 34px;
  }
  .list_models_line{
    width: 100%;
    height: 1px;
    background: rgba(238, 238, 238, 0.4);
  }
  .tab_logo_box{
    width: 100%;
  }
  .tab_logo{
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid rgba(0, 0, 0, 0.8);
    text-align: center;
    z-index: 999;
  }
  .right_btn{
    width: 9px;
    height: 16px;
    right: 13%;
    background: url("../../public/img/contracted_user/right_btn.png") no-repeat center;
    background-size: 9px 16px;
  }
</style>
