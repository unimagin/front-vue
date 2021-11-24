<template>
  <div>
    <el-container>
      <el-header>
        <el-breadcrumb class="headers" separator="/">
          <el-breadcrumb-item :to="{ path: '/user/self-information/basic' }">
            <i class="el-icon-user"></i>
            基本信息
          </el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/user/self-information/reservation-information' }">
            <i class="el-icon-document"></i>
            预约记录
          </el-breadcrumb-item>

          <el-breadcrumb-item :to="{ path: '/user/self-information/car' }">
            <i class="el-icon-bicycle"></i>
            车辆管理
          </el-breadcrumb-item>

        </el-breadcrumb>
      </el-header>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>

export default {

}
</script>

<style scoped>
.el-icon {
  margin-right: 10px;
  margin-bottom: 5px;
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
  background-color: #f5f7fa;
  color: #79bbff;
  font-size: 17px;
  font-weight: 700;
  justify-content: center;
  border: 1px solid #e1e1e1 !important;
}

.el-breadcrumb {
  font-size: 20px;
}

.main {
  width: 100%;
  display: flex;
  text-align: center;
  justify-items: center;
}
.el-main{
  padding-top: 50px;
  padding-left: 100px;
}
:deep(.el-breadcrumb__item:last-child .el-breadcrumb__inner){
   color: black;
  cursor:pointer;
  font-weight: bold;
}

:deep(.el-breadcrumb__item:last-child .el-breadcrumb__inner:hover){
   color: #66b1ff;
;
}

</style>
