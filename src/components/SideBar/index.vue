<template>
  <el-row>
    <el-col :span="24">
      <el-menu :default-active="$route.path" :unique-opened="true">
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-folder"></i>
            <span class="size">{{ $t("sidebar.n1") }}</span>
          </template>

          <el-menu-item index="/satelite" key="satelite" @click="toSatelite">
            <span slot="title" class="subsize"
              >&nbsp;&nbsp;&nbsp;&nbsp;{{ $t("sidebar.n1_1") }}</span
            >
          </el-menu-item>
          <!-- <el-menu-item index="/date" key="date" @click="toDate">
            <span slot="title" class="subsize"
              >&nbsp;&nbsp;&nbsp;&nbsp;日期视图</span
            >
          </el-menu-item>
          <el-menu-item index="/area" key="area" @click="toArea">
            <span slot="title" class="subsize"
              >&nbsp;&nbsp;&nbsp;&nbsp;地区视图</span
            >
          </el-menu-item> -->
          <el-menu-item
            index="/database"
            key="database"
            @click="toDataBaseManager"
          >
            <span slot="title" class="subsize"
              >&nbsp;&nbsp;&nbsp;&nbsp;{{ $t("sidebar.n1_2") }}</span
            >
          </el-menu-item>
        </el-submenu>
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-cpu"></i>
            <span class="size">{{ $t("sidebar.n2") }}</span>
          </template>
          <el-menu-item @click="toData" index="/data" key="data">
            <span slot="title" class="subsize"
              >&nbsp;&nbsp;&nbsp;&nbsp;{{ $t("sidebar.n2_1") }}</span
            >
          </el-menu-item>
          <el-menu-item
            index="/createimage"
            key="createimage"
            @click="toCreateImages"
          >
            <span slot="title" class="subsize"
              >&nbsp;&nbsp;&nbsp;&nbsp;{{ $t("sidebar.n2_2") }}</span
            >
          </el-menu-item>
          <el-menu-item
            @click="goStandardJob()"
            index="/standardjob"
            key="standardjob"
          >
            <span slot="title" class="subsize"
              >&nbsp;&nbsp;&nbsp;&nbsp;{{ $t("sidebar.n2_3") }}</span
            >
          </el-menu-item>
          <el-menu-item @click="toJob()" index="/job" key="job">
            <span slot="title" class="subsize"
              >&nbsp;&nbsp;&nbsp;&nbsp;{{ $t("sidebar.n2_4") }}</span
            >
          </el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-takeaway-box"></i>
            <span class="size">{{ $t("sidebar.n3") }}</span>
          </template>
          <el-menu-item @click="toIDE" index="/ide" key="ide">
            <template slot="title">
              <!-- <i class="el-icon-edit-outline"></i> -->
              <span class="subsize"
                >&nbsp;&nbsp;&nbsp;&nbsp;{{ $t("sidebar.n3_1") }}</span
              >
            </template>
          </el-menu-item>
          <el-menu-item index="/images" key="images" @click="toImages">
            <span slot="title" class="subsize"
              >&nbsp;&nbsp;&nbsp;&nbsp;{{ $t("sidebar.n3_2") }}</span
            >
          </el-menu-item>

          <el-menu-item
            @click="toResultData"
            index="/resultdata"
            key="resultdata"
          >
            <span slot="title" class="subsize"
              >&nbsp;&nbsp;&nbsp;&nbsp;{{ $t("sidebar.n3_3") }}</span
            >
          </el-menu-item>
          <el-menu-item @click="toTemplate()" index="/template" key="template">
            <span slot="title" class="subsize"
              >&nbsp;&nbsp;&nbsp;&nbsp;{{ $t("sidebar.n3_4") }}</span
            >
          </el-menu-item>
          <el-menu-item index="/dataview" key="dataview" @click="toDataView">
            <span slot="title" class="subsize"
              >&nbsp;&nbsp;&nbsp;&nbsp;{{ $t("sidebar.n3_5") }}</span
            >
          </el-menu-item>
        </el-submenu>
        <!-- <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-copy-document"></i>
            <span class="size">镜像仓库</span>
          </template>
        </el-submenu> -->

        <!-- <div @click="toData">
          <el-menu-item index="2">
            <template slot="title">
              <i class="el-icon-takeaway-box"></i>
              <span class="size">模型管理</span>
            </template> -->
        <!-- <el-menu-item>
            <span slot="title" @click="toImages">镜像管理</span>
          </el-menu-item> -->
        <!-- </el-menu-item>
        </div> -->

        <!-- <div @click="toDataView">
          <el-menu-item index="/dataview" key="dataview">
            <template slot="title">
              <i class="el-icon-folder"></i>
              <span class="size">数据集</span>
            </template>
          </el-menu-item>
        </div> -->

        <div @click="toUserInfo">
          <el-menu-item index="/userinfo" key="userinfo">
            <template slot="title">
              <i class="el-icon-user"></i>
              <span class="size">{{ $t("sidebar.n4") }}</span>
            </template>
          </el-menu-item>
        </div>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
import { Loading } from "element-ui";

export default {
  name: "SideBar",
  data() {
    return {};
  },
  methods: {
    toSatelite() {
      this.$router.push({ name: "satelite" });
    },
    toDate() {
      this.$router.push({ name: "date" });
    },
    toArea() {
      this.$router.push({ name: "area" });
    },
    toDataBaseManager() {
      this.$router.push({ name: "database" });
    },
    toTemplate() {
      this.$router.push({ name: "template" });
    },
    toCreateImages() {
      this.$router.push({ name: "createimage" });
    },
    toProcessView() {
      this.$router.push({ name: "processview" });
    },
    toDataView() {
      this.$router.push({ name: "dataview" });
    },
    toResultView() {
      this.$router.push({ name: "resultview" });
    },
    toJob() {
      this.$router.push({ name: "job" });
    },
    goStandardJob() {
      this.$router.push({ name: "standardjob" });
    },
    toData() {
      this.$router.push({ name: "data" });
    },
    toResultData() {
      this.$router.push({ name: "resultdata" });
    },
    toImages() {
      this.$router.push({ name: "images" });
    },
    toIDE() {
      this.$router.push({ name: "ide" });
    },
    toUserInfo() {
      this.$router.push({ name: "userinfo" });
    },
  },
};
</script>

<style scoped>
.el-menu {
  height: calc(100vh - 60px);
  overflow: hidden;
}

.size {
  font-size: 18px;
}

.subsize {
  font-size: 16px;
}
</style>
