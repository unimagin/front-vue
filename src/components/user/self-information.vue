<template>
  <div>
    <el-container class="content">
      <el-aside width="200px" style="margin-right: 120px">
        <el-row class="title"> 个人中心</el-row>
        <el-menu router="true">
          <el-menu-item class="list" index="1" route="/user/self-information"
          >基本信息
          </el-menu-item
          >
          <el-menu-item class="list" index="2">预约记录</el-menu-item>
        </el-menu>
      </el-aside>
      <el-main style="height: 100%">
        <el-form
            ref="infoForm"
            label-width="100px"
        >
          <el-form-item label="手机号码：">
            <el-input v-model="user.phone" readonly></el-input>
          </el-form-item>
          <el-form-item label="电子邮箱：" prop="email">
            <el-input v-model="user.email"></el-input>
          </el-form-item>
          <el-form-item
              label="银行卡号："
              prop="bank_number"
              style="margin-bottom: 40px"
          >
            <el-input v-model="user.bank_number"></el-input>
          </el-form-item>
          <el-form-item style="margin-left: 120px">
            <el-button type="primary" @click="saveEdit">保存</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script>

export default {
  data() {
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
      user: {
        phone: "123",
        email: "123",
        bank_number: "123",
      }
      /*  rules: {
          email: [
            {
              validator: emailCheck,
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
        }*/
    }
  },
  methods: {
    saveEdit() {
      console.log("hhhh");
      /*  this.$refs["infoForm"].validate(valid => {
          if (valid) {*/
      console.log(this.user)
      this.$showLoading("正在保存")
      this.$store.dispatch("SaveEdit", this.user)
          .then(() => {
            this.$finishLoading();
            this.$message.success("保存成功")
          })
          .error(() => {
            this.$message.error("保存失败")
          });
      /*)
    } else {
      this.$message.error("请输入正确的信息");
    }
  });*/
    },
  },
  beforeMount() {
    this.user = JSON.parse(this.$store.getters.getUser)
  },
}
</script>

<style scoped>
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

.el-input {
  width: 300px;
}
</style>
