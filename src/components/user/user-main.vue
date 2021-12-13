<template>
  <div>
    <el-container>
      <el-aside>
        <el-col :span="18">
          <el-card :body-style="{ padding: '45px' }">
            <img
              :src="
                user.imageUrl
                  ? user.imageUrl
                  : 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'
              "
              class="image"
            />
            <div style="padding: 25px">
              <span :class="'type' + user.kind">{{ kinds[user.kind] }}</span>

              <div class="bottom clearfix"></div>
            </div>
          </el-card>
          <el-menu class="el-menu-vertical-demo" router>
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
              <div class="notice-num">
                <p>{{ unreadNum }}</p>
              </div>
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
import { defineComponent } from "vue";
import axios from "axios";

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
      },
      unreadNum: -1,
      reservations: [],
      timer: null,
    };
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
    this.user = JSON.parse(localStorage.getItem("user"));
    this.unreadNum = localStorage.getItem("unreadNum");
    axios
      .post("/api/user/look_reservation", this.user)
      .then((resp) => {
        this.reservations = resp.data.reservations;
        for (var i = 0; i < this.reservations.length; i++) {
          this.reservations[i].begin_time = new Date(
            this.reservations[i].begin_time
          );
          this.reservations[i].end_time = new Date(
            this.reservations[i].end_time
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  mounted() {
    this.timer = setInterval(() => {
      const now = new Date();
      console.log(now);
      for (var i = 0; i < this.reservations.length; i++) {
        const reservation = this.reservations[i];
        //5分钟前提醒到达
        if (
          reservation.begin_time - now < 5 * 60 * 1000 &&
          reservation.msg_begin == 0
        ) {
          console.log("here", reservation.msg_begin);
          this.reservations[i].msg_begin = 1;
          axios
            .post("/api/user/add_message", {
              reservation: reservation,
              type: 0,
              time: now,
            })
            .then(() => {
              var unreadNum = parseInt(localStorage.getItem("unreadNum"));
              unreadNum += 1;
              localStorage.setItem("unreadNum", String(unreadNum));
            })
            .catch((err) => {
              console.log(err);
            });
        }
        //5分钟前提醒离开
        if (
          reservation.end_time - now < 5 * 60 * 1000 &&
          reservation.msg_end == 0
        ) {
          this.reservations[i].msg_end = 1;
          axios
            .post("/api/user/add_message", {
              reservation: reservation,
              type: 1,
              time: now,
            })
            .then(() => {
              var unreadNum = parseInt(localStorage.getItem("unreadNum"));
              unreadNum += 1;
              localStorage.setItem("unreadNum", String(unreadNum));
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    }, 60 * 1000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
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
  width: 100%;
  height: 130px;
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
  clear: both;
}

.notice-num {
  width: 18px;
  height: 16px;
  border-radius: 7px; /*设置圆角*/
  margin-left: 110px;
  margin-top: -45px;
  position: absolute;
  text-align: center;
  background-color: rgba(245, 40, 40, 0.8);
}
.notice-num > p {
  width: 100%;
  height: 100%;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  font-size: small;
  position: absolute;
  margin: auto;
  margin-top: -20px;
}
</style>
