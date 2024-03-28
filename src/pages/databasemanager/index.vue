<template>
  <div style="margin: 10px">
    <Transition
      appear
      enter-active-class="animate__animated animate__fadeInLeft"
      leave-active-class="animate__animated animate__fadeOutRight"
    >
      <el-breadcrumb separator="/" class="size">
        <el-breadcrumb-item>{{ $t("sidebar.n1") }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ $t("sidebar.n1_2") }}</el-breadcrumb-item>
      </el-breadcrumb>
    </Transition>
    <el-row>
      <el-col :span="24">
        <el-card
          :body-style="{ padding: '10px' }"
          style="height: calc(100vh - 170px); margin-top: 10px; overflow: auto"
        >
          <el-row>
            <el-col :span="4">
              <h3 class="size" style="margin-left: 5px; margin-top: 3px">
                <span class="size" style="color: #409eff">|</span>&nbsp;{{
                  $t("datamanager.filebiao")
                }}
              </h3>
            </el-col>
          </el-row>
          <el-row style="margin-top: 10px; font-size: 20px">
            <span
              class="size"
              style="
                float: left;
                height: 32px;
                line-height: 32px;
                margin-left: 10px;
              "
              >{{ $t("datamanager.path") }}</span
            >
            <el-breadcrumb separator=">">
              <el-breadcrumb-item v-for="(item, index) in path" :key="index"
                ><el-tag class="taghover" @click="toPath(index)">{{
                  item
                }}</el-tag></el-breadcrumb-item
              >
            </el-breadcrumb>
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
                :data="Data"
                style="width: 100%; margin-top: 5px"
                max-height="670"
              >
                <el-table-column
                  prop="fileName"
                  :label="$t('all.filename')"
                  show-overflow-tooltip
                  width="600"
                >
                  <template slot-scope="scope">
                    <el-row>
                      <el-col :span="1">
                        <i
                          class="el-icon-folder"
                          v-if="scope.row.is_dir == 1"
                        ></i>
                        <i
                          class="el-icon-document"
                          v-if="!(scope.row.is_dir == 1)"
                        ></i>
                      </el-col>
                      <el-col :span="22" :offset="1">
                        <span
                          style="margin-left: 5px; cursor: pointer"
                          @click="openDir(scope.row)"
                          >{{ scope.row.name }}</span
                        >
                      </el-col>
                    </el-row>
                  </template>
                </el-table-column>
                <el-table-column
                  show-overflow-tooltip
                  prop="modified"
                  :label="$t('all.time')"
                  width="320"
                ></el-table-column>
                <el-table-column :label="$t('all.size')" show-overflow-tooltip>
                  <template slot-scope="scope"
                    ><span v-if="scope.row.size == '0B'">-</span
                    ><span v-if="scope.row.size != '0B'">{{
                      scope.row.size
                    }}</span></template
                  ></el-table-column
                >
                <el-table-column
                  :label="$t('all.caozuo')"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <el-button
                      style="margin-left: 10px"
                      type="warning"
                      icon="el-icon-download"
                      size="small"
                      @click="download(scope.row)"
                      >{{ $t("datamanager.download") }}</el-button
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
                :page-size="pageSize"
                layout="prev, pager, next,sizes"
                :total="Number(TotalCount)"
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
  reqUserInfoAccessPath,
  reqUserInfoDataAccessLevel,
  reqData,
} from "@/api/index.js";
import axios from "axios";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import { zipFiles } from "@/utils/zipdownload.js";
export default {
  name: "DataBaseManager",
  data() {
    return {
      pageSize: 20,
      path: ["/"],
      accessPath: "",
      basePath: "",
      baseSecret: "",
      downloadFileList: [],
    };
  },

  computed: {
    ...mapState("DataAccess", ["DataAccess", "Data", "TotalCount"]),
    dirpath() {
      let dirpath = "";
      this.path.forEach((item) => {
        if (item != "/") {
          dirpath += item + "/";
        }
      });
      if (this.path.length >= 1) {
        return dirpath;
      } else {
        return "";
      }
    },
  },
  methods: {
    packageImages() {
      var fileUrl = [
        "https://lhy980916.vip:80/d/%E9%98%BF%E9%87%8C%E4%BA%91%E7%9B%98/%E5%85%AC%E5%BC%80/%E5%B9%B2%E6%97%B1%E7%BB%93%E6%9E%9C%E5%9B%BE/%E6%96%B0%E7%96%86/2018-7.png",
        "https://lhy980916.vip:80/d/%E9%98%BF%E9%87%8C%E4%BA%91%E7%9B%98/%E5%85%AC%E5%BC%80/Kubernetes/%E8%A7%86%E9%A2%91/55-%E5%B0%9A%E7%A1%85%E8%B0%B7-Kubernetes%E9%9B%86%E7%BE%A4%E8%B5%84%E6%BA%90%E7%9B%91%E6%8E%A7-%E6%90%AD%E5%BB%BA%E7%9B%91%E6%8E%A7%E5%B9%B3%E5%8F%B0.mp4",
      ]; // 这里可以替换为自己的逻辑，比如从哪里获取之类的

      var promises = [];
      const zip = new JSZip();
      const img = zip.folder("qrCode"); // zip包内的文件夹名字
      for (let item of fileUrl) {
        let axios = this.getFile(item).then(({ data }) => {
          let fileName = this.getFileName(item); //文件名
          zip.file(fileName, data, { binary: true });
        });
        promises.push(axios);
      }

      Promise.all(promises).then(() => {
        if (Object.keys(zip.files).length > 0) {
          zip.generateAsync({ type: "blob" }).then((blob) => {
            saveAs(blob, "file.zip");
            console.log("批量下载成功");
          });
        } else {
          console.log("下载全部失败");
        }
      });
    },
    getFileName(filePath) {
      var startIndex = filePath.lastIndexOf("/");
      if (startIndex != -1)
        return filePath
          .substring(startIndex + 1, filePath.length)
          .toLowerCase();
      else return "";
    },
    getFile(url) {
      return new Promise((resolve, reject) => {
        axios({
          url,
          method: "GET",
          responseType: "blob",
        })
          .then((data) => {
            resolve(data);
          })
          .catch((err) => {
            reject(err.toString());
          });
      });
    },
    toPath(index) {
      if (this.path.length == 1) {
        return;
      }
      this.path.splice(index + 1, this.path.length - index - 1);
      this.regPathSecret();
      this.pageSize = 20;
      this.pagenationReq(1, this.pageSize, this.basePath + this.dirpath);
    },
    handleCurrentChange(val) {
      this.pagenationReq(val, this.pageSize, this.basePath + this.dirpath);
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.pagenationReq(1, val, this.basePath + this.dirpath);
    },
    openDir(obj) {
      if (obj.is_dir == 1) {
        this.path.push(obj.name);
        this.regPathSecret();
        this.pageSize = 10;
        this.pagenationReq(1, this.pageSize, this.basePath + this.dirpath);
      }
    },
    regPathSecret() {
      if (this.basePath + this.dirpath == this.accessPath.pathtwo) {
        this.baseSecret = this.DataAccess.pathTwo;
      } else if (this.basePath + this.dirpath == this.accessPath.paththree) {
        this.baseSecret = this.DataAccess.pathThree;
      } else if (this.basePath + this.dirpath == this.accessPath.pathfour) {
        this.baseSecret = this.DataAccess.pathFour;
      } else if (this.basePath + this.dirpath == this.accessPath.pathfive) {
        this.baseSecret = this.DataAccess.pathFive;
      } else if (this.basePath + this.dirpath == this.accessPath.pathsix) {
        this.baseSecret = this.DataAccess.pathSix;
      } else if (this.basePath + this.dirpath == this.accessPath.pathone) {
        this.baseSecret = this.DataAccess.pathOne;
      }
    },
    async getFileList(path) {
      let baseSecret = this.baseSecret;
      if (this.basePath + this.dirpath + path == this.accessPath.pathtwo) {
        baseSecret = this.DataAccess.pathTwo;
      } else if (
        this.basePath + this.dirpath + path ==
        this.accessPath.paththree
      ) {
        baseSecret = this.DataAccess.pathThree;
      } else if (
        this.basePath + this.dirpath + path ==
        this.accessPath.pathfour
      ) {
        baseSecret = this.DataAccess.pathFour;
      } else if (
        this.basePath + this.dirpath + path ==
        this.accessPath.pathfive
      ) {
        baseSecret = this.DataAccess.pathFive;
      } else if (
        this.basePath + this.dirpath + path ==
        this.accessPath.pathsix
      ) {
        baseSecret = this.DataAccess.pathSix;
      } else if (
        this.basePath + this.dirpath + path ==
        this.accessPath.pathone
      ) {
        baseSecret = this.DataAccess.pathOne;
      }
      let result = await reqData({
        path: this.basePath + this.dirpath + path,
        password: baseSecret,
        page: 1,
        per_page: 0,
        refresh: false,
      });
      if (result.code == 200) {
        if (result.data.content.length == 0) {
          this.downloadFileList.push({
            name: path,
            url: "",
          });
        }
        for (let i = 0; i < result.data.content.length; i++) {
          if (result.data.content[i].is_dir == true) {
            this.getFileList(path + result.data.content[i].name + "/");
          } else {
            this.downloadFileList.push({
              name: path + result.data.content[i].name,
              url:
                "http://10.255.248.22:15248/d/" +
                this.basePath +
                this.dirpath +
                path +
                result.data.content[i].name +
                "?sign=" +
                result.data.content[i].sign,
            });
          }
        }
      }
    },
    download(obj) {
      this.downloadFileList = [];
      if (obj.is_dir == 1) {
        let zipName = obj.name + ".zip";
        this.getFileList(obj.name + "/");
        let _this = this;
        setTimeout(() => {
          zipFiles(zipName, _this.downloadFileList);
        }, 4000);
      } else {
        window.open(
          "http://10.255.248.22:15248/d/" +
            this.basePath +
            this.dirpath +
            obj.name +
            "?sign=" +
            obj.sign
        );
      }
    },
    pagenationReq(pageNum, pageSize, path) {
      this.$store.dispatch("DataAccess/getData", {
        path: path || this.basePath,
        password: this.baseSecret,
        page: pageNum,
        per_page: pageSize,
        refresh: false,
      });
    },
  },
  async mounted() {
    let dataaccess = await reqUserInfoDataAccessLevel();
    if (dataaccess.code == 200) {
      this.$store.dispatch(
        "DataAccess/getUserInfoDataAccessLevel",
        dataaccess.data
      );
    }
    let result = await reqUserInfoAccessPath();
    if (result.code == 200) {
      this.accessPath = result.data;
      switch (this.DataAccess.level) {
        case 1:
          this.basePath = this.accessPath.pathone;
          this.baseSecret = this.DataAccess.pathOne;

          break;
        case 2:
          this.basePath = this.accessPath.pathtwo;
          this.baseSecret = this.DataAccess.pathTwo;

          break;
        case 3:
          this.basePath = this.accessPath.paththree;
          this.baseSecret = this.DataAccess.pathThree;

          break;
        case 4:
          this.basePath = this.accessPath.pathfour;
          this.baseSecret = this.DataAccess.pathFour;

          break;
        case 5:
          this.basePath = this.accessPath.pathfive;
          this.baseSecret = this.DataAccess.pathFive;

          break;
        case 6:
          this.basePath = this.accessPath.pathsix;
          this.baseSecret = this.DataAccess.pathSix;

          break;
      }
      this.pagenationReq(1, 20, this.basePath);
    }
  },
};
</script>

<style scoped>
.taghover {
  font-size: 16px;
  cursor: pointer;
}
.taghover:hover {
  transform: scale(1.1);
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
