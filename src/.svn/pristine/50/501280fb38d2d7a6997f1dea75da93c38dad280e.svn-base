<template>
  <div>
    <div id="header" class="doctor_header">
      <div class="header_Left" @click="return_before()"><p></p></div>
      <div class="header_center font18">结果</div>
      <div class="header_right"></div>
    </div>
    <div id="container">
      <table id="result_unit">
        <tr v-for="item in order">
          <td>{{item.productItem.itemName}}</td>
          <td>{{item.resultValue}}</td>
        </tr>
      </table>
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
          'action=getItemResultDetail&orderInfo.id='+id)
        .then(function(res){
          that.order = res.data.orderResultsList;
          console.log(that.order);
        })
    }
  }
</script>

<style scoped>
  #container {
    margin: 45px 0 50px 0;
  }
  #result_unit{
    color:#333;
    width:100%;
  }
  #result_unit th{
    background:#23c9e7;
    color:#fff;
  }
  #result_unit td,#result_unit th{
    padding:8px 6px;
    text-align:Center;
    width:33.3%;
  }
  #result_unit tr:nth-of-type(odd){
    background:#e4e4e4;
  }
</style>
