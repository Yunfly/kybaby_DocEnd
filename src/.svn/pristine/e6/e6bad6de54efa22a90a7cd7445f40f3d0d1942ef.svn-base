<template>
  <div >
    <div id="header" class="doctor_header">
      <div class="header_Left" v-on:click="return_before()"><p></p></div>
      <div class="header_center font18" id="header_titles"></div>
      <div class="header_right font12">
        <div id="updateDiv">
          <span>修改</span>
        </div>
        <div style="display:none" id="submitDiv">
          <span>提交</span>
        </div>
      </div>
    </div>
    <div id="container">
      <div id="promptDiv">修改后需要审核，审核未通过之前您将无法提供服务</div>
      <div class="margin_indent">
        <div class="row">
          <label>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</label>
          <input type="text" placeholder="请输入姓名" id="renzheng01">
        </div>
        <p class="gray_3"></p>
        <div class="row">
          <label style="float:left">头像上传：</label>
          <div id="touxiang">
            <div class="updateImg">
              <form class="file" action="" method="post" enctype="multipart/form-data">
                <img src="../../public/img/person_center/icon_add.png" class="h_img" id="tou_img"/>
                <canvas width="40" height="40" class="canvas"></canvas>
                <input type="file" class="input" accept="image/*" name="productSmallFileElem" id="upload" style="display:block;" />
                <canvas class="canvas1"></canvas>
              </form>
            </div>
            <!--<img id="showDoctor_img" onclick="updateDoctorHeadFileElem.click()" style="width:40px;height:40px;" />-->
            <!--<canvas width="40" height="40" onclick="updateDoctorHeadFileElem.click()" id="doctorCanvas"></canvas>-->
            <!--<canvas width="400" height="400" id="doctorCanvasUp" style="display:none"></canvas>-->
            <!--<input style="display:block" accept="image/*" type="file" id="updateDoctorHeadFileElem" onchange="loadImage_touxiang(this)">-->
          </div>
        </div>
        <p class="gray_3"></p>
        <div class="row">
          <label>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</label>
          <!--<select id="selected">-->
          <!--<option>男</option>-->
          <!--<option>女</option>-->
          <!--</select>-->
          <div id="sex"><p class="sex_box selected" data-sex="男"><span></span> 男</p><p class="sex_box" data-sex="女"><span></span> 女</p></div>
        </div>
        <p class="gray_3"></p>
        <div class="row">
          <label>执业证号：</label>
          <input type="text" placeholder="请输入医师执业证号" id="idCard">
        </div>
        <p class="gray_3"></p>
        <div class="row">
          <label style="float:left">执业证书：</label>
          <div id="zhizhao">
            <div class="updateImg">
              <form class="file" action="" method="post" enctype="multipart/form-data">
                <img src="../../public/img/person_center/icon_add.png" class="h_img" id="linces_img"/>
                <canvas width="40" height="40" class="canvas"></canvas>
                <input type="file" class="input" accept="image/*" name="productSmallFileElem" id="upload_img" style="display:block;" />
                <canvas class="canvas1"></canvas>
              </form>
            </div>
            <!--<img id="show_img" onclick="updateMyHeadFileElem.click()" style="width:40px;height:40px;" />-->
            <!--<canvas width="40" height="40" onclick="updateMyHeadFileElem.click()" id="myCanvas"></canvas>-->
            <!--<canvas width="800" height="800" id="myCanvasUp" style="display:none"></canvas>-->
            <!--<input style="display:block" accept="image/*" type="file" id="updateMyHeadFileElem" onchange="loadImage_zhizhao(this)">-->
          </div>
        </div>
      </div>
      <p class="gray_1"></p>
      <div class="margin_indent">
        <div id="workUnitDiv" class="row">
          <label>工作单位：</label>
          <span style="display: inline-block;width: 60%;margin-left: 2%;" id="renzheng03" data-hospital="">请输入工作单位</span>
          <!--<input type="text" placeholder="请输入工作单位">-->
          <input type="hidden" id="renzheng03Id">
        </div>
        <p class="gray_3"></p>
        <div class="row">
          <label>所属科室：</label>
          <select id="renzheng10">
            <!--<option value="儿科">儿科</option>-->
            <!--<option value="妇产科">妇产科</option>-->
            <!--<option value="儿童保健科">儿童保健科</option>-->
            <!--<option value="内科">内科</option>-->
            <!--<option value="全科">全科</option>-->
            <!--<option value="中医推拿">中医推拿</option>-->
            <!--<option value="心理科">心理科</option>-->
            <!--<option value="乳腺科">乳腺科</option>-->
          </select>
        </div>
        <p class="gray_3"></p>
        <div class="row">
          <label>医生职称：</label>
          <select id="doctorTittle">

          </select>
        </div>
        <p class="gray_3"></p>
        <div class="row">
          <label>临床经验：</label>
          <input type="text" id="renzheng09" style="width: 10%;">
          <span>年</span>
        </div>
        <p class="gray_3"></p>
        <!--<div class="row much_content">-->
        <!--<span class="tittle much_title">专业方向：</span><br/>-->
        <!--<ul id="majorList">-->
        <!--&lt;!&ndash;-->
        <!--<li><span class="blue">内科</span></li>-->
        <!--<li><span class="grey">脑科</span></li>-->
        <!--<li><span class="grey">脑科</span></li>-->
        <!--<li><span class="grey">脑科</span></li>-->
        <!--&ndash;&gt;-->
        <!--</ul>-->
        <!--</div>-->
        <div id="direction_information">
          <div class="information_div flex_cont layer_choose bgfff row" data-id="0" data-name="professional">
            <label>主专业方向：</label>
            <p id="doc_direction" class="flex_item text-right">请选择</p>
          </div>
          <p class="gray_3"></p>
          <div class="information_div flex_cont layer_choose bgfff row" data-id="1" data-name="professional">
            <label>亚专业：</label>
            <p id="doc_professional" class="flex_item text-right">请选择</p>
          </div>
          <p class="gray_3"></p>
          <div class="information_div flex_cont layer_choose bgfff row" data-id="2" data-name="professional">
            <label>病种：</label>
            <p id="doc_diseases" class="flex_item text-right">请选择</p>
          </div>
        </div>
      </div>
      <p class="gray_1"></p>
      <div class="margin_indent">
        <div class="row">
          <span class="tittle much_title">服务类型：</span><br/>
          <!--<p class="gray_3"></p>-->
          <div id="serviceType"></div>
        </div>
      </div>
      <!--
      <p class="gray_1"></p>
      <div class="row">
          <span class="tittle">咨询服务</span><br/>
          <span id="consultation_service_id"></span>
          <ul id="consultationService">
              <li><span class="grey">在线咨询</span></li>
          </ul>
      </div>

    <p class="gray_1"></p>
      <div class="row">
          <span class="tittle">家庭医生</span><br/>
          <span id="family_doctor_id"></span>
          <ul id="familyDoctor">
              <li><span class="grey">上门健康管理</span></li>
              <li><span class="grey">上门小儿推拿</span></li>
              <li><span class="grey">上门母婴护理</span></li>
              <li><span class="grey">上门营养咨询</span></li>
          </ul>
      </div>

    <p class="gray_1"></p>
      <div class="row">
          <span class="tittle">多点执业</span><br/>
          <span id="multiple_practice_id"></span>
          <ul id="multiplePractice">
              <li><span class="grey">单位门诊预约</span></li>
              <li><span class="grey">医疗机构执业</span></li>
          </ul>
      </div>
       -->
      <!--<p class="gray_3"></p>
      <div class="row">
          <label>服务方式</label>
          <select id="renzheng04">
              <option>上门服务</option>
              <option>在线咨询</option>
              <option>全部</option>
          </select>
      </div>
      <p class="gray_3"></p>
      <div class="row">
          <label>上门方式</label>
          <select id="renzheng05">
              <option>自驾</option>
              <option>打车</option>
              <option>平台接送</option>
          </select>
      </div>
      <p class="gray_3"></p>
      <div class="row">
          <label>服务区域</label>
          <select id="renzheng06">
              <option value="5">5公里以内</option>
              <option value="6">6公里以内</option>
              <option value="7">7公里以内</option>
              <option value="8">8公里以内</option>
              <option value="9">9公里以内</option>
              <option value="10" selected="selected">10公里以内</option>
              <option value="20">20公里以内</option>
          </select>
      </div>-->
      <p class="gray_1"></p>
      <div class="margin_indent">
        <div class="row">
          <label>开&nbsp;&nbsp;户&nbsp;&nbsp;行：</label>
          <select id="renzheng07">
            <option value="工商银行">工商银行</option>
            <option value="建设银行">建设银行</option>
            <option value="中国银行">中国银行</option>
            <option value="农业银行">农业银行</option>
            <option value="交通银行">交通银行</option>
            <option value="成都银行">成都银行</option>
            <option value="招商银行">招商银行</option>
            <option value="邮政储蓄">邮政储蓄</option>
            <option value="广发银行">广发银行</option>
            <option value="中信银行">中信银行</option>
            <option value="兴业银行">兴业银行</option>
          </select>
        </div>
        <p class="gray_3"></p>
        <div class="row">
          <label>卡&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：</label>
          <input type="text" placeholder="请输入卡号" id="renzheng08">
        </div>

        <!-- <p class="gray_1"></p>
        <div class="row">
            <span class="tittle">服务产品</span><br/>
            <span id="service_proId"></span>
            <ul id="serviceProducts"> -->
        <!--
            <li><span class="blue">一个月儿保</span></li>
            <li><span class="grey">一岁儿保</span></li>
            <li><span class="grey">两岁儿保</span></li>
            <li><span class="grey">两个月儿保</span></li>
            <li><span class="blue">一个月儿保</span></li>
            <li><span class="grey">一岁儿保</span></li>
            <li><span class="grey">两岁儿保</span></li>
            <li><span class="grey">两个月儿保</span></li>
         -->
        <!-- </ul>
        </div> -->
      </div>
      <p class="gray_1"></p>
      <div class="margin_indent">
        <div class="row" style="display: none">
          <span class="tittle">咨询标签：</span><br/>
          <ul id="symptomTag">
            <!--
                <li><span class="blue">咳嗽不止</span></li>
                <li><span class="grey">发烧</span></li>
                <li><span class="grey">发烧</span></li>
                <li><span class="grey">发烧</span></li>
                <li><span class="grey">发烧</span></li>
                <li><span class="grey">发烧</span></li>
                <li><span class="grey">发烧</span></li>
                <li><span class="blue">咳嗽不止</span></li>
             -->
          </ul>
        </div>
      </div>
    </div>
    <!--container-->
    <!--<footer>-->
    <!--<div class="before">-->
    <!--<img src="images/zxq_15.png" alt="语音">-->
    <!--</div>-->
    <!--<div class="con">-->
    <!--<input type="text">-->
    <!--</div>-->
    <!--<div class="after">-->
    <!--<img src="images/zxq_18.png" alt="加">-->
    <!--<span>发送</span>-->
    <!--</div>-->
    <!--</footer>-->

    <!--footer-->


    <div id="addressCover" style="position: fixed;left: 0px;top:0px;width: 100%;height: 100%;
    background: rgba(0,0,0,.6);z-index: 11111;display: none">
      <div id="choosehospital" style="display: block">
        <a id="close">close</a>
        <div id="areabox">
          <label>&nbsp;</label><br>
          <input id="inputVal" type="text" placeholder="请输入医院名称">
          <span id="search">search</span>
        </div>
        <div id="hosbox">
          <label>选择医院</label>
          <select id="hospital" >
            <!-- 			<option>华西第一大医院</option> -->
            <!-- 			<option>华西第二大医院附属军医院</option> -->
            <!-- 			<option>华西第三大医院附属妇幼保健院</option> -->
          </select>
        </div>
        <p class="clib" id="submit">确认</p>
      </div>
    </div>
    <!--主专业方向-->
    <div id="layer_box">
      <div id="layer_div">
        <div id="layer_list_direction">
          <p class="layer_title">主专业方向</p>
          <div>
            <div class="search_div">
              <div class="flex_cont">
                <input type="text" class="flex_item" placeholder="搜索"/>
                <span></span>
              </div>
            </div>
            <p class="gray_1"></p>
            <div class="layer_list direction_information" data-id="0">
              <ul>
                <li>内科</li>
                <li>外科</li>
                <li>耳鼻喉科</li>
              </ul>
            </div>
          </div>
        </div>
        <div id="layer_list_professional">
          <p class="layer_title">亚专业</p>
          <div>
            <div class="search_div">
              <div class="flex_cont">
                <input type="text" class="flex_item" placeholder="搜索"/>
                <span></span>
              </div>
            </div>
            <p class="gray_1"></p>
            <div class="layer_list_two" data-id="1">
              <ul></ul>
            </div>
            <p class="bottom_button">下一步</p>
          </div>
        </div>
        <div id="layer_list_diseases">
          <p class="layer_title">病种</p>
          <div>
            <div class="search_div">
              <div class="flex_cont">
                <input type="text" class="flex_item" placeholder="搜索"/>
                <span></span>
              </div>
            </div>
            <p class="gray_1"></p>
            <div class="layer_list_two" data-id="2">
              <ul></ul>
            </div>
            <p class="bottom_button">确定</p>
          </div>
        </div>
      </div>
    </div>
    <div id="tc-content">
      <img src="../../public/img/person_center/share.png" height="212" width="500"/>
    </div>
  </div>
</template>
<script>
  import $ from 'jquery'
  import ale from '../../ale'
  require('../../public/css/person_center/doctor_certification.css')
  import doctor_certification from '../../public/js/person_center/doctor_certification'

  export default{
    data(){
      return{
        doctor_type : '',
        doctor_status : ''
      }
    },
    mounted:function(){
      this.doctor_type = this.$route.query.type;
      this.doctor_status = this.$route.query.status;
      doctor_certification(this);
    },
    methods:{

    }
  }
</script>
<style scoped>
  .updateImg{
    margin: 8px 10px 0 0;
    width: 40px;
    height: 40px;
    display: inline-block;
    position: relative;
  }
  .file > input {
    opacity: 0;
    filter: alpha(opacity=0);
    width: 40px;
    height: 40px;
    position: absolute;
    left: 0;
    top: 0;
    padding: 0;
    z-index: 2;
  }
  form.file .canvas {
    display: none;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
  }
  form.file .canvas1 {
    display: none;
  }
  .margin_indent{
    padding: 0 18px;
    background: #fff;
  }
  .much_title {
    margin: 8px 0;
    color: #333;
  }
  #sharebtn img{  width: 36px;  height:auto;  padding: 0 7px;  }
  #tc-content{
    display: none;
    z-index:999;
    position: fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background-color: rgba(0,0,0,0.7);}
  #tc-content img{
    position: absolute;
    top: 0;
    width: 80%;
    height: auto;
    right: 18px;
  }
  .much_title{
    margin-left: 3%;
  }
</style>
