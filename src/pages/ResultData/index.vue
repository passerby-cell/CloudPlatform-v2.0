<template>
  <div>
    <Transition
      appear
      enter-active-class="animate__animated animate__fadeInLeft"
      leave-active-class="animate__animated animate__fadeOutRight"
    >
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{ $t("sidebar.n3") }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ $t("sidebar.n3_3") }}</el-breadcrumb-item>
      </el-breadcrumb>
    </Transition>
    <el-row>
      <el-col :span="4">
        <el-card class="left-card" :body-style="{ padding: '0px' }"
          ><Transition
            appear
            enter-active-class="animate__animated animate__fadeInLeft"
            leave-active-class="animate__animated animate__fadeOutRight"
          >
            <el-row>
              <el-col :span="16" style="margin-top: 12px">
                <h3 style="margin-left: 5px" class="size">
                  <span style="color: #409eff">|</span>&nbsp;{{
                    $t("result.info[0]")
                  }}
                </h3>
              </el-col>
              <el-col :span="8"
                ><el-button
                  style="
                    margin-top: 10px;
                    padding-right: 5px;
                    padding-top: 5px;
                    padding-bottom: 5px;
                    padding-left: 3px;
                  "
                  type="primary"
                  icon="el-icon-circle-plus-outline"
                  size="mini"
                  @click="parentFileDialogVisible = true"
                  >{{ $t("result.new") }}</el-button
                ></el-col
              ></el-row
            >
          </Transition>
          <el-dialog
            :title="$t('result.info[1]')"
            :visible.sync="parentFileDialogVisible"
            width="30%"
            :before-close="handleClose"
          >
            <el-input
              :placeholder="$t('result.info[2]')"
              size="small"
              v-model="newParentFileName"
            ></el-input>
            <span slot="footer" class="dialog-footer">
              <el-button
                @click="parentFileDialogVisible = false"
                size="small"
                >{{ $t("all.cancle") }}</el-button
              >
              <el-button
                type="primary"
                @click="createParentFile"
                size="small"
                >{{ $t("all.confirm") }}</el-button
              >
            </span>
          </el-dialog>
          <!-- <el-divider></el-divider> -->
          <Transition
            appear
            enter-active-class="animate__animated animate__fadeInLeft"
            leave-active-class="animate__animated animate__fadeOutRight"
          >
            <el-row>
              <el-table
                class="size"
                highlight-current-row
                :show-header="false"
                style="width: 100%; margin-top: 10px"
                max-height="600px"
                :row-style="{ height: 0 + 'px' }"
                :cell-style="{ padding: 0 + 'px' }"
                :data="parentFileList"
              >
                <el-table-column
                  prop="name"
                  label="文件名"
                  align="left"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <span
                      @click="
                        updateChileFileList(
                          scope.row.id,
                          pageNum,
                          null,
                          scope.row.name
                        )
                      "
                      class="parentIcon"
                      >{{ scope.row.name }}</span
                    >
                  </template>
                </el-table-column>
                <el-table-column label="操作" align="right" width="60px">
                  <template slot-scope="scope">
                    <el-row>
                      <el-col :span="12">
                        <i
                          class="el-icon-edit-outline parentIcon"
                          @click="updateParentFileNameDialogVisible(scope.row)"
                        ></i> </el-col
                      ><el-col :span="12">
                        <i
                          class="el-icon-delete parentIcon"
                          style="margin-left: 10px"
                          @click="deleteParentFile(scope.row.id)"
                        ></i></el-col
                    ></el-row>
                  </template>
                </el-table-column> </el-table
              ><el-dialog
                :title="$t('result.info[3]')"
                :visible.sync="parentFileNameDialogVisible"
                width="30%"
                :before-close="handleClose"
              >
                <el-input
                  :placeholder="$t('result.info[4]')"
                  size="small"
                  v-model="newParentFileName"
                ></el-input>
                <span slot="footer" class="dialog-footer">
                  <el-button
                    @click="parentFileNameDialogVisible = false"
                    size="small"
                    >{{ $t("all.cancle") }}</el-button
                  >
                  <el-button
                    type="primary"
                    @click="updateParentFileName()"
                    size="small"
                    >{{ $t("all.confirm") }}</el-button
                  >
                </span>
              </el-dialog>
            </el-row>
          </Transition>
        </el-card>
      </el-col>
      <el-col :span="20">
        <el-card
          :body-style="{ padding: '0px' }"
          style="
            height: calc(100vh - 170px);
            margin-top: 10px;
            margin-left: 10px;
            overflow: auto;
          "
        >
          <el-row style="margin-top: 10px">
            <el-col :span="4">
              <h3 class="size" style="margin-left: 5px; margin-top: 3px">
                <span class="size" style="color: #409eff">|</span>&nbsp;{{
                  $t("result.info[5]")
                }}
              </h3>
            </el-col>
            <el-col :span="20"
              ><h3 class="size" v-if="parentFileName" style="margin-top: 3px">
                {{ $t("result.info[6]") }}
                <el-tag size="small">{{ parentFileName }}</el-tag>
              </h3></el-col
            >
          </el-row>
          <el-row style="margin-top: 10px; margin-left: 10px; font-size: 20px">
            <el-input
              v-model="dirpath"
              disabled
              size="small"
              style="width: 99%"
            >
              <template slot="prepend"> {{ $t("result.info[7]") }}</template>
            </el-input>
          </el-row>
          <el-row>
            <Transition
              appear
              enter-active-class="animate__animated animate__fadeInLeft"
              leave-active-class="animate__animated animate__fadeOutRight"
            >
              <el-button
                style="margin-top: 10px; margin-left: 10px"
                type="primary"
                icon="el-icon-d-arrow-left"
                size="small"
                @click="goBack"
                >{{ $t("result.return") }}</el-button
              ></Transition
            >
            <Transition
              appear
              enter-active-class="animate__animated animate__fadeInLeft"
              leave-active-class="animate__animated animate__fadeOutRight"
            >
              <el-button
                style="margin-top: 10px; margin-left: 10px"
                type="primary"
                icon="el-icon-folder-add"
                size="small"
                @click="fileDialogVisible = true"
                >{{ $t("result.info[8]") }}</el-button
              >
            </Transition>
            <el-dialog
              :title="$t('result.info[8]')"
              :visible.sync="fileDialogVisible"
              width="30%"
              :before-close="handleClose"
            >
              <el-input
                :placeholder="$t('result.info[9]')"
                size="small"
                v-model="newDirName"
              ></el-input>
              <span slot="footer" class="dialog-footer">
                <el-button @click="fileDialogVisible = false" size="small">{{
                  $t("all.cancle")
                }}</el-button>
                <el-button type="primary" @click="newDir" size="small">{{
                  $t("all.confirm")
                }}</el-button>
              </span>
            </el-dialog>
            <Transition
              appear
              enter-active-class="animate__animated animate__fadeInLeft"
              leave-active-class="animate__animated animate__fadeOutRight"
            >
            </Transition>
            <Transition
              appear
              enter-active-class="animate__animated animate__fadeInLeft"
              leave-active-class="animate__animated animate__fadeOutRight"
            >
              <el-button
                style="margin-top: 10px; margin-left: 10px"
                type="primary"
                icon="el-icon-download"
                size="small"
                @click="downloadChildFiles"
                >{{ $t("result.download") }}</el-button
              ></Transition
            >
            <Transition
              appear
              enter-active-class="animate__animated animate__fadeInLeft"
              leave-active-class="animate__animated animate__fadeOutRight"
            >
              <el-button
                style="margin-top: 10px; margin-left: 10px"
                type="danger"
                icon="el-icon-delete"
                size="small"
                @click="deleteFiles"
                >{{ $t("result.delete") }}</el-button
              ></Transition
            >
          </el-row>
          <el-row>
            <Transition
              appear
              enter-active-class="animate__animated animate__fadeInLeft"
              leave-active-class="animate__animated animate__fadeOutRight"
            >
              <el-table
                class="size"
                ref="table"
                :data="childFileList"
                style="width: 100%"
                max-height="560"
                @select-all="selectTableAll"
                @select="selectFile"
              >
                <el-table-column width="80" type="selection">
                  <!-- <template slot-scope="scope">
            <el-checkbox @change="selectFile(scope.row)"></el-checkbox>
          </template>-->
                </el-table-column>
                <el-table-column
                  prop="fileName"
                  :label="$t('result.file[0]')"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <el-row>
                      <el-col :span="1">
                        <i
                          class="el-icon-folder"
                          v-if="scope.row.fileType == 1"
                        ></i>
                        <i
                          class="el-icon-document"
                          v-if="!(scope.row.fileType == 1)"
                        ></i>
                      </el-col>
                      <el-col :span="22" :offset="1">
                        <el-input
                          v-focus
                          size="mini"
                          v-model="scope.row.fileName"
                          v-if="isShow[scope.$index]"
                          :placeholder="scope.row.fileName"
                          @blur="updatename(scope.$index, scope.row)"
                          @focus="oldname = scope.row.fileName"
                          style="margin-left: 5px"
                        ></el-input>
                        <span
                          style="margin-left: 5px"
                          v-show="!isShow[scope.$index]"
                          @click="openDir(scope.row)"
                          >{{ scope.row.fileName }}</span
                        >
                      </el-col>
                    </el-row>
                  </template>
                </el-table-column>
                <el-table-column
                  show-overflow-tooltip
                  prop="modifyTime"
                  :label="$t('result.file[1]')"
                  width="250"
                ></el-table-column>
                <el-table-column
                  prop="fileSize"
                  :label="$t('result.file[2]')"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  :label="$t('all.caozuo')"
                  width="320"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <!-- <el-button
                      v-if="scope.row.fileName.indexOf(`csv`) != -1"
                      style="margin-left: 10px"
                      type="primary"
                      icon="el-icon-view"
                      size="small"
                      @click="
                        getCSVViewData(scope.row.fileName, scope.row.rootPath)
                      "
                      >可视化</el-button
                    > -->
                    <el-button
                      style="margin-left: 10px"
                      type="success"
                      icon="el-icon-edit"
                      size="small"
                      @click="changeIsShow(scope.$index)"
                      >{{ $t("result.file[3]") }}</el-button
                    >
                    <el-button
                      style="margin-left: 10px"
                      type="warning"
                      icon="el-icon-download"
                      size="small"
                      @click="downloadChildFile(scope.row.fileName)"
                      >{{ $t("result.file[4]") }}</el-button
                    >
                    <el-button
                      style="margin-left: 10px"
                      type="danger"
                      icon="el-icon-delete"
                      size="small"
                      @click="deleteFile(scope.row.fileName)"
                      >{{ $t("result.file[5]") }}</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </Transition>
          </el-row>
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
                :total="Number(totalRecord)"
                @current-change="handleCurrentChange"
                @size-change="handleSizeChange"
              ></el-pagination>
            </Transition>
          </el-col>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog
      title="可视化"
      class="dialog"
      :visible.sync="viewDialogVisible"
      width="60%"
      :before-close="handleViewClose"
    >
      <div id="chart" style="height: 400px; width: 100%"></div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleViewClose">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import {
  reqParentFile,
  reqCreateParentFile,
  reqDeleteParentFile,
  reqUpdateParentFileName,
  reqUpdateChildFileName,
  reqCreateChildFolder,
  reqDeleteChildFile,
  reqUploadChildFile,
  reqDownloadChildFile,
  reqQueryZipChildFileStatus,
  reqUserInfoGetCSVView,
} from "@/api";
export default {
  name: "Data",
  data() {
    return {
      page: 10,
      isShow: [],
      parentId: "",
      //路径
      path: [],
      //选中的文件名
      checkedfile: [],
      // 新建文件夹的对话框
      fileDialogVisible: false,
      // 上传文件对话框
      uploadDialogVisible: false,
      parentFileDialogVisible: false,
      parentFileNameDialogVisible: false,
      // 新建文件夹的名称
      newDirName: "",
      // 旧文件的名称
      oldname: "",
      parentFileName: "",
      newParentFileName: "",
      newParentFileId: "",
      viewData: null,
      viewDialogVisible: false,
      sysURL: require("@/assets/sysconfig/sysconfig.json"),
    };
  },
  directives: {
    //注册一个局部的自定义指令 v-focus
    focus: {
      // 指令的定义
      inserted: function (el) {
        // 聚焦元素
        el.querySelector("input").focus();
      },
    },
  },
  computed: {
    ...mapState("ResultFile", [
      "parentFileList",
      "childFileList",
      "pageNum",
      "filePath",
      "totalRecord",
    ]),
    dirpath() {
      let dirpath = "";
      this.path.forEach((item) => {
        dirpath = dirpath + "/" + item;
      });
      if (this.path.length >= 1) {
        return dirpath;
      } else {
        return "/";
      }
    },
  },
  methods: {
    initEcharts(name) {
      let xdata = [];
      for (let i = 1; i <= this.viewData.length; i++) {
        xdata.push(i);
      }
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
              lte: 50,
              color: "#93CE07",
            },
            {
              gt: 50,
              lte: 100,
              color: "#FBDB0F",
            },
            {
              gt: 100,
              lte: 150,
              color: "#FC7D02",
            },
            {
              gt: 150,
              lte: 200,
              color: "#FD0100",
            },
            {
              gt: 200,
              lte: 300,
              color: "#AA069F",
            },
            {
              gt: 300,
              lte: 600,
              color: "#AC3B2A",
            },
            {
              gt: 600,
              lte: 1000,
              color: "#000059",
            },
            {
              gt: 1000,
              color: "#df0101",
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
          data: this.viewData,
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
      this.viewData = null;
      this.viewDialogVisible = false;
    },
    async getCSVViewData(fileName, rootPath) {
      this.viewDialogVisible = true;
      let result = await reqUserInfoGetCSVView(
        rootPath + this.dirpath + "/" + fileName
      );
      if (result.code == 200) {
        this.viewData = result.data;
        this.initEcharts(fileName);
      } else {
        this.$message.error("读取失败");
        this.viewDialogVisible = false;
      }
    },
    downloadChildFiles() {
      for (let i = 0; i < this.checkedfile.length; i++) {
        this.downloadChildFile(this.checkedfile[i]);
      }
    },
    async downloadChildFile(fileName) {
      let result = await reqDownloadChildFile(
        fileName,
        this.parentId,
        this.dirpath
      );
      let urlPath = result.data;
      let strs = urlPath.split("/");
      if (result.code == "200") {
        let result = await reqQueryZipChildFileStatus(urlPath);
        if (result.data == true) {
          window.open(this.sysURL.IPAddress.bocloud + strs[3] + "/" + strs[4]);
        } else {
          let timer = setInterval(async function () {
            let result = await reqQueryZipChildFileStatus(urlPath);
            if (result.data == true) {
              window.open(this.sysURL.IPAddress.bocloud + strs[0]);
              clearInterval(timer);
            }
          }, 20000);
        }
      }
    },
    updateChileFileList(id, pageNum, path, fileName) {
      this.path = [];
      this.parentId = id;
      this.parentFileName = fileName;
      this.updateFileList(id, pageNum, path);
    },
    updateParentFileNameDialogVisible(row) {
      this.parentFileNameDialogVisible = true;
      this.newParentFileName = row.name;
      this.newParentFileId = row.id;
    },
    async updateParentFileName() {
      let result = await reqUpdateParentFileName(
        this.newParentFileId,
        this.newParentFileName,
        "",
        6,
        2
      );
      if (result.code == "200") {
        this.$message({
          type: "success",
          message: "更新成功",
        });
        this.parentFileNameDialogVisible = false;
        this.updateParentFileList();
        this.newParentFileName = "";
      } else {
        this.$message.error("更新失败");
      }
    },
    async deleteParentFile(id) {
      // alert("是否确认删除?");
      let result = await reqDeleteParentFile(id);
      if (result.code == "200") {
        this.$message({
          type: "success",
          message: "删除成功",
        });
        this.updateParentFileList();
      } else {
        this.$message.error(result.data);
      }
    },
    async createParentFile() {
      //TODO:storageId type
      let result = await reqCreateParentFile(this.newParentFileName, "", 6, 2);
      if (result.code == "200") {
        this.parentFileDialogVisible = false;
        this.$message({
          type: "success",
          message: "新建成功",
        });
        this.updateParentFileList();
        this.newParentFileName = "";
      } else {
        this.$message.error("新建失败");
      }
    },
    changeIsShow(index) {
      let flag = !this.isShow[index];
      this.isShow.splice(index, 1, flag);
    },
    initShow() {
      if (this.childFileList != null) {
        for (let i = 0; i < this.childFileList.length; i++) {
          this.isShow.push(false);
        }
      }
    },
    previewFile(name) {
      let url = "http://127.0.0.1:8080/preview" + this.dirpath + "/" + name;
      let Base64 = require("js-base64").Base64;
      window.open(
        "http://127.0.0.1:8012/onlinePreview?url=" +
          encodeURIComponent(Base64.encode(url))
      );
    },
    async deleteFiles() {
      let result = await reqDeleteChildFile(
        this.parentId,
        this.checkedfile,
        this.dirpath
      );
      if (result.code == "200") {
        this.$message({
          type: "success",
          message: "删除成功",
        });
      }
      this.updateFileList(this.parentId, this.pageNum, this.dirpath);
      this.checkedfile = [];
    },
    async deleteFile(fileName) {
      let fileList = [];
      fileList.push(fileName);
      let result = await reqDeleteChildFile(
        this.parentId,
        fileList,
        this.dirpath
      );
      if (result.code == "200") {
        this.$message({
          type: "success",
          message: "删除成功",
        });
      }
      this.updateFileList(this.parentId, this.pageNum, this.dirpath);
    },
    async uploadFile(files) {
      if (files.file.size < 2048000) {
        const formData = new FormData();
        formData.append("file", files.file);
        let identifier =
          files.file.size +
          "-" +
          files.file.name.substring(0, 2) +
          files.file.name.split(".")[files.file.name.split(".").length - 1];
        let result = await reqUploadChildFile(
          files.file.size,
          files.file.size,
          identifier,
          files.file.name,
          files.file.webkitRelativePath,
          this.dirpath,
          this.parentId,
          files.file
        );
        if (result.code == "200") {
          this.updateFileList(this.parentId, this.pageNum, this.dirpath);
        } else {
          this.$message.error("上传失败");
        }
      } else {
        this.$message.error("文件过大,无法上传");
      }
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleUpload(command) {
      this.uploadDialogVisible = true;
      if (command == "uploadFile") {
        this.$nextTick(() => {
          this.$refs.upload.$children[0].$refs.input.webkitdirectory = false;
        });
      } else {
        this.$nextTick(() => {
          this.$refs.upload.$children[0].$refs.input.webkitdirectory = true;
        });
      }
    },
    async newDir() {
      let result = await reqCreateChildFolder(
        this.parentId,
        this.dirpath,
        this.newDirName,
        null
      );
      if (result.code == "200") {
        this.$message({
          type: "success",
          message: "新建成功",
        });
        this.updateFileList(this.parentId, this.pageNum, this.dirpath);
      } else {
        this.$message.error("新建失败:文件名重复!");
      }
      this.fileDialogVisible = false;
      this.newDirName = "";
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    selectTableAll() {
      if (this.childFileList != null) {
        if (this.checkedfile.length >= this.childFileList.length) {
          this.checkedfile = [];
        } else {
          this.checkedfile = [];
          this.childFileList.forEach((item) => {
            this.checkedfile.push(item.fileName);
          });
        }
      }
    },
    selectFile(selection, row) {
      if (this.checkedfile.includes(row.fileName)) {
        this.checkedfile.forEach(function (item, index, arr) {
          if (item == row.fileName) {
            arr.splice(index, 1);
          }
        });
      } else {
        this.checkedfile.push(row.fileName);
      }
      if (this.childFileList != null) {
        if (this.checkedfile.length == this.childFileList.length) {
          this.checkedall = true;
        } else {
          this.checkedall = false;
        }
      } else {
        this.checkedall = false;
      }
    },
    goBack() {
      this.path.pop();
      this.updateFileList(this.parentId, 1, this.dirpath);
    },
    openDir(row) {
      if (row.fileType == 1) {
        this.path.push(row.fileName);
        this.updateFileList(this.parentId, 1, this.dirpath);
      }
    },
    updateFileList(parentId, val, filePath) {
      if (parentId == null && this.parentFileList.length > 0) {
        parentId = this.parentFileList[0].id;
        this.ParentFileName = this.parentFileList[0].fileName;
      }
      this.$store.dispatch("ResultFile/getChildFileList", {
        dataId: parentId,
        filePath: filePath,
        current: val,
        size: this.page,
      });
      this.initShow();
    },
    async updateParentFileList() {
      let result = await reqParentFile(2, 0, 0);
      if (result.code == "200") {
        this.$store.dispatch("ResultFile/getParentFileList", result.data);
        this.parentFileName = result.data[0].name;
        this.parentId = this.parentFileList[0].id;
      }
      if (this.parentFileList != null) {
        this.updateFileList(this.parentFileList[0].id, this.pageNum, null);
      }
    },
    async updatename(index, row) {
      this.changeIsShow(index);
      if (this.oldname != row.fileName) {
        let result = await reqUpdateChildFileName(
          this.parentId,
          this.dirpath,
          this.oldname,
          row.fileName
        );
        if (result.code == "200") {
          this.$message({
            type: "success",
            message: "修改成功",
          });
        } else {
          this.$message.error("修改失败");
        }
      } else {
        this.$message.warning("新名称与原名称相同");
      }
    },
    handleCurrentChange(val) {
      this.updateFileList(this.parentId, val, this.dirpath);
    },
    handleSizeChange(val) {
      this.page = val;
      this.updateFileList(this.parentId, this.pageNum, this.dirpath);
    },
  },
  async mounted() {
    let result = await reqParentFile(2, 0, 0);
    if (result.data.length > 0) {
      this.$store.dispatch("ResultFile/getParentFileList", result.data);
      this.parentFileName = result.data[0].name;
      if (result.code == "200" && result.data.length > 0) {
        this.$store.dispatch("ResultFile/getChildFileList", {
          dataId: result.data[0].id,
          filePath: null,
          current: 1,
          size: this.page,
        });
      }
      this.initShow();
      this.parentId = result.data[0].id;
    }
  },
};
</script>

<style scoped>
.el-breadcrumb {
  margin-top: 10px;
  margin-left: 10px;
  font-size: 16px;
}
.left-card {
  margin-top: 10px;
  margin-left: 10px;
  height: calc(100vh - 170px);
}
.el-button {
  padding-right: 10px;
  padding-left: 5px;
  padding-top: 8px;
  padding-bottom: 8px;
}

.parentIcon {
  cursor: pointer;
}
.size {
  font-size: 16px;
}
.dialog >>> .el-dialog__body {
  padding: 10px;
}
</style>
