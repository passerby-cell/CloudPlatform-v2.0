<template>
  <div>
    <Transition
      appear
      enter-active-class="animate__animated animate__fadeInLeft"
      leave-active-class="animate__animated animate__fadeOutRight"
    >
      <el-breadcrumb separator="/" class="size">
        <el-breadcrumb-item>{{ $t("sidebar.n1") }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ $t("sidebar.n1_1") }}</el-breadcrumb-item>
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
        <h1 style="margin-bottom: 20px">查询结果</h1></Transition
      >
      <Transition
        appear
        enter-active-class="animate__animated animate__fadeInLeft"
        leave-active-class="animate__animated animate__fadeOutRight"
      >
        <el-table max-height="600px" v-loading="loading" :data="dataList">
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column label="ID" align="center" prop="id" />
          <el-table-column label="名称" align="center" prop="name" />
          <el-table-column
            label="操作"
            align="center"
            class-name="small-padding fixed-width"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                icon="el-icon-view"
                @click="detail(scope.row.id)"
                v-loading.fullscreen.lock="fullscreenLoading"
                >详情
              </el-button>
              <el-button
                size="mini"
                type="text"
                icon="el-icon-download"
                @click="download(scope.row.url)"
                >下载
              </el-button>
            </template>
          </el-table-column>
        </el-table></Transition
      >
      <Transition
        appear
        enter-active-class="animate__animated animate__fadeInLeft"
        leave-active-class="animate__animated animate__fadeOutRight"
      >
        <pagination
          style="text-align: center"
          v-show="total > 0"
          :total="total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="getList"
      /></Transition>
      <el-dialog
        title="详细信息"
        :visible.sync="dialog"
        width="600px"
        append-to-body
        :close-on-click-modal="false"
      >
        <el-descriptions class="margin-top" size="" :column="2" border>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-user"></i>
              卫星型号
            </template>
            {{ data.satelliteID }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-cpu"></i>
              传感器
            </template>
            {{ data.sensorID }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-timer"></i>
              时间
            </template>
            {{ data.produceTime }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-location-outline"></i>
              地域
            </template>
            {{ data.area }}
          </el-descriptions-item>
        </el-descriptions>
        <el-card style="margin-top: 20px">
          <el-image :src="data.url"></el-image>
        </el-card>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialog = false">确 定</el-button>
          <el-button @click="dialog = false">取 消</el-button>
        </div>
      </el-dialog></el-card
    >
  </div>
</template>

<script>
import { reqSateliteInfo, reqSateliteList } from "@/api/index.js";
import pagination from "@/pages/satelite/Pagination";

export default {
  components: { pagination },
  data() {
    return {
      sysURL: require("@/assets/sysconfig/sysconfig.json"),
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        content: undefined,
        type: undefined,
        flag: undefined,
      },
      total: 0,
      loading: false,
      dataList: [],
      data: {},
      dialog: false,
      fullscreenLoading: false,
    };
  },
  created() {
    this.queryParams.content = localStorage.getItem("content");
    this.queryParams.type = localStorage.getItem("type");
    this.queryParams.flag = localStorage.getItem("flag");
    this.getList();
  },
  methods: {
    async getList() {
      this.loading = true;
      await reqSateliteList(this.queryParams).then((response) => {
        this.dataList = response.data.rows;
        this.total = response.data.total;
        this.loading = false;
      });
    },
    download(url) {
      // console.log(this.sysURL.IPAddress.satelite + url);
      window.open(this.sysURL.IPAddress.satelite + url);
    },
    async detail(id) {
      const loading = this.$loading({
        lock: true,
        text: "准备获取数据中，请稍候",
        spinner: "el-icon-loading",
      });
      await reqSateliteInfo(id).then((res) => {
        loading.close();
        this.data = res.data.data;
        this.dialog = true;
      });
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
</style>
