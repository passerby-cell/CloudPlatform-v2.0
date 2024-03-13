import Vue from "vue";
import VueI18n from "vue-i18n";
import enLocale from "./en";
import zhLocale from "./zh";
import elementEnLocale from "element-ui/lib/locale/lang/en";
import elementZHLocale from "element-ui/lib/locale/lang/zh-CN";

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: JSON.parse(localStorage.getItem("locale")) || "zh",
  globalInjection: true,
  messages: {
    en: {
      ...enLocale,
      ...elementEnLocale,
    },
    zh: {
      ...zhLocale,
      ...elementZHLocale,
    },
  },
});
export default i18n;
