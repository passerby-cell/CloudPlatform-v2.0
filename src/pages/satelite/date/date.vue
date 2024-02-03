<template>
  <div>
    <Transition
      appear
      enter-active-class="animate__animated animate__fadeInLeft"
      leave-active-class="animate__animated animate__fadeOutRight"
    >
      <el-breadcrumb separator="/" class="size">
        <el-breadcrumb-item>数据集管理</el-breadcrumb-item>
        <el-breadcrumb-item>日期视图</el-breadcrumb-item>
      </el-breadcrumb> </Transition
    ><el-card
      class="card-style"
      shadow="hover"
      :body-style="{ padding: '10px' }"
      style="height: calc(100vh - 170px); overflow: auto"
    >
      <Transition
        appear
        enter-active-class="animate__animated animate__fadeInLeft"
        leave-active-class="animate__animated animate__fadeOutRight"
        ><h1>1.按日期搜索卫星图像</h1></Transition
      >
      <Transition
        appear
        enter-active-class="animate__animated animate__fadeInLeft"
        leave-active-class="animate__animated animate__fadeOutRight"
      >
        <div class="view_search">
          <table style="background: #999; width: 100%">
            <tr>
              <th class="title">年</th>
              <th class="title">月</th>
              <th class="title">日</th>
            </tr>
            <tr>
              <th>
                <el-select v-model="year" placeholder="请选择年">
                  <el-option
                    v-for="item in yearList"
                    :key="item"
                    :label="item + '年'"
                    :value="item"
                  >
                  </el-option>
                </el-select>
              </th>
              <th>
                <el-select v-model="month" placeholder="请选择月">
                  <el-option
                    v-for="item in monthList"
                    :key="item"
                    :label="item"
                    :value="item"
                  >
                  </el-option>
                </el-select>
              </th>
              <th>
                <el-select v-model="day" placeholder="请选择日">
                  <el-option
                    v-for="item in dayList"
                    :key="item"
                    :label="item"
                    :value="item"
                  >
                  </el-option>
                </el-select>
              </th>
            </tr>
            <tr>
              <td
                style="background: #eec; text-align: center; padding: 0.2em"
                class="BFITEM"
                colspan="5"
              >
                <el-button @click="search(0, 0)">提交</el-button>
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
        ><h1>2.按具体年份搜索卫星</h1></Transition
      >
      <Transition
        appear
        enter-active-class="animate__animated animate__fadeInLeft"
        leave-active-class="animate__animated animate__fadeOutRight"
        ><div class="view_search">
          <table style="background: #999; width: 100%">
            <tr>
              <th colspan="10" class="title">时间</th>
            </tr>

            <tr
              v-for="(item, index) in 7"
              :key="item"
              style="text-align: center"
            >
              <td
                v-for="item1 in 10"
                :key="item1"
                style="
                  background: #def;
                  font-weight: bold;
                  padding: 0.2em 0.4em;
                  font-size: 0.8rem;
                "
                v-show="index % 2 == 0"
                @click="search(0, 1, item1 + 1950 + index * 10)"
              >
                {{ item1 + 1950 + index * 10 }}年
              </td>
              <td
                v-for="item1 in 10"
                :key="item1"
                style="
                  background: white;
                  font-weight: bold;
                  padding: 0.2em 0.4em;
                  font-size: 0.8rem;
                "
                v-show="index % 2 == 1"
                @click="search(0, 1, item1 + 1950 + index * 10)"
              >
                {{ item1 + 1950 + index * 10 }}年
              </td>
            </tr>
            <tr
              style="
                text-align: center;
                background: white;
                font-weight: bold;
                padding: 0.2em 0.4em;
                font-size: 0.8rem;
              "
            >
              <td @click="search(0, 1, 2021)">2021年</td>
              <td @click="search(0, 1, 2022)">2022年</td>
              <td @click="search(0, 1, 2023)">2023年</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </table></div></Transition
    ></el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      year: "",
      yearList: [
        2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012,
        2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000,
      ],
      month: "",
      monthList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      day: "",
      dayList: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
      ],
    };
  },
  methods: {
    reset() {
      this.year = "";
      this.month = "";
      this.day = "";
    },
    search(type, flag, content) {
      if (!content) {
        let all = this.formatDate(this.year, this.month, this.day);
        localStorage.setItem("content", all);
      } else {
        localStorage.setItem("content", content);
      }
      localStorage.setItem("type", type);
      localStorage.setItem("flag", flag);
      this.$router.push("/satelitedata");
    },
    formatDate(year, month, day) {
      // 如果月或日是一位数，则添加前导零
      month = month < 10 ? "0" + month : month;
      day = day < 10 ? "0" + day : day;

      // 组合年月日字符串
      var date = year + "-" + month + "-" + day;

      // 如果只提供了日，而不提供年月，则抛出错误
      if (isNaN(year) || month === "0" || day === "0") {
        this.$notify({
          title: "警告",
          message: "年份月份和天不能为空，如果选择日期，必须提供年月日",
          type: "warning",
        });
        throw new Error("年份月份和天不能为空，如果选择日期，必须提供年月日");
      }
      return date;
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

table {
  border-collapse: collapse;
}

tr td {
  border: 1px solid white;
  line-height: 1.5rem;
}
</style>
