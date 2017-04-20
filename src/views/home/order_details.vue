<template>
  <div>
    <div id="header" class="doctor_header">
      <div class="header_Left" @click="return_before()"><p></p></div>
      <div class="header_center font18">订单详情</div>
      <div class="header_right"></div>
    </div>
    <div id="container">
      <p class="gray_1"></p>
      <div class="order_info none contralview" id="order_top"><!--订单信息-->
        <ul>
          <li>下单用户：<span id="orderinfoname"></span></li>
          <li>联系电话：<span id="orderinfophone"></span></li>
          <li>用户地址：<span id="orderinfoaddress"></span></li>
          <li>服务日期：<span id="orderinfodate"></span></li>
          <li>订单编号：<span id="orderinfonum"></span></li>
          <li>订单状态：<span id="orderinfostatus" class="order_detail"></span></li>
        </ul>
      </div>
      <p class="gray_1"></p>
      <div class="basic_info none contralview" id="baby_basic_info"><!--宝宝基本信息-->
        <h4>宝宝基本信息</h4>
        <div id="editHealthRecord" @click="getHealthRecord" class="editHealthRecord none contralview">编辑健康档案</div>
        <p class="gray_2"></p>
        <ul>
          <li class="a">姓名：<span id="babyName"></span></li>
          <li class="b">性别：<span id="babySex"></span></li>
          <li class="c">生日：<span id="babyBirth"></span></li>
        </ul>

      </div>
      <p class="gray_1"></p>

      <div id="product_info" class="product_info none contralview"><!--产品信息-->
        <div class="title">
          <img src="" width="40" height="40" id="productImage">
          <span id="productName"></span>
        </div>
        <p class="gray_2"></p>
        <div class="product_list">

          <p class="gray_2"></p>
          <div class="product_span" id="productItem">
            <ul type="circle">
              <!--
                        <li class="label_blue">腹部外观腹部外观腹部外观腹部外观</li>
                        -->
            </ul>
          </div>
        </div>
      </div>
      <p class="gray_1"></p>
      <div class="none contralview" id="healthResultRecord_box">
        <div id="resultTag" class="resultTag">
          <ul>
            <!--
                    <li class="tagNow">生长评估</li><li class="tagNew">提个检查</li><li class="tagNew">问诊</li><li class="tagNew">测量</li><li class="tagNew">发育检查</li><li class="tagNew">健康指导</li>
                    -->
          </ul>
        </div>
        <div class="resultRecordingBox">
          <div class="resultRecordingPage">
            <div id="appendResultRecordingBox" class="appendResultRecordingBox">

            </div>
            <div class="resultRecordingBtn" style="position: fixed;width: 100%;bottom:0px;">
              <div @click="goStep('next')" id="firstStep" class="button none">继续下一步</div>
              <div id="otherStep" class="button none">
                <span @click="goStep('prev')" id="prevStep">返回上一步</span>
                <span @click="goStep('next')" id="nextStep">继续下一步</span>
              </div>
              <div id="lastStep" class="button button-blue none">
                <span @click="goStep('prev')" id="prevStep">返回上一步</span>
                <span id="nextStep" @click="updateHealthDirect">完成</span>
              </div>
              <div id="onlyStep" class="button button-blue none" @click="nextOrder">完成</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div style="display:none" class="babyHealthRecord" id="babyHealthRecord">
      <div class="babyHealthRecord_control">
        <div id="cancelHealthRecord" @click="updateHealthRecord" class="healthBtnCancel cliB">跳过</div>
        <div id="updateHealthRecord" @click="updateHealthRecord" class="healthBtnCurrent cliB">保存</div>
      </div>
      <div class="babyHealthRecord_info">
        <div class="levelOne">
          <ul>
            <li data-num="0" class="liActive">个人信息</li>
            <li data-num="1">健康信息</li>
            <li data-num="2">过往史</li>
            <li data-num="3">过敏史</li>
          </ul>
        </div>
        <div class="levelTwo">
          <div class="birthInfo">
            <ul>
              <li style="display:none">
                <label>id:</label>
                <input class="val" id="id" type="text" placeholder="id" />
              </li>
              <li>
                <label>姓名:</label>
                <input class="val" id="babyName" type="text" placeholder="宝宝姓名" />
              </li>
              <li>
                <label>性别:</label>
                <select id="babySex"><option>请选择</option><option>男</option><option>女</option></select>
              </li>
              <li>
                <label>出生日期:</label>
                <input class="val" id="babyBirthday" type="date" placeholder="宝宝生日" />
              </li>
              <li>
                <label>母亲姓名:</label>
                <input class="val" id="motherName" placeholder="母亲姓名" />
              </li>
              <li>
                <label>母亲身高（cm）:</label>
                <input class="val mustNumber" id="heightOfMother" placeholder="母亲身高" />
              </li>
              <li>
                <label>母亲是否贫血:</label>
                <select id="motherAnemia"><option>请选择</option><option>是</option><option>否</option></select>
              </li>
              <li>
                <label>家庭地址:</label>
                <input class="val" id="permanentAddress" type="text" placeholder="家庭地址" />
              </li>
              <li class="hidden">
                <label>是否早教:</label>
                <select id="earlyEducation"><option>请选择</option><option>是</option><option>否</option></select>
              </li>
              <li>
                <label>主要照看人:</label>
                <select id="mainCaregivers"><option>请选择</option><option>爷爷奶奶</option>
                  <option>父母本人</option>
                  <option>保姆</option>
                  <option>外公外婆</option>
                  <option>其他</option>
                </select>
              </li>
            </ul>
          </div>
          <div style="display:none" class="familyInfo">
            <ul>
              <!--<li class="liTitle">母亲信息:</li>-->
              <li>
                <label>生产方式:</label>
                <select id="bornWay"><option>请选择</option><option>自然分娩</option>
                  <option>剖腹产</option>
                  <option>异常分娩</option>
                </select>
              </li>
              <li class="hidden">
                <label>母亲孕周（周）:</label>
                <input class="val mustNumber intNumber" id="gestationalAge" type="text" placeholder="母亲孕周" />
              </li>
              <li>
                <label>是否足月生产:</label>
                <select id="termPregnancy"><option>请选择</option>
                  <option>是</option>
                  <option>否</option>
                </select>
              </li>
              <li>
                <label>宝宝出生后是否通过特殊治疗:</label>
                <select id="babyPostnatalSpecialTreatment"><option>请选择</option>
                  <option>是</option>
                  <option>否</option>
                </select>
              </li>
              <li class="forDesc">
                <label>宝宝出生后通过特殊治疗详情:</label>
                <textarea id="babyPostnatalSpecialTreatmentDetails" class="liTextarea" placeholder="宝宝出生后通过特殊治疗详情"></textarea>
              </li>
              <li>
                <label>身体是否有畸形:</label>
                <select id="bodyDeformity"><option>请选择</option>
                  <option>是</option>
                  <option>否</option>
                </select>
              </li>
              <li>
                <label>是否有先天性疾病:</label>
                <select id="congenitalDisease"><option>请选择</option>
                  <option>是</option>
                  <option>否</option>
                </select>
              </li>
              <li>
                <label>胎次（次）:</label>
                <input class="val mustNumber intNumber" id="parity" type="text" placeholder="胎次" />
              </li>
              <li>
                <label>出生体重（kg）:</label>
                <input class="val mustNumber" id="birthWeight" type="text" placeholder="出生体重" />
              </li>
              <li>
                <label>出生身长（cm）:</label>
                <input class="val mustNumber" id="birthBodyLength" type="text" placeholder="出生身长" />
              </li>
              <li>
                <label>出生医院:</label>
                <input class="val" id="bornHospital" type="text" placeholder="出生医院" />
              </li>

              <li>
                <label>血型:</label>
                <select id="bloodType">
                  <option>请选择</option>
                  <option>A</option>
                  <option>B</option>
                  <option>O</option>
                  <option>AB</option>
                  <option>未知</option>
                </select>
                <!--<input class="val" id="degreeOfMotherEducation" type="text" placeholder="文化程度" />-->
              </li>

              <li>
                <label>出牙月份（月）:</label>
                <input class="val mustNumber" id="teethingMonth" type="text" placeholder="出牙月份" />
              </li>
              <li>
                <label>喂养方式:</label>
                <select id="feedingMode">
                  <option>请选择</option>
                  <option>母乳</option>
                  <option>配方奶</option>
                  <option>混合喂养</option>
                </select>
              </li>
              <li>
                <label>是否定期注射疫苗:</label>
                <select id="periodicallyVaccination">
                  <option>请选择</option>
                  <option>是</option>
                  <option>否</option>
                </select>
              </li>
              <li>
                <label>疫苗注射机构:</label>
                <input class="val" id="vaccineInjectionMechanism" type="text" placeholder="疫苗注射机构" />
              </li>
              <li>
                <label>疫苗注射是否有不良反应:</label>
                <select id="vaccineInjectionBadReaction">
                  <option>请选择</option>
                  <option>是</option>
                  <option>否</option>
                </select>
              </li>
              <li>
                <label>是否定期儿童保健:</label>
                <select id="periodicallyChildHealth">
                  <option>请选择</option>
                  <option>是</option>
                  <option>否</option>
                </select>
              </li>
              <li>
                <label>儿保机构:</label>
                <input class="val" id="childHealthInstitution" type="text" placeholder="儿保机构" />
              </li>
              <li>
                <label>是否做过视力筛查:</label>
                <select id="eyeScreening">
                  <option>请选择</option>
                  <option>是</option>
                  <option>否</option>
                </select>
              </li>
              <li>
                <label>是否做过听力筛查:</label>
                <select id="earScreening">
                  <option>请选择</option>
                  <option>是</option>
                  <option>否</option>
                </select>
              </li>
              <li>
                <label>是否有家族遗传病史:</label>
                <select id="ifFamilyHistory">
                  <option>请选择</option>
                  <option>是</option>
                  <option>否</option>
                </select>
              </li>
            </ul>
          </div>
          <div style="display:none" class="healthRecord">
            <ul>
              <li>
                <label>是否有疾病过往史:</label>
                <select id="diseaseHistory">
                  <option>请选择</option>
                  <option>是</option>
                  <option>否</option>
                </select>
              </li>
              <li class="hidden">
                <label>感冒发烧:</label>
                <select id="cold">
                  <option>请选择</option>
                  <option>是</option>
                  <option>否</option>
                </select>
              </li>
              <li class="hidden">
                <label>肺炎:</label>
                <select id="pneumonia">
                  <option>请选择</option>
                  <option>是</option>
                  <option>否</option>
                </select>
              </li>
              <li class="hidden">
                <label>支气管炎:</label>
                <select id="bronchitis">
                  <option>请选择</option>
                  <option>是</option>
                  <option>否</option>
                </select>
              </li>
              <li class="hidden">
                <label>急性化脓性扁桃体炎:</label>
                <select id="acuteSuppurativeTonsillitis">
                  <option>请选择</option>
                  <option>是</option>
                  <option>否</option>
                </select>
              </li>
              <li class="hidden">
                <label>急性喉炎:</label>
                <select id="acuteLaryngitis">
                  <option>请选择</option>
                  <option>是</option>
                  <option>否</option>
                </select>
              </li>
              <li class="hidden">
                <label>哮喘:</label>
                <select id="asthma">
                  <option>请选择</option>
                  <option>是</option>
                  <option>否</option>
                </select>
              </li>
              <li class="hidden">
                <label>腹泻:</label>
                <select id="diarrhea">
                  <option>请选择</option>
                  <option>是</option>
                  <option>否</option>
                </select>
              </li>
              <li class="hidden">
                <label>贫血:</label>
                <select id="anemia">
                  <option>请选择</option>
                  <option>是</option>
                  <option>否</option>
                </select>
              </li>
              <li class="hidden">
                <label>营养不良:</label>
                <select id="innutrition">
                  <option>请选择</option>
                  <option>是</option>
                  <option>否</option>
                </select>
              </li>
              <li class="hidden">
                <label>皮疹:</label>
                <select id="erythra">
                  <option>请选择</option>
                  <option>是</option>
                  <option>否</option>
                </select>
              </li>
              <li>
                <label>是否住院治疗:</label>
                <select id="hospitalization">
                  <option>请选择</option>
                  <option>是</option>
                  <option>否</option>
                </select>
              </li>
              <li class="hidden">
                <label>其他疾病过往史:</label>
                <select id="otherHistory">
                  <option>请选择</option>
                  <option>是</option>
                  <option>否</option>
                </select>
              </li>
              <li class="hidden">
                <label>住院治疗次数:（次）</label>
                <input id="hospitalizationNumber" class="val mustNumber intNumber" type="text" placeholder="住院治疗次数" />
              </li>
              <li class="forDesc hidden">
                <label>疾病过往史详情:</label>
                <textarea id="otherHistoryDetails" class="liTextarea" placeholder="其他疾病过往史详情"></textarea>
              </li>
              <li class="forDesc">
                <label>常去的医院:</label>
                <textarea id="frequentedHospital" class="liTextarea" placeholder="常去的医院"></textarea>
              </li>
            </ul>
          </div>
          <div style="display:none" class="growthEnvironment">
            <ul>
              <li>
                <label>是否有过敏史:</label>
                <select id="ifDrugAllergyHistory">
                  <option>请选择</option>
                  <option>是</option>
                  <option>否</option>
                </select>
              </li>
              <li class="hidden">
                <label>头孢类:</label>
                <select id="cephalosporin">
                  <option>请选择</option>
                  <option>是</option>
                  <option>否</option>
                </select>
              </li>
              <li class="hidden">
                <label>青霉素类:</label>
                <select id="penicillins">
                  <option>请选择</option>
                  <option>是</option>
                  <option>否</option>
                </select>
              </li>
              <li class="hidden">
                <label>某种特定的药过敏:</label>
                <select id="specificDrugAllergy">
                  <option>请选择</option>
                  <option>是</option>
                  <option>否</option>
                </select>
              </li>
              <li class="hidden">
                <label>食物:</label>
                <select id="food">
                  <option>请选择</option>
                  <option>是</option>
                  <option>否</option>
                </select>
              </li>
              <li class="hidden">
                <label>季节性过敏:</label>
                <select id="seasonalAllergic">
                  <option>请选择</option>
                  <option>是</option>
                  <option>否</option>
                </select>
              </li>
              <li class="hidden">
                <label>接触过敏:</label>
                <select id="contactAllergy">
                  <option>请选择</option>
                  <option>是</option>
                  <option>否</option>
                </select>
              </li>
              <li class="hidden">
                <label>其他过敏史:</label>
                <select id="otherAllergy">
                  <option>请选择</option>
                  <option>是</option>
                  <option>否</option>
                </select>
              </li>
              <li class="forDesc">
                <label>过敏史详情:</label>
                <textarea id="otherAllergyDetails" class="liTextarea" placeholder="其他过敏史详情"></textarea>
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
 import '../../public/css/door_bespeak_open/order_details.css';
 import orderDetails from '../../public/js/door/order_details';
  export default {
    data(){
      return{
        orderDetail:null,
        orderId:null
      }
    },
    created: function () {
      this.orderId = this.$route.params.orderId;
    },
    mounted:function (){
      var _this=this;
      _this.orderDetail=orderDetails(_this.orderId);
      _this.orderDetail.getOrderInfo();
    },
   methods:{
     goStep:function(type){
       this.orderDetail.goStep(type);
     },
     updateHealthRecord:function(){
       this.orderDetail.updateHealthRecord();
     },
     nextOrder:function(){
       this.orderDetail.nextOrder();
     },
     updateHealthDirect:function(){
       this.orderDetail.updateHealthDirect();
     },
     getHealthRecord:function(){
       this.orderDetail.getHealthRecord();
     }
   }
  }
</script>
<style scoped>
  .header-right span{
    border: 1px solid #ffffff;
    padding: 1px 5px;
    border-radius: 30px;
    font-size: 12px;
  }
  .flex_cont{
    padding: 10px 18px;
    border-bottom: 1px solid #e8e8e8;
  }
  #container {
    margin: 45px 0 50px 0;
  }
</style>

