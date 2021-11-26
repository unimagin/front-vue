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
        <el-button type="text" class="button">点这里</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "park-manage"
}
</script>

<style scoped>

</style>