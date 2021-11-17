<template>
  <div>
    <el-form
        ref="infoForm"
        label-width="100px"
        :rules="rules"
        :model="user"
    >
      <el-form-item label="手机号码：">
        <el-input v-model="user.phone" readonly></el-input>
      </el-form-item>
      <el-form-item label="电子邮箱：" prop="email">
        <el-input v-model="user.email" :readonly="isSaved"></el-input>
      </el-form-item>
      <el-form-item
          label="银行卡号："
          prop="bank_number"
          style="margin-bottom: 40px"
      >
        <el-input v-model="user.bank_number" prop="bank_number" :readonly="isSaved"></el-input>
      </el-form-item>
      <el-form-item style="margin-left: 120px">
        <template v-if="isSaved">
          <el-button type="primary" @click="isSaved = false">修改</el-button>
        </template>
        <template v-else>
          <el-button type="primary" @click="saveEdit">保存</el-button>
        </template>
      </el-form-item>
    </el-form>
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
      isSaved: true,
      user: {
        phone: "123",
        email: "123",
        bank_number: "123",
      },
      rules: {
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
        bank_number: [
          {
            required: true,
            message: "请输入银行卡号",
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    saveEdit() {
      console.log("hhhh");
      this.$refs["infoForm"].validate(valid => {
        if (valid) {
          this.$showLoading("正在保存")
          this.$store.dispatch("SaveEdit", this.user)
              .then(() => {
                this.$finishLoading();
                this.$message.success("保存成功！");
                this.isSaved = true
              })
              .catch((error) => {
                this.$finishLoading();
                this.$message.error("保存失败")
                /*this.$router.push({
                  path: "/user"
                });*/
              });

        } else {
          this.$message.error("请输入正确的信息");
        }
      })
    }
  },
  beforeMount() {
    const user = JSON.parse(localStorage.getItem('user'));
    this.user = {phone: user.phone, email: user.email, bank_number: user.bank_number}
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

.el-input {
  width: 300px;
}
</style>
