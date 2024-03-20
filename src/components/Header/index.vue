<template>
  <el-row>
    <el-menu mode="horizontal" background-color="#ADB6CA" text-color="black">
      <el-col :span="20">
        <div style="text-align: center; height: 60px">
          <img
            src="@/assets/images/titleicon.jpg"
            style="height: 60px; width: 210px; margin-left: 10px; float: left"
          />
          <span class="font">{{ $t("header.title") }}</span>
        </div>
      </el-col>
      <el-col :span="1">
        <div
          style="text-align: center; height: 60px; font-size: 16px"
          @click="handleLang()"
        >
          <i class="el-icon-refresh" style="color: black; cursor: pointer">{{
            $t("header.lang")
          }}</i>
        </div>
      </el-col>
      <el-col style="width: 100px">
        <el-submenu index="1" style="padding: 0px">
          <el-menu-item
            index="2"
            style="padding: 0px"
            @click="passwordDialogVisible = true"
          >
            <i class="el-icon-edit" style="color: black">{{
              $t("header.password1")
            }}</i>
          </el-menu-item>
          <el-menu-item
            index="3"
            style="padding: 0px"
            @click="uploadDialogVisible = true"
          >
            <i class="el-icon-upload" style="color: black">{{
              $t("header.touxiang")
            }}</i>
          </el-menu-item>
          <template slot="title">
            <el-avatar :src="iconurl"></el-avatar>
          </template>
        </el-submenu>
      </el-col>
      <el-col :span="1" style="text-align: center">
        <el-menu-item
          index="2"
          @click="logout"
          class="size"
          style="padding: 0px; font-size: 16px"
          >Logout</el-menu-item
        >
      </el-col>
    </el-menu>
    <el-dialog
      :title="$t('header.password1')"
      :visible.sync="passwordDialogVisible"
      width="400px"
      :before-close="handleClose"
      class="dialogClass"
    >
      <el-form
        ref="passwdForm"
        style="margin: 0px; padding: 0px"
        label-position="right"
        label-width="100px"
        :rules="passwdRules"
        :model="passwd"
      >
        <el-row>
          <el-form-item :label="$t('header.password2')" prop="oldPassword">
            <el-input
              :placeholder="$t('header.password3')"
              size="small"
              v-model="passwd.oldPassword"
              style="width: 270px"
              @blur="verifyPasswd()"
              show-password
            ></el-input> </el-form-item
        ></el-row>
        <el-row>
          <el-form-item :label="$t('header.password4')" prop="newPassword1">
            <el-input
              show-password
              :placeholder="$t('header.password5')"
              size="small"
              v-model="passwd.newPassword1"
              style="width: 270px"
            ></el-input></el-form-item
        ></el-row>
        <el-row>
          <el-form-item :label="$t('header.password6')" prop="newPassword2">
            <el-input
              show-password
              :placeholder="$t('header.password7')"
              size="small"
              v-model="passwd.newPassword2"
              style="width: 270px"
            ></el-input></el-form-item></el-row
      ></el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closePasswd()" size="small">{{
          $t("header.cancle")
        }}</el-button>
        <el-button type="primary" @click="updatePasswd()" size="small">{{
          $t("header.confirm")
        }}</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :title="$t('header.touxiang')"
      :visible.sync="uploadDialogVisible"
      width="400px"
      :before-close="handleClose"
      class="dialogClass"
    >
      <el-upload
        style="margin-left: 18px"
        drag
        action
        :http-request="uploadFile"
        :multiple="false"
        :auto-upload="false"
        ref="upload"
        accept=".png, .jpg, .JPG, .JPEG, .jpeg, .PNG, .GIF, .gif"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          {{ $t("header.touxiang1") }}
          <em>{{ $t("header.touxiang2") }}</em>
        </div>
        <div class="el-upload__tip" slot="tip"></div> </el-upload
      ><el-row
        ><el-button
          type="primary"
          size="small"
          style="margin-left: 320px"
          @click="submitUpload"
          >{{ $t("header.upload") }}</el-button
        ></el-row
      >
    </el-dialog>
  </el-row>
</template>
<script>
import {
  reqVerifyPasswd,
  reqUpdateUserPassword,
  reqUserInfoUploadFile,
} from "@/api";
import { mapState } from "vuex";
export default {
  name: "Header",
  data() {
    var verifyPassword = (rule, value, callback) => {
      if (this.passwd.newPassword2 === "") {
        return callback(new Error("请再次输入密码"));
        // password 是表单上绑定的字段
      } else if (this.passwd.newPassword2 != this.passwd.newPassword1) {
        return callback(new Error("两次输入密码不一致!"));
      } else {
        return callback();
      }
    };
    return {
      iconurl: "",
      uploadDialogVisible: false,
      passwordDialogVisible: false,
      passwd: { oldPassword: "", newPassword1: "", newPassword2: "" },

      passwdRules: {
        oldPassword: [
          { required: true, message: "请输入当前密码", trigger: "blur" },
        ],
        newPassword1: [
          { required: true, message: "请输入新密码", trigger: "blur" },
        ],
        newPassword2: [
          { required: true, validator: verifyPassword, trigger: "change" },
        ],
      },
    };
  },
  computed: {
    ...mapState("User", ["userInfo"]),
    username() {
      return this.userInfo.name;
    },
  },
  methods: {
    handleLang() {
      if (!localStorage.getItem("locale")) {
        localStorage.setItem("locale", JSON.stringify("zh"));
      }
      let type = "zh";
      if (JSON.parse(localStorage.getItem("locale")) == "zh") {
        type = "en";
      } else {
        type = "zh";
      }
      localStorage.setItem("locale", JSON.stringify(type));
      this.$i18n.locale = type;
      if (
        this.$router.history.current.name == "dataview" ||
        this.$router.history.current.name == "images"
      ) {
        window.location.reload();
      }
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    async uploadFile(files) {
      const formData = new FormData();
      formData.append("file", files.file);
      let result = await reqUserInfoUploadFile(files.file);
      if (result.code == "200") {
        localStorage.setItem("userotherInfo", JSON.stringify(result.data));
        this.iconurl = result.data.icon;
        this.$message({
          type: "success",
          message: result.message,
        });
      } else {
        this.$message.error(result.message);
      }
    },
    logout() {
      localStorage.clear();
      this.$router.push({ name: "login" });
    },
    async verifyPasswd() {
      let Base64 = require("js-base64").Base64;
      if (this.passwd.oldPassword != "") {
        let result = await reqVerifyPasswd(
          Base64.encode(this.passwd.oldPassword)
        );
        if (result.data !== true) {
          this.$message.error("原密码错误!");
          this.passwd.oldPassword = "";
        }
      }
    },
    handleClose(done) {
      let _this = this;
      this.$confirm("确认关闭？")
        .then((_) => {
          _this.passwd.oldPassword = "";
          _this.passwd.newPassword1 = "";
          _this.passwd.newPassword2 = "";
          _this.$refs.upload.clearFiles();
          done();
        })
        .catch((_) => {});
    },
    closePasswd() {
      this.passwordDialogVisible = false;
      this.passwd.oldPassword = "";
      this.passwd.newPassword1 = "";
      this.passwd.newPassword2 = "";
      this.$refs["passwdForm"].resetFields();
    },
    updatePasswd() {
      this.passwordDialogVisible = false;
      let _this = this;
      this.$refs["passwdForm"].validate(async (valid) => {
        if (!valid) {
          return false;
        } else {
          //TODO:发送修改密码的请求
          let Base64 = require("js-base64").Base64;
          let result = await reqUpdateUserPassword({
            password: Base64.encode(this.passwd.newPassword1),
            oldPassword: Base64.encode(this.passwd.oldPassword),
            id: this.userInfo.id,
          });
          _this.logout();
        }
      });
    },
  },
  mounted() {
    this.iconurl = JSON.parse(localStorage.getItem("userotherInfo")).icon;
  },
};
</script>
<style>
.font {
  /* float: right; */
  font-size: 25px;
  font-style: oblique;
  color: #409eff;
  text-align: center;
}

.size {
  font-size: 16px;
}

.el-form {
  align-items: flex-start;
}

.dialogClass .el-dialog__body {
  padding: 0px;
  font-size: 16px;
}
</style>
