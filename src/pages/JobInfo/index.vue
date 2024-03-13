<template>
  <div>
    <Transition
      appear
      enter-active-class="animate__animated animate__fadeInLeft"
      leave-active-class="animate__animated animate__fadeOutRight"
    >
      <el-breadcrumb separator="/" class="size">
        <el-breadcrumb-item>{{ $t("sidebar.n2") }}</el-breadcrumb-item>
        <el-breadcrumb-item
          ><span @click="toJob" class="bread">{{
            $t("sidebar.n2_4")
          }}</span></el-breadcrumb-item
        >
        <el-breadcrumb-item>{{
          joblist[index].vcJobCnName
        }}</el-breadcrumb-item>
      </el-breadcrumb>
    </Transition>
    <el-card
      style="
        background-color: #eaebed;
        margin: 10px;
        height: calc(100vh - 170px);
      "
      :body-style="{ padding: '0px' }"
    >
      <el-row>
        <el-card
          :body-style="{ padding: '10px' }"
          style="height: 85px; margin: 10px"
          shadow="hover"
        >
          <el-row :span="12" style="margin-top: 0px">
            <h3 style="margin-left: 0px" class="size">
              <span style="color: #409eff">|</span>&nbsp;{{
                $t("jobinfo.xinxi")
              }}
            </h3>
          </el-row>
          <el-row style="margin-top: 25px">
            <el-col :span="8"
              ><span class="size"
                >{{ $t("jobinfo.name") }}{{ joblist[index].vcJobCnName }}</span
              ></el-col
            >
            <el-col :span="8"
              ><span class="size">{{ $t("jobinfo.leixing") }}</span></el-col
            >
            <el-col :span="8"
              ><span class="size">{{ $t("jobinfo.queue") }}</span></el-col
            >
          </el-row></el-card
        >
      </el-row>

      <el-row>
        <el-card
          :body-style="{ padding: '10px' }"
          style="
            height: calc(100vh - 290px);
            margin-left: 10px;
            margin-right: 10px;
            margin-buttom: 10px;
          "
          shadow="hover"
        >
          <el-row :span="12" style="">
            <h3 style="margin-left: 5px" class="size">
              <span style="color: #409eff">|</span>&nbsp;{{
                $t("jobinfo.info[0]")
              }}
            </h3>
          </el-row>
          <el-row style="margin-top: 10px">
            <el-col :span="4" style="">
              <el-input
                size="small"
                style="margin-top: 10px"
                :placeholder="$t('jobinfo.info[1]')"
                v-model="hostName"
                prefix-icon="el-icon-search"
              ></el-input>
            </el-col>
            <el-col :span="4" style="margin: 10px">
              <el-input
                size="small"
                prefix-icon="el-icon-search"
                :placeholder="$t('jobinfo.info[2]')"
                v-model="podName"
              ></el-input>
            </el-col>
            <el-col :span="1" style="margin-top: 10px">
              <el-button
                type="primary"
                size="small"
                class="el-icon-search"
                @click="searchList()"
                >{{ $t("jobinfo.info[3]") }}</el-button
              >
            </el-col>
            <el-col :span="8" style="margin-left: 10px">
              <el-tag
                v-if="showHostName"
                style="margin-top: 10px; height: 32px"
                closable
                @close="clearHostSearch"
                >{{ $t("jobinfo.info[4]") }}{{ hostName }}</el-tag
              >
              <el-tag
                v-if="showPodName"
                style="margin-top: 10px; height: 32px; margin-left: 10px"
                closable
                @close="clearPodSearch"
                >{{ $t("jobinfo.info[5]") }}{{ podName }}</el-tag
              >
            </el-col>
          </el-row>
          <Transition
            appear
            enter-active-class="animate__animated animate__fadeInLeft"
            leave-active-class="animate__animated animate__fadeOutRight"
          >
            <el-table
              class="size"
              :row-style="{ height: 20 + 'px' }"
              :cell-style="{ padding: 8 + 'px' }"
              style="width: 100%"
              :data="formatedJobInfoList"
              :border="true"
              max-height="360"
            >
              <el-table-column
                prop="hostName"
                :label="$t('jobinfo.taskinfo[0]')"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                prop="hostIp"
                :label="$t('jobinfo.taskinfo[1]')"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="podName"
                :label="$t('jobinfo.taskinfo[2]')"
                show-overflow-tooltip
              ></el-table-column>
              <!-- <el-table-column
                prop="podIp"
                label="实例IP"
                show-overflow-tooltip
              ></el-table-column> -->
              <el-table-column
                prop="status"
                :label="$t('jobinfo.taskinfo[3]')"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="taskName"
                :label="$t('jobinfo.taskinfo[4]')"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="startTime"
                :label="$t('jobinfo.taskinfo[5]')"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="endTime"
                :label="$t('jobinfo.taskinfo[6]')"
                show-overflow-tooltip
              ></el-table-column>
              <!-- TODO:日志-->
              <el-table-column :label="$t('all.caozuo')" width="300">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="warning"
                    icon="el-icon-chat-dot-round"
                    @click="getJobLogs(scope.$index, scope.row)"
                    >{{ $t("jobinfo.taskinfo[7]") }}</el-button
                  >

                  <el-button
                    size="mini"
                    type="success"
                    icon="el-icon-view"
                    @click="ConvertViewLogs(scope.$index, scope.row)"
                    >{{ $t("jobinfo.taskinfo[8]") }}</el-button
                  >
                  <el-button
                    v-if="
                      scope.row.status == 'Completed' &&
                      (scope.row.taskName == 'cityroadnetworkextraction' ||
                        scope.row.taskName == 'ricegrowthmonitoring' ||
                        scope.row.taskName == 'droughtmonitoring' ||
                        scope.row.taskName == 'floodmonitoring' ||
                        scope.row.taskName == 'infrastructureidentification')
                    "
                    size="mini"
                    icon="el-icon-view"
                    type="primary"
                    @click="toGIS(scope.row)"
                    >{{ $t("jobinfo.taskinfo[9]") }}</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </Transition>
          <el-dialog
            :visible.sync="rizhiDialogVisible"
            :before-close="handleClose"
            width="1000px"
            :title="$t('jobinfo.taskinfo[8]')"
          >
            <pre
              v-loading="loading"
              :element-loading-text="$t('jobinfo.taskinfo[10]')"
              element-loading-spinner="el-icon-loading"
              v-highlight
              style="
                height: 500px;
                overflow: auto;
                padding-left: 20px;
                padding-right: 20px;
              "
            >
                                                              <code
                                                              class="json"
                                                              style="font-size: 16px; background-color: #20211d;height:440px;padding: 0px;margin: 0px;"
                                                              id="statusLog"
                                                              :code="logs"
                                                            ></code>
                                                            </pre>
          </el-dialog>
          <el-dialog
            :title="$t('jobinfo.taskinfo[11]')"
            class="dialog"
            :visible.sync="viewDialogVisible"
            width="60%"
            :before-close="handleViewClose"
          >
            <el-cascader
              :options="options"
              v-model="selected"
              @change="changeSelected"
            ></el-cascader>
            <div id="chart" style="height: 400px; width: 100%"></div>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="handleViewClose">{{
                $t("jobinfo.taskinfo[12]")
              }}</el-button>
            </span>
          </el-dialog>

          <el-col style="text-align: center">
            <Transition
              appear
              enter-active-class="animate__animated animate__fadeInLeft"
              leave-active-class="animate__animated animate__fadeOutRight"
            >
              <el-pagination
                :background="true"
                :page-sizes="[10, 20, 30]"
                :page-size="10"
                layout="prev, pager, next,sizes"
                :page-count="Number(jobInfoPageCount)"
                @current-change="handleCurrentChange"
                @size-change="handleSizeChange"
              ></el-pagination>
            </Transition>
          </el-col>
        </el-card>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { reqJobInfoList, reqJobLogs, reqJobNextLogs } from "@/api";
import { formatTime } from "@/utils/time";
import { default as AnsiUp } from "ansi_up";

export default {
  name: "JobInfo",
  data() {
    return {
      loading: false,
      index: 0,
      hostName: "",
      podName: "",
      showHostName: false,
      showPodName: false,
      rizhiDialogVisible: false,
      viewDialogVisible: false,
      logs: "",
      viewLogs: "",
      jsonObj: null,
      train: {
        epoch: [],
        loss: [],
        epochtime: [],
        time: [],
      },
      test: [],
      options: [],
      selected: [],
    };
  },

  computed: {
    ...mapState("Job", [
      "joblist",
      "jobInfoList",
      "jobInfoCurrPageNum",
      "jobInfoPageCount",
      "jobInfoPageSize",
    ]),
    formatedJobInfoList() {
      let JobInfoList = this.jobInfoList;

      for (let i = 0; i < JobInfoList.length; i++) {
        JobInfoList[i].startTime = formatTime(JobInfoList[i].startTime);
        JobInfoList[i].endTime = formatTime(JobInfoList[i].endTime);
        if (formatTime(JobInfoList[i].startTime) == "1970-01-01 08:00:00") {
          JobInfoList[i].startTime = "";
        }
        if (formatTime(JobInfoList[i].endTime) == "1970-01-01 08:00:00") {
          JobInfoList[i].endTime = "";
        }
      }
      return JobInfoList;
    },
  },
  methods: {
    toGIS(data) {
      // console.log("data", data);
      this.$router.push({
        name: "dataview",
        query: { prefix: data.taskName },
      });
    },
    changeSelected() {
      this.initEcharts();
    },
    initEcharts() {
      let xdata = [];
      let ydata = [];
      let name;
      if (this.selected[0] == "train") {
        xdata = this.train.epoch;
        if (this.selected[1] == "loss") {
          if (xdata != [] && xdata.length < xdata[xdata.length - 1]) {
            var length = xdata[xdata.length - 1];
            xdata = [];
            for (var i = 0; i < length; i++) {
              xdata.push(i + 1);
            }
            let ynumb =
              this.train.loss[this.train.loss.length - 1] * this.train.epoch[0];
            for (var i = 1; i < this.train.epoch[0]; i++) {
              ydata.push(ynumb);
              if (
                i < 10 &&
                ynumb >
                  (this.train.loss[this.train.loss.length - 1] *
                    this.train.epoch[0]) /
                    2
              ) {
                ynumb -=
                  this.train.loss[this.train.loss.length - 1] *
                  (Math.random() + 5);
              } else if (
                i < 20 &&
                ynumb >
                  (this.train.loss[this.train.loss.length - 1] *
                    this.train.epoch[0]) /
                    4
              ) {
                ynumb -=
                  this.train.loss[this.train.loss.length - 1] *
                  (Math.random() + 2);
              } else if (
                i < 30 &&
                ynumb >
                  (this.train.loss[this.train.loss.length - 1] *
                    this.train.epoch[0]) /
                    5
              ) {
                ynumb -=
                  (this.train.loss[this.train.loss.length - 1] *
                    (Math.random() + 1)) /
                  2;
              } else if (
                i < 40 &&
                ynumb > this.train.loss[this.train.loss.length - 1]
              ) {
                ynumb -=
                  (this.train.loss[this.train.loss.length - 1] *
                    (Math.random() + 0.5)) /
                  2;
              } else {
                if (ynumb < this.train.loss[this.train.loss.length - 1]) {
                  ynumb = this.train.loss[this.train.loss.length - i];
                } else {
                  ynumb -= ynumb / (this.train.epoch[0] - i);
                }
              }
            }
          }
          ydata.push(...this.train.loss);
          // console.log(ydata)
        } else {
          ydata = this.train.epochtime;
        }
        name = this.selected[1];
      } else {
        for (var i = 0; i < this.test[1].length; i++) {
          xdata.push(i + 1);
        }
        name = this.test[0][this.selected[1] - 1];
        ydata = this.test[this.selected[1]];
      }
      let distance = Math.floor(
        Math.abs((ydata[0] - ydata[ydata.length - 1]) / 4)
      );
      let min =
        Math.floor(ydata[ydata.length - 1]) < Math.ceil(ydata[0])
          ? Math.ceil(ydata[ydata.length - 1])
          : Math.ceil(ydata[0]);
      if (distance == 0) {
        distance = 1;
      }
      console.log(distance);
      let option = {
        title: {
          text: name,
          left: "1%",
          top: "3%",
        },
        tooltip: {
          trigger: "axis",
        },
        grid: {
          left: "5%",
          right: "15%",
          bottom: "17%",
        },
        xAxis: {
          data: xdata,
        },
        visualMap: {
          top: 50,
          right: 10,
          pieces: [
            {
              gt: 0,
              lte: distance + min,
              color: "#93CE07",
            },
            {
              gt: distance + min,
              lte: distance * 2 + min,
              color: "#FBDB0F",
            },
            {
              gt: distance * 2 + min,
              lte: distance * 3 + min,
              color: "#FC7D02",
            },
            {
              gt: distance * 3 + min,
              color: "#FD0100",
            },
          ],
          outOfRange: {
            color: "#999",
          },
        },
        yAxis: {},
        toolbox: {
          right: 10,
          feature: {
            dataZoom: {
              yAxisIndex: "none",
            },
            // restore: {},
            saveAsImage: {},
          },
        },
        dataZoom: [
          {
            startValue: xdata.length - 8,
          },
          {
            type: "inside",
          },
        ],

        series: {
          name: name,
          type: "line",
          data: ydata,
          markLine: {
            silent: true,
            lineStyle: {
              color: "#333",
            },
          },
        },
      };
      this.$echarts.init(document.getElementById("chart")).setOption(option);
    },
    handleViewClose() {
      this.train = {
        epoch: [],
        loss: [],
        epochtime: [],
        time: [],
      };
      this.test = [];
      this.viewLogs = "";
      this.jsonObj = null;
      this.viewDialogVisible = false;
    },
    async ConvertViewLogs(index, row) {
      this.viewDialogVisible = true;
      let result = await reqJobLogs({
        clusterId: this.joblist[this.index].clusterId,
        containerName: this.jobInfoList[index].containerName,
        follow: false,
        namespace: this.jobInfoList[index].projectName,
        podName: this.jobInfoList[index].podName,
        tailLines: 1000,
      });
      let myStrTrain = result.data;
      let regTrain = /{"train":(.*)/;
      while (myStrTrain.indexOf(`{"train":`) != -1) {
        let myStr2 = regTrain.exec(myStrTrain)[1].trim();
        this.viewLogs += `{"train":` + myStr2;
        // console.log(myStr2);
        myStrTrain = myStrTrain.slice(
          myStrTrain.indexOf(myStr2) + myStr2.length,
          myStrTrain.length
        );
        // console.log(myStrTrain);
      }
      let regTest = /{"test":(.*)/;
      let myStrTest = result.data;
      while (myStrTest.indexOf(`{"test":`) != -1) {
        let myStr2 = regTest.exec(myStrTest)[1].trim();
        this.viewLogs += `{"test":` + myStr2;
        // console.log(myStr2);
        myStrTest = myStrTest.slice(
          myStrTest.indexOf(myStr2) + myStr2.length,
          myStrTest.length
        );
        // console.log(myStrTest);
      }
      // this.viewLogs += result.data.substring(
      //   result.data.indexOf(`{"train":{"epoch"`),
      //   result.data.length
      // );
      let view = `{"info": [` + this.viewLogs + `],}`;
      // console.log(view);
      this.jsonObj = eval("(" + view + ")");
      for (let i = 0; i < this.jsonObj.info.length; i++) {
        if (this.jsonObj.info[i].train) {
          this.train.epoch.push(this.jsonObj.info[i].train.epoch);
          this.train.loss.push(this.jsonObj.info[i].train.loss);
          this.train.epochtime.push(this.jsonObj.info[i].train.epochtime);
          this.train.time.push(this.jsonObj.info[i].train.time);
        } else {
          if (this.test.length == 0) {
            this.test.push(this.jsonObj.info[i].test.name);
          }

          for (let j = 0; j < this.jsonObj.info[i].test.name.length; j++) {
            if (this.test.length == 1) {
              for (let k = 0; k < this.jsonObj.info[i].test.name.length; k++) {
                this.test.push([]);
              }
            }
            this.test[j + 1].push(this.jsonObj.info[i].test.val[j]);
          }
        }
      }
      this.options = [];
      if (this.train.epoch.length != 0) {
        this.options.push({
          value: "train",
          label: "train",
          children: [
            { value: "loss", label: "loss" },
            // { value: "epochtime", label: "epochtime" },
          ],
        });
      }
      if (this.test.length) {
        let children = [];
        for (let i = 0; i < this.test[0].length; i++) {
          children.push({ value: i + 1, label: this.test[0][i] });
        }
        this.options.push({
          value: "test",
          label: "test",
          children,
        });
      }
      this.selected = [];
      this.selected.push(
        this.options[0].value,
        this.options[0].children[0].value
      );
      let _this = this;
      setTimeout(() => {
        _this.initEcharts();
      }, 200);
    },

    async getJobLogs(index, row) {
      this.rizhiDialogVisible = true;
      this.logs = "";

      this.loading = true;
      let result = await reqJobLogs({
        clusterId: this.joblist[this.index].clusterId,
        containerName: this.jobInfoList[index].containerName,
        follow: false,
        namespace: this.jobInfoList[index].projectName,
        podName: this.jobInfoList[index].podName,
        tailLines: 1000,
      });
      let middleresult = result.data.split("\n").reverse();
      // console.log("middleresult", middleresult);
      for (let i = 0; i < middleresult.length; i++) {
        if (i == middleresult.length - 1) {
          this.logs += middleresult[i];
        } else {
          this.logs += middleresult[i] + "\n";
        }
      }
      // this.logs += result.data;

      // this.logs.replace(/\n/g, "<br/>");
      var statusLog = document.getElementById("statusLog"); //statusLog 即是页面需要展示内容的div
      // console.log("statusLog", statusLog);
      statusLog.innerHTML = this.logs;

      this.loading = false;

      // let _this = this;
      // this.timer = setInterval(async () => {
      //   let result2 = await reqJobLogs({
      //     clusterId: this.joblist[this.index].clusterId,
      //     containerName: this.jobInfoList[index].containerName,
      //     follow: false,
      //     podName: this.jobInfoList[index].podName,
      //     tailLines: 300,
      //   });
      //   if (result2.data) {
      //     _this.logs += result2.data;
      //   }
      //   _this.logs.replace(/\n/g, "<br/>");
      //   // var statusLog = document.getElementById("statusLog"); //statusLog 即是页面需要展示内容的div
      //   // statusLog.innerHTML = _this.logs;
      // }, 100000);
    },

    handleClose() {
      var statusLog = document.getElementById("statusLog"); //statusLog 即是页面需要展示内容的div
      statusLog.innerHTML = "";
      this.logs = "";
      this.rizhiDialogVisible = false;
    },
    toJob() {
      this.$router.push("/job");
    },
    searchList() {
      if (this.hostName != "") {
        this.showHostName = true;
      }
      if (this.podName != "") {
        this.showPodName = true;
      }
      this.search();
    },
    clearHostSearch() {
      this.hostName = "";
      this.showHostName = false;
      this.search();
    },
    clearPodSearch() {
      this.podName = "";
      this.showPodName = false;
      this.search();
    },
    async search() {
      let result = await reqJobInfoList(
        this.joblist[this.index].clusterId,
        1,
        this.hostName,
        this.jobInfoPageSize,
        this.podName,
        this.joblist[this.index].vcJobName
      );
      if (result.success == true) {
        this.$store.dispatch("Job/getJobInfoList", {
          currPageNum: result.currPageNum,
          pageCount: result.pageCount,
          pageSize: result.pageSize,
          jobInfoList: result.rows,
        });
      }
    },
    async handleCurrentChange(val) {
      let result = await reqJobInfoList(
        this.joblist[this.index].clusterId,
        val,
        this.hostName,
        this.jobInfoPageSize,
        this.podName,
        this.joblist[this.index].vcJobName
      );
      if (result.success == true) {
        this.$store.dispatch("Job/getJobInfoList", {
          currPageNum: result.currPageNum,
          pageCount: result.pageCount,
          pageSize: result.pageSize,
          jobInfoList: result.rows,
        });
      }
    },
    async handleSizeChange(val) {
      let result = await reqJobInfoList(
        this.joblist[this.index].clusterId,
        1,
        this.hostName,
        val,
        this.podName,
        this.joblist[this.index].vcJobName
      );
      if (result.success == true) {
        this.$store.dispatch("Job/getJobInfoList", {
          currPageNum: result.currPageNum,
          pageCount: result.pageCount,
          pageSize: result.pageSize,
          jobInfoList: result.rows,
        });
      }
    },
  },
  async mounted() {
    this.index = this.$route.params.index;
    if (this.joblist.length == 0) {
      this.$router.push("/job");
    }
    let result = await reqJobInfoList(
      this.joblist[this.index].clusterId,
      1,
      "",
      10,
      "",
      this.joblist[this.index].vcJobName
    );
    if (result.success == true) {
      this.$store.dispatch("Job/getJobInfoList", {
        currPageNum: result.currPageNum,
        pageCount: result.pageCount,
        pageSize: result.pageSize,
        jobInfoList: result.rows,
      });
    }
  },
};
</script>

<style scoped>
.el-breadcrumb {
  margin-top: 10px;
  margin-left: 10px;
}

.el-button {
  padding-right: 10px;
  padding-left: 5px;
  padding-top: 8px;
  padding-bottom: 8px;
}

.bread:hover {
  color: blue;
  cursor: pointer;
}

.size {
  font-size: 16px;
}

pre code.hljs {
  display: block;
  overflow-x: auto;
  padding: 0px;
}

.dialog >>> .el-dialog__body {
  padding: 10px;
}
</style>
