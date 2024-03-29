const { defineConfig } = require("@vue/cli-service");
require("events").EventEmitter.defaultMaxListeners = 0; // 解除限制
module.exports = defineConfig({
  productionSourceMap: false,
  transpileDependencies: true,
  lintOnSave: false, // 关闭语法检测
  // 开启代理服务器
  devServer: {
    // 修改项目的端口号
    port: 10086,
    // 代理服务器可以将路由中的指定前缀转发到指定的后端服务器中
    proxy: {
      "/bocloud": {
        target: "http://10.33.112.2:91",
        ws: true, // 是否启用websockets
        changeOrigin: true, // 代理时是否更改host
        pathRewrite: {
          "^/bocloud": "", //这里理解成用'/api'代替target里面的地址,比如我要调用'http://40.00.100.100:3002/user/add'，直接写'/api/user/add'即可
        },
      },
      "/ide": {
        target: "http://10.33.112.2:81",
        ws: true, // 是否启用websockets
        changeOrigin: true, // 代理时是否更改host
        pathRewrite: {
          "^/ide": "", //这里理解成用'/api'代替target里面的地址,比如我要调用'http://40.00.100.100:3002/user/add'，直接写'/api/user/add'即可
        },
      },
      // "/ide": {
      //   target: "http://10.33.112.2:80",
      //   ws: true, // 是否启用websockets
      //   changeOrigin: true, // 代理时是否更改host
      //   pathRewrite: {
      //     "^/ide": "", //这里理解成用'/api'代替target里面的地址,比如我要调用'http://40.00.100.100:3002/user/add'，直接写'/api/user/add'即可
      //   },
      // },
      "/userInfo": {
        target: "http://10.33.112.2:81",
        ws: true, // 是否启用websockets
        changeOrigin: true, // 代理时是否更改host
        // pathRewrite: {
        //   "^/userInfo": "", //这里理解成用'/api'代替target里面的地址,比如我要调用'http://40.00.100.100:3002/user/add'，直接写'/api/user/add'即可
        // },
      },
      // "/userInfo": {
      //   target: "http://localhost:18088",
      //   changeOrigin: true, // 代理时是否更改host
      //   pathRewrite: {
      //     "^/userInfo": "", //这里理解成用'/api'代替target里面的地址,比如我要调用'http://40.00.100.100:3002/user/add'，直接写'/api/user/add'即可
      //   },
      // },

      "/accessdata": {
        target: "http://10.33.112.2:15244",
        secure: false,
        changeOrigin: true, // 代理时是否更改host
        pathRewrite: {
          "^/accessdata": "", //这里理解成用'/api'代替target里面的地址,比如我要调用'http://40.00.100.100:3002/user/add'，直接写'/api/user/add'即可
        },
      },
      // "/accessdata": {
      //   target: "http://10.33.112.2:15248/",
      //   secure: false,
      //   changeOrigin: true, // 代理时是否更改host
      //   pathRewrite: {
      //     "^/accessdata": "", //这里理解成用'/api'代替target里面的地址,比如我要调用'http://40.00.100.100:3002/user/add'，直接写'/api/user/add'即可
      //   },
      // },
      "/satelite": {
        target: "http://10.33.112.2:81",
        secure: false,
        changeOrigin: true, // 代理时是否更改host
        // pathRewrite: {
        //   "^/satelite": "", //这里理解成用'/api'代替target里面的地址,比如我要调用'http://40.00.100.100:3002/user/add'，直接写'/api/user/add'即可
        // },
      },
      // "/tianditu": {
      //   target: "http://127.0.0.1:18085",
      //   secure: false,
      //   changeOrigin: true, // 代理时是否更改host
      //   // pathRewrite: {
      //   //   "^/tianditu": "", //这里理解成用'/api'代替target里面的地址,比如我要调用'http://40.00.100.100:3002/user/add'，直接写'/api/user/add'即可
      //   // },
      // },
      "/tianditu": {
        target: "http://10.33.112.2:81",
        secure: false,
        changeOrigin: true, // 代理时是否更改host
        // pathRewrite: {
        //   "^/tianditu": "", //这里理解成用'/api'代替target里面的地址,比如我要调用'http://40.00.100.100:3002/user/add'，直接写'/api/user/add'即可
        // },
      },
      // "/remotesatelite": {
      //   target: "https://data.cresda.cn/",
      //   secure: false,
      //   changeOrigin: true, // 代理时是否更改host
      //   pathRewrite: {
      //     "^/remotesatelite": "", //这里理解成用'/api'代替target里面的地址,比如我要调用'http://40.00.100.100:3002/user/add'，直接写'/api/user/add'即可
      //   },
      // },
    },
  },
});
