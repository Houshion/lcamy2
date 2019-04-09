<!--爆款推荐 -->
<template>
  <div class="bigBox" v-if="isData">
    <div class="container">
      <div v-if="bannerlist.length>0">
        <swiper :swiper="bannerlist"></swiper>
      </div>
      <!-- 标题 -->
      <div class="flex-cfs p20">
        <img src="../assets/img/icon6.png" style="width:.44rem;height:.44rem;" alt>
        <span class="ml20 f32">人气商品</span>
      </div>
      <div class="container">
        <!-- 商品列表 -->
        <div v-if="goodData.length>0">
          <mescrollList :gList="goodData"></mescrollList>
        </div>
        <div v-else>
          <noData></noData>
        </div>
        <!-- <div class="shop-container flex-csb r-wrap m20" v-if="goodData.length>0">
  
        <div class="shopBox br12 bg-ff flex-dcf mb20" style="width:3.5rem" v-for="(item,index) in goodData" @click="shopDetail(item.id)" :key="index">
  
          <div class="p-r flex-center w100 of-hidden">
  
            <img :src="item.picture" style="height:2.56rem;" alt="">
  
            <li class="p-a bg-diy flex-dcc" style="right:0.2rem;bottom:-.3rem;width:1.3rem;height:1.3rem;border-radius:50%;" v-if="item.man!=0">
              <span class="cf mt20">满{{item.man}}</span>
              <span class="cf">减{{item.jian}}</span>
            </li>
  
          </div>
  
          <li class="mt20 ml20">{{item.name}}</li>
  
          <li class="m20 br">￥{{item.price}}</li>
  
        </div>
  
      </div>
  
      <div class="shopBox br12 bg-ff flex-dcc p20" @click="shopDetail(item)" v-else>
  
        <noData></noData>
  
        </div>-->
      </div>
    </div>
    <footerView></footerView>
  </div>
</template>

<script>
import swiper from "../components/swiper";

import noData from "../components/noData";

import footerView from "../components/Footer";
import mescrollList from "../components/mescrollList";

export default {
  data() {
    return {
      bannerlist: [],
      isData: 0,
      goodData: [
        // {
        //   id: "4",
        //   jian: "2",
        //   man: "100",
        //   name: "新东方按摩椅",
        //   picture: "",
        //   price: "100.23"
        // },
        // {
        //   id: "4",
        //   jian: "2",
        //   man: "100",
        //   name: "新东方按摩椅",
        //   picture: "",
        //   price: "100.23"
        // },
        // {
        //   id: "4",
        //   jian: "2",
        //   man: "100",
        //   name: "新东方按摩椅",
        //   picture: "",
        //   price: "100.23"
        // },
        // {
        //   id: "4",
        //   jian: "2",
        //   man: "100",
        //   name: "新东方按摩椅",
        //   picture: "",
        //   price: "100.23"
        // },
        // {
        //   id: "4",
        //   jian: "2",
        //   man: "100",
        //   name: "新东方按摩椅",
        //   picture: "",
        //   price: "100.23"
        // },
        // {
        //   id: "4",
        //   jian: "2",
        //   man: "100",
        //   name: "新东方按摩椅",
        //   picture: "",
        //   price: "100.23"
        // },
        // {
        //   id: "4",
        //   jian: "2",
        //   man: "100",
        //   name: "新东方按摩椅",
        //   picture: "",
        //   price: "100.23"
        // }
      ]
    };
  },

  components: {
    swiper,
    footerView,
    mescrollList,
    noData
  },

  computed: {},

  created() {
    let that = this;
    console.log(that);
    that.$vux.loading.show();
    window.setTimeout(function() {
      that.$vux.loading.hide();
      that.init();
    }, 800);
  },

  methods: {
    init: function() {
      //获取banner图和展示商品
      let that = this;
      that.isData = 1;
      that.$vux.loading.show();
      that.Http.post("Wxsite/Mall/api", {
        api_name: "get_goods_bao"
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

    shopDetail: function(id) {
      console.log(id);
      this.$router.push({
        path: "/shopDetail",
        query: {
          id: id
        }
      });
    }
  }
};
</script>

<style scoped>
</style>
