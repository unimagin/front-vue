<template>
  <div>
    <el-container class="content">
      <el-aside width="200px" style="margin-right: 120px">
        <el-row class="title"> 个人中心</el-row>
        <el-menu router="true">
          <el-menu-item class="list" index="1" route="/user/self-information">
            <el-icon :size="20">
              <user/>
            </el-icon>
            基本信息
          </el-menu-item>
          <el-menu-item class="list" index="2" route="/user/self-information/reservation-information">
            <el-icon :size="20">
              <document/>
            </el-icon>
            预约记录
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main style="height: 100%">
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import {Document, User} from "@element-plus/icons";

export default {
  components: {
    Document,
    User
  }
}
</script>

<style scoped>
.el-icon {
  margin-right: 10px;
  margin-bottom: 5px;
}

.content {
  margin-left: 18%;
  margin-right: 18%;
  margin-top: 80px;
}

.list {
  padding: 0 !important;
  background-color: #ecf5ff;
  text-align: center;
  font-size: medium !important;
}

.el-menu {
  --el-menu-hover-background-color: #c6e2ff !important;
}

.title {
  align-content: center;
  width: 200px;
  height: 50px;
  background-color: #f5f7fa;
  color: #79bbff;
  font-size: 17px;
  font-weight: 700;
  justify-content: center;
  border: 1px solid #e1e1e1 !important;
}
</style>
