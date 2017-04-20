/**
 * Created by Administrator on 2017/3/14.
 */
import $ from 'jquery';
export default function ale(str,font){
  $('body').append('<div id="alert-cover"> <div id="alert-content" style="top: 0"> ' +
    '<div id="alert-line"></div> ' +
    '<div id="alert-text"> ' +
    '<div class="alert-text-show">'+str+'</div> ' +
    '</div> ' +
    '</div> ' +
    '</div>');

  $("#alert-cover").fadeIn(300);

  setTimeout(function () {
    $("#alert-cover").fadeOut(300);

    setTimeout(function () {
      $("#alert-cover").remove();
    }, 300);
  },1500);
}

