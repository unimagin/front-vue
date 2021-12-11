<template>
  <div>
    <el-container>
      <el-aside>
        <el-col :span="18">
          <el-card :body-style="{ padding: '50px'}">
            <img
                :src="user.imageUrl ? user.imageUrl:'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'"
                class="image">
            <div style="padding: 25px;">
              <span :class="'type'+user.kind">{{ kinds[user.kind] }}</span>
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
            <el-menu-item index="/user/notice">
              <i class="el-icon-message-solid"></i>
              <span slot="title" class="notice">消息中心</span>
            </el-menu-item>
            <el-menu-item index="/main" @click="loginOut">
              <i class="el-icon-circle-close"></i>
              <span slot="title">退出登录</span>
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
    return {
      user: {},
      kinds: {
        "0": "普通用户",
        "1": "会员用户",
        "2": "合同用户",
        "3": "未预约用户",
        "4": "黑名单用户",
      }
    }
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
  beforeMount() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }
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
  width: 100%;
  height: 120px;
  border-radius: 50%;
  display: block;
}

.el-menu-item * {
  font-size: 16px;
}

.button {
  padding: 0;
  float: right;
}


.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.notice::before {
  content: " ";
  border: 3px solid red; /*设置红色*/
  border-radius: 3px; /*设置圆角*/
  position: absolute;
  margin-left: 70px;
  margin-top: 15px;
}

</style>