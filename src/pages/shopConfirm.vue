<!--确认订单 -->
<template>
  <div class="bigBox" v-if="isData">
    <div class="container" v-for="(i,i2) in Array(allData)" :key="i2">
      <!-- 地址 -->
      <div v-if=" Object.keys(address).length>0" @click="choseAddress">
        <div
          class="m20 bg-ff p20 br12 flex-csb"
          v-for="(item,index) in Array(address)"
          :key="index"
        >
          <ul class="flex-dcf">
            <li>收货人：{{item.name}}</li>
            <li class="mt20">
              <img
                class="mr20"
                src="../assets/img/icon7.png"
                style="width:.22rem;height:.28rem;"
                alt
              >
              {{item.address}}
            </li>
          </ul>
          <img src="../assets/img/arrow_icon.png" class="arrow_icon" alt>
        </div>
      </div>
      <div class="m20 bg-ff p50 br12 flex-center f30" v-else @click="choseAddress">
        <b class="c-diy f30 mr20">&#43;</b> 请添加收货人信息
      </div>
      <!-- 商品 -->
      <div class="m20 bg-ff br12" v-if="goodData.length>0">
        <div v-for="(item,index) in goodData" :key="index">
          <div class="bb-e5 flex-csb p20">
            <div class="leftBox flex-cfs">
              <img :src="item.img" class="b-e5" style="width:2rem;height:1.5rem;" alt>
              <ul class="flex-dcf ml20">
                <span class="f28">{{item.goods_name}}</span>
                <span class="mt20 c9">{{item.spec_name}}</span>
                <span class="br mt20">￥{{item.price|toFixed(2)}}</span>
              </ul>
            </div>
            <div class="rightBox flex-center">
              <span class="flex-center minus b-e5">&#45;</span>
              <span class="flex-center num">{{item.num}}</span>
              <span class="flex-center add b-e5">&#43;</span>
            </div>
          </div>
          <div class="flex-csb p20 bb-e5" v-if="item.man!=0&&item.man<=sum">
            <div class="flex-cfs">
              <span class="c-diy f32">满减</span>
              <span class="c9 ml20">支付立减优惠</span>
            </div>
            <span>满{{item.man}}减{{item.jian}}</span>
          </div>
        </div>
        <div class="flex-cfe p20">
          <li class="c9">共{{goods_num}}件商品</li>
          <li class="ml30">
            小计：
            <span class="br f30">￥{{subtotal}}</span>
          </li>
        </div>
      </div>
      <div class="m20 bg-ff br12 p30 flex-dcc" v-else>
        <img src="../assets/img/noImg.jpg" class="noImg" alt>
        <span class="c9 mt20">暂无数据</span>
      </div>
      <div class="m20 bg-ff br12">
        <!-- <group>
          <popup-picker title="发票" :data="invoiceList" v-model="invoiceVal"></popup-picker>
        </group>-->
        <div @click="toInvoice" class="flex-csb p20 bb-e5">
          <span class="c9">发票</span>
          <img src="../assets/img/icon_right.png" style="width:.12rem;" alt>
        </div>
        <li class="flex-cfs p20 bb-e5">
          <span class="c9">买家留言：</span>
          <input type="text" class="flex1" placeholder="请输入" v-model="content">
        </li>
      </div>
      <div class="m20 bg-ff br12">
        <li class="flex-csb p20 bb-e5">
          <span class="c9">选择支付方式</span>
          <span>需支付{{subtotal}}元</span>
          <!-- <span>需支付{{sum}}元</span> -->
        </li>
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
      <div class="main_btn" @click="pay(i)">支付</div>
    </div>
  </div>
</template>

<script>
import { PopupPicker, Group } from "vux";
export default {
  data() {
    return {
      address: {},
      // {
      //   name: "小云",
      //   addr: "广东省东莞市南城区高盛科技大厦303"
      // }
      pay_type: 2,
      invoiceVal: [],
      off: false,
      content: "",
      isData: 0,
      goods_num: 0,
      subtotal: 0,
      goodData: [],
      invoiceList: [
        ["小米", "iPhone", "华为", "情怀", "三星", "其他", "不告诉你"]
      ],
      allData: []
    };
  },
  components: {
    PopupPicker,
    Group
  },
  computed: {
    sum: function() {
      let that = this;
      let sum = 0;
      that.goodData.forEach(item => {
        sum += item.price * item.num;
      });
      return sum;
    },
    count: function() {
      let that = this;
      let num = 0;
      that.goodData.forEach(item => {
        num += item.num * 1;
      });
      return num;
    }
  },
  created() {
    let that = this;
    that.$vux.loading.show();
    window.setTimeout(function() {
      that.init();
      that.getInvoice();
    }, 800);
  },
  methods: {
    init: function() {
      //数据初始化
      let that = this;
      if (that.$route.query.type == 1) {
      } else {
        var param = {
          api_name: "confirm_order",
          spec: that.$route.query.spec ? that.$route.query.spec : ""
        };
        that.Http.post("Wxsite/Mall/api", param).then(res => {
          console.log(res.data.data);
          if (res.data.code == 1) {
            that.isData = 1;
            that.$vux.loading.hide();
            let obj = res.data.data.goods_list;
            that.address = res.data.data.addr;
            that.goodData = res.data.data.goods_list;
            that.allData = res.data.data;
            that.goods_num = res.data.data.goods_num;
            that.subtotal = res.data.data.subtotal;
            that.man = res.data.data.man;
            that.jian = res.data.data.jian;
            console.log(that.address.length);
          } else {
            that.$vux.toast.text(res.data.msg, "center");
            window.setTimeout(function() {
              that.reload();
              that.$router.push({
                path: "/shop"
              });
            }, 1500);
          }
        });
      }
    },
    toInvoice: function() {
      let that = this;
      that.$router.push({
        path: "/Invoice",
        query: {
          type: 1,
          spec: that.$route.query.spec
        }
      });
    },
    getInvoice: function() {
      let that = this;
      that.Http.post("Wxsite/User/api", {
        api_name: "get_invoice"
      }).then(res => {
        console.log(res.data.data);
        if (res.data.code == 1) {
          that.invoiceList = res.data.data;
          localStorage.setItem("invoice", JSON.stringify(that.invoiceList));
        } else {
          that.$vux.toast.text(res.data.msg, "center");
        }
      });
    },
    choseAddress: function() {
      let that = this;
      that.$router.push({
        path: "/Address",
        query: {
          spec_id: that.$route.query.spec_id,
          num: that.$route.query.num
        }
      });
    },
    pay: function(item) {
      let that = this;
      if (that.off) return false;
      that.off = 1;
      // that.$vux.loading.show();
      console.log(that.pay_type);
      that.Http.post("Wxsite/Mall/api", {
        api_name: "payment_order",
        pay_type: that.pay_type,
        addr_id: item.addr.id,
        beizhu: that.content,
        invoice_id: that.$route.query.invoice_id
          ? that.$route.query.invoice_id
          : "",
        spec: that.$route.query.spec ? that.$route.query.spec : ""
      }).then(res => {
        console.log(res.data.data);
        // that.$vux.loading.hide();
        that.off = 0;
        if (res.data.code == 1) {
          if (that.pay_type == 2) {
            //微信支付
            var jsApiParameters = res.data.data.wx_data;
            that.$base.callpay(jsApiParameters, res => {
              // alert(JSON.stringify(jsApiParameters));
              if (res == "get_brand_wcpay_request:ok") {
                window.setTimeout(function() {
                  that.$router.push({
                    path: "/shopOrder"
                  });
                }, 1500);
              } else {
                that.$vux.toast.text("支付失败", "center");
                window.setTimeout(function() {
                  that.$router.push({
                    path: "/shopOrder"
                  });
                }, 1500);
              }
            });
          } else {
            console.log(res.data.msg);
            that.$vux.toast.text(res.data.msg, "center");
            window.setTimeout(function() {
              that.$router.push({
                path: "/shopOrder"
              });
            }, 1500);
          }
        } else {
          console.log(res.data.msg);
          that.$vux.toast.text(res.data.msg, "center");
        }
      });
    },
    minus: function(index) {
      if (this.goodData[index].num > 1) {
        this.goodData[index].num--;
      }
    }
  }
};
</script>

<style scoped>
.rightBox span {
  width: 0.48rem;
  height: 0.48rem;
  color: #999;
  border-radius: 0.12rem;
}
</style>
