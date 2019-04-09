import Vue from "vue";
import Router from "vue-router";
import Center from "@/pages/Center";
import Wallet from "@/pages/Wallet";
import AmOrder from "@/pages/AmOrder";
import AmOrderDetail from "@/pages/AmOrderDetail";
import shopOrder from "@/pages/shopOrder";
import Address from "@/pages/Address";
import About from "@/pages/About";
import Info from "@/pages/Info";
import Coupon from "@/pages/Coupon";
import Recharge from "@/pages/Recharge";
import Shop from "@/pages/Shop";
import ShopDetail from "@/pages/ShopDetail";
import shopOrderDetail from "@/pages/shopOrderDetail";
import shopConfirm from "@/pages/shopConfirm";
import Edit from "@/pages/Edit";
import Recommend from "@/pages/recommend";
import Invoice from "@/pages/Invoice";
import scrollMenu from "@/pages/scrollMenu";
import shopCar from "@/pages/shopCar";
import shopList from "@/pages/shopList";
import mList from "@/pages/mList";
import refund from "@/pages/refund";


Vue.use(Router);

export default new Router({
  linkActiveClass: 'active',
  routes: [

    {
      path: "/",
      name: "Shop",
      component: Shop,
      meta: {
        title: "商城"
      }
    },
    {
      path: "/refund",
      name: "refund",
      component: refund,
      meta: {
        title: "申请退款"
      }
    },
    {
      path: "/shopList",
      name: "shopList",
      component: shopList,
      meta: {
        title: "商品列表"
      }
    },
    {
      path: "/mList",
      name: "mList",
      component: mList,
      meta: {
        title: "循环列表"
      }
    },
    {
      path: "/shopCar",
      name: "shopCar",
      component: shopCar,
      meta: {
        title: "购物车"
      }
    },
    {
      path: "/scrollMenu",
      name: "scrollMenu",
      component: scrollMenu,
      meta: {
        title: "滚动菜单"
      }
    },
    {
      path: "/Invoice",
      name: "Invoice",
      component: Invoice,
      meta: {
        title: "发票管理"
      }
    },
    {
      path: "/Recommend",
      name: "Recommend",
      component: Recommend,
      meta: {
        title: "爆款推荐"
      }
    },
    {
      path: "/shopOrderDetail",
      name: "shopOrderDetail",
      component: shopOrderDetail,
      meta: {
        title: "订单详情"
      }
    },
    {
      path: "/AmOrder",
      name: "AmOrder",
      component: AmOrder,
      meta: {
        title: "按摩订单"
      }
    },
    {
      path: "/AmOrderDetail",
      name: "AmOrderDetail",
      component: AmOrderDetail,
      meta: {
        title: "按摩详情"
      }
    },
    {
      path: "/Center",
      name: "Center",
      component: Center,
      meta: {
        title: "个人中心"
      }
    },
    {
      path: "/Edit",
      name: "Edit",
      component: Edit,
      meta: {
        title: "新增地址"
      }
    },
    {
      path: "/Wallet",
      name: "Wallet",
      component: Wallet,
      meta: {
        title: "钱包"
      }
    },
    {
      path: "/shopConfirm",
      name: "shopConfirm",
      component: shopConfirm,
      meta: {
        title: "确认订单"
      }
    },
    {
      path: "/Shop",
      name: "Shop",
      component: Shop,
      meta: {
        title: "商城"
      }
    },
    {
      path: "/ShopDetail",
      name: "ShopDetail",
      component: ShopDetail,
      meta: {
        title: "商品详情"
      }
    },

    {
      path: "/shopOrder",
      name: "shopOrder",
      component: shopOrder,
      meta: {
        title: "商城订单"
      }
    },
    {
      path: "/Address",
      name: "Address",
      component: Address,
      meta: {
        title: "地址管理"
      }
    },
    {
      path: "/About",
      name: "About",
      component: About,
      meta: {
        title: "关于我们"
      }
    },
    {
      path: "/Info",
      name: "Info",
      component: Info,
      meta: {
        title: "个人信息"
      }
    },
    {
      path: "/Coupon",
      name: "Coupon",
      component: Coupon,
      meta: {
        title: "优惠券"
      }
    },
    {
      path: "/Recharge",
      name: "Recharge",
      component: Recharge,
      meta: {
        title: "充值"
      }
    },
  ]
});
