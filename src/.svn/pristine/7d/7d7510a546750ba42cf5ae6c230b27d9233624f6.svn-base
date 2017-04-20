/**
 * Created by Administrator on 2017/3/6.
 */

$(function () {

    //配置swiper
    var swiper = new Swiper('#loop_img', {
        pagination: '#loop_img_pagin',
        slidesPerView: 1,
        paginationClickable: true,
        spaceBetween: 0,
        loop : true,
        speed : 500,
        autoplay : 3000,
        autoplayDisableOnInteraction : false
    });

    //菜单浮动
    $(".menu_list_box").stick_in_parent({
        offset_top : 45
    });

    //菜单点击
    $(".menu_item").click(function () {
        var _this = $(this);

        if(!_this.hasClass("menu_item_active")) {
            communion_circle.setMenu(_this);
        }
    });
});

var communion_circle = function () {
    return {
        setMenu : function (obj) {
            $(".menu_item").removeClass("menu_item_active");
            obj.addClass("menu_item_active");
        }
    }
}();