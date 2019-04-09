<!-- 个人中心 -->
<template>
  <div class="bigBox">
    <div class="container">
      <router-link to="/Info" class="m20 bg-ff br12 flex-cfs p30 mb30">
        <img :src="head_img" class="br12" style="width:1.4rem;" alt>
        <span class="ml20">{{nickName}}</span>
      </router-link>
      <router-link to="/Wallet" class="m20 p30 bg-ff br12 flex-csb">
        <ul class="flex-center">
          <img src="../assets/img/icon1.png" style="width:.36rem;" alt>
          <span class="ml20">钱包</span>
        </ul>
        <img src="../assets/img/arrow_icon.png" class="arrow_icon" alt>
      </router-link>
      <router-link to="/AmOrder" class="m20 p30 bg-ff br12 flex-csb">
        <ul class="flex-center">
          <img src="../assets/img/icon2.png" style="width:.36rem;" alt>
          <span class="ml20">按摩订单</span>
        </ul>
        <img src="../assets/img/arrow_icon.png" class="arrow_icon" alt>
      </router-link>
      <router-link to="shopOrder" class="m20 p30 bg-ff br12 flex-csb">
        <ul class="flex-center">
          <img src="../assets/img/icon3.png" style="width:.36rem;" alt>
          <span class="ml20">商城订单</span>
        </ul>
        <img src="../assets/img/arrow_icon.png" class="arrow_icon" alt>
      </router-link>
      <router-link to="/Address" class="m20 p30 bg-ff br12 flex-csb">
        <ul class="flex-center">
          <img src="../assets/img/icon4.png" style="width:.36rem;" alt>
          <span class="ml20">地址管理</span>
        </ul>
        <img src="../assets/img/arrow_icon.png" class="arrow_icon" alt>
      </router-link>
      <div class="m20 p30 bg-ff br12 flex-csb">
        <ul class="flex-center">
          <img src="../assets/img/icon4.png" style="width:.36rem;" alt>
          <span class="ml20">客服电话</span>
        </ul>
        <a :href="'tel:'+phone">{{phone}}</a>
      </div>
      <!-- <router-link to="/Invoice" class="m20 p30 bg-ff br12 flex-csb">
        <ul class="flex-center">
          <img src="../assets/img/ic_fapiao.png" style="width:.36rem;" alt="">
          <span class="ml20">发票管理</span>
        </ul>
        <img src="../assets/img/arrow_icon.png" class="arrow_icon" alt="">
      </router-link>-->
    </div>
    <footerView></footerView>
  </div>
</template>

<script>
import footerView from "../components/Footer";
export default {
  data() {
    return {
      nickName: "",
      phone: "",
      head_img: ""
    };
  },

  components: {
    footerView
  },
  // computed: {},

  created() {
    let that = this;
    that.init();
    that.getPhone();
  },
  methods: {
    init() {
      let that = this;
      that.Http.post("Wxsite/User/api", {
        api_name: "user_info"
      }).then(res => {
        console.log(res.data.data);
        if (res.data.code == 1) {
          that.head_img = res.data.data.head_img;
          that.nickName = res.data.data.nickname;
        } else {
          that.$vux.toast.text(res.data.msg, "center");
        }
      });
    },
    getPhone() {
      let that = this;
      that.Http.post("Wxsite/User/api", {
        api_name: "getPhone"
      }).then(res => {
        console.log(res.data.data);
        if (res.data.code == 1) {
          that.phone = res.data.data.phone;
        } else {
          that.vux.toast.text(res.data.msg, "center");
        }
      });
    }
  }
};
</script>

<style scoped>
</style>
