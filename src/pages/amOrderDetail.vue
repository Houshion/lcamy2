<!--按摩详情 -->
<template>
<div class='bigBox'>
<div class='container'>
     <div class="m20 bg-ff flex-csb p30" v-if="detailInfo.macno">
    <span>设备编号</span>
    <span class="c9">{{detailInfo.macno}}</span>
  </div>
   <div class="m20 bg-ff flex-csb p30" v-if="detailInfo.item_title">
    <span>套餐</span>
    <span class="c9">{{detailInfo.item_title}}</span>
  </div>
   <div class="m20 bg-ff flex-csb p30" v-if="detailInfo.pay_time">
    <span>付款时间</span>
    <span class="c9">{{detailInfo.pay_time|timeStr('Y-m-d H:i:s')}}</span>
  </div>
   <div class="m20 bg-ff flex-csb p30" v-if="detailInfo.end_time">
    <span>结束时间</span>
    <span class="c9">{{detailInfo.end_time|timeStr('Y-m-d H:i:s')}}</span>
  </div>
   <div class="m20 bg-ff flex-csb p30" v-if="detailInfo.should_money">
    <span>需付</span>
    <span class="c9">￥{{detailInfo.should_money}}</span>
  </div>
   <div class="m20 bg-ff flex-csb p30" v-if="detailInfo.offset_money">
    <span>优惠券</span>
    <span class="c9">￥{{detailInfo.offset_money}}</span>
  </div>
   <div class="m20 bg-ff flex-csb p30" v-if="detailInfo.real_money">
    <span>实付</span>
    <span class="c9">￥{{detailInfo.real_money}}</span>
  </div>
</div>
</div>
</template>
<script>
export default {
  data() {
    return {
      detailInfo: {}
    };
  },
  components: {},
  computed: {},
  created() {
    let that = this;
    that.init();
  },
  methods: {
    init: function() {
      let that = this;
      that.Http.post("wxsite/user/api", {
        api_name: "order_info",
        order_id: that.$route.query.id
      }).then(res => {
        console.log(res.data.data);
        if (res.data.code == 1) {
          that.detailInfo = res.data.data;
          console.log(that.detailInfo);
        } else {
          that.$vux.toast.text(res.data.data.msg);
        }
      });
    }
  }
};
</script>
<style scoped>
</style>