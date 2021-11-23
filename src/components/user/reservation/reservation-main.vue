<template>
  <div>
    <el-container class="content">

      

      <!-- <el-aside width="200px" style="margin-right: 120px">
        <el-menu :default-active="$route.path" router="true">
          <el-menu-item class="list" index="/user/reservation/park-situation"
            >车辆情况
          </el-menu-item>
          <el-menu-item
            class="list"
            index="/user/reservation/reservation-situation"
            >预约情况</el-menu-item
          >
          <el-menu-item class="list" index="/user/reservation/rates"
            >收费标准</el-menu-item
          >
        </el-menu>
      </el-aside> -->
      <el-main style="height: 100%">
        <el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/' }"><el-icon :size="20">
              <user/>
            </el-icon>车辆情况</el-breadcrumb-item>
  <el-breadcrumb-item><a href="/"><el-icon :size="20">
              <document/>
            </el-icon>预约情况</a></el-breadcrumb-item>
   
  <el-breadcrumb-item><a href="/"><el-icon :size="20">
              <van/>
            </el-icon>收费标准</a></el-breadcrumb-item>
</el-breadcrumb>

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
/*.el-main {
  width: 600px;
   height: 400px;
  margin-top: 40px;
}*/

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
.el-breadcrumb {
    font-size: 20px;
    line-height:4;
    
}

.el-main{
  margin-left: 30%;
  /* --el-main-padding:0px; */
}
</style>