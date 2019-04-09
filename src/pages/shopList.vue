<!--不同分类的商品 -->
<template>
  <div class="bigBox" v-if="isData">
    <div class="container">
      <div v-if="goodData.length>0">
        <div>
          <mescrollList :gList="goodData"></mescrollList>
        </div>
      </div>
      <div v-else>
        <noData></noData>
      </div>
    </div>
    <div class="footer">
      <router-link to="shopCar" class="p-a" style="width:1.04rem;margin-top:-1.5rem;left:0.2rem;">
        <img src="../assets/img/ic_gouwuche.png" alt>
        <span
          class="p-a plr10"
          style="background:red;color:#fff;right:0;top:0;border-radius:50%;"
        >{{carNum}}</span>
      </router-link>
    </div>
  </div>
</template>
<script>
import mescrollList from "../components/mescrollList";
import noData from "../components/noData";
export default {
  data() {
    return {
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
      ],
      isData: 0,
      carNum: 0
    };
  },
  components: {
    mescrollList,
    noData
  },
  computed: {},
  created() {
    let that = this;
    that.init();
    that.getShopCarNum();
  },
  methods: {
    init: function() {
      let that = this;
      that.Http.post("Wxsite/Mall/api", {
        api_name: "get_goods_class_pro",
        type_id: that.$route.query.id
      }).then(res => {
        console.log(res.data.data);
        if (res.data.code == 1) {
          that.isData = 1;
          that.goodData = res.data.data.goodsList;
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
    }
  }
};
</script>
<style scoped>
</style>
