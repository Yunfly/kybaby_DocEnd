/**
 * Created by Yunfly on 2017/3/6.
 */
$(function(){
    register.validate();
});
var register = function(){
    return {
        validate:function() {
            $("#form_register").validate({
                rules:{
                    regist_phone:{
                        required:true,
                        isPhone:true,
                    },
                    regist_password:{
                        required:true,
                        minlength:6,
                        maxlength:16
                    },
                    regist_rpassword:{
                        required:true,
                        minlength:6,
                        maxlength:16,
                        equalTo: "#regist_password"
                    },
                    yaoqing_code:{
                        isPhone:true
                    },
                    read_xx:{
                        required:true,
                    }
                },
                onkeyup:false,
                focusCleanup:true,
                success:"valid",
                submitHandler:function(form){
                    if($("#read_xx").is(":checked")){
                        form.submit();
                    } else{
                        ale('请确认阅读我们的协议')
                    }

                }
            });
            $("#regist_phone").keyup(function(){
                if($(this).valid()) {
                    $("#get_code").removeAttr("disabled")
                } else {
                    $("#get_code").prop("disabled",true)
                }
            })
            $("#get_code").click(function(){

            })
        }
    }
}();
