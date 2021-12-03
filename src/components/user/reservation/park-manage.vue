<template>
  <div>
    <el-card shadow="hover">
      <div style="padding: 14px">
        <span>车位被占用</span>
        <el-button type="text" class="button" @click="BeforeRePark">点这里</el-button>
      </div>
    </el-card>
    <el-card shadow="hover">
      <div style="padding: 14px">
        <span>未预约停车</span>
        <el-button type="text" class="button" @click=" parkWithoutAppointDialog = true">点这里</el-button>
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
      <el-button type="primary" round>提交</el-button>
    </el-dialog>
    <el-dialog v-model="reParkDialog" title="车位占用反馈" width="45%" center>
      <el-table :data="tableData" stripe
                ref="multipleTable"
                @selection-change="handleSelectionChange"
                @select="selectChange"
                @row-click="handleRowClick"
      >
        <el-table-column type="selection" width="55"/>
        <el-table-column label="预约日期" width="160">
          {{ date() }}
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
      <el-button round type="primary">反馈</el-button>
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
    date() {
      return new Date().toLocaleDateString();
    },
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

</style>