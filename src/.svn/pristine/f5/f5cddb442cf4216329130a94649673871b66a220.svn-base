//APP
//var host="http://kybabydev.yishangkeji.cn/kybaby/main/";
//var hostBG="http://kybabydev.yishangkeji.cn/kybabyBG/admin/";
var host="http://dev.qiyico.com/kybaby/main/";
var hostBG="http://dev.qiyico.com:8088/kybabyBG/admin/";
//医生圈路径
var ringHost="http://dev.qiyico.com/kybaby/ring/";
//WEI XIN
//var host="";
//var hostBG="/kybabyBG/admin/";
//医生圈路径
//var ringHost="../ring/";
//dev测试
var urlWay = {
	"host":"http://dev.qiyico.com/",
	"hostName":"http://dev.qiyico.com",
	"orderHost":"http://dev.qiyico.com/kybaby/doctorOrder/",
    "clinicHost":"http://dev.qiyico.com/kybaby/doctorClinic/",
    "familyDoctorHost":"http://dev.qiyico.com/kybaby/familyDoctor/",
    "orgBusinessHost":"http://dev.qiyico.com/kybaby/orgBusiness/",//机构
    "fdmanage":"http://dev.qiyico.com/kybaby/fdmanage/",//用户
    "fdmanageHost":"http://dev.qiyico.com/kybaby/fdmanage/",
    "doctorDataGather":"http://dev.qiyico.com/kybaby/DoctorDataGather/",
    "fileserver":"http://dev.qiyico.com:8088/fileserver",//图片路径
    "orgHuaxi":"http://dev.qiyico.com/kybaby/hydNetWorkClinic/"
};
var appId  = 'wxe143c55a723e1738';//测试服务器
//var appId  = 'wxc592f8c1fcf1ba64';//正式服务器

function ale(str,font){
    $('body').append('<div id="alert-cover" onclick="closeAlertCover()"> <div id="alert-content"> ' +
    '<div id="alert-line"></div> ' +
    '<div id="alert-text"> ' +
    '<div class="alert-text-show">'+str+'</div> ' +
    '</div> ' +
    '</div> ' +
    '</div>');
    showAlertCover();
    setTimeout(closeAlertCover,2000)
}
function showAlertCover(){
    $('#alert-cover').show();
    $('#alert-content').animate({'top':'0'},1);
}
function closeAlertCover(){
    $("#alert-cover").remove();
}

//确认弹框
function com(title,msg,bt1,bt2,func){
    var tit = '';
    if(title!=''){
        tit = '<div id="dialogTitle">'+title+'</div>';
    }
    var btn = '<p class="flex_item color" id="bt1">'+bt1+'</p>';
    if(bt2!=''&&bt2!=undefined){
        btn = '<p class="flex_item no_color" id="bt1">'+bt1+'</p><p class="flex_item color" id="bt2">'+bt2+'</p>';
    }
    $('body').append('<div id="dialogContainer" class="dialog_container">' +
        '<div id="dialogBox" class="dialog_box">' +
            '<div id="dialogIcon"> <img src="img/alert-icon.png" alt=""></div>'+
        '<div id="dialogBody" onclick="event.stopPropagation();">' + tit +
        '<div class="dialog_content">'+msg+'</div></div>' +
        '<div class="flex_cont" id="confirm_btn">' + btn +'</div></div></div>');
    $('#dialogContainer').click(function () {
        $('#dialogContainer').fadeOut(function () {
            $('#dialogContainer').remove();
        });
    });
    $('p.color').click(function () {
        $('#dialogContainer').fadeOut(function () {
            $('#dialogContainer').remove();
        });
        if(func!=''&&func!=undefined){
            func();
        }
    });
    $('p.no_color').click(function () {
        $('#dialogContainer').fadeOut(function () {
            $('#dialogContainer').remove();
        });
        return;
    });
}

function encoded_url(obj){//编码地址url并添加参数
    var str=encodeURIComponent(JSON.stringify(obj));
    return str;
}

function parse_url(){//解析地址url并得到参数
    var obj=decodeURIComponent(window.location.search.substring(1));
    if(obj!=''){
        return JSON.parse(obj);
    }
}
function layer(){
    $("body").append('<div id="layer"><div id="layer_main"><img src="images/error_404.png"/><p id="layer_p">404...出错啦</p><p><span id="layer_return" onclick="return_before()">返回上一页</span><span id="layer_index" onclick="return_index()">返回首页</span></p></div></div>')
}
function return_index(){
    if(window.location.href.indexOf('org_')>-1){
        window.location.href = "org_login.html";
    }else{
        window.location.href = "consultation.html";
    }
}
function threeUnaryEvent(con){//三目运算判断如果是null返回"";
    return con==null ? "" :con;
}
function link_to(url){
    window.location.href = url;
}
function return_before(){
    window.history.back();
}