<template>
  <div>
    <Transition
      appear
      enter-active-class="animate__animated animate__fadeInLeft"
      leave-active-class="animate__animated animate__fadeOutRight"
    >
      <el-breadcrumb separator="/" class="size">
        <el-breadcrumb-item>数据集</el-breadcrumb-item>
        <el-breadcrumb-item>数据视图</el-breadcrumb-item>
      </el-breadcrumb>
    </Transition>
    <el-card
      class="card-style"
      shadow="hover"
      :body-style="{ padding: '10px' }"
      style="height: calc(100vh - 170px)"
    >
      <el-row>
        <!-- <el-select class="size" v-model="tag" placeholder="请选择示范点" style="width: 200px" @change="selectChange" clearable
          @clear="fixMap()" size="small">
          <el-option v-for="item in options" :key="item.index" :label="item.name" :value="item.tag">
          </el-option>
        </el-select> -->
        <el-cascader
          v-model="alltag"
          :options="allOptions"
          :props="{ expandTrigger: 'hover' }"
          size="small"
          class="size"
          clearable
          @clear="fixMap()"
          placeholder="请选择示范点"
          @change="selectChange"
        ></el-cascader>
        <el-button
          @click="changeSize()"
          size="small"
          type="primary"
          style="margin-left: 10px"
          v-if="!showDoubleMap"
          >结果对比</el-button
        >
        <el-button
          @click="changeSize()"
          size="small"
          type="primary"
          style="margin-left: 10px"
          v-if="showDoubleMap"
          >还原</el-button
        >
      </el-row>
      <el-button
        @click="create()"
        size="small"
        v-if="tag"
        style="
          position: fixed;
          bottom: 260px;
          right: 31px;
          z-index: 9999999;
          font-size: 16px;
          padding: 6px;
        "
        icon="el-icon-circle-plus-outline"
      ></el-button>

      <!-- <el-button @click="full()" size="small" v-if="tag" style="
          position: fixed;
          bottom: 260px;
          right: 31px;
          z-index: 9999999;
          font-size: 16px;
          padding: 6px;
        " icon="el-icon-full-screen"></el-button> -->
      <el-button
        @click="addThreeD()"
        size="small"
        style="
          position: fixed;
          bottom: 185px;
          right: 31px;
          z-index: 9999999;
          font-size: 14px;
          padding: 5px;
        "
        v-if="!is3D"
        >3D</el-button
      >
      <el-button
        @click="addTwoD()"
        size="small"
        style="
          position: fixed;
          bottom: 185px;
          right: 31px;
          z-index: 9999999;
          font-size: 14px;
          padding: 5px;
        "
        v-if="is3D"
        >2D</el-button
      >
      <el-button
        @click="fixMap()"
        size="small"
        style="
          position: fixed;
          bottom: 222px;
          right: 31px;
          z-index: 9999999;
          font-size: 16px;
          padding: 6px;
        "
        icon="el-icon-view"
      ></el-button>
      <!-- <el-button
        @click="initMap(3)"
        size="small"
        style="
          position: fixed;
          bottom: 260px;
          right: 31px;
          z-index: 9999999;
          font-size: 16px;
          padding: 6px;
        "
        v-if="!isFixed"
        icon="el-icon-refresh-left"
      ></el-button> -->

      <div id="map" style="float: right"></div>
      <div id="resultMap" style="float: left"></div>
      <el-card
        v-if="showDoubleMap && selectedTag == '孟买'"
        style="
          width: 120px;
          height: 30px;
          position: fixed;
          top: 168px;
          left: 230px;
          z-index: 9;
        "
        :body-style="{ padding: '5px' }"
      >
        <div style="line-height: 20px; height: 20px">
          <div
            style="
              width: 70px;
              height: 8px;
              background-color: #6eed47;
              border-radius: 0%;
              display: inline-block;
              margin-bottom: 2px;
            "
          ></div>
          <div style="display: inline-block; font-size: 16px; margin-left: 4px">
            道路
          </div>
        </div>
      </el-card>
      <el-card
        v-if="showDoubleMap && selectedTag == '瓜德尔港'"
        style="
          width: 70px;
          height: 110px;
          position: fixed;
          top: 168px;
          left: 230px;
          z-index: 9;
        "
        :body-style="{ padding: '5px' }"
      >
        <div style="line-height: 16px; height: 16px; margin-top: 4px">
          <div
            style="
              width: 14px;
              height: 14px;
              background-color: #ea3323;
              border-radius: 50%;
              display: inline-block;
            "
          ></div>
          <div style="display: inline-block; font-size: 16px; margin-left: 4px">
            建筑
          </div>
        </div>
        <div style="line-height: 16px; height: 16px; margin-top: 4px">
          <div
            style="
              width: 14px;
              height: 14px;
              background-color: #ef8733;
              border-radius: 50%;
              display: inline-block;
            "
          ></div>
          <div style="display: inline-block; font-size: 16px; margin-left: 4px">
            道路
          </div>
        </div>
        <div style="line-height: 16px; height: 16px; margin-top: 4px">
          <div
            style="
              width: 14px;
              height: 14px;
              background-color: #377e22;
              border-radius: 50%;
              display: inline-block;
            "
          ></div>
          <div style="display: inline-block; font-size: 16px; margin-left: 4px">
            植被
          </div>
        </div>
        <div style="line-height: 16px; height: 16px; margin-top: 4px">
          <div
            style="
              width: 14px;
              height: 14px;
              background-color: #0000f5;
              border-radius: 50%;
              display: inline-block;
            "
          ></div>
          <div style="display: inline-block; font-size: 16px; margin-left: 4px">
            水体
          </div>
        </div>
        <div style="line-height: 16px; height: 16px; margin-top: 4px">
          <div
            style="
              width: 14px;
              height: 14px;
              background-color: #75147c;
              border-radius: 50%;
              display: inline-block;
            "
          ></div>
          <div style="display: inline-block; font-size: 16px; margin-left: 4px">
            港口
          </div>
        </div>
      </el-card>
      <el-card
        v-if="showDoubleMap && selectedTag == '孟加拉国'"
        style="
          width: 70px;
          height: 28px;
          line-height: 28px;
          position: fixed;
          top: 168px;
          left: 230px;
          z-index: 9;
          background-color: #5a9cf8;
          border: #5a9cf8;
        "
        :body-style="{ padding: '5px' }"
      >
        <div style="line-height: 16px; height: 16px">
          <div
            style="
              width: 14px;
              height: 14px;
              background-color: #ffffff;
              border-radius: 50%;
              display: inline-block;
            "
          ></div>
          <div style="display: inline-block; font-size: 16px; margin-left: 4px">
            水体
          </div>
        </div>
      </el-card>
      <el-card
        v-if="
          showDoubleMap &&
          (selectedTag == '新疆' || selectedTag == '哈萨克斯坦')
        "
        style="
          width: 300px;
          height: 50px;
          position: fixed;
          top: 168px;
          left: 230px;
          z-index: 9;
        "
        :body-style="{ padding: '10px' }"
        ><div
          style="
            width: 280px;
            height: 10px;
            background: linear-gradient(to right, #c2523c, #30e100, #0b2f79);
            border-radius: 4px;
          "
        ></div>
        <span style="float: left; margin-top: 4px" class="size">干旱</span
        ><span style="float: right; margin-top: 4px" class="size"
          >湿润</span
        ></el-card
      >
      <el-card
        v-if="showDoubleMap && selectedTag == '缅甸'"
        style="
          width: 100px;
          height: 100px;
          position: fixed;
          top: 168px;
          left: 230px;
          z-index: 9;
        "
        :body-style="{ padding: '10px' }"
        >我是缅甸图例</el-card
      >

      <el-date-picker
        v-if="
          showDoubleMap &&
          (selectedTag == '新疆' || selectedTag == '哈萨克斯坦')
        "
        class="date-picker"
        v-model="imgDate"
        type="month"
        value-format="yyyy - M"
        @change="changeGanHanImage()"
      ></el-date-picker>
    </el-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { addGuadaerLayer } from "./guadaer";
import { mengjialaguo_after } from "./mengjialaguo";
import { addHasakesitanLayer, addXinJiangLayer } from "./ganhan";
import { trimAll } from "@/utils/string.js";
// import mapboxgl from "mapbox-gl";
import MapboxLanguage from "@mapbox/mapbox-gl-language";
import {} from "@/api";

export default {
  name: "DataView",
  data() {
    return {
      sysURL: require("@/assets/sysconfig/sysconfig.json"),
      ganhanImagePath: "userInfo/preview/ganhanresult/",
      imgDate: "2018 - 1",
      mapState: [
        [
          "geoserver/fulidebuer/wms?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&WIDTH=256&HEIGHT=256&layers=fulidebuer:before_fulidebuer",
        ],
        [
          "geoserver/kangsitannai/wms?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&WIDTH=256&HEIGHT=256&layers=kangsitannai:all_kangsitannai",
        ],
        [
          "geoserver/jiaergeda/wms?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&WIDTH=256&HEIGHT=256&layers=jiaergeda:all_jiaergeda",
        ],
        [
          "geoserver/gaoxionggang/wms?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&WIDTH=256&HEIGHT=256&layers=gaoxionggang:all_gaoxionggang",
        ],
        [
          "geoserver/bogela/wms?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&WIDTH=256&HEIGHT=256&layers=bogela:all_bogela_before",
        ],
        [
          "geoserver/yiluowadi/wms?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&WIDTH=256&HEIGHT=256&layers=yiluowadi:all_yiluowadi",
        ],
        [
          "geoserver/xiamengang/wms?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&WIDTH=256&HEIGHT=256&layers=xiamengang:all_xiamengang",
        ],
        [
          "geoserver/guadaer/wms?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&WIDTH=256&HEIGHT=256&layers=guadaer:guadaer1",
          "geoserver/guadaer/wms?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&WIDTH=256&HEIGHT=256&layers=guadaer:guadaer2",
          "geoserver/guadaer/wms?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&WIDTH=256&HEIGHT=256&layers=guadaer:guadaer3",
          "geoserver/guadaer/wms?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&WIDTH=256&HEIGHT=256&layers=guadaer:guadaer4",
          "geoserver/guadaer/wms?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&WIDTH=256&HEIGHT=256&layers=guadaer:guadaer5",
        ],
        [
          "geoserver/mengmai/wms?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&WIDTH=256&HEIGHT=256&layers=mengmai:mengmai1",
          "geoserver/mengmai/wms?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&WIDTH=256&HEIGHT=256&layers=mengmai:mengmai2",
          "geoserver/mengmai/wms?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&WIDTH=256&HEIGHT=256&layers=mengmai:mengmai3",
          "geoserver/mengmai/wms?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&WIDTH=256&HEIGHT=256&layers=mengmai:mengmai4",
          "geoserver/mengmai/wms?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&WIDTH=256&HEIGHT=256&layers=mengmai:mengmai5",
          "geoserver/mengmai/wms?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&WIDTH=256&HEIGHT=256&layers=mengmai:mengmai6",
          "geoserver/mengmai/wms?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&WIDTH=256&HEIGHT=256&layers=mengmai:mengmai7",
          "geoserver/mengmai/wms?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&WIDTH=256&HEIGHT=256&layers=mengmai:mengmai8",
          "geoserver/mengmai/wms?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&WIDTH=256&HEIGHT=256&layers=mengmai:mengmai9",
          "geoserver/mengmai/wms?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&WIDTH=256&HEIGHT=256&layers=mengmai:mengmai10",
        ],
      ],
      map: null,
      fullMap: null,
      resultMap: null,
      tag: null,
      alltag: [],
      selectedTag: null,
      is3D: false,
      isFixed: true,
      isFullScreen: false,
      templateId: null,
      showDoubleMap: false,
      currentImage: 0,
      frameCount: 5,
      allOptions: [
        {
          value: "道路提取",
          label: "道路提取",
          children: [
            {
              index: 0,
              value: "0",
              label: "孟买",
              name: "孟买",
              color: "#18f218",
              tag: [72.880127, 19.075847],
              zoom: 15,
              templateId: 39,
              message: `<div style="height:100%;width:100%;">
              <div style="text-align:center"><h1>孟买</h1></div>
              <div>
                <h5 style="font-size:16px"><span style="font-weight:800;">简介:</span>孟买, 是印度西部滨海城市，印度第一大港口，棉纺织业中心，马哈拉施特拉邦首府。孟买是印度重要的贸易中心和港口城市。</h5>
              </div>
              </div>`,
            },
          ],
        },

        {
          value: "土地利用分类",
          label: "土地利用分类",
          children: [
            {
              index: 0,
              name: "瓜德尔港",
              value: "0",
              label: "瓜德尔港",
              tag: [62.323615, 25.119452],
              color: "#b3c0d1",
              zoom: 15,
              templateId: 32,
              message: `<div style="height:100%;width:100%;">
              <div style="text-align:center"><h1>瓜德尔港</h1></div>
              <div>
                <h5 style="font-size:16px"><span style="font-weight:800;">简介:</span>瓜德尔港是巴基斯坦的重要港口。瓜德尔港位于巴基斯坦俾路支省西南部瓜德尔城南部，为深水良港。中国政府应穆沙拉夫总统的请求为该港口建设提供资金和技术援助。该港口于2002年3月开工兴建，2015年2月瓜德尔港基本竣工，4月中旬全面投入运营。中国部分石油的运输路程将缩短85%。</h5>
              </div>
              </div>`,
            },
            {
              index: 1,
              name: "厦门港",
              value: "1",
              label: "厦门港",
              tag: [118.04787047095806, 24.4265100494397],
              color: "#b3c0d1",
              zoom: 12,
              templateId: 32,
              message: `<div style="height:100%;width:100%;">
              <div style="text-align:center"><h1>厦门港</h1></div>
              <div>
                <h5 style="font-size:16px"><span style="font-weight:800;">简介:</span>厦门港，是中国 福建省 厦门市 和 漳州市 港口，位于中国东南沿海、台湾海峡西岸，地处福建省南部、 九龙江 入海口，是中国沿海主要港口、中国对外开放一类口岸，也是福建省主要出海口之一。</h5>
              </div>
              </div>`,
            },
            {
              index: 2,
              name: "高雄港",
              value: "2",
              label: "高雄港",
              tag: [120.32679399057355, 22.552896651715784],
              color: "#b3c0d1",
              zoom: 12,
              templateId: 32,
              message: `<div style="height:100%;width:100%;">
              <div style="text-align:center"><h1>高雄港</h1></div>
              <div>
                <h5 style="font-size:16px"><span style="font-weight:800;">简介:</span>高雄港(Kaohsiung Port)，中国台湾省内最大的海港。位于中国台湾省高雄市。大型综合性港口，有铁路、高速公路作为货物集运与疏运手段。</h5>
              </div>
              </div>`,
            },
          ],
        },
        {
          value: "水稻长势监测",
          label: "水稻长势监测",
          children: [
            {
              index: 0,
              name: "缅甸",
              value: "0",
              label: "缅甸",
              color: "#BB271A",
              tag: [95.18500391855429, 17.320208045937093],
              zoom: 15,
              templateId: 38,
              message: `<div style="height:100%;width:100%;">
              <div style="text-align:center"><h1>缅甸</h1></div>
              <div>
                <h5 style="font-size:16px"><span style="font-weight:800;">简介:</span>缅甸联邦共和国（The Republic of the Union of Myanmar）。面积：676578平方公里。人口：5458万（2020年4月），共有135个民族，主要有缅族、克伦族、掸族、克钦族、钦族、克耶族、孟族和若开族等，缅族约占总人口的65%。</h5>
              </div>
              </div>`,
            },
          ],
        },
        {
          value: "洪涝灾害监测",
          label: "洪涝灾害监测",
          children: [
            {
              index: 0,
              name: "孟加拉国",
              value: "0",
              label: "孟加拉国",
              tag: [89.91287977937156, 23.64362166893602],
              color: "#4ea0fd",
              zoom: 11,
              templateId: 34,
              message: `<div style="height:100%;width:100%;">
              <div style="text-align:center"><h1>孟加拉国</h1></div>
              <div>
                <h5 style="font-size:16px"><span style="font-weight:800;">简介:</span>孟加拉国位于南亚次大陆东北部的恒河和布拉马普特拉河冲积而成的三角洲上。东、西、北三面与印度毗邻，东南部与缅甸接壤，南部濒临孟加拉湾。海岸线长550公里。全境85%的地区为平原，东南部和东北部为丘陵地带，国土大部分地区海拔低于12米。</h5>
              </div>
              </div>`,
            },
            {
              index: 1,
              name: "博格拉地区",
              value: "1",
              label: "博格拉地区",
              tag: [89.45129761679254, 24.937121301900987],
              color: "#4ea0fd",
              zoom: 11,
              templateId: 34,
              message: `<div style="height:100%;width:100%;">
              <div style="text-align:center"><h1>博格拉地区</h1></div>
              <div>
                <h5 style="font-size:16px"><span style="font-weight:800;">简介:</span>博格拉（Bogra）于拉杰沙希区，是孟加拉国最古老、最迷人的城镇之一。，孟加拉国古老的历史记载了古代王朝在这里的征服。 这里是孟加拉国北部的中心，有发达的经济和多样的文化。</h5>
              </div>
              </div>`,
            },
            {
              index: 2,
              name: "加尔各答",
              value: "2",
              label: "加尔各答",
              tag: [88.4470964626986, 22.46568144508325],
              color: "#4ea0fd",
              zoom: 15,
              templateId: 34,
              message: `<div style="height:100%;width:100%;">
              <div style="text-align:center"><h1>加尔各答</h1></div>
              <div>
                <h5 style="font-size:16px"><span style="font-weight:800;">简介:</span>加尔各答位于印度东部，紧靠胡格利河，海拔6米，城市结构独特，除本身外，尚包括众多的卫星城市（镇），大市区沿胡格利河岸南北延伸达80千米，宽5-20千米不等，截至2011年，人口达457.29万人。</h5>
              </div>
              </div>`,
            },
          ],
        },
        {
          value: "干旱监测",
          label: "干旱监测",
          children: [
            {
              index: 0,
              name: "哈萨克斯坦",
              value: "0",
              label: "哈萨克斯坦",
              color: "#ffdf60",
              tag: [64.75577203619281, 53.29277096996523],
              zoom: 12,
              templateId: 36,
              message: `<div style="height:100%;width:100%;">
              <div style="text-align:center"><h1>哈萨克斯坦</h1></div>
              <div>
                <h5 style="font-size:16px"><span style="font-weight:800;">简介:</span>哈萨克斯坦共和国位于中亚北部，与我国的新疆维吾尔自治区接壤。哈萨克斯坦是一个横跨亚洲、欧洲两大陆的国家，其在乌拉尔河以西的一小部分领土位于欧洲。</h5>
              </div>
              </div>`,
            },
            {
              index: 1,
              name: "新疆",
              value: "1",
              label: "新疆",
              color: "#ffdf60",
              tag: [83.80970464725857, 40.39604221906748],
              zoom: 5,
              templateId: 36,
              message: `<div style="height:100%;width:100%;">
              <div style="text-align:center"><h1>新疆</h1></div>
              <div>
                <h5 style="font-size:16px"><span style="font-weight:800;">简介:</span>新疆占中国总面积的六分之一，是中国面积最大的省级行政区。 新疆地处亚欧大陆腹地，与俄罗斯、哈萨克斯坦、吉尔吉斯斯坦、塔吉克斯坦、巴基斯坦、蒙古、印度、阿富汗等八国接壤，在历史上是沟通东西方、闻名于世的“丝绸之路”的要冲，现在又成为第二座“亚欧大陆桥”的必经之地，战略位置十分重要。</h5>
              </div>
              </div>`,
            },
          ],
        },
      ],
      map_x: null,
      map_y: null,
      map_zoom: null,
      map_pitch: null,
      map_bear: null,
    };
  },
  computed: {},
  methods: {
    getMapIndexInfo() {
      // 拖拽
      this.map_x = this.map.getCenter().lng;
      this.map_y = this.map.getCenter().lat;
      //   放大缩小
      this.map_zoom = this.map.getZoom();
      // 倾斜
      this.map_pitch = this.map.getPitch();
      // 旋转
      this.map_bear = this.map.getBearing();
    },
    useInfoSetMap() {
      this.map.setCenter([this.map_x, this.map_y]);
      this.map.setZoom(this.map_zoom);
      this.map.setPitch(this.map_pitch);
      this.map.setBearing(this.map_bear);
      // this.tag = this.selectedTag
      if (this.resultMap != null) {
        this.resultMap.setCenter([this.map_x, this.map_y]);
        this.resultMap.setZoom(this.map_zoom);
        this.resultMap.setPitch(this.map_pitch);
        this.resultMap.setBearing(this.map_bear);
      }
    },
    removeMap() {
      let resultMap = document.getElementById("resultMap");
      let map = document.getElementById("map");
      while (resultMap.hasChildNodes()) {
        resultMap.removeChild(resultMap.firstChild);
      }
      while (map.hasChildNodes()) {
        map.removeChild(map.firstChild);
      }
    },
    changeSize() {
      let timer;
      this.getMapIndexInfo();
      if (!this.showDoubleMap) {
        this.showDoubleMap = true;
        this.removeMap();
        document.getElementById("map").style.width =
          (document.body.clientWidth - 200 - 42) / 2 + "px";
        document.getElementById("resultMap").style.width =
          (document.body.clientWidth - 200 - 42) / 2 + "px";
        document.getElementById("resultMap").style.top = 10 + "px";
        document.getElementById("resultMap").style.float = "left";
        document.getElementById("map").style.float = "right";

        this.initMap(3, true);
      } else {
        this.removeMap();
        document.getElementById("map").style.width =
          document.body.clientWidth - 200 - 40 + "px";
        document.getElementById("resultMap").style.top = 200 + "px";

        this.showDoubleMap = false;
        this.initMap(3, false);
        // clearInterval(timer)
      }
      this.useInfoSetMap();
    },
    create() {
      this.$store.dispatch("Template/getJobTemplate", {
        templateId: this.templateId,
      });
      this.$store.dispatch("Template/getTaskTemplate", {
        templateId: this.templateId,
      });
      this.$router.push({
        name: "standardjob",
        query: { templateId: this.templateId },
      });
    },
    addThreeD() {
      this.map.addSource("mapbox-dem", {
        type: "raster-dem",
        url: "mapbox://mapbox.mapbox-terrain-dem-v1",
        tileSize: 512,
        maxzoom: 14,
      });
      this.map.setTerrain({ source: "mapbox-dem", exaggeration: 1.5 });
      this.resultMap.setTerrain({ source: "mapbox-dem", exaggeration: 1.5 });
      this.is3D = true;
      this.isFixed = false;
    },
    addTwoD() {
      this.map.setTerrain();
      this.resultMap.setTerrain();
      this.map.removeSource("mapbox-dem");
      this.resultMap.removeSource("mapbox-dem");
      this.is3D = false;
      this.isFixed = false;
    },
    full() {
      this.isFullScreen = true;
      this.launchFullscreen(document.getElementById("fullScreenMap"));
    },
    launchFullscreen(element) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullScreen();
      }
    },
    // 判断全屏
    checkFull() {
      //判断浏览器是否处于全屏状态 （需要考虑兼容问题）
      //火狐浏览器
      var isFull =
        document.mozFullScreen ||
        document.fullScreen ||
        //谷歌浏览器及Webkit内核浏览器
        document.webkitIsFullScreen ||
        document.webkitRequestFullScreen ||
        document.mozRequestFullScreen ||
        document.msFullscreenEnabled;
      if (isFull === undefined) {
        isFull = false;
      }
      return isFull;
    },
    selectChange(value) {
      if (this.alltag.length != 0) {
        let z;
        this.allOptions.forEach((item) => {
          if (item.value == value[0]) {
            z = item.children[value[1]];
          }
        });
        this.templateId = z.templateId;
        this.jumpTo(z);
        if (this.showDoubleMap) {
          this.resultMap.setCenter(z.tag);
          this.resultMap.setZoom(z.zoom);
        }
      } else {
        this.fixMap();
      }
    },
    jumpTo(z) {
      this.selectedTag = z.name;
      this.map.jumpTo({
        center: z.tag,
        zoom: z.zoom,
        duration: 3000,
      });
      this.tag = z.tag;
      this.isFixed = false;
    },
    fixMap() {
      this.map.jumpTo({
        zoom: 3,
        center: [77.08685480625758, 35.532881863509374],
        duration: 3000,
      });
      this.tag = null;
      this.selectedTag = null;
    },
    changeGanHanImage() {
      this.resultMap.getSource("ganhan_hasakesitan").updateImage({
        url:
          this.sysURL.IPAddress.userInfo +
          this.ganhanImagePath +
          "hasakesitan/" +
          trimAll(this.imgDate) +
          ".png",
      });
      this.resultMap.getSource("ganhan_xinjiang").updateImage({
        url:
          this.sysURL.IPAddress.userInfo +
          this.ganhanImagePath +
          "xinjiang/" +
          trimAll(this.imgDate) +
          ".png",
      });
    },

    initMap(zoom, initResult) {
      this.map = null;

      this.resultMap = null;
      mapboxgl.accessToken =
        "pk.eyJ1IjoibGF3aW5iZWUiLCJhIjoiY2w4OWpoNW5kMDBrdzNwbzNtcTgxaDl1YiJ9.xjTaNpwhQeBpbIFrQaXsKw";
      const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/satellite-streets-v11",
        zoom: zoom,
        center: [77.08685480625758, 35.532881863509374],
        antialias: false,
        attributionControl: false,
      });
      if (initResult) {
        const resultMap = new mapboxgl.Map({
          container: "resultMap",
          style: "mapbox://styles/lawinbee/clg191r9o004o01mmhyrr4hfs",
          zoom: zoom,
          center: [77.08685480625758, 35.532881863509374],
          antialias: false,
          attributionControl: false,
        });
        resultMap.on("style.load", () => {
          resultMap.setFog({});
        });
        var language2 = new MapboxLanguage({ defaultLanguage: "zh-Hans" });
        resultMap.doubleClickZoom.disable();
        resultMap.addControl(language2);
        addGuadaerLayer(resultMap);
        mengjialaguo_after(resultMap);
        addHasakesitanLayer(resultMap);
        addXinJiangLayer(resultMap);
        // 拖拽
        map.on("drag", function () {
          let map_x = map.getCenter().lng;
          let map_y = map.getCenter().lat;
          resultMap.setCenter([map_x, map_y]);
        });

        //   放大缩小
        map.on("zoom", function () {
          let map_zoom = map.getZoom();
          let map_x = map.getCenter().lng;
          let map_y = map.getCenter().lat;
          resultMap.setCenter([map_x, map_y]);
          resultMap.setZoom(map_zoom);
        });

        // 倾斜

        map.on("pitch", function () {
          let map_pitch = map.getPitch();
          let map_x = map.getCenter().lng;
          let map_y = map.getCenter().lat;
          resultMap.setCenter([map_x, map_y]);
          resultMap.setPitch(map_pitch);
        });

        // 旋转
        map.on("rotate", function () {
          let map_bear = map.getBearing();
          resultMap.setBearing(map_bear);
        });
        this.resultMap = resultMap;
      }
      map.on("click", (e) => {
        const { lng, lat } = e.lngLat;
        console.log(lng, lat);
      });
      map.on("style.load", () => {
        map.setFog({}); // Set the default atmosphere style
      });
      map.doubleClickZoom.disable();

      // 设置语言
      var language = new MapboxLanguage({ defaultLanguage: "zh-Hans" });
      map.addControl(language);
      // 地图导航
      var nav = new mapboxgl.NavigationControl();
      map.addControl(nav, "bottom-right");
      // 比例尺
      var scale = new mapboxgl.ScaleControl({
        maxWidth: 100,
        unit: "imperial",
      });
      map.addControl(scale);
      scale.setUnit("metric");
      let _this = this;
      for (let i = 0; i < this.allOptions.length; i++) {
        for (let j = 0; j < this.allOptions[i].children.length; j++) {
          let marker = new mapboxgl.Marker({
            color: this.allOptions[i].children[j].color,
            clickTolerance: 10,
            draggable: true,
          })
            .setDraggable(false)
            .setLngLat(this.allOptions[i].children[j].tag)
            .setPopup(
              new mapboxgl.Popup().setHTML(
                this.allOptions[i].children[j].message
              )
            )
            .addTo(map);
        }
      }

      for (let i = 0; i < this.mapState.length; i++) {
        for (let j = 0; j < this.mapState[i].length; j++) {
          console.log(_this.mapState[i][j]);
          map.on("load", () => {
            map.addSource(String(i + "a" + j), {
              type: "raster",
              tiles: [_this.sysURL.IPAddress.mapbox + _this.mapState[i][j]],
              tileSize: 256,
            });
            map.addLayer({
              id: String(i + "a" + j),
              type: "raster",
              source: String(i + "a" + j), // reference the data source
              paint: {
                "raster-opacity": 1,
              },
            });
          });
        }
      }
      this.map = map;
      this.map.on("dblclick", (e) => {
        _this.flyToMarker(e);
      });
      this.isFixed = true;
      this.is3D = false;
    },
    initFullScreenMap(index) {
      let z = {};
      this.options.forEach((item) => {
        if (item.tag == index) {
          z = item;
        }
      });
      if (!z.zoom) {
        z.zoom = 2;
      }
      mapboxgl.accessToken =
        "pk.eyJ1IjoibGF3aW5iZWUiLCJhIjoiY2w4OWpoNW5kMDBrdzNwbzNtcTgxaDl1YiJ9.xjTaNpwhQeBpbIFrQaXsKw";

      const map = new mapboxgl.Map({
        container: "fullScreenMap", // container ID
        // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
        // style: "mapbox://styles/mapbox/satellite-streets-v11",
        style: "mapbox://styles/mapbox/dark-v10",
        // style: "mapbox://styles/mapbox/streets-v11",
        zoom: z.zoom,
        center: index,
        // projection: "globe",
        antialias: false,
        attributionControl: false,
      });
      // 设置语言
      var language = new MapboxLanguage({ defaultLanguage: "zh-Hans" });
      map.addControl(language);
      map.on("style.load", () => {
        map.setFog({}); // Set the default atmosphere style
      });
      for (let i = 0; i < this.options.length; i++) {
        new mapboxgl.Marker({
          color: "#5995FC",
          clickTolerance: 10,
          draggable: true,
        })
          .setDraggable(false)
          .setLngLat(this.options[i].tag)
          .setPopup(new mapboxgl.Popup().setHTML(this.options[i].message))
          .addTo(map);
      }
      this.fullMap = map;
    },
    flyToMarker(e) {
      let flag = true;
      for (let i = 0; i < this.allOptions.length; i++) {
        for (let j = 0; j < this.allOptions[i].children.length; j++) {
          if (
            this.allOptions[i].children[j].tag[0] - 2 <= e.lngLat.lng &&
            e.lngLat.lng <= this.allOptions[i].children[j].tag[0] + 2 &&
            this.allOptions[i].children[j].tag[1] - 2 <= e.lngLat.lat &&
            e.lngLat.lat <= this.allOptions[i].children[j].tag[1] + 2
          ) {
            this.isFixed = false;
            this.tag = this.allOptions[i].children[j].name;
            this.map.flyTo({
              center: this.allOptions[i].children[j].tag,
              zoom: this.allOptions[i].children[j].zoom,
            });
            this.selectedTag = this.allOptions[i].children[j].name;
            this.alltag = [
              this.allOptions[i].value,
              this.allOptions[i].children[j].value,
            ];
            this.templateId = this.allOptions[i].children[j].templateId;
            flag = false;
          }
        }
        if (flag) {
          this.isFixed = false;
          this.map.flyTo({
            center: e.lngLat,
            zoom: 10,
          });
        }
      }
    },
  },
  mounted() {
    this.initMap(3, true);
    // this.initFullScreenMap([120, 40]);
    document.getElementById("resultMap").style.top = 200 + "px";
  },

  created() {
    window.onresize = () => {
      if (!this.checkFull()) {
        // 退出全屏后要执行的动作
        console.log("退出全屏");
        this.isFullScreen = false;
      }
    };
  },
};
</script>

<style scoped>
@import "mapbox-gl/dist/mapbox-gl.css";

.zIndex {
  z-index: 9;
}

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

#map {
  position: relative;
  border-radius: 5px;
  height: calc(100vh - 240px);
  width: calc(100%);
  top: 10px;
}

/* 隐藏mapbox商标 */
#map >>> .mapboxgl-ctrl-logo {
  display: none !important;
}

#resultMap {
  position: relative;
  border-radius: 5px;
  height: calc(100vh - 240px);
  width: calc((100% - 200px - 46px) / 2);
  top: 10px;
}

/* 隐藏mapbox商标 */
#resultMap >>> .mapboxgl-ctrl-logo {
  display: none !important;
}

#fullScreenMap >>> .mapboxgl-ctrl-logo {
  display: none !important;
}
.date-picker {
  position: fixed;
  top: 168px;
  left: calc(50% + 20px);
  z-index: 9;
  width: 150px;
}
</style>
<style>
.el-picker-panel__icon-btn {
  display: none !important;
}
</style>
