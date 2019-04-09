<!--加入购物车 -->
import { setTimeout } from 'timers';
import { throws } from 'assert';
<template>
  <div class="bigBox" v-show="isData">
    <div class="container bg-ff m20 br12">
      <div v-if="shopData.length>0">
        <div class="p20 bb-e5 list" v-for="(item,index) in shopData" :key="index">
          <div class="flex-csb">
            <div class="flex-cfs flex1" @click="checkToggle(item,index)">
              <!-- <input type="checkbox" class="choseBox" name="cart" hidden value="item.id" v-model="choseArr"> -->
              <li class="circle">
                <img v-if="item.isChecked" src="../assets/img/checked.png" alt>
              </li>
              <img class="ml20" :src="item.picture" style="width:2rem" alt>
              <div class="flex-dcf ml20">
                <li class="f32" @click="detail(item)">{{item.name}}</li>
                <li class="c9 mt20">{{item.spec_name}}</li>
                <li class="c9 mt20 c-diy">￥{{item.price}}</li>
              </div>
            </div>
            <div class="rightBox flex-center">
              <span class="flex-center minus b-e5" @click="minus(item,index)">&#45;</span>
              <span class="flex-center num mlr10">{{item.num}}</span>
              <span class="flex-center add b-e5" @click="add(item,index)">&#43;</span>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <noData></noData>
      </div>
    </div>
    <div class="flex-center">
      <img class="mb20" src="../assets/img/im_logo.png" style="width:5.19rem;" alt>
    </div>
    <div class="flex-csb bg-ff">
      <label class="flex-cfs" @click="selectAll">
        <input class="allChose" type="checkbox" name="allChose" id hidden v-model="isChose">
        <li class="circle ml20"></li>
        <li class="ml20">
          已选
          <span class="c9">（{{countNum}}）</span>
        </li>
        <span class="ml20 c-diy f32">￥{{total}}</span>
      </label>
      <div class="flex-cfe">
        <span class="c9 mr50" @click="del">删除</span>
        <span class="bg-diy cf p20 flex-center" style="width:1.6rem" @click="pay">结算</span>
      </div>
    </div>
  </div>
</template>
<script>
import noData from "../components/noData";
export default {
  data() {
    return {
      choseArr: [],
      isChose: 0,
      isData: 0,
      checkedNames: [],
      shopData: [
        // {
        //   goods_id: "1",
        //   goods_spec_id: "1",
        //   id: "2",
        //   name: "XX按摩椅",
        //   num: "1",
        //   picture:
        //     "http://lcamy2.app.xiaozhuschool.com/Upload/img/2018-10-24/5bd0580c790a3.jpg",
        //   price: "2100.00",
        //   spec_name: "红色"
        // },
        // {
        //   goods_id: "1",
        //   goods_spec_id: "1",
        //   id: "3",
        //   name: "XX按摩椅",
        //   num: "4",
        //   picture:
        //     "http://lcamy2.app.xiaozhuschool.com/Upload/img/2018-10-24/5bd0580c790a3.jpg",
        //   price: "2100.00",
        //   spec_name: "红色"
        // },
        // {
        //   goods_id: "1",
        //   goods_spec_id: "1",
        //   id: "4",
        //   name: "XX按摩椅",
        //   num: "6",
        //   picture:
        //     "http://lcamy2.app.xiaozhuschool.com/Upload/img/2018-10-24/5bd0580c790a3.jpg",
        //   price: "2100.00",
        //   spec_name: "红色"
        // },
        // {
        //   goods_id: "1",
        //   goods_spec_id: "1",
        //   id: "5",
        //   name: "XX按摩椅",
        //   num: "3",
        //   picture:
        //     "http://lcamy2.app.xiaozhuschool.com/Upload/img/2018-10-24/5bd0580c790a3.jpg",
        //   price: "2100.00",
        //   spec_name: "红色"
        // },
        // {
        //   goods_id: "1",
        //   goods_spec_id: "1",
        //   id: "6",
        //   name: "XX按摩椅",
        //   num: "4",
        //   picture:
        //     "http://lcamy2.app.xiaozhuschool.com/Upload/img/2018-10-24/5bd0580c790a3.jpg",
        //   price: "2100.00",
        //   spec_name: "红色"
        // },
        // {
        //   goods_id: "1",
        //   goods_spec_id: "1",
        //   id: "7",
        //   name: "XX按摩椅",
        //   num: "4",
        //   picture:
        //     "http://lcamy2.app.xiaozhuschool.com/Upload/img/2018-10-24/5bd0580c790a3.jpg",
        //   price: "2100.00",
        //   spec_name: "红色"
        // },
        // {
        //   goods_id: "1",
        //   goods_spec_id: "1",
        //   id: "8",
        //   name: "XX按摩椅",
        //   num: "4",
        //   picture:
        //     "http://lcamy2.app.xiaozhuschool.com/Upload/img/2018-10-24/5bd0580c790a3.jpg",
        //   price: "2100.00",
        //   spec_name: "红色"
        // }
      ]
    };
  },
  components: {
    noData
  },
  computed: {
    countNum: function() {
      let that = this;
      let sum = 0;
      that.shopData.forEach(item => {
        sum += item.isChecked;
      });
      return sum;
    },
    total: function() {
      let total = 0;
      this.shopData.forEach(item => {
        if (item.isChecked == 1) {
          total += item.price * item.num;
        }
      });
      return total;
    }
  },
  created() {
    let that = this;
    that.$vux.loading.show();
    window.setTimeout(() => {
      that.init();
    }, 800);
  },
  methods: {
    init: function() {
      let that = this;
      that.shopData.forEach(item => {
        item.isChecked = 0;
      });
      // console.log(that.shopData);
      that.Http.post("Wxsite/Mall/api", {
        api_name: "get_cart_goods"
      }).then(res => {
        that.$vux.loading.hide();
        console.log(res.data.data);
        if (res.data.code == 1) {
          that.isData = 1;
          that.shopData = res.data.data.cart;
          that.shopData.forEach(item => {
            item.isChecked = 0;
          });
          that.total = res.data.data.total;
          console.log(that.shopData);
        } else {
          that.vux.toast.text(res.data.msg, "center");
        }
      });
    },
    add: function(item, index) {
      item.num++;
      // console.log(1);
    },
    minus: function(item, index) {
      if (item.num > 0) {
        item.num--;
      }
    },
    countData(item) {
      let that = this;
      that.Http.post("Wxsite/Mall/api", {
        api_name: "",
        goods_spec_id: item.goods_spec_id,
        num: item.num,
        c_id: item.goods_id
      }).then(res => {
        console.log(res.data.data);
        if (res.data.code == 1) {
        } else {
          that.vux.toast.text(res.data.msg, "center");
        }
      });
    },
    detail: function(item) {
      let that = this;
      that.$router.push({
        path: "/shopDetail",
        query: {
          id: item.id
        }
      });
    },
    checkToggle: function(item, index) {
      console.log(index);
      console.log(item);
      item.isChecked = !item.isChecked;
      this.$set(this.shopData, index, item);
    },
    del: function() {
      let that = this;
      let choseArr = [];
      that.shopData.forEach((item, index) => {
        if (item.isChecked == 1) {
          choseArr.push(item.id);
        }
      });
      if (choseArr.length > 0) {
        that.$vux.loading.show();
        that.Http.post("Wxsite/Mall/api", {
          api_name: "del_cart_goods",
          c_id: choseArr.join(",")
        }).then(res => {
          console.log(res.data.data);
          that.$vux.loading.hide();
          if (res.data.code == 1) {
            that.$vux.toast.text(res.data.msg, "center");
            setTimeout(() => {
              location.reload();
            }, 800);
          } else {
            that.$vux.toast.text(res.data.msg, "center");
          }
        });
      } else {
        that.$vux.toast.text("请先选择商品", "center");
      }
    },
    pay: function() {
      let that = this;
      let choseArr = [];
      that.shopData.forEach((item, index) => {
        if (item.isChecked == 1) {
          choseArr.push(item.goods_spec_id + "_" + item.num);
        }
      });
      if (choseArr.length > 0) {
        that.$vux.loading.show();
        that.Http.post("Wxsite/Mall/api", {
          api_name: "balance_cart",
          spec: choseArr.join(",")
        }).then(res => {
          console.log(res.data.data);
          that.$vux.loading.hide();
          if (res.data.code == 1) {
            that.$vux.toast.text(res.data.msg, "center");
            setTimeout(() => {
              that.$router.push({
                path: "/shopConfirm",
                query: {
                  spec: choseArr.join(",")
                }
              });
            }, 800);
          } else {
            that.$vux.toast.text(res.data.msg, "center");
          }
        });
      } else {
        that.$vux.toast.text("请先选择商品", "center");
      }
    },
    selectAll: function(event) {
      var that = this;
      that.isChose = !that.isChose;
      if (!that.isChose) {
        //实现全选
        that.shopData.forEach(function(item, i) {
          item.isChecked = 1;
          that.checkedNames.push(item.name);
          that.$set(that.shopData, i, item);
        });
      } else {
        that.shopData.forEach(function(item, i) {
          item.isChecked = 0;
          that.checkedNames = [];
          that.$set(that.shopData, i, item);
        });
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
  text-align: center;
  border-radius: 0.12rem;
}
.list:last-child {
  border-bottom: none;
}
.allChose:checked + .circle {
  background: url("../assets/img/checked.png") no-repeat;
  background-size: 100% 100%;
  border: 1px solid #fff;
}
.choseBox:checked + .circle {
  background: url("../assets/img/checked.png") no-repeat;
  background-size: 100% 100%;
  border: 1px solid #fff;
}
</style>