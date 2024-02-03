<template>
  <div>
    <Transition
      appear
      enter-active-class="animate__animated animate__fadeInLeft"
      leave-active-class="animate__animated animate__fadeOutRight"
    >
      <el-breadcrumb separator="/" class="size">
        <el-breadcrumb-item>数据集管理</el-breadcrumb-item>
        <el-breadcrumb-item>卫星视图</el-breadcrumb-item>
      </el-breadcrumb> </Transition
    ><el-card
      class="card-style"
      shadow="hover"
      :body-style="{ padding: '10px' }"
      style="height: calc(100vh - 170px); overflow: auto"
      ><Transition
        appear
        enter-active-class="animate__animated animate__fadeInLeft"
        leave-active-class="animate__animated animate__fadeOutRight"
      >
        <h1>1.按卫星搜索卫星图像</h1></Transition
      >
      <Transition
        appear
        enter-active-class="animate__animated animate__fadeInLeft"
        leave-active-class="animate__animated animate__fadeOutRight"
      >
        <div class="view_search">
          <table style="background: #999; width: 100%">
            <tr>
              <td class="title">卫星</td>
              <td>
                <el-input
                  v-model="satellite"
                  placeholder="请输入卫星"
                ></el-input>
              </td>
            </tr>
            <tr>
              <td
                style="background: #eec; text-align: center; padding: 0.2em"
                colspan="2"
              >
                <el-button @click="search(2, 0, satellite)">提交</el-button>
                <el-button @click="reset">重置</el-button>
              </td>
            </tr>
          </table>
        </div></Transition
      >
      <Transition
        appear
        enter-active-class="animate__animated animate__fadeInLeft"
        leave-active-class="animate__animated animate__fadeOutRight"
      >
        <h1>2.按准确地卫星搜索卫星图像</h1></Transition
      >
      <Transition
        appear
        enter-active-class="animate__animated animate__fadeInLeft"
        leave-active-class="animate__animated animate__fadeOutRight"
        ><div class="view_search">
          <table style="background: #999; width: 100%">
            <tr>
              <th colspan="10" class="title">卫星</th>
            </tr>
            <tr style="text-align: center">
              <td
                v-for="item in satelliteList"
                :key="item"
                style="
                  background: #def;
                  font-weight: bold;
                  padding: 0.2em 0.4em;
                  font-size: 0.8rem;
                "
                @click="search(2, 1, item)"
              >
                {{ item }}
              </td>
            </tr>
          </table>
        </div></Transition
      ></el-card
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      satellite: "",
      satelliteList: ["GF1", "GF2", "GF3", "GF4", "GF5", "GF6", "ZY3"],
    };
  },
  methods: {
    reset() {
      this.satellite = "";
    },
    search(type, flag, content) {
      localStorage.setItem("content", content);
      localStorage.setItem("type", type);
      localStorage.setItem("flag", flag);
      this.$router.push("/satelitedata");
    },
  },
};
</script>

<style scoped>
.el-breadcrumb {
  margin-top: 10px;
  margin-left: 10px;
}
.card-style {
  margin: 10px;
}
h1 {
  font-size: 1.5rem;
  border-color: #e00;
  border-width: 1px 0em 0em 30px;
  border-style: solid;
  padding: 0.1em 0.5em 0.1em 0.5em;
  margin: 15px 30px 0px 0px;
  color: #000;
  font-weight: bold;
  text-align: left;
}

.view_search {
  margin: 20px 30px;
}

.title {
  font-size: 1.2rem;
  background: #05a;
  text-align: center;
  padding: 0.2em 0.6em;
  color: #eee;
  font-weight: bold;
}

.title {
  font-size: 1.2rem;
  background: #05a;
  text-align: center;
  padding: 0.2em 0.6em;
  color: #eee;
  font-weight: bold;
}

table {
  border-collapse: collapse;
}

tr td {
  border: 1px solid white;
  line-height: 1.5rem;
}
</style>
