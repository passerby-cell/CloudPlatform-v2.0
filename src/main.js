import Vue from "vue";
import App from "./App.vue";
import store from "@/store/index";
import VueRouter from "vue-router";
import axios from "axios";
import VueAxios from "vue-axios";
import "animate.css";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import * as echarts from "echarts";
// import lang from "element-ui/lib/locale/lang/en";
// import locale from "element-ui/lib/locale";
import i18n from "@/assets/lang";
Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value),
});
// // 设置语言
// locale.use(lang);
// import "default-passive-events";

//引入swiper样式
import "swiper/css/swiper.css";

import router from "@/router";
//代码高亮文件引入
import hljs from "highlight.js";
//样式文件,这里我选的是sublime样式，文件里面还有其他样式可供选择
import "highlight.js/styles/monokai-sublime.css";

import dataV from "@jiaminghi/data-view";
/**
 * 解决element-ui的弹窗组件在使用mixins时，会导致弹窗的props属性失效的问题
 * 主要是版本问题
 */
function RepairProps(cmp) {
  (cmp.mixins || []).forEach((mixin) => {
    if (mixin.props && mixin.props.placement) {
      const defaultValue = mixin.props.placement.default;
      mixin.data = new Proxy(mixin.data, {
        apply(target, thisArg, argArray) {
          const res = Reflect.apply(target, thisArg, argArray);
          return {
            ...(res || {}),
            placement: defaultValue,
          };
        },
      });
      delete mixin.props.placement;
    }
    if (mixin.mixins && mixin.mixins.length > 0) {
      RepairProps(mixin);
    }
  });
}
RepairProps(ElementUI.DatePicker);
RepairProps(ElementUI.TimePicker);
RepairProps(ElementUI.TimeSelect);

Vue.use(dataV);
Vue.directive("highlight", function (el) {
  let blocks = el.querySelectorAll("pre code");
  blocks.forEach((block) => {
    hljs.highlightBlock(block);
  });
});
Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(VueAxios, axios); // 使用 axios 插件
ElementUI.Dialog.props.closeOnClickModal.default = false;
Vue.prototype.$echarts = echarts;

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (localStorage.getItem("token")) {
      next();
    } else {
      next({
        path: "/login",
        query: {
          redirect: to.fullPath,
        },
      });
    }
  }
  if (to.name === "login" && localStorage.getItem("token")) {
    next({
      path: "/job",
    });
  }
  next();
});

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router,
  store,
  i18n,
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
}).$mount("#app");
