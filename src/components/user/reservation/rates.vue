<template>
  <div>
    <template v-for="item in people">
      <el-card class="box-card" shadow="hover">
        <div slot="header" class="clearfix">
          <h2>{{ item.label }}</h2>
        </div>
        <div class="text item">
          正常情况下停车费用为:{{ item.normalPrice }}元/小时 (不足一小时按一小时处理)
        </div>
        <div class="text item">
          超出预约时限收取：{{ item.BreakPrice }}元/小时 (不足一小时按一小时处理)
        </div>
      </el-card>
    </template>
  </div>
</template>

<script>
export default {
  name: "rates",
  data() {
    return {
      people: [
        {
          label: "普通用户",
          normalPrice: 5.00,
          BreakPrice: 10.00,
        },
        {
          label: "VIP用户",
          normalPrice: 2.50,
          BreakPrice: 5.00,
        },
        {
          label: "合同用户",
          normalPrice: 1.00,
          BreakPrice: 8.00,
        }]
    }
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
  clear: both
}

.box-card {
  width: 480px;
  margin-bottom: 20px;
}
</style>