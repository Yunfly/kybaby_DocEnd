<template>
  <div>
    <div id="header" class="doctor_header">
      <div class="header_Left"><p @click="return_before()"></p></div>
      <div class="header_center font18">病情印象</div>
      <div class="header_right"></div>
    </div>

    <div id="container" class="container_box">
      <div class="list_model_box bgfff">
        <div class="list_model_group">
          <div class="list_model_cont_box">
            <div class="list_model_item" data-type="off">
              <ul>
                <li class="list_model list_model_cont flex_cont">
                  <p class="label_model title font12">出生信息</p>
                </li>
                <p class="gray_line"></p>
                <li class="list_model list_model_cont flex_cont font10 paragraph">
                  <label class="flex_item text font12">姓名：</label>
                  <p class="flex_item user_ml10">{{user_list.babyName}}</p>
                </li>
                <p class="gray_line"></p>
                <li class="list_model list_model_cont flex_cont font10 paragraph">
                  <label class="flex_item text font12">性别：</label>
                  <p class="flex_item user_woman user_ml10" v-bind:class="{user_man : user_list.babySex == '男'}"></p>
                </li>
                <p class="gray_line"></p>
                <li class="list_model list_model_cont flex_cont font10 paragraph">
                  <label class="flex_item text font12">出生日期：</label>
                  <p class="flex_item user_ml10">{{user_list.babyBirthday}}</p>
                </li>
                <p class="gray_line"></p>
                <li class="list_model list_model_cont flex_cont font10 paragraph">
                  <label class="flex_item text font12">民族：</label>
                  <p class="flex_item user_ml10">{{user_list.nation}}</p>
                </li>
                <p class="gray_line"></p>
                <li class="list_model list_model_cont flex_cont font10 paragraph">
                  <label class="flex_item text font12">胎次：</label>
                  <p class="flex_item user_ml10">{{user_list.parity}}</p>
                </li>
                <p class="gray_line"></p>
                <li class="list_model list_model_cont flex_cont font10 paragraph">
                  <label class="flex_item text font12">产次：</label>
                  <p class="flex_item user_ml10">{{user_list.para}}</p>
                </li>
                <p class="gray_line"></p>
                <li class="list_model list_model_cont flex_cont font10 paragraph">
                  <label class="flex_item text font12">胎龄（周）：</label>
                  <p class="flex_item user_ml10">{{user_list.gestationalAge}}</p>
                </li>
                <p class="gray_line"></p>
                <li class="list_model list_model_cont flex_cont font10 paragraph">
                  <label class="flex_item text font12">出生体重（KG）：</label>
                  <p class="flex_item user_ml10">{{user_list.birthWeight}}</p>
                </li>
                <p class="gray_line"></p>
                <li class="list_model list_model_cont flex_cont font10 paragraph">
                  <label class="flex_item text font12">出生身长（CM）：</label>
                  <p class="flex_item user_ml10">{{user_list.birthBodyLength}}</p>
                </li>
                <p class="gray_line"></p>
                <li class="list_model list_model_cont flex_cont font10 paragraph">
                  <label class="flex_item text font12">APGAR/1min：</label>
                  <p class="flex_item user_ml10">{{user_list.apgarOfOneMinute}}</p>
                </li>
                <p class="gray_line"></p>
                <li class="list_model list_model_cont flex_cont font10 paragraph">
                  <label class="flex_item text font12">APGAR/5min：</label>
                  <p class="flex_item user_ml10">{{user_list.apgarOfFiveMinutes}}</p>
                </li>
                <p class="gray_line"></p>
                <li class="list_model list_model_cont flex_cont font10 paragraph">
                  <label class="flex_item text font12">APGAR/10min：</label>
                  <p class="flex_item user_ml10">{{user_list.apgarOfTenMinutes}}</p>
                </li>
                <p class="gray_line"></p>
                <li class="list_model list_model_cont flex_cont font10 paragraph">
                  <label class="flex_item text font12">生产方式：</label>
                  <p class="flex_item user_ml10">{{user_list.bornWay}}</p>
                </li>
                <p class="gray_line"></p>
                <li class="list_model list_model_cont flex_cont font10 paragraph">
                  <label class="flex_item text font12">胎数（胎）：</label>
                  <p class="flex_item user_ml10">{{user_list.embryoNumber}}</p>
                </li>
                <p class="gray_line"></p>
                <li class="list_model list_model_cont flex_cont font10 paragraph">
                  <label class="flex_item text font12">出生医院：</label>
                  <p class="flex_item user_ml10">{{user_list.bornHospital}}</p>
                </li>
                <p class="gray_line"></p>
                <li class="list_model list_model_cont flex_cont font10 paragraph">
                  <label class="flex_item text font12">早期喂养方式：</label>
                  <p class="flex_item user_ml10">{{user_list.earlyFeeding}}</p>
                </li>
                <p class="gray_line"></p>
                <li class="list_model list_model_cont flex_cont font10 paragraph">
                  <label class="flex_item text font12">月子方式（月嫂）：</label>
                  <p class="flex_item user_ml10">{{user_list.monthManner}}</p>
                </li>
                <p class="gray_line"></p>
                <li class="list_model list_model_cont flex_cont font10 paragraph">
                  <label class="flex_item text font12">胎教：</label>
                  <p class="flex_item user_ml10">{{user_list.prenatalEducation}}</p>
                </li>
                <p class="gray_line"></p>
                <li class="list_model list_model_cont flex_cont font10 paragraph">
                  <label class="flex_item text font12">孕产期高危因素：</label>
                  <p class="flex_item user_ml10">{{user_list.maternalRiskFactors}}</p>
                </li>
                <p class="gray_line"></p>
                <li class="list_model list_model_cont flex_cont">
                  <p class="label_model title font12">家族信息</p>
                </li>
                <p class="gray_line"></p>
                <li class="list_model list_model_cont flex_cont">
                  <p class="label_model_words title font12">母亲信息</p>
                </li>
                <p class="gray_line"></p>
                <li class="list_model list_model_cont flex_cont font10 paragraph">
                  <label class="flex_item text font12">姓名：</label>
                  <p class="flex_item user_ml10">{{user_list.motherName}}</p>
                </li>
                <p class="gray_line"></p>
                <li class="list_model list_model_cont flex_cont font10 paragraph">
                  <label class="flex_item text font12">年龄：</label>
                  <p class="flex_item user_ml10">{{user_list.motherAge}}</p>
                </li>
                <p class="gray_line"></p>
                <li class="list_model list_model_cont flex_cont font10 paragraph">
                  <label class="flex_item text font12">身高（CM）：</label>
                  <p class="flex_item user_ml10">{{user_list.heightOfMother}}</p>
                </li>
                <p class="gray_line"></p>
                <li class="list_model list_model_cont flex_cont font10 paragraph">
                  <label class="flex_item text font12">文化程度：</label>
                  <p class="flex_item user_ml10">{{user_list.degreeOfMotherEducation}}</p>
                </li>
                <p class="gray_line"></p>
                <li class="list_model list_model_cont flex_cont font10 paragraph">
                  <label class="flex_item text font12">家族遗传病：</label>
                  <p class="flex_item user_ml10">{{user_list.maFamilyGeneticDisease}}</p>
                </li>
                <p class="gray_line"></p>
                <li class="list_model list_model_cont flex_cont font10 paragraph">
                  <label class="flex_item text font12">不良生活习惯：</label>
                  <p class="flex_item user_ml10">{{user_list.motherBadHabits}}</p>
                </li>
                <p class="gray_line"></p>
                <li class="list_model list_model_cont flex_cont">
                  <p class="label_model_words title font12">父亲信息</p>
                </li>
                <p class="gray_line"></p>
                <li class="list_model list_model_cont flex_cont font10 paragraph">
                  <label class="flex_item text font12">姓名：</label>
                  <p class="flex_item user_ml10">{{user_list.fatherName}}</p>
                </li>
                <p class="gray_line"></p>
                <li class="list_model list_model_cont flex_cont font10 paragraph">
                  <label class="flex_item text font12">年龄：</label>
                  <p class="flex_item user_ml10">{{user_list.fatherAge}}</p>
                </li>
                <p class="gray_line"></p>
                <li class="list_model list_model_cont flex_cont font10 paragraph">
                  <label class="flex_item text font12">身高（CM）：</label>
                  <p class="flex_item user_ml10">{{user_list.heightOfFather}}</p>
                </li>
                <p class="gray_line"></p>
                <li class="list_model list_model_cont flex_cont font10 paragraph">
                  <label class="flex_item text font12">文化程度：</label>
                  <p class="flex_item user_ml10">{{user_list.degreeOfFatherEducation}}</p>
                </li>
                <p class="gray_line"></p>
                <li class="list_model list_model_cont flex_cont font10 paragraph">
                  <label class="flex_item text font12">家族遗传病：</label>
                  <p class="flex_item user_ml10">{{user_list.fuFamilyGeneticDisease}}</p>
                </li>
                <p class="gray_line"></p>
                <li class="list_model list_model_cont flex_cont font10 paragraph">
                  <label class="flex_item text font12">不良生活习惯：</label>
                  <p class="flex_item user_ml10">{{user_list.fatherBadHabits}}</p>
                </li>
                <p class="gray_line"></p>
                <li class="list_model list_model_cont flex_cont">
                  <p class="label_model title font12">健康记录</p>
                </li>
                <p class="gray_line"></p>
                <li class="list_model list_model_cont flex_cont font10 paragraph">
                  <label class="flex_item text font12">定期注射疫苗：</label>
                  <p class="flex_item user_ml10">{{user_list.regularInjections}}</p>
                </li>
                <p class="gray_line"></p>
                <li class="list_model list_model_cont flex_cont font10 paragraph">
                  <label class="flex_item text font12">疫苗异常反应：</label>
                  <p class="flex_item user_ml10">{{user_list.vaccineAbnormalReaction}}</p>
                </li>
                <p class="gray_line"></p>
                <li class="list_model list_model_cont flex_cont font10 paragraph">
                  <label class="flex_item text font12">疫苗异常反应描述：</label>
                  <p class="flex_item user_ml10">{{user_list.vaccineAbnormalRemark}}</p>
                </li>
                <p class="gray_line"></p>
                <li class="list_model list_model_cont flex_cont font10 paragraph">
                  <label class="flex_item text font12">疫苗注射机构：</label>
                  <p class="flex_item user_ml10">{{user_list.vaccinationAgency}}</p>
                </li>
                <p class="gray_line"></p>
                <li class="list_model list_model_cont flex_cont font10 paragraph">
                  <label class="flex_item text font12">定期儿保：</label>
                  <p class="flex_item user_ml10">{{user_list.regularChildProtection}}</p>
                </li>
                <p class="gray_line"></p>
                <li class="list_model list_model_cont flex_cont font10 paragraph">
                  <label class="flex_item text font12">儿保机构：</label>
                  <p class="flex_item user_ml10">{{user_list.childProtectionAgency}}</p>
                </li>
                <p class="gray_line"></p>
                <li class="list_model list_model_cont flex_cont font10 paragraph">
                  <label class="flex_item text font12">疾病史：</label>
                  <p class="flex_item user_ml10">{{user_list.historyOfDisease}}</p>
                </li>
                <p class="gray_line"></p>
                <li class="list_model list_model_cont flex_cont font10 paragraph">
                  <label class="flex_item text font12">是否住院：</label>
                  <p class="flex_item user_ml10">{{user_list.hospitalized}}</p>
                </li>
                <p class="gray_line"></p>
                <li class="list_model list_model_cont flex_cont font10 paragraph">
                  <label class="flex_item text font12">住院次数：</label>
                  <p class="flex_item user_ml10">{{user_list.hospitalizedRemark}}</p>
                </li>
                <p class="gray_line"></p>
                <li class="list_model list_model_cont flex_cont font10 paragraph">
                  <label class="flex_item text font12">常去医院：</label>
                  <p class="flex_item user_ml10">{{user_list.oftenGoHospital}}</p>
                </li>
                <p class="gray_line"></p>
                <li class="list_model list_model_cont flex_cont font10 paragraph">
                  <label class="flex_item text font12">过敏史：</label>
                  <p class="flex_item user_ml10">{{user_list.allergies}}</p>
                </li>
                <p class="gray_line"></p>
                <li class="list_model list_model_cont flex_cont font10 paragraph">
                  <label class="flex_item text font12">过敏史描述：</label>
                  <p class="flex_item user_ml10">{{user_list.allergiesRemark}}</p>
                </li>
                <p class="gray_line"></p>
                <li class="list_model list_model_cont flex_cont font10 paragraph">
                  <label class="flex_item text font12">早教：</label>
                  <p class="flex_item user_ml10">{{user_list.earlyLearning}}</p>
                </li>
                <p class="gray_line"></p>
                <li class="list_model list_model_cont flex_cont">
                  <p class="label_model title font12">成长环境</p>
                </li>
                <p class="gray_line"></p>
                <li class="list_model list_model_cont flex_cont font10 paragraph">
                  <label class="flex_item text font12">居住环境：</label>
                  <p class="flex_item user_ml10">{{user_list.livingEnvironment}}</p>
                </li>
                <p class="gray_line"></p>
                <li class="list_model list_model_cont flex_cont font10 paragraph">
                  <label class="flex_item text font12">主要照看人：</label>
                  <p class="flex_item user_ml10">{{user_list.mainCaregivers}}</p>
                </li>
                <p class="gray_line"></p>
                <li class="list_model list_model_cont flex_cont font10 paragraph">
                  <label class="flex_item text font12">资料提供者：</label>
                  <p class="flex_item user_ml10">{{user_list.dataProvider}}</p>
                </li>
                <p class="gray_line"></p>
                <li class="list_model list_model_cont flex_cont font10 paragraph">
                  <label class="flex_item text font12">独生子女：</label>
                  <p class="flex_item user_ml10">{{user_list.whetherOnlyChild}}</p>
                </li>
                <p class="gray_line"></p>
                <li class="list_model list_model_cont flex_cont font10 paragraph">
                  <label class="flex_item text font12">有玩伴：</label>
                  <p class="flex_item user_ml10">{{user_list.otherBabiesGrowTogether}}</p>
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
  export default{
    data(){
      return{
        isTag:this.$route.query.isTag,
        logId:this.$route.query.id,
        userId:this.$route.query.userId,
        userType:this.$route.query.userType,
        packageId:this.$route.query.packageId,
        user_list:''

      }
    },
      mounted:function () {
        var that = this;
        var isEnd=this.$route.query.isTag?'Y':'N';
        if(isEnd=='Y'){
          if(this.isTag=='false'){
            isEnd='N';
            that.isTag = this.$route.query.isTag;
          }
        }
        this.$ajax.post(host+'consultManage.action','action=after&logId='+that.logId+'&isEnd='+isEnd+'&consult.userId='+that.userId)
          .then(function(result){
            that.user_list = result.data.babyBasicData
          })
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
  .list_model label{
    width: 100px;
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
    background: url("../../public/img/contracted_user/woman.png") no-repeat left center;
    background-size: 10px 14px;
  }
  .user_man{
    background: url("../../public/img/contracted_user/man.png") no-repeat left center;
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
  .label_model{
    padding: 5px 10px;
    background: #0edec4;
    border-radius: 6px;
  }
  .label_model_words{
    color: #0edec4;
  }
</style>
