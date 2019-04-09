<!--发票管理 -->
<template>
  <div class="bigBox">
    <div class="container">
      <div class="bg-ff p20 m20 br12 flex-dcf">
        <li>发票类型</li>
        <li class="menu mt30 flex-cfs">
          <span
            :class="{'active':isCheckedMenu==index}"
            v-for="(item,index) in menu"
            :key="index"
            @click="choseMenu(index)"
          >{{item.name}}</span>
        </li>
      </div>
      <div class="bg-ff p20 m20 br12" v-if="isCheckedMenu!=2">
        <li class="bb-e5 p20">发票抬头</li>
        <div class="flex-cfs p20">
          <label class="flex-cfs" @click="add_invoice.tai=1">
            <input class="checkBox" type="radio" name="chose" hidden :checked="add_invoice.tai==1">
            <span class="circle flex-center"></span>
            <span class="ml20">个人</span>
          </label>
          <label class="flex-cfs ml50" @click="add_invoice.tai=2">
            <input class="checkBox" type="radio" name="chose" hidden :checked="add_invoice.tai==2">
            <span class="circle flex-center"></span>
            <span class="ml20">单位</span>
          </label>
        </div>
      </div>
      <div
        class="bg-ff plr20 m20 br12"
        v-if="add_invoice.tai==1&&isCheckedMenu==1||add_invoice.tai==2&&isCheckedMenu==1"
      >
        <div>
          <x-input
            class="w100 bb-e5 p30"
            placeholder="请输入手机号码"
            type="text"
            v-model="add_invoice.mobile"
            is-type="china-mobile"
          ></x-input>
          <x-input
            class="w100 p30"
            placeholder="请输入接受电子发票的邮箱"
            type="text"
            v-model="add_invoice.email"
            is-type="email"
          ></x-input>
        </div>
      </div>
      <div class="bg-ff plr20 m20 br12" v-if="add_invoice.tai==2&&isCheckedMenu!=2">
        <div>
          <x-input
            class="w100 bb-e5 p30"
            placeholder="请输入公司名称"
            type="text"
            v-model="add_invoice.company"
          ></x-input>
          <x-input
            class="w100 p30"
            placeholder="请输入纳税人识别号"
            type="text"
            v-model="add_invoice.identify_no"
          ></x-input>
        </div>
      </div>
      <div class="bg-ff plr20 m20 br12" v-if="isCheckedMenu==2">
        <input
          class="w100 bb-e5 p30"
          placeholder="请输入单位名称"
          type="text"
          v-model="add_invoice.company"
        >
        <input
          class="w100 bb-e5 p30"
          placeholder="请输入纳税人识别号"
          type="text"
          v-model="add_invoice.identify_no"
        >
        <input class="w100 bb-e5 p30" placeholder="请输入注册地址" type="text" v-model="add_invoice.addr">
        <input class="w100 bb-e5 p30" placeholder="请输入注册电话" type="text" v-model="add_invoice.tel">
        <input class="w100 bb-e5 p30" placeholder="请输入开户银行" type="text" v-model="add_invoice.bank">
        <input class="w100 p30" placeholder="请输入银行账户" type="text" v-model="add_invoice.account">
      </div>
    </div>
    <div class="bg-diy cf flex-center p20" @click="submitMsg">确定</div>
  </div>
</template>
<script>
import { XInput } from "vux";
export default {
  data() {
    return {
      menu: [
        {
          name: "纸质发票"
        },
        {
          name: "电子发票"
        },
        {
          name: "增值税发票"
        }
      ],
      add_invoice: {},
      obj: {},
      isCheckedMenu: 0 //是否选中
    };
  },
  components: {
    XInput
  },
  computed: {},
  created() {
    let that = this;
    const invoice = JSON.parse(localStorage.getItem("invoice"));
    for (let item in that.add_invoice) {
      // 去除对象内多余的空值key
      if (that.add_invoice[item] != "") {
        return that.add_invoice[item];
        console.log(that.add_invoice[item]);
      }
    }

    that.isCheckedMenu = invoice.type - 1;

    that.add_invoice = {
      type: invoice.type,
      tai: invoice.tai,
      company: invoice.company,
      identify_no: invoice.identify_no,
      mobile: invoice.mobile,
      email: invoice.email,
      tel: invoice.tel,
      addr: invoice.addr,
      bank: invoice.bank,
      account: invoice.account
    };
  },
  methods: {
    test() {
      const _this = this;
    },

    choseMenu: function (index) {
      this.isCheckedMenu = index;
    },
    submitMsg: function () {
      let that = this;
      //   纸质发票的个人
      if (that.isCheckedMenu == 0 && that.add_invoice.tai == 1) {
        that.submitReq();
      }
      //   纸质发票的单位
      if (that.isCheckedMenu == 0 && that.add_invoice.tai == 2) {
        if (that.add_invoice.company == "") {
          that.$vux.toast.text("请输入公司名称", "center");
        } else if (that.add_invoice.identify_no == "") {
          that.$vux.toast.text("请输入税务识别号", "center");
        } else {
          that.submitReq();
        }
      }
      //   电子发票的个人
      if (that.isCheckedMenu == 1 && that.add_invoice.tai == 1) {
        if (that.add_invoice.mobile == "") {
          that.$vux.toast.text("请输入手机号码", "center");
        } else if (that.add_invoice.email == "") {
          that.$vux.toast.text("请输入接受的电子发票的邮箱", "center");
        } else {
          that.submitReq();
        }
      }
      //   电子发票的单位
      if (that.isCheckedMenu == 1 && that.add_invoice.tai == 2) {
        if (that.add_invoice.mobile == "") {
          that.$vux.toast.text("请输入手机号码", "center");
        } else if (!checkMobileAndTel(that.add_invoice.mobile)) {
          that.$vux.toast.text("请输入正确的手机号码", "center");
        } else if (that.add_invoice.email == "") {
          that.$vux.toast.text("请输入接受的电子发票的邮箱", "center");
        } else if (that.add_invoice.company == "") {
          that.$vux.toast.text("请输入公司名称", "center");
        } else if (that.add_invoice.identify_no == "") {
          that.$vux.toast.text("请输入税务识别号", "center");
        } else {
          that.submitReq();
        }
      }
      //   增值税发票
      if (that.isCheckedMenu == 2) {
        if (that.add_invoice.company == "") {
          that.$vux.toast.text("请输入单位名称", "center");
        } else if (that.add_invoice.identify_no == "") {
          that.$vux.toast.text("请输入税务识别号", "center");
        } else if (that.add_invoice.addr == "") {
          that.$vux.toast.text("请输入注册地址", "center");
        } else if (that.add_invoice.tel == "") {
          that.$vux.toast.text("请输入注册电话", "center");
        } else if (that.add_invoice.bank == "") {
          that.$vux.toast.text("请输入开户银行", "center");
        } else if (that.add_invoice.account == "") {
          that.$vux.toast.text("请输入银行账户", "center");
        } else {
          that.submitReq();
        }
      }
    },
    submitReq: function () {
      let that = this;
      that.add_invoice.api_name = "add_invoice";
      that.add_invoice.type = that.isCheckedMenu + 1;
      that.$vux.loading.show();
      that.Http.post("Wxsite/User/api", that.add_invoice).then(res => {
        console.log(res.data);
        that.$vux.loading.hide();
        if (res.data.code == 1) {
          that.$vux.toast.text(res.data.msg, "center");
          if (that.$route.query.type == 1) {
            //获取添加的发票Id
            console.log(res.data.id)
            that.$router.push({
              path: "/shopConfirm",
              query: {
                spec: that.$route.query.spec,
                invoice_id: res.data.data.id
              }
            });
          }
        } else {
          console.log(res.data.msg);
          that.$vux.toast.text(res.data.msg, "center");
        }
      });
    }
  }
};
</script>
<style scoped>
.menu span {
  padding: 0.1rem 0.2rem;
  border: 1px solid #ccc;
  color: #ccc;
  border-radius: 0.12rem;
  margin-right: 0.12rem;
}
.menu .active {
  border: 1px solid #f49b1b;
  color: #f49b1b;
}
.checkBox:checked + .circle {
  background: url("../assets/img/checked.png") no-repeat;
  background-size: 100% 100%;
  border: 1px solid #fff;
}
</style>
