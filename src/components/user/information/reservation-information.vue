<template>
  <el-table :data="bills" style="width: 100%">
    <el-table-column type="expand">
      <template v-slot="scope">
        <p>到达时间: {{ date(scope.row.arrive_time) }}</p>
        <p>离开时间: {{ date(scope.row.leave_time) }}</p>
        <p>预约情况: {{ showStatus(scope.row.status) }}</p>
      </template>
    </el-table-column>
    <el-table-column type="index" />
    <el-table-column label="预约车辆" prop="car_number" width="150">
    </el-table-column>
    <el-table-column label="开始时间" width="100">
      <template v-slot="scope">
        {{ date(scope.row.begin_time) }}
      </template>
    </el-table-column>
    <el-table-column label="结束时间" width="100">
      <template v-slot="scope">
        {{ date(scope.row.end_time) }}
      </template>
    </el-table-column>
    <el-table-column label="费用" prop="money"> </el-table-column>
    <el-table-column label="操作" width="150">
      <template v-slot="scope">
        <el-button size="primary" round @click="pay(scope.row)">{{
          scope.row.isPaid ? "已支付" : "待支付"
        }}</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script lang="ts">
import axios from "axios";
import { ElMessage } from "element-plus";
export default {
  data() {
    return {
      bills: [],
      seeDetail: false,
    };
  },
  methods: {
    date(time) {
      const timestr = new Date(time).toLocaleString().split(" ");
      return (
        timestr[0] + "\n" + timestr[1].substring(0, timestr[1].lastIndexOf(":"))
      );
    },
    showStatus(row) {
      switch (row.status) {
        case 0:
          return "正常";
        case 1:
          return "超时到达";
        case 2:
          return "取消预约";
        case 3:
          return "超时停留";
        case 4:
          return "超时到达和停留";
      }
    },
    pay(row) {
      if (row.isPaid == 0) {
        axios
          .post("/api/user/bill/pay_bill", row.bill_ID)
          .then((resp) => {
            ElMessage({
              type: "success",
              message: "支付成功请刷新页面！",
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
  created() {
    const user = JSON.parse(localStorage.getItem("user"));
    axios
      .post("/api/user/finished_reservation", user)
      .then((resp) => {
        this.bills = resp.data.bills;
        console.log(this.bills);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped>
</style>