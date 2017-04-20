/**
 * Created by windows on 2017/2/27.
 * by yjl
 */
//$(function () {
//  doorBespeakOpen.getOpenResourcesList();
//});

import ale from '../../../ale.js';
import router from '../../../router/router.js';
import expired from '../../img/door_bespeak_open/expired.png';
export default function() {
  var whoLoginFlag=sessionStorage.getItem('whoLoginFlag');
  if(whoLoginFlag==null){
    ale('服务繁忙');
    return;
  };
  var postUrl = urlWay.kybaby + '/toHome/setOpenRes.action?whoLoginFlag=' + whoLoginFlag;
  return{
    eventOnLoad: function () {
      var _this=this;
      $(".switch").click(function(e){//开关
        e.stopPropagation();
        if($(this).parents('.door_open_list').attr('data-productStatus')=='N'){
          var answer=confirm('服务产品已下架或删除，开放的上门服务时间已失效，要删除吗？');
          if(answer){
            _this.delResource($(this).attr('data-id'));
            return;
          }
          return;
        }
        var _that=this;
        var isOpen='N';//Y开 N关
        if(!$(_that).hasClass('open')){
          isOpen="Y";
        }
        $.ajax({
          type:'post',
          url:postUrl,
          cache:false,
          async:true,
          data:{
            action:"ifOpenResources",
            "toHomeOpenResourcesMainId":$(this).attr('data-id'),
            "openingServiceButton":isOpen
          },
          success:function(result){
            if(result.mes=='请登录'){
              ale('请登录');
              router.push('/login');
            }else if(result.mes=='成功'){
              $(_that).toggleClass('open');
            }else{
              ale('同一日期，多个时间段不能有重合时间');
            }
          },
          error: function(XMLHttpRequest, textStatus, errorThrown) {

          }
        });
      });
      $(".door_open_list").click(function(){//编辑
        if($(this).attr('data-productStatus')=='N'){
          var answer=confirm('服务产品已下架或删除，开放的上门服务时间已失效，要删除吗？');
          if(answer){
            _this.delResource($(this).attr('data-id'));
            return;
          }
          return;
        }
        router.push({name:'door_server_address',params:{resourceId:$(this).attr('data-id')}});
        //link_to('door_server_address.html?'+encoded_url({resourceId:$(this).attr('data-id')}));
      });
    },
    delResource: function (id) {//删除当前服务时间
      var _this=this;
      $.ajax({
        type: 'post',
        url: postUrl,
        cache: false,
        async: true,
        data: {
          action:"delDoctorOpenResource",
          "toHomeOpenResourcesMain.id":id
        },
        success: function (result) {
          if (result.mes == '请登录') {
            ale('请登录');
            router.push('/login');
          } else if (result.mes == '成功') {
            ale('删除成功');
            setTimeout(function () {
              _this.getOpenResourcesList();
            }, 1500);
          }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {

        }
      });
    },
    getOpenResourcesList: function () {
      var _this=this;
      $.ajax({
        type:'post',
        url:postUrl,
        cache:false,
        async:true,
        data:{
          action:"getOpenResourcesList"
        },
        success:function(result){
          if(result.mes=='请登录'){
            ale('请登录');
            router.push('/login');
          }else if(result.mes=='成功'){
            var toHomeOpenResourcesMainList=result.toHomeOpenResourcesMainList;//总list
            var html='';
            if(toHomeOpenResourcesMainList==null){
              return;
            }
            for(var i= 0,len=toHomeOpenResourcesMainList.length;i<len;i++){
              var service_time='';//时间
              var dateFoList=toHomeOpenResourcesMainList[i].dateFoList;//服务日期
              if(toHomeOpenResourcesMainList[i].product==null){
                alert('产品为null');
                continue;
              }
              var productStatus='';//产品是否已下架N表示已下架
              if(toHomeOpenResourcesMainList[i].product.productStatus=='N'){
                productStatus='<div class="expired"><img src="'+expired+'" alt=""/></div>';
              }
              var doctorAddress=toHomeOpenResourcesMainList[i].doctorAddress;//服务地址
              var isOpen=toHomeOpenResourcesMainList[i].isOpen=='Y'? 'open':'';//是否开放
              var address=doctorAddress.doctorProvince +
                doctorAddress.doctorCity +
                doctorAddress.doctorArea +
                doctorAddress.doctorStreet +
                doctorAddress.detailAddress;//地址
              if(dateFoList == null){
                continue;
              }
              service_time+='<div class="server_time flex_cont"><p>服务日期：</p><div class="flex_item">';
              for(var j= 0,l=dateFoList.length;j<l;j++){
                var openTimeList=dateFoList[j].openTimeList;//服务时间
                service_time+='<div class="flex_cont"><p style="font-size: 13px;line-height: 21px;">'+dateFoList[j].openDate+'</p><p class="flex_item">';
                if(openTimeList == null){
                  continue;
                }
                for(var k= 0,le=openTimeList.length;k<le;k++){
                  service_time+='<span>'+openTimeList[k].openStartTime+'-'+openTimeList[k].openEndTime+'</span>';
                }
                service_time+= '</div>';
              }
              service_time+='</p></div></div>';
              html+='<li class="door_open_list productStatus'+toHomeOpenResourcesMainList[i].product.productStatus+'" data-id="'+toHomeOpenResourcesMainList[i].id+'" data-productStatus="'+toHomeOpenResourcesMainList[i].product.productStatus+'"> ' +
              productStatus+
              '<div class="flex_cont flex_simple server_info"> ' +
                //'<img src="'+urlWay.fileserver+toHomeOpenResourcesMainList[i].product.smallPicture+'"> ' +
              '<p class="flex_item server_content"> ' +
              '上门类型：<span>'+toHomeOpenResourcesMainList[i].product.name+'</span> ' +
              '<br/> ' +
              '服务地址：<span class="server_address txt_distance">'+
              address +
              '</span><br/> ' +
              '服务范围：<span class="server_address txt_distance">'+
              (doctorAddress.serviceArea==null ? "":doctorAddress.serviceArea) +
              'km' +
              '</span> ' +
              '</p> ' +
              '<p class="switch '+isOpen+'" data-id="'+toHomeOpenResourcesMainList[i].id+'"> ' +
              '<span></span> ' +
              '</p> ' +
              '</div> ' +
              service_time+
              '</li>';
            }
            $('#container_full ul').html(html);
            _this.eventOnLoad();
          }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {

        }
      });
    }
  }
};

