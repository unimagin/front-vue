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
            start="07:00"
            step="00:15"
            end="22:30"
        >
        </el-time-select>
      </el-col>
      <el-col :span="2"> 结束时间</el-col>
      <el-col :span="5">
        <el-time-select
            v-model="end_time"
            :min-time="begin_time"
            placeholder="End time"
            start="07:00"
            step="00:15"
            end="22:30"
        >
        </el-time-select>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" round @click="search">查询</el-button>
      </el-col>
    </el-row>
    <el-row style="margin-left: 50px">
      <template v-if="finished">
        <template v-for="row in rows">
          <div class="row" direction="vertical">
            <template v-for="col in cols">
              <div class="col" direction="horizontal">
                <el-popover
                    placement="top-start"
                    :width="200"
                    trigger="hover"
                >
                  <p>是否预约此位置</p>
                  <div style="text-align: right; margin: 0">
                    <el-button size="mini" type="text">取消</el-button>
                    <el-button type="primary" size="mini"
                               @click="goConfirm(parks[(row - 1) * cols + col].parking_number)"
                    >确定
                    </el-button>
                  </div>
                  <template
                      #reference>
                    <el-button :type="parks[(row - 1) * cols + col].status" class="choose_button">
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

    <el-dialog v-model="centerDialogVisible" title="预约" width="30%" center>
      <el-form ref="form" label-width="120px">
        <el-form-item label="车位">
          <el-input v-model="choose_park_number" readonly></el-input>
        </el-form-item>
        <el-form-item label="车辆选择">
          <el-select v-model="car" aria-valuenow="京B8888" placeholder="please select your zone">
            <el-option label="京B8888" value="京B8888"></el-option>
            <el-option label="上A1111" value="上A1111"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="预约时间">
          <el-time-select
              v-model="begin_time"
              placeholder="Start time"
              disabled
              start="07:00"
              step="00:15"
              end="22:30"
          >
          </el-time-select>
          <el-time-select
              v-model="end_time"
              :min-time="begin_time"
              placeholder="End time"
              disabled
              start="07:00"
              step="00:15"
              end="22:30"
          >
          </el-time-select>
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="goReservation"
        >确认</el-button
        >
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
      car: "京B88888"
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
    async goReservation() {
      this.centerDialogVisible = false
      const user = JSON.parse(localStorage.getItem("user"));
      this.$showLoading("正在预约");
      console.log(this.car);
      console.log(this.choose_park_number)
      const res = await
          axios.post("/api/user/appoint", {
            user: user,
            car: this.car,
            park_number: this.choose_park_number,
            begin_time: this.begin_time,
            end_time: this.end_time
          })
      this.$finishLoading();
      console.log(res)
      if (res) {
        this.$message.success("预约成功")
      } else {
        this.$message.error("预约失败")
      }
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
    }
  }
}
</script>

<style scoped>
.el-main {
  width: 600px;
  height: 400px;
  margin-top: 40px;
}

.row {
  height: 60px;
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
.el-button--1{
  background-color: #4caf50;
}
.el-button--2{
  background-color: #ffcdd2;
}
.el-button--3{
  background-color: #e53935;
}

.content {
  margin-left: 18%;
  margin-right: 18%;
  margin-top: 80px;
}

.list {
  padding: 0 !important;
  background-color: #ecf5ff;
  text-align: center;
  font-size: medium !important;
}

</style>