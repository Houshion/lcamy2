// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import axios from "axios";
import filters from "./commom/filter/filter"; //用于处理浮点数小数位数
import Http from "../static/js/axios";
import FastClick from 'fastclick';

Vue.prototype.$axios = axios;
import {
  AlertPlugin,
  ToastPlugin,
  ConfirmPlugin,
  LoadingPlugin
} from 'vux'
FastClick.attach(document.body);
Vue.use(AlertPlugin)
Vue.use(ToastPlugin)
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)
Vue.prototype.Http = Http;
//全局方法Vue.filter()统一注册自定义过滤器
Object.keys(filters).forEach(key => { //返回filters对象中属性名组成的数组
  Vue.filter(key, filters[key])
})
Vue.config.productionTip = false;
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

import o_base from '../static/js/o_base'
Vue.prototype.$base = o_base

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: {
    App
  },
  template: "<App/>",
});
