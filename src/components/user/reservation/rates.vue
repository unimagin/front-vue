<template>
  <div>
    <template v-for="item in parkPrice">
      <el-card class="box-card" shadow="hover">
        <div slot="header" class="clearfix">
          <h2>{{ item.label }}</h2>
        </div>
        <div class="text item">
          正常情况下停车费用为:{{ item.normalPrice }}元/小时
          (不足1小时按1小时处理)
        </div>
        <div class="text item">
          超出预约时限收取：{{ item.breakPrice }}元/小时 (不足1小时按1小时处理)
        </div>
      </el-card>
    </template>
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <h2>开通VIP</h2>
      </div>
      <div class="text item">每月只需{{ VIPMonth }}元（大优惠）</div>
      <el-button type="text" class="button" @click="showMessage = true"
        >如何开通</el-button
      >
    </el-card>
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <h2>开通合同用户</h2>
      </div>
      <div class="text item">每月只需{{ ContractMonth }}元（大优惠）</div>
      <el-button type="text" class="button" @click="showMessage = true"
        >如何开通</el-button
      >
    </el-card>
    <el-dialog v-model="showMessage">
      <el-steps :active="1">
        <el-step title="步骤 1" description="前往个人中心"></el-step>
        <el-step title="步骤 2" description="用户中心"></el-step>
        <el-step
          title="步骤 3"
          status="process"
          description="点击未有卡"
        ></el-step>
        <el-step
          title="步骤 4"
          status="process"
          description="点击卡片即可购买"
        ></el-step>
      </el-steps>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "rates",
  data () {
    return {
      parkPrice: [],
      VIPMonth: 120,
      ContractMonth: 110,
      showMessage: false
    }
  },
  created () {
    axios.get('/api/admin/look_price')
      .then(resp => {
        this.parkPrice = resp.data.parkPrice
        this.VIPMonth = resp.data.userPrice[0].price
        this.ContractMonth = resp.data.userPrice[1].price
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style scoped>
.text {
  font-size: 15px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
  margin-bottom: 20px;
}

.el-card {
  display: flex;
  float: left;
}
</style>