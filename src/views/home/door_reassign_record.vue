<template>
  <div>
    <div id="header" class="doctor_header">
      <div class="header_Left" v-on:click="return_before()"><p></p></div>
      <div class="header_center">改派记录</div>
      <div class="header_right"></div>
    </div>
    <div id="container">
      <ul id="reassign_record">
        <li v-for="(item,index) in orders" v-on:click="show(index)">
          <p>{{item.orderInfo.product.name}}</p>
          <div class="flex_cont record_info">
            <p class="flex_item paragraph">{{item.applicationTime}}</p>
            <p class="paragraph">订单号：{{item.orderInfo.orderNum}}</p>
          </div>
        </li>
      </ul>
    </div>
    <div id="full_layer_box" v-show="tag">
      <header class="flex_cont" id="layer_head">
        <div id="head_left" class="head_div" v-on:click="returnBtn()"></div>
        <div class="flex_item" id="head_center">申请进度</div>
        <div class="head_div"></div>
      </header>
      <div id="full_layer_div" v-show="flag">
        <ul class="progress_list" v-if="selected.status=='已申请'">
          <li class="progress_item">
            <span class="progress_dotted"></span>
            <p class="progress_name">等待审核</p>
          </li>
          <li class="progress_item">
            <span class="progress_tick"></span>
            <p class="progress_time">{{selected.applicationTime}}</p>
            <p class="progress_name">已提交申请</p>
          </li>
        </ul>
        <ul class="progress_list" v-else>
          <li class="progress_item">
            <span class="progress_tick"></span>
            <p class="progress_time">{{selected.changeOperateTime}}</p>
            <p class="progress_name">{{selected.status}}</p>
          </li>
          <li class="progress_item">
            <span class="progress_tick"></span>
            <p class="progress_time">{{selected.applicationTime}}</p>
            <p class="progress_name">已提交申请</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import $j from 'jquery';
  export default{
    data(){
      return{
        orders:'',
        tag:false,
        selected:'',
        id:'',
        flag:false
      }
    },
    mounted:function(){
      var that = this;
      that.id = this.$route.query.id;
      var id=that.id;
      this.$ajax.post(urlWay.orderHost + 'orderChangeRecord.action?whoLoginFlag=doctor',
        'action=getOrderChangeRecordByDoctorId')
        .then(function(result){
          that.orders = result.data.orderChangeRecordList;
          if(id!=null){//详情
            that.tag = true;
            that.flag = true;
            for(var i=0;i<that.orders.length;i++){
              if(that.orders[i].orderInfo.id==id){
                that.selected = that.orders[i];
              }
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    methods: {
      show:function(index){
        this.tag = true;
        this.selected = this.orders[index];
        this.flag = true;
      },
      returnBtn:function(){
        if(this.id!=null){
          this.return_before();
        }else{
          this.tag = false;
        }
      }
    }
  }
</script>
<style scoped>
  #container {
    margin: 45px 0 50px 0;
  }
  #reassign_record>li {
    margin-bottom: 8px;
    background: #fff;
    padding: 15px 20px;
  }
  .record_info {
    margin-top: 8px;
  }
  #full_layer_box{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    /*display: none;*/
    background: #f8f8f8;
  }
  .head_div{
    width: 50px;
    height: 45px;
  }
  #head_left{
    background: url(../../public/img/back.png) no-repeat left 18px center;
    background-size: 15px;
  }
  #layer_head{
    height: 45px;
    background: -webkit-linear-gradient(left top, #04ddcb, #23c9e7);
    color: #fff;
  }
  #head_center{
    line-height: 45px;
    text-align: center;
    font-size: 18px;
  }
  .progress_time{
    color: #858585;
    font-size: 12px;
  }
  .progress_item{
    padding-top: 26px;
    border-left: 1px dotted #898989;
    padding-left: 18px;
    line-height: 20px;
    position: relative;
    margin-top: 1px;
  }
  .progress_list>.progress_item:first-child:before{
    content: '';
    position: absolute;
    width: 2px;
    height: 35px;
    left: -1px;
    top: 0px;
    background: #f4f4f4;
  }
  .progress_list>.progress_item:last-child:after{
    content: '';
    position: absolute;
    width: 2px;
    height: 35px;
    left: -1px;
    bottom: 0px;
    background: #f4f4f4;
  }
  .progress_list{
    margin: 0 24px;
  }
  .progress_dotted{
    position: absolute;
    display: inline-block;
    width: 7px;
    height: 6px;
    background: url(../../public/img/home/todoIcon3.png)no-repeat center;
    background-size: 6px;
    top: 32px;
    left: -4px;
  }
  .progress_tick{
    position: absolute;
    top: 29px;
    left: -7px;
    display: inline-block;
    width: 14px;
    height: 14px;
    background: url('../../public/img/door/sever_now.png')no-repeat center;
    background-size: 14px;
    z-index: 1;
  }
</style>
