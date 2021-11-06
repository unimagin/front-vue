<template>
  <div class="login"
       clearfix>
    <div class="login-wrap">
      <el-form ref="loginForm"
               :model="user"
               :rules="loginRules"
               status-icon
               label-width="120px">
        <el-form-item label="手机号" prop="phone" class="item">
          <el-input v-model="user.phone"
                    placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" class="item2">
          <el-input v-model="user.password"
                    show-password
                    placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox-group v-model="checkList">
            <el-checkbox label="自动登录"/>
            <el-checkbox label="记住密码"
                         ref="rememberMe"
                         style="margin-right: auto;margin-left: 90px"/>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item size="large">
          <el-button type="primary"
                     icon="el-icon-upload"
                     @click="doLogin()">登 录
          </el-button>
        </el-form-item>
      </el-form>
      <el-container direction="horizontal">
        <div class="find" style="color:black;">
          <router-link to="/">找回密码</router-link>
        </div>
        <div class="register">
          <router-link to="/register">注册账号</router-link>
        </div>
      </el-container>
    </div>
  </div>
</template>

<script>

export default {
  name: "login",
  data() {
    var phoneCheck = (rule, value, callback) => {
      const reg = /^[1][3-9][0-9]{9}$/;
      if (value == '' || value == undefined || value == null) {
        callback();
      } else {
        if ((!reg.test(value)) && value != '') {
          callback(new Error('请输入正确的电话号码'));
        } else {
          callback();
        }
      }
    }
    return {
      loginRules: {
        phone: [{
          required: true,
          message: '请输入手机号',
          trigger: 'blur'
        },
          {
            validator: phoneCheck,
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: 'blur'
          }
        ],
      },
      user: {
        phone: "",
        password: ""
      },
      checkList: []
    };
  },
  methods: {
    doLogin() {
      this.$refs["loginForm"].validate(valid => {
        if (valid) {
          this.$showLoading("正在登录");
          let params = {
            'phone': this.user.phone,
            'password': this.user.password,
          }
          this.$store.dispatch('Login', {
            params: params,
            checkList: this.checkList
          })
              .then(() => {
                setTimeout(() => {
                  this.$finishLoading();
                  this.$message.success("登录成功！");
                  this.$router.push({
                    path: "/user"
                  });
                }, 800)
              })
              .catch((error) => {
                this.$finishLoading();
                this.$message.error("您输入的用户名或密码错误！");
              });
        } else {
          this.$message.error("请输入正确的信息");
        }
      });
    }
  },
  beforeMount() {
    if (localStorage.getItem("autoLogin")) {
      this.checkList.push("自动登录");
    }
    if (localStorage.getItem("rememberMe")) {
      if (this.checkList.length == 1) {
        this.checkList.push("记住密码");
      } else {
        this.checkList.push("记住密码");
      }
      this.user = JSON.parse(this.$store.getters.getUser)
    }
  },
  mounted() {
    if (localStorage.getItem("autoLogin")) {
      setTimeout(() => {
        this.doLogin()
      }, 1000)
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login {
  width: 100%;
  height: 100%;
  background-size: cover;
  overflow: hidden;
  justify-content: center;
  align-content: center;
  position: fixed;

  background: url("http://www.etcp.cn/static/images/index_img2.png") no-repeat;
  background-size: 100% 100%;

}

.login-wrap {
  /* background-size: cover; */
  /* width: 40%;
  height: 300px;
  margin: 215px auto;
  overflow: hidden;
  padding-top: 50px;
  line-height: 40px;
  background-color:rgba(17, 12, 12, 0.8); /* 透明背景色 */
  /* background: url("http://www.etcp.cn/static/images/index_img2.png") no-repeat;

 border-radius:30px;
 border: 2px solid; */
  /* border-image: linear-gradient(to right, blue green) 1 */
  position: absolute;
  /*定位方式绝对定位absolute*/
  top: 50%;
  left: 50%;
  /*顶和高同时设置50%实现的是同时水平垂直居中效果*/
  transform: translate(-50%, -50%);
  /*实现块元素百分比下居中*/
  width: 450px;
  padding: 50px 50px 50px 5px;
  /* background: rgba(0,0,0,.5); */
  background: rgba(255, 253, 253, 0.5);
  /*背景颜色为黑色，透明度为0.8*/
  box-sizing: border-box;
  /*box-sizing设置盒子模型的解析模式为怪异盒模型，
  将border和padding划归到width范围内*/
  box-shadow: 0px 15px 25px rgba(247, 245, 245, 0.5);
  /*边框阴影  水平阴影0 垂直阴影15px 模糊25px 颜色黑色透明度0.5*/
  border-radius: 15px;
}



.el-form-item:nth-child(2) {
  /* background-color: yellow;  */
  margin-bottom: -20px;
  margin-top: auto;
  margin-left: 0;
}

.el-form-item:nth-child(3) {
  /* background-color: yellow;  */
  margin-top: 15px;
  margin-bottom: auto;
  margin-left: -40px;
}

.el-form-item:nth-child(4) {
  /* background-color: cadetblue;  */
  align-content: center;
  margin-left: 13%;
  margin-right: auto;
  margin-bottom: 20px;
}

.el-input {
  /* width: 60%;
  margin-left: 10%;
  margin-right: 0%; */
  width: 85%;
  padding: 0px 10px 10px 10px;
  /* margin-left: 10%; */
  font-size: 15px;
  color: #fff;
  letter-spacing: 1px;
  /*字符间的间距1px*/
  margin-bottom: 20px;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  /*outline用于绘制元素周围的线
  outline：none在这里用途是将输入框的边框的线条使其消失*/
  background: transparent;
}

:deep(.el-form-item__error) {
  /* background-color: cadetblue;  */
 right: 13px;
 font-size: 14px;
  margin-top: -22px;
  margin-bottom: auto;
}
:deep(.el-input__suffix){
  right: 15px;
}
:deep(.el-checkbox__label){
  color: #444;
  font-size: 15px;
}
.find {

  margin-left: 18%;
  margin-right: auto;


}

.register {
  margin-right: 8%;
  margin-left: auto;
}

a {
  text-decoration: none;
  color: black;
  font-size: 16px;
}

a:hover {
  color: white;
}
:deep(.el-form-item__label){
  color: black;
  font-size: 16px;
}
.el-button {
  width: 80%;
  margin-left: -20%;
  background: transparent;
  color: black;
  border: black;
  font-size: 15px;
}
</style>