/**
 * Created by yangbo on 2017/3/3.
 */

$(function () {
    //tab-切换
    $(".tab_menu").click(function () {
        var value = $(this).parent().attr("data-type");
        var type = $(this).attr("data-type");

        doctor_circle_myCircle.tabMenu(value, type);
    });

});

var doctor_circle_myCircle = function () {
    var int_value = "";

    return {
        tabMenu : function (value, type) {
            if(value != type)
            {
                doctor_circle_myCircle.hideMenu();
                doctor_circle_myCircle.showMenu(type);
            }
        },
        showMenu : function (type) {
            int_value = parseInt(type);

            //三角
            $(".tab_logo_box").css('marginLeft', (int_value == "0" ? "0" : "50%")).animateCss((int_value == "0" ? "slideInRight" : "slideInLeft"));
            //tab模块
            $(".content_list_box").eq(int_value).removeClass("hidden").animateCss((int_value == "0" ? "fadeInRight" : "fadeInLeft"));
            //logo
            $(".content_logo").removeClass((int_value == "1" ? "hidden" : "")).animateCss("fadeIn");

            $(".content_tab_box").attr("data-type", type);
        },
        hideMenu : function () {
            $(".content_list_box").addClass("hidden");
            $(".content_logo").addClass("hidden");
        }
    }
}();