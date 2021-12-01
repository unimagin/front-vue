<template>
  <div style="width: 100%;">
    <el-table :data="tableData" stripe>
      <el-table-column type="index"/>
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
      <el-table-column label="车位" width="100">
        <template v-slot="scope">
          <p>{{ scope.row.parking_number }}</p>
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
      <el-table-column label="操作" width="300">
        <template v-slot="scope">
          <el-row :gutter="10">
            <el-col :span="5"
            >
              <el-button
                  size="mini"
                  @click="editReservation(scope.$index, scope.row)"
              >编辑
              </el-button>
            </el-col>
            <el-col :span="6"
            >
              <el-button size="mini" @click="changeUsed(scope.$index, scope.row)"
              >已到达
              </el-button>
            </el-col>
            <el-col :span="6"
            >
              <el-button
                  :disabled="isFinished"
                  size="mini"
                  @click="finishReservation(scope.row)"
              >已完成
              </el-button>
            </el-col
            >
            <el-col :span="7"
            >
              <el-button
                  size="mini"
                  type="danger"
                  @click="cancelReservation(scope.row)"
              >取消预约
              </el-button
              >
            </el-col
            >
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="centerDialogVisible" title="预约" width="30%" center>
      <el-form ref="form" label-width="120px">
        <el-form-item label="车牌号">
          <el-select v-model="form.car_number">
            <template v-for="item in owner_cars">
              <el-option
                  :label="item.car_number"
                  :value="item.car_number"
              ></el-option>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveReservation">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import {ElMessageBox, ElMessage} from "element-plus";
import {InfoFilled} from "@element-plus/icons";

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
    toDateString(date) {
      return date.toTimeString().substring(0, 8);
    },
    editReservation(index, row) {
      if (row.used == 0) {
        this.centerDialogVisible = true;
        this.form_index = index;
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
      this.centerDialogVisible = false;
      axios
          .post("/api/user/reservation/modify_reservation", {
            reservation_ID: this.form.reservation_ID,
            car_number: this.form.car_number,
          })
          .then(() => {
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
    cancelReservation(row) {
      if (row.used == 0) {
        ElMessageBox({
          title: "Warning!",
          message: "确认取消预约？",
          showCancelButton: true,
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          beforeClose: (action, instance, done) => {
            if (action === "confirm") {
              axios
                  .post("/api/user/cancel_reservation", row)
                  .then((resp) => {
                    this.tableData = resp.data.reservations;
                    for (var i = 0; i < this.tableData.length; i++) {
                      this.tableData[i].begin_time = new Date(
                          this.tableData[i].begin_time
                      );
                      this.tableData[i].end_time = new Date(
                          this.tableData[i].end_time
                      );
                    }
                    this.$message.success("取消预约成功");
                  })
                  .catch((err) => {
                    console.log(err);
                  });
            }
            done();
          },
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
    finishReservation(row) {
      if (row.used == 1) {
        axios
            .post("/api/user/bill/generate_bill", row)
            .then((resp) => {
              console.log(resp.data.reservations);
              this.tableData = resp.data.reservations;
              for (var i = 0; i < this.tableData.length; i++) {
                this.tableData[i].begin_time = new Date(
                    this.tableData[i].begin_time
                );
                this.tableData[i].end_time = new Date(this.tableData[i].end_time);
              }
              ElMessage({
                message: "预约已完成！",
                type: "success",
              });
            })
            .catch((err) => {
              console.log(err);
            });
      } else {
        ElMessageBox.alert("您仍未到达不可确认完成预约！", "Warning！", {
          confirmButtonText: "OK",
        });
      }
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
          console.log(this.tableData)
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