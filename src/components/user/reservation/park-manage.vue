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
        <el-button type="text" class="button" @click="parkWithoutAppoint">点这里</el-button>
      </div>
    </el-card>
    <el-dialog v-model="parkAppoint" title="未预约停车" width="30%" center>
      1. 开始时间
      2。 结束时间
      3。 车牌号：
      确定
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "park-manage",
  data() {
    return {
      parkAppoint: false
    }
  },
  methods: {
    parkWithoutAppoint() {
      this.parkAppoint = true
    }
  }
}
</script>

<style scoped>

</style>