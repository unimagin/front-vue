<template>
  <div>
    <div class="upload">
      <el-upload
          class="avatar-uploader"
          :limit="1"
          :before-upload="beforeUploadFile"
          accept="image/jpeg,image/gif,image/png,image/jpg"
          show-file-list="true"
      >
        <img v-if="user.imageUrl" :src="user.imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <h3>上传头像</h3>
    </div>
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
      <el-form-item style="margin-left: -100px">
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

import axios from "axios";

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
      user: {},
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
      },
    }
  },
  methods: {
    saveEdit() {
      this.$refs["infoForm"].validate(valid => {
        if (valid) {
          this.$showLoading("正在保存")
          this.$store.dispatch("SaveEdit", this.user)
              .then((res) => {
                console.log(res)
                this.$finishLoading();
                this.$message.success("保存成功！");
                this.isSaved = true
              })
              .catch((error) => {
                this.$finishLoading();
                this.$message.error("保存失败")
              });

        } else {
          this.$message.error("请输入正确的信息");
        }
      })
    },
    beforeUploadFile(file) {
      this.uploadFile(file)
    },
    async uploadFile(file) {
      this.$showLoading("正在上传")
      file.filename = this.user.phone;
      let formData = new FormData();
      formData.append('avatar', file);
      formData.append('filename', this.user.phone);
      const res = await axios.post('/api/user/image/upload', formData)
          .catch(err => {
            this.$finishLoading()
            this.$message.error("图片上传失败");
          })
      this.user.imageUrl = res.data.user.imageUrl
      console.log(this.user)
      localStorage.setItem('user', JSON.stringify(this.user))
      this.$finishLoading()
      this.$message.success("图片上传成功");
    }
  },
  beforeMount() {
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log(this.user)
  },
}
</script>

<style scoped>
.upload {
  margin-top: -30px;
  margin-bottom: 50px;
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

:deep(.el-form-item__label) {
  font-size: 15px;
}

:deep( .avatar-uploader .el-upload ) {
  border: 2px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  margin-top: 10px;
  /* background-color: beige; */
}

:deep( .avatar-uploader .el-upload:hover ) {
  border-color: #409EFF;
}

:deep(.avatar-uploader-icon) {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  line-height: 150px;
  text-align: center;
}

:deep( .avatar) {
  width: 150px;
  height: 150px;
  display: block;
}

:deep(.el-breadcrumb__item:hover) {
  cursor: pointer;
}
</style>
