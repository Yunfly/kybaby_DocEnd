<template>
  <div>
    <div id="header" class="doctor_header">
      <div class="header_Left" @click="return_before()"><p></p></div>
      <div class="header_center font18">基础档案</div>
      <div class="header_right"></div>
    </div>
    <div id="container">
      <div id="babyHealthHasRecord">
        <div class="birthInfo">
          <h3 class="liTitle"><button class="btn">个人信息</button></h3>
          <ul>
            <li style="display:none">
              <label>id:</label>
              <input class="id" type="text"/>
            </li>
            <li>
              <label>姓名:</label>
              <input class="babyName" type="text"/>
            </li>
            <li>
              <label>性别:</label>
              <input class="babySex" type="text"/>
            </li>
            <li>
              <label>出生日期:</label>
              <input class="babyBirthday" type="text"/>
            </li>
            <li>
              <label>母亲姓名:</label>
              <input class="motherName" type="text"/>
            </li>
            <li>
              <label>母亲身高:</label>
              <input class="heightOfMother" type="text"/>
            </li>
            <li class="hidden">
              <label>母亲是否贫血:</label>
              <input class="motherAnemia" type="text"/>
            </li>
            <li>
              <label>常住地址:</label>
              <input class="permanentAddress" type="text"/>
            </li>
            <li>
              <label>是否早教:</label>
              <input class="earlyEducation" type="text"/>
            </li>
            <li style="border-bottom: 0">
              <label>主要照看人:</label>
              <input class="mainCaregivers" type="text"/>
            </li>
          </ul>
        </div>
        <p class="gray_s"></p>
        <div class="familyInfo">
          <h3 class="liTitle"><button class="btn">健康信息</button></h3>
          <ul>
            <!--<li class="liTitle" style="color:#ff94a0;text-indent: 0;border-bottom: 0">母亲信息:</li>-->
            <li>
              <label>生产方式:</label>
              <input class="bornWay" type="text"/>
            </li>
            <li class="hidden">
              <label>母亲孕周（周）:</label>
              <input class="gestationalAge" type="text"/>
            </li>
            <li>
              <label>是否足月生产:</label>
              <input class="termPregnancy" type="text"/>
            </li>
            <li>
              <label>宝宝出生后是否通过特殊治疗:</label>
              <input class="babyPostnatalSpecialTreatment" type="text"/>
            </li>
            <li class="hidden">
              <label>宝宝出生后通过特殊治疗详情:</label>
              <input class="babyPostnatalSpecialTreatmentDetails" type="text"/>
            </li>
            <li>
              <label>身体是否有畸形:</label>
              <input class="bodyDeformity" type="text"/>
            </li>
            <!--
            <li class="forDesc">
                <label>不良生活习惯</label>
                <div class="checkboxdiv">
                    <label>喝酒:<input type="checkbox" /></label>
                    <label>抽烟:<input type="checkbox" /></label>
                    <label>打游戏:<input type="checkbox" /></label>
                    <label>其它:<input type="checkbox" /></label>
                </div>
            </li>
            -->
            <!--<li class="liTitle" style="color:#ff94a0;text-indent: 0;border-bottom: 0">父亲信息:</li>-->
            <li>
              <label>是否有先天性疾病:</label>
              <input class="congenitalDisease" type="text"/>
            </li>
            <li>
              <label>胎次（次）:</label>
              <input class="parity" type="text"/>
            </li>
            <li>
              <label>出生体重(kg):</label>
              <input class="birthWeight" type="text"/>
            </li>
            <li>
              <label>出生身长(cm):</label>
              <input class="birthBodyLength" type="text"/>
            </li>
            <li>
              <label>出生医院:</label>
              <input class="bornHospital" type="text"/>
            </li>
            <li>
              <label>血型:</label>
              <input class="bloodType" type="text"/>
            </li>
            <li>
              <label>出牙月份（月）:</label>
              <input class="teethingMonth" type="text"/>
            </li>
            <li>
              <label>喂养方式:</label>
              <input class="feedingMode" type="text"/>
            </li>
            <li>
              <label>是否定期注射疫苗:</label>
              <input class="periodicallyVaccination" type="text"/>
            </li>
            <li>
              <label>疫苗注射机构:</label>
              <input class="vaccineInjectionMechanism" type="text"/>
            </li>
            <li>
              <label>疫苗注射是否有不良反应:</label>
              <input class="vaccineInjectionBadReaction" type="text"/>
            </li>
            <li>
              <label>是否定期儿童保健:</label>
              <input class="periodicallyChildHealth" type="text"/>
            </li>
            <li>
              <label>儿保机构:</label>
              <input class="childHealthInstitution" type="text"/>
            </li>
            <li>
              <label>是否做过视力筛查:</label>
              <input class="eyeScreening" type="text"/>
            </li>
            <li>
              <label>是否做过听力筛查:</label>
              <input class="earScreening" type="text"/>
            </li>
            <li style="border-bottom: 0">
              <label>是否有家族遗传病史:</label>
              <input class="ifFamilyHistory" type="text"/>
            </li>
            <!--
            <li class="forDesc">
                <label>不良生活习惯</label>
                <div class="checkboxdiv">
                    <label>喝酒:<input type="checkbox" /></label>
                    <label>抽烟:<input type="checkbox" /></label>
                    <label>打游戏:<input type="checkbox" /></label>
                    <label>其它:<input type="checkbox" /></label>
                </div>
            </li>
            -->
          </ul>
        </div>
        <p class="gray_s"></p>
        <div class="healthRecord">
          <h3 class="liTitle"><button class="btn">过往史</button></h3>
          <ul>
            <li>
              <label>是否有疾病过往史:</label>
              <input class="diseaseHistory" type="text"/>
            </li>
            <li class="hidden">
              <label>感冒发烧:</label>
              <input class="cold" type="text"/>
            </li>
            <li class="forDesc hidden">
              <label>肺炎:</label>
              <div class="pneumonia"></div>
            </li>
            <li class="hidden">
              <label>支气管炎:</label>
              <input class="bronchitis" type="text"/>
            </li>
            <li class="hidden">
              <label>急性化脓性扁桃体炎:</label>
              <input class="acuteSuppurativeTonsillitis" type="text"/>
            </li>
            <li class="hidden">
              <label>急性喉炎:</label>
              <input class="acuteLaryngitis" type="text"/>
            </li>
            <li class="hidden">
              <label>哮喘:</label>
              <input class="asthma" type="text"/>
            </li>
            <li class="hidden">
              <label>腹泻:</label>
              <input class="diarrhea" type="text"/>
            </li>
            <li class="hidden">
              <label>贫血:</label>
              <input class="anemia" type="text"/>
            </li>
            <li class="hidden">
              <label>营养不良:</label>
              <input class="innutrition" type="text"/>
            </li>
            <li class="hidden">
              <label>皮疹:</label>
              <input class="erythra" type="text"/>
            </li>
            <li>
              <label>是否住院治疗:</label>
              <input class="hospitalization" type="text"/>
            </li>
            <li class="hidden">
              <label>其他疾病过往史:</label>
              <input class="otherHistory" type="text"/>
            </li>
            <li class="hidden">
              <label>住院治疗次数（次）:</label>
              <input class="hospitalizationNumber" type="text"/>
            </li>
            <li class="forDesc hidden">
              <label>其他疾病过往史详情:</label>
              <div class="otherHistoryDetails"></div>
            </li>
            <li class="forDesc" style="border-bottom: 0">
              <label>常去的医院:</label>
              <div class="frequentedHospital"></div>
            </li>
          </ul>
        </div>
        <p class="gray_s"></p>
        <div class="growthEnvironment">
          <h3 class="liTitle"><button class="btn">过敏史</button></h3>
          <ul>
            <li>
              <label>是否有过敏史:</label>
              <input class="ifDrugAllergyHistory" type="text"/>
            </li>
            <li class="hidden">
              <label>头孢类:</label>
              <input class="cephalosporin" type="text"/>
            </li>
            <li class="hidden">
              <label>青霉素类:</label>
              <input class="penicillins" type="text"/>
            </li>
            <li class="hidden">
              <label>某种特定的药过敏:</label>
              <input class="specificDrugAllergy" type="text"/>
            </li>
            <li class="hidden">
              <label>食物:</label>
              <input class="food" type="text"/>
            </li>
            <li class="hidden">
              <label>季节性过敏:</label>
              <input class="seasonalAllergic" type="text"/>
            </li>
            <li class="hidden">
              <label>接触过敏:</label>
              <input class="contactAllergy" type="text"/>
            </li>
            <li class="hidden">
              <label>其他过敏史:</label>
              <input class="otherAllergy" type="text"/>
            </li>
            <li class="forDesc" style="border-bottom: 0">
              <label>过敏史详情:</label>
              <div class="otherAllergyDetails"></div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import $ from 'jquery';
  export default{
    data(){
      return{
        orders:'',
      }
    },
    created: function () {
      // 页面加载时跳转
      // this.loading();
      this.id = this.$route.query.id;
    },
    mounted:function(){
      var id = this.id;
//      var whoLoginFlag=sessionStorage.getItem('whoLoginFlag');
//      this.$ajax.post(urlWay.host+'kybaby/doctorOrder/orderManager.action?whoLoginFlag='+whoLoginFlag,
//          'action=getBabyBasicData&orderInfo.id='+id)
//        .then(function(result){
//          that.orders = result.data;
//        })
//        .catch(function (error) {
//          console.log(error);
//        });
      this.getHealthRecord(id);
    },
    methods: {
      getHealthRecord: function (id) {
        //获取健康档案信息
        $.ajax({
          type: 'post',
          url: urlWay.host+'kybaby/doctorOrder/orderManager.action?whoLoginFlag=doctor',
          cache: false,
          async: true,
          data: {
            action: "getBabyBasicData",
            "orderInfo.id":id
          },
          success: function (result) {
            if (result.mes == '请登录') {
              ale('请登录');
              if(whoLoginFlag=='operator'){
                link_to('org_login.html');
                return;
              }
              link_to("login.html");
            }
            else if (result.mes == "成功") {
              $.each(result.babyBasicData,function(key,val){
                $('#babyHealthHasRecord .'+key+'').val(val).attr("readonly","readonly");
                if(key=='hospitalizedRemark' || key=='vaccineAbnormalRemark' || key=='allergiesRemark'){
                  $('#babyHealthHasRecord .'+key+'').html(val);
                }
                var obj = $(".levelTwo input,.levelTwo select,.levelTwo textarea").filter(function(){
                  return $(this).attr("id") == key;
                });
                if(obj.get(0) == undefined){
                  return true;
                }else if(obj.get(0).tagName == "INPUT"){
                  if(val!=null && val!= ''){
                    $(obj).attr("readonly","readonly");
                  }
                  obj.val(val);
                }else if(obj.get(0).tagName == "TEXTAREA"){
                  if(val!=null && val!= ''){
                    $(obj).attr("readonly","readonly");
                  }
                  obj.val(val);
                }else if(obj.get(0).tagName == "SELECT"){
                  if(val!=null && val!= ''){
                    $(obj).attr("disabled","disabled");
                  }
                  obj.find("option").each(function(){
                    $(this).removeAttr('selected');
                    if(val==''&& $(this).text()=='请选择'){
                      $(this).attr('selected','selected');
                    }else if($(this).text() == val){
                      $(this).attr('selected','selected');
                    }
                  });
                  if(obj.parent().next().hasClass("forDesc")){
                    if(val == "无" || val == "否"){
                      obj.parent().next().hide();
                    }
                  }
                }else{
                }
              });
            }
          },
          error: function (XMLHttpRequest, textStatus, errorThrown) {
            layer();
          }
        });
      }
    }
  }
</script>
<style scoped>
  #container {
    margin: 45px 0 50px 0;
  }
  #babyHealthHasRecord h3 {
    margin: 10px 0 8px 6px;
  }
  .liTitle {
    text-indent: 10px;
    font-weight: bold;
    color: #23c9e7;
  }
  .btn{
    height: 29px;
  }
  #babyHealthHasRecord ul {
    padding: 0 18px;
    background: #fff;
  }
  #babyHealthHasRecord li {
    line-height: 40px;
    overflow: hidden;
    border-bottom: 1px solid #eee;
    padding: 0 6px;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
  }
  #babyHealthHasRecord label {
    height: 40px;
    /*width: 42%;*/
    text-align: left;
    display: inline-block;
    float: left;
    line-height: 40px;
    color: #333;
  }
  #babyHealthHasRecord input, #babyHealthHasRecord textarea, #babyHealthHasRecord select, #babyHealthHasRecord li div {
    /*width: 54%;*/
    color: #333;
    border: none;
    float: left;
    line-height: 40px;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    width: 0%;
    margin-left: 10px;
    font-size: 12px;
    color: #9a9a9a;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    height: 40px;
  }
</style>
