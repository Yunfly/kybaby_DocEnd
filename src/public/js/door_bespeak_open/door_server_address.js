/**
 * Created by windows on 2017/2/27.
 * by yjl
 */

import Vue from 'vue';
import ale from '../../../ale.js';
import router from '../../../router/router.js';
import common1 from '../common';
//import moreImg from '../../img/door_bespeak_open/more.png';
export default function (obj) {
    /**   whoLoginFlag
     * 登录人身份区分标识（doctor[医生端]；operator[机构端]）
     */
    var common=common1();
    var whoLoginFlag = sessionStorage.getItem('whoLoginFlag');
    if (whoLoginFlag == null) {
        ale('服务繁忙');
        return;
    };
    var postUrl = urlWay.kybaby + '/toHome/setOpenRes.action?whoLoginFlag=' + whoLoginFlag;
    var choose_time_week = '',//选择时间那里星期
        choose_time_type = '',//开始或结束时间
        choose_time_obj = '';//需要改变的doom
    var service_hours_times = 0;//选择时间那里的索引，用来控制判断循环的doom
    return {
        cacheData: {},//缓存数据
        urlobj: obj,
        chooseAddress: function () {//选择地址
          var _this=this;
          _this.cacheData = {
                "dateFoList": null,
                "doctorAddress": null,
                "product": null
            };
            var door_server_type = $('#door_server_type');
            var door_server_address = $('#door_server_address');
            var productId = $(door_server_type).attr('data-id');
            var doctorAddressId = $(door_server_address).attr('data-id');
            if (productId != undefined) {//产品id为空的话
              _this.cacheData["product"] = {
                    "id": productId,
                    "name": $(door_server_type).text(),
                    "serviceTime": $(door_server_type).attr('data-service-time')
                };
            }
            if (doctorAddressId != undefined) {//产品id为空的话
              _this.cacheData["doctorAddress"] = {
                    "id": doctorAddressId,
                    "detailAddress": $(door_server_address).text()
                };
            }
            if ($('#door_server_date').text().indexOf('请选择') == -1) {//选择了服务时间
                var week_list = $('#server_time>div');
                var dateFoList = [];
                for (var i = 0, len = week_list.length; i < len; i++) {
                    var obj_list = $(week_list).eq(i).find('li');
                    var week = $(week_list).eq(i).find('.service_week').text();
                    var openTimeList = [];
                    for (var j = 0, le = obj_list.length; j < le; j++) {
                        var pre = $(obj_list).eq(j).find('div').eq(0).text();
                        var nex = $(obj_list).eq(j).find('div').eq(1).text();
                        openTimeList.push({"openEndTime": nex, "openStartTime": pre});
                    }
                    dateFoList.push({"openDate": week, "openTimeList": openTimeList});
                }
              _this.cacheData["dateFoList"] = dateFoList;
            }
            sessionStorage.setItem('doorServerAddress', JSON.stringify(_this.cacheData));
            router.push({name:'door_outset_address'});
        },
        delSrvice: function (obj) {//删除当前服务时间
            if($(obj).parent().parent().find('li').length==2){
                $(obj).parents('li').siblings('li').find('.service_del').hide();
            }
            if($(obj).parent().parent().find('li').length>1){
                $(obj).parent().remove();
            }
        },
        delResource: function (obj) {//删除当前服务时间
          var _this=this;
            var answer=confirm('确定要删除该配置吗？');
            if(!answer){
                return;
            }
            $.ajax({
                type: 'post',
                url: postUrl,
                cache: false,
                async: true,
                data: {
                    action:"delDoctorOpenResource",
                    "toHomeOpenResourcesMain.id":_this.urlobj.resourceId
                },
                success: function (result) {
                    if (result.mes == '请登录') {
                        ale('请登录');
                      router.push('/login');

                    } else if (result.mes == '成功') {
                        ale('删除成功');
                        setTimeout(function () {
                            common.return_before();
                        }, 1500);
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {

                }
            });
        },
        hasChoose: function (id) {//选择具体时间
            $("#door_server_hours ul>li").unbind().click(function (e) {
                e.stopPropagation();
                var text = $(this).text();//备选时间
                var obj_list = $('#server_time>div[data-week=' + choose_time_week + ']').find('.service_hours>li');
                for (var i = 0, len = obj_list.length; i < len; i++) {
                    var pre = $(obj_list).eq(i).find('div').eq(0).text().replace(':', '');
                    var nex = $(obj_list).eq(i).find('div').eq(1).text().replace(':', '');
                    if (choose_time_type == 0) {//0是开始时间
                        var next = $(choose_time_obj).next().text();
                        /*
                         * 开始时间如果在某天已选（开始时间与结束时间内【不包括已选结束时间】）；
                         * 表明是重复时间，不可用
                         * */
                        if ($(choose_time_obj).parent().attr('data-index') == $(obj_list).eq(i).attr('data-index')) {
                            continue;
                        }
                        if (pre == text.replace(':', '')) {//如果该行开始时间==备选时间
                            ale('同一日期，多个时间段不能有重合时间');
                            return;
                        }
                        if (pre == '' || nex == '') {//如果该行开始时间或结束时间为空
                            continue;
                        }
                        if (text.replace(':', '') > pre && text.replace(':', '') < nex) {//备选时间在已选时间中
                            ale('同一日期，多个时间段不能有重合时间');
                            return;
                        }
                        if (text.replace(':', '') < pre && next.replace(':', '') > nex) {//备选时间与结速时间包含已有时间
                            ale('同一日期，多个时间段不能有重合时间');
                            return;
                        }
                    } else if (choose_time_type == 1) {//是结束时间
                        /*
                         * 结束时间如果在某天已选（开始时间与结束时间内【不包括已选开始时间】）；
                         * 表明是重复时间，不可用
                         * */
                        var prev = $(choose_time_obj).prev().text();
                        if ($(choose_time_obj).parent().attr('data-index') == $(obj_list).eq(i).attr('data-index')) {
                            continue;
                        }
                        if (nex == text.replace(':', '')) {//如果该行结束时间==备选时间
                            ale('同一日期，多个时间段不能有重合时间');
                            return;
                        }
                        if (pre == '' || nex == '') {//如果该行开始时间或结束时间为空
                            continue;
                        }
                        if (text.replace(':', '') > pre && text.replace(':', '') < nex) {//备选时间在已选时间中
                            ale('同一日期，多个时间段不能有重合时间');
                            return;
                        }
                        if (text.replace(':', '') > nex && prev.replace(':', '') < pre) {//备选时间与结速时间包含已有时间
                            ale('同一日期，多个时间段不能有重合时间');
                            return;
                        }
                    }
                }
                if (choose_time_type == 0) {//0是开始时间
                    var next = $(choose_time_obj).next().text();
                    if (next == '') {//没有结束时间直接填写开始时间
                        $(choose_time_obj).text(text);
                        $("#layer_box,#door_server_hours").hide();
                        return;
                    }
                    if (text.replace(':', '') >= next.replace(':', '')) {//开始时间大于结束时间
                        ale('同一日期，多个时间段不能有重合时间');
                        return;
                    }
                } else if (choose_time_type == 1) {//1是结束时间
                    var prev = $(choose_time_obj).prev().text();
                    if (prev == '') {//没有开始时间直接填写结束时间
                        $(choose_time_obj).text(text);
                        $("#layer_box,#door_server_hours").hide();
                        return;
                    }
                    if (text.replace(':', '') <= prev.replace(':', '')) {//开始时间大于结束时间
                        ale('同一日期，多个时间段不能有重合时间');
                        return;
                    }
                }
                $(choose_time_obj).text(text);
                $("#layer_box,#door_server_hours").hide();
                //$(this).addClass("selected").siblings().removeClass("selected");
            });
        },
        serviceOpenTime: function (interval) {//当选择了产品和服务日期后，显示开放时间
          var _this=this;
            $("#door_server_hours ul").empty();
            var zd = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
            var n = 0;
            var str = '';
            var m = parseInt(interval);//时间间隔
            var selectHtml = '';
            var selectStart = '09:00';
            for (var i = 0; i < 1000; i++) {
                n = parseInt(n) + m;
                if (n < 10) {
                    n = '0' + n;
                } else if (n >= 60) {
                    n = n - 60;
                    if (zd.length == 1) {
                        $('#boxs').html(selectHtml);
                        return false;
                    } else {
                        zd.splice(0, 1);
                    }
                    if (n < 10) {
                        n = '0' + n;
                    }
                }
                var s = zd[0];
                if (s < 10) {
                    str = '0' + s + ':' + n;
                } else {
                    str = s + ':' + n;
                }
                selectHtml += '<li value="' + selectStart + '">' + selectStart + '</li>';
                selectStart = str;
                if (selectStart.substr(0, 2) > 20) {
                    $("#door_server_hours ul").html(selectHtml);
                  _this.hasChoose();
                    return false;
                }
            }
        },
        chooseTime: function (week, type, obj) {//准备具体时间点
            if ($('#door_server_type').html().indexOf('请选择') > -1) {
                ale('请先选择上门类型');
                return;
            }
            choose_time_week = week;
            choose_time_type = type;
            choose_time_obj = obj;
            $("#layer_box,#door_server_hours").show();
            var height = 45;
            $("#layer_div ul").height($("#layer_div").height() - height);
        },
        saveOpenTime: function () {//保存or更新开发资源
          var _this=this;
            var productId = $('#door_server_type').attr('data-id');
            var doctorAddressId = $('#door_server_address').attr('data-id');
            if (productId == undefined) {
                ale('请选择产品');
                return;
            } else if (doctorAddressId == undefined) {
                ale('请选择地址');
                return;
            } else if ($('#door_server_date').text().indexOf('请选择') > -1) {
                ale('请选择选择服务时间');
                return;
            }
            var id = '';
            if (_this.urlobj != undefined) {
                id = _this.urlobj.resourceId;
            }
            var week_list = $('#server_time>div');
            var data = {
                action: "saveOrUpdateDoctorOpenResource",
                "doctorOpenResourceFo.resourceMainId": id,//医生开放资源mainId(新增不传,更新要传)
                "doctorOpenResourceFo.productId": productId,//产品id
                "doctorOpenResourceFo.doctorAddressId": doctorAddressId//医生地址
//                    "doctorOpenResourceFo.toHomeOpenResourcesDateList[0].openDate":"周一",//开放日期
//                    "doctorOpenResourceFo.toHomeOpenResourcesDateList[0].openStartTime":"09:00",//开始时间
//                    "doctorOpenResourceFo.toHomeOpenResourcesDateList[0].openEndTime":"09:55"//结束时间
            };
            var time = 0;//索引
            for (var i = 0, len = week_list.length; i < len; i++) {
                var obj_list = $(week_list).eq(i).find('li');
                var week = $(week_list).eq(i).find('.service_week').text();
                var openDateSort=null;//星期传数字用于排序
                switch (week){
                    case '周一':
                        openDateSort=1;
                        break;
                    case '周二':
                        openDateSort=2;
                        break;
                    case '周三':
                        openDateSort=3;
                        break;
                    case '周四':
                        openDateSort=4;
                        break;
                    case '周五':
                        openDateSort=5;
                        break;
                    case '周六':
                        openDateSort=6;
                        break;
                    case '周日':
                        openDateSort=7;
                        break;
                }
                for (var j = 0, le = obj_list.length; j < le; j++) {
                    var pre = $(obj_list).eq(j).find('div').eq(0).text();
                    var nex = $(obj_list).eq(j).find('div').eq(1).text();
                    if (pre == '' || nex == '') {//如果该行开始时间或结束时间为空
                        ale('请完善时间配置');
                        return;
                    }
                    data["doctorOpenResourceFo.toHomeOpenResourcesDateList[" + time + "].openDate"] = week;
                    data["doctorOpenResourceFo.toHomeOpenResourcesDateList[" + time + "].openDateSort"] = openDateSort;
                    data["doctorOpenResourceFo.toHomeOpenResourcesDateList[" + time + "].openStartTime"] = pre;
                    data["doctorOpenResourceFo.toHomeOpenResourcesDateList[" + time + "].openEndTime"] = nex;
                    time++;
                }
            }
            $.ajax({
                type: 'post',
                url: postUrl,
                cache: false,
                async: true,
                data: data,
                success: function (result) {
                    if (result.mes == '请登录') {
                        ale('请登录');
                      router.push('/login');
                    } else if (result.mes == '成功') {
                        ale('保存成功');
                      setTimeout(function () {
                          common.return_before();
                        }, 1500);
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {

                }
            });
        },
        eventOnLoad: function () {//直接加载事件
          var _this=this;
            if (_this.urlobj.resourceId != undefined) {//是编辑
                $('.delResource').removeClass('hidden');
            }
            if (sessionStorage.getItem('doorServerAddress') != null) {//是编辑
                $('.delResource').removeClass('hidden');
            }
            $("#door_server_type").click(function () {
                if ($('#door_server_date').text().indexOf('请选择') == -1) {
                    var answer = confirm('确定要修改上门类型吗？修改后服务时间将被清空。');
                    if (!answer) {
                        return;
                    }
                }
                $("#layer_box,#door_type").show();
                var height = 45;
                $("#layer_div ul").height($("#layer_div").height() - height);
            });
            $("#door_server_date").click(function () {
                if ($('#door_server_type').html().indexOf('请选择') > -1) {
                    ale('请先选择上门类型');
                    return;
                }
                $("#layer_box,#door_server_time").show();
                var height = 45+57;
                $("#layer_div ul").height($("#layer_div").height() - height);
            });

            //    点弹窗弹窗消失
            $("#layer_box").click(function () {
                $(this).hide();
                $(this).children().children().hide();
                $(".tag").removeClass("tag");
            });
            //    弹窗内选择项
            $("#door_type li").click(function () {// 选择上门类型
                $(this).addClass("selected").siblings().removeClass("selected");
                var id = $(this).attr('data-id');
                var text = $(this).text();
                $("#door_server_type").text(text).attr('data-id', id).attr('data-service-time',$(this).attr('data-service-time'));
                $('#server_time').empty();
                $('#door_server_time li').removeClass('select');
                $('#door_server_date').text('请选择');
              _this.serviceOpenTime($(this).attr('data-service-time'));
            });
            $(".sure.bottom_button").click(function (e) {
                var select_list = $("#door_server_time li.select");//重新选中的星期
                var server_time = $("#server_time>.info_item");//已经存在的服务星期
                var date_choose = '';//选择后的星期
                $('#server_time').empty();
                for (var i = 0, l = select_list.length; i < l; i++) {
                    var week = $(select_list).eq(i).attr('data-week');
                    date_choose += ' ' + week;
                    var is_true = false;//该星期是否已存在服务星期里
                    for (var j = 0, len = server_time.length; j < len; j++) {
                        if (week == $(server_time).eq(j).find('.service_week').text()) {
                            $('#server_time').append($(server_time).eq(j).clone());
                            is_true = true;
                            continue;
                        }
                    }
                    if (!is_true) {
                        $('#server_time').append('<div data-week="' + week + '" class="info_item"> ' +
                        '<div class="flex_cont time_type"> ' +
                        '<div class="flex_item">服务时间</div> ' +
                        '<div class="flex_item">开始时间</div> ' +
                        '<div class="flex_item">结束时间</div> ' +
                        '</div> ' +
                        '<div class="flex_cont time_content flex_simple"> ' +
                        '<div class="service_week">' + week + '</div> ' +
                        '<div class="flex_item"> ' +
                        '<ul class="service_hours"> ' +
                        '<li data-index="' + (service_hours_times++) + '" class="flex_cont flex_simple"> ' +
                        '<div class="flex_item chooseTime" data-time="' + week + ',0,this"></div> ' +
                        '<div class="flex_item chooseTime" data-time="' + week + ',1,this"></div> ' +
                        '<div class="service_del" style="display: none;">×</div>' +
                        '</li> ' +
                        '</ul> ' +
                        '</div> ' +
                        '</div> ' +
                        '<div class="flex_cont flex_simple add_time"> ' +
                        '<p class="moreImg"> ' +
                        //'<img src="'+moreImg+'" alt=""/> ' +
                        '<span>添加开始结束时间</span> '  +
                        '</p> ' +
                        '</div> ' +
                        '</div>');
                    }
                }
              _this.binding();
              if (date_choose == '') {
                    $("#door_server_date").text('请选择');
                } else {
                    $("#door_server_date").text(date_choose);
                }
                $("#layer_box,#door_server_time").hide();
                //return;
            });
            $("#door_server_time li").click(function (e) {
                e.stopPropagation();

                $(this).toggleClass("select");
            });
//                $("#door_server_hours li").click(function(){
//                    $(this).addClass("selected").siblings().removeClass("selected");
//                    $(".tag").val($(this).text());
//                });
        },
        addServiceTime: function (obj) {//添加开始和结束时间
            var _this=this;
            //如果这天的上一个时间没完成不能新增
            var new_obj = $(obj).prev().find('.service_hours>li:last-child>div');
            var pre = $(new_obj).eq(0).text().replace(':', '');
            var nex = $(new_obj).eq(1).text().replace(':', '');
            if (pre == '' || nex == '') {//如果该行开始时间或结束时间为空
                ale('请先完善上一个时间');
                return;
            }
            var week = $(obj).prev().find('.service_week').text();
            $(obj).prev().find('ul').append('<li data-index="' + (service_hours_times++) + '" class="flex_cont flex_simple"> ' +
            '<div class="flex_item chooseTime" data-time="' + week + ',0,this"></div> ' +
            '<div class="flex_item chooseTime" data-time="' + week + ',1,this"></div> ' +
            '<div class="service_del">×</div>' +
            '</li>');
            $(obj).prev('').find('.service_del').show();
          _this.binding();
        },
        dataSession: function () {//从缓存中取数据
          var _this=this;
            var data = sessionStorage.getItem('doorServerAddress');//缓存数据
            if (data != null) {
                data = JSON.parse(data);
            }
            var toHomeOpenResourcesMain = data;
            var date_html = '';
            var dateFoList = toHomeOpenResourcesMain.dateFoList;//开放日期
            if (dateFoList != null) {
                var open_time = '';//开放时间所有
                for (var i = 0, len = dateFoList.length; i < len; i++) {
                    date_html += ' ' + dateFoList[i].openDate;
                    $('#door_server_time li[data-week=' + dateFoList[i].openDate + ']').addClass('select');
                    var openTimeList = dateFoList[i].openTimeList;//开放时间
                    var open_time_html = '';//开放时间点html
                    for (var j = 0, le = openTimeList.length; j < le; j++) {
                        var can_del = '<div class="service_del">×</div>';
                        if(le==1){
                            can_del  = '<div class="service_del" style="display: none;">×</div>';
                        }
                        open_time_html += '<li data-index="' + (service_hours_times++) + '" class="flex_cont flex_simple"> ' +
                        '<div class="flex_item chooseTime" data-time="' + dateFoList[i].openDate + ',0,this">' + openTimeList[j].openStartTime + '</div> ' +
                        '<div class="flex_item chooseTime" data-time="' + dateFoList[i].openDate + ',1,this">' + openTimeList[j].openEndTime + '</div> ' +
                        can_del +
                        '</li>';
                    }
                    open_time += '<div data-week="' + dateFoList[i].openDate + '" class="info_item"> ' +
                    '<div class="flex_cont time_type"> ' +
                    '<div class="flex_item">服务时间</div> ' +
                    '<div class="flex_item">开始时间</div> ' +
                    '<div class="flex_item">结束时间</div> ' +
                    '</div> ' +
                    '<div class="flex_cont time_content flex_simple"> ' +
                    '<div class="service_week">' + dateFoList[i].openDate + '</div> ' +
                    '<div class="flex_item"> ' +
                    '<ul class="service_hours"> ' +
                    open_time_html +
                    '</ul> ' +
                    '</div> ' +
                    '</div> ' +
                    '<div class="flex_cont flex_simple add_time"> ' +
                    '<p class="moreImg"> ' +
                    //'<img src="'+moreImg+'" alt=""/> ' +
                    '<span>添加开始结束时间</span> ' +
                    '</p> ' +
                    '</div> ' +
                    '</div>';
                }
                $('#server_time').html(open_time);
                //服务日期
                $('#door_server_date').html(date_html == '' ? '请选择' : date_html);
            }
          _this.binding();
            //服务地址
            if (toHomeOpenResourcesMain.doctorAddress != null) {
                $('#door_server_address').html(
                    toHomeOpenResourcesMain.doctorAddress.detailAddress
                ).attr('data-id', toHomeOpenResourcesMain.doctorAddress.id);
            }
            //产品类型
            if (toHomeOpenResourcesMain.product != null) {
                $('#door_server_type').html(toHomeOpenResourcesMain.product.name).attr('data-id', toHomeOpenResourcesMain.product.id).attr('data-service-time', toHomeOpenResourcesMain.product.serviceTime);
              _this.serviceOpenTime(toHomeOpenResourcesMain.product.serviceTime);
            }
            sessionStorage.removeItem('doorServerAddress');
        },
        binding: function () {
          var _this=this;
          $('#server_time .service_del').unbind().click(function () {
            if($(this).parent().parent().find('li').length==2){
              $(this).parents('li').siblings('li').find('.service_del').hide();
            }
            if($(this).parent().parent().find('li').length>1){
              $(this).parent().remove();
            }
          });
          $('#server_time .add_time').unbind().click(function () {
            _this.addServiceTime(this);
          });
          $('#server_time .chooseTime').unbind().click(function () {
            var time=$(this).data('time').split(',');
            _this.chooseTime(time[0],time[1],this);
          });
        },
        editDetail: function () {//编辑显示详情
          var _this=this;
            $.ajax({
                type: 'post',
                url: postUrl,
                cache: false,
                async: true,
                data: {
                    action: "getOpenResDetail",
                    "toHomeOpenResourcesMain.id": _this.urlobj.resourceId
                },
                success: function (result) {
                    if (result.mes == '请登录') {
                        ale('请登录');
                      router.push('/login');

                    } else if (result.mes == '成功') {
                        var toHomeOpenResourcesMain = result.toHomeOpenResourcesMain;
                        //doorServerAddress.cacheData=toHomeOpenResourcesMain;
                        var date_html = '';
                        var dateFoList = toHomeOpenResourcesMain.dateFoList;//开放日期
                        var open_time = '';//开放时间所有
                        for (var i = 0, len = dateFoList.length; i < len; i++) {
                            date_html += ' ' + dateFoList[i].openDate;
                            $('#door_server_time li[data-week=' + dateFoList[i].openDate + ']').addClass('select');
                            var openTimeList = dateFoList[i].openTimeList;//开放时间
                            var open_time_html = '';//开放时间点html
                            for (var j = 0, le = openTimeList.length; j < le; j++) {
                                var can_del = '<div class="service_del">×</div>';
                                if(le==1){
                                    can_del  = '<div class="service_del" style="display: none;">×</div>';
                                }
                                open_time_html += '<li data-index="' + (service_hours_times++) + '" class="flex_cont flex_simple"> ' +
                                '<div class="flex_item chooseTime" data-time="' + dateFoList[i].openDate + ',0,this">' + openTimeList[j].openStartTime + '</div> ' +
                                '<div class="flex_item chooseTime" data-time="' + dateFoList[i].openDate + ',1,this">' + openTimeList[j].openEndTime + '</div> ' +
                                can_del +
                                '</li>';
                            }
                            open_time += '<div data-week="' + dateFoList[i].openDate + '" class="info_item"> ' +
                            '<div class="flex_cont time_type"> ' +
                            '<div class="flex_item">服务时间</div> ' +
                            '<div class="flex_item">开始时间</div> ' +
                            '<div class="flex_item">结束时间</div> ' +
                            '</div> ' +
                            '<div class="flex_cont time_content flex_simple"> ' +
                            '<div class="service_week">' + dateFoList[i].openDate + '</div> ' +
                            '<div class="flex_item"> ' +
                            '<ul class="service_hours"> ' +
                            open_time_html +
                            '</ul> ' +
                            '</div> ' +
                            '</div> ' +
                            '<div class="flex_cont flex_simple add_time"> ' +
                            '<p class="moreImg"> ' +
                            //'<img src="'+moreImg+'" alt=""/> ' +
                            '<span>添加开始结束时间</span> ' +
                            '</p> ' +
                            '</div> ' +
                            '</div>';
                        }
                        $('#server_time').html(open_time);
                      _this.binding();
                      //服务日期
                        $('#door_server_date').html(date_html == '' ? '请选择' : date_html);
                        //服务地址
                        $('#door_server_address').html(toHomeOpenResourcesMain.doctorAddress.doctorProvince +
                            toHomeOpenResourcesMain.doctorAddress.doctorCity +
                            toHomeOpenResourcesMain.doctorAddress.doctorArea +
                            toHomeOpenResourcesMain.doctorAddress.doctorStreet +
                            toHomeOpenResourcesMain.doctorAddress.detailAddress
                        ).attr('data-id', toHomeOpenResourcesMain.doctorAddress.id);
                        //产品类型
                        $('#door_server_type').html(toHomeOpenResourcesMain.product.name).attr('data-id', toHomeOpenResourcesMain.product.id).attr('data-service-time', toHomeOpenResourcesMain.product.serviceTime);
                      _this.serviceOpenTime(toHomeOpenResourcesMain.product.serviceTime);
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {

                }
            });
        },
        getProductList: function () {//产品列表
          var _this=this;
            $.ajax({
                type: 'post',
                url: postUrl,
                cache: false,
                async: true,
                data: {
                    action: "getProductList"
                },
                success: function (result) {
                    if (result.mes == '请登录') {
                        ale('请登录');
                        router.push('/login');
                    } else if (result.mes == '成功') {
                        var productList = result.productList;
                        if (productList == null || productList.length == 0) {
                            ale('该账号未开通上门服务，暂不可开放上门服务时间');
                            return;
                        }
                        var html = '';
                        for (var k = 0, le = productList.length; k < le; k++) {
                            html += '<li data-service-time="' + productList[k].serviceTime + '" data-id="' + productList[k].id + '">' + productList[k].name + '</li>';
                        }
                        $('#door_type ul').html(html);
                      _this.eventOnLoad();
                        if (sessionStorage.getItem('doorServerAddress') != null) {//从缓存数据中去
                          _this.dataSession();
                        } else {
                            if (_this.urlobj != undefined) {//是编辑
                              _this.editDetail();
                            }
                        }
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {

                }
            });
        }
    }
};
