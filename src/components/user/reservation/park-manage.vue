<template>
  <div>
    <el-card shadow="hover;" style="width:60%;">
      <div style="padding: 14px">
        <h1>车位被占用</h1>
        <el-button type="text" class="button" @click="BeforeRePark">查看详情</el-button>
      </div>
    </el-card>
    <el-card shadow="hover" style="margin-top: 20px;width:60%;">
      <div style="padding: 14px">
        <h1>未预约停车</h1>
        <el-button type="text" class="button" @click=" parkWithoutAppointDialog = true">查看详情</el-button>
      </div>
    </el-card>
    <el-dialog v-model="parkWithoutAppointDialog" title="未预约停车" width="30%" center>
      <el-form :model="reParkForm">
        <el-form-item label="预约时间">
          <el-time-select
              v-model="reParkForm.begin_time"
              placeholder="Start time"
              start="00:00"
              step="00:15"
              end="24:00"
          >
          </el-time-select>
          <el-time-select
              v-model="reParkForm.end_time"
              :min-time="reParkForm.begin_time"
              placeholder="End time"
              start="00:00"
              step="00:15"
              end="24:00"
          />
        </el-form-item>
        <el-form-item label="预约车辆">
          <el-select v-model="reParkForm.car" placeholder="请选择预约的车辆">
            <template v-for="item in user.car">
              <el-option
                  :label="item.car_number"
                  :value="item.car_number"
              ></el-option>
            </template>
          </el-select>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="parkWithoutAppoint" round>提交</el-button>
    </el-dialog>
    <el-dialog v-model="reParkDialog" title="车位占用反馈" width="48%" center>
      <el-table :data="tableData" stripe
                ref="multipleTable"
                @selection-change="handleSelectionChange"
                @select="selectChange"
                @row-click="handleRowClick"
      >
        <el-table-column type="selection" width="55"/>
        <el-table-column label="预约日期" width="160">
          <template v-slot="scope">
            <p>{{ scope.row.r_date }}</p>
          </template>
        </el-table-column>
        <el-table-column label="车位" width="100">
          <template v-slot="scope">
            <p>{{ scope.row.parking_number }}</p>
          </template>
        </el-table-column>
        <el-table-column label="车辆" width="100">
          <template v-slot="scope">
            <p>{{ scope.row.car_number }}</p>
          </template>
        </el-table-column>
        <el-table-column label="开始时间" width="100">
          <template v-slot="scope">
            <p>{{ toDateString(scope.row.begin_time) }}</p>
          </template>
        </el-table-column>
        <el-table-column label="结束时间" width="100">
          <template v-slot="scope">
            <p>{{ toDateString(scope.row.end_time) }}</p>
          </template>
        </el-table-column>
      </el-table>
      <el-button round type="primary" @click="parkFeedback">反馈</el-button>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "park-manage",
  data() {
    return {
      parkWithoutAppointDialog: false,
      reParkDialog: false,
      user: {},
      reParkForm: {
        begin_time: "07:00",
        end_time: "08:00",
        car: "",
      },
      tableData: [],
      handleSelectionList: []
    }
  },
  methods: {
    toDateString(date) {
      return date.toTimeString().substring(0, 8);
    },
    handleSelectionChange(value) {
      this.handleSelectionList = value
    },

    selectChange(selection, row) {
      if (selection.length > 1) {
        const del_row = selection.shift()
        this.$refs.multipleTable.toggleRowSelection(del_row, false)
      }
    },
    // 点击行触发，选中或不选中复选框
    handleRowClick(row, column, event) {
      this.$refs.multipleTable.toggleRowSelection(row)
      this.selectChange(this.handleSelectionList)
    },
    parkFeedback() {
      this.$showLoading("正在处理")
      const reservation_ID = this.handleSelectionList[0].reservation_ID;
      axios.post('/api/user/park/repark', {
        reservation_ID: reservation_ID
      }).then(res => {
        this.$finishLoading()
        this.$message.success("反馈成功,已经为你重新分配了" + res.data.parking_number + "号车位")
        this.reParkDialog = false;
      }).catch(error => {
        this.$finishLoading()
        this.$message.error("反馈失败")
        this.reParkDialog = false;
      })
    },
    parkWithoutAppoint() {
      if (this.reParkForm.begin_time == '' || this.reParkForm.end_time == '' || this.reParkForm.car == '') {
        this.$message.error("请输入内容")
        return
      }
      this.$showLoading("正在处理");
      var myDate = new Date();
      var month = myDate.getFullYear().toString() + "-" + ((myDate.getMonth() + 1) < 10 ? '0' + (myDate.getMonth() + 1).toString() : (myDate.getMonth() + 1).toString()) + "-";
      var appointDate = myDate.getDate() < 10 ? '0' + myDate.getDate().toString() : myDate.getDate().toString()
      var date = appointDate + "T";
      axios.post("/api/user/park/parkWithoutAppoint", {
        car_number: this.reParkForm.car,
        begin_time: month + date + this.reParkForm.begin_time + "+08:00",
        end_time: month + date + this.reParkForm.end_time + "+08:00",
      }).then((res) => {
        this.$finishLoading();
        this.parkWithoutAppointDialog = false
        this.$message.success("处理成功,已经为你分配了" + res.data.parking_number + "号车位")
      }).catch((err) => {
        console.log(err)
        this.$finishLoading();
        this.parkWithoutAppointDialog = false
        this.$message.error("处理失败")
      })

    },
    BeforeRePark() {
      const user = JSON.parse(localStorage.getItem("user"));
      axios
          .post("/api/user/look_reservation", user)
          .then((resp) => {
            this.tableData = resp.data.reservations;
            for (var i = 0; i < this.tableData.length; i++) {
              this.tableData[i].begin_time = new Date(this.tableData[i].begin_time);
              this.tableData[i].end_time = new Date(this.tableData[i].end_time);
            }
            this.reParkDialog = true
          })
          .catch((err) => {
            console.log(err);
          });
    }
  },
  created() {
    this.$showLoading("正在拼命加载");
    this.user = JSON.parse(localStorage.getItem("user"));
    axios.post("/api/user/look_cars", {
      user: this.user,
    }).then((res) => {
      this.user.car = res.data;
      this.$finishLoading();
    }).catch(error => {
      this.$finishLoading();
    })
  }
}
</script>

<style scoped>
:deep(.el-button) {
  margin-top: 40px;
  margin-left: 42%;
  /* background-color: #a5d1fd; */

}
</style>