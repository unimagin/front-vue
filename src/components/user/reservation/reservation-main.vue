<template>
  <div>
    <el-container class="content">
      <el-header>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/user/reservation/park-situation' }">
            <i class="el-icon-coordinate">
            车位情况
            </i>
          </el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/user/reservation/reservation-situation' }">
              <i class="el-icon-notebook-2">

            预约情况
              </i>
          </el-breadcrumb-item>
          

          <el-breadcrumb-item :to="{ path: '/user/reservation/rates' }">
            <i class="el-icon-tickets">
            
            收费标准
            </i>
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

:deep( .el-breadcrumb__item:last-child .el-breadcrumb__inner){
   color: black;
  cursor:pointer;
  /* font-weight: bold; */
}
:deep( .el-breadcrumb__item:last-child .el-breadcrumb__inner :hover){

   color: #66b1ff;
  
}

</style>