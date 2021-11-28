<template>
  <div
    class="main-content"
    style="width: 100%; margin-left: -80px; margin-top: -10px"
  >
    <el-table :data="bills" :row-style="rowStyle">
      <el-table-column type="expand">
        <template v-slot="scope">
          <el-descriptions
            title="详细信息"
            direction="vertical"
            :column="3"
            border
          >
            <el-descriptions-item label="预约情况" align="center"
              >{{ showStatus(scope.row.status) }}
            </el-descriptions-item>
            <el-descriptions-item label="到达时间" align="center"
              >{{ date(scope.row.arrive_time) }}
            </el-descriptions-item>
            <el-descriptions-item label="离开时间 " align="center"
              >{{ date(scope.row.leave_time) }}
            </el-descriptions-item>
          </el-descriptions>
        </template>
      </el-table-column>
      <el-table-column type="index">
        <template v-slot="scope">
          <span>{{ this.current_page * 15 + 1 + scope.$index }}</span>
        </template>
      </el-table-column>
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
      <el-table-column label="费用" prop="money"></el-table-column>
      <el-table-column label="操作" width="150">
        <template v-slot="scope">
          <el-button
            size="primary"
            round
            @click="pay(scope.row)"
            v-show="scope.row.status != 2"
            >{{ scope.row.isPaid ? "已支付" : "待支付" }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="currentChange"
      :page-size="15"
      layout="prev, pager, next"
      :total="this.sum"
      style="margin-top: 30px"
      center
    >
    </el-pagination>
  </div>
</template>
<script lang="ts">
import axios from "axios";
import { ElMessage } from "element-plus";

export default {
  data() {
    return {
      bills: [],
      seeDetail: false,
      total_bills: [],
      current_page: 0,
      sum: 0,
    };
  },
  methods: {
    rowStyle({ row, rowIndex }) {
      console.log(rowIndex);
      if (row.status == 2) {
        return " background-color: #f4f4f5;";
      } else if (row.status == 0) {
        return " background-color: #e1f3d8";
      } else if (row.status == 4) {
        return " background-color: #fde2e2";
      }
      return "background-color: #fef0f0";
    },
    currentChange(size) {
      this.current_page = size - 1;
      this.bills = this.total_bills[this.current_page];
    },
    date(time) {
      const timestr = new Date(time).toLocaleString().split(" ");
      return (
        timestr[0] + "\n" + timestr[1].substring(0, timestr[1].lastIndexOf(":"))
      );
    },
    showStatus(status) {
      switch (status) {
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
          .post("/api/user/bill/pay_bill", { bill_ID: row.bill_ID })
          .then((resp) => {
            const fail = resp.data.fail;
            if (fail) {
              ElMessage({
                type: "warning",
                message: "余额不足，支付失败！请充值！",
              });
            } else {
              row.isPaid = 1;
              ElMessage({
                type: "success",
                message: "支付成功！",
              });
              const user = resp.data.user;
              localStorage.setItem("user", JSON.stringify(user));
              this.$store.commit("selfEdit", JSON.stringify(user));
            }
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
        this.sum = resp.data.bills.length;
        const page = Math.ceil(this.sum / 15);
        for (let i = 0; i < page; i++) {
          this.total_bills[i] = resp.data.bills.slice(i * 15, (i + 1) * 15);
        }
        this.bills = this.total_bills[0];
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