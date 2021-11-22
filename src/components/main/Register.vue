<template>
  <div class="login clearfix">
    <div class="login-wrap">
      <el-row type="flex"
              justify="center">
        <el-form ref="registerForm"
                 :model="user"
                 :rules="addFormRules"
                 status-icon
                 label-width="80px">
          <h3>注&nbsp;&nbsp;&nbsp;&nbsp;册</h3>
          <hr>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="user.phone"
                      placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="user.email"
                      placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item label="设置密码" prop="password">
            <el-input v-model="user.password"
                      show-password
                      placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="银行卡号" prop="bank_number">
            <el-input v-model="user.bank_number"
                      placeholder="请输入银行卡号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       icon="el-icon-edit"
                       @click="doRegister()">注&nbsp;&nbsp;册
            </el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Register",
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
    var emailCheck = (rule, value, callback) => {
      const reg = /^([a-zA-Z0-9]+[-_\.]?)+@[a-zA-Z0-9]+\.[a-z]+$/;
      if (value == '' || value == undefined || value == null) {
        callback();
      } else {
        if (!reg.test(value)) {
          callback(new Error('请输入正确的邮箱'));
        } else {
          callback();
        }
      }
    }
    return {
      addFormRules: {
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
        email: [{
          required: true,
          message: '请输入邮箱',
          trigger: 'blur'
        },
          {
            validator: emailCheck,
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
        bank_number: [
          {
            required: true,
            message: "请输入银行卡号",
            trigger: 'blur'
          }
        ]
      },
      user: {
        phone: "",
        email: "",
        password: "",
        bank_number: "",
      }
    }
  },
  methods: {
    doRegister() {
      this.$refs["registerForm"].validate(valid => {
        if (valid) {
          this.$showLoading("正在注册")
          axios
              .post("/api/register", {
                phone: this.user.phone,
                email: this.user.email,
                password: this.user.password,
                bank_number: this.user.bank_number
              })
              .then(res => {
                if (res.status === 200) {
                  setTimeout(() => {
                    this.$finishLoading();
                    this.$message.success("注册成功");
                    this.$router.push({path: "/login"});
                  }, 800)
                }
              })
              .catch(error => {
                this.$finishLoading();
                this.$message.error("手机号或邮箱已被注册");
              });
        } else {
          this.$message.error("请输入正确的信息");
        }
      });
    }
  }
}
;
</script>

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
  position: absolute;
  /*定位方式绝对定位absolute*/
  top: 50%;
  left: 50%;
  /*顶和高同时设置50%实现的是同时水平垂直居中效果*/
  transform: translate(-50%, -50%);
  /*实现块元素百分比下居中*/
  width: 450px;
  padding: 40px 50px 40px 10px;
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
:deep(.el-form-item__label){
  color: black;
  font-size: 14px;
}
h3 {
  color: #444;
  /* color: rebeccapurple; */
  font-size: 24px;
  text-align: center;
}

hr {
  background-color: #444;
  margin: 25px auto;
}

.el-button {
  width: 80%;
  margin-left: 0px;
  margin-top: 30px;
  background: transparent;
  /* margin-bottom: 30px; */
  color: #444;
  border: none;
  font-size: 18px;
  text-align: center;
}
</style>