<template>
  <div class="bgfff">
    <div id="header" class="doctor_header">
      <div class="header_Left" v-on:click="return_before()"><p></p></div>
      <div class="header_center font18">选择出发地址</div>
      <div id="set_icon" class="header-right">
        <router-link to="door_address_manage">
          <span>管理</span>
        </router-link>
      </div>
    </div>
    <div id="container_full" class="bgfff">
      <p class="gray_title">请选择上门服务出发地址，无地址请先新增</p>
      <div class="info_item" id="address_list">
        <!--<div class="flex_cont flex_simple choose_address">-->
        <!--<p class="flex_item">成都市高新区天府三街腾讯大厦B座<span class="left_distance small_gray">服务范围：90km</span></p>-->
        <!--<span class="choose_icon selected"></span>-->
        <!--</div>-->
      </div>
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
  import $ from 'jquery';
  import common1 from '../../public/js/common';
  export default {
    data(){
      return {
        common:common1()
      }
    },
    mounted:function(){
      var _this=this;
      _this.getAddressList();
    },
    methods:{
      eventOnLoad: function () {
        var _this=this;
        $("#address_list>div").click(function(){
          var _that=$(this);
          var address=sessionStorage.getItem('doorServerAddress');//缓存数据
          if(address != null){
            address=JSON.parse(address);
            address["doctorAddress"]={
              "id": $(_that).attr('data-id'),
              "detailAddress": $(_that).find('p').text()
            };
          }
          sessionStorage.setItem('doorServerAddress',JSON.stringify(address));
          _this.common.return_before();
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
                  html+='<div class="choose_address" data-id="'+doctorAddresList[i].id+'"> ' +
                  '<div><p>' +
                  doctorAddresList[i].doctorProvince+
                  doctorAddresList[i].doctorCity+
                  doctorAddresList[i].doctorArea+
                  doctorAddresList[i].doctorStreet+
                  doctorAddresList[i].detailAddress+
                  '</p><span class="small_gray">' +
                  (doctorAddresList[i].serviceArea==null ? '':'服务范围：'+doctorAddresList[i].serviceArea +'km') +
                  '</span>' +
                  '</div> ' +
                  '</div>';
                }
              }
              $('#address_list').html(html);
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
  .header-right{
    line-height: 45px;
    height: 45px;
  }
  .header-right span{
    color: white;
  }
</style>
