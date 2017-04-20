/**
 * Created by Administrator on 2017/3/22.
 */

import $rout from '../../../router/router'
import ale from '../../../ale'
import recommend from '../recommend'

var productIds;
var majorIds;
var symptomIds;
var serviceTypeIds;
var roleName = "";
var optionArr = new Array();
var disable = false;
//    装主专业id
var select_id = '';
//    装病种id
var professionalId_arr = [],professionalOld_arr=[];
var url_id = '';
var status = null, typeName = null, user_phone = null;
export default function (obj) {
  //加载医生原有信息
  var flag=decodeURIComponent(window.location.href);
  var type = flag.indexOf("&");
  var name = flag.indexOf("=");
  typeName = flag.substring(name + 1, type);
  status = flag.substring(type + 8, flag.length);
  roleName = typeName;

  gettittle();

  if(status == "未申请") {
    $("#updateDiv").hide();
    $("#submitDiv").show();
    $(".mustFill").text("*");

    $("input").removeAttr("readonly").removeAttr("disabled");
    $("select").removeAttr("disabled").removeAttr("readonly");

    disable = true;
    roleName = typeName;
  }else {
    initDoctorInfo();
  }

  $("#header_titles").text(typeName + "认证");

  //修改
  $('#tc-content').click(function () {
    $('#tc-content').hide();
  });
  //修改
  $('#updateDiv span').click(function () {
    updateInfo();
  });

  //提交
  $("#submitDiv span").click(function () {
    submited();
  });

  //上传图片
  $("#upload").change(function () {
    loadImage($(this),'头像');
  });

  //性别
  $('.sex_box').click(function () {
    if(disable) {
      switch_sex($(this));
    }
  });

  //上传证书
  $("#upload_img").change(function () {
    loadImage(this,'证书');
  });

  //工作单位
  $("#workUnitDiv").click(function (event) {
    if(disable) {
      chooseHos.show(event);
    }
  });

  //关闭
  $("#close").click(function (event) {
    if(disable) {
      chooseHos.close(event);
    }
  });

  //搜索
  $("#search").click(function () {
    if(disable) {
      search();
    }
  });

  //确认
  $("#submit").click(function (event) {
    if(disable) {
      chooseHos.ok(event);
    }
  });

  //医生职称
  $("#doctorTittle").change(function () {
    if(disable) {
      getService();
    }
  });

  bottom_button();
  //阻止冒泡
  $("#layer_div>div").click(function(event){
    event.stopPropagation();
  })
  //弹框搜索
  search_box();

}

function switch_sex(obj){
	$(obj).addClass("selected").siblings().removeClass("selected");
}
function gettittle(){
	$.ajax({
		url:host+'doctorIdentify.action',
		async:false,
		cache:false,
		data:{action:"getSomething",professionFlag:typeName},
		success:function(result){
            //科室
            var department = '';
            if(result.doctorBasicDataList!=null){
                for(var j = 0;j<result.doctorBasicDataList.length;j++){
                    if(result.doctorBasicDataList[j].busType=='科室'){
                        department += '<option value="'+result.doctorBasicDataList[j].showName+'">'+result.doctorBasicDataList[j].showName+'</option>';
                    }
                }
            }
            $('#renzheng10').html(department);
			for(var j=0;j<result.majorList.length;j++){
				if(result.majorList[j].doctorRole=="医生"){
					$("#majorList").append("<li><span class='grey' majorId='"+result.majorList[j].id+"'>"+result.majorList[j].major+"</span></li>");
				}
			}
			for(var k=0;k<result.symptomTag.length;k++){
				$("#symptomTag").append("<li><span class='grey' symptomId='"+result.symptomTag[k].id+"'>"+result.symptomTag[k].symptomName+"</span></li>");
			}
			if(result.positionList!=null){
				for(var i=0;i<result.positionList.length;i++){
					//option的value值为小区ID, 显示的是小区的名字
					$("#doctorTittle").append(
							"<option value='"+result.positionList[i].rank +"'>"+result.positionList[i].name+"</option>"
					);
				}
				getService();
			}
			if(result.hospitalBasicInfoList!=null){
				for(var i=0;i<result.hospitalBasicInfoList.length;i++){
					//option的value值为医院ID, 显示的是医院的名字
					$("#hospital").append(
							"<option value='"+result.hospitalBasicInfoList[i].id +"'>"+result.hospitalBasicInfoList[i].hospitalLname+"</option>"
					);
					//医院查询
					optionArr.push("<option value='"+result.hospitalBasicInfoList[i].id +"'>"+result.hospitalBasicInfoList[i].hospitalLname+"</option>");
				}
			}
			//服务项目渲染
			if(result.doctorServiceTypeFoList!=null){
				var divHtml = "";
				for(var i=0;i<result.doctorServiceTypeFoList.length;i++){
					var parent = result.doctorServiceTypeFoList[i].doctorServiceType;
					var childList = result.doctorServiceTypeFoList[i].childList;

					divHtml += "<p class='gray_3'></p>" +
					    		"<div class='row'>" +
					        "<span class='tittle' style='font-size:12px'> 开放"+parent.serviceTypeName+"</span><br/>" +
					        "<ul>";
					for(var j=0;j<childList.length;j++){
						 divHtml +="<li><span class='grey' serviceTypeId='"+childList[j].id+"'>"+childList[j].serviceTypeName+"</span></li>";
					}
					divHtml +=  "</ul></div>";
				}
				$("#serviceType").html(divHtml);
			}


      $("#majorList li .grey").click(function () {
        if(disable) {
          changemajor($(this));
        }
      });

      $("#symptomTag li .grey").click(function () {
        if(disable) {
          changesymptom($(this));
        }
      });

      $("#serviceType li .grey").click(function () {
        if(disable) {
          changeServiceType($(this));
        }
      });

      var tag = "both";
      //医生维护
      if(result.doctorInfo != null && result.doctorInfo.id!=null){
        var info = result.doctorInfo;

        //主专业方向
        if(info.major != null){
          var firstmajor = info.major.id;//主专业方向
          //var current_id='';
          if(result.firstMajors!=null){
            for(var i=0;i<result.firstMajors.length;i++){
              var m_num = result.firstMajors[i].id.toString();
              if(firstmajor == m_num){
                $("#doc_direction").text(result.firstMajors[i].major);
              }
            }
          }else{
            $("#doc_direction").parent(".layer_choose").hide();
          }
        }else{
          $("#doc_direction").text("请选择");
        }

        //亚专业
        if(info.secondMajorIds != null){
          if(info.secondMajorIds!=null&&info.secondMajorIds.length>0){
            var secondMajor_arr = info.secondMajorIds.split("::");//亚专业数组
            var secondMajor='';//亚专业字符串
            for(var i=0;i<result.secondMajors.length;i++){
              var m_num = result.secondMajors[i].id.toString();
              if($.inArray(m_num, secondMajor_arr)!=-1){
                secondMajor += result.secondMajors[i].major+" ";
              }
            }
            $("#doc_professional").text(secondMajor);
          }else{
            $("#doc_professional").parent(".layer_choose").hide();
          }
        }else{
          $("#doc_professional").text("请选择");
        }

        //病种
        if(info.thirdMajorIds!=null){
          if(info.thirdMajorIds!=null&&info.thirdMajorIds.length>0){
            var thirdMajorId_arr = info.thirdMajorIds.split("::");//病种数组
            var thirdMajorId='';//病种字符串
            for(var i=0;i<result.thirdMajors.length;i++){
              var m_num = result.thirdMajors[i].id.toString();
              if($.inArray(m_num, thirdMajorId_arr)!=-1){
                thirdMajorId += result.thirdMajors[i].major+" ";
              }
            }
            $("#doc_diseases").text(thirdMajorId);
          }else{
            $("#doc_diseases").parent(".layer_choose").hide();
          }
        }else{
          $("#doc_diseases").text("请选择");
        }

        layer_choose(tag);
      }

      else{//新建医生//主专业
        var firstMajors = '';
        if(result.firstMajors!=null){
          for(var i=0;i<result.firstMajors.length;i++){
            var firstMajor = result.firstMajors[i];
            firstMajors += '<li data-id="'+firstMajor.id+'">'+firstMajor.major+'</li>'
          }
        }
        $("#layer_list_direction .layer_list>ul").html(firstMajors);
        $(".direction_information li").click(function(){
          layer_list_li(this);
        })
        if(result.secondMajors!=null&&result.secondMajors.length>0){
          //亚专业
          var secondMajors = '';
          for(var j=0;j<result.secondMajors.length;j++){
            var secondMajor = result.secondMajors[j];
            secondMajors += '<li data-parentId="'+secondMajor.parent.id+'" data-id="'+secondMajor.id+'">'+secondMajor.major+'</li>'
          }
          $("#layer_list_professional .layer_list_two>ul").html(secondMajors);
          if(result.thirdMajors!=null&&result.thirdMajors.length>0) {
            //病种
            var thirdMajors = '';
            for(var k=0;k<result.thirdMajors.length;k++){
              var thirdMajor = result.thirdMajors[k];
              thirdMajors += '<li data-parentId="'+thirdMajor.parent.id+'" data-parentsId="'+thirdMajor.parent.parent.id+'" data-id="'+thirdMajor.id+'">'+thirdMajor.major+'</li>'
            }
            $("#layer_list_diseases .layer_list_two>ul").html(thirdMajors);
          }else{
            $("#doc_diseases").parent(".layer_choose").hide();
          }
          layer_list_two_li();
        }else{
          $("#doc_professional").parent(".layer_choose").hide();
          $("#doc_diseases").parent(".layer_choose").hide();
        }
        if(result.doctorInfo != null && result.doctorInfo.authentication!=null){
          $("#layer_list_title li").each(function(){
            if($(this).text()==$("#doc_title").text()){
              $(this).addClass("green");
            }
          })
          $("#layer_list_direction li").each(function(){
            if($(this).text()==$("#doc_direction").text()){
              $(this).addClass("green");
            }
          })

          if(info.secondMajorIds!=null){
            var secondMajors_arr = info.secondMajorIds.split("::");
            if(result.doctorInfo.major!=null){
              $("#layer_list_professional .layer_list_two li").each(function(){
                if($(this).attr("data-parentid")!=result.doctorInfo.major.id){
                  $(this).hide();
                }
                if($.inArray($(this).data("id").toString(), secondMajors_arr)>-1){
                  $(this).addClass("green");
                }
              })
            }
          }
          if(info.thirdMajorIds!=null){
            var thirdMajorIds_arr = info.thirdMajorIds.split("::");
            $("#layer_list_diseases li").each(function(){
              if($.inArray($(this).attr("data-parentid").toString(), secondMajors_arr)==-1){
                $(this).hide();
              }
              if($.inArray($(this).data("id").toString(), thirdMajorIds_arr)>-1){
                $(this).addClass("green");
              }
            })
          }
        }

        layer_choose(tag);
      }
		}
	});
}

function getService(){
	$.ajax({
		url:host+'doctorIdentify.action',
		async:false,
		cache:false,
		data:{action:"getProduct",rank:  $("#doctorTittle").val()},
		success:function(result){
			if(result.mes=="已申请"){
				ale("请不要重复提交");
			}
			if(result.productNameList!=null){
				$("#serviceProducts").empty();
				for(var i=0;i<result.productNameList.length;i++){
					//option的value值为小区ID, 显示的是小区的名字
					var str = result.productNameList[i].toString();
					var strList = str.split(",");
					$("#serviceProducts").append(
							"<li><span class='grey' data_id='"+strList[0]+"'>"+strList[1]+"</span></li>"
					);

				}

        $("#serviceProducts li .grey").click(function () {
          changecolor($(this));
        });
			}
		}
	});

}

function submited(){
//	ale($("#renzheng06").val());
	var idCard=$.trim($("#idCard").val());
	var doctorHeadFileElem = $("#updateDoctorHeadFileElem").val();
	var MyHeadFileElem = $("#updateMyHeadFileElem").val();
//	if(location.search.substring(1) != 'needInit' && MyHeadFileElem == ""){
//		ale("请上传您的执照图片");
//	}
//	if(status != ""){			//修改时标签字符串重组
//		var arr_string = '';
//		var mark = $('#majorList li span').filter(function(){
//			return $(this).hasClass('blue');
//		});
//		for(var i=0;i < mark.length;i++){
//			arr_string = arr_string + "::" + mark.eq(i).attr('majorId');
//		}
//		majorIds = arr_string.substring(2);
//	}

	if(status != ""){			//修改时标签字符串重组
		var arr_string='';
		var mark = $('#serviceProducts li span').filter(function(){
			return $(this).hasClass('blue');
		});
		for(var i=0;i < mark.length;i++){
			arr_string = arr_string + "::" + mark.eq(i).attr('data_id');
		}
		productIds = arr_string.substring(2);
	}

	if(status != ""){			//修改时标签字符串重组---服务项目
		var arr_string='';
		var mark = $('#serviceType ul li span').filter(function(){
			return $(this).hasClass('blue');
		});
		for(var i=0;i < mark.length;i++){
			arr_string = arr_string + "::" + mark.eq(i).attr('serviceTypeId');
		}
		serviceTypeIds = arr_string.substring(2);
	}

	if($("#renzheng01").val()==""){
		ale('请填写姓名');
		$("#renzheng01").focus();
		return false;
	}else if($('#idCard').val().trim() == ''){
		$("#idCard").focus();
		ale('请填写执业证号');
		return false;
	}else if($("#renzheng03").attr("data-hospital")==""){
		//$("#renzheng03").focus();
		ale('请选择工作单位');
		return false;
	}else if($("#renzheng08").val()==""){
		$("#renzheng08").focus();
		ale('请填写银卡卡号');
		return false;
	}else if($("#renzheng09").val().trim()==""){
		$("#renzheng09").focus();
		ale('请填写临床经验');
		return false;
	}else if(isNaN($("#renzheng09").val().trim())){
		$("#renzheng09").focus();
		ale('临床经验请填写有效数字');
		return false;
	}else if($("#renzheng09").val().trim().length > 2){
		ale('临床经验请填写有效数');
		$("#renzheng09").focus();
		return false;
	}
  //else if(majorIds == null){
	//	ale('请选择专业方向');
	//	return false;
	//}
//	else if(productIds == null){
//		ale('请选择服务产品');
//		return false;
//	}
	else if(serviceTypeIds == null || serviceTypeIds == ""){
		ale('请选择开放服务类型');
		return false;
	}else if(location.search.substring(1) != 'needInit' && doctorHeadFileElem == ""){
		ale("请上传您的头像")
		return false;
	}


  var firstMajorId = $("#layer_list_direction li.green").data("id");
  if(firstMajorId == undefined){
    firstMajorId = '';
  }
  var secondMajorId_arr = [];
  if($("#doc_professional").parent(".layer_choose").css("display")!="none"){
    $("#layer_list_professional .layer_list_two li.green").each(function(){
      secondMajorId_arr.push($(this).data("id"));
    });
    var secondMajorIds = secondMajorId_arr.join("::");
  }
  if(secondMajorIds == undefined){
    secondMajorIds = '';
  }
  //病种
  var thirdMajorId_arr = [];
  if($("#doc_professional").parent(".layer_choose").css("display")!="none"){
    $("#layer_list_diseases .layer_list_two li.green").each(function(){
      thirdMajorId_arr.push($(this).data("id"));
    });
    var thirdMajorIds = thirdMajorId_arr.join("::");
  }
  if(thirdMajorIds == undefined){
    thirdMajorIds = '';
  }



	if($("#renzheng01").val()==""||$("#renzheng03").attr("data-hospital")==""
		||$("#renzheng08").val()==""||idCard==""||$("#renzheng09").val()==""){
		ale("请完善认证信息");
	}
	else if(location.search.substring(1) != 'needInit' && doctorHeadFileElem == ""){
		ale("请上传您的头像");
	}
	else{
        if($("#renzheng08").val().trim().length>19){
            ale("请检查您的银行卡号!");
            return false;
        }
        if($("#renzheng01").val().trim().length>20){
            ale("请不要输入超过20个字符的名字!");
            return false;
        }
		if(idCard.length>30){
			ale("请检查您的资格证号!");
		}else{
			if(location.search.substring(1) == 'needInit'){
				if(!confirm('确定要修改吗？审核期间将无法提供服务！')){
					return false;
				}
			}
			//hf_loading(true);
            //console.log($("#renzheng01").val());
            //console.log($(".sex_box.selected").attr('data-sex'));
            //console.log($("#doctorTittle").val());
            //console.log($("#renzheng03").attr("data-hospital"));
            //console.log($("#renzheng07").val());
            //console.log($("#renzheng08").val());
            //console.log(idCard);
            //console.log($("#renzheng03Id").val());
            //console.log($("#renzheng10").val());
            //console.log($("#renzheng09").val());
            //console.log(serviceTypeIds);
            //console.log(roleName);
            //return false;
			$.ajax({
				type:'post',
				url:host+'doctorIdentify.action',
				async:false,
				data:{action:"submited",
					doctorName:$("#renzheng01").val(),
					doctorSex:$(".sex_box.selected").attr('data-sex'),
					doctorTitle:$("#doctorTittle").val(),
					doctorEmployer:$("#renzheng03").attr("data-hospital"),
					//serviceMode:$("#renzheng04").val(),
					serviceMode:"全部",
					bankAccountName:$("#renzheng07").val(),
					bankCard:$("#renzheng08").val(),
					//comeMethod:$("#renzheng05").val(),
					comeMethod:"平台接送",
					//serviceArea:$("#renzheng06").val(),
					serviceArea:"20",
					majorId:majorIds,
					//productIds:productIds,
					productIds:"7",
					goodAtField:"1",
					advisoryLabelIds:symptomIds,
					idCard:idCard,
					hospitalBasicInfoId:$("#renzheng03Id").val(),//医院id
					department:$("#renzheng10").val(),//所在科室
					clinicalExperience:$("#renzheng09").val(),//临床经验
					serviceTypeIds:serviceTypeIds,//服务项目ids
					roleName:roleName,
          firstMajorIds:firstMajorId,
          secondMajorIds:secondMajorIds,
          thirdMajorIds:thirdMajorIds
					},
				success:function(result){
					if(result.mes=="成功"){
					  ale("提交成功");
					  // $('#tc-content').show();
            user_phone = result.doctorInfo.doctorPhone;
            // recommend(,'推荐奖励','康优医生集团诚邀您的加入','注册通过审核并参会即有现金红包可以拿，邀请身边儿科/儿保医生加入，邀请1人翻1翻，邀请2人翻2翻，邀请N人翻N翻……');
					}
				}
			});
			//上传资质证书图片
			sendImageNow("头像");
			//上传头像图片
      sendImageNow("证书");
		}
	}
}

//点击切换颜色并获取value值
function changecolor(obj){
	var arr_string='';
	$(obj).toggleClass("blue");
	$(obj).toggleClass("grey");
	var mark = $('#serviceProducts li span').filter(function(){
		return $(this).hasClass('blue');
	});
	for(var i=0;i < mark.length;i++){
		arr_string = arr_string + "::" + mark.eq(i).attr('data_id');
	}
	productIds = arr_string.substring(2);
}
//点击切换服务类型颜色并获取value值
function changeServiceType(obj){
	var arr_string='';
	$(obj).toggleClass("blue");
	$(obj).toggleClass("grey");
	var mark = $('#serviceType ul li span').filter(function(){
		return $(this).hasClass('blue');
	});
	for(var i=0;i < mark.length;i++){
		arr_string = arr_string + "::" + mark.eq(i).attr('serviceTypeId');
	}
	serviceTypeIds = arr_string.substring(2);
}
//点击切换颜色并获取value值
function changemajor(obj){
	var arr_string='';
	$(obj).toggleClass("blue");
	$(obj).toggleClass("grey");
	var mark = $('#majorList li span').filter(function(){
		return $(this).hasClass('blue');
	});
	for(var i=0;i < mark.length;i++){
		arr_string = arr_string + "::" + mark.eq(i).attr('majorId');
	}
	majorIds = arr_string.substring(2);
}

//点击切换颜色并获取value值
function changesymptom(obj){
	var arr_string='';
	$(obj).toggleClass("blue");
	$(obj).toggleClass("grey");
	var mark = $('#symptomTag li span').filter(function(){
		return $(this).hasClass('blue');
	});
	for(var i=0;i < mark.length;i++){
		arr_string = arr_string + "::" + mark.eq(i).attr('symptomId');
	}
	symptomIds = arr_string.substring(2);
}



//测试。。。。。。。。。。。。。。。。。。。。
function hf_loading(status){/*------加载动画,传值布尔flase，取消动画------*/
	if(status == false){
		document.getElementsByTagName('body')[0].removeChild(document.getElementById('hf_loading'));
		return false;
	}
	$('body').append(
			"<div id='hf_loading' style='z-index:1000;position:absolute;top:0px;left:0px;'>"+
			"<div id='hf_loading_box' style='width:120px;height:120px;text-align:center;position:fixed;'>"+
			"<img id='hf_loading_img' src='images/hf_autoplay.png' style='margin-bottom:10px;' />"+
			"<span id='hf_loading_word' style='display:block;font-size:11px;text-indent:16px;text-align:left;color:#868686;font-weight:bold;'>正在提交中。</span>"+
			"</div>"+
	"</div>");

	var divobj = document.getElementById('hf_loading');
	var boxobj = document.getElementById('hf_loading_box');
	var imgobj = document.getElementById('hf_loading_img');
	var spanobj = document.getElementById('hf_loading_word');
	var du = 0;

	//divobj.style.width = document.documentElement.scrollWidth + "px";
	//divobj.style.height = document.documentElement.scrollHeight + "px";
	divobj.style.width = $(document).width() + "px";
	divobj.style.height = $(document).height() + "px";

	boxobj.style.top = (document.documentElement.clientHeight/2 - boxobj.offsetHeight/2) + "px";
	boxobj.style.left = (document.documentElement.clientWidth/2 - boxobj.offsetWidth/2) + "px";

	function trans(){
		if(du == 360){
			du = 0;
		}else{
			du = du + 10;
		}
		imgobj.style.transform = "rotate("+du+"deg)";
		imgobj.style.WebkitTransform = "rotate("+du+"deg)";
	}
	function transword(){
		if(spanobj.innerHTML == '正在提交中。'){
			spanobj.innerHTML = '正在提交中。。';
		}else if(spanobj.innerHTML == '正在提交中。。'){
			spanobj.innerHTML = '正在提交中。。。';
		}else if(spanobj.innerHTML == '正在提交中。。。'){
			spanobj.innerHTML = '正在提交中。';
		}
	}
	setInterval(function(){
		transword();
	},300);
	setInterval(function(){
		trans();
	},20);
}
// 加载 图像文件(url路径)
function loadImage_touxiang(obj){
	var src = $(obj).get(0).files[0];
	var mpImg = new MegaPixImage(src);
	var mpImg_up = new MegaPixImage(src);
	var resCanvas1  = document.getElementById("doctorCanvas");//预览
	var resCanvas2  = document.getElementById("doctorCanvasUp");//上传

  mpImg.render(resCanvas1, {
      maxHeight: 40
  });
  mpImg_up.render(resCanvas2, {
      maxWidth: 400,
      maxHeight: 400
  });

  setTimeout(function(){
	  $('#updateDoctorHeadFileElem').css({
	  	'width':function(){
	  		return $('#doctorCanvas').css('width');
	  	},
	  	'height':function(){
	  		return $('#doctorCanvas').css('height');
	  	}
	  });
  },2000);
  $('#doctorCanvas').show().prev().remove();
};
function loadImage_zhizhao(obj){
	var src = $(obj).get(0).files[0];
	var mpImg = new MegaPixImage(src);
	var mpImg_up = new MegaPixImage(src);
	var resCanvas1  = document.getElementById("myCanvas");//预览
	var resCanvas2  = document.getElementById("myCanvasUp");//上传
  mpImg.render(resCanvas1, {
      maxHeight: 40
  });
  mpImg_up.render(resCanvas2, {
      maxWidth: 800,
      maxHeight: 800
  });

  setTimeout(function(){
	  $('#updateMyHeadFileElem').css({
	  	'width':function(){
	  		return $('#myCanvas').css('width');
	  	},
	  	'height':function(){
	  		return $('#myCanvas').css('height');
	  	}
	  });
  },2000);
  $('#myCanvas').show().prev().remove();
};
//---------------------------------------------
// 上传图片，jQuery版
//2015-12-02李昊修改，增加一个上传Canvas的id参数，用于区分不同的图片
//function sendImage(canvasUpId){
//    var canvas=null;
//    if(canvasUpId == "doctorCanvasUp"){
//        canvas= document.getElementById(canvasUpId);
//    }else if(canvasUpId == "myCanvasUp"){
//        canvas= document.getElementById(canvasUpId);
//    }
//	;
//	// 获取Base64编码后的图像数据，格式是字符串
//	// "data:image/png;base64,"开头,需要在客户端或者服务器端将其去掉，后面的部分可以直接写入文件。
//    console.log(canvasUpId);
//	var dataurl = canvas.toDataURL("image/png");
//	// 为安全 对URI进行编码
//	// data%3Aimage%2Fpng%3Bbase64%2C 开头
//	var imagedata =  encodeURIComponent(dataurl);
//
//	var actionName = "image";
//	if(canvasUpId == "doctorCanvasUp"){
//		actionName = "headImg";
//	}
//
//	$.ajax({
//		url:host+'doctorIdentify.action',
//		async:false,
//		data :{
//			action:actionName,
//			imagedata:imagedata
//		},
//		type : "POST",
//		success:function(){
//			hf_loading(false);
//			//window.location.href='consultation.html';
//		},
//		error:function(){
//
//		}
//	});
//
//};

//初始化加载医生信息
function initDoctorInfo(){
	//将提交改为修改

	//$('#majorList span,#serviceProducts span').removeAttr('onclick');
	//$('#serviceType ul li span').removeAttr('onclick');
	//$('#sex .sex_box').removeAttr('onclick');
	//$('#workUnitDiv').removeAttr('onclick');

  $("#updateDiv").show();
  $("#submitDiv").hide();
  $(".mustFill").hide();
  $("input").attr("readonly","readonly").attr('disabled','disabled');
  $("select").attr("disabled","disabled").attr('disabled','disabled');

	$.ajax({
		url:host+'doctorIdentify.action',
		cache:false,
		async:true,
		data :{
			action:"initDoctorInfo",
      professionFlag:typeName
		},
		type : "POST",
		success:function(result){
			var doctor = result.doctorInfo;
			$("#renzheng01").val(doctor.doctorName);
			if(doctor.doctorImage == ''){
				$('#tou_img').attr("src",urlWay.fileserver+"/kybabyBG/admin/images/userFaceIcon/lt_doctor.png");
			}else{
				$('#tou_img').attr("src",urlWay.fileserver+doctor.doctorImage+"?"+Math.random());
			}
			$("#touxiang").val(doctor.doctorName);
            $('.sex_box').removeClass('selected');
            $('.sex_box[data-sex='+doctor.doctorSex+']').addClass('selected');
			$("#idCard").val(doctor.idCard);
      if(doctor.licenseImage == ''){
        $('#linces_img').attr("src",urlWay.fileserver+"/kybabyBG/admin/images/userFaceIcon/lt_doctor.png");
      }else{
        $('#linces_img').attr("src",urlWay.fileserver+doctor.licenseImage+"?"+Math.random());
      }
            $("#renzheng03").attr("data-hospital",doctor.doctorEmployer).html(doctor.doctorEmployer);
			//$("#renzheng03").val();
			$("#renzheng03Id").val(doctor.hospitalId);
			$("#doctorTittle").val(doctor.doctorTitle);
			$("#renzheng04").val(doctor.serviceMode);
			$("#renzheng05").val(doctor.comeMethod);
			$("#renzheng06").val(doctor.serviceArea);
			$("#renzheng07").val(doctor.bankAccountName);
			$("#renzheng08").val(doctor.bankCard);
			$("#renzheng09").val(doctor.clinicalExperience);
			//所属科室
			$("#renzheng10 option").each(function(){
				if($(this).html() == doctor.department){
					$(this).attr("selected","selected");
				}
			});
			//医生职称doctorTitle
			$("#doctorTittle option").each(function(){
				if($(this).html() == doctor.doctorTitle){
					$(this).attr("selected","selected");
				}
			});
			//医生医院hospital
			$("#hospital option").each(function(){
				if($(this).html() == doctor.doctorEmployer){
					$(this).attr("selected","selected");
				}
			});

			//服务产品
			if(doctor.productIds != ""){
				var productIdList = doctor.productIds.split("::");
				$("#serviceProducts span").each(function(){
					if($.inArray($(this).attr("data_id"), productIdList) > -1){
						$(this).attr("class","blue");
					}
				});
			}
			//服务项目
			if(doctor.serviceTypeIds != ""){
				var serviceTypeIdList = doctor.serviceTypeIds.split("::");
				$("#serviceType ul li span").each(function(){
					if($.inArray($(this).attr("serviceTypeId"), serviceTypeIdList) > -1){
						$(this).attr("class","blue");
					}
				});
			}

      majorIds = doctor.majorId || '';

      url_id = doctor.id || '';

      var tag = "both";
      //医生维护
      if(result.doctorInfo != null && result.doctorInfo.id!=null){
        var info = result.doctorInfo;

        //主专业方向
        if(info.major != null){
          var firstmajor = info.major.id;//主专业方向
          //var current_id='';
          if(result.firstMajors!=null){
            for(var i=0;i<result.firstMajors.length;i++){
              var m_num = result.firstMajors[i].id.toString();
              if(firstmajor == m_num){
                $("#doc_direction").text(result.firstMajors[i].major);
              }
            }
          }else{
            $("#doc_direction").parent(".layer_choose").hide();
          }
        }else{
          $("#doc_direction").text("请选择");
        }

        //亚专业
        if(info.secondMajorIds != null){
          if(info.secondMajorIds!=null&&info.secondMajorIds.length>0){
            var secondMajor_arr = info.secondMajorIds.split("::");//亚专业数组
            var secondMajor='';//亚专业字符串
            for(var i=0;i<result.secondMajors.length;i++){
              var m_num = result.secondMajors[i].id.toString();
              if($.inArray(m_num, secondMajor_arr)!=-1){
                secondMajor += result.secondMajors[i].major+" ";
              }
            }
            $("#doc_professional").text(secondMajor);
          }else{
            $("#doc_professional").parent(".layer_choose").hide();
          }
        }else{
          $("#doc_professional").text("请选择");
        }

        //病种
        if(info.thirdMajorIds!=null){
          if(info.thirdMajorIds!=null&&info.thirdMajorIds.length>0){
            var thirdMajorId_arr = info.thirdMajorIds.split("::");//病种数组
            var thirdMajorId='';//病种字符串
            for(var i=0;i<result.thirdMajors.length;i++){
              var m_num = result.thirdMajors[i].id.toString();
              if($.inArray(m_num, thirdMajorId_arr)!=-1){
                thirdMajorId += result.thirdMajors[i].major+" ";
              }
            }
            $("#doc_diseases").text(thirdMajorId);
          }else{
            $("#doc_diseases").parent(".layer_choose").hide();
          }
        }else{
          $("#doc_diseases").text("请选择");
        }

        layer_choose(tag);
      }
		},
		error:function(){

		}
	});
}
//修改编辑资料
function updateInfo(){
	if(!confirm("确认需要修改资料吗？")){
		return false;
	}
	$("#promptDiv").show();
	$("input").removeAttr("readonly").removeAttr("disabled");
	$("select").removeAttr("disabled").removeAttr("readonly");

	//$('#majorList span').attr('onclick','changemajor(this)');
	//$('#workUnitDiv').attr('onclick','chooseHos.show(event)');
  //$('#sex .sex_box').attr('onclick','switch_sex(this)');

  //$('#serviceProducts span').attr('onclick','changecolor(this)');
	//$('#serviceType ul li span').attr('onclick','changeServiceType(this)');
	$("#updateDiv").hide();
	$("#submitDiv").show();
	$(".mustFill").text("*");
	$(".mustFill").show();

  disable = true;
    //
	//var head_ico = document.querySelector('#showDoctor_img');
	//var head_canvas = document.querySelector('#doctorCanvasUp');
	//var head_cdx = head_canvas.getContext('2d');
	//var head_width = '';
	//var head_height = '';
	//$("<img/>").attr('src',$(head_ico).attr('src')).load(function(){
	//	head_width = this.width;//图片真实宽度
	//	head_height = this.height;//图片真实高度
    //
	//	head_canvas.width = this.width;//重置画布宽度
	//	head_canvas.height = this.height;//重置画布高度
    //
	//	head_cdx.clearRect(0,0,head_canvas.width,head_canvas.height);//清空画布
	//	head_cdx.drawImage(head_ico,0,0,head_width,head_height,0,0,head_canvas.width,head_canvas.height);
	//});
    //
	//var zhizhao_ico = document.querySelector('#show_img');
	//var zhizhao_canvas = document.querySelector('#myCanvasUp');
	//var zhizhao_cdx = zhizhao_canvas.getContext('2d');
	//var zhizhao_width = '';
	//var zhizhao_height = '';
	//$("<img/>").attr('src',$(zhizhao_ico).attr('src')).load(function(){
	//	zhizhao_width = this.width;
	//	zhizhao_height = this.height;
    //
	//	zhizhao_canvas.width = this.width;//重置画布宽度
	//	zhizhao_canvas.height = this.height;//重置画布高度
    //
	//	zhizhao_cdx.clearRect(0,0,zhizhao_canvas.width,zhizhao_canvas.height);
	//	zhizhao_cdx.drawImage(zhizhao_ico,0,0,zhizhao_width,zhizhao_height,0,0,zhizhao_canvas.width,zhizhao_canvas.height);
	//});

}
//选择地址相关
var chooseHos = {
	close:function(event){
		event.preventDefault();
		$("#addressCover").fadeOut(200);
	},
	show:function(event){
		event.preventDefault();
		event.stopPropagation();
		$("#addressCover").show();
		//$("#renzheng03").blur();
	},
	ok:function(event){
		event.preventDefault();
		$("#addressCover").fadeOut(200);
		$("#renzheng03").attr("data-hospital",$("#hospital").find("option:selected").text()).html($("#hospital").find("option:selected").text());
		$("#renzheng03Id").val($("#hospital").val());
	}
}
//医院查询

function search(){
//	optionArr.length = 0;
	var inputVal = $.trim($("#inputVal").val());
	if(optionArr.length > 0){
		$("#hospital").empty();
		for(var i=0;i<optionArr.length;i++){
			if(optionArr[i].indexOf(inputVal) >= 0){
				$("#hospital").append(optionArr[i]);
			}
		}
	}
}

function loadImage(obj,type) {
    var src = $(obj).get(0).files[0];
    var imgType = src.name.split('.');
    imgType = imgType[imgType.length - 1];//返回后缀名，以兼容部分移动端浏览器
    if (imgType == 'jpg') {
        imgType = 'jpeg';
    }
    if (!(imgType == 'jpeg' || imgType == 'png' || imgType == 'gif')) {
        ale('请选择图片文件');
        return false;
    }

    // 创建 FileReader 对象 并调用 render 函数来完成渲染.
    var reader = new FileReader();
    // 绑定load事件自动回调函数
    var imgData = '';
    reader.onload = function (e) {
        if (e.target.result.substring(5, 10) != 'image') {
            var imgDataArr = e.target.result.split('base64');
            imgData = imgDataArr[0] + "image/" + imgType + ";base64" + imgDataArr[1];
            render(imgData, obj,type);
        } else {
            render(e.target.result, obj,type);
        }
    };
    // 读取文件内容
    reader.readAsDataURL(src);
}
var MAX_HEIGHT = 500;
// 渲染
function render(src, obj,type) {
    var image = new Image();
    image.onload = function () {
        var canvas = $(obj).prev(".canvas").get(0);
        var canvas1 = $(obj).next(".canvas1").get(0);
        var x = image.width;
        var y = image.height;

        if (image.height > MAX_HEIGHT) {
            // 宽度等比例缩放 *=
            image.width *= MAX_HEIGHT / image.height;
            image.height = MAX_HEIGHT;
        }
        var ctx = canvas.getContext("2d");  // 获取 canvas的 2d 环境对象,可以理解Context是管理员，canvas是房子
        var ctx1 = canvas1.getContext("2d");  // 获取 canvas的 2d 环境对象,可以理解Context是管理员，canvas是房子
        ctx.clearRect(0, 0, 40, 40);// canvas清屏
        ctx1.clearRect(0, 0, canvas1.width, canvas1.height);// canvas清屏
        canvas1.width = image.width;  // 重置canvas宽高
        canvas1.height = image.height;
        ctx.drawImage(image, 0, 0, x, y, 0, 0, 40, 40);  // 将图像绘制到canvas上
        ctx1.drawImage(image, 0, 0, x, y, 0, 0, image.width, image.height);  // 将图像绘制到canvas上
    };
    image.src = src;  // 记住必须先绑定事件，才能设置src属性，否则会出同步问题。
    setTimeout(function () {
        sendImage(obj,type);
    }, 1000);
    $(obj).prev(".canvas").show();
    $(obj).prev().prev().hide();
}
var doctorImageData='';
var zhengshuImageData='';
function sendImage(obj,type) {
    var canvas1 = $(obj).next(".canvas1").get(0);
    // 获取Base64编码后的图像数据，格式是字符串
    // "data:image/png;base64,"开头,需要在客户端或者服务器端将其去掉，后面的部分可以直接写入文件。
    var dataurl = canvas1.toDataURL("image/png");
    // 为安全 对URI进行编码
    // data%3Aimage%2Fpng%3Bbase64%2C 开头
    var imagedata = encodeURIComponent(dataurl);
    if(type=='头像'){
        doctorImageData=imagedata;
    }else if(type=='证书'){
        zhengshuImageData=imagedata;
    }
}
function sendImageNow(type) {
    var actionName='';
    var img='';
    if(type=='头像'){
        img=doctorImageData;
        actionName='headImg';
    }else if(type=='证书'){
        img=zhengshuImageData;
        actionName='image';
    }
    $.ajax({
        type : "POST",
        url:host+'doctorIdentify.action',
        async:true,
        cache:false,
        data :{
            action:actionName,
            imagedata:img
        },
        success:function(){
            //hf_loading(false);
          setTimeout(function () {
            $rout.push({ path: '/share_page', query: { phone: user_phone }});
          }, 1500);
        },
        error:function(){

        }
    });
}


//弹出弹框
function layer_choose(obj){
  $(".layer_choose").click(function(event){
    if(disable) {
      event.stopPropagation();
      //$("body").css("overflow","hidden");
      var index = $(this).data("id");
      //选中项为主专业方向或亚专业或病种
      if ($(this).data("name") == "professional") {
        $("#layer_box>div>div").hide();
        if ($(this).find("label").text() == "主专业方向：") {
          $("#layer_box").show();
          $("#layer_list_direction").show();
        } else if ($(this).find("label").text() == "亚专业：") {
          if ($("#doc_direction").text() == "请选择") {
            ale("请先选择主专业方向");
          } else {
            $("#layer_box").show();
            $("#layer_list_professional").show();
          }
        } else if ($(this).find("label").text() == "病种：") {
          if ($("#doc_direction").text() == "请选择") {
            ale("请先选择主专业方向");
          } else if ($("#doc_professional").text() == "请选择") {
            ale("请先选择亚专业");
          } else {
            $("#layer_box").show();
            $("#layer_list_diseases").show();
          }
        }
      } else {
        $("#layer_box").show();
        $("#layer_div>div").eq(index).show();
        $("#layer_div>div").eq(index).siblings().hide();
      }
      var height = 45;
      if ($("#layer_div>div").eq(index).find(".search_div").length != 0) {
        height += 68;
        if ($("#layer_div>div").eq(index).find(".bottom_button").length != 0) {
          height += 57;
        }
      }
      $("#layer_div ul").height($("#layer_div").height() - height);
    }
  });
}
window.document.onclick=function(){
  //$("body").css("overflow","auto");
  $('#layer_box').hide();
}
//    选中弹框内容
function layer_list_li(org){
  var index = $(org).parents(".layer_list").data("id");

  //弹框为主专业方向
  if(index==0){
    if(!$(org).hasClass("green")){
      //若亚专业和病种已被选择则会被清空
      if($("#doc_professional").text()!="请选择"||$("#doc_diseases").text()!="请选择"){
        var r=confirm("切换主专业方向后，亚专业和病种均需重新选择");
        if (r==true){
          professionalOld_arr = [];
        }else{
          return;
        }
      }
      $("#doc_professional").parent(".layer_choose").show();
      $("#doc_diseases").parent(".layer_choose").show();
      $("#doc_professional").text("请选择");
      //清空亚专业选中项
      $("#layer_list_professional .layer_list_two li").each(function(){
        $(this).removeClass('green');
        $(this).show();
      });
      $("#doc_diseases").text("请选择");
      //清空病种选中项
      $("#layer_list_diseases .layer_list_two li").each(function(){
        $(this).removeClass('green');
        $(this).show();
      });
      $(org).addClass("green").siblings("li").removeClass("green");
      $(".layer_choose").eq(index).find(".text-right").text($(org).text());
      select_id = $("#layer_list_direction .layer_list li.green").attr("data-id");
      var is_tag = 0;
      for(var i=0;i<$("#layer_list_professional .layer_list_two li").length;i++){
        if($("#layer_list_professional .layer_list_two li").eq(i).attr("data-parentId")!=select_id){
          $("#layer_list_professional .layer_list_two li").eq(i).hide();
        }else{
          is_tag++;
        }
      }
    }
    if($("#layer_list_professional").parent(".layer_choose").css("display")=="none"){
      $("#layer_box").hide();
      $("#doc_professional").parent(".layer_choose").hide();
      $("#doc_diseases").parent(".layer_choose").hide();
    }else{
      if(is_tag!=undefined&&is_tag==0){
        $("#layer_box").hide();
        $("#doc_professional").parent(".layer_choose").hide();
        $("#doc_diseases").parent(".layer_choose").hide();
      }else{
        $("#layer_list_direction").hide();
        $("#layer_list_professional").show();
      }
    }
//            控制ul高度
    var height = 45;
    if($("#layer_div>div").eq(index+1).find(".search_div").length!=0){
      height += 68;
      if($("#layer_div>div").eq(index+1).find(".bottom_button").length!=0){
        height += 57;
      }
    }
    $("#layer_div ul").height($("#layer_div").height()-height);
  }else{
    $(org).addClass("green").siblings("li").removeClass("green");
    $(".layer_choose").eq(index).find(".text-right").text($(org).text());
    //$("body").css("overflow","auto");
    $('#layer_box').hide();
  }
}
function layer_list_two_li(){
  //弹框为亚专业
  $("#layer_list_professional .layer_list_two li").click(function(){
    $(this).toggleClass("green");
  })
  //弹框为病种
  $("#layer_list_diseases .layer_list_two li").click(function(){
    $(this).toggleClass("green");
  })
}

//    弹框中按钮
function bottom_button(){
  $(".bottom_button").click(function(){
    var index = $(this).prev(".layer_list_two").data("id");
    var li_text = '';
    for(var i=0;i<$(this).prev(".layer_list_two").find(".green").length;i++){
      li_text += $(this).prev(".layer_list_two").find(".green").eq(i).text()+' ';
    }
    //亚专业
    if($(this).text()=="下一步"){
      if(li_text==''||li_text==null){
        ale("请选择亚专业");
        $("#doc_professional").text("请选择");
        return;
      }else{
        $("#layer_list_diseases .layer_list_two li").each(function(){
          $(this).removeClass('green');
          $(this).show();
        });
//                    得到亚专业选中项id
        professionalId_arr = [];
        for(var j=0;j<$("#layer_list_professional .layer_list_two li.green").length;j++){
          professionalId_arr.push(parseInt($("#layer_list_professional .layer_list_two li.green").eq(j).data("id")));
        }
        if(professionalOld_arr.length!=0){
          if(professionalId_arr.sort().toString()!=professionalOld_arr.sort().toString()){
            var r=confirm("切换亚专业后，病种均需重新选择");
            if (r==true){
              professionalOld_arr = professionalId_arr;
              $("#layer_list_diseases .layer_list_two li").each(function(){
                $(this).show();
              });
            }else{
              return;
            }
          }
        }else{
          professionalOld_arr = professionalId_arr;
        }
        $("#doc_diseases").parent(".layer_choose").show();
        $(".layer_choose").eq(index).find(".text-right").text(li_text);
        var is_tag = 0;
        for(var i=0;i<$("#layer_list_diseases .layer_list_two li").length;i++){
          var diseases_id=parseInt($("#layer_list_diseases .layer_list_two li").eq(i).attr("data-parentid"));
          if($.inArray(diseases_id, professionalId_arr)==-1){
            $("#layer_list_diseases .layer_list_two li").eq(i).hide();
            $("#layer_list_diseases .layer_list_two li").eq(i).removeClass("green");
          }else{
            is_tag++;
          }
        }
        if($("#doc_diseases").parent(".layer_choose").css("display")=="none"){
          $("#layer_box").hide();
          $("#doc_diseases").parent(".layer_choose").hide();
        }else{
          if(is_tag!=undefined&&is_tag==0){
            $("#layer_box").hide();
            $("#doc_diseases").parent(".layer_choose").hide();
          }else{
            $("#layer_list_professional").hide();
            $("#layer_list_diseases").show();
          }
        }
      }
    }else{
      if(li_text==''||li_text==null){
        ale("请选择病种");
        $("#doc_diseases").text("请选择");
        return;
      }else{
        $("#layer_list_diseases").hide();
        $(".layer_choose").eq(index).find(".text-right").text(li_text);
        //$("body").css("overflow","auto");
        $('#layer_box').hide();
      }
    }
    var height = 45;
    if($("#layer_div>div").eq(index).find(".search_div").length!=0){
      height += 68;
      if($("#layer_div>div").eq(index).find(".bottom_button").length!=0){
        height += 57;
      }
    }
    $("#layer_div ul").height($("#layer_div").height()-height);
  })
}

//弹框内搜索
function search_box(){
  $(".search_div>div.flex_cont>span").click(function(){
    $(this).parents(".search_div").parent("div").find("li").each(function(){
      $(this).show();
    })
    var searchName = $(this).prev("input").val().trim();
    if (searchName == "") {
      $(this).parents(".search_div").parent("div").find("li").each(function(){
        $(this).show();
      })
    }else {
      $(this).parents(".search_div").parent("div").find("li").each(function () {
        var doc_name = $(this).text();
        if (searchName.indexOf(doc_name) != -1 || doc_name.indexOf(searchName) != -1) {
          $(this).show();
        } else {
          $(this).hide();
        }
      });
    }
  })
}
function layer(){
  $("body").append('<div id="layer"><div id="layer_main"><img src="images/error_404.png"/><p id="layer_p">404...出错啦</p><p><span id="layer_return" onclick="return_before()">返回上一页</span><span id="layer_index" onclick="return_index()">返回首页</span></p></div></div>')
}
