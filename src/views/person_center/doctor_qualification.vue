<template>
  <div>
    <div id="header" class="doctor_header">
      <div class="header_Left" v-on:click="return_before()"><p></p></div>
      <div class="header_center font18">医生认证</div>
      <div class="header_right">
        <div class="edit_logo" onclick="doctor_qualification.edit()"></div>
      </div>
    </div>

    <div id="container" class="bgfff">
      <div id="promptDiv">修改后需要审核，审核未通过之前您将无法提供服务</div>
      <div class="row">
        <label>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名 : </label>
        <span class="paragraph">{{doctorInfo.doctorName}}</span>
      </div>
      <p class="gray_3"></p>
      <div class="row">
        <label>头像上传 : </label>
        <img v-bind:src=imgUrl+doctorInfo.doctorImage />
      </div>
      <p class="gray_3"></p>
      <div class="row">
        <label>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别 : </label>
        <span class="paragraph">{{doctorInfo.doctorSex}}</span>
      </div>
      <p class="gray_3"></p>
      <div class="row">
        <label>执业证号 : </label>
        <span class="paragraph">{{doctorInfo.idCard}}</span>
      </div>
      <p class="gray_3"></p>
      <div class="row">
        <label>职业证书 : </label>
        <img v-bind:src=imgUrl+doctorInfo.licenseImage />
      </div>
      <p class="gray_1"></p>
      <div id="workUnitDiv" class="row">
        <label>工作单位 : </label>
        <span class="paragraph">{{doctorInfo.idCard}}</span>
      </div>
      <p class="gray_3"></p>
      <div class="row">
        <label>所属科室 : </label>
        <select id="renzheng10">
          <option v-bind:value="doctorInfo.doctorEmployer">{{doctorInfo.doctorEmployer}}</option>
        </select>
      </div>
      <p class="gray_3"></p>
      <div class="row">
        <label>医生职称 : </label>
        <span class="paragraph">{{doctorInfo.doctorTitle}}</span>
      </div>
      <p class="gray_3"></p>
      <div class="row">
        <label>临床经验 : </label>
        <span class="paragraph">{{doctorInfo.clinicalExperience}} 年</span>
      </div>

      <p class="gray_3"></p>
      <div class="much_content">
        <label class="tittle much_title">专业方向 : </label><br/><br/>
        <ul id="majorList">
          <li v-for="item in qualification.majorList"><span class="grey">{{item.major}}</span></li>
          <div class="cf"></div>
        </ul>
        <div class="cf"></div>
      </div>

      <div class="cf"></div>
      <div class="much_content">
        <label class="tittle much_title">服务类型 : </label><br/><br/>
      </div>
      <p class="gray_1"></p>
      <div class="much_content" v-for="(item,index) in qualification.doctorServiceTypeFoList" >
        <label class="tittle much_title">{{item.childList[0].parentDoctorServiceType.serviceTypeName}}: </label><br/><br/>
        <ul>
          <li v-for="item in qualification.doctorServiceTypeFoList[index].childList"><span class="grey">{{item.serviceTypeName}}</span></li>
          <div class="cf"></div>
        </ul>
      </div>

      <div class="row">
        <label>开&nbsp;&nbsp;户&nbsp;&nbsp;行 : </label>
        <select id="renzheng07" v-model="bank">
          <option>工商银行</option>
          <option>建设银行</option>
          <option>中国银行</option>
          <option>农业银行</option>
          <option>交通银行</option>
          <option>成都银行</option>
          <option>招商银行</option>
          <option>邮政储蓄</option>
          <option>广发银行</option>
          <option>中信银行</option>
          <option>兴业银行</option>
        </select>
      </div>
      <p class="gray_3"></p>
      <div class="row">
        <label>卡&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号 : </label>
        <span class="paragraph">{{doctorInfo.bankCard}}</span>
      </div>

      <p class="gray_1"></p>
      <div class="row" style="display: none">
        <span class="tittle">咨询标签</span><br/>
        <ul id="symptomTag">
        </ul>
      </div>

    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return{
        qualification:'',
        doctorInfo:'',
        imgUrl : urlWay.fileserver,
      }
    },
    created:function(){
      this.getwebsocketDoctorId();
    },
    mounted:function(){
        var that = this;
        this.$ajax.get(host+'doctorIdentify.action?action=getSomething')
          .then(function(result){
            that.qualification =  result.data;
          })
    },
    methods:{

    }
  }
</script>

<style scoped>
  #container{
    margin: 45px 0px 0px 0px;
  }
  #promptDiv{
    text-align: center;
    display: none;
  }
  .row,.much_content{
    padding:0 18px;}
  .row label{
    width: 20%;
    text-align: center;
    color: #333;
    font-size: 1.2rem;
    background-color: none;
  }
  .row{
    line-height: 48px;
    height: 48px;
  }
  .row img{
    width: 32px;
    height:auto;
    vertical-align: middle;
  }

  .much_content{
    padding-top: 10px;
  }
  .much_content label{
    width: 20%;
    text-align: center;
  }
  .much_content ul li{
    float: left;
    margin: 0 5px;
    height: 30px;
  }
  .blue,.grey{
    color: #fff;
    padding: 5px 10px;
    border-radius: 2px;
  }
  .blue{
    background-color: #0eced4;
  }
  .grey{
    background-color: #c2c2c2;
  }
</style>
