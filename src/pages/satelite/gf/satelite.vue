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
      </el-breadcrumb>
    </Transition>
    <el-card
      class="card-style"
      shadow="hover"
      :body-style="{ padding: '10px' }"
      style="height: calc(100vh - 170px); overflow: hidden"
    >
      <div class="map" id="olMap"></div>
      <div class="search_body">
        <el-input
          :placeholder="$t('language.Please_enter_content')"
          v-model="searchData.content"
        >
          <span slot="prefix" @click="showDialog" style="font-size: 25px">
            <i class="el-input__icon el-icon-menu"></i>
          </span>
          <span slot="suffix" @click="search" style="font-size: 25px">
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
              <h3>{{ $t("language.Optical_Sensors") }}</h3>
              <el-divider></el-divider>
              <div style="line-height: 22px">
                <div style="margin-bottom: 10px">
                  <span>{{ $t("language.Satellite_Sensor_Selection") }}</span>

                  <span style="float: right">
                    <el-dropdown @command="handleCommand">
                      <span class="el-dropdown-link" style="color: #263f5e">
                        {{ type
                        }}<i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <!-- <el-dropdown-item command="a">{{ $t("language.By_Resolution") }}</el-dropdown-item> -->
                        <!-- <el-dropdown-item command="b">{{ $t("language.By_Satellite_Series") }}</el-dropdown-item> -->
                        <el-dropdown-item command="a">{{
                          $t("language.By_Resolution")
                        }}</el-dropdown-item>
                        <el-dropdown-item command="b">{{
                          $t("language.By_Satellite_Series")
                        }}</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </span>
                </div>
                <el-popover placement="right" width="1212" trigger="click">
                  <!-- <div style="height: 400px;" v-if="type === $t('language.By_Resolution')"> -->
                  <div style="height: 400px" v-if="isByResolution">
                    <el-row :gutter="20">
                      <el-col :span="8">
                        <div class="search_body_cgq_title">
                          {{ $t("language.Better_than_1_meter") }}
                        </div>
                        <div class="search_body_cgq_title_checkbox">
                          {{ $t("language.Gaofen_2") }}
                        </div>
                        <el-checkbox-group v-model="searchData.SatelliteID">
                          <el-checkbox label="GF2:PMS1">{{
                            $t("language.PMS1")
                          }}</el-checkbox>
                        </el-checkbox-group>
                      </el-col>
                      <el-col :span="8">
                        <div style="margin-bottom: 20px">
                          <div class="search_body_cgq_title">
                            {{ $t("language.two_meters") }}
                          </div>
                          <div class="search_body_cgq_title_checkbox">
                            {{ $t("language.Gaofen_1") }}
                          </div>
                          <el-checkbox-group v-model="searchData.SatelliteID">
                            <el-checkbox label="GF1:PMS">{{
                              $t("language.PMS2")
                            }}</el-checkbox>
                          </el-checkbox-group>
                        </div>
                        <div style="margin-bottom: 20px">
                          <div class="search_body_cgq_title_checkbox">
                            {{ $t("language.Ziyuan_3_2") }}
                          </div>
                          <el-checkbox-group v-model="searchData.SatelliteID">
                            <el-checkbox label="ZY302:TMS">{{
                              $t("language.TMS_2_5")
                            }}</el-checkbox>
                          </el-checkbox-group>
                        </div>
                        <div style="margin-bottom: 20px">
                          <div class="search_body_cgq_title_checkbox">
                            {{ $t("language.Gaofen_6") }}
                          </div>
                          <el-checkbox-group v-model="searchData.SatelliteID">
                            <el-checkbox label="GF6:PMS">{{
                              $t("language.PMS2")
                            }}</el-checkbox>
                          </el-checkbox-group>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div style="margin-bottom: 20px">
                          <div class="search_body_cgq_title">
                            {{ $t("language.five_six_meters") }}
                          </div>
                          <div class="search_body_cgq_title_checkbox">
                            {{ $t("language.Ziyuan_3") }}
                          </div>
                          <el-checkbox-group v-model="searchData.SatelliteID">
                            <el-checkbox label="ZY3:MUX">
                              {{ $t("language.MUX_6") }}
                            </el-checkbox>
                          </el-checkbox-group>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                  <!-- <div style="height: 400px;" v-if="type === $t('language.By_Satellite_Series')"> -->
                  <div style="height: 400px" v-if="isBySatelliteSeries">
                    <el-row :gutter="20">
                      <el-col :span="12">
                        <div style="margin-bottom: 20px">
                          <div class="search_body_cgq_title">
                            {{ $t("language.Gaofen_series") }}
                          </div>
                          <div class="search_body_cgq_title_checkbox">
                            {{ $t("language.Gaofen_1") }}
                          </div>
                          <el-checkbox-group v-model="searchData.SatelliteID">
                            <el-checkbox label="GF1:PMS">{{
                              $t("language.PMS2")
                            }}</el-checkbox>
                          </el-checkbox-group>
                        </div>
                        <div style="margin-bottom: 20px">
                          <div class="search_body_cgq_title_checkbox">
                            {{ $t("language.Gaofen_2") }}
                          </div>
                          <el-checkbox-group v-model="searchData.SatelliteID">
                            <el-checkbox label="GF2:PMS">{{
                              $t("language.PMS1")
                            }}</el-checkbox>
                          </el-checkbox-group>
                        </div>
                        <div style="margin-bottom: 20px">
                          <div class="search_body_cgq_title_checkbox">
                            {{ $t("language.Gaofen_6") }}
                          </div>
                          <el-checkbox-group v-model="searchData.SatelliteID">
                            <el-checkbox label="GF6:PMS">{{
                              $t("language.PMS2")
                            }}</el-checkbox>
                          </el-checkbox-group>
                        </div>
                      </el-col>
                      <el-col :span="12">
                        <div style="margin-bottom: 20px">
                          <div class="search_body_cgq_title">
                            {{ $t("language.Ziyuan_series") }}
                          </div>
                          <div class="search_body_cgq_title_checkbox">
                            {{ $t("language.Ziyuan_3_2") }}
                          </div>
                          <el-checkbox-group v-model="searchData.SatelliteID">
                            <el-checkbox label="ZY302:TMS">{{
                              $t("language.TMS_2_5")
                            }}</el-checkbox>
                          </el-checkbox-group>
                        </div>
                        <div style="margin-bottom: 20px">
                          <div class="search_body_cgq_title_checkbox">
                            {{ $t("language.Ziyuan_3") }}
                          </div>
                          <el-checkbox-group v-model="searchData.SatelliteID">
                            <el-checkbox label="ZY3:MUX">{{
                              $t("language.MUX_6")
                            }}</el-checkbox>
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
                      {{
                        $t(
                          "language.Click_to_select_satellite_sensor_for_retrieval"
                        )
                      }}
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
              <div style="line-height: 22px; margin-top: 20px">
                <div style="margin-bottom: 10px">
                  <span>{{ $t("language.Collection_Time") }}</span>
                </div>
                <div>
                  <el-date-picker
                    style="width: 100%"
                    v-model="searchData.ProduceTime"
                    type="daterange"
                    value-format="yyyy-MM-dd"
                    :start-placeholder="$t('language.StartDate')"
                    :end-placeholder="$t('language.EndDate')"
                    align="right"
                    unlink-panels
                    :picker-options="pickerOptions"
                  >
                  </el-date-picker>
                </div>
              </div>
              <div style="line-height: 22px; margin-top: 20px">
                <div style="margin-bottom: 10px">
                  <span>{{
                    $t("language.Belt_and_Road_Demonstration_Area_Selection")
                  }}</span>
                </div>
                <el-popover width="600" trigger="click">
                  <div style="height: 260px">
                    <div>
                      <span class="search_body_xzqy"
                        >{{ $t("language.Hotspot_Areas") }}：</span
                      >
                      <span
                        style="color: #3b3030; margin-right: 20px"
                        @click="handleCity('Mumbai')"
                        >{{ $t("language.Mumbai") }}</span
                      >
                      <span
                        style="color: #3b3030; margin-right: 20px"
                        @click="handleCity('Kaohsiung_Port')"
                        >{{ $t("language.Kaohsiung_Port") }}</span
                      >
                      <span
                        style="color: #3b3030; margin-right: 20px"
                        @click="handleCity('Gwadar_Port')"
                        >{{ $t("language.Gwadar_Port") }}</span
                      >
                      <span
                        style="color: #3b3030; margin-right: 20px"
                        @click="handleCity('Myanmar')"
                        >{{ $t("language.Myanmar") }}</span
                      >
                      <span
                        style="color: #3b3030"
                        @click="handleCity('Bangladesh')"
                        >{{ $t("language.Bangladesh") }}</span
                      >
                    </div>
                    <el-divider style="font-size: 20px"></el-divider>
                    <el-row :gutter="20">
                      <el-col :xs="12" :sm="12" :lg="{ span: '4-8' }">
                        <div class="search_body_xzqy">
                          {{ $t("language.Road_Extraction") }}
                        </div>
                        <div
                          class="search_body_xzqy_left"
                          @click="handleCity('Mumbai')"
                        >
                          {{ $t("language.Mumbai") }}
                        </div>
                      </el-col>
                      <el-col :xs="12" :sm="12" :lg="{ span: '4-8' }">
                        <div class="search_body_xzqy">
                          {{ $t("language.Land_Use_Classification") }}
                        </div>
                        <div
                          class="search_body_xzqy_left"
                          @click="handleCity('Gwadar_Port')"
                        >
                          {{ $t("language.Gwadar_Port") }}
                        </div>
                        <div
                          class="search_body_xzqy_left"
                          @click="handleCity('Xiamen')"
                        >
                          {{ $t("language.Xiamen") }}
                        </div>
                        <div
                          class="search_body_xzqy_left"
                          @click="handleCity('Kaohsiung_Port')"
                        >
                          {{ $t("language.Kaohsiung_Port") }}
                        </div>
                      </el-col>
                      <el-col :xs="12" :sm="12" :lg="{ span: '4-8' }">
                        <div class="search_body_xzqy">
                          {{ $t("language.Rice_Growth_Monitoring") }}
                        </div>
                        <div
                          class="search_body_xzqy_left"
                          @click="handleCity('Myanmar')"
                        >
                          {{ $t("language.Myanmar") }}
                        </div>
                      </el-col>
                      <el-col :xs="12" :sm="12" :lg="{ span: '4-8' }">
                        <div class="search_body_xzqy">
                          {{ $t("language.Flood_Disaster_Monitoring") }}
                        </div>
                        <div
                          class="search_body_xzqy_left"
                          @click="handleCity('Bangladesh')"
                        >
                          {{ $t("language.Bangladesh") }}
                        </div>
                        <div
                          class="search_body_xzqy_left"
                          @click="handleCity('Bogra')"
                        >
                          {{ $t("language.Bogra") }}
                        </div>
                        <div
                          class="search_body_xzqy_left"
                          @click="handleCity('Kolkata')"
                        >
                          {{ $t("language.Kolkata") }}
                        </div>
                      </el-col>
                      <el-col :xs="12" :sm="12" :lg="{ span: '4-8' }">
                        <div class="search_body_xzqy">
                          {{ $t("language.Drought_Monitoring") }}
                        </div>
                        <div
                          class="search_body_xzqy_left"
                          @click="handleCity('Kazakhstan')"
                        >
                          {{ $t("language.Kazakhstan") }}
                        </div>
                        <div
                          class="search_body_xzqy_left"
                          @click="handleCity('Xinjiang')"
                        >
                          {{ $t("language.Xinjiang") }}
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
                    <div v-if="!searchData.area">
                      {{
                        $t("language.Click_to_select_new_area_for_retrieval")
                      }}
                    </div>
                    <div v-else>{{ searchData.area }}</div>
                  </div>
                </el-popover>
              </div>
              <div style="line-height: 22px; margin-top: 20px">
                <div style="margin-bottom: 10px">
                  <span>
                    <span class="search_body_xzqy"
                      >{{ $t("language.Hotspot_Areas") }}：</span
                    >
                    <span>
                      <span
                        class="search_body_hot"
                        style="color: #3b3030; margin-right: 10px"
                        @click="handleCity('Mumbai')"
                        >{{ $t("language.Mumbai") }}</span
                      >
                      <span
                        class="search_body_hot"
                        style="color: #3b3030; margin-right: 10px"
                        @click="handleCity('Kaohsiung_Port')"
                        >{{ $t("language.Kaohsiung_Port") }}</span
                      >
                      <span
                        class="search_body_hot"
                        style="color: #3b3030; margin-right: 10px"
                        @click="handleCity('Gwadar_Port')"
                        >{{ $t("language.Gwadar_Port") }}</span
                      >
                      <span
                        class="search_body_hot"
                        style="color: #3b3030; margin-right: 10px"
                        @click="handleCity('Myanmar')"
                        >{{ $t("language.Myanmar") }}</span
                      >
                      <span
                        class="search_body_hot"
                        style="color: #3b3030; margin-right: 10px"
                        @click="handleCity('Bangladesh')"
                        >{{ $t("language.Bangladesh") }}</span
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
              style="width: 100%; height: 500px; overflow: auto"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55"> </el-table-column>
              <el-table-column prop="img" :label="$t('language.Image')">
                <template slot-scope="scope">
                  <img
                    :src="scope.row.img"
                    @click="showImageOnMap(scope.row)"
                    width="80"
                    height="80"
                  />
                </template>
              </el-table-column>
              <el-table-column prop="title" :label="$t('language.Name')">
                <template v-slot="scope">
                  <span
                    @click="showImageOnMap_name(scope.row)"
                    style="cursor: pointer; color: #409eff"
                  >
                    {{ scope.row.title }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                :label="$t('language.Action')"
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
                      >{{ $t("language.Details") }}
                    </el-button>
                  </div>
                  <div>
                    <el-button
                      size="mini"
                      type="text"
                      icon="el-icon-download"
                      @click="download(scope.row.url)"
                      >{{ $t("language.Download") }}
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
        :title="$t('language.Detailed_Information')"
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
                  {{ $t("language.Satellite_Model") }}
                </template>
                {{ data.satelliteID }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-cpu"></i>
                  {{ $t("language.Sensor") }}
                </template>
                {{ data.sensorID }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-timer"></i>
                  {{ $t("language.Time") }}
                </template>
                {{ data.produceTime }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-location-outline"></i>
                  {{ $t("language.Region") }}
                </template>
                {{ data.area }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-timer"></i>
                  {{ $t("language.East_Longitude") }}
                </template>
                {{ data.e }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-location-outline"></i>
                  {{ $t("language.North_Latitude") }}
                </template>
                {{ data.n }}
              </el-descriptions-item>
            </el-descriptions>
          </el-col>
        </el-row>
      </el-dialog>
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
import { multiply } from "ol/transform";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import Style from "ol/style/Style";
import Stroke from "ol/style/Stroke";
import Fill from "ol/style/Fill";
import { fromExtent } from "ol/geom/Polygon";
import Icon from "ol/style/Icon";
import ImageLayer from "ol/layer/Image";
import ImageStatic from "ol/source/ImageStatic";
import { extend as olExtend, createEmpty, isEmpty } from "ol/extent";
import { fromLonLat, get as getProjection } from "ol/proj";
import { downloadZip, getInfo, newList } from "@/api";

export default {
  data() {
    return {
      sysURL: require("@/assets/sysconfig/sysconfig.json"),
      total: 0,
      map: null,
      parser: null,

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
      imageLayer: null, // 存储图像图层引用
      imageLayers: {},
      grayLayers: {}, // 用于存储灰色背景图层的对象
      blueBorderLayers: {}, // 用于存储蓝色边框图层的对象
      currentViewState: null, // 用于保存当前视图状态
      isSingleImageView: false,
      allImagesViewState: null,
      data: {},
      currentType: "resolution",
      currentLanguage: "中文", // 初始值为当前语言
    };
  },
  computed: {
    type() {
      return this.currentType === "resolution"
        ? this.$t("language.By_Resolution")
        : this.$t("language.By_Satellite_Series");
    },
    isByResolution() {
      return this.currentType === "resolution";
    },
    isBySatelliteSeries() {
      return this.currentType === "series";
    },
    pickerOptions() {
      return {
        shortcuts: [
          {
            text: "2019",
            onClick: (picker) => {
              const start = new Date("2019-01-01");
              const end = new Date("2019-12-31");
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "2020",
            onClick: (picker) => {
              const start = new Date("2020-01-01");
              const end = new Date("2020-12-31");
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "2021",
            onClick: (picker) => {
              const start = new Date("2021-01-01");
              const end = new Date("2021-12-31");
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "2022",
            onClick: (picker) => {
              const start = new Date("2022-01-01");
              const end = new Date("2022-12-31");
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "2023",
            onClick: (picker) => {
              const start = new Date("2023-01-01");
              const end = new Date("2023-12-31");
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      };
    },
  },
  mounted() {
    this.initMap();
  },

  methods: {
    addImageLayer(imageUrl, Extent) {
      const extent = Extent;

      // 创建图像源
      const imageSource = new ImageStatic({
        url: imageUrl,
        projection: getProjection("EPSG:4326"), // 使用地图的投影
        imageExtent: extent, // 图片覆盖的范围
      });

      // 创建图像图层
      const imageLayer = new ImageLayer({
        source: imageSource,
      });

      // 如果已经存在图层，先移除
      // if (this.imageLayer) {
      //   this.map.removeLayer(this.imageLayer);
      // }

      // 保存图层引用并添加到地图上
      this.imageLayer = imageLayer;
      this.map.addLayer(this.imageLayer);

      // 将地图视图定位到图像范围
      // this.map.getView().fit(extent, {
      //   duration: 2000, // 动画持续时间
      //   padding: [500, 500, 300, 500] // 周围空间的大小
      // });
    },

    showImageOnMap(row) {
      const imageUrl = row.img; // 图片 URL
      const Extent = [
        row.minLongitude, //TopLeftLongitude
        row.minLatitude, //BottomRightLatitude
        row.maxLongitude, //BottomRightLongitude
        row.maxLatitude, //TopLeftLatitude
      ];
      this.addImageLayer(imageUrl, Extent);
    },

    addImageLayer_name(imageUrl, Extent) {
      const extent = Extent;

      // 创建图像源
      const imageSource = new ImageStatic({
        url: imageUrl,
        projection: getProjection("EPSG:4326"), // 使用地图的投影
        imageExtent: extent, // 图片覆盖的范围
      });

      // 创建图像图层
      const imageLayer = new ImageLayer({
        source: imageSource,
      });

      // 如果已经存在图层，先移除
      if (this.imageLayer) {
        this.map.removeLayer(this.imageLayer);
      }

      // 保存图层引用并添加到地图上
      this.imageLayer = imageLayer;
      this.map.addLayer(this.imageLayer);

      // 将地图视图定位到图像范围
      this.map.getView().fit(extent, {
        duration: 2000, // 动画持续时间
        padding: [500, 500, 300, 500], // 周围空间的大小
      });
    },

    showImageOnMap_name(row) {
      // 如果当前已经是单张图片视图，那么还原到所有图片的视图状态
      if (this.isSingleImageView) {
        this.showAllImagesOnMap(this.tableData);
        this.isSingleImageView = false; // 更新标记状态
      } else {
        this.clearImageLayers(); // 清除现有的所有图层
        const imageUrl = row.img; // 图片 URL
        const Extent = [
          row.minLongitude, //TopLeftLongitude
          row.minLatitude, //BottomRightLatitude
          row.maxLongitude, //BottomRightLongitude
          row.maxLatitude, //TopLeftLatitude
        ];
        this.addImageLayer_name(imageUrl, Extent);
        this.isSingleImageView = true; // 更新标记状态
      }
    },

    addRectangleLayer(extent, color, id) {
      const rectangleFeature = new Feature({
        geometry: fromExtent(extent),
      });

      // 创建样式对象
      const style = new Style({
        stroke: new Stroke({
          color: "blue", // 将边框颜色设置为蓝色
          width: 1,
        }),
        fill: new Fill({
          color: "rgba(128, 128, 128, 0.3)", // 灰色背景
        }),
      });

      // 为矩形要素应用样式
      rectangleFeature.setStyle(style);

      // 创建矢量源并添加矩形要素
      const vectorSource = new VectorSource({
        features: [rectangleFeature],
      });

      // 创建矢量图层并添加到地图上
      const vectorLayer = new VectorLayer({
        source: vectorSource,
      });

      this.map.addLayer(vectorLayer);
      if (color === "gray") {
        this.grayLayers[id] = vectorLayer;
      } else if (color === "blue") {
        this.blueBorderLayers[id] = vectorLayer;
      }
    },

    showAllImagesOnMap(results) {
      this.clearImageLayers();
      // 初始化一个空的范围用于累计所有结果的范围
      let combinedExtent = createEmpty();
      results.forEach((result) => {
        const extent = [
          result.minLongitude, //TopLeftLongitude
          result.minLatitude, //BottomRightLatitude
          result.maxLongitude, //BottomRightLongitude
          result.maxLatitude, //TopLeftLatitude
        ];
        this.addRectangleLayer(extent, "gray", result.id);

        // 扩展累计范围以包含当前结果的范围
        combinedExtent = olExtend(combinedExtent, extent);
      });

      // 检查累计范围是否有效
      if (!isEmpty(combinedExtent)) {
        // 将地图视图定位到累计范围，确保所有结果都在视图之内
        this.map.getView().fit(combinedExtent, {
          duration: 2000, // 动画持续时间
          padding: [800, 500, 500, 800], // 周围空间的大小
        });
      }
    },

    // clearImageLayers() {
    //   Object.keys(this.grayLayers).forEach(id => {
    //     this.map.removeLayer(this.grayLayers[id]);
    //     delete this.grayLayers[id];
    //   });
    // },

    clearImageLayers() {
      // 清除灰色图层
      Object.keys(this.grayLayers).forEach((id) => {
        this.map.removeLayer(this.grayLayers[id]);
        delete this.grayLayers[id];
      });

      // 清除蓝色边框图层
      Object.keys(this.blueBorderLayers).forEach((id) => {
        this.map.removeLayer(this.blueBorderLayers[id]);
        delete this.blueBorderLayers[id];
      });

      // 清除图像图层
      if (this.imageLayer) {
        this.map.removeLayer(this.imageLayer);
        this.imageLayer = null;
      }
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
        window.location = res.msg;
      });
    },
    download(url) {
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
        // 调用 showAllImagesOnMap 展示所有搜索结果
        this.showAllImagesOnMap(this.tableData);
      });
    },
    handleCity(city) {
      // this.searchData.area = city;
      this.searchData.area = this.$t(`language.${city}`);
    },
    handleClose(tag) {
      this.searchData.SatelliteID.splice(
        this.searchData.SatelliteID.indexOf(tag),
        1
      );
    },
    // handleCommand(command) {
    //   this.$refs.cgq.click()
    //   if (command === 'a') {
    //     this.currentType = '按分辨率'
    //   } else {
    //     this.currentType = '按卫星系列'
    //   }
    // },
    handleCommand(command) {
      if (command === "a") {
        this.currentType = "resolution";
      } else if (command === "b") {
        this.currentType = "series";
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
      // url = `${url}&T=vec_c&tk=9b4ecdac4b2d783fa385db96110f115f`; //矢量底图
      // url = `${url}&T=img_c&tk=9b4ecdac4b2d783fa385db96110f115f`; //影像底图
      url = `${url}&T=ter_c&tk=9b4ecdac4b2d783fa385db96110f115f`; //地形底图
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
      // url = `${url}&T=cva_c&tk=9b4ecdac4b2d783fa385db96110f115f`; //矢量注记
      // url = `${url}&T=cia_c&tk=9b4ecdac4b2d783fa385db96110f115f`; //影像注记
      url = `${url}&T=cta_c&tk=9b4ecdac4b2d783fa385db96110f115f`; //地形注记
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
