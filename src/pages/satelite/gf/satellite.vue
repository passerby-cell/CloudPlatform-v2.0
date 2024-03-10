<template>
  <div>
    <Transition
      appear
      enter-active-class="animate__animated animate__fadeInLeft"
      leave-active-class="animate__animated animate__fadeOutRight"
    >
      <el-breadcrumb separator="/" class="size">
        <el-breadcrumb-item>数据集管理</el-breadcrumb-item>
        <el-breadcrumb-item>数据检索</el-breadcrumb-item>
      </el-breadcrumb> </Transition
    ><el-card
      class="card-style"
      shadow="hover"
      :body-style="{ padding: '10px' }"
      style="height: calc(100vh - 170px); overflow: hidden"
      ><div class="map" id="olMap"></div>
      <div class="search_body">
        <el-input placeholder="请输入内容" v-model="searchData.content">
          <span slot="prefix" @click="showDialog" style="font-size: 21px">
            <i class="el-input__icon el-icon-menu"></i>
          </span>
          <span slot="suffix" @click="search" style="font-size: 21px">
            <i class="el-input__icon el-icon-search"></i>
          </span>
        </el-input>
        <div v-if="searchDivDialog" style="margin-top: 10px">
          <el-card
            class="box-card"
            shadow="always"
            :body-style="{ background: ' #f3f3f3', color: '#606266' }"
          >
            <div>
              <h3>光学传感器</h3>
              <el-divider></el-divider>
              <div style="line-height: 22px; font-size: 12px">
                <div style="margin-bottom: 10px">
                  <span>卫星-传感器选择</span>
                  <span style="float: right">
                    <el-dropdown @command="handleCommand">
                      <span class="el-dropdown-link">
                        {{ type
                        }}<i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="a"
                          >按分辨率</el-dropdown-item
                        >
                        <el-dropdown-item command="b"
                          >按卫星系列</el-dropdown-item
                        >
                      </el-dropdown-menu>
                    </el-dropdown>
                  </span>
                </div>
                <el-popover placement="right" width="1212" trigger="click">
                  <div style="height: 400px" v-if="type === '按分辨率'">
                    <el-row :gutter="20">
                      <el-col :span="8">
                        <div class="search_body_cgq_title">优于1米</div>
                        <div class="search_body_cgq_title_checkbox">
                          高分二号（GF2）
                        </div>
                        <el-checkbox-group v-model="searchData.SatelliteID">
                          <el-checkbox label="GF2:PMS1"
                            >PMS1(1米全色和4米多光谱相机)</el-checkbox
                          >
                        </el-checkbox-group>
                      </el-col>
                      <el-col :span="8">
                        <div style="margin-bottom: 20px">
                          <div class="search_body_cgq_title">2米</div>
                          <div class="search_body_cgq_title_checkbox">
                            高分1号（GF1）
                          </div>
                          <el-checkbox-group v-model="searchData.SatelliteID">
                            <el-checkbox label="GF1:PMS"
                              >PMS(2米全色和8米多光谱相机)</el-checkbox
                            >
                          </el-checkbox-group>
                        </div>
                        <div style="margin-bottom: 20px">
                          <div class="search_body_cgq_title_checkbox">
                            资源三号2号卫星（ZY302）
                          </div>
                          <el-checkbox-group v-model="searchData.SatelliteID">
                            <el-checkbox label="ZY302:TMS"
                              >TMS（2.5米前视和后视、2.1米正下视和5.8米多光谱）</el-checkbox
                            >
                          </el-checkbox-group>
                        </div>
                        <div style="margin-bottom: 20px">
                          <div class="search_body_cgq_title_checkbox">
                            高分六号（GF6）
                          </div>
                          <el-checkbox-group v-model="searchData.SatelliteID">
                            <el-checkbox label="GF6:PMS"
                              >PMS(2米全色和8米多光谱相机)</el-checkbox
                            >
                          </el-checkbox-group>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div style="margin-bottom: 20px">
                          <div class="search_body_cgq_title">5-6米</div>
                          <div class="search_body_cgq_title_checkbox">
                            资源三号卫星（ZY3）
                          </div>
                          <el-checkbox-group v-model="searchData.SatelliteID">
                            <el-checkbox label="ZY3:MUX">
                              MUX（6米多光谱相机）
                            </el-checkbox>
                          </el-checkbox-group>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                  <div style="height: 400px" v-if="type === '按卫星系列'">
                    <el-row :gutter="20">
                      <el-col :span="12">
                        <div style="margin-bottom: 20px">
                          <div class="search_body_cgq_title">高分系列</div>
                          <div class="search_body_cgq_title_checkbox">
                            高分1号（GF1）
                          </div>
                          <el-checkbox-group v-model="searchData.SatelliteID">
                            <el-checkbox label="GF1:PMS"
                              >PMS(2米全色和8米多光谱相机)</el-checkbox
                            >
                          </el-checkbox-group>
                        </div>
                        <div style="margin-bottom: 20px">
                          <div class="search_body_cgq_title_checkbox">
                            高分二号（GF2）
                          </div>
                          <el-checkbox-group v-model="searchData.SatelliteID">
                            <el-checkbox label="GF2:PMS"
                              >PMS(1米全色和4米多光谱相机)</el-checkbox
                            >
                          </el-checkbox-group>
                        </div>
                        <div style="margin-bottom: 20px">
                          <div class="search_body_cgq_title_checkbox">
                            高分六号（GF6）
                          </div>
                          <el-checkbox-group v-model="searchData.SatelliteID">
                            <el-checkbox label="GF6:PMS"
                              >PMS(2米全色和8米多光谱相机)</el-checkbox
                            >
                          </el-checkbox-group>
                        </div>
                      </el-col>
                      <el-col :span="12">
                        <div style="margin-bottom: 20px">
                          <div class="search_body_cgq_title">资源系列</div>
                          <div class="search_body_cgq_title_checkbox">
                            资源三号2号卫星（ZY302）
                          </div>
                          <el-checkbox-group v-model="searchData.SatelliteID">
                            <el-checkbox label="ZY302:TMS"
                              >TMS（2.5米前视和后视、2.1米正下视和5.8米多光谱）</el-checkbox
                            >
                          </el-checkbox-group>
                        </div>
                        <div style="margin-bottom: 20px">
                          <div class="search_body_cgq_title_checkbox">
                            资源三号卫星（ZY3）
                          </div>
                          <el-checkbox-group v-model="searchData.SatelliteID">
                            <el-checkbox label="ZY3:MUX"
                              >MUX（6米多光谱相机）</el-checkbox
                            >
                          </el-checkbox-group>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                  <div
                    slot="reference"
                    style="
                      width: 100%;
                      background-color: white;
                      text-align: center;
                      line-height: 72px;
                    "
                    ref="cgq"
                  >
                    <div v-if="searchData.SatelliteID.length === 0">
                      点击选择卫星传感器检索
                    </div>
                    <div v-else>
                      <el-row :gutter="10">
                        <el-col
                          :span="8"
                          v-for="tag in searchData.SatelliteID"
                          :key="tag"
                        >
                          <el-tag closable @close="handleClose(tag)">
                            {{ tag }}
                          </el-tag>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                </el-popover>
              </div>
              <div style="line-height: 22px; font-size: 12px; margin-top: 20px">
                <div style="margin-bottom: 10px">
                  <span>采集时间</span>
                </div>
                <div>
                  <el-date-picker
                    style="width: 100%"
                    v-model="searchData.ProduceTime"
                    type="daterange"
                    value-format="yyyy-MM-dd"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    align="right"
                    unlink-panels
                    :picker-options="pickerOptions"
                  >
                  </el-date-picker>
                </div>
              </div>
              <div style="line-height: 22px; font-size: 12px; margin-top: 20px">
                <div style="margin-bottom: 10px">
                  <span>一带一路示范区域选择</span>
                </div>
                <el-popover width="600" trigger="click">
                  <div style="height: 260px">
                    <div>
                      <span class="search_body_xzqy_left">热点区域：</span>
                      <span
                        style="color: #3b3030; margin-right: 20px"
                        @click="handleCity('孟买')"
                        >孟买</span
                      >
                      <span
                        style="color: #3b3030; margin-right: 20px"
                        @click="handleCity('高雄港')"
                        >高雄港</span
                      >
                      <span
                        style="color: #3b3030; margin-right: 20px"
                        @click="handleCity('瓜德尔港')"
                        >瓜德尔港</span
                      >
                      <span
                        style="color: #3b3030; margin-right: 20px"
                        @click="handleCity('缅甸')"
                        >缅甸</span
                      >
                      <span
                        style="color: #3b3030"
                        @click="handleCity('孟加拉国')"
                        >孟加拉国</span
                      >
                    </div>
                    <el-divider style="font-size: 20px"></el-divider>
                    <el-row :gutter="20">
                      <el-col :xs="12" :sm="12" :lg="{ span: '4-8' }">
                        <div class="search_body_xzqy_left">道路提取</div>
                        <div
                          class="search_body_xzqy_left"
                          @click="handleCity('孟买')"
                        >
                          孟买
                        </div>
                      </el-col>
                      <el-col :xs="12" :sm="12" :lg="{ span: '4-8' }">
                        <div class="search_body_xzqy_left">土地利用分类</div>
                        <div
                          class="search_body_xzqy_left"
                          @click="handleCity('瓜德尔港')"
                        >
                          瓜德尔港
                        </div>
                        <div
                          class="search_body_xzqy_left"
                          @click="handleCity('厦门港')"
                        >
                          厦门港
                        </div>
                        <div
                          class="search_body_xzqy_left"
                          @click="handleCity('高雄港')"
                        >
                          高雄港
                        </div>
                      </el-col>
                      <el-col :xs="12" :sm="12" :lg="{ span: '4-8' }">
                        <div class="search_body_xzqy_left">水稻长势检测</div>
                        <div
                          class="search_body_xzqy_left"
                          @click="handleCity('缅甸')"
                        >
                          缅甸
                        </div>
                      </el-col>
                      <el-col :xs="12" :sm="12" :lg="{ span: '4-8' }">
                        <div class="search_body_xzqy_left">洪涝灾害监测</div>
                        <div
                          class="search_body_xzqy_left"
                          @click="handleCity('孟加拉国')"
                        >
                          孟加拉国
                        </div>
                        <div
                          class="search_body_xzqy_left"
                          @click="handleCity('博格拉地区')"
                        >
                          博格拉地区
                        </div>
                        <div
                          class="search_body_xzqy_left"
                          @click="handleCity('加尔各答')"
                        >
                          加尔各答
                        </div>
                      </el-col>
                      <el-col :xs="12" :sm="12" :lg="{ span: '4-8' }">
                        <div class="search_body_xzqy_left">干旱监测</div>
                        <div
                          class="search_body_xzqy_left"
                          @click="handleCity('哈萨克斯坦')"
                        >
                          哈萨克斯坦
                        </div>
                        <div
                          class="search_body_xzqy_left"
                          @click="handleCity('新疆')"
                        >
                          新疆
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                  <div
                    slot="reference"
                    style="
                      width: 100%;
                      background-color: white;
                      text-align: center;
                      line-height: 72px;
                    "
                    ref="xzqy"
                  >
                    <div v-if="!searchData.area">点击选择新政区域检索</div>
                    <div v-else>{{ searchData.area }}</div>
                  </div>
                </el-popover>
              </div>
              <div style="line-height: 22px; font-size: 12px; margin-top: 20px">
                <div style="margin-bottom: 10px">
                  <span>
                    <span class="search_body_xzqy_left">热点区域：</span>
                    <span>
                      <span
                        style="color: #3b3030; margin-right: 10px"
                        @click="handleCity('中国')"
                        >中国</span
                      >
                      <span
                        style="color: #3b3030; margin-right: 10px"
                        @click="handleCity('张家口市')"
                        >张家口市</span
                      >
                      <span
                        style="color: #3b3030; margin-right: 10px"
                        @click="handleCity('北京市')"
                        >北京市</span
                      >
                      <span
                        style="color: #3b3030; margin-right: 10px"
                        @click="handleCity('海口市')"
                        >海口市</span
                      >
                      <span
                        style="color: #3b3030; margin-right: 10px"
                        @click="handleCity('武汉市')"
                        >武汉市</span
                      >
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </el-card>
        </div>
        <div v-if="dataDialog" style="margin-top: 10px">
          <div></div>

          <el-card>
            <div slot="header" class="clearfix">
              <el-button
                type="primary"
                icon="el-icon-download"
                circle
                @click="downloadAll"
              ></el-button>
              <el-button
                type="primary"
                icon="el-icon-view"
                circle
                @click="dataDialog = false"
              ></el-button>
            </div>

            <el-table
              :data="tableData"
              style="width: 100%; height: 520px; overflow: auto"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55"> </el-table-column>
              <el-table-column prop="img" label="图片">
                <template slot-scope="scope">
                  <img :src="scope.row.img" width="80" height="80" />
                </template>
              </el-table-column>
              <el-table-column prop="title" label="名称"> </el-table-column>
              <el-table-column
                label="操作"
                align="center"
                class-name="small-padding fixed-width"
              >
                <template slot-scope="scope">
                  <div>
                    <el-button
                      size="mini"
                      type="text"
                      icon="el-icon-view"
                      @click="detail(scope.row.id)"
                      >详情
                    </el-button>
                  </div>
                  <div>
                    <el-button
                      size="mini"
                      type="text"
                      icon="el-icon-download"
                      @click="download(scope.row.url)"
                      >下载
                    </el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>

            <pagination
              v-show="total > 0"
              :total="total"
              :page.sync="searchData.pageNum"
              :limit.sync="searchData.pageSize"
              @pagination="search"
            />
          </el-card>
        </div>
      </div>
      <el-dialog
        title="详细信息"
        :visible.sync="dialog"
        width="1350px"
        append-to-body
        :close-on-click-modal="false"
      >
        <el-row :gutter="20">
          <el-col :span="12">
            <img :src="data.img" style="width: 100%; height: 100%" alt="" />
          </el-col>
          <el-col :span="12">
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
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-timer"></i>
                  东经
                </template>
                {{ data.e }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-location-outline"></i>
                  北纬
                </template>
                {{ data.n }}
              </el-descriptions-item>
            </el-descriptions>
          </el-col>
        </el-row>
      </el-dialog>
      <!-- <Transition
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
      > -->
    </el-card>
  </div>
</template>

<script>
import "ol/ol.css";
import { Tile as TileLayer } from "ol/layer";
import XYZ from "ol/source/XYZ";
import { defaults as defaultControls } from "ol/control";
import Map from "ol/Map.js";
import View from "ol/View.js";
import { downloadZip, getInfo, newList } from "@/api";
export default {
  data() {
    return {
      sysURL: require("@/assets/sysconfig/sysconfig.json"),
      satellite: "",
      satelliteList: ["GF1", "GF2", "GF3", "GF4", "GF5", "GF6", "ZY3"],
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一年",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三年",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 365 * 3);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近六年",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 365 * 6);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      total: 0,
      map: null,
      parser: null,
      type: "按分辨率",
      searchData: {
        SatelliteID: [],
        area: "",
        pageNum: 1,
        pageSize: 20,
        content: "",
      },
      cgqTitle: "",
      searchDivDialog: false,
      dataDialog: false,
      tableData: [],
      multipleSelection: [],
      dialog: false,
      data: {},
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
    downloadAll() {
      if (this.multipleSelection.length === 0) {
        this.$message.warning("请勾选至少一个资料进行下载！");
        return;
      }
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      const ids = this.multipleSelection.map((x) => x.id);
      downloadZip(ids).then((res) => {
        loading.close();
        window.open(res.msg);
      });
    },
    download(url) {
      // window.location = "http://localhost:8080" + url;
      window.open(this.sysURL.IPAddress.tianditu + url);
    },
    detail(id) {
      const loading = this.$loading({
        lock: true,
        text: "准备获取数据中，请稍候",
        spinner: "el-icon-loading",
      });
      getInfo(id).then((res) => {
        loading.close();
        this.data = res.data;
        this.dialog = true;
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    search() {
      if (!this.searchData.content) {
        if (this.searchData.SatelliteID.length === 0) {
          this.$message.warning("请选择传感器");
          return;
        }
        this.searchData.cgq = this.searchData.SatelliteID;
        if (!this.searchData.ProduceTime) {
          this.$message.warning("请选择采集时间");
          return;
        }
        this.searchData.startTime = this.searchData.ProduceTime[0];
        this.searchData.endTime = this.searchData.ProduceTime[1];

        if (!this.searchData.area) {
          this.$message.warning("请选择采集城市");
          return;
        }
      }
      newList(this.searchData).then((res) => {
        this.dataDialog = true;
        this.tableData = res.rows;
        this.total = res.total;
        this.searchDivDialog = false;
      });
    },
    handleCity(city) {
      this.searchData.area = city;
    },
    handleClose(tag) {
      this.searchData.SatelliteID.splice(
        this.searchData.SatelliteID.indexOf(tag),
        1
      );
    },
    handleCommand(command) {
      this.$refs.cgq.click();
      if (command === "a") {
        this.type = "按分辨率";
      } else {
        this.type = "按卫星系列";
      }
    },
    showDialog() {
      this.searchData.content = "";
      this.searchDivDialog = !this.searchDivDialog;
      this.dataDialog = false;
    },
    initMap() {
      const map = new Map({
        target: "olMap",
        view: new View({
          center: [0, 0], //中心点经纬度
          zoom: 4, //图层缩放大小
          projection: "EPSG:4326",
        }),
        controls: defaultControls({
          zoom: true,
          attribution: false,
          rotate: false,
        }),
      });
      this.map = map;
      // 添加地图
      let url = "http://t{0-7}.tianditu.com/DataServer?x={x}&y={y}&l={z}";
      url = `${url}&T=vec_c&tk=9b4ecdac4b2d783fa385db96110f115f`;
      const source = new XYZ({
        url: url,
        projection: "EPSG:4326",
      });
      const tdtLayer = new TileLayer({
        source: source,
      });
      this.map.addLayer(tdtLayer);
      // 添加注记
      url = "http://t{0-7}.tianditu.com/DataServer?x={x}&y={y}&l={z}";
      url = `${url}&T=cva_c&tk=9b4ecdac4b2d783fa385db96110f115f`;
      const sourceCVA = new XYZ({
        url: url,
        projection: "EPSG:4326",
      });
      const tdtcvaLayer = new TileLayer({
        source: sourceCVA,
      });
      this.map.addLayer(tdtcvaLayer);
    },
  },
  mounted() {
    this.initMap();
  },
};
</script>

<style scoped>
.map {
  width: 100%;
  height: calc(100vh - 190px);
  z-index: -1;
}

/* .view_search {
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 400;
  width: 100%;
} */

.menu-head {
  width: 100%;
  height: 70px;
  /* background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(0, 58, 111, 0.8)), to(rgba(0, 58, 111, 0))); */
  background-image: linear-gradient(rgba(0, 58, 111, 0.8), rgba(0, 58, 111, 0));
}

.logo-title {
  display: flex; /* 设置为flex布局 */
  align-items: center; /* 子元素垂直居中对齐 */
  height: 70px;
  line-height: 50px;
  margin-left: 100px;
  font-size: 35px;
}

.search_body {
  position: fixed;
  top: 90px;
  left: 240px;
  width: 450px;
  margin-top: 20px;
  margin-left: 20px;
}

.search_body_cgq_title {
  line-height: 32px;
  font-size: 14px;
  font-weight: 400;
  color: #242e42;
  padding-right: 10px;
  cursor: pointer;
  border-bottom: 1px solid #ddd;
}

.search_body_cgq_title_checkbox {
  font-size: 12px;
  display: block;
  height: 20px;
  line-height: 20px;
  cursor: pointer;
}

.search_body_xzqy_left {
  color: #959795;
  height: 28px;
  line-height: 28px;
  font-weight: 400;
  font-size: 12px;
}

.el-divider--horizontal {
  margin: 10px 0;
  display: block;
  height: 1px;
  width: 100%;
}

.el-col-lg-4-8 {
  width: 20%;
}

.el-card__header {
  background: rgb(243, 243, 243);
}
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
