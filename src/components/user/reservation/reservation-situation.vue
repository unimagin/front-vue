<template>
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column type="index" />
    <el-table-column label="预约时间" width="180">
      <p>2020.10.20</p>
    </el-table-column>
    <el-table-column label="状态" prop="isPaid">
      <p>{{ isPaid ? "是" : "否" }}</p>
    </el-table-column>
    <el-table-column label="操作">
      <el-button size="mini" @click="centerDialogVisible = true"
        >编辑
      </el-button>
      <el-button size="mini" type="danger" @click="">取消预约 </el-button>
      <el-button :disabled="isPaid" size="mini" @click="">付费 </el-button>
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
export default {
  data() {
    return {
      tableData: [
        {
          park: "111",
          car_number: "京A 8888",
          begin_time: "07:30",
          end_time: "08:00",
          saved: true,
          isPaid: true,
        },
        {
          park: "111",
          car_number: "京A 8888",
          begin_time: "07:30",
          end_time: "08:00",
          saved: true,
          isPaid: false,
        },
        {
          park: "111",
          car_number: "京A 8888",
          begin_time: "07:30",
          end_time: "08:00",
          saved: true,
          isPaid: true,
        },
      ],
      form: {
        park: "111",
        car_number: "京A 8888",
        begin_time: "07:30",
        end_time: "08:00",
        saved: true,
        isPaid: true,
      },
      centerDialogVisible: false,
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
  },
};
</script>