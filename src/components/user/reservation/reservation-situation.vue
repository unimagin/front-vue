<template>
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column type="index" />
    <el-table-column label="预约日期" width="180">
      <template v-slot="scope">
        {{ date(scope.row) }}
      </template>
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
            ><el-button size="mini" @click="centerDialogVisible = true"
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
        <el-input v-model="form.park" readonly></el-input>
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
      <el-form-item label="是否付费">
        <el-switch
          v-model="form.isPaid"
          active-color="#13ce66"
          inactive-color="#ff4949"
          disabled
        ></el-switch>
      </el-form-item>
      <template v-if="form.saved">
        <el-form-item>
          <el-button type="primary" @click="form.saved = false">修改</el-button>
        </el-form-item>
      </template>
      <template v-else>
        <el-form-item>
          <el-button type="primary" @click="form.saved = true">保存</el-button>
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
      form: {
        reservation_ID: "4",
        park: "111",
        car_number: "京A 8888",
        begin_time: "07:30",
        end_time: "08:00",
        arrive_time: "",
        saved: true,
        used: 0,
      },
      centerDialogVisible: false,
    };
  },
  methods: {
    date(row) {
      return row.begin_time.split("T")[0];
    },
    time(row) {
      if (row.arrive_time != null)
        return new Date(row.arrive_time).toString().split(" ")[4];
      return "";
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
        console.log(this.tableData);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>