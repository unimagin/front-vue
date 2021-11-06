<template>
  <div>
    <el-container class="content">
      <el-aside
          width="200px"
          style="background-color: #ecf5ff; margin-right: 120px"
      >
        <el-menu router="true">
          <el-menu-item class="list" index="1" route="/user/reservation"
          >车辆情况
          </el-menu-item
          >
          <el-menu-item class="list" index="2">预约情况</el-menu-item>
        </el-menu>
      </el-aside>
      <el-main style="height: 100%">
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
                        <el-button type="primary" size="mini" @click="goReservation"
                        >确定
                        </el-button>
                      </div>
                      <template
                          v-if="parks[(row - 1) * cols + col].status == 1"
                          #reference
                      >
                        <el-button plain type="ok">{{ parks[(row - 1) * cols + col].parking_number }}</el-button>
                      </template>
                      <template
                          v-else-if="parks[(row - 1) * cols + col].status == 2"
                          #reference
                      >
                        <el-button plain type="half-busy" disable
                        >{{ parks[(row - 1) * cols + col].parking_number }}
                        </el-button
                        >
                      </template>
                      <template v-else #reference>
                        <el-button plain type="busy" disable>{{
                            parks[(row - 1) * cols + col].parking_number
                          }}
                        </el-button>
                      </template>
                    </el-popover>
                  </div>
                </template>
              </div>
            </template>
          </template>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>

import axios from "axios";

export default {
  name: "reservation",
  created() {
    console.log("hhhhhh");
    this.$showLoading("正在拼命加载");
    this.axios_search();
  },
  data() {
    return {
      reserve: false,
      rows: 5,
      cols: 5,
      status_content: {
        "1": "可以预约",
        "2": "部分占满",
        "3": "已占满"
      },
      floor_level: 1,
      begin_time: "07:00",
      end_time: "07:15",
      parks: [],
      finished: false,
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
    goReservation() {
      this.$message.success("预约成功")
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

.el-button--ok {
  background-color: #0dda10;
}

.el-button--half-busy {
  background-color: #eacc09;
}

.el-button--busy {
  background-color: #ea2309;
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

.el-menu {
  --el-menu-hover-background-color: #c6e2ff !important;
}
</style>