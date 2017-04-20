<template>
  <div>
    <div id="header" class="doctor_header">
      <div class="header_Left"><p @click="return_before()"></p></div>
      <div class="header_center font18">与 {{userName}} 咨询</div>
      <div class="header_right">
        <div class="more_btn" @click="layer_menu=!layer_menu"></div>
      </div>
      <div id="layer_menu" v-show="layer_menu" class="font12 hidden">
        <span id="black_triangle"></span>
        <div>
          <router-link :to="{path:'/consulting/consulting_illness_impression',query: {logId:this.logId,userId:this.userId,isTag:this.isTag}}" >
            结束
          </router-link>
        </div>
      </div>
      <div class="flex_cont babyTitle" v-if="consulting.consultBabyInfo!=null">
        <div class="flex_item">
          姓名:{{consulting.consultBabyInfo.babyName}}
        </div>
        <div class="flex_item">
          生日:{{consulting.consultBabyInfo.birthday}}
        </div>
        <div class="flex_item">
          性别:{{consulting.consultBabyInfo.sex}}
        </div>
      </div>
    </div>
    <div class="quickBox"  v-show="quickBox" >
      <div id="container_full">
        <div class="promptItem bgfff">
          <ol class="font10 text">
            <li class="flex_cont" v-bind:class="{gray_line : index != 0}" v-for="(item, index) in quickMessage">
              <p class="flex_item item_box" v-html="item.fastContent" @click="choseRecovery(item.fastContent)">{{item.fastContent}}</p>
            </li>
          </ol>
        </div>

      </div>
      <div id="quick_btn">
        <div>
          <button type="submit" class="btn btn_block font16" v-on:click="$router.push('/quick_recovery')" >添加快捷回复</button>
        </div>
      </div>
    </div>
    <div id="container">
      <div id="consulting_list">
        <div class="padding_original">
          <div class="dialogue_box" v-for="(item,index) in someConsultList">
            <p class="consult_time">{{item.submitTime}}</p>
            <!--用户回复-->
            <div class="doctor_li" v-if="item.isReply =='N'">
              <div class="flex_cont flex_simple">
                <div class="header_img">
                  <img :src="imgUrl+consulting.userImg.split('::')[0]" v-if="hasPic" />
                  <img :src="imgUrl+defaultImg" v-else  />
                </div>
                <div class="from_div_left"></div>
                <div class="flex_item doctor_dialogue">
                  <p class="doctor_words" v-if="!(item.symptomDescribe==''||item.symptomDescribe==null) ">{{item.symptomDescribe}}</p>
                  <img  v-if="!(item.symptomImage==''||item.symptomImage==null)"   :src=imgUrl+item.symptomImage >
                </div>
              </div>
            </div>
            <!--医生回复-->
            <div class="user_li" v-else >
              <div class="flex_cont flex_simple">
                <div class="flex_item user_dialogue">
                  <p class="user_words" v-if="item.doctorReplyImg==null">{{consultingMsg[index].doctorReply}}</p>
                  <p v-else>
                  <img :src=imgUrl+item.doctorReplyImg   >
                  </p>
                </div>
                <div class="from_div_right"></div>
                <div class="header_img"><img :src="imgUrl+consulting.doctorImg" alt=""/></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isTag">
    </div>
    <div id="input_box" v-else class="padding bgfff" v-show="!quickBox" >
      <div id="input_div" class="flex_cont flex_end control" ><i id="add_but"  v-on:click='other_content=!other_content'></i><p id="input_box_div" v-on:focus="other_content=false"  contenteditable="true" class="flex_item"></p><span id="send" class="ordinary_btn" v-on:click="sendmsg(1)">发送</span></div>
      <div id="other_content" class="padding control" v-show='other_content'>
        <div class="other_item">
          <ul class="flex_cont ">
            <li class="flex_item">
              <form id="updateImg" action="" method="post" enctype="multipart/form-data" style="height: 40px">
                <img src="../../public/img/consulting/img.png" alt="">
                <canvas id="myCanvas" style="display:none;border-radius:50%" width="40" height="40"></canvas>
                <input type="file" id="sendImg" accept="image/*" name="updateMyHeadFileElem" v-on:change="loadImage(this)">
              </form>
              图片
            </li>
            <li class="flex_item" v-show="kyBaby" @click="buildBusiness('family_doctor_patient.html','儿科门诊预约')">
              <img src="../../public/img/consulting/ekmz.png" alt="">
              儿科门诊
            </li>
            <li class="flex_item" v-show="kyBaby" @click="buildBusiness('family_doctor_erbao.html','儿保门诊预约')">
              <img src="../../public/img/consulting/ebmz.png" alt="">
              儿保门诊
            </li>
            <li class="flex_item" v-show="kyBaby" @click="buildBusiness('family_doctor_vaccine.html','计免预约')">
              <img src="../../public/img/consulting/free.png" alt="">
              计免
            </li>
            <li class="flex_item">
              <img src="../../public/img/consulting/menzhen.png" alt="">
              快捷回复
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
  import $j from 'jquery'
  import ale from '../../ale'
  import illnessImpression from '../../component/consulting_illness_impression.vue'
  export default{
    data(){
      return{
        layer_menu:false,
        consulting:'',
        imgUrl : urlWay.fileserver,
        defaultImg:'/kybabyBG/admin/images/userFaceIcon/lt_user.png',
        consultingMsg:[],
        someConsultList:[],
        other_content:false,
        sendMsg:'',
        isTag:this.$route.query.isTag,
        logId:this.$route.query.id,
        userId:this.$route.query.userId,
        userType:this.$route.query.userType,
        packageId:this.$route.query.packageId,
        userName:'',
        kyBaby:true,
        str:'',
        quickMessage:'',
        quickBox:false,
        hasPic:true
      }
    },
    computed:{


    },
    created: function () {
      this.getConsultingDetail(this.consultingMsg)
      this.getQuickRecovery();
    },
    updated:function(){
      $j('#container').scrollTop(1000000);
      $j(window).scrollTop($j(document).height());
    },
    mounted:function(){
      websocket.onmessage = this.WSonMessage;
      if(this.userType==3||this.userType==4){
        this.kyBaby = false
      }
    },
    components:{
      illnessImpression
    },
    methods: {
      getConsultingDetail:function(listData){
        var that = this;
        var isEnd=this.$route.query.isTag?'Y':'N';
        if(isEnd=='Y'){
          if(this.isTag=='false'){
            isEnd='N';
            that.isTag = this.$route.query.isTag;
          }
        }
        this.$ajax.post(host+'consultManage.action','action=detail&logId='+that.logId+'&isEnd='+isEnd+'&consult.userId='+that.userId)
          .then(function(result){
            that.consulting = result.data;
            if (result.data.userImg.split('::')[0]==null||result.data.userImg.split('::')[0]==''||result.data.userImg.split('::')[0]=='null'){
              that.hasPic = false;
            }
            that.someConsultList = result.data.someConsultList;
            that.userName = result.data.userImg.split('::')[1];
            for(var i = 0; i < result.data.someConsultList.length; i++) {
              var doctorReply='';
              if(result.data.someConsultList[i].doctorReply.indexOf('family_doctor_patient.html')>-1){
                doctorReply="儿科门诊预约";
              }else if(result.data.someConsultList[i].doctorReply.indexOf('family_doctor_erbao.html')>-1){
                doctorReply="儿保门诊预约";
              }else if(result.data.someConsultList[i].doctorReply.indexOf('family_doctor_vaccine.html')>-1){
                doctorReply="计免预约";
              }else if(result.data.someConsultList[i].doctorReply.indexOf('family_doctor_expert_team.html')>-1){
                doctorReply="推荐团队";
              } else{
                doctorReply=false;
              }
              listData.push({
                "doctorReply" : doctorReply?doctorReply:result.data.someConsultList[i].doctorReply
              })
            }
          })
      },
      sendmsg(msgType){
        var that = this;
        var content = document.getElementById('input_box_div').innerText;
        if (msgType == "1" && ($j("#input_box_div").text().trim() == "" || $j("#input_box_div").text().trim() == null)) {
          ale("请输入要发送内容");
        }else {
          if (msgType == '1') {
            $j("#input_box_div").text('');
            this.$ajax.post(host + 'consultManage.action','action=replays&logId='+that.logId+'&doctorReply='+content+'&msgType='+msgType+'&userType='+that.userType+'&consult.userId='+that.userId+'&token='+submitted.token)
              .then(function(res){
                if(submitted.submitSuccess(res.data.mes,res.data.token)){
                  return;
                }

                if (res.data.mes == "成功") {
                  var websocketDoctorId = sessionStorage.getItem('websocketDoctorId');
                  if (websocketDoctorId == null || websocketDoctorId == undefined) {
                    that.getwebsocketDoctorId();
                  }
                  that.consultingMsg.push({
                    'doctorReply':content
                  });
                  that.someConsultList.push({
                    'doctorReplyImg':null,
                    'isReply':'Y'
                  });
                  var obj = {
                    "doctorId": websocketDoctorId,
                    "submitTime": res.data.time,
                    "doctorReplyImg": "",
                    "userType": that.userType,
                    "message": content,
                    "userId": that.userId,
                    "logId": that.logId
                  };

                  that.send(obj);
                } else if (res.mes == '无数据') {
                  ale('已结束');
                  return_before();
                }

              })
              .then(function () {
                $j('#container').scrollTop(1000000);
                $j(window).scrollTop($j(document).height());
              })
          }
        }
      },
      render : function(src) {
        var that = this;
        var MAX_HEIGHT = 1500;
        var image = new Image();
        image.onload = function () {
          var canvas = document.getElementById("myCanvas");
          var x = image.width;
          var y = image.height;

          if (image.height > MAX_HEIGHT) {
            // 宽度等比例缩放 *=
            image.width *= MAX_HEIGHT / image.height;
            image.height = MAX_HEIGHT;
          }
          var ctx = canvas.getContext("2d");  // 获取 canvas的 2d 环境对象,可以理解Context是管理员，canvas是房子
          ctx.clearRect(0, 0, canvas.width, canvas.height);// canvas清屏
//      canvas.width = image.width;  // 重置canvas宽高
//      canvas.height = image.height;
          canvas.width = image.width;  // 重置canvas宽高
          canvas.height = image.height;

          ctx.drawImage(image, 0, 0, x, y, 0, 0, image.width, image.height);  // 将图像绘制到canvas上
        };
        image.src = src;  // 记住必须先绑定事件，才能设置src属性，否则会出同步问题。
        setTimeout(function () {
          that.sendImage();
        }, 2000);
      },
      // 加载 图像文件(url路径)
      loadImage(obj) {
        var that = this;
        var src = $j("#sendImg").get(0).files[0];
        var imgType = src.name.split('.');
        imgType = imgType[imgType.length - 1];//返回后缀名，以兼容部分移动端浏览器
        if (imgType == 'jpg') {
          imgType = 'jpeg';
        }
        if (!(imgType == 'jpeg' || imgType == 'png' || imgType == 'gif')) {
          ale('请选择图片文件');
          return false;
        }

        // 创建 FileReader 对象 并调用 render 函数来完成渲染.
        // 绑定load事件自动回调函数
        var imgData = '';
        var reader = new FileReader();


        reader.onload = function (e) {
          if (e.target.result.substring(5, 10) != 'image') {
            var imgDataArr = e.target.result.split('base64');
            imgData = imgDataArr[0] + "image/" + imgType + ";base64" + imgDataArr[1];
            that.render(imgData);
          } else {
            that.render(e.target.result);
          }
        };
        // 读取文件内容
        reader.readAsDataURL(src);
        /* $j('#more').prop('class', 'focus');*/
        /*$j('#msgText').blur();*/
        /*$j('footer').css({bottom: '0'});*/
        /*$j('#showBusiness').hide();*/
      },
      sendImage:function() {
        var that = this;
        var canvas = document.getElementById("myCanvas");
        // 获取Base64编码后的图像数据，格式是字符串
        // "data:image/png;base64,"开头,需要在客户端或者服务器端将其去掉，后面的部分可以直接写入文件。
        var dataurl = canvas.toDataURL("image/png");
        // 为安全 对URI进行编码
        // data%3Aimage%2Fpng%3Bbase64%2C 开头
        var imagedata = encodeURIComponent(dataurl);
        //alert(imagedata);
        if(submitted.jsControl()){
          return;
        }

        $j.ajax({
          type: 'post',
          async: false,
          url: host + 'consultManage.action',
          data: {action: "replays", logId: that.logId, doctorReply: '', msgType: 1, imagedata: imagedata, userType: that.userType,
            "consult.userId":that.userId,
            token:submitted.token},
          success: function (result) {
            if (submitted.submitSuccess(result.mes, result.token)) {
              return;
            }
            if (result.mes == "成功") {
              var websocketDoctorId = sessionStorage.getItem('websocketDoctorId');
              //console.log(websocketDoctorId);
              if (websocketDoctorId == null || websocketDoctorId == undefined) {
                that.getwebsocketDoctorId();
              }

              that.someConsultList.push({
                'doctorReplyImg': result.doctorReplyImg,
                'doctorReply':null
              });
              that.consultingMsg.push({
                'doctorReply':null
              });
              var obj = {
                "doctorId": websocketDoctorId,
                "submitTime": result.time,
                "doctorReplyImg": result.doctorReplyImg,
                "userType": that.userType,
                "message": null,
                "userId": that.userId,
                "logId": that.logId
              };
              that.send(obj);
            } else if (result.mes == '无数据') {
              ale('已结束');
              return_before();
            }
          }
        });
      },
      addReply:function(str){
        if(str ==undefined){
          var content = document.getElementById('input_box_div').innerText;
          this.someConsultList.push({
            'doctorReplyImg':null
          });
          this.consultingMsg.push({
            'doctorReply':content
          });
        } else {
          this.someConsultList.push({
            'doctorReplyImg':null
          });
          this.consultingMsg.push({
            'doctorReply':str
          });


        }

      },
      buildBusiness:function(type, con) {
        var that = this;
        var str = type + '?' + this.packageId;
        if(submitted.jsControl()){
          return;
        }
        this.$ajax.post(host + 'consultManage.action','action=replays&logId='+that.logId+'&doctorReply='+str+'&msgType=1'+'&userType='+that.userType+'&consult.userId='+that.userId+'&token='+submitted.token)
          .then(function(result){
            if(submitted.submitSuccess(result.data.mes,result.data.token)){
              return
            }

            if (result.data.mes == "成功") {
              var websocketDoctorId = sessionStorage.getItem('websocketDoctorId');
              if (websocketDoctorId == null || websocketDoctorId == undefined) {
                that.getwebsocketDoctorId();
              }
              that.someConsultList.push({
                'doctorReplyImg':null
              });
              that.consultingMsg.push({
                'doctorReply':con
              });
              var obj = {
                "doctorId": websocketDoctorId,
                "submitTime": result.data.time,
                "doctorReplyImg": "",
                "userType": that.userType,
                "message": str,
                "userId": that.userId,
                "logId": that.logId
              };

              that.send(obj);
            } else if (result.mes == '无数据') {
              ale('已结束');
              return_before();
            }
          })


      },
      send:function(consultMsgObj){
        consultMsgObj["thisIsUserReply"] = false;
        this.sendTemplateMessage(consultMsgObj);
        websocket.send(JSON.stringify(consultMsgObj));
      },
      sendTemplateMessage:function(consultMsgObj){//发送微信模板消息
        var con='';
        if(consultMsgObj.doctorReplyImg!=''&& consultMsgObj.doctorReplyImg!=null){
          con='[图片]';
        }else{
          con=consultMsgObj.message;
          if (con.indexOf('family_doctor_patient.html') > -1) {
            con='儿科门诊预约';
          } else if (con.indexOf('family_doctor_erbao.html') > -1) {
            con='儿保门诊预约';
          } else if (con.indexOf('family_doctor_vaccine.html') > -1) {
            con='计免预约';
          }
        }
        //   let obj= "action: sendTemplateMessage&userConsultDoctor.userId"+consultMsgObj.userId+"&userConsultDoctor.doctorId="+consultMsgObj.doctorId+"&userConsultDoctor.isReply=Y&userConsultDoctor.doctorReply"+con+"&backUrl"+urlWay.host+"main/consultation.html?doctorId="+consultMsgObj.doctorId+"&LogId="+consultMsgObj.logId+"&userType="+this.userType+"&fdServicePackageId="+this.packageId;

        var obj={
          action: "sendTemplateMessage",
          "userConsultDoctor.userId":consultMsgObj.userId,
          "userConsultDoctor.doctorId":consultMsgObj.doctorId,
          "userConsultDoctor.isReply":"Y",
          "userConsultDoctor.doctorReply":con,
          "backUrl":urlWay.host+"main/consultation.html?doctorId="+consultMsgObj.doctorId+"&LogId="+consultMsgObj.logId+"&userType="+this.userType+"&fdServicePackageId="+this.packgeId
        };

        this.$ajax.post(urlWay.host + 'wx/sendMessage.action',obj)
          .then(function (result) {
            //  console.log(JSON.stringify(result.data));
          }).catch(function (err) {
          consolo.log('err:'+err)
        });
      },
      WSonMessage:function(event){
        var that = this;
        var  websocketDoctorId=sessionStorage.getItem('websocketDoctorId');
        if(websocketDoctorId==null || websocketDoctorId==undefined){
          that.getwebsocketDoctorId();
        }
        var data = event.data
        var consultationData = JSON.parse(data);
        if (consultationData.thisIsUserReply) {//是用户发的信息
          if (websocketDoctorId == consultationData.doctorId && this.userId==consultationData.userId) {
            if (consultationData.userType != this.userType) {
              return false;
            }

            that.someConsultList.push({
              'symptomDescribe':consultationData.symptomDescribe,
              'symptomImage':consultationData.symptomImage,
              'submitTime':consultationData.submitTime,
              'isReply':consultationData.isReply,
              'doctorReply':'aa'
            });
            that.consultingMsg.push({
              'doctorReply':null
            });
          }
        }
        $j('#container').scrollTop(1000000);
        $j(window).scrollTop($j(document).height());

        //console.log(JSON.parse(data));
      },
      quickRecovery:function () {
        this.getQuickRecovery()
        this.quickBox=!this.quickBox;
      },
      getQuickRecovery:function () {
        var that = this;
        this.$ajax.post(host+'consultManage.action','action=getConsultFastReplayList')
          .then(function (result) {
            that.quickMessage = result.data.consultFastReplayList
          })
      },
      choseRecovery:function (txt) {
        $j("#input_box_div").text(txt);
        this.quickBox=!this.quickBox;
      }
    }
  }
</script>
<style scoped>
  .header_right .more_btn{
    background: url("../../public/img/more_menu_btn.png") no-repeat center right 18px;
    background-size: 20px;
    height: 100%;
  }
  .consult_time{
    font-size: 1.0rem;
    text-align: center;
    color: #9a9a9a;
    margin: 15px 0;
  }
  .doctor_li,.user_li{
    margin-bottom: 15px;
  }
  .header_img{
    width: 44px;
    height: 44px;
    border-radius: 50%;
    overflow: hidden;
  }
  .other_item .flex_cont {
    flex-wrap: wrap
  }
  .isTag{
    position: fixed;
    bottom: 0px;
    width: 85%;
    padding: 1.5% 7.5%;
    background: #fff;
    box-shadow: 0 0 6px 0.5px rgba(0,0,0,0.05);
  }
  .other_item ul li{
    flex: 0 0 25%;
    margin: 10px 0 0 0;
    color: #9a9a9a;
  }
  .flex_item img{
    width:initial;
    display: block;
    margin:0 auto 5px auto;
  }
  .flex_cont li img{
    width:36px;
  }
  #input_box_div{
    padding-left:10px;
    line-height:1.2rem;
    width: 100%;
    border: none;
    background: #fff;
    min-height: 20px;
    max-height: 80px;
    line-height: 20px;
    margin-left: auto;
    margin-right: auto;
    padding: 3px;
    outline: 0;
    font-size: 12px;
    word-wrap: break-word;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-user-modify: read-write-plaintext-only;
  }
  .header_img>img{
    width: 100%;
  }
  .doctor_words,.user_words{
    padding: 6px;
    border-radius: 4px;
    background: #fff;
    line-height: 1.5;
    font-size: 1.4rem;
    display: inline-block;
    word-break: break-all;
  }
  .user_dialogue{
    margin-left: 12px;
    text-align: right;
  }
  .doctor_words{
    margin-right: 12px;
  }
  .user_words{
    text-align: left;
  }
  /*对话框小三角*/
  .from_div_left{
    padding-left: 6px;
    width:0;
    height:0;
    border-top: 4px solid transparent;
    border-bottom: 4px solid transparent;
    border-right: 6px solid #fff;
  }
  .from_div_right{
    padding-right: 6px;
    width:0;
    height:0;
    border-top:4px solid transparent;
    border-bottom: 4px solid transparent;
    border-left: 6px solid #fff;
  }
  /*下方输入框*/
  #input_box{
    padding: 0 18px 12px 18px;
    position: fixed;
    bottom: 0px;
    left: 0px;
    right: 0px;
  }
  #input_box>#input_div{
    padding: 8px;
    border-bottom: 1px solid #e8e8e8;

  }
  #input_div>p{
    padding-right: 6px;
    outline: none;
  }
  #add_but{
    margin-left: 8px;
    display: inline-block;
    width: 24px;
    height: 24px;
    background: url("../../public/img/consulting/consult_add.png")no-repeat center;
    background-size: 100%;
  }
  #other_content{
    padding: 12px 18px 0 18px;
  }
  .other_item{
    text-align: center;
    font-size: 12px;
  }
  .other_item>p{
    margin-top: 5px;
  }
  #send{
    height: 20px;
  }
  #showBusiness ul li img {
    width: 40px;
  }
  #sendImg {
    display: block;
    width: 40px;
    height: 40px;
    position: relative;
    top: -40px;
    opacity: 0;
    z-index: 2;
  }
  .ordinary_btn {
    padding: 3px 5px 3px;
    background: #0eced4;
    border-radius: 4px;
    font-size: 13px;
    color: #fff;
  }
  .send_img{
    max-width: 145px;
    text-align: center;
    overflow: hidden;
  }
  .send_img>img{
    max-height: 87px;
  }
  /*右边菜单栏*/
  div#layer_menu{
    position: absolute;
    width: 103px;
    border-radius: 3px;
    background: rgba(0,0,0,.8);
    color: #fff;
    text-align: center;
    right: 18px;
    top: 37px;
  }
  div#layer_menu>div{
    border-bottom: 1px solid #fff;
    line-height: 36px;
  }
  div#layer_menu>div:last-child{
    border-bottom: 0px;
  }
  span#black_triangle {
    position: absolute;
    top: -8px;
    right: 2px;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid rgba(0,0,0,.8);
    text-align: center;
  }
  #layer_menu a{
    color: #fff;
  }
  .babyTitle{
    width:100%; color: #9a9a9a; background: #f8f8f8; height: 21px; padding: 10px 15px; font-size: 1.4rem;box-shadow: 0 2px 2px 1px rgba(0,0,0,0.05);
  }
  #container{margin-top:86px;}
</style>
