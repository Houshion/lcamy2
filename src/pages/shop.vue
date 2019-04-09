<!--商城 -->
<template>
  <div v-if="isData" class="bigBox">
    <div class="container mescroll" ref="mescroll">
      <!-- banner -->
      <swiper :swiper="bannerlist"></swiper>
      <div class="bg-ff p30 flex-cfs m20 br12">
        <li class="flex-cfs" style="font-size:.12rem;">
          <img src="../assets/img/ic_dui.png" style="width:.32rem;" alt>
          <span class="yellow c-diy2 ml10" style="font-size:.24rem;">正品保证</span>
        </li>
        <li class="flex-cfs ml50">
          <img src="../assets/img/ic_dui.png" style="width:.32rem;" alt>
          <span class="yellow c-diy2 ml10" style="font-size:.24rem;">七天无理由退货</span>
        </li>
        <li class="flex-cfs ml50">
          <img src="../assets/img/ic_dui.png" style="width:.32rem;" alt>
          <span class="yellow c-diy2 ml10" style="font-size:.24rem;">甄选全球好货</span>
        </li>
      </div>
      <!-- 标题 -->
      <div class="menu of-scroll w100 flex-cfs plr20 bg-ff">
        <div class="flex-dcc p20 w25" v-for="item in menu" :key="item.id" @click="changeMenu(item)">
          <img :src="item.icon" style="width:.8rem;height:.8rem;" class="br50" alt>
          <span class="mt20 text-hidden">{{item.name}}</span>
        </div>
      </div>
      <!-- 商品列表 -->
      <div class="shop-container flex-csb r-wrap m20" id="warpId">
        <div
          class="shopBox br12 bg-ff flex-dcf mb20"
          style="width:3.3rem"
          v-for="(item,index) in goodData"
          @click="shopDetail(item.id)"
          :key="index"
        >
          <div class="p-r flex-center w100 of-hidden">
            <img :src="item.picture" style="height:2.56rem;" alt>
            <li
              class="p-a bg-diy flex-dcc"
              style="right:0.2rem;bottom:-.3rem;width:1.3rem;height:1.3rem;border-radius:50%;"
              v-if="item.man!=0"
            >
              <span class="cf mt20">满{{item.man}}</span>
              <span class="cf">减{{item.jian}}</span>
            </li>
          </div>
          <li class="mt20 ml20">{{item.name}}</li>
          <li class="m20 br">￥{{item.price}}</li>
        </div>
      </div>
      <!-- <div class="flex1">
        <mescrollList :gList="goodData"></mescrollList>
      </div>-->
    </div>
    <div class="footer" v-show="!goodsTypeStatus">
      <router-link to="shopCar" class="p-a" style="width:1.04rem;margin-top:-.9rem;left:0.2rem;">
        <img src="../assets/img/ic_gouwuche.png" alt>
        <span
          class="p-a plr10"
          style="background:red;color:#fff;right:0;top:0;border-radius:50%;"
        >{{carNum}}</span>
      </router-link>
    </div>
    <div class="maskType" v-show="goodsTypeStatus" @click="goodsTypeStatus=false"></div>
    <div class="goodsListDiv" v-show="goodsTypeStatus">
      <div
        class="list"
        v-for="(item,index) in menu"
        :key="index"
        @click="changeMenu(item)"
      >{{item.name}}</div>
      <div class="downArow"></div>
    </div>
    <footer class="flex-csb bg-ff p30">
      <div @click="goodsTypeStatus = !goodsTypeStatus">
        <router-link to class="flex-dcc footer1" active-class="active" tag="li">
          <span class="img" style="width:.36rem;height:.38rem;" alt></span>
          <span class="mt20">产品分类</span>
        </router-link>
      </div>
      <router-link to="/Recommend" class="flex-dcc footer2">
        <span class="img" style="width:.36rem;height:.38rem;" alt></span>
        <!-- <img src="../assets/img/ic_baokuanweixuanzhong.png" style="width:.36rem;" alt=""> -->
        <span class="mt20">爆款推荐</span>
      </router-link>
      <router-link to="/center" class="flex-dcc footer3">
        <span class="img" style="width:.36rem;height:.38rem;" alt></span>
        <!-- <img src="../assets/img/ic_wodeweixuanzhong.png" style="width:.36rem;" alt=""> -->
        <span class="mt20">我的</span>
      </router-link>
    </footer>
  </div>
</template>

<script>
import {
  Scroller,
  Divider,
  Spinner,
  XButton,
  Group,
  Cell,
  LoadMore
} from "vux";
import swiper from "../components/swiper";
import noData from "../components/noData";
import footerView from "../components/Footer";
import mescrollList from "../components/mescrollList";
export default {
  data() {
    return {
      menu: [],
      bannerlist: [],
      isData: 0,
      carNum: 0,
      goodData: [],
      goodsTypeStatus: false
    };
  },
  components: {
    swiper,
    Scroller,
    Divider,
    Spinner,
    XButton,
    Group,
    Cell,
    LoadMore,
    footerView,
    mescrollList,
    noData
  },
  computed: {},
  created() {
    let that = this;
    console.log(that);
    that.$vux.loading.show();
    // window.setTimeout(function() {
    that.init();
    that.getShopCarNum();
    that.getMenu();
    // that.goodsType;
    // }, 1200);
  },
  methods: {
    init: function() {
      //获取banner图和展示商品
      let that = this;
      that.isData = 1;
      that.$vux.loading.show();
      that.Http.post("Wxsite/Mall/api", {
        api_name: "mall_home_page",
        type: 1
      }).then(res => {
        console.log(res.data.data);
        that.$vux.loading.hide();
        if (res.data.code == 1) {
          that.bannerlist = res.data.data.banner;
          that.goodData = res.data.data.goodsList;
        } else {
          that.$vux.toast.text(res.data.msg, "center");
        }
      });
    },

    goodsType() {
      that.Http.post("Wxsite/Mall/api", {
        api_name: "get_goods_type"
      }).then(res => {
        console.log(res.data.data);
        if (res.data.code == 1) {
          that.goodsYypeList = res.data.data;
        } else {
          that.$vux.toast.text(res.data.msg, "center");
        }
      });
    },
    getShopCarNum: function() {
      let that = this;
      that.Http.post("Wxsite/Mall/api", {
        api_name: "get_cart_num"
      }).then(res => {
        console.log(res.data.data);
        if (res.data.code == 1) {
          that.carNum = res.data.data;
        } else {
          that.$vux.toast.text(res.data.msg, "center");
        }
      });
    },
    shopDetail: function(id) {
      console.log(id);
      this.$router.push({
        path: "/shopDetail",
        query: {
          id: id
        }
      });
    },
    getMenu: function() {
      let that = this;
      that.Http.post("Wxsite/Mall/api", {
        api_name: "get_goods_type"
      }).then(res => {
        console.log(res.data.data);
        if (res.data.code == 1) {
          that.menu = res.data.data;
        } else {
          that.$vux.toast.text(res.data.msg, "center");
        }
      });
    },
    changeMenu: function(item) {
      let that = this;
      that.Http.post("Wxsite/Mall/api", {
        api_name: "get_goods_class_pro",
        type_id: item.id
      }).then(res => {
        console.log(res.data.data);
        if (res.data.code == 1) {
          window.setTimeout(() => {
            that.$router.push({
              path: "/shopList",
              query: {
                id: item.id
              }
            });
          }, 800);
          // that.goodData = res.data.data.goodsList;
        } else {
          that.$vux.toast.text(res.data.msg, "center");
        }
      });
    }
  }
};
</script>

<style scoped>
/* werr  */
.goodsListDiv {
  width: 120px;
  position: absolute;
  z-index: 99999;
  bottom: 95px;
  transition: all 0.2s linear;
}
.goodsListDiv .list {
  background: #ffffff;
  border-top: 1px solid #efefef;
  width: 120px;
  padding: 10px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap !important;
  outline: 0 !important;
}
.downArow {
  width: 0;
  height: 0;
  border-right: 10px solid transparent;
  border-left: 10px solid transparent;
  border-top: 10px solid #ffffff;
  margin: auto;
}
.maskType {
  width: 100%;
  height: 100%;
  background: rgba(125, 125, 125, 0.5);
  position: absolute;
  bottom: 1.555rem;
  z-index: 9999;
}
</style>
