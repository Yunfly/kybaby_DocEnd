<template>
  <div id="websocket">
    <div class="websocketBox" v-if="hasConsMsg">
      <span v-if="someConsultList[0].symptomImage!=null">[图片]</span>
      <span v-else>{{someConsultList[0].symptomDescribe}}</span>

      <div style="position: absolute; top: 0; right:15px;height: 36px; width:50px;" @click="hasConsMsg=!hasConsMsg">
        x
      </div>
    </div>
  </div>
</template>

<script>
  export default{
      data(){
          return{
            isActive:false
          }
      },
      created:function (){
        websocket.onmessage = this.WSonMessage;
      },
      mounted:function () {
        WSonMessage:function(event){
          console.log(event);
          var that = this;
          var  websocketDoctorId=sessionStorage.getItem('websocketDoctorId');
          that.someConsultList = [];
          var data = event.data;
          console.log(event);
          console.log(data);
          var consultationData = JSON.parse(data);
          if (consultationData.thisIsUserReply) {   //是用户发的信息

            that.someConsultList.push({
              'symptomDescribe':consultationData.symptomDescribe,
              'symptomImage':consultationData.symptomImage,
              'submitTime':consultationData.submitTime,
              'isReply':consultationData.isReply,
              'doctorReply':'aa'
            });
            that.hasConsMsg = true;

            setTimeout(function () {
              that.hasConsMsg = false;
            },2000)
          }
        }
      }
  }
</script>


<style scoped>
  .websocketBox{
    z-index: 9999;
    position: fixed;
    width:100%;
    text-align: center;
    background: rgba(0,0,0,0.7);
    color: #fff;
    top:0;
    padding: 10px 10px;
    font-style: 1.2rem;
  }
  #footer{
    z-index:1000;
  }
#footer ul li a {
  opacity:0.4;
  -webkit-filter: grayscale(100%);
  filter: grayscale(100%);
}
#footer ul li a.is-active,#footer ul li a.user_list{
  opacity: 1;
  -webkit-filter: grayscale(0%);
  filter: grayscale(0%);
}
</style>
