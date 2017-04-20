/**
 * Created by windows on 2016/11/30.
 */
$(function () {

});
var doctor_qualification= function () {
        return {
            edit:function(){
                $("#promptDiv").show();
                $(".header_right").find('div').removeClass('edit_logo').addClass("saveBtn").removeAttr("onclick").attr('onclick','doctor_qualification.save()')

            },
            save:function(){
                $("#promptDiv").hide();
                $(".header_right").find('div').removeClass('saveBtn').addClass("edit_logo").removeAttr("onclick").attr('onclick','doctor_qualification.edit()')
            }
        }
}();