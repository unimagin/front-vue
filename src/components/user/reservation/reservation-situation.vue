<template>
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column type="index" />
    <el-table-column label="预约日期" width="180">
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
          <el-col :span="6"
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
              @click="finishReservation(scope.row)"
              >已完成
            </el-button></el-col
          >
          <el-col :span="6"
            ><el-button
              size="mini"
              type="danger"
              @click="cancelReservation(scope.row)"
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
        <el-input v-model="form.car_number" :readonly="form.saved"></el-input>
      </el-form-item>
      <el-form-item label="Activity time">
        <div class="demo-range">
          <el-time-select
            v-model="form.begin_time"
            placeholder="Start time"
            :disabled="form.saved"
            start="07:00"
            step="00:15"
            end="22:30"
          >
          </el-time-select>
          <el-time-select
            v-model="form.end_time"
            :min-time="form.begin_time"
            placeholder="End time"
            :disabled="form.saved"
            start="07:00"
            step="00:15"
            end="22:30"
          >
          </el-time-select>
        </div>
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
      let prefix = new Date().toLocaleDateString().replace("/", "-");
      prefix = prefix.replace("/", "-");
      const begin = prefix + "T" + this.form.begin_time + ":00";
      const end = prefix + "T" + this.form.end_time + ":00";
      axios
        .post("/api/user/appoint", {
          car_number: this.form.car_number,
          parking_number: this.form.parking_number,
          reservation_ID: this.form.reservation_ID,
          begin_time: begin,
          end_time: end,
        })
        .then((resp) => {
          console.log(resp);
          ElMessage({
            type: "success",
            message: "成功修改预约时间，请刷新页面！",
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
            }
            done();
          },
        }).then((action) => {
          ElMessage({
            type: "success",
            message: "取消预约成功，请刷新页面！",
          });
        });
      } else {
        ElMessageBox.alert("您正在使用不可取消！", "Warning！", {
          confirmButtonText: "OK",
        });
      }
    },
    changeUsed(index, row) {
      const r_state = localStorage.getItem("r_state");
      if (row.used == 0 && parseInt(r_state) == -1) {
        this.tableData[index].used = 1;
        localStorage.setItem("r_state", index + "");
        this.tableData[index].arrive_time = new Date();
        axios
          .post("/api/reservation/change_used", row)
          .then((resp) => {
            console.log(resp);
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (row.used == 0 && parseInt(r_state) != index) {
        ElMessageBox.alert("您正在使用一个停车位！", "Warning！", {
          confirmButtonText: "OK",
        });
      }
    },
    finishReservation(row) {
      if (row.used == 1) {
        axios
          .post("/api/bill/generate_bill", row)
          .then((resp) => {
            console.log(resp);
            ElMessage({
              message: "预约已完成请刷新页面！",
              type: "success",
            });
          })
          .catch((err) => {
            console.log(err);
          });
        localStorage.setItem("r_state", "-1");
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
      .post("./api/user/look_reservation", user)
      .then((resp) => {
        this.tableData = resp.data.reservations;
        for (var i = 0; i < this.tableData.length; i++) {
          this.tableData[i].begin_time = new Date(this.tableData[i].begin_time);
          this.tableData[i].end_time = new Date(this.tableData[i].end_time);
        }
        console.log(this.tableData);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>