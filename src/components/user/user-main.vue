<template>
  <div>
    <el-container>
      <el-header>
        <el-menu
          style="border-bottom: 1px solid#409eff"
          router="true"
          mode="horizontal"
          text-color="#53a8ff"
          active-text-color="#409eff"
        >
          <el-menu-item
            class="nav"
            index="1"
            route="/user/reservation"
            style="margin-left: 150px"
            >主&nbsp;页</el-menu-item
          >
          <el-menu-item
            class="nav"
            style="margin-left: auto"
            route="/user/self-information"
          >
            <el-icon size="20px">
              <user-filled />
            </el-icon>
          </el-menu-item>
          <el-button style="border: 0px" @click="loginOut">注销</el-button>
        </el-menu>
      </el-header>
      <router-view></router-view>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { UserFilled } from "@element-plus/icons";

export default defineComponent({
  name: "user",
  data() {},
  components: {
    UserFilled,
  },
  methods: {
    loginOut() {
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
  border-bottom: 1px solid#409eff !important;
}
</style>