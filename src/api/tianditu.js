// 对axios二次封装
import axios from "axios";
//引入nprogress进度条
import nprogress from "nprogress";
//start:表示进度条开始 done:表示进度条结束
// 引入nprogress样式
import "nprogress/nprogress.css";

// 利用axios的create方法,创建一个axios实例
const request = axios.create({
  // 配置对象
  // 基础路径:发请求时路径中会出现/api
  baseURL: "/tianditu",
  // 请求超时的时间
  timeout: 50000,
});
// 请求拦截器
request.interceptors.request.use((config) => {
  // config:配置对象
  // 进度条开始
  nprogress.start();
  config.headers["userInfoToken"] = localStorage.getItem("userInfoToken");
  // get请求映射params参数
  if (config.method === "get" && config.params) {
    let url = config.url + "?" + tansParams(config.params);
    url = url.slice(0, -1);
    config.params = {};
    config.url = url;
  }
  return config;
});
// 响应拦截器
request.interceptors.response.use(
  (res) => {
    // 成功的回调函数
    // 进度条结束
    nprogress.done();
    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
    }
    if (res.data.code == 201) {
      localStorage.clear();
      vue.$router.push({ name: "login" });
      //location.href = "http://localhost:10086/#/login";
    }
    return res.data;
  },
  (error) => {
    // 失败的回调函数
    nprogress.done();
    //location.href = 'http://localhost:10086/#/login'
    return Promise.reject(new Error("fail"));
  }
);
/**
 * 参数处理
 * @param {*} params  参数
 */
export function tansParams(params) {
  let result = "";
  for (const propName of Object.keys(params)) {
    const value = params[propName];
    var part = encodeURIComponent(propName) + "=";
    if (value !== null && value !== "" && typeof value !== "undefined") {
      if (typeof value === "object") {
        for (const key of Object.keys(value)) {
          if (
            value[key] !== null &&
            value[key] !== "" &&
            typeof value[key] !== "undefined"
          ) {
            let params = propName + "[" + key + "]";
            var subPart = encodeURIComponent(params) + "=";
            result += subPart + encodeURIComponent(value[key]) + "&";
          }
        }
      } else {
        result += part + encodeURIComponent(value) + "&";
      }
    }
  }
  return result;
}
export default request;
