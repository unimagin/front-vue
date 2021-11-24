<template>
  <div>
    <el-container>
      <el-aside>
        <el-col :span="18">
          <el-card :body-style="{ padding: '70px' }">
            <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                 class="image">
            <div style="padding: 14px;">
              <span>USER</span>
              <div class="bottom clearfix">
              </div>
            </div>
          </el-card>
          <el-menu
              class="el-menu-vertical-demo"
              router
          >
            <el-menu-item index="/user/self-information">
              <i class="el-icon-location"></i>
              <span slot="title">个人中心</span>
            </el-menu-item>
            <el-menu-item index="/user/reservation">
              <i class="el-icon-menu"></i>
              <span slot="title">车辆主页</span>
            </el-menu-item>
            <el-menu-item index="/user/setting">
              <i class="el-icon-setting"></i>
              <span slot="title">设置</span>
            </el-menu-item>
            <el-menu-item index="" @click="loginOut">
              <i class="el-icon-loading"></i>
              <span slot="title">注销</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-aside>
      <el-main class="mains">
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "user",
  data() {
  },
  methods: {
    loginOut() {
      console.log("hhhh");
      this.$store
          .dispatch("LogOut")
          .then(() => {
            this.$message.success("注销成功！");
            this.$router.push({
              path: "/login",
            });
          })
          .catch((error) => {
            this.$message.error("注销失败！");
          });
    },
  },
});
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

.nav {
  font-size: larger !important;
}

.el-header {
  border-bottom: 1px solid #409eff !important;
}

.mains {
  margin-left: -70px;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.image {
  width: 220px;
  height: 220px;
  border-radius: 50%;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}
</style>