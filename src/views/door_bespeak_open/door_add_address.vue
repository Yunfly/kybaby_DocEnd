<template>
  <div class="bgfff">
    <div id="header" class="doctor_header">
      <div class="header_Left" v-on:click="return_before()"><p></p></div>
      <div class="header_center font18">新增地址</div>
      <div id="set_icon" class="header-right"></div>
    </div>
    <div id="container_full" class="bgfff">
      <div class="info_item">
        <div class="flex_cont right_arrow" id="address">地址信息<p class="flex_item details_info right_txt small_gray">请在地图上选择地址</p></div>
        <div class="flex_cont right_arrow" id="service_scope">服务范围<p class="flex_item details_info right_txt small_gray">请在选择服务范围</p></div>
      </div>
      <p class="big_button" id="delete">删除</p>
      <p id="big_button" @click="save" class="big_btn_style">保存</p>
    </div>
    <div id="layer_box">
      <div id="layer_div">
        <div id="door_server_scope">
          <p class="layer_title">服务范围</p>
          <div>
            <div class="layer_list" data-id="0">
              <ul>
                <li>5km</li>
                <li>10km</li>
                <li>15km</li>
                <li>20km</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="add">
      <div id="header1" class="doctor_header">
        <div class="header-left" @click="closeAdd"><p></p></div>
        <div class="header-center">确认地图地址</div>
        <div class="header-right"></div>
      </div>
      <iframe id="mapPage" width="100%" height="100%" frameborder=0
              src="http://apis.map.qq.com/tools/locpicker?search=1&type=1&key=64DBZ-NLTKW-4ZGRN-OTENA-2TRPT-RSFIU&referer=kybaby">
      </iframe>

    </div>
  </div>
</template>

<script>
  import '../../public/css/door_bespeak_open/door_server.css';
  import '../../public/css/door_bespeak_open/door_server_address.css';
  import '../../public/css/door_bespeak_open/screen_mask.css';
  import common1 from '../../public/js/common';
  import ale from '../../ale.js';
  export default {
    data(){
      return {
        edit_address:{},
        objurl:null,
        common:common1()
      }
    },
    mounted:function(){
      var _this=this;
      _this.objurl=_this.$route.params;
      var  s=_this.objurl;
      if(s.addressId!=undefined){//是编辑
        $('#header .header_center').text('编辑地址');
        _this.getAddressDetail(s.addressId);
      }else{
        _this.eventOnLoad();
      }
    },
    methods:{
      save:function(){//新增或编辑
        var _this=this;
        _this.saveOrUpdate('N');
      },
      closeAdd:function(){//新增或编辑
        $('#add').hide();
      },
      eventOnLoad: function () {
        var _this=this;
        $("#service_scope").click(function(){//选择服务范围
          $("#layer_box,#door_server_scope").show();
          $("#layer_div ul").height($("#layer_div").height()-45);
        });
        $("#address").click(function(){//选择地图地址
          $('#add').show();
        });
        $("#delete").click(function(){//删除
          var answer=confirm('你确定要删除该地址吗？');
          if(!answer){
            return;
          }
          _this.saveOrUpdate(0);
        });
        $("#layer_box").click(function(){//关闭
          $("#layer_box,#layer_div>div").hide();
        });
        $("#door_server_scope li").click(function(e){//选择服务范围
          e.stopPropagation();
          $("#service_scope p").text($(this).text()).addClass('choosed_scope');
          $("#layer_box,#door_server_scope").hide();
        });
        $('#tencent_map').click(function () {
          $('#add3').show();
        });
        var time=0;
        window.addEventListener('message', function(event) {
          // 接收位置信息，用户选择确认位置点后选点组件会触发该事件，回传用户的位置信息
          var loc = event.data;
          if (loc && loc.module == 'locationPicker') {//防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
            if(time>0){
              return;
            }
            time++;
            $('#address>p').html(loc.poiaddress+'<span style="display: none">'+JSON.stringify(loc)+'</span>').addClass('choosed_map').removeClass('choosed_edit');
            $('#add').hide();
            time=0;
          }
        }, false);
      },
      saveOrUpdate: function (type) {
        var _this=this;
        if(!$('#address p').hasClass('choosed_map') && !$('#address p').hasClass('choosed_edit')){
          ale('请在地图上选择地址');
          return;
        }else if(!$('#service_scope p').hasClass('choosed_scope')){
          ale('请选择服务范围');
          return;
        }
        var service_scope=parseInt($("#service_scope p").text());
        var detailAddress='';
        var doctorLng='';
        var doctorLat='';
        if($('#address p').hasClass('choosed_edit')){//如果是编辑
          detailAddress=$("#address p").text();
          doctorLng=_this.edit_address.lng;
          doctorLat=_this.edit_address.lat;
        }else if($('#address p').hasClass('choosed_map')){//如果选择了地图
          var address=JSON.parse($("#address p>span").text());
          detailAddress=address.poiaddress;
          doctorLng=address.latlng.lng;
          doctorLat=address.latlng.lat;
        }
        var id=(_this.objurl.addressId==undefined) ? '' : _this.objurl.addressId;
        $.ajax({
          type:'post',
          url:urlWay.kybaby + '/toHome/setOpenRes.action?whoLoginFlag=doctor',
          cache:false,
          async:true,
          data:{
            action:"saveOrUpdateDoctorAddress",
            "doctAddress.id":id,
            "doctAddress.doctorLng":doctorLng,//经度
            "doctAddress.doctorLat":doctorLat,//纬度
            "doctAddress.doctorProvince":'',//省
            "doctAddress.doctorCity":'',//市
            "doctAddress.doctorArea":'',//区
            "doctAddress.doctorStreet":'',//街道
            "doctAddress.detailAddress":detailAddress,//详细地址
            "doctAddress.addressStatus":type,//状态 0 是删除，Y是默认，N是可用
            "doctAddress.comments":'',//备注
            "doctAddress.serviceArea":service_scope//服务范围
          },
          success:function(result){
            if(result.mes=='请登录'){
              ale('请登录');
              _this.$router.push('/login');
            }else if(result.mes=='成功') {
              ale('操作成功');
              setTimeout(function () {
                _this.common.return_before();
              },1500);
            }
          },
          error: function(XMLHttpRequest, textStatus, errorThrown) {

          }
        });
      },
      getAddressDetail: function (id) {
        var _this=this;
        $.ajax({
          type:'post',
          url:urlWay.kybaby+'/main/addressManage.action',
          cache:false,
          async:true,
          data:{
            action:"one",
            "addressId":id
          },
          success:function(result){
            if(result.mes=='请登录'){
              ale('请登录');
              _this.$router.push('/login');
            }else if(result.mes=='成功') {
              var doctAddress=result.doctAddress;
              _this.edit_address={
                lat:doctAddress.doctorLat,
                lng:doctAddress.doctorLng
              };
              $('#address p').html(doctAddress.doctorProvince+
              doctAddress.doctorCity+
              doctAddress.doctorArea+
              doctAddress.doctorStreet+
              doctAddress.detailAddress).addClass('choosed_edit');
              $('#service_scope p').html((doctAddress.serviceArea==null ? '':doctAddress.serviceArea +'km')).addClass('choosed_scope');
              $('#delete').show();
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
  #delete {
     display: none;
  }
</style>
