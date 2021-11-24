<template>
  <div>
    <el-container class="content">
      <el-header>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/user/reservation/park-situation' }">
            <el-icon :size="20">
              <user/>
            </el-icon>
            车位情况
          </el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/user/reservation/reservation-situation' }">
            <el-icon :size="20">
              <document/>
            </el-icon>
            预约情况
          </el-breadcrumb-item>

          <el-breadcrumb-item :to="{ path: '/user/reservation/rates' }">
            <el-icon :size="20">
              <van/>
            </el-icon>
            收费标准
          </el-breadcrumb-item>
        </el-breadcrumb>
      </el-header>
      <el-main style="height: 100%">
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>

export default {
  name: "reservation",
}
</script>

<style scoped>

.list {
  padding: 0 !important;
  background-color: #ecf5ff;
  text-align: center;
  font-size: medium !important;
}

.el-menu {
  --el-menu-hover-background-color: #c6e2ff !important;
}

.el-breadcrumb {
  font-size: 20px;
}

</style>