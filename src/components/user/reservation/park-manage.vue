<template>
  <div>
    <el-card shadow="hover">
      <div style="padding: 14px">
        <span>车位被占用</span>
        <el-button type="text" class="button">点这里</el-button>
      </div>
    </el-card>
    <el-card shadow="hover">
      <div style="padding: 14px">
        <span>未预约停车</span>
        <el-button type="text" class="button" @click=" parkWithoutAppoint = true">点这里</el-button>
      </div>
    </el-card>
    <el-dialog v-model="parkWithoutAppoint" title="未预约停车" width="30%" center>
      1. 开始时间
      2。 结束时间
      3。 车牌号：
      确定
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "park-manage",
  data() {
    return {
      parkWithoutAppoint: false,
      user: {}
    }
  },
  methods: {},
  created() {
    this.$showLoading("正在拼命加载");
    this.user = JSON.parse(localStorage.getItem("user"));
    axios.post("/api/user/look_cars", {
      user: this.user,
    }).then((res) => {
      this.user.car = res.data;
      this.$finishLoading();
    }).catch(error => {
      this.$finishLoading();
    })
  }
}
</script>

<style scoped>

</style>