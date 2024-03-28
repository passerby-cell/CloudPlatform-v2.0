<template>
  <div>
    <Transition
      appear
      enter-active-class="animate__animated animate__fadeInLeft"
      leave-active-class="animate__animated animate__fadeOutRight"
    >
      <el-breadcrumb separator="/" class="size">
        <el-breadcrumb-item>{{ $t("sidebar.n2") }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ $t("sidebar.n2_2") }}</el-breadcrumb-item>
      </el-breadcrumb>
    </Transition>

    <el-row>
      <el-col :span="12"
        ><el-card
          shadow="hover"
          :body-style="{ padding: '10px' }"
          style="height: calc(100vh - 170px); overflow: auto; margin-left: 10px"
        >
          <el-row style="padding-top: 0px; margin-top: 0px">
            <h3 class="size">
              <span style="color: #409eff">|</span>&nbsp;{{
                $t("createimage.createflow")
              }}
            </h3>
          </el-row>
          <el-row>
            <el-button
              icon="el-icon-plus"
              size="small"
              type="primary"
              @click="createDialogVisible = true"
            >
              {{ $t("createimage.createnew") }}
            </el-button>
            <el-dialog
              :title="$t('createimage.createnew')"
              :visible.sync="createDialogVisible"
              width="400px"
              :before-close="handleClose"
              class="dialogClass"
            >
              <el-row style="padding-left: 20px; padding-right: 20px">
                <el-input
                  size="mini"
                  v-model="newImageName"
                  :placeholder="$t('createimage.createnewname')"
                ></el-input>
              </el-row>

              <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose" size="small">{{
                  $t("all.cancle")
                }}</el-button>
                <el-button
                  type="primary"
                  @click="createNewImageProcess()"
                  size="small"
                  >{{ $t("all.confirm") }}</el-button
                >
              </span>
            </el-dialog>
          </el-row>
          <el-row>
            <h3 class="size">
              <span style="color: #409eff">|</span>&nbsp;{{
                $t("createimage.createflowbiao")
              }}
            </h3>
          </el-row>
          <Transition
            appear
            enter-active-class="animate__animated animate__fadeInLeft"
            leave-active-class="animate__animated animate__fadeOutRight"
          >
            <div style="height: calc(100vh-150px); overflow: auto">
              <el-table
                :row-style="{ height: 30 + 'px' }"
                :cell-style="{ padding: 0 + 'px' }"
                style="margin-top: 10px"
                :data="imageProcessList"
                :border="true"
                max-height="600"
              >
                <el-table-column
                  prop="name"
                  :label="$t('createimage.flowname')"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  prop="step1"
                  :label="$t('createimage.file')"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  prop="step2"
                  :label="$t('createimage.cangku')"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  prop="step3"
                  :label="$t('createimage.push')"
                  show-overflow-tooltip
                >
                  <!-- <template slot-scope="scope">
                    <span
                      v-if="
                        !scope.row.step3 && scope.row.step1 && scope.row.step2
                      "
                      style="color: #568bfa; cursor: pointer"
                      >日志</span
                    >
                    <span v-if="scope.row.step3">{{ scope.row.step3 }}</span>
                  </template> -->
                </el-table-column>
                <el-table-column
                  prop="step3"
                  :label="$t('createimage.status')"
                  width="80"
                  align="center"
                >
                  <template slot-scope="scope">
                    <el-tag
                      size="mini"
                      v-if="scope.row.step3logs"
                      type="success"
                      >{{ $t("createimage.success") }}</el-tag
                    >
                    <el-tag
                      size="mini"
                      type="danger"
                      v-if="
                        !scope.row.step3 &&
                        scope.row.path != null &&
                        scope.row.step2 &&
                        scope.row.step3logs
                      "
                      >{{ $t("createimage.fail") }}</el-tag
                    >
                    <el-tag
                      size="mini"
                      type="success"
                      v-if="scope.row.path != null && !scope.row.step3logs"
                      >{{ $t("createimage.pending") }}</el-tag
                    >
                    <el-tag
                      size="mini"
                      type="warning"
                      v-if="!scope.row.step1 && !scope.row.path"
                      >{{ $t("createimage.notstart") }}</el-tag
                    >
                  </template>
                </el-table-column>

                <el-table-column
                  :label="$t('createimage.caozuo')"
                  width="80"
                  align="center"
                >
                  <template slot-scope="scope">
                    <i
                      class="el-icon-edit"
                      style="cursor: pointer"
                      @click="editImageProcess(scope.$index)"
                    ></i>
                    <i
                      class="el-icon-delete"
                      style="margin-left: 10px; cursor: pointer"
                      @click="deleteImageProcess(scope.row.id)"
                    ></i>
                  </template>
                </el-table-column>
              </el-table></div
          ></Transition>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card
          shadow="hover"
          :body-style="{ padding: '0px' }"
          style="
            height: calc(100vh - 170px);
            overflow: auto;
            margin-left: 10px;
            margin-right: 10px;
            padding: 10px;
          "
        >
          <el-row>
            <el-col :span="6"
              ><h3 class="size">
                <span style="color: #409eff">|</span>&nbsp;{{
                  $t("createimage.flow")
                }}
              </h3></el-col
            >
            <el-col :span="6" v-if="showSteps"
              ><h3 style="margin-left: 10px" class="size">
                {{ $t("createimage.nowflow") }}
                <el-tag size="mini" type="primary">{{
                  imageProcessList[processIndex].name
                }}</el-tag>
              </h3>
            </el-col>
          </el-row>
          <!-- <el-result
            v-if="!showSteps"
            style="height: 100%; margin-top: 150px"
            icon="info"
            title="信息提示"
            subTitle="请新建镜像制作流程或编辑已有流程"
          >
          </el-result> -->
          <el-steps
            :active="activeIndex"
            style="margin-top: 10px"
            v-if="showSteps"
          >
            <el-step
              :title="$t('createimage.file')"
              icon="el-icon-folder-checked"
            >
            </el-step>
            <el-step
              :title="$t('createimage.cangku')"
              icon="el-icon-edit-outline"
            ></el-step>
            <el-step
              :title="$t('createimage.push')"
              icon="el-icon-upload2"
            ></el-step>
          </el-steps>
          <template v-if="activeIndex == 1">
            <el-row>
              <h3 class="size">
                <span style="color: #409eff">|</span>&nbsp;{{
                  $t("createimage.modelbiao")
                }}
              </h3>
            </el-row>
            <el-table
              :row-style="{ height: 40 + 'px' }"
              :cell-style="{ padding: 0 + 'px' }"
              style="margin-top: 10px"
              :data="data"
              :border="true"
              max-height="470"
              @row-click="updatePath"
            >
              <el-table-column
                property="name"
                :label="$t('createimage.modelname')"
              ></el-table-column>
              <el-table-column
                property="catalog"
                :label="$t('createimage.path')"
              ></el-table-column>
            </el-table>
            <el-row style="margin-top: 10px; font-size: 20px">
              <el-input v-model="path" size="small" style="width: 100%">
                <template slot="prepend">{{
                  $t("createimage.filepath")
                }}</template>
              </el-input>
            </el-row>
            <el-row style="margin-top: 10px; font-size: 16px">
              <el-col :span="11">
                <el-input v-model="imageName" size="small" style="width: 100%">
                  <template slot="prepend">{{
                    $t("createimage.imagename")
                  }}</template>
                </el-input>
              </el-col>
              <el-col :span="11" :offset="2">
                <el-input
                  v-model="imageVersion"
                  size="small"
                  style="width: 100%"
                >
                  <template slot="prepend">{{
                    $t("createimage.imageversion")
                  }}</template>
                </el-input>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8" :offset="16">
                <el-button
                  size="small"
                  type="primary"
                  style="float: right"
                  @click="buildImage()"
                  >{{ $t("createimage.build") }}</el-button
                >
              </el-col>
            </el-row>
          </template>
          <template v-if="activeIndex == 2">
            <el-row>
              <h3 class="size">
                <span style="color: #409eff">|</span>&nbsp;{{
                  $t("createimage.imageinfo")
                }}
              </h3>
            </el-row>

            <el-row style="margin-top: 10px; font-size: 16px">
              <el-col :span="11">
                <el-input
                  v-model="imageNamed"
                  disabled
                  size="small"
                  style="width: 100%"
                >
                  <template slot="prepend">{{
                    $t("createimage.imagename")
                  }}</template>
                </el-input>
              </el-col>
              <el-col :span="11" :offset="2">
                <el-input
                  disabled
                  v-model="imageVersioned"
                  size="small"
                  style="width: 100%"
                >
                  <template slot="prepend">{{
                    $t("createimage.imageversion")
                  }}</template>
                </el-input>
              </el-col>
            </el-row>

            <el-row>
              <h3 class="size">
                <span style="color: #409eff">|</span>&nbsp;{{
                  $t("createimage.imagecangku")
                }}
              </h3>
            </el-row>
            <el-row>
              <el-col :span="11">
                <el-select
                  v-model="repositoryDir"
                  size="small"
                  style="width: 100%"
                >
                  <el-option
                    v-for="(item, index) in imageCatalogList"
                    :key="index"
                    :label="
                      item.envName == 'cluster-default-default'
                        ? 'private'
                        : item.envName
                    "
                    :value="item.pushCatalog"
                  >
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="11" :offset="2">
                <el-button size="small" type="primary" @click="TagImage()">{{
                  $t("all.confirm")
                }}</el-button>
              </el-col>
            </el-row>
          </template>
          <template v-if="activeIndex == 3">
            <el-row>
              <h3 class="size">
                <span style="color: #409eff">|</span>&nbsp;{{
                  $t("createimage.imageinfo")
                }}
              </h3>
            </el-row>

            <el-row style="margin-top: 10px; font-size: 16px">
              <el-col :span="11">
                <el-input
                  v-model="imageNamed"
                  disabled
                  size="small"
                  style="width: 100%"
                >
                  <template slot="prepend">{{
                    $t("createimage.imagename")
                  }}</template>
                </el-input>
              </el-col>
              <el-col :span="11" :offset="2">
                <el-input
                  disabled
                  v-model="imageVersioned"
                  size="small"
                  style="width: 100%"
                >
                  <template slot="prepend">{{
                    $t("createimage.imageversion")
                  }}</template>
                </el-input>
              </el-col>
            </el-row>
            <el-row>
              <h3 class="size">
                <span style="color: #409eff">|</span>&nbsp;{{
                  $t("createimage.mubiaocangku")
                }}
              </h3>
            </el-row>
            <el-row style="margin-top: 10px; font-size: 16px">
              <el-col :span="11">
                <el-input
                  v-model="repositoryDired"
                  disabled
                  size="small"
                  style="width: 100%"
                >
                  <template slot="prepend">{{
                    $t("createimage.cangkuname")
                  }}</template>
                </el-input>
              </el-col>
            </el-row>

            <el-row>
              <h3 class="size">
                <span style="color: #409eff">|</span>&nbsp;{{
                  $t("createimage.leibie")
                }}
              </h3>
            </el-row>
            <el-row style="margin-top: 10px; font-size: 16px">
              <el-col
                :span="11"
                v-if="!imageProcessList[processIndex].imageCatalog"
              >
                <el-select v-model="catalog" size="small" style="width: 100%">
                  <el-option :label="$t('all.road')" value="城市路网提取">
                  </el-option>
                  <el-option :label="$t('all.rice')" value="水稻长势监测">
                  </el-option>
                  <el-option :label="$t('all.flood')" value="洪涝灾害监测">
                  </el-option>
                  <el-option :label="$t('all.building')" value="基础设施识别">
                  </el-option>
                  <el-option :label="$t('all.drought')" value="旱情监测">
                  </el-option>
                  <el-option :label="$t('all.other')" value="其他"> </el-option>
                </el-select>
              </el-col>
              <el-col
                :span="11"
                v-if="imageProcessList[processIndex].imageCatalog"
              >
                <el-input
                  v-model="imageProcessList[processIndex].imageCatalog"
                  disabled
                  size="small"
                  style="width: 100%"
                >
                  <template slot="prepend">{{
                    $t("createimage.leibiename")
                  }}</template>
                </el-input>
              </el-col>
              <el-col :span="3" :offset="2">
                <el-button
                  v-if="!imageProcessList[processIndex].step3"
                  size="small"
                  type="primary"
                  @click="imagePush"
                  >{{ $t("createimage.dopush") }}</el-button
                >
              </el-col>
              <el-col :span="3" :offset="1">
                <el-button
                  v-if="imageProcessList[processIndex].step3logs"
                  size="small"
                  type="primary"
                  @click="showLogs"
                  >{{ $t("createimage.log") }}</el-button
                >
              </el-col>
            </el-row>
            <el-row v-if="showloading">
              <h3 class="size">
                <span style="color: #409eff">|</span>&nbsp;{{
                  $t("createimage.shibie")
                }}
              </h3>
            </el-row>
            <el-row
              v-if="showloading"
              v-loading="reloading"
              :element-loading-text="$t('createimage.shibieing')"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(255, 255, 255)"
              ><div class="size">
                <el-tag type="success">{{
                  $t("createimage.shibie_success")
                }}</el-tag>
              </div></el-row
            >
            <div
              v-show="showlogs && imageProcessList[processIndex].step3logs"
              style="margin-top: 10px"
            >
              <pre
                v-highlight
                style="height: 250px; overflow: auto; padding: 0px"
              >
                  <code
                  class="python"
                  style="font-size: 16px; background-color: #20211d;height:100%"
                  id="statusLog"
                  :code="imageProcessList[processIndex].step3logs"
                ></code>
                </pre>
            </div>
          </template>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from "vuex";

import {
  reqImageOverview,
  reqUserInfoCreateImageProcess,
  reqUserInfoDeleteImageProcess,
  reqUserInfoGetImageProcessList,
  reqUserInfoUpdateImageProcessStepOne,
  reqUserInfoUpdateImageProcessStepTwo,
  reqUserInfoUpdateImageProcessStepThree,
  reqDataSet,
  reqQueueList,
  reqWareHouseList,
  reqWareHouseImageList,
  reqImagelIST,
} from "@/api";
import { Loading } from "element-ui";

export default {
  name: "CreateImage",
  data() {
    return {
      reloading: true,
      catalog: "",
      showlogs: false,
      repositoryDir: "",
      imageName: "",
      // imageVersion: "",
      path: "",
      createDialogVisible: false,
      newImageName: "",
      showSteps: "",
      activeIndex: 0,
      processIndex: 0,
    };
  },
  computed: {
    ...mapState("ImageProcess", ["imageProcessList"]),
    ...mapState("CreateJob", ["data", "imageCatalogList", "warehouseList"]),
    ...mapState("Image", [
      "warehouseId",
      "warehouseName",
      "imageCatalogs",
      "imageList",
      "totalCount",
      "currPageNum",
    ]),
    imageVersion() {
      return "v" + Date.parse(new Date()) / 1000;
    },
    imageNameAndVersion() {
      return this.imageName + ":" + this.imageVersion;
    },
    imageNamed() {
      return this.imageProcessList[this.processIndex].step1.split(":")[0];
    },
    showloading() {
      return this.imageProcessList[this.processIndex].step3logs != null;
    },
    imageVersioned() {
      return this.imageProcessList[this.processIndex].step1.split(":")[1];
    },
    repositoryDired() {
      return this.imageProcessList[this.processIndex].parentCatalog == 1
        ? "private"
        : "public";
    },
    logs() {
      return this.imageProcessList[this.processIndex].step3logs;
    },
  },
  methods: {
    async handleCurrentChange(index, name) {
      console.log("index", index);
      console.log("name", name);
      let result = await reqImagelIST(
        1,
        this.imageCatalogs[index].catalogId,
        this.imageCatalogs[index].catalogType,
        name,
        100,
        this.warehouseId
      );
      if (result.success == true && result.rows != null) {
        this.$store.dispatch("Image/getImageList", {
          imageList: result.rows,
          totalCount: result.totalCount,
          currPageNum: result.currPageNum,
        });
      }
      for (let i = 0; i < this.imageList.length; i++) {
        if (this.imageList[i].imageTag == this.imageVersioned) {
          this.reloading = false;
        }
      }
    },
    async imagePush() {
      if (this.catalog) {
        let loading = Loading.service({
          fullscreen: true,
          text: "请勿刷新页面或关闭浏览器...",
        });
        let result = await reqUserInfoUpdateImageProcessStepThree({
          id: this.showSteps,
          filepath: this.imageProcessList[this.processIndex].path,
          imageTag: this.imageProcessList[this.processIndex].step2,
          imageCatalog: this.catalog,
          parentCatalog: this.repositoryDir == "public" ? 0 : 1,
        });
        if (result.code == 200) {
          this.$store.dispatch("ImageProcess/getImageProcessList");
          loading.close();
          this.$message({
            type: "success",
            message: "推送成功",
          });
          this.handleAsync();
        }
      } else {
        this.$message.error("请选择镜像所属的分类");
      }
    },
    showLogs() {
      this.showlogs = !this.showlogs;
      this.initLogs();
    },
    initLogs() {
      if (this.imageProcessList[this.processIndex].step3logs != null) {
        this.imageProcessList[this.processIndex].step3logs.replace(
          /\n/g,
          "<br/>"
        );
        console.log(this.imageProcessList[this.processIndex].step3logs);
        var statusLog = document.getElementById("statusLog"); //statusLog 即是页面需要展示内容的div
        statusLog.innerHTML =
          this.imageProcessList[this.processIndex].step3logs;
      } else {
        var statusLog = document.getElementById("statusLog"); //statusLog 即是页面需要展示内容的div
        statusLog.innerHTML = null;
      }
    },
    async TagImage() {
      if (this.repositoryDir == "") {
        this.$message({ type: "warning", message: "请选择镜像仓库" });
      } else {
        let loading = Loading.service({
          fullscreen: true,
          text: "请勿刷新页面或关闭浏览器...",
        });

        let result = await reqUserInfoUpdateImageProcessStepTwo({
          id: this.showSteps,
          filepath: this.imageProcessList[this.processIndex].path,
          imageNameAndVersion: this.imageProcessList[this.processIndex].step1,
          imageTag:
            "abcsys.cn:5000/" +
            this.repositoryDir +
            "/" +
            this.imageProcessList[this.processIndex].step1,
          parentCatalog: this.repositoryDir == "public" ? 0 : 1,
        });
        if (result.code == "200") {
          loading.close();
          this.$message({ type: "success", message: "操作成功" });
          this.$store.dispatch("ImageProcess/getImageProcessList");
          this.activeIndex = 3;
          this.getWareHouseList();
        } else {
          this.$message.error(result.message);
          loading.close();
        }
      }
    },
    async getWareHouseList() {
      let result1 = await reqQueueList();
      if (result1.success == true) {
        this.$store.dispatch("CreateJob/getQueueList", result1.rows);
        let result2 = await reqWareHouseList(result1.rows[0].clusterId);
        if (result2.code == "200") {
          this.$store.dispatch("CreateJob/getWareHouseList", result2.data);
          let result3 = await reqWareHouseImageList(
            result2.data[0].warehouseId
          );
          if (result3.code == "200") {
            this.$store.dispatch(
              "CreateJob/getWareHouseImageList",
              result3.data
            );
          }
        }
      }
    },
    async buildImage() {
      let flag = true;
      if (this.path == "") {
        flag = false;
        this.$message({ type: "warning", message: "请选择文件路径" });
      } else if (this.imageName == "") {
        flag = false;
        this.$message({ type: "warning", message: "请输入镜像名称" });
      } else if (this.imageVersion == "") {
        flag = false;
        this.$message({ type: "warning", message: "请输入镜像版本" });
      }
      if (flag) {
        let loading = Loading.service({
          fullscreen: true,
          text: "请勿刷新页面或关闭浏览器...",
        });
        let result = await reqUserInfoUpdateImageProcessStepOne({
          id: this.showSteps,
          filepath: this.path,
          imageNameAndVersion: this.imageNameAndVersion,
        });
        if (result.code == "200") {
          loading.close();
          this.$message({ type: "success", message: "构建成功" });
          this.$store.dispatch("ImageProcess/getImageProcessList");
          this.activeIndex = 2;
          this.getWareHouseList();
          this.imageVersion = "";
          this.imageName = "";
          this.path = "";
        } else {
          this.$message.error(result.message);
          loading.close();
        }
      }
    },
    updatePath(row, event, column) {
      this.path = row.catalog;
      // console.log(row.name);
      this.imageName = row.name.toLowerCase();
    },
    async getDataSet() {
      let result = await reqDataSet(1);
      if (result.code == 200) {
        this.$store.dispatch("CreateJob/getDataSet", result.data);
      }
    },
    editImageProcess(index) {
      this.showSteps = this.imageProcessList[index].id;
      console.log(this.imageProcessList[index].id);
      this.processIndex = index;
      this.handleActiveIndex(this.imageProcessList[index]);
      this.getDataSet();
      this.getWareHouseList();
      this.showlogs = false;
      if (this.imageProcessList[index].step3logs) {
        let _this = this;
        this.reloading = true;
        setTimeout(() => {
          _this.handleAsync(index);
        }, 3000);
      }
    },
    handleAsync() {
      this.reloading = true;
      let name = this.repositoryDired == "private" ? "t1" : "public";
      let tag = 0;
      for (let i = 0; i < this.imageCatalogList.length; i++) {
        if (this.imageCatalogList[i].pushCatalog == name) {
          tag = i;
        }
      }
      this.handleCurrentChange(tag, this.imageNamed);
      if (this.reloading) {
        let timer = setInterval(() => {
          if (this.reloading) {
            this.handleCurrentChange(tag, this.imageNamed);
          } else {
            clearInterval(timer);
          }
        }, 30000);
      }
    },
    async deleteImageProcess(id) {
      let result = await reqUserInfoDeleteImageProcess(id);
      if (result.code == 200) {
        this.$message({
          type: "success",
          message: "删除成功",
        });
        if (this.showSteps == id) {
          this.showSteps = "";
          this.processIndex = 0;
          this.showlogs = false;
          this.activeIndex = 0;
        }
        this.$store.dispatch("ImageProcess/getImageProcessList");
      } else {
        this.$message.error("删除失败");
      }
    },
    async createNewImageProcess() {
      if (this.newImageName == "") {
        this.$message.error("流程名不能为空");
      } else {
        let result = await reqUserInfoCreateImageProcess(this.newImageName);
        if (result.code == "200") {
          this.createDialogVisible = false;
          this.$message({
            type: "success",
            message: "新建成功",
          });

          this.$store.dispatch("ImageProcess/getImageProcessList");
          let _this = this;
          result.data.forEach((item, index) => {
            if (item.name == _this.newImageName) {
              _this.showSteps = item.id;
              _this.processIndex = index;
            }
          });
          this.handleActiveIndex(result.data[this.processIndex]);
          this.newImageName = "";
        } else {
          this.$message.error(result.message);
        }
      }
    },
    handleActiveIndex(imageProcess) {
      if (!imageProcess.step1) {
        this.activeIndex = 1;
      } else if (imageProcess.step1 && !imageProcess.step2) {
        this.activeIndex = 2;
      } else {
        this.activeIndex = 3;
      }
    },
    handleClose(done) {
      let _this = this;
      this.$confirm("确认关闭？")
        .then((_) => {
          _this.createDialogVisible = false;
          _this.newImageName = "";
          done();
        })
        .catch((_) => {});
    },
  },
  async mounted() {
    this.$store.dispatch("ImageProcess/getImageProcessList");
    let result = await reqImageOverview(1);
    if (result.code == "200") {
      this.$store.dispatch("Image/getImageOverview", {
        warehouseId: result.data.warehouseInfo[0].warehouseId,
        warehouseName: result.data.warehouseInfo[0].warehouseName,
        imageCatalogs: result.data.warehouseInfo[0].imageCatalogs,
      });
    }
    let _this = this;
    setTimeout(() => {
      _this.editImageProcess(0);
    }, 1000);
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
  height: 650px;
}
.el-row {
  margin-top: 10px;
  width: 100%;
}
.el-select {
  width: 340px;
}

.el-form {
  align-items: flex-start;
}
.h3 {
  margin-top: 10px;
  margin-left: 10px;
}
.size {
  font-size: 16px;
}
.el-form-item >>> .el-form-item__error {
  padding: 0px;
}
.dialogClass .el-dialog__body {
  padding: 0px;
  margin: 0px;
  overflow-y: auto;
}
</style>
