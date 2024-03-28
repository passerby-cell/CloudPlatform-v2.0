//示例:user组件的仓库
import {
  reqData,
  //从api模块中引入请求
} from "@/api";
import { formatFileSize } from "@/utils/file.js";
import { formatTime } from "@/utils/time.js";
//准备actions,用于响应组件中的动作
const actions = {
  //通过api里面的接口函数发送请求,获取服务器的数据

  async getUserInfoDataAccessLevel({ commit }, data) {
    commit("DATAACCESS", data);
  },

  async getData({ commit }, data) {
    let result = await reqData(data);
    if (result.code == 200) {
      if (result.data.content == null) {
        commit("DATA", []);
        commit("TOTALPAGE", 0);
      } else {
        result.data.content.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });

        commit("DATA", result.data.content);
        commit("TOTALPAGE", result.data.total);
      }
    }
  },
};
//准备mutations,用于操作数据--state
const mutations = {
  DATAACCESS(state, DataAccess) {
    state.DataAccess = DataAccess;
  },
  DATA(state, Data) {
    for (let i = 0; i < Data.length; i++) {
      Data[i].size = formatFileSize(Data[i].size);
      Data[i].modified = formatTime(Data[i].modified);
    }
    state.Data = Data;
  },
  TOTALPAGE(state, TotalCount) {
    state.TotalCount = TotalCount;
  },
};
//准备state,用于存储数据,要先准备仓库categoryList,才能存储数据
const state = {
  DataAccess: {},
  Data: [],
  TotalCount: 0,
};

//用于简化数据
const getters = {};

//创建并暴露store
export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters,
};
