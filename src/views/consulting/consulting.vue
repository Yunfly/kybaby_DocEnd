<template>
  <div>
    <div class="header_box gradient_bg">
      <div id="header" class="doctor_header">
        <div class="header_Left" v-on:click="return_before()"><p></p></div>
        <div class="header_center font18">咨询</div>
        <div class="header_right"></div>
      </div>
      <div class="content_header flex_cont content_center">
        <div  v-show="IfconsultDoctor">
          <div class="content_logo font10" v-if="!online" v-on:click="receiveOrder(true)" >开始接单</div>
          <div class="content_logo font10" v-else v-on:click="receiveOrder(false)" >停止接单</div>
        </div>

      </div>
      <div>
        <nav class="flex_cont font12">
          <div class="tag_menu flex_item" @click="setStatus('all','',0)"  ><p>全部</p></div>
          <div class="tag_menu flex_item" @click="setStatus(2,'',1)"><p>付费咨询</p></div>
          <div class="tag_menu flex_item" @click="setStatus(1,3,2)"><p>签约用户咨询<!--<span class="news_red"></span>--></p></div>
          <div class="tag_menu flex_item" @click="setStatus(4,'',3)"><p>套餐咨询</p></div>
        </nav>
        <div class="tab_box flex_cont">
          <div class="content_center tab_logo_box flex_item">
            <div class="tab_logo" v-show="menu_index == '0'" v-bind:class="menu_slide"></div>
          </div>
          <div class="content_center tab_logo_box flex_item">
            <div class="tab_logo" v-show="menu_index == '1'" v-bind:class="menu_slide"></div>
          </div>
          <div class="content_center tab_logo_box flex_item">
            <div class="tab_logo" v-show="menu_index == '2'" v-bind:class="menu_slide"></div>
          </div>
          <div class="content_center tab_logo_box flex_item">
            <div class="tab_logo" v-show="menu_index == '3'" v-bind:class="menu_slide"></div>
          </div>
        </div>
      </div>
    </div>
    <div id="container" class="container_box">
      <section id="consult" v-show="isShow" v-bind:class="menu_slide">
        <ul v-for="(item,index) in consult_sign" :attr="sign_type[index].userType"  v-if="sign_type[index].ifShow"  v-show="showAll || (sign_type[index].userType==statusNOW)||(sign_type[index].userType==statusElse)" >
         <div v-if="sign_type[index].userType==2">
           <router-link  :to="{path:'/consulting/pay_consulting_detail',query: {id:sign_type[index].logId,packageId:sign_type[index].packageId,isTag:sign_type[index].ifAdd,userId:sign_type[index].userId,userType:sign_type[index].userType}}" >
             <li class="flex_cont flex_simple">
               <div class="list_model_img">
                 <img :src="imgUrl+item.imgurl"  class="img-responsive">
                 <span class="new_num" v-if="newMesNumList[index]">{{newMesNumList[index]}}</span>
               </div>
               <div class="flex_item">
                 <div class="flex_cont">
                   <p class="consult_name flex_item">{{item.name}}</p>
                   <p class="consult_time paragraph font10">{{sign_type[index].mesTime}}</p>
                 </div>
                 <div class="flex_cont">
                   <p class="consult_content text_overflow font10 paragraph flex_item">{{sign_type[index].message}}<p>
                   <p class="consult_state font10 color_txt" v-if="sign_type[index].ifAdd" >待添加病情</p>
                 </div>
               </div>
             </li>
           </router-link>
         </div>
         <div v-else>
           <router-link  :to="{path:'/consulting/consulting_detail',query: {id:sign_type[index].logId,packageId:sign_type[index].packageId,isTag:sign_type[index].ifAdd,userId:sign_type[index].userId,userType:sign_type[index].userType}}" >
             <li class="flex_cont flex_simple">
               <div class="list_model_img">
                 <img :src="imgUrl+item.imgurl"  class="img-responsive">
                 <span class="new_num" v-if="newMesNumList[index]">{{newMesNumList[index]}}</span>
               </div>
               <div class="flex_item">
                 <div class="flex_cont">
                   <p class="consult_name flex_item">{{item.name}}</p>
                   <p class="consult_time paragraph font10">{{sign_type[index].mesTime}}</p>
                 </div>
                 <div class="flex_cont">
                   <p class="consult_content text_overflow font10 paragraph flex_item">{{sign_type[index].message}}<p>
                   <p class="consult_state font10 color_txt" v-if="sign_type[index].ifAdd">待添加病情</p>
                 </div>
               </div>
             </li>
           </router-link>
         </div>

        </ul>
      </section>
    </div>
  </div>
</template>
<script>
  import ale from '../../ale'
  export default{
    data(){
      return{
        someCousultStrList:null,
        consult_sign:[],
        sign_type:[],
        showAll:true,
        statusNOW:'全部',
        defaultImg:'/kybabyBG/admin/images/userFaceIcon/lt_user.png',
        idx:0,
        imgUrl : urlWay.fileserver,
        newMesNumList:'',
        allConsulting:'1,2,3,4',
        payConsulting:'2',
        signingConsulting:'1,3',
        packageConsulting:'4',
        statusElse:'',
        consultDoctorId:'',
        online:true,
        isShow : true,
        menu_index : 0,
        menu_slide : "animated bounceInRight",
        IfconsultDoctor:true,
        isOnline:''
      }
    },
    created: function () {
      this.getConsultList(this.sign_type, this.consult_sign,this.allConsulting);
    },
    mounted:function(){
    },
    methods: {
      receiveOrder:function(onOrder){
          this.online=!this.online;
          var that = this;
          var isOnline=onOrder?'Y':'N';
          this.$ajax.post(host+'consultManage.action','action=saveOrUpdateConsultDoctorInfo&consultDoctorInfo.id='+this.consultDoctorId+'&consultDoctorInfo.isOnline='+isOnline)
            .then(function(res){
              if(res.data.mes=='成功'){
                ale('设置成功');
              }
            })
      },
      getConsultList:function(type, listData,consultingType){
        var that=this;
        var data_obj='action=getAll&isEnd=&userType='+consultingType;
        this.$ajax.post(host+'consultManage.action',data_obj)
          .then(function(result){
            if(result.data.mes=="无数据"){
                if(result.data.consultDoctorInfo == null){
                    that.IfconsultDoctor = false;
                }
            }else if(result.data.mes=="成功") {
              that.newMesNumList = result.data.newMesNumList;

              if(result.data.consultDoctorInfo==null){
                that.IfconsultDoctor = false;
                that.online = false;
              }else{
                that.consultDoctorId = result.data.consultDoctorInfo.id;

                if(result.data.consultDoctorInfo.isOnline=='N'){
                  that.online = false;
                } else {
                  that.online = true;
                }
              }
              for(var i = 0; i < result.data.userInfoStrList.length; i++) {
                listData.push({
                  "name" : result.data.userInfoStrList[i].split("::")[0],
                  "imgurl" : (result.data.userInfoStrList[i].split("::")[1] !== "null" ? result.data.userInfoStrList[i].split("::")[1] : that.defaultImg),
                });
              }
              for(var i = 0; i < result.data.someCousultStrList.length; i++) {
                var message='';
                if(result.data.someCousultStrList[i].split("::")[1].indexOf('family_doctor_patient.html')>-1){
                  message="儿科门诊预约";
                }else if(result.data.someCousultStrList[i].split("::")[1].indexOf('family_doctor_erbao.html')>-1){
                  message="儿保门诊预约";
                }else if(result.data.someCousultStrList[i].split("::")[1].indexOf('family_doctor_vaccine.html')>-1){
                  message="计免预约";
                }else if(result.data.someCousultStrList[i].split("::")[1].indexOf('family_doctor_expert_team.html')>-1){
                  message="推荐团队";
                }else if(result.data.someCousultStrList[i].split("::")[1]==null||result.data.someCousultStrList[i].split("::")[1]==''){
                  if(!(result.data.someCousultStrList[i].split("::")[4]==null||result.data.someCousultStrList[i].split("::")[4]=='')){
                    message="[图片]";
                  }
                }else{
                  message=false;
                }
                type.push({
                  "logId" : result.data.someCousultStrList[i].split("::")[0],
                  "message" : message?message:result.data.someCousultStrList[i].split("::")[1],
                  "mesTime" : result.data.someCousultStrList[i].split("::")[2],
                  "userType" : result.data.someCousultStrList[i].split("::")[3],
                  "imgUrl" : (result.data.someCousultStrList[i].split("::")[4] != "null" ? result.data.userInfoStrList[i].split("::")[1] : that.defaultImg),
                  "packageId" : result.data.someCousultStrList[i].split("::")[5],
                  "ifAdd" : result.data.someCousultStrList[i].split("::")[6]=='待添加病情'?true:false,
                  "ifShow" : result.data.someCousultStrList[i].split("::")[7] =='要显示'?true:false,
                  //"ifShow" : result.data.someCousultStrList[i].split("::")[6] =='待添加病情'?true:false,
                  "userId" : result.data.someCousultStrList[i].split("::")[9]
                });
              }
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      setStatus:function(st,st2,index){
        this.idx = index;
        if(st=='all'){
          this.showAll = true;
        } else{
          this.showAll = false;
          this.statusElse = st2;
          this.statusNOW = st;
        }

        this.isShow = false;
        this.menuSlide(index);
      },
      menuSlide : function (index) {
        var that = this;

        if(this.menu_index != index) {
          if(this.menu_index > index) {
            this.menu_slide = "animated bounceInRight"
          } else {
            this.menu_slide = "animated bounceInLeft"
          }

          this.menu_index = index;
        }

        setTimeout(function () {
          that.isShow = true;
        }, 100);
      }
    }
  }
</script>
<style scoped>
  /*三角形*/
  .tab_logo {
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid #ffffff;
    text-align: center;
  }
  .tab_logo_box {
    width: 25%;
    transition: all 0.4s ease;
  }
  .header_box{
    position: fixed;
    left: 0;
    top: 0px;
    width: 100%;
    z-index: 999;
  }
  .content_header{
    margin-top: 45px;
    width: 100%;
    height: 100px;
  }
  .content_center{
    display: -webkit-box;
    -webkit-box-align: center;
    -webkit-box-pack: center;
  }
  .content_logo{
    padding: 5px 30px;
    border: 1px solid #ffffff;
    border-radius: 30px;
  }
  .consult_name{font-size: 1.4rem}
  .consult_content{
    font-size:1.2rem;
  }
  #container{
    width: 100%;
    margin: 182px 0 0;
  }
  .list_model_img{
    width: 54px;
    height: 54px;
    margin: 0 10px 0 6px;
  }
  .list_model_img, .list_model_img img{
    border-radius: 50%;
  }
  #consult{
    background: #fff;
    padding: 0 18px;
  }
  #consult li{
    padding: 15px 8px 15px 0;
    border-bottom: 1px solid #eee;
    line-height: 1.5;
  }
  #consult li:last-child{
    border-bottom: 0px;
  }
  nav{
    padding: 5px 0;
    text-align: center;
  }
  .news_red{
    position: absolute;
    top: -4px;
    right: -10px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #d94d4d;
  }
  nav>div>p{
    display: inline-block;
    position: relative;
  }
  .text_overflow{
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .consult_content{
    margin-right: 10px;
  }
  .color_txt{
    color: #0eced4;
  }
  .low_light_gray{
    color: #c2c2c2;
  }
  .list_model_img{
    position: relative;
  }
  .new_num{
    line-height: 1.2rem;
    position: absolute;
    border-radius: 50%;
    background: #d94d4d;
    font-size: 1.2rem;
    padding: 2px;
    color: #fff;
    top: -6px;
    right: -8px;
  }
  #pay_consult,#signing_consult{
    display: none;
  }
  .list_model_img img{
    max-width: 54px;
    max-height:54px;
  }

  #consult ul{
    border-bottom: 1px solid #eee;
  }
</style>
