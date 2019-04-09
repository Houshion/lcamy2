<!--列表 -->
<template>
  <div class="bigBox">
    <div class="container">
      <swiper :bannerlist="bannerlist"></swiper>
      <mescrollList :gList="goodData"></mescrollList>
    </div>
  </div>
</template>
<script>
import mescrollList from "../components/mescrollList";
import swiper from "../components/swiper";
export default {
  data() {
    return {
      bannerlist: [
        {
          imgUrl:
            "http://thirdwx.qlogo.cn/mmopen/vi_32/SlZWud7rgdHgicz3I6xKD0OjVg7FOOibE0QCIPctd671JT3R2YHyanTkibcNYibxS4H8r6icnQMpCwic0tyWBLzd2npA/132"
        },
        {
          imgUrl:
            "http://thirdwx.qlogo.cn/mmopen/vi_32/SlZWud7rgdHgicz3I6xKD0OjVg7FOOibE0QCIPctd671JT3R2YHyanTkibcNYibxS4H8r6icnQMpCwic0tyWBLzd2npA/132"
        },
        {
          imgUrl:
            "http://thirdwx.qlogo.cn/mmopen/vi_32/SlZWud7rgdHgicz3I6xKD0OjVg7FOOibE0QCIPctd671JT3R2YHyanTkibcNYibxS4H8r6icnQMpCwic0tyWBLzd2npA/132"
        },
        {
          imgUrl:
            "http://thirdwx.qlogo.cn/mmopen/vi_32/SlZWud7rgdHgicz3I6xKD0OjVg7FOOibE0QCIPctd671JT3R2YHyanTkibcNYibxS4H8r6icnQMpCwic0tyWBLzd2npA/132"
        },
        {
          imgUrl:
            "http://thirdwx.qlogo.cn/mmopen/vi_32/SlZWud7rgdHgicz3I6xKD0OjVg7FOOibE0QCIPctd671JT3R2YHyanTkibcNYibxS4H8r6icnQMpCwic0tyWBLzd2npA/132"
        }
      ],
      goodData: [
        {
          id: "2", //商品id
          name: "XXX按摩椅", //商品名称
          picture:
            "http://qzlgxamy.app.xiaozhuschool.com/Upload/img/2018-11-06/5be139b5ec3d7.jpg", //商品展示图片
          price: "1800.00", //商品展示单价
          man: "2000", //满
          jian: "100" //减
        },
        {
          id: "1",
          name: "XX按摩椅",
          picture:
            "http://qzlgxamy.app.xiaozhuschool.com/Upload/img/2018-11-06/5be13c28f27cb.jpg",
          price: "2000.00",
          man: "2000", //满
          jian: "100" //减
        },
        {
          id: "2", //商品id
          name: "XXX按摩椅", //商品名称
          picture:
            "http://qzlgxamy.app.xiaozhuschool.com/Upload/img/2018-11-06/5be139b5ec3d7.jpg", //商品展示图片
          price: "1800.00", //商品展示单价
          man: "2000", //满
          jian: "100" //减
        },
        {
          id: "1",
          name: "XX按摩椅",
          picture:
            "http://qzlgxamy.app.xiaozhuschool.com/Upload/img/2018-11-06/5be13c28f27cb.jpg",
          price: "2000.00",
          man: "2000", //满
          jian: "100" //减
        },
        {
          id: "2", //商品id
          name: "XXX按摩椅", //商品名称
          picture:
            "http://qzlgxamy.app.xiaozhuschool.com/Upload/img/2018-11-06/5be139b5ec3d7.jpg", //商品展示图片
          price: "1800.00", //商品展示单价
          man: "2000", //满
          jian: "100" //减
        },
        {
          id: "1",
          name: "XX按摩椅",
          picture:
            "http://qzlgxamy.app.xiaozhuschool.com/Upload/img/2018-11-06/5be13c28f27cb.jpg",
          price: "2000.00",
          man: "2000", //满
          jian: "100" //减
        },
        {
          id: "2", //商品id
          name: "XXX按摩椅", //商品名称
          picture:
            "http://qzlgxamy.app.xiaozhuschool.com/Upload/img/2018-11-06/5be139b5ec3d7.jpg", //商品展示图片
          price: "1800.00", //商品展示单价
          man: "2000", //满
          jian: "100" //减
        },
        {
          id: "1",
          name: "XX按摩椅",
          picture:
            "http://qzlgxamy.app.xiaozhuschool.com/Upload/img/2018-11-06/5be13c28f27cb.jpg",
          price: "2000.00",
          man: "2000", //满
          jian: "100" //减
        },
      ]
    };
  },
  components: {
    mescrollList,
    swiper
  },
  computed: {},
  created() {
    let that = this;
    that.init();
  },
  methods: {
    init: function() {
      console.log(1);
    }
  }
};
</script>
<style scoped>
</style>