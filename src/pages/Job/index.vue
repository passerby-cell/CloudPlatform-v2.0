<template>
  <div>
    <Transition
      appear
      enter-active-class="animate__animated animate__fadeInLeft"
      leave-active-class="animate__animated animate__fadeOutRight"
    >
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{ $t("sidebar.n2") }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ $t("sidebar.n2_4") }}</el-breadcrumb-item>
      </el-breadcrumb>
    </Transition>
    <el-card
      class="card-style"
      shadow="hover"
      :body-style="{ padding: '0px' }"
      style="height: calc(100vh - 170px); overflow: auto"
    >
      <Transition
        appear
        enter-active-class="animate__animated animate__fadeInLeft"
        leave-active-class="animate__animated animate__fadeOutRight"
      >
        <el-button
          style="
            margin-top: 10px;
            margin-left: 10px;
            padding-right: 8px;
            padding-top: 8px;
            padding-bottom: 8px;
            padding-left: 8px;
          "
          class="el-icon-circle-plus-outline"
          size="mini"
          type="primary"
          @click="toCreateJob"
          >{{ $t("job.newjob") }}</el-button
        >
      </Transition>
      <Transition
        appear
        enter-active-class="animate__animated animate__fadeInLeft"
        leave-active-class="animate__animated animate__fadeOutRight"
      >
        <el-table
          :row-style="{ height: 40 + 'px' }"
          :cell-style="{ padding: 0 + 'px' }"
          style="width: 98.5%; margin-top: 10px; margin-left: 10px"
          :data="formatedJobList"
          :border="true"
          max-height="700"
        >
          <el-table-column
            prop="vcJobCnName"
            :label="$t('job.vcJobCnName')"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span style="cursor: pointer" @click="toJobInfo(scope.$index)">{{
                scope.row.vcJobCnName
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="startTime"
            :label="$t('job.startTime')"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="endTime"
            :label="$t('job.endTime')"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="taskTotal"
            :label="$t('job.taskTotal')"
            width="130"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="taskCompleted"
            :label="$t('job.taskCompleted')"
            width="120"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="taskPending"
            :label="$t('job.taskPending')"
            width="90"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="cpuUsed"
            :label="$t('job.cpuUsed')"
            width="120"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="memUsed"
            :label="$t('job.memUsed')"
            width="120"
          ></el-table-column>
          <el-table-column
            prop="status"
            :label="$t('job.status')"
            width="80"
            align="center"
          >
            <template slot-scope="scope">
              <el-tag
                v-if="scope.row.status == 'Terminated'"
                size="small"
                type="danger"
                >{{ $t("job.statuses[0]") }}</el-tag
              >
              <el-tag
                v-if="scope.row.status == 'Pending'"
                size="small"
                type="warning"
                >{{ $t("job.statuses[1]") }}</el-tag
              >
              <!-- TODO: 任务运行状态 -->
              <el-tag
                size="small"
                v-if="scope.row.status == 'Completed'"
                type="success"
                >{{ $t("job.statuses[2]") }}</el-tag
              >
              <el-tag
                size="small"
                type="warning"
                v-if="scope.row.status == 'No_Running'"
                >{{ $t("job.statuses[3]") }}</el-tag
              >
              <el-tag size="small" v-if="scope.row.status == 'Running'">{{
                $t("job.statuses[4]")
              }}</el-tag>
            </template>
          </el-table-column>
          <!-- TODO: 对任务的操作 -->
          <el-table-column :label="$t('all.caozuo')" width="260" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                v-if="scope.row.status == 'No_Running'"
                @click="startJob(scope.row.clusterId, scope.row.vcJobId)"
                >{{ $t("job.caozuo[0]") }}</el-button
              >
              <el-button
                size="mini"
                type="success"
                @click="openTemplateDialog(scope.row)"
                >{{ $t("job.caozuo[1]") }}</el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click="deleteJob(scope.row.clusterId, scope.row.vcJobId)"
                >{{ $t("job.caozuo[2]") }}</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </Transition>
      <el-col style="text-align: center">
        <Transition
          appear
          enter-active-class="animate__animated animate__fadeInLeft"
          leave-active-class="animate__animated animate__fadeOutRight"
        >
          <el-pagination
            :background="true"
            :page-sizes="[10, 20, 30]"
            :page-size="page"
            layout="prev, pager, next,sizes"
            :page-count="Number(totalpage)"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
          ></el-pagination>
        </Transition>
      </el-col>
    </el-card>
    <el-dialog
      :title="$t('job.info1')"
      :visible.sync="dialogFormVisible"
      width="500px"
    >
      <el-form :model="template" :rules="templateRules" ref="templateForm">
        <el-form-item
          :label="$t('job.cnname')"
          label-width="80px"
          prop="cnName"
        >
          <el-input
            v-model="template.cnName"
            autocomplete="off"
            style="width: 250px"
          ></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('job.enname')"
          label-width="80px"
          prop="enName"
        >
          <el-input
            v-model="template.enName"
            autocomplete="off"
            style="width: 250px"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancleSaveTemplate()">{{
          $t("all.cancle")
        }}</el-button>
        <el-button type="primary" @click="saveTemplate()">{{
          $t("all.confirm")
        }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { reqDeleteJob, reqStartJob, reqSaveJobAsTemplate } from "@/api";
import { formatTime } from "@/utils/time";
export default {
  name: "Job",
  data() {
    return {
      secondBread: "标准作业",
      page: 10,
      dialogFormVisible: false,
      template: {
        cnName: null,
        enName: null,
      },
      templateRules: {
        cnName: [
          {
            required: true,
            message: "请输入作业模板中文名称",
            trigger: "blur",
          },
          {
            min: 3,
            max: 15,
            message: "长度在 3 到 15 个字符",
            trigger: "blur",
          },
        ],
        enName: [
          {
            required: true,
            message: "请输入作业模板英文名称",
            trigger: "blur",
          },
          { min: 3, max: 15, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
      },
      vcJob: {},
    };
  },
  computed: {
    ...mapState("Job", ["joblist", "pagesize", "pagenum", "totalpage"]),
    formatedJobList() {
      let JobList = this.joblist;

      for (let i = 0; i < JobList.length; i++) {
        JobList[i].startTime = formatTime(JobList[i].startTime);
        JobList[i].endTime = formatTime(JobList[i].endTime);
        JobList[i].createTime = formatTime(JobList[i].createTime);
        if (formatTime(JobList[i].startTime) == "1970-01-01 08:00:00") {
          JobList[i].startTime = "";
        }
        if (formatTime(JobList[i].endTime) == "1970-01-01 08:00:00") {
          JobList[i].endTime = "";
        }
      }
      return JobList;
    },
  },
  methods: {
    openTemplateDialog(vcJob) {
      this.dialogFormVisible = true;
      this.vcJob = vcJob;
    },
    cancleSaveTemplate() {
      this.vcJob = {};
      this.dialogFormVisible = false;
      this.$refs["templateForm"].resetFields();
    },
    saveTemplate() {
      let _this = this;
      this.$refs["templateForm"].validate(async (valid) => {
        if (valid) {
          //TODO:发送保存模板的请求
          let result = await reqSaveJobAsTemplate({
            tvcJobName: _this.template.enName,
            tvcJobCnName: _this.template.cnName,
            vcJobId: _this.vcJob.vcJobId,
            envId: 1,
          });
          if (result.code == 200) {
            this.$message({
              type: "success",
              message: result.message,
            });
          } else {
            this.$message.error(result.message);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      this.dialogFormVisible = false;
    },
    async startJob(clusterId, vcJobId) {
      let result = await reqStartJob(clusterId, vcJobId);
      if (result.code == "200") {
        this.$message({
          message: result.message,
          type: "success",
        });
        this.handleCurrentChange(this.pagenum);
      } else {
        this.$message.error(result.message);
      }
    },
    toJobInfo(index) {
      this.$router.push("/jobinfo/" + index);
    },
    toCreateJob() {
      this.$router.push({ name: "standardjob" });
    },
    async deleteJob(clusterId, vcJobId) {
      let result = await reqDeleteJob(clusterId, vcJobId);
      if (result.code == "200") {
        this.$message({
          message: result.message,
          type: "success",
        });
        this.handleCurrentChange(this.pagenum);
      } else {
        this.$message.error(result.message);
      }
    },
    //TODO: 标记行颜色,运行成功的未标记
    tableRowClassName({ rowIndex }) {
      if (this.joblist[rowIndex].status === "Completed") {
        return "success-row";
      }
      if (
        parseInt(this.joblist[rowIndex].cpuUsed.split("C")[0]) >= 5 ||
        parseInt(this.joblist[rowIndex].memUsed.split("G")[0]) >= 10
      ) {
        return "warning-row";
      }
      return "";
    },
    handleCurrentChange(val) {
      this.$store.dispatch("Job/getJobList", {
        //TODO: envId
        envId: 1,
        //TODO: status
        status: null,
        templateId: null,
        //作业类型:标准作业
        vcJobType: "batch",
        currPageNum: val,
        pageSize: this.page,
      });
    },
    handleSizeChange(val) {
      this.page = val;
      this.handleCurrentChange(1);
    },
  },
  mounted() {
    this.handleCurrentChange(1);
  },
};
</script>

<style scoped>
@import "./CSS/info.css";

.el-dialog__body {
  padding: 0px;
}

.el-breadcrumb {
  margin-top: 10px;
  margin-left: 10px;
  font-size: 16px;
}

.el-table {
  font-style: initial;
  font-size: 16px;
}

.card-style {
  margin: 10px;
}
</style>
