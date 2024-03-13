<template>
  <div>
    <Transition
      appear
      enter-active-class="animate__animated animate__fadeInLeft"
      leave-active-class="animate__animated animate__fadeOutRight"
    >
      <el-breadcrumb separator="/" class="size">
        <el-breadcrumb-item>{{ $t("sidebar.n2") }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ $t("sidebar.n2_3") }}</el-breadcrumb-item>
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
        <el-row>
          <h3 style="margin-left: 10px" class="size">
            <span style="color: #409eff">|</span>&nbsp;{{
              $t("createjob.jobinfo")
            }}
          </h3>
        </el-row>
      </Transition>
      <Transition
        appear
        enter-active-class="animate__animated animate__fadeInLeft"
        leave-active-class="animate__animated animate__fadeOutRight"
      >
        <el-form
          ref="jobForm"
          label-position="right"
          label-width="100px"
          style="min-width: 1000px; padding: 0px"
          :model="vcJob"
          :rules="vcJobRules"
        >
          <el-row>
            <el-col :span="11">
              <el-form-item
                :label="$t('createjob.jobname')"
                prop="vcJobCnName"
                style="margin-left: 50px"
              >
                <el-col>
                  <el-input
                    size="small"
                    :placeholder="$t('createjob.job1')"
                    style="width: 340px; margin-left: 0px"
                    v-model="vcJob.vcJobCnName"
                  />
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item :label="$t('createjob.jobenname')" prop="vcJobName">
                <el-col>
                  <el-input
                    :placeholder="$t('createjob.job2')"
                    size="small"
                    style="width: 340px"
                    v-model="vcJob.vcJobName"
                  ></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-button
                type="primary"
                size="small"
                @click="jobDialogVisible = true"
                style="margin-top: 4px"
                >{{ $t("createjob.highconfig") }}</el-button
              >
            </el-col>
          </el-row>
          <el-dialog
            :title="$t('createjob.highconfig')"
            :visible.sync="jobDialogVisible"
            width="800px"
          >
            <el-row>
              <el-col :span="11">
                <el-form-item
                  :label="$t('createjob.youxianji')"
                  prop="priorityClassName"
                >
                  <el-col>
                    <el-select
                      size="small"
                      :placeholder="$t('createjob.youxianji1')"
                      v-model="vcJob.priorityClassName"
                      style="width: 250px"
                    >
                      <el-option
                        :label="$t('createjob.high')"
                        value="high-priority"
                      ></el-option>
                      <el-option
                        :label="$t('createjob.middle')"
                        value="middle-priority"
                      ></el-option>
                      <el-option
                        :label="$t('createjob.low')"
                        value="low-priority"
                      ></el-option>
                    </el-select>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item :label="$t('createjob.jiqun')">
                  <el-col>
                    <el-select
                      v-model="vcJob.queueName"
                      size="small"
                      style="width: 250px"
                    >
                      <el-option
                        :label="$t('createjob.default')"
                        value="default"
                      ></el-option>
                    </el-select>
                  </el-col>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11">
                <el-form-item :label="$t('createjob.bingxing')">
                  <el-col>
                    <el-switch v-model="vcJob.parallelExecution"></el-switch>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item
                  :label="$t('createjob.restarttry')"
                  prop="maxRetry"
                >
                  <el-col>
                    <el-input-number
                      size="small"
                      style="width: 250px"
                      :min="0"
                      :max="100"
                      v-model="vcJob.maxRetry"
                    ></el-input-number>
                  </el-col> </el-form-item
              ></el-col>
            </el-row>
          </el-dialog>

          <el-row>
            <el-col :span="2">
              <h3 style="margin-top: 8px; margin-left: 10px" class="size">
                <span style="color: #409eff">|</span>&nbsp;{{
                  $t("createjob.taskinfo")
                }}
              </h3>
            </el-col>
            <el-col :span="1">
              <el-button type="primary" size="small" @click="getImage">{{
                $t("createjob.add")
              }}</el-button>
            </el-col>
          </el-row>

          <el-table
            :cell-style="{ padding: 5 + 'px' }"
            style="
              width: 100%;
              margin-top: 10px;
              margin-left: 10px;
              font-size: 16px;
            "
            :data="tasks"
            :border="true"
            :row-style="{ height: 30 + 'px' }"
            max-height="400px"
          >
            <el-table-column
              prop="taskCnName"
              :label="$t('createjob.taskCnName')"
            ></el-table-column>
            <el-table-column
              prop="taskName"
              :label="$t('createjob.taskName')"
            ></el-table-column>
            <!-- <el-table-column
              prop="podReplicas"
              label="实例个数"
            ></el-table-column>
            <el-table-column
              prop="podMinReplicas"
              label="实例最小个数"
            ></el-table-column> -->
            <el-table-column
              prop="requestCpu"
              :label="$t('createjob.requestCpu')"
            ></el-table-column>
            <el-table-column
              prop="requestMemory"
              :label="$t('createjob.requestMemory')"
            ></el-table-column>
            <el-table-column :label="$t('all.caozuo')" width="160">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="danger"
                  @click="deleteTask(scope.$index)"
                  >{{ $t("createjob.delete") }}</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <el-form-item style="width: 100%">
            <el-row>
              <el-col :span="2" :offset="22"
                ><el-button type="primary" size="small" @click="createJob">{{
                  $t("createjob.create")
                }}</el-button></el-col
              >
              <!-- <el-col :span="2"
                ><el-button
                  type="primary"
                  size="small"
                  @click="createAndStartJob"
                  >创建并运行</el-button
                ></el-col
              > -->
            </el-row>
          </el-form-item>
        </el-form>
      </Transition>
    </el-card>
    <el-dialog
      :title="$t('createjob.createjob')"
      :visible.sync="dialogFormVisible"
      width="1000px"
    >
      <el-form
        ref="taskForm"
        :rules="taskRules"
        :model="taskInfo"
        label-position="right"
        label-width="70px"
        style="padding: 0px; min-width: 900px"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item
              :label="$t('createjob.taskName')"
              :label-width="formLabelWidth"
              prop="taskName"
            >
              <el-input
                autocomplete="off"
                v-model="taskInfo.taskName"
                placeholder="请输入任务英文名"
                style="width: 340px"
              ></el-input> </el-form-item
          ></el-col>
          <el-col :span="12">
            <el-form-item
              :label="$t('createjob.taskCnName')"
              :label-width="formLabelWidth"
              prop="taskCnName"
            >
              <el-input
                autocomplete="off"
                v-model="taskInfo.taskCnName"
                placeholder="请输入任务中文名"
                style="width: 340px"
              ></el-input> </el-form-item
          ></el-col>
        </el-row>
        <el-row>
          <el-col :span="9"
            ><el-form-item
              :label="$t('createjob.cangku')"
              :label-width="formLabelWidth"
              prop="repositoryDir"
            >
              <el-select
                style="width: 250px"
                v-model="taskInfo.repositoryDir"
                @change="changeImageCatalog"
              >
                <el-option
                  v-for="(item, index) in imageCatalogList"
                  :key="index"
                  :label="
                    item.envName == 'cluster-default-default'
                      ? 'private'
                      : item.envName
                  "
                  :value="item.catalogId"
                ></el-option>
              </el-select> </el-form-item
          ></el-col>
          <el-col :span="7">
            <el-form-item
              :label="$t('createjob.imageprefix')"
              :label-width="formLabelWidth"
              prop="imagePrefix"
            >
              <el-select
                placeholder="请选择镜像"
                style="width: 150px"
                v-model="taskInfo.imagePrefix"
                @change="changeImage"
              >
                <el-option
                  v-for="(item, index) in sortedImageList"
                  :key="index"
                  :label="imageName(item)"
                  :value="item.imageName"
                ></el-option>
              </el-select> </el-form-item
          ></el-col>
          <el-col :span="8">
            <el-form-item
              :label="$t('createjob.imageversion')"
              :label-width="formLabelWidth"
              prop="imageVersion"
            >
              <el-select
                placeholder="请选择镜像版本"
                style="width: 180px"
                v-model="taskInfo.imageVersion"
              >
                <el-option
                  v-for="(item, index) in imageVersionList"
                  :key="index"
                  :label="item.imageTag"
                  :value="item.imageTag"
                ></el-option>
              </el-select> </el-form-item></el-col
        ></el-row>
        <!-- <el-row>
          <el-col :span="11">
            <el-form-item label="实例个数" :label-width="formLabelWidth">
              <el-input-number
                v-model="taskInfo.podReplicas"
                :min="1"
                :max="100"
              ></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="2">
            <el-form-item label="最小实例个数" :label-width="formLabelWidth">
              <el-input-number
                v-model="taskInfo.podMinReplicas"
                :min="1"
                :max="100"
              ></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="CPU" :label-width="formLabelWidth">
              <el-input-number
                v-model="taskInfo.requestCpu"
                :min="1"
                :max="100"
              ></el-input-number>
              <span style="font-size: 16px; margin-left: 10px">单位(核)</span>
            </el-form-item>
          </el-col>-->
        <!-- <el-col :span="11" :offset="2">
            TODO:CPU限制
            <el-form-item label="CPU限制" :label-width="formLabelWidth">
              <el-input-number></el-input-number>
              <span style="font-size: 16px; margin-left: 10px">单位(核)</span>
            </el-form-item>
          </el-col> -->
        <!-- <el-col :span="11" :offset="2">
            <el-form-item label="内存" :label-width="formLabelWidth">
              <el-input-number
                v-model="taskInfo.requestMemory"
                :min="1"
                :max="100"
              ></el-input-number>
              <span style="font-size: 16px; margin-left: 10px">单位(GB)</span>
            </el-form-item>
          </el-col>
        </el-row> -->
        <!-- <el-row>
         
          <el-col :span="11" :offset="2">
             TODO:内存限制
            <el-form-item label="内存限制" :label-width="formLabelWidth">
              <el-input-number></el-input-number>
              <span style="font-size: 16px; margin-left: 10px">单位(GB)</span>
            </el-form-item> 
          </el-col>
        </el-row> -->
        <el-form-item
          :label="$t('createjob.gpupower')"
          :label-width="formLabelWidth"
          style="width: 900px"
        >
          <el-row style="margin-top: 0px">
            <el-col :span="20">
              <el-input-number
                style="width: 100%"
                v-model="taskInfo.gpuCalPower"
                v-if="taskInfo.gpuCalPower < 100"
                :min="0"
                :step="25"
                :max="100"
                @change="taskInfo.gpuVideoMem = taskInfo.gpuCalPower * 0.88"
              ></el-input-number>
              <el-input-number
                style="width: 100%"
                v-model="taskInfo.gpuCalPower"
                v-if="taskInfo.gpuCalPower >= 100"
                :min="0"
                :step="100"
                :max="300"
                @change="taskInfo.gpuVideoMem = taskInfo.gpuCalPower * 0.88"
              ></el-input-number>
            </el-col>
            <el-col :span="3">
              <span style="font-size: 16px; margin-left: 10px">(%)</span>
            </el-col>
            <el-col :span="1">
              <el-tooltip class="item" effect="dark" placement="top">
                <div slot="content">
                  <p>
                    {{ $t("createjob.info1") }}
                  </p>
                  <p>
                    {{ $t("createjob.info2") }}
                  </p>
                  <p>
                    {{ $t("createjob.info3") }}
                  </p>
                  <p>{{ $t("createjob.info4") }}</p>
                </div>
                <i
                  class="el-icon-question"
                  style="color: #409eff; margin-left: 10px; cursor: pointer"
                ></i> </el-tooltip
            ></el-col>
          </el-row>
        </el-form-item>
        <el-form-item
          :label="$t('createjob.gpumem')"
          :label-width="formLabelWidth"
          style="width: 900px"
        >
          <el-row style="margin-top: 0px">
            <el-col :span="20">
              <el-slider
                :max="Number(88)"
                style="width: 100%"
                v-model="taskInfo.gpuVideoMem"
              ></el-slider>
            </el-col>
            <el-col :span="3">
              <span style="font-size: 16px; margin-left: 10px"
                >{{ Number(taskInfo.gpuVideoMem) * 0.25 }}GB</span
              >
            </el-col>
            <el-col :span="1">
              <el-tooltip class="item" effect="dark" placement="top">
                <div slot="content">
                  <p>
                    {{ $t("createjob.info5") }}
                  </p>
                </div>
                <i
                  class="el-icon-question"
                  style="color: #409eff; margin-left: 10px; cursor: pointer"
                ></i> </el-tooltip
            ></el-col> </el-row
        ></el-form-item>
        <!-- <el-form-item
          label="选择仓库"
          :label-width="formLabelWidth"
          prop="repository"
        >
          <el-select
            placeholder="请选择镜像仓库"
            style="width: 660px"
            v-model="taskInfo.repository"
          >
            <el-option
              v-for="(item, index) in warehouseList"
              :key="index"
              :label="item.warehouseName"
              :value="item.warehouseId"
            ></el-option>
          </el-select>
        </el-form-item> -->
        <!-- <el-form-item label="程序运行命令" :label-width="formLabelWidth">
          <el-input
            autocomplete="off"
            style="width: 660px"
            v-model="taskInfo.command"
          ></el-input>
        </el-form-item>
        <el-form-item label="工作目录" :label-width="formLabelWidth">
          <el-input
            style="width: 660px"
            autocomplete="off"
            v-model="taskInfo.workingDir"
            placeholder="设置进入容器的目录,没有设置的情况下,使用镜像的工作目录,默认进入根目录"
          ></el-input>
        </el-form-item> -->
        <el-row>
          <el-col :span="12">
            <el-form-item
              :label="$t('createjob.guzhang')"
              :label-width="formLabelWidth"
            >
              <el-select
                :placeholder="$t('createjob.guzhang1')"
                style="width: 340px"
                v-model="taskInfo.policiesEvent"
                @change="changeTaskpoliciesEvent"
                @clear="taskInfo.policiesAction = ''"
                clearable
              >
                <!-- <el-option label="运行完成" value="TaskCompleted"></el-option> -->
                <!-- TODO:TaskFailed -->
                <el-option
                  :label="$t('createjob.guzhang2')"
                  value="PodFailed"
                ></el-option>
              </el-select> </el-form-item
          ></el-col>
          <el-col :span="12">
            <el-form-item
              :label="$t('createjob.fangshi')"
              :label-width="formLabelWidth"
            >
              <el-select
                :placeholder="$t('createjob.fangshi1')"
                style="width: 340px"
                v-model="taskInfo.policiesAction"
                clearable
                @change="changeTaskpoliciesAction"
                @clear="taskInfo.policiesEvent = ''"
              >
                <el-option
                  :label="$t('createjob.fangshi2')"
                  value="CompleteJob"
                ></el-option>
                <!-- TODO: failureJob-->
                <el-option
                  :label="$t('createjob.fangshi3')"
                  value="RestartJob"
                ></el-option>
              </el-select> </el-form-item
          ></el-col>
        </el-row>
        <el-form-item :label-width="formLabelWidth">
          <el-button
            slot="label"
            size="small"
            type="primary"
            @click="show = !show"
            style="cursor: pointer"
            >{{ $t("createjob.highconfig") }}</el-button
          >
          <el-tooltip class="item" effect="dark" placement="top" v-if="!show">
            <div slot="content">
              <p>
                {{ $t("createjob.info6") }}
              </p>
            </div>
            <i
              class="el-icon-question"
              style="color: #409eff; margin-left: 10px; cursor: pointer"
            ></i>
          </el-tooltip>
          <el-tabs style="width: 820px" v-if="show">
            <!-- <el-tab-pane label="端口" name="first">
              <el-card :body-style="{ padding: '0px' }">
                <el-row>
                  <h3 style="margin-left: 10px">
                    <span style="color: #409eff">|</span>&nbsp;添加端口
                  </h3>
                </el-row>
                <el-row style="margin-left: 10px">
                  <el-col :span="6">
                    <el-input placeholder="端口"></el-input>
                  </el-col>
                  <el-col :span="6" :offset="1">
                    <el-select style="width: 100%">
                      <el-option label="TCP" value="TCP"></el-option>
                      <el-option label="UDP" value="UDP"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="1" :offset="1">
                    <el-button type="primary" size="small">添加</el-button>
                  </el-col>
                </el-row>
                <el-row>
                  <h3 style="margin-left: 10px">
                    <span style="color: #409eff">|</span>&nbsp;管理变量
                  </h3>
                </el-row>
                <el-row>
                  <el-table border style="width: 100%">
                    <el-table-column label="名称"></el-table-column>
                    <el-table-column label="端口"></el-table-column>
                    <el-table-column label="协议"></el-table-column>
                    <el-table-column label="操作"></el-table-column>
                  </el-table>
                </el-row>
              </el-card>
            </el-tab-pane>
            <el-tab-pane label="环境变量" name="second">
              <el-card :body-style="{ padding: '0px' }">
                <el-row>
                  <h3 style="margin-left: 10px">
                    <span style="color: #409eff">|</span>&nbsp;添加变量
                  </h3>
                </el-row>
                <el-row style="margin-left: 10px">
                  <el-col :span="6">
                    <el-input placeholder="Key"></el-input>
                  </el-col>
                  <el-col :span="6" :offset="1">
                    <el-input placeholder="Value"></el-input>
                  </el-col>
                  <el-col :span="1" :offset="1">
                    <el-button type="primary" size="small">添加</el-button>
                  </el-col>
                </el-row>
                <el-row>
                  <h3 style="margin-left: 10px">
                    <span style="color: #409eff">|</span>&nbsp;管理变量
                  </h3>
                </el-row>
                <el-row>
                  <el-table border style="width: 100%">
                    <el-table-column label="Key"></el-table-column>
                    <el-table-column label="Value"></el-table-column>
                    <el-table-column label="操作"></el-table-column>
                  </el-table>
                </el-row>
              </el-card>
            </el-tab-pane> -->
            <el-tab-pane :label="$t('createjob.store')">
              <el-card :body-style="{ padding: '0px' }">
                <el-row>
                  <h3 style="margin-left: 10px">
                    <span style="color: #409eff">|</span>&nbsp;{{
                      $t("createjob.store1")
                    }}
                  </h3>
                </el-row>
                <el-row>
                  <!-- <el-form-item label="存储类型">
                    <el-col :span="24" :offset="1">
                      <el-select size="small">
                        <el-option
                          label="kubenates"
                          value="kubenates"
                        ></el-option>
                        <el-option label="docker" value="docker"></el-option>
                      </el-select>
                    </el-col>
                  </el-form-item> -->
                </el-row>
                <el-form
                  :model="mount"
                  :rules="mountRules"
                  style="padding: 0px"
                  label-position="right"
                  label-width="136px"
                  ref="storageForm"
                >
                  <el-row>
                    <el-form-item
                      :label="$t('createjob.store2')"
                      prop="hostPath"
                    >
                      <el-col :span="24" :offset="1" style="margin-left: 0px">
                        <el-input
                          size="small"
                          style="width: 440px"
                          v-model="mount.hostPath"
                          ><template slot="append"
                            ><span style="cursor: pointer" @click="initData">
                              {{ $t("createjob.store3") }}</span
                            ></template
                          >
                        </el-input>
                      </el-col>
                    </el-form-item>
                  </el-row>
                  <el-dialog
                    :title="$t('createjob.store4')"
                    :visible.sync="childDialogTableVisible"
                    append-to-body
                    width="600px"
                  >
                    <el-row>
                      <el-col :span="12">
                        <el-input
                          size="small"
                          :placeholder="$t('createjob.store5')"
                          v-model="dataName"
                        ></el-input>
                      </el-col>
                      <el-col :span="8" :offset="4">
                        <el-button-group>
                          <el-button
                            :type="type == 1 ? 'success' : 'primary'"
                            size="small"
                            @click="getDataSet(1)"
                            >{{ $t("createjob.store6") }}</el-button
                          >
                          <el-button
                            @click="getDataSet(2)"
                            :type="type != 1 ? 'success' : 'primary'"
                            size="small"
                            >{{ $t("createjob.store7") }}</el-button
                          >
                        </el-button-group></el-col
                      >
                    </el-row>
                    <el-table
                      :data="selectedData"
                      highlight-current-row
                      @row-click="initRealPath"
                      max-height="300"
                    >
                      <el-table-column
                        property="name"
                        :label="
                          type == 1
                            ? $t('createjob.store6')
                            : $t('createjob.store7')
                        "
                        width="275"
                      ></el-table-column>
                      <el-table-column
                        property="catalog"
                        :label="$t('createjob.store8')"
                        width="275"
                      ></el-table-column>
                    </el-table>
                    <div slot="footer" class="dialog-footer">
                      <el-button @click="childDialogTableVisible = false">{{
                        $t("all.cancle")
                      }}</el-button>
                      <el-button
                        type="primary"
                        @click="childDialogTableVisible = false"
                        >{{ $t("all.confirm") }}</el-button
                      >
                    </div>
                  </el-dialog>
                  <el-row style="margin-top: 10px">
                    <el-form-item
                      :label="$t('createjob.store9')"
                      prop="mountPath"
                    >
                      <el-col :span="24" :offset="1" style="margin-left: 0px">
                        <el-input
                          size="small"
                          style="width: 440px"
                          v-model="mount.mountPath"
                        >
                        </el-input>
                      </el-col>
                    </el-form-item>
                  </el-row>
                  <el-form-item>
                    <el-button
                      type="primary"
                      size="small"
                      style="margin-top: 15px"
                      @click="addMountData()"
                      >{{ $t("createjob.add") }}</el-button
                    ></el-form-item
                  >
                </el-form>
                <el-row>
                  <h3 style="margin-left: 10px">
                    <span style="color: #409eff">|</span>&nbsp;{{
                      $t("createjob.store10")
                    }}
                  </h3>
                </el-row>
                <el-row>
                  <div style="padding: 10px">
                    <el-table
                      :data="mountData"
                      :row-style="{ height: 30 + 'px' }"
                      max-height="200"
                    >
                      <el-table-column
                        :label="$t('createjob.store2')"
                        prop="hostPath"
                        show-overflow-tooltip
                      >
                        <template slot-scope="scope">
                          <el-input
                            size="mini"
                            v-model="scope.row.hostPath"
                            v-if="isShow[scope.$index]"
                            @blur="updateIsShow(scope.$index)"
                          >
                          </el-input>
                          <span v-if="!isShow[scope.$index]">{{
                            scope.row.hostPath
                          }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column
                        :label="$t('createjob.store9')"
                        prop="mountPath"
                        show-overflow-tooltip
                      >
                        <template slot-scope="scope">
                          <el-input
                            size="mini"
                            v-model="scope.row.mountPath"
                            v-if="isShow[scope.$index]"
                            @blur="updateIsShow(scope.$index)"
                          >
                          </el-input>
                          <span v-if="!isShow[scope.$index]">{{
                            scope.row.mountPath
                          }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('all.caozuo')">
                        <template slot-scope="scope">
                          <el-button
                            v-if="!isShow[scope.$index]"
                            type="primary"
                            size="mini"
                            style="margin-buttom: 3px"
                            @click="updateIsShow(scope.$index)"
                            >{{ $t("createjob.xiugai") }}</el-button
                          >
                          <!-- <el-button
                            v-if="isShow[scope.$index]"
                            type="primary"
                            size="mini"
                            style="margin-buttom: 3px"
                            @click="updateIsShow(scope.$index)"
                            >保存</el-button
                          > -->
                          <el-button
                            type="danger"
                            size="mini"
                            style="margin-buttom: 3px"
                            @click="deleteMountData(scope.$index)"
                            >{{ $t("createjob.delete") }}</el-button
                          >
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                </el-row>
              </el-card>
            </el-tab-pane>
            <!-- <el-tab-pane label="调度管理" name="forth">
              <el-card :body-style="{ padding: '0px' }">
                <el-row>
                  <h3><span style="color: #409eff">|</span>&nbsp;添加变量</h3>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <el-input placeholder="Key"></el-input>
                  </el-col>
                  <el-col :span="6" :offset="1">
                    <el-input placeholder="Value"></el-input>
                  </el-col>
                  <el-col :span="1" :offset="1">
                    <el-button type="primary" size="small">添加</el-button>
                  </el-col>
                </el-row>
                <el-row>
                  <h3><span style="color: #409eff">|</span>&nbsp;管理变量</h3>
                </el-row>
                <el-row>
                  <el-table border style="width: 100%">
                    <el-table-column label="Key"></el-table-column>
                    <el-table-column label="Value"></el-table-column>
                    <el-table-column label="操作"></el-table-column>
                  </el-table>
                </el-row>
              </el-card>
            </el-tab-pane>
            <el-tab-pane label="生命周期" name="fifth">
              <el-card :body-style="{ padding: '0px' }">
                <el-row>
                  <h3><span style="color: #409eff">|</span>&nbsp;添加卷</h3>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <el-input placeholder="端口"></el-input>
                  </el-col>
                  <el-col :span="6" :offset="1">
                    <el-select style="width: 100%" v-model="form.portType">
                      <el-option label="TCP" value="TCP"></el-option>
                      <el-option label="UDP" value="UDP"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="1" :offset="1">
                    <el-button type="primary" size="small">添加</el-button>
                  </el-col>
                </el-row>
                <el-row>
                  <h3><span style="color: #409eff">|</span>&nbsp;管理卷</h3>
                </el-row>
                <el-row>
                  <el-table border style="width: 100%">
                    <el-table-column label="存储类型"></el-table-column>
                    <el-table-column label="特性"></el-table-column>
                    <el-table-column label="操作"></el-table-column>
                  </el-table>
                </el-row>
              </el-card>
            </el-tab-pane> -->
            <!-- <el-tab-pane label="管理存储变量">
              <el-card :body-style="{ padding: '0px' }">
                <el-row>
                  <h3 style="margin-left: 10px">
                    <span style="color: #409eff">|</span>&nbsp;管理变量
                  </h3>
                </el-row>
                <el-row>
                  <el-table
                    border
                    :data="mountData"
                    style="width: 100%"
                    :row-style="{ height: 40 + 'px' }"
                    :cell-style="{ padding: 5 + 'px' }"
                    max-height="200"
                  >
                    <el-table-column
                      label="路径地址"
                      prop="hostPath"
                    ></el-table-column>
                    <el-table-column
                      label="容器内路径"
                      prop="mountPath"
                    ></el-table-column>
                    <el-table-column label="操作" align="center">
                      <template slot-scope="scope">
                        <el-button
                          type="danger"
                          size="mini"
                          style="margin-buttom: 3px"
                          @click="deleteMountData(scope.$index)"
                          >删除</el-button
                        >
                      </template>
                    </el-table-column>
                  </el-table>
                </el-row>
              </el-card>
            </el-tab-pane> -->
          </el-tabs>
        </el-form-item>
        <el-form-item
          :label="$t('createjob.beizhu')"
          :label-width="formLabelWidth"
        >
          <el-input
            type="textarea"
            :placeholder="$t('createjob.beizhu1')"
            maxlength="30"
            show-word-limit
            style="width: 820px"
            v-model="taskInfo.description"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="cancleTask()" style="margin-left: 700px">{{
            $t("all.cancle")
          }}</el-button>
          <el-button type="primary" @click="createTask()">{{
            $t("all.confirm")
          }}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  reqImage,
  reqQueueList,
  reqWareHouseList,
  reqWareHouseImageList,
  reqImageVersion,
  reqDataSet,
  reqCreateJob,
} from "@/api";
import { mapState } from "vuex";
export default {
  name: "CreateJob",
  data() {
    return {
      isShow: [],
      show: false,
      jobDialogVisible: false,
      mount: {
        hostPath: "",
        mountPath: "",
      },
      mountRules: {
        hostPath: [{ required: true, message: "不能为空", trigger: "blur" }],
        mountPath: [{ required: true, message: "不能为空", trigger: "blur" }],
      },
      mountData: [],
      type: 1,
      dataName: "",
      childDialogTableVisible: false,
      vcJob: {
        vcJobId: "",
        vcJobCnName: "",
        vcJobName: "",
        vcJobType: "batch",
        queueName: "default",
        queueId: 1,
        maxRetry: "1",
        priorityClassName: "middle-priority",
        parallelExecution: true,
      },
      vcJobRules: {
        vcJobCnName: [
          { required: true, message: "请输入作业中文名", trigger: "blur" },
          { min: 4, max: 45, message: "长度在4到45字符", trigger: "blur" },
        ],
        vcJobName: [
          { required: true, message: "请输入作业英文名", trigger: "blur" },
          {
            min: 4,
            max: 45,
            message: "请输入4-45位小写字母，数字，中划线组合并以字母开头",
            trigger: "blur",
          },
        ],

        maxRetry: [
          {
            required: true,
            message: "请输入作业尝试重启次数",
            trigger: "blur",
          },
        ],
        priorityClassName: [
          { required: true, message: "请选择作业优先级", trigger: "change" },
        ],
      },
      target: {
        templateId: null,
        clusterId: 9,
        startNow: false,
        envId: 1,
      },
      tasks: [],
      taskInfo: {
        taskName: "",
        taskCnName: "",
        podReplicas: 1,
        podMinReplicas: 1,
        requestCpu: 8,
        requestMemory: 16,
        gpuCalPower: 100,
        gpuVideoMem: 88,
        command: null,
        workingDir: null,
        description: "",
        repository: "default",
        repositoryDir: "cluster-default-default",
        image: "",
        imagePrefix: "",
        imageVersion: "",
        policiesAction: null,
        policiesEvent: null,
        containerOptions: "",
        oldContainerOptions:
          '{"bocoPlatform-ports":[],"bocoPlatform-envs":[],"bocoPlatform-configs":[],"bocoPlatform-lifecycle":[],"bocoPlatform-probe":[],"bocoPlatform-volumes":[],"bocoPlatform-schedulingManagement":[]}',
      },
      taskRules: {
        taskName: [
          { required: true, message: "请输入作业英文名", trigger: "blur" },
          {
            min: 4,
            max: 45,
            message: "请输入4-45位小写字母，数字，中划线组合并以字母开头",
            trigger: "blur",
          },
        ],
        taskCnName: [
          { required: true, message: "请输入作业中文名", trigger: "blur" },
          { min: 4, max: 45, message: "长度在4到45字符", trigger: "blur" },
        ],
        repository: [{ required: true, trigger: "change" }],
        repositoryDir: [{ required: true, trigger: "change" }],
        imagePrefix: [{ required: true, trigger: "change" }],
        imageVersion: [{ required: true, trigger: "change" }],
        //TODO: 表单联动校验
      },
      dialogFormVisible: false,
      formLabelWidth: "120px",
      bocoPlatformenvs: [],
      bocoPlatformports: [],
      bocoPlatformschedulingManagement: [],
      bocoPlatformlifecycle: [],
      bocoPlatformprobe: [],
      bocoPlatformconfigs: [],
      bocoPlatformconfigMounts: [],
      bocoPlatformvolumes: [],
      bocoPlatformvolumeMounts: [],
      isShow: [],
    };
  },

  computed: {
    ...mapState("CreateJob", [
      "queueList",
      "warehouseList",
      "imageCatalogList",
      "imageList",
      "imageVersionList",
      "data",
    ]),
    ...mapState("Template", ["JobTemplate", "TaskTemplate"]),
    fullImage() {
      return this.taskInfo.imagePrefix + ":" + this.taskInfo.imageVersion;
    },
    selectedData() {
      let data = [];
      if (this.dataName == "") {
        return this.data;
      } else {
        this.data.forEach((element) => {
          if (element.name.indexOf(this.dataName) != -1) {
            data.push(element);
          }
        });
        return data;
      }
    },
    sortedImageList() {
      return this.imageList.sort((a, b) => {
        return (
          a.imageName
            .split("/")
            [a.imageName.split("/").length - 1][0].charCodeAt() -
          b.imageName
            .split("/")
            [b.imageName.split("/").length - 1][0].charCodeAt()
        );
      });
    },
  },

  methods: {
    updateIsShow(index) {
      this.$set(this.isShow, index, !this.isShow[index]);
    },
    imageName(item) {
      return item.imageName.split("/")[item.imageName.split("/").length - 1];
    },
    changeTaskpoliciesEvent(val) {
      if (val == "PodFailed") {
        this.taskInfo.policiesAction = "CompleteJob";
      }
    },
    changeTaskpoliciesAction(val) {
      if (val) {
        this.taskInfo.policiesEvent = "PodFailed";
      }
    },
    //   \"bocoPlatform-volumes\":[{\"name\":\"name0\",\"hostPath\":\"/opt/bcc/storage1/NFS25\"}],\"bocoPlatform-volumeMounts\":[{\"name\":\"name0\",\"mountPath\":\"/\"}]
    createJob() {
      let _this = this;
      this.$refs["jobForm"].validate(async (valid) => {
        if (!valid) {
          return false;
        } else {
          _this.vcJob.queueId = _this.queueList[0].queueId;
          let result = await reqCreateJob({
            tasks: _this.tasks,
            target: _this.target,
            vcJob: _this.vcJob,
          });
          if (result.code == "200") {
            _this.$router.push("/job");
          }
        }
      });
    },
    createAndStartJob() {
      let _this = this;
      this.$refs["jobForm"].validate(async (valid) => {
        if (!valid) {
          return false;
        } else {
          _this.target.startNow = true;
          _this.vcJob.queueId = _this.queueList[0].queueId;
          let result = await reqCreateJob({
            tasks: _this.tasks,
            target: _this.target,
            vcJob: _this.vcJob,
          });
          if (result.code == "200") {
            _this.$message({ type: "success", message: result.message });
            _this.$router.push("/job");
          } else {
            _this.$message({ type: "warning", message: result.message });
          }
        }
      });
    },
    async getImage() {
      this.dialogFormVisible = true;
      let result4 = await reqImage(this.imageCatalogList[0].catalogId);
      if (result4.code == "200") {
        this.$store.dispatch("CreateJob/getImage", result4.data);
        let result5 = await reqImageVersion(this.sortedImageList[0].imageName);
        console.log(result4.data[0].imageName);
        if (result5.success == true) {
          this.$store.dispatch("CreateJob/getImageVersion", result5.rows);
          console.log(result5.rows);
        }
      }
      this.initImageSelected();
    },
    deleteTask(index) {
      this.tasks.splice(index, 1);
    },
    createTask() {
      let _this = this;
      this.$refs["taskForm"].validate((valid) => {
        if (!valid) {
          return false;
        } else {
          _this.dialogFormVisible = false;
          let taskInfo = _this.formatTaskInfo();
          _this.tasks.push(taskInfo);
          _this.vcJob.vcJobName =
            _this.imageName({ imageName: _this.taskInfo.imagePrefix }) +
            "-" +
            Date.parse(new Date()) / 1000;
          _this.vcJob.vcJobCnName = _this.vcJob.vcJobName;
          _this.cancleTask();
        }
      });
    },
    formatTaskInfo() {
      let taskInfo = {};
      taskInfo.taskName = this.taskInfo.taskName;
      taskInfo.taskCnName = this.taskInfo.taskCnName;
      taskInfo.podReplicas = this.taskInfo.podReplicas;
      taskInfo.podMinReplicas = this.taskInfo.podMinReplicas;
      taskInfo.requestCpu = this.taskInfo.requestCpu;
      taskInfo.requestMemory = this.taskInfo.requestMemory;
      taskInfo.gpuCalPower = this.taskInfo.gpuCalPower;
      taskInfo.gpuVideoMem = this.taskInfo.gpuVideoMem;
      taskInfo.command = this.taskInfo.command;
      taskInfo.workingDir = this.taskInfo.workingDir;
      taskInfo.description = this.taskInfo.description;
      taskInfo.repository = this.taskInfo.repository.toString();
      taskInfo.repositoryDir = this.taskInfo.repositoryDir.toString();
      taskInfo.image = this.fullImage;
      taskInfo.policiesAction = this.taskInfo.policiesAction;
      taskInfo.policiesEvent = this.taskInfo.policiesEvent;

      let volumes = "";
      let mountvolumes = "";
      let oldmountvolumes = "";
      for (let i = 0; i < this.mountData.length; i++) {
        if (i + 1 == this.mountData.length) {
          volumes +=
            '{"name":"name' +
            i +
            '","hostPath":"' +
            this.mountData[i].hostPath +
            '"}';
          mountvolumes +=
            '{"name":"name' +
            i +
            '","mountPath":"' +
            this.mountData[i].mountPath +
            '"}';
        } else {
          volumes +=
            '{"name":"name' +
            i +
            '","hostPath":"' +
            this.mountData[i].hostPath +
            '"},';
          mountvolumes +=
            '{"name":"name' +
            i +
            '","mountPath":"' +
            this.mountData[i].mountPath +
            '"},';
        }

        // {\"type\":\"hostPath\",\"hostPath\":\"/opt/bcc/storage1/NFS44/test\",\"mountPath\":\"/test\"},{\"type\":\"hostPath\",\"hostPath\":\"/opt/bcc/storage1/NFS44\",\"mountPath\":\"/\"}
        if (i + 1 == this.mountData.length) {
          oldmountvolumes +=
            '{"type":"hostPath","hostPath":"' +
            this.mountData[i].hostPath +
            '","mountPath":"' +
            this.mountData[i].mountPath +
            '"}';
        } else {
          oldmountvolumes +=
            '{"type":"hostPath","hostPath":"' +
            this.mountData[i].hostPath +
            '","mountPath":"' +
            this.mountData[i].mountPath +
            '"},';
        }
      }

      taskInfo.containerOptions =
        '{"bocoPlatform-envs":[],"bocoPlatform-ports":[],"bocoPlatform-schedulingManagement":[],"bocoPlatform-lifecycle":[],"bocoPlatform-probe":[],"bocoPlatform-configs":[],"bocoPlatform-configMounts":[],"bocoPlatform-volumes":[' +
        volumes +
        '],"bocoPlatform-volumeMounts":[' +
        mountvolumes +
        "]}";
      taskInfo.oldContainerOptions =
        '{"bocoPlatform-ports":[],"bocoPlatform-envs":[],"bocoPlatform-configs":[],"bocoPlatform-lifecycle":[],"bocoPlatform-probe":[],"bocoPlatform-volumes":[' +
        oldmountvolumes +
        '],"bocoPlatform-schedulingManagement":[]}';
      return taskInfo;
    },
    cancleTask() {
      this.dialogFormVisible = false;
      this.taskInfo = {
        taskName: "",
        taskCnName: "",
        podReplicas: 1,
        podMinReplicas: 1,
        requestCpu: 8,
        requestMemory: 16,
        gpuCalPower: 100,
        gpuVideoMem: 88,
        command: null,
        workingDir: null,
        description: "",
        repository: "default",
        repositoryDir: "cluster-default-default",
        image: "",
        imagePrefix: "",
        imageVersion: "",
        policiesAction: "",
        policiesEvent: "",
        containerOptions: "",
        oldContainerOptions:
          '{"bocoPlatform-ports":[],"bocoPlatform-envs":[],"bocoPlatform-configs":[],"bocoPlatform-lifecycle":[],"bocoPlatform-probe":[],"bocoPlatform-volumes":[],"bocoPlatform-schedulingManagement":[]}',
      };
      this.initImageSelected();

      this.mountData = [];
      this.isShow = [];
      this.clearValidate("taskForm");
      this.clearValidate("storageForm");
    },
    clearValidate(formName) {
      this.$refs[formName].clearValidate();
    },
    deleteMountData(index) {
      this.mountData.splice(index, 1);
      this.isShow.splice(index, 1);
    },
    addMountData() {
      let _this = this;

      this.$refs["storageForm"].validate((valid) => {
        if (!valid) {
          return false;
        } else {
          let mount = {
            hostPath: "",
            mountPath: "",
          };
          mount.hostPath = this.mount.hostPath;
          mount.mountPath = this.mount.mountPath;
          this.mountData.push(mount);
          this.isShow.push(false);
          this.mount.hostPath = "";
          this.mount.mountPath = "";
          this.$message({
            type: "success",
            message: "添加成功!",
          });
        }
      });
    },
    initRealPath(row, event, column) {
      this.mount.hostPath = row.catalog;
    },
    initData() {
      this.childDialogTableVisible = true;
      this.getDataSet(this.type);
    },
    async getDataSet(type) {
      this.type = type;
      let result = await reqDataSet(this.type);
      if (result.code == 200) {
        this.$store.dispatch("CreateJob/getDataSet", result.data);
      }
    },
    async changeImage(imageName) {
      let result5 = await reqImageVersion(imageName);
      if (result5.success == true) {
        this.$store.dispatch("CreateJob/getImageVersion", result5.rows);
      }
      this.taskInfo.imagePrefix = imageName;
      this.taskInfo.imageVersion = this.imageVersionList[0].imageTag;
    },
    async changeImageCatalog(catalogId) {
      let result4 = await reqImage(catalogId);
      if (result4.code == "200") {
        this.$store.dispatch("CreateJob/getImage", result4.data);
        let result5 = await reqImageVersion(result4.data[0].imageName);
        if (result5.success == true) {
          this.$store.dispatch("CreateJob/getImageVersion", result5.rows);
        }
      }
      this.taskInfo.repositoryDir = catalogId;
      this.taskInfo.imagePrefix = this.imageList[0].imageName;
      this.taskInfo.imageVersion = this.imageVersionList[0].imageTag;
      this.updateName();
    },
    initImageSelected() {
      this.taskInfo.repository = this.warehouseList[0].warehouseId;
      this.taskInfo.repositoryDir = this.imageCatalogList[0].catalogId;
      this.taskInfo.imagePrefix = this.imageList[0].imageName;
      this.taskInfo.imageVersion = this.imageVersionList[0].imageTag;
      this.updateName();
    },
    updateName() {
      var d = new Date();
      this.taskInfo.taskCnName =
        "task" +
        (d.getMonth() + 1) +
        d.getHours() +
        d.getMinutes() +
        d.getSeconds();
      this.taskInfo.taskName = this.taskInfo.taskCnName;
    },
  },
  async mounted() {
    let result1 = await reqQueueList();
    if (result1.success == true) {
      this.$store.dispatch("CreateJob/getQueueList", result1.rows);
      let result2 = await reqWareHouseList(result1.rows[0].clusterId);
      if (result2.code == "200") {
        this.$store.dispatch("CreateJob/getWareHouseList", result2.data);
        let result3 = await reqWareHouseImageList(result2.data[0].warehouseId);
        if (result3.code == "200") {
          this.$store.dispatch("CreateJob/getWareHouseImageList", result3.data);
        }
      }
    }
    if (this.$route.query.templateId) {
      var d = new Date();
      this.tasks.push(...this.TaskTemplate);
      let dict = [
        "旱情监测",
        "基础设施识别",
        "洪涝灾害监测",
        "水稻长势监测",
        "城市路网提取",
      ];
      let target = [
        "droughtmonitoring",
        "infrastructureidentification",
        "floodmonitoring",
        "ricegrowthmonitoring",
        "cityroadnetworkextraction",
      ];
      for (let i = 0; i < dict.length; i++) {
        if (this.JobTemplate.tvcJobCnName == dict[i]) {
          this.JobTemplate.tvcJobCnName = target[i];
        }
      }
      this.vcJob.vcJobCnName =
        this.JobTemplate.tvcJobCnName +
        "-" +
        (d.getMonth() + 1) +
        d.getDate() +
        d.getHours() +
        d.getMinutes() +
        d.getSeconds();
      this.vcJob.vcJobName =
        this.JobTemplate.tvcJobName +
        (d.getMonth() + 1) +
        d.getDate() +
        d.getHours() +
        d.getMinutes() +
        d.getSeconds();
    }
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
</style>
