<template>
  <div>
    <el-row height="100px" :gutter="20" style="margin-bottom: 50px">
      <el-col :span="1"> 楼层</el-col>
      <el-col :span="4">
        <el-select v-model="floor_level" placeholder="选择楼层" :value="1">
          <el-option
              v-for="index of 5"
              :key="index"
              :label="index"
              :value="index"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="2"> 开始时间</el-col>
      <el-col :span="5">
        <el-time-select
            v-model="begin_time"
            placeholder="Start time"
            start="00:00"
            step="00:15"
            end="24:00"
        >
        </el-time-select>
      </el-col>
      <el-col :span="2"> 结束时间</el-col>
      <el-col :span="5">
        <el-time-select
            v-model="end_time"
            :min-time="begin_time"
            placeholder="End time"
            start="00:00"
            step="00:15"
            end="24:00"
        >
        </el-time-select>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" round @click="search">查询</el-button>
      </el-col>
    </el-row>
    <el-row style="margin-left: 60px; margin-top: 80px">
      <template v-if="finished">
        <template v-for="row in rows">
          <div class="row" direction="vertical">
            <template v-for="col in cols">
              <div class="col" direction="horizontal">
                <el-popover placement="top-start" :width="200" trigger="hover">
                  <p>是否预约此位置</p>
                  <div style="text-align: right; margin: 0">
                    <el-button size="mini" type="text">取消</el-button>
                    <el-button
                        type="primary"
                        size="mini"
                        @click="
                        goConfirm(parks[(row - 1) * cols + col].parking_number)
                      "
                    >确定
                    </el-button>
                  </div>
                  <template #reference>
                    <el-button
                        :type="parks[(row - 1) * cols + col].status"
                        class="choose_button"
                    >
                      {{ parks[(row - 1) * cols + col].parking_number }}
                    </el-button>
                  </template>
                </el-popover>
              </div>
            </template>
          </div>
        </template>
      </template>
    </el-row>
    <div class="box" style="display: flex">
      <div class="t1">
        <el-tooltip class="item" effect="dark">
          <el-button>空闲车位</el-button>
        </el-tooltip>
      </div>

      <div class="t2">
        <el-tooltip class="item" effect="dark">
          <el-button>半空闲车位</el-button>
        </el-tooltip>
      </div>

      <div class="t3">
        <el-tooltip class="item" effect="dark">
          <el-button>占用车位</el-button>
        </el-tooltip>
      </div>
    </div>
    <el-dialog v-model="centerDialogVisible" title="预约" width="30%" center>
      <el-form ref="form" label-width="120px">
        <el-form-item label="车位">
          <el-input v-model="choose_park_number" readonly></el-input>
        </el-form-item>
        <el-form-item label="车辆选择">
          <el-select v-model="car" placeholder="请选择你的车辆">
            <template v-for="item in owner_cars">
              <el-option
                  :label="item.car_number"
                  :value="item.car_number"
              ></el-option>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="预约时间">
          <el-time-select
              v-model="begin_time"
              placeholder="Start time"
              disabled
              start="00:00"
              step="00:15"
              end="24:00"
          >
          </el-time-select>
          <el-time-select
              v-model="end_time"
              :min-time="begin_time"
              placeholder="End time"
              disabled
              start="00:00"
              step="00:15"
              end="24:00"
          >
          </el-time-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="goReservation">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>

import axios from "axios";

export default {
  name: "reservation",
  created() {
    this.$showLoading("正在拼命加载");
    this.axios_search();
    const user = JSON.parse(localStorage.getItem("user"));
    axios.post("/api/user/look_cars", {
      user: user,
    }).then((res) => {
      this.owner_cars = res.data;
      this.$finishLoading();
    })
  },
  data() {
    return {
      rows: 5,
      cols: 5,
      floor_level: 1,
      begin_time: "07:00",
      end_time: "07:15",
      parks: [],
      finished: false,
      centerDialogVisible: false,
      choose_park_number: 0,
      car: "",
      owner_cars: []
    }
  },
  methods: {
    search() {
      if (this.begin_time == "" || this.end_time == "") {
        this.$message.error("请输入时间")
      } else {
        this.$showLoading("正在查询")
        this.axios_search();
      }
    },
    goConfirm(park_number) {
      if (this.begin_time == "" || this.end_time == "") {
        this.$message.error("请输入时间")
      } else {
        this.choose_park_number = park_number;
        this.centerDialogVisible = true;
      }
    },
    goReservation() {
      if (this.car == "") {
        this.$message.error("请输入预约车辆")
        return;
      }
      this.centerDialogVisible = false
      const user = JSON.parse(localStorage.getItem("user"));
      if (user.kind == 4) {
        this.$message.error("你是黑名单用户，不能预约车位")
        return;
      }
      this.$showLoading("正在预约");
      var myDate = new Date();
      var month = myDate.getFullYear().toString() + "-" + ((myDate.getMonth() + 1) < 10 ? '0' + (myDate.getMonth() + 1).toString() : (myDate.getMonth() + 1).toString()) + "-";
      var appointDate = (myDate.getDate() + 1) < 10 ? '0' + (myDate.getDate() + 1).toString() : (myDate.getDate() + 1).toString()
      var date = appointDate + "T";
      axios.post("/api/user/appoint", {
        car_number: this.car,
        parking_number: this.choose_park_number,
        begin_time: month + date + this.begin_time + "+08:00",
        end_time: month + date + this.end_time + "+08:00",
        r_date: month + appointDate
      }).then(() => {
        this.$finishLoading();
        this.$message.success("预约成功")
      }).catch(() => {
        this.$finishLoading();
        this.$message.error("预约失败")
      })
    },
    async axios_search() {
      const res = await axios
          .post("/api/user/reservation", {
            floor_level: this.floor_level,
            begin_time: this.begin_time,
            end_time: this.end_time
          });
      this.parks = res.data
      this.$finishLoading();
      this.finished = true;
    },
  },
}
</script>

<style scoped>
.el-main {
  width: 600px;
  height: 400px;
  margin-top: 40px;
}

.row {
  height: 70px;
  width: 100%;
  margin-bottom: 20px;
}

.col {
  float: left;
  height: 50px;
  width: 50px;
  margin-left: 40px;
}

.el-popover {
  width: 100%;
  height: 100%;
}

.choose_button {
  border-radius: 50%;
  padding: 20px 20px;
}

.el-button--1 {
  background-color: #ade2af;
}

.el-button--2 {
  background-color: #8dc8f8;
}

.el-button--3 {
  background-color: #f78c8a;
}

.list {
  padding: 0 !important;
  background-color: #ecf5ff;
  text-align: center;
  font-size: medium !important;
}

.box {
  display: flex;
  margin-top: -400px;
  margin-left: 300px;
  width: 400px;
  float: right;
}

.t1 {
  text-align: center;
  float: left;
  width: 50px;
}

.t2 {
  /* float: left; */
  width: 50px;
  margin-top: 70px;
  margin-left: -50px;
}

.t3 {
  /* clear: both; */
  text-align: center;
  float: left;
  width: 50px;
  margin-top: 140px;
  margin-left: -50px;
}

.item {
  margin: 10px;
}

.left .el-tooltip__popper,
.right .el-tooltip__popper {
  padding: 8px 10px;
}

.t1 .el-button {
  background: #ade2af;
  width: 120px;
  height: 50px;
}

.t2 .el-button {
  background: #8dc8f8;
  width: 120px;
  height: 50px;
}

.t3 .el-button {
  background: #f78c8a;
  width: 120px;
  height: 50px;
}
</style>