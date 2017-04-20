<template>
  <div class="bgfff">
    <div id="header" class="doctor_header">
      <div class="header_Left" v-on:click="return_before()"><p></p></div>
      <div class="header_center font18">地址管理</div>
      <div id="set_icon" class="header-right"></div>
    </div>
    <div id="container_full" class="bgfff">
      <ul id="reassign_record">

      </ul>
    </div>
    <footer id="footer_btn">
      <router-link to="door_add_address">
        <p id="big_button">+&nbsp;新增地址</p>
      </router-link>
    </footer>
  </div>
</template>

<script>
  import '../../public/css/door_bespeak_open/door_server.css';
  import '../../public/css/door_bespeak_open/door_server_address.css';
  export default {
    data(){
      return {

      }
    },
    mounted:function(){
      var _this=this;
      _this.getAddressList();
    },
    methods:{
      eventOnLoad: function () {
        var _this=this;
        $("#reassign_record li").click(function(){
          var id=$(this).attr('data-id');
          _this.$router.push({name:'door_add_address',params:{addressId:id}});
        });
      },
      getAddressList: function () {
        var _this=this;
        $.ajax({
          type:'post',
          url:urlWay.kybaby + '/toHome/setOpenRes.action?whoLoginFlag=doctor',
          cache:false,
          async:true,
          data:{
            action:"getDoctorAddress"
          },
          success:function(result){
            if(result.mes=='请登录'){
              ale('请登录');
              _this.$router.push('/login');
            }else if(result.mes=='成功') {
              var html='';
              var doctorAddresList=result.doctorAddresList;
              if(doctorAddresList!=null){
                for(var i= 0,len=doctorAddresList.length;i<len;i++){
                  html+='<li class="flex_cont flex_simple" data-id="'+doctorAddresList[i].id+'"> ' +
                  '<div class="flex_item"> ' +
                  '<p>' +
                  doctorAddresList[i].doctorProvince+
                  doctorAddresList[i].doctorCity+
                  doctorAddresList[i].doctorArea+
                  doctorAddresList[i].doctorStreet+
                  doctorAddresList[i].detailAddress+
                  '</p> ' +
                  '<div class="flex_cont record_info"> ' +
                  '<p class="flex_item small_gray">' +
                  (doctorAddresList[i].serviceArea==null ? '':'服务范围：'+doctorAddresList[i].serviceArea +'km') +
                  '</p> ' +
                  '</div> ' +
                  '</div> ' +
                  '<p class="editor">编辑</p> ' +
                  '</li>';
                }
              }
              $('#reassign_record').html(html);
              _this.eventOnLoad();
            }
          },
          error: function(XMLHttpRequest, textStatus, errorThrown) {

          }
        });
      }
    }
  }
</script>
<style scoped>
  #reassign_record{
    background: #f4f4f4;
  }
</style>

