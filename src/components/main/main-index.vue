<template>
  <div id="app">
    <header>
      <div class="left">您好！欢迎光临NKU_SoftWare_P_L系统</div>
      <el-container direction="horizontal">
        <el-image
            style="width: 180px; height: 100px"
            :src="url"
            :fit="fit"></el-image>
        <el-menu
            class="el-menu-demo"
            mode="horizontal"
            router="true"
            background-color="#FFFFFFFF"
        >
          <el-menu-item style="margin-left:auto" index="1" route="/main">产品</el-menu-item>
          <el-menu-item index="2" route="/main/about-us">关于我们</el-menu-item>
          <el-menu-item index="3" route="/login">登录
            <!-- <el-button icon="el-icon-upload">登录</el-button> -->
          </el-menu-item>
          <el-menu-item index="4" route="/register">注册
            <!-- <el-button icon="el-icon-edit">注册</el-button> -->
          </el-menu-item>
        </el-menu>
      </el-container>
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>

export default {
  name: 'basic-header',
  data() {
    return {
      url: 'https://img.sj33.cn/uploads/allimg/201401/7-1401291K556.png'
    }
  },
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.left{
  font-size: 18px;
  margin-left: 18px;
  margin-top: 15px;
}
.el-menu {
  width: 50%;
  margin-left: auto;
}
.el-menu-item{
  font-size: 17px;
}
header {
  background: white;
  width: auto;
  height: 100px;
}

.el-button {
  background-color: rgba(224, 226, 234, 0.2);
}
/* .el-menu>a:hover{
  color: #ffffff;
} */
.el-button:hover {
  background-color: #4D88FAFC;
  color: #ffffff;
}

</style>