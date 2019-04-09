<!--详情 -->
<template>
  <div class="bigBox" v-if="isData">
    <div class="container">
      <div v-if="Object.keys(allData).length>0">
        <div v-for="(i,id1) in Array(allData)" :key="id1">
          <div class="m20 p20 bg-ff br12 flex-cfs">
            <img
              :src="state==1?require('../assets/img/ic_daifukuan.png'):state==2?require('../assets/img/ic_daishouhuo.png'):require('../assets/img/ic_yiwancheng.png')"
              style="width:.34rem;"
              alt
            >
            <span
              class="ml20"
            >{{i.status==-8?'已取消':i.status==0?'待付款':i.status==1?'已付款':i.status==2?'待确认':i.status==3?'已完成':'退款/售后'}}</span>
          </div>
          <div class="m20 p20 bg-ff br12 flex-dcf">
            <li>
              收货人：{{address.name}}
              <span class="ml20">{{address.mobile}}</span>
            </li>
            <li class="c9 mt20">
              <img class="mr20" src="../assets/img/icon7.png" style="width:.22rem" alt>
              {{address.address}}
            </li>
          </div>
          <div class="m20 bg-ff br12" v-if="Array(list).length>0">
            <ul class="flex-fsfs bb-e5 p20" v-for="(i2,index) in list" :key="index">
              <img class="b-e5" :src="i2.picture" style="width:1.8rem" alt>
              <li class="ml20 flex-fssb flex1">
                <span>{{i2.name}}</span>
                <div class="flex-dce">
                  <span>￥{{i2.price|toFixed(2)}}</span>
                  <span class="c9 mt50">x{{i2.num}}</span>
                  <span
                    class="c-diy mt50"
                    v-show="state==4"
                  >{{i.statuss==1?'退款中':i.statuss==2?'退款成功':'退款拒绝'}}</span>
                  <div
                    class="c9 mt50 c-diy flex-cfe"
                    v-show="i.status==2||i.status==3"
                    style="width:1.4rem"
                    @click="applyRefund(i2)"
                  >
                    {{i2.statuss==1?'退款中':i2.statuss==2?'退款成功':i2.statuss==3?'退款拒绝':'退款/售后'}}
                    <!-- <div
                      v-show="refund.length==0"
                      class="flex1 flex-cfe"
                      style="width:1.4rem;"
                      @click="applyRefund(i2.spec_id)"
                    >退款/售后</div>
                    <div v-for="i3 in refund" :key="i3.id">
                      <div
                        v-if="i3.goods_spec_id==i2.spec_id"
                        @click="applyDetail(i3.id)"
                      >{{i3.status==1?'退款中':i3.status==2?'退款成功':'退款拒绝'}}</div>
                    </div>-->
                  </div>
                </div>
              </li>
            </ul>
            <div class="flex-csb p20 bb-e5">
              <span>小计</span>
              <span>小计￥{{i.pay_price|toFixed(2)}}</span>
            </div>
            <div class="flex-csb p20">
              <span>实付款</span>
              <span class="fw-bold f32">￥{{i.pay_price|toFixed(2)}}</span>
            </div>
          </div>
          <div v-else>
            <noData></noData>
          </div>
          <div class="m20 bg-ff br12 p20">
            <div v-if="state!=4">
              <li class="flex-cfs c9 mt20" v-if="i.order_no">
                订单编号：
                <span class="c3">{{i.order_no}}</span>
              </li>
              <li class="flex-cfs c9 mt20" v-if="i.transaction_id">
                交易编号：
                <span class="c3">{{i.transaction_id}}</span>
              </li>
              <li class="flex-cfs c9 mt20" v-if="i.ctime">
                下单时间：
                <span class="c3">{{i.ctime}}</span>
              </li>
              <li class="flex-cfs c9 mt20" v-if="i.ptime">
                付款时间：
                <span class="c3">{{i.ptime}}</span>
              </li>
              <li class="flex-cfs c9 mt20" v-if="i.status!=0">
                付款方式：
                <span class="c3">{{i.pay_type==1?'余额':'微信'}}</span>
              </li>
              <li class="flex-cfs c9 mt20" v-if="i.ftime">
                发货时间：
                <span class="c3">{{i.ftime}}</span>
              </li>
              <li class="flex-cfs c9 mt20" v-if="i.wl_company">
                物流公司：
                <span class="c3">{{i.wl_company}}</span>
              </li>
              <li class="flex-cfs c9 mt20" v-if="i.wl_number">
                物流编号：
                <span class="c3">{{i.wl_number}}</span>
              </li>
              <li class="flex-cfs c9 mt20" v-if="i.stime">
                成交时间：
                <span class="c3">{{i.stime}}</span>
              </li>
            </div>
            <div v-else>
              <li class="flex-cfs c9 mt20" v-if="reData.refund_reason">
                退款原因：
                <span class="c3">{{reData.refund_reason}}</span>
              </li>
              <li class="flex-cfs c9 mt20" v-if="reData.amount">
                退款金额：
                <span class="c3">{{reData.amount}}</span>
              </li>
              <li class="flex-cfs c9 mt20" v-if="reData.goods_num">
                申请件数：
                <span class="c3">{{reData.goods_num}}</span>
              </li>
              <li class="flex-cfs c9 mt20" v-if="reData.ctime">
                申请时间：
                <span class="c3">{{reData.ctime|format('Y-m-d')}}</span>
              </li>
              <li class="flex-cfs c9 mt20" v-if="reData.refundno">
                退款编号：
                <span class="c3">{{reData.refundno}}</span>
              </li>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <noData></noData>
      </div>
    </div>
    <div class="flex-csb" v-if="state==0">
      <span class="bg-ff w50 flex-center p20 c9" @click="del()">取消订单</span>
      <span class="bg-diy cf w50 flex-center p20" @click="isPay=1">立即付款</span>
    </div>
    <div
      class="flex-center bg-diy flex-center cf p20"
      v-else-if="state==2"
      @click="confirmOrder"
    >确认收货</div>
    <div v-else></div>
    <!-- 支付选择 -->
    <div class="mask flex-dcc jc-center" v-if="isPay">
      <div class="bg-ff confirmPay br12 flex-dcc of-hidden p-r" style="width:6.2rem;">
        <img
          class="p-a"
          src="../assets/img/ic_quxiao.png"
          style="width:.4rem;right:0.2rem;top:.2rem;"
          alt
          @click="isPay=0"
        >
        <li class="mt20 f32">确认付款</li>
        <div class="mt50 c9">请选择支付方式</div>
        <div class="mt20">
          需支付￥
          <span class="f50">{{payMoney}}</span>
        </div>
        <div class="choseBox w100">
          <li class="flex-csb p20 bb-e5" @click="pay_type=2">
            <ul class="flex-center">
              <img src="../assets/img/icon_weixinzhifu.png" style="width:.42rem;" alt>
              <li class="ml20">微信支付</li>
            </ul>
            <label>
              <input type="radio" class="checkInput" name="pay" id hidden checked>
              <span class="circle flex-center"></span>
            </label>
          </li>
          <li class="flex-csb p20" @click="pay_type=1">
            <ul class="flex-center">
              <img src="../assets/img/ic_yue.png" style="width:.38rem;" alt>
              <li class="ml20">余额支付</li>
            </ul>
            <label>
              <input type="radio" class="checkInput" name="pay" id hidden>
              <span class="circle flex-center"></span>
            </label>
          </li>
        </div>
        <div class="bg-diy cf w100 flex-center p20 mt20" @click="confirmPay">支付</div>
      </div>
    </div>
  </div>
</template>

<script>
import noData from "../components/noData";
export default {
  data() {
    return {
      state: "",
      isData: 0,
      payMoney: 0,
      isPay: 0,
      pay_type: 2,
      address: {
        // name: "小云",
        // phone: "15816834441",
        // addr: "广东东莞市南城区高盛科技园101"
      },
      off: 0,
      allData: [],
      refund: [],
      reData: {},
      list: []
    };
  },
  components: {
    noData
  },
  computed: {},
  created() {
    let that = this;
    that.$vux.loading.show();
    window.setTimeout(function () {
      that.init();
    }, 800);
  },
  methods: {
    init: function () {
      this.state = this.$route.query.status;
      let that = this;
      if (that.$route.query.status == 4) {
        that.Http.post("Wxsite/Mall/api", {
          api_name: "get_after_sale",
          refund_id: this.$route.query.id
        }).then(res => {
          console.log(res.data.data);
          if (res.data.code == 1) {
            var obj = {}, goods_data = []
            that.$vux.loading.hide();
            that.isData = 1;
            that.allData = res.data.data;
            that.address = res.data.data.addr_data;
            that.payMoney = res.data.data.amount;
            that.list = res.data.data.snaphot;
            that.list.price = res.data.data.amount
            that.list.name = res.data.data.snaphot.goods_name
            that.list.num = res.data.data.snaphot.goods_num
            that.list.picture = res.data.data.snaphot.photo
            that.list.spec_name = ""
            that.list = Array(that.list)
            that.reData.refund_reason = res.data.data.snaphot.refund_reason;
            that.reData.amount = res.data.data.amount;
            that.allData.pay_price = res.data.data.amount;
            that.reData.goods_num = res.data.data.snaphot.goods_num;
            that.allData.goods_num = res.data.data.snaphot.goods_num;
            that.reData.ctime = that.$base.format(res.data.data.ctime, 'Y-m-d H:i:s');
            that.reData.refundno = res.data.data.refundno;
            that.allData.reData = that.reData
            console.log(that.list)
          } else {
            that.$vux.toast.text(res.data.msg, "center");
          }
        });
      } else {
        that.Http.post("Wxsite/Mall/api", {
          api_name: "order_detail",
          order_id: this.$route.query.id
        }).then(res => {
          console.log(res.data.data);
          if (res.data.code == 1) {
            that.$vux.loading.hide();
            that.allData = res.data.data;
            that.payMoney = res.data.data.pay_price;
            that.address = res.data.data.addr_data;
            that.list = res.data.data.goods_data;
            that.state = res.data.data.status;
            that.isData = 1;
            that.refund = res.data.data.refund;
            that.list.forEach((item, index) => {
              item.statuss = -1
            })
            for (var i = 0; i < that.refund.length; i++) {
              // console.log(that.refund[i].goods_spec_id)
              for (var j = 0; j < that.list.length; j++) {
                // console.log(that.list[j].spec_id)
                if (that.refund[i].goods_spec_id == that.list[j].spec_id) {
                  console.log(that.refund[i].goods_spec_id)
                  that.list[j].statuss = that.refund[i].status
                }
              }
            }
            console.log(that.list)
            that.allData.reData = that.reData
          } else {
            that.$vux.toast.text(res.data.msg, "center");
          }
        });
      }
    },
    toRefund(e, item) {
      if (e == -1) {
        console.log(item)
        // this.$router.push({
        //   path: '/refund',
        //   query: {
        //     id: this.$route.query.id,
        //     spec_id: item
        //   }
        // })
      }
    },
    applyDetail: function (item) {//申请售后
      location.reload()
      this.$router.push({
        path: '/shopOrderDetail',
        query: {
          id: item,
          status: 4
        }
      })
    },
    applyRefund: function (item) {//申请售后
      console.log(item)
      if (item.statuss == -1) {
        this.$router.push({
          path: '/refund',
          query: {
            id: this.$route.query.id,
            spec_id: item.spec_id
          }
        })
      }
    },
    confirmOrder: function () {
      let that = this;
      that.Http.post("Wxsite/Mall/api", {
        api_name: "confirm_collect_goods",
        pay_type: that.pay_type,
        order_id: that.$route.query.id
      }).then(res => {
        console.log(res.data.data);
        if (res.data.code == 1) {
          that.$vux.toast.text(res.data.msg, "center");
          window.setTimeout(function () {
            history.go(-1);
          }, 800);
        } else {
          that.$vux.toast.text(res.data.msg, "center");
        }
      });
    },
    del: function (item) {
      let that = this;
      that.$vux.confirm.show({
        title: "确认取消订单吗？",
        onConfirm() {
          that.Http.post("Wxsite/Mall/api", {
            api_name: "cancel_order",
            order_id: that.$route.query.id
          }).then(res => {
            console.log(res.data.data);
            if (res.data.code == 1) {
              that.$vux.toast.text(res.data.msg, "center");
              window.setTimeout(function () {
                history.go(-1);
              }, 800);
            } else {
              that.$vux.toast.text(res.data.msg, "center");
            }
          });
        }
      });
    },
    confirmPay: function () {
      let that = this;
      if (that.off) return false;
      that.off = 1;
      that.$vux.loading.show();
      that.Http.post("Wxsite/Mall/api", {
        api_name: "go_pay",
        pay_type: that.pay_type,
        order_id: this.$route.query.id
      }).then(res => {
        console.log(res.data.data);
        that.$vux.loading.hide();
        that.off = 0;
        if (res.data.code == 1) {
          if (that.pay_type == 2) {
            //微信支付
            var jsApiParameters = res.data.data.wx_data;
            that.$base.callpay(jsApiParameters, res => {
              // alert(JSON.stringify(jsApiParameters));
              if (res == "get_brand_wcpay_request:ok") {
                that.$vux.toast.text("支付成功", "center");
              } else {
                that.$vux.toast.text("支付失败", "center");
              }
            });
          } else {
            console.log(res.data.msg);
            that.$vux.toast.text(res.data.msg, "center");
          }
        } else {
          that.$vux.toast.text(res.data.msg, "center");
        }
      });
    }
  }
};
</script>

<style scoped>
</style>
