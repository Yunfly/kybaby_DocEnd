<template>
  <div>
    <div id="header" class="doctor_header">
      <div class="header_Left" v-on:click="return_before()"><p></p></div>
      <div class="header_center font18">添加快捷回复</div>
    </div>
    <div id="container_full">
      <div id="promptDiv" class="text-center font12">
        点击内容即可编辑、删除等操作
      </div>

      <div class="promptItem bgfff">
        <ol class="font10 text">
          <li class="flex_cont text_indent" v-bind:class="{gray_line : index != 0}" v-for="(item, index) in message" v-on:click="listShow(index)">
            <p class="flex_item item_box" v-html="item.fastContent">{{item.fastContent}}</p>
            <p class="edit_btn item_btn" v-show="list_show == index" v-on:click.stop="doThis()" v-on:click="openLayer(item.id, item.fastContent, '1')">编辑</p>
            <p class="delete_btn item_btn" v-show="list_show == index" v-on:click.stop="doThis()" v-on:click="deleteReply(item.id)">删除</p>
          </li>
        </ol>
      </div>

    </div>
    <div id="quick_btn">
      <div>
        <button type="submit" class="btn btn_block font16" v-on:click="openLayer('', '', '1')">添加快捷回复</button>
      </div>
    </div>
    <!--layer-->
    <div class="layer_box" id="layer_box">
      <div class="layer_bg_box" id="layer_bg_box" v-on:click="closeLayer()"></div>
      <div class="layer_container_box bgf8" v-bind:class="[{layer_add : layer_type == 1},{layer_delete : layer_type == 2}]">
        <div v-if="layer_type == 1">
          <div class="layer_box_layout layer_box_logo">
            <p class="add_logo"></p>
          </div>
          <div class="flex_cont layer_cont_msg">
            <textarea class="flex_item font12 text layer_cont_box" id="layer_reply" v-model="layer_reply" type="text" placeholder="请输入您快捷回复的内容……" maxlength="120"></textarea>
          </div>
        </div>
        <div v-if="layer_type == 2">
          <div class="layer_box_layout layer_box_logo">
            <p class="delete_logo"></p>
          </div>
          <div class="layer_box_layout flex_cont layer_cont_box layer_cont_msg">
            <p class="flex_item font12 text content_center">确认是否删除该分组</p>
          </div>
        </div>
        <div class="layer_btn_box flex_cont font12">
          <p class="flex_item layer_btn layer_btn_no content_center" id="layer_btn_no" v-on:click="closeLayer()">取消</p>
          <p class="flex_item layer_btn layer_btn_yes content_center" id="layer_btn_yes" v-on:click="layer_type == 1 ? submitReply() : deleteFc()">确定</p>
        </div>
        <div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import $ from 'jquery'
  import ale from '../../ale'

  export default{
    data(){
        return{
          message:"",
          list_show : -1,
          list_id : '',
          layer_reply : '',
          layer_type : '0'
        }
    },
    mounted:function(){
      this.getList();
    },
    methods:{
      getList : function () {
        var that = this;

        this.$ajax.post(host + 'consultManage.action','action=getConsultFastReplayList')
          .then(function(result){
            that.message = result.data.consultFastReplayList;
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      listShow : function (index) {
        this.list_show = (this.list_show == index ? -1 : index);
      },
      doThis : function () {

      },
      closeLayer : function () {
        $("#layer_box").fadeOut(300);
        this.list_id = -1;
        this.list_show = -1;
        this.layer_reply = '';
      },
      openLayer : function (id, msg, name) {
        $("#layer_box").fadeIn(300);

        if(name == '1') {
          setTimeout(function () {
            $("#layer_reply").focus();
          }, 300);

          this.layer_reply = msg;
        } else if(name == '2') {

        }

        this.list_id = id;
        this.layer_type = name;
      },
      submitReply : function () {
        var that = this;
        var replys = this.layer_reply;
        var id = this.list_id;

        if(replys || replys != '') {
          this.$ajax.post(host + 'consultManage.action',"action=saveOrUpdateConsultFastReplay&consultFastReplay.id="+ id +"&consultFastReplay.fastContent="+ replys +"&consultFastReplay.isEffect=Y")
            .then(function(result){
              that.closeLayer();
              ale("添加成功");
              that.getList();
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          ale("快捷回复内容不能为空");
        }
      },
      deleteReply : function (id) {
        this.openLayer(id, '', '2');
      },
      deleteFc : function () {
        var that = this;
        var id = this.list_id;

        this.$ajax.post(host + 'consultManage.action',"action=saveOrUpdateConsultFastReplay&consultFastReplay.id="+ id +"&consultFastReplay.isEffect=N")
          .then(function(result){
            that.closeLayer();
            ale("删除成功");
            that.getList();
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  }
</script>

<style scoped>
  .text {
    border: 0px;
  }
  #container_full{
    margin-bottom: 64px;
  }
  .promptItem ol{list-style-type:none;counter-reset:sectioncounter;
    -webkit-user-select:none;
    user-select:none;
    padding:0 18px 0px 18px;}
  .promptItem ol li:before {
    content:counter(sectioncounter) "、";
    counter-increment:sectioncounter;
  }
  .promptItem{
    -webkit-overflow-scrolling: touch;
  }
  .promptItem ol li{
    height: 48px;
    line-height: 48px;
    /*width:100%;*/
  }
  #quick_btn{
    position: fixed;
    bottom:10px;
    width:100%;
    height:44px;
  }
  #quick_btn div{
    width:85%;
    margin:0 auto;
  }
  .gray_line{
    border-top: 1px solid #eeeeee;
  }
  .item_box{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .item_btn{
    margin-left: 20px;
  }
  .edit_btn{
    color: #13b9d7;
  }
  .delete_btn{
    color: #e95c6a;
  }
  .layer_box{
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 9999;
    display: none;
  }
  .layer_bg_box{
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.5);
  }
  .layer_box .layer_container_box{
    position: absolute;
    left: 10%;
    top: 50%;
    width: 80%;
    border-radius: 6px;
  }
  .layer_box_layout{
    height: 38px;
  }
  .layer_box_logo p{
    position: absolute;
    left: 50%;
  }
  .add_logo{
    background: url("../../public/img/contracted_user/add_btn.png") no-repeat center;
    background-size: 50px 50px;
    width: 50px;
    height: 50px;
    margin-left: -25px;
    top: -25px;
  }
  .delete_logo{
    background: url("../../public/img/contracted_user/delete_btn.png") no-repeat center;
    background-size: 50px 50px;
    width: 50px;
    height: 50px;
    margin-left: -25px;
    top: -25px;
  }
  .layer_cont_box{
    padding: 0 10px;
  }
  .layer_cont_box label{
    width: 100%;
    height: 100%;
  }
  .layer_cont_msg{
    padding-bottom: 13px;
  }
  .layer_cont_msg input[type=text]{
    border: none;
    outline: none;
    background: #ffffff;
  }
  .layer_box_layout div{
    height: 100%;
  }
  .layer_btn_box{
    width: 100%;
    height: 28px;
  }
  .layer_btn_yes{
    background: #13b9d7;
    color: #ffffff;
    border-bottom-right-radius: 6px;
  }
  .layer_btn_no{
    background: #ffffff;
    color: #9a9a9a;
    border-bottom-left-radius: 6px;
  }
  .layer_btn{
    height: 100%;
  }
  .layer_box .layer_add{
    height: 199px;
    margin-top: -99.5px;
  }
  .layer_box .layer_delete{
    height: 117px;
    margin-top: -58.5px;
  }
  .content_center{
    display: -webkit-box;
    -webkit-box-align: center;
    -webkit-box-pack: center;
  }
  #layer_reply{
    width: 100%;
    height: 100px;
    resize: none;
    outline: none;
    border: none;
    padding: 10px;
    line-height: 1.5;
  }
</style>
