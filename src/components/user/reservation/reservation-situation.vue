<template>
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column type="index" />
    <el-table-column label="预约日期" width="160">
      {{ date() }}
    </el-table-column>
    <el-table-column label="状态" width="100">
      <template v-slot="scope">
        <p>{{ scope.row.used ? "正在使用" : "未到达" }}</p>
        <p>{{ scope.row.used ? "到达时间：" : "" }}</p>
        <p>
          {{ scope.row.used ? time(scope.row) : "" }}
        </p>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="300">
      <template v-slot="scope">
        <el-row :gutter="10">
          <el-col :span="5"
            ><el-button
              size="mini"
              @click="editReservation(scope.$index, scope.row)"
              >编辑
            </el-button>
          </el-col>
          <el-col :span="6"
            ><el-button size="mini" @click="changeUsed(scope.$index, scope.row)"
              >已到达
            </el-button>
          </el-col>
          <el-col :span="6"
            ><el-button
              :disabled="isFinished"
              size="mini"
              @click="finishReservation(scope.$index, scope.row)"
              >已完成
            </el-button></el-col
          >
          <el-col :span="7"
            ><el-button
              size="mini"
              type="danger"
              @click="cancelReservation(scope.$index, scope.row)"
              >取消预约
            </el-button></el-col
          >
        </el-row>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog v-model="centerDialogVisible" title="预约" width="30%" center>
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="车位">
        <el-input v-model="form.parking_number" readonly></el-input>
      </el-form-item>
      <el-form-item label="车牌号">
        <el-select v-model="form.car_number" :disabled="form.saved">
          <template v-for="item in owner_cars">
            <el-option
              :label="item.car_number"
              :value="item.car_number"
            ></el-option>
          </template>
        </el-select>
      </el-form-item>
      <el-form-item label="开始时间" style="width: 200px">
        <el-input v-model="form.begin_time" readonly></el-input>
      </el-form-item>
      <el-form-item label="结束时间" style="width: 200px">
        <el-input v-model="form.end_time" readonly></el-input>
      </el-form-item>
      <template v-if="form.saved">
        <el-form-item>
          <el-button type="primary" @click="form.saved = false">修改</el-button>
        </el-form-item>
      </template>
      <template v-else>
        <el-form-item>
          <el-button type="primary" @click="saveReservation">保存</el-button>
        </el-form-item>
      </template>
    </el-form>
  </el-dialog>
</template>

<script lang="ts">
import axios from "axios";
import { ElMessageBox, ElMessage } from "element-plus";
export default {
  data() {
    return {
      tableData: [],
      owner_cars: [],
      form: {},
      form_index: -1,
      centerDialogVisible: false,
    };
  },
  methods: {
    date() {
      return new Date().toLocaleDateString();
    },
    time(row) {
      if (row.arrive_time != null)
        return new Date(row.arrive_time).toString().split(" ")[4];
      return "";
    },
    editReservation(index, row) {
      if (row.used == 0) {
        this.centerDialogVisible = true;
        this.form_index = index;
        console.log(this.tableData[index]);
        this.form = JSON.parse(JSON.stringify(this.tableData[index]));
        const begin = new Date(this.form.begin_time).toString().split(" ")[4];
        const end = new Date(this.form.end_time).toString().split(" ")[4];
        this.form.begin_time = begin.substring(0, begin.lastIndexOf(":"));
        this.form.end_time = end.substring(0, end.lastIndexOf(":"));
        this.form.saved = true;
      }
    },
    saveReservation() {
      this.form.saved = true;
      axios
        .post("/api/user/reservation/modify_reservation", {
          reservation_ID: this.form.reservation_ID,
          car_number: this.form.car_number,
        })
        .then((resp) => {
          console.log(resp);
          this.tableData[this.form_index].car_number = this.form.car_number;
          ElMessage({
            type: "success",
            message: "成功修改预约的车辆",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    cancelReservation(index, row) {
      if (row.used == 0) {
        ElMessageBox({
          title: "Warning!",
          message: "确认取消预约？",
          showCancelButton: true,
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          beforeClose: (action, instance, done) => {
            if (action === "confirm") {
              setTimeout(() => {
                axios
                  .post("/api/user/cancel_reservation", row)
                  .then((resp) => {
                    console.log(resp);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }, 800);
              this.tableData.splice(
                index,
                Object.keys(this.tableData[index]).length
              );
            }
            done();
          },
        }).then((action) => {
          ElMessage({
            type: "success",
            message: "取消预约成功",
          });
        });
      } else {
        ElMessageBox.alert("您正在使用不可取消！", "Warning！", {
          confirmButtonText: "OK",
        });
      }
    },
    changeUsed(index, row) {
      if (row.used == 0) {
        this.tableData[index].used = 1;
        const now = new Date();
        this.tableData[index].arrive_time = now;
        axios
          .post("/api/user/reservation/change_used", {
            reservation_ID: row.reservation_ID,
            arrive_time: now,
          })
          .then((resp) => {
            console.log(resp);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    finishReservation(index, row) {
      if (row.used == 1) {
        console.log(typeof row.begin_time);
        axios
          .post("/api/user/bill/generate_bill", row)
          .then((resp) => {
            console.log(resp);
            ElMessage({
              message: "预约已完成！",
              type: "success",
            });
          })
          .catch((err) => {
            console.log(err);
          });
        this.tableData.splice(index, Object.keys(this.tableData[index]).length);
      } else {
        ElMessageBox.alert("您仍未到达不可确认完成预约！", "Warning！", {
          confirmButtonText: "OK",
        });
      }
    },
    onSubmit() {
      console.log("submit!");
    },
  },
  created() {
    const user = JSON.parse(localStorage.getItem("user"));
    axios
      .post("/api/user/look_reservation", user)
      .then((resp) => {
        this.tableData = resp.data.reservations;
        for (var i = 0; i < this.tableData.length; i++) {
          this.tableData[i].begin_time = new Date(this.tableData[i].begin_time);
          this.tableData[i].end_time = new Date(this.tableData[i].end_time);
        }
        console.log(this.tableData);
        console.log(localStorage);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .post("/api/user/look_cars", user)
      .then((resp) => {
        this.owner_cars = resp.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>