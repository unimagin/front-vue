<template>
  <div>
    <el-container>
      <el-header>
        <el-menu
          style="border-bottom: 1px solid#409eff"
          router="true"
          mode="horizontal"
          text-color="#53a8ff"
          active-text-color="#409eff"
          :default-active="$route.path"
        >
          <el-menu-item
            class="nav"
            index="/user/reservation"
            style="margin-left: 150px"
            >主&nbsp;页</el-menu-item
          >
          <el-menu-item
            class="nav"
            style="margin-left: auto"
            index="/user/self-information"
          >
            <el-icon size="20px">
              <user-filled />
            </el-icon>
          </el-menu-item>
          <el-button style="border: 0px" @click="loginOut">注销</el-button>
        </el-menu>


    <el-col :span="18">
       <el-card :body-style="{ padding: '70px' }">
      <img  src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image" >
      <div style="padding: 14px;">
        <span>USER</span>
        <div class="bottom clearfix">
          
          <!-- <el-button type="text" class="button">操作按钮</el-button> -->
        </div>
      </div>
    </el-card>
  
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose">
      <el-menu-item index="1">
        <i class="el-icon-location"></i>
          <span slot="title">个人中心</span>
      </el-menu-item>
                <!-- <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu> -->
      <!-- </el-submenu> -->
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">车辆主页</span>
      </el-menu-item>
      <!-- <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item> -->
      <el-menu-item index="3">
        <i class="el-icon-setting"></i>
        <span slot="title">设置</span>
      </el-menu-item>
    </el-menu>
  </el-col>


      </el-header>
      <router-view></router-view>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { UserFilled } from "@element-plus/icons";

export default defineComponent({
  name: "user",
  data() {},
  components: {
    UserFilled,
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
  border-bottom: 1px solid#409eff !important;
}


  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }
  .image {
    width:220px;
     height:220px; 
     border-radius:50%; 
    
} 
  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
</style>