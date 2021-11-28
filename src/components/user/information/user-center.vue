<template>
  <div>
    <span>金额：{{ this.balance }}</span>
    <el-button @click="this.top_up = true">充值</el-button>
    <div style="margin-top: 10px">卡组：</div>
    <el-collapse>
      <el-collapse-item title="已有卡组" name="1">
        <el-card shadow="hover">
          <el-result icon="success" title="会员卡"> </el-result>
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <span>会员特权</span>
              </div>
            </template>
            <div v-for="o in 4" :key="o" class="text item">
              {{ "List item " + o }}
            </div>
          </el-card>
        </el-card>
      </el-collapse-item>
      <el-collapse-item title="未有卡组" name="2">
        <el-card shadow="hover">
          <el-result icon="error" title="合同卡"> </el-result>
        </el-card>
      </el-collapse-item>
    </el-collapse>
    <el-dialog v-model="top_up" title="充值" width="30%" center>
      <el-row>
        <el-col :span="8"
          ><span style="line-height: 40px">请输入充值金额: </span></el-col
        >
        <el-col :span="8">
          <el-input v-model="this.money" style="width: 100px"></el-input
        ></el-col>
        <el-col :span="8">
          <el-button type="mini" @click="addBalance">确认</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "user-center",
  data () {
    return {
      balance: 0,
      top_up: false,
      money: 0,
    }
  },
  methods: {
    addBalance () {
      axios.post('/api/user/add_balance', { money: this.money })
        .then((resp) => {
          const user = JSON.parse(localStorage.getItem("user"));
          this.balance = resp.data.balance
          user.balance = this.balance
          localStorage.setItem('user', JSON.stringify(user))
          this.$store.commit('selfEdit', JSON.stringify(user))
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    const user = JSON.parse(localStorage.getItem("user"));
    this.balance = user.balance
  }
}
</script>

<style scoped>
.el-button {
  margin-left: 50px;
  margin-top: 5px;
}
</style>