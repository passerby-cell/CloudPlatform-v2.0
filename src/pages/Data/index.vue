<template>
  <div>
    <Transition
      appear
      enter-active-class="animate__animated animate__fadeInLeft"
      leave-active-class="animate__animated animate__fadeOutRight"
    >
      <el-breadcrumb separator="/" class="size">
        <el-breadcrumb-item>{{ $t("sidebar.n2") }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ $t("sidebar.n2_1") }}</el-breadcrumb-item>
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
                    $t("data.shujubiao")
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
                  >{{ $t("data.create") }}</el-button
                ></el-col
              ></el-row
            >
          </Transition>
          <el-dialog
            :center="$t('data.create1')"
            :visible.sync="parentFileDialogVisible"
            width="30%"
            :before-close="handleClose"
          >
            <el-input
              :placeholder="$t('data.create2')"
              size="small"
              v-model="newParentFileName"
              oninput="value=value.replace(/[^\a-\z\A-\Z]/g,'')"
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
                max-height="600"
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
                          scope.$index,
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
                        ></i
                      ></el-col>
                      <el-col :span="12">
                        <i
                          class="el-icon-delete parentIcon"
                          style="margin-left: 10px"
                          @click="deleteParentFile(scope.row.id)"
                        ></i></el-col
                    ></el-row>
                  </template>
                </el-table-column> </el-table
              ><el-dialog
                :title="$t('data.renamemodel')"
                :visible.sync="parentFileNameDialogVisible"
                width="30%"
                :before-close="handleClose"
              >
                <el-input
                  :placeholder="$t('data.renamemodel1')"
                  size="small"
                  v-model="newParentFileName"
                  oninput="value=value.replace(/[^\a-\z\A-\Z]/g,'')"
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
              <h3 style="margin-left: 5px; margin-top: 3px" class="size">
                <span style="color: #409eff">|</span>&nbsp;{{
                  $t("data.filebiao")
                }}
              </h3>
            </el-col>
            <el-col :span="20"
              ><h3 class="size" v-if="parentFileName" style="margin-top: 3px">
                {{ $t("data.filebiao1") }}
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
              <template slot="prepend"> {{ $t("data.path") }}</template>
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
                >{{ $t("data.back") }}</el-button
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
                >{{ $t("data.newfloder") }}</el-button
              >
            </Transition>
            <el-dialog
              :title="$t('data.newfloder')"
              :visible.sync="fileDialogVisible"
              width="30%"
              :before-close="handleClose"
            >
              <el-input
                :placeholder="$t('data.newfloder1')"
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
              <el-dropdown
                @command="handleUpload"
                style="margin-top: 10px; margin-left: 10px"
              >
                <el-button type="primary" size="small" icon="el-icon-upload">
                  {{ $t("data.upload") }}
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="uploadFile">
                    {{ $t("data.upload1") }}</el-dropdown-item
                  >

                  <el-dropdown-item command="uploadFiles">
                    {{ $t("data.upload2") }}</el-dropdown-item
                  >
                </el-dropdown-menu>
              </el-dropdown>
            </Transition>
            <el-dialog
              :title="$t('data.upload')"
              :visible.sync="uploadDialogVisible"
              width="433px"
              :before-close="handleClose"
              ><el-progress
                style="
                  width: 380px;
                  margin-top: 8px;
                  margin-left: 15px;
                  margin-bottom: 10px;
                "
                :percentage="progressPercent"
              />
              <el-row style="margin-bottom: 10px">
                <el-col :span="3" :offset="17"
                  ><el-button
                    type="primary"
                    size="small"
                    style="margin-right: 10px"
                    @click="submitUpload"
                    >{{ $t("data.upload") }}</el-button
                  >
                </el-col>
                <el-col :span="4"
                  ><el-button
                    @click="close"
                    size="small"
                    style="margin-left: 10px"
                    >{{ $t("data.close") }}</el-button
                  ></el-col
                >
              </el-row>

              <el-upload
                style="margin-left: 15px"
                drag
                action
                :http-request="uploadFile"
                multiple
                :auto-upload="false"
                ref="upload"
              >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">
                  {{ $t("data.upload3") }}
                  <em>{{ $t("data.upload4") }}</em>
                </div>
                <div class="el-upload__tip" slot="tip"></div>
              </el-upload>
            </el-dialog>
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
                >{{ $t("data.deleteselected") }}</el-button
              ></Transition
            >
          </el-row>
          <!-- <el-dialog
            :visible.sync="terminalDialogVisible"
            fullscreen
            class="dialogClass"
            :show-close="false"
          >
            <span
              style="
                width: 100%;
                height: 60px;
                font-size: 20px;
                font-weight: bolder;
              "
              slot="title"
              >终端:请前往{{
                parentFileList[parenttag].catalog
              }}文件夹下进行操作<el-button
                type="danger"
                size="mini"
                icon="el-icon-close"
                @click="handleTerminalClose"
                style="float: right; margin-right: 10px; margin-bottom: 10px"
                >退出</el-button
              ></span
            >
            <iframe
              name="iframe"
              :src="iframeSrc"
              style="width: 100%; height: calc(100vh - 58px)"
            ></iframe>
          </el-dialog> -->
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
                <el-table-column width="80" type="selection"> </el-table-column>
                <el-table-column
                  prop="fileName"
                  :label="$t('data.filename')"
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
                  :label="$t('data.time')"
                  width="300"
                ></el-table-column>
                <el-table-column
                  prop="fileSize"
                  :label="$t('data.size')"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  :label="$t('all.caozuo')"
                  width="200"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <el-button
                      style="margin-left: 10px"
                      type="success"
                      icon="el-icon-edit"
                      size="small"
                      @click="changeIsShow(scope.$index)"
                      >{{ $t("data.renamefile") }}</el-button
                    >
                    <el-button
                      style="margin-left: 10px"
                      type="danger"
                      icon="el-icon-delete"
                      size="small"
                      @click="deleteFile(scope.row.fileName)"
                      >{{ $t("data.delete") }}</el-button
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
  reqUserInfoLogin,
  reqUserInfoRegist,
} from "@/api";
import AES from "@/utils/crypto";
export default {
  name: "Data",
  data() {
    return {
      terminalDialogVisible: false,
      progressPercent: 0,
      dataSetName: "",
      page: 10,
      isShow: [],
      parentId: "",
      parenttag: 0,
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
    ...mapState("File", [
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
    iframeSrc() {
      return (
        "http://127.0.0.1:18080/websshpage?userInfo=" +
        localStorage.getItem("userInfoToken")
      );
    },
  },
  methods: {
    openTerminal() {
      this.terminalDialogVisible = true;
    },
    handleTerminalClose() {
      let _this = this;
      this.$confirm("确认关闭？")
        .then((_) => {
          _this.terminalDialogVisible = false;
        })
        .catch((_) => {});
    },
    updateChileFileList(index, id, pageNum, path, fileName) {
      this.path = [];
      this.parentId = id;
      this.parentFileName = fileName;
      this.parenttag = index;

      this.updateFileList(id, pageNum, path);
    },
    updateParentFileNameDialogVisible(row) {
      this.parentFileNameDialogVisible = true;
      // this.newParentFileName = row.name;
      this.newParentFileId = row.id;
    },
    async updateParentFileName() {
      if (this.newParentFileName == "") {
        this.$message.error("请输入模型数据名称");
        return;
      }
      let result = await reqUpdateParentFileName(
        this.newParentFileId,
        this.newParentFileName,
        "",
        6,
        1
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
      alert("是否确认删除?");
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
      if (this.newParentFileName == "") {
        this.$message.error("请输入模型数据名称");
        return;
      }
      let result1 = await reqCreateParentFile(this.newParentFileName, "", 6, 1);
      // let result2 = await reqCreateParentFile(this.newParentFileName, "", 6, 2);
      if (result1.code == "200") {
        this.parentFileDialogVisible = false;
        this.$message({
          type: "success",
          message: "新建成功",
        });
        this.updateParentFileList();
        this.newParentFileName = "";
      } else {
        this.$message.error("新建模型数据失败");
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
      // let url =
      //   'http://localhost:8080/file/downloadfile?token=' +
      //   this.localtoken +
      //   '&name=' +
      //   name +
      //   '&dirpath=' +
      //   this.dirpath
      // console.log(url)
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
    close() {
      this.uploadDialogVisible = false;
      this.progressPercent = 0;
      this.updateFileList(this.parentId, this.pageNum, this.dirpath);
      this.$refs.upload.clearFiles();
    },
    uploadFile(files) {
      this.progressPercent = 0;
      const formData = new FormData();
      formData.append("file", files.file);
      let identifier =
        files.file.size +
        "-" +
        files.file.name.substring(0, 2) +
        files.file.name.split(".")[files.file.name.split(".").length - 1];
      let _this = this;
      this.axios({
        url: "bocloud/paas-web/bocapi/fileBcc/upload",
        method: "post",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: {
          chunkNumber: "1",
          chunkSize: "2048000",
          currentChunkSize: files.file.size,
          totalSize: files.file.size,
          identifier,
          filename: files.file.name,
          relativePath: files.file.webkitRelativePath,
          totalChunks: "1",
          filePath: this.dirpath,
          rootPath: "/opt/bcc/storage1/",
          dataId: this.parentId,
          file: files.file,
        },
        onUploadProgress(progress) {
          _this.progressPercent = Math.round(
            (progress.loaded / progress.total) * 100
          );
        },
      });
      //this.updateFileList(this.parentId, this.pageNum, this.dirpath);
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
      this.updateFileList(this.parentId, this.pageNum, this.dirpath);
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
      this.$store.dispatch("File/getChildFileList", {
        dataId: parentId,
        filePath: filePath,
        current: val,
        size: this.page,
      });

      this.initShow();
    },
    async updateParentFileList() {
      let result = await reqParentFile(1, 0, 0);
      if (result.code == "200") {
        this.$store.dispatch("File/getParentFileList", result.data);
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
    let result = await reqParentFile(1, 0, 0);
    if (result.data.length > 0) {
      this.$store.dispatch("File/getParentFileList", result.data);
      this.parentFileName = result.data[0].name;
      if (result.code == "200" && result.data.length > 0) {
        this.$store.dispatch("File/getChildFileList", {
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
@import "@/assets/icon/iconfont.css";
.el-breadcrumb {
  margin-top: 10px;
  margin-left: 10px;
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
.el-divider {
  background-color: #bcbfc8;
  height: 2px;
  margin: 4px 0;
}
.parentIcon {
  cursor: pointer;
}
.size {
  font-size: 16px;
}
</style>
