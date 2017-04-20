<template>
  <div>
    <div id="header" class="doctor_header">
      <div class="header_Left" @click="return_before()"><p></p></div>
      <div class="header_center font18">发展档案</div>
      <div class="header_right"></div>
    </div>
    <div id="container">
      <div class="info_item">
        <div v-for="item in order">
          <router-link :to="{path:'/door_result_info',query: {id:item.orderInfoId}}">
            <div class="flex_cont right_arrow">
              {{item.productName}}
              <p class="flex_item paragraph right_txt">{{item.bespokeDate}}</p>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return{
        order:'',
      }
    },
    created: function () {
      this.id = this.$route.query.id;
    },
    mounted:function(){
      var that = this;
      var id = this.id;
      this.$ajax.post(urlWay.host+'kybaby/doctorOrder/orderManager.action?whoLoginFlag=doctor',
          'action=getDevelopmentArchives&orderInfo.id='+id)
        .then(function(res){
          that.order = res.data.developmentArchivesList;
        })
    }
  }
</script>
<style scoped>
  #container {
    margin: 45px 0 50px 0;
  }
  .info_item {
    padding: 0 18px;
    line-height: 44px;
    background: #fff;
  }
  .info_item>div {
    padding: 0 6px;
    border-bottom: 1px solid #eee;
  }
  .info_item>div:last-child{
    border-bottom: 0px;
  }
  .right_arrow {
    background: url(../../public/img/right.png)no-repeat right center;
    background-size: 9px;
  }
  .right_txt{
    margin-right: 18px;
    text-align: right;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
  }
</style>
