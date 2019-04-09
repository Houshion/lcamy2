<!--商品订单 -->
<template>
  <div class="bigBox" v-if="isData">
    <div class="bg-ff m20 br12 menu flex-csa">
      <span
        :class="item.state==isChose?'active p20':'p20'"
        v-for="(item,index) in menu"
        :key="index"
        @click="menuChange(item,index)"
      >{{item.title}}</span>
    </div>
    <div class="container" v-if="isData">
      <div v-if="shopData.length>0">
        <div
          class="bg-ff m20 p20 br12"
          v-for="(item,index) in shopData"
          @click="detail(item)"
          :key="index"
        >
          <li class="flex-csb bb-e5 pb20">
            <span class="c9">{{item.ctime}}</span>
            <span class="c9 c-diy" v-if="isChose!=4">{{item.status_}}</span>
            <span class="c9 c-diy" v-else>{{item.refundState==1?'退款中':item.refundState==2?'退款成功':'退款拒绝'}}</span>
          </li>
          <div class="bb-e5 ptb20 flex-csb" v-for="(i,index2) in item.goods_data" :key="index2">
            <ul class="flex-cfs">
              <img class="b-e5" :src="i.picture" style="width:1.8rem;" alt>
              <div class="flex-cfs">
                <div class="flex-dcf ml20">
                  <li>{{i.name}}</li>
                  <li class="c9 mt20">{{i.spec_name}}</li>
                </div>
              </div>
            </ul>
            <div class="flex-dce">
              <li>￥{{i.price| toFixed(2)}}</li>
              <li class="c9 mt40">x{{i.num}}</li>
            </div>
          </div>
          <div class="flex-cfe ptb20">
            共{{item.goods_num}}件商品
            <span class="ml40">合计：￥{{item.pay_price}}</span>
          </div>
          <div class="flex-cfe bt-e5 ptb20" v-if="item.status==0">
            <span class="c_circle flex-center b-e5">取消订单</span>
            <span class="c_circle flex-center bg-diy cf ml20">立即付款</span>
          </div>
          <div class="flex-cfe ptb20 bt-e5" v-else-if="item.status==2">
            <span class="c_circle flex-center b-e5">申请售后</span>
            <span class="c_circle flex-center bg-diy cf ml20">确认收货</span>
          </div>
          <div class="flex-cfe ptb20 bt-e5" v-else>
            <span class="c_circle flex-center b-e5">申请售后</span>
          </div>
        </div>
      </div>
      <div v-else>
        <noData></noData>
      </div>
    </div>
  </div>
</template>

<script>
import noData from "../components/noData";
import MeScroll from "mescroll.js";
import "mescroll.js/mescroll.min.css";
export default {
  data() {
    return {
      isChose: 0,
      isData: 0,
      menu: [
        {
          state: 0,
          title: "全部"
        },
        {
          state: 99,
          title: "待付款"
        },
        {
          state: 2,
          title: "待确认"
        },
        {
          state: 3,
          title: "已完成"
        },
        {
          state: 4,
          title: "退款/售后"
        }
      ],
      shopData: []
    };
  },
  components: {
    noData
  },
  created() {
    let that = this;
    that.$vux.loading.show();
    window.setTimeout(function () {
      that.getOrderList();
    }, 800);
  },
  methods: {
    getOrderList: function (status) {
      let that = this;
      that.Http.post("Wxsite/Mall/api", {
        //获取订单列表
        api_name: "get_order_list",
        status: status
      }).then(res => {
        console.log(res.data.data);
        if (res.data.code == 1) {
          that.$vux.loading.hide();
          that.isData = 1;
          that.shopData = res.data.data;
        } else {
          that.$vux.toast.text(res.data.msg, "center");
        }
      });
    },
    detail: function (item) {
      this.$router.push({
        path: "/shopOrderDetail",
        query: {
          id: item.id,
          status: item.status
        }
      });
    },
    menuChange: function (item, index) {
      let that = this;
      that.isChose = item.state;
      if (item.state == 4) {//售后列表
        this.Http.post('Wxsite/Mall/api', {
          api_name: 'list_after_sale'
        }).then(res => {
          console.log(JSON.stringify(res.data.data));
          if (res.data.code == 1) {
            that.shopData = res.data.data;
            that.shopData.forEach((item, index) => {
              let goods_data = [], obj = {}
              item.refundState=item.status
              console.log(item.snaphot)
              obj.picture = item.snaphot.photo;
              obj.name = item.snaphot.goods_name;
              obj.price = item.amount;
              obj.num = item.snaphot.goods_num;
              obj.spec_name = "";
              goods_data.push(obj)
              item.goods_data = goods_data
              item.goods_num = item.snaphot.goods_num
              item.pay_price = item.amount
              item.status = 4
            })
            console.log(that.shopData)
            // that.$set(that.shopData,index,item)
          } else {
            this.toast(res.data.msg)
          }
        });
      } else {
        that.getOrderList(item.state);
      }
    }
  }
};
</script>

<style scoped>
.menu .active {
  border-bottom: 2px solid #f49b1b;
}

.c_circle {
  width: 1.58rem;
  height: 0.6rem;
  border-radius: 50px;
}
</style>
