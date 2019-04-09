<!--申请退款 -->
<template>
  <div class="bigBox" v-if="isData">
    <div class="container">
      <div v-for="(i,id1) in Array(allData)" :key="id1">
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
                <span class="c9 mt100">x{{i2.num}}</span>
              </div>
            </li>
          </ul>
        </div>
        <div v-else>
          <noData></noData>
        </div>
      </div>
      <div class="m20 bg-ff br12 p20 flex-csb">
        <span>退款原因</span>
        <input type="text" class="ta-right" placeholder="请输入" v-model="data.refund_reason">
      </div>
      <div class="m20 bg-ff br12 p20 flex-csb">
        <span>退款金额</span>
        <span class="c-diy">￥{{payMoney|toFixed(2)}}</span>
      </div>
      <div class="m20 bg-ff br12 p20 flex-csb">
        <span>联系电话</span>
        <input type="text" class="ta-right" placeholder="请输入" v-model="data.mobile">
      </div>
      <form class="bg-ff m20 br12 p20" enctype="multipart/form-data">
        <span>上传凭证</span>
        <div class="pic mt20">
          <label class="comment-photo">
            <input
              @change="fileChange($event)"
              type="file"
              id="upload_file"
              style="display: none"
              accept="image/*"
            >
            <div class="inline-block flex-cfs r-wrap" id="pic_box">
              <div v-for="(img,i3) in imgList" :key="i3">
                <div class="isImg" style="height: 100%">
                  <img :src="img" style="height: 1.28rem;width: 1.28rem;">
                  <button class="removeBtn" @click="fileDel(index)">x</button>
                </div>
              </div>
              <div>
                <img src="../assets/img/pic.png" style="width:1.28rem;height:1.28rem;" alt>
              </div>
              <!-- <label>
                <input name="file" type="file" accept="image/*" @change="update" hidden>
                <div class="isImg" style="height: 100%" v-show="!show">
                  <img :src="imgs" style="height: 100%; width: 100%;">
                </div>
              </label>-->
            </div>
          </label>
        </div>
      </form>
      <div class="main_btn" @click="confirmRefund">提交</div>
      <div class="mt50"></div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      isData: false,
      allData: [],//详情内容
      isChose: 0,
      money: 0,
      payMoney:0,
      spec_id: "",
      imgList: [],
      imgFile: [],
      imgLength: 3,
      list: [],
      data: {
        api_name: "apply_after_sale",
        order_id: "",
        goods_spec_id: "",
        refund_reason: "",
        mobile: "",
        photo: "",
        goods_name: "",
        credentials: ""
      },
      imgs: "",
      show: true,
      param: ""
    };
  },
  components: {},
  computed: {},
  created() {
    let that = this;
    that.init();
  },
  methods: {
    init: function () {
      let that = this;
      that.spec_id = that.$route.query.spec_id;
      this.Http.post('Wxsite/Mall/api', {
        api_name: 'get_pay_price',
        order_id: this.$route.query.id,
        goods_spec_id: this.$route.query.spec_id,
      }).then(res => {
        console.log(res.data.data);
        if (res.data.code == 1) {
          that.payMoney = res.data.data;
        } else {
          that.$vux.toast.text(res.data.msg, "center");
        }
      });
      that.Http.post("Wxsite/Mall/api", {
        api_name: "order_detail",
        order_id: this.$route.query.id
      }).then(res => {
        console.log(res.data.data);
        if (res.data.code == 1) {
          that.$vux.loading.hide();
          that.isData = 1;
          that.allData = res.data.data;
          that.address = res.data.data.addr_data;
          that.list = res.data.data.goods_data;
          console.log(JSON.stringify(that.list))
          that.list = that.list.filter(v => v.spec_id == that.spec_id)
          // list.splice(list.filter(v => v.spec_id == 21),1)
          that.state = res.data.data.status;
          that.data.photo = that.list[0].picture;
          that.data.goods_name = that.list[0].name;
          that.data.money = that.list[0].price;
          that.data.goods_spec_id = that.spec_id;
          that.data.order_id = res.data.data.id;
        } else {
          that.$vux.toast.text(res.data.msg, "center");
        }
      });
    },
    confirmRefund() {
      let that = this;
      console.log(that.imgFile)
      that.data.credentials = that.imgFile.toString()
      console.log(that.data.credentials)
      let data = that.data;
      if (this.data.refund_reason == "") {
        that.$vux.toast.text("请输入退款原因", "center");
      } else if (this.data.mobile == "") {
        that.$vux.toast.text("请输入手机号码", "center");
      } else if (!this.$base.isPhone(this.data.mobile)) {
        that.$vux.toast.text("请输入正确的手机号码", "center");
      } else if (that.imgList.length == 0) {
        that.$vux.toast.text("请先上传图片", "center");
      } else {
        this.$vux.loading.show({
          text: 'Loading'
        })
        let formData = new FormData();
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        formData.append('api_name', that.data.api_name);
        formData.append('order_id', that.data.order_id);
        formData.append('goods_spec_id', that.data.goods_spec_id);
        formData.append('refund_reason', that.data.refund_reason);
        formData.append('mobile', that.data.mobile);
        formData.append('photo', that.data.photo);
        formData.append('goods_name', that.data.goods_name);
        // formData.append('credentials', that.data.credentials);
        that.imgFile.forEach((item, index) => {
          formData.append('credentials[]', item);
        });
        axios.post('http://lcamy2.app.xiaozhuschool.com/Wxsite/Mall/api', formData, config).then(res => {
          console.log(res.data.data);
          this.$vux.loading.hide()
          if (res.data.code == 1) {
            that.$vux.toast.text(res.data.msg, 'center')
            that.$router.push({
              path: '/shopOrder'
            })
          } else {
            that.$vux.toast.text(res.data.msg, 'center')
          }
        });
      }
    },
    fileChange(e) {
      let that = this;
      console.log(e)
      console.log(that.imgList.length)
      if (that.imgList.length > 2) {
        this.$vux.toast.text('最多上传三张图片', "center");
        return false;
      }
      let file = e.target.files[0];
      if (file) {
        that.imgFile.push(file);
        console.log(that.imgFile)
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (e) {
          // console.log(e.target.result)
          that.imgList.push(e.target.result);
        }
        console.log(that.imgList)
      } else {
        console.log('无选择图片');
      }
    },
    removeImg: function () {
      console.log(1);
    },
    fileDel(index) {
      this.imgList.splice(index, 1);
      this.imgFile.splice(index, 1);
    },
    update(e) {
      // 上传照片
      const _this = this;
      let file = e.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = function (evt) {
        //console.log(evt.target)
        _this.imgs = evt.target.result;
        _this.data.img = file;
        _this.show = false;
      };
    },
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
.cBox {
  padding: 0.2rem 0.3rem;
  border-radius: 50px;
  background: #eee;
  margin-left: 0.2rem;
  margin-bottom: 0.2rem;
}

.active {
  background: #f49b1b;
  color: #fff;
}

.comment-photo label {
  display: inline-block;
  width: 1.28rem;
  height: 1.28rem;
  background: url(~@/./assets/img/pic.png) no-repeat;
  background-size: 100% 100%;
  float: left;
  margin-right: 0.2rem;
  margin-bottom: 0.2rem;
}

.shade {
  position: absolute;
  display: none;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.55);
}

.shade div {
  width: 6rem;
  height: 4rem;
  line-height: 4rem;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -2rem;
  margin-left: -3rem;
  background: white;
  border-radius: 5px;
  text-align: center;
  font-size: 1rem;
}

.shadeImg {
  position: absolute;
  display: none;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 15;
  text-align: center;
  background: rgba(0, 0, 0, 0.55);
}

.showImg {
  width: 225px;
}

.isImg {
  width: 1.28rem;
  height: 1.28rem;
  position: relative;
  display: inline-block;
  margin-right: 0.2rem;
  margin-bottom: 0.2rem;
}

.removeBtn {
  position: absolute;
  right: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.2);
  color: #fff;
  border-radius: 50%;
  width: 0.3rem;
  height: 0.3rem;
  font-size: 0.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>