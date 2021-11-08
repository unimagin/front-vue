<template>
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
      <el-switch v-model="form.isPaid" active-color="#13ce66"
                 inactive-color="#ff4949" disabled></el-switch>
    </el-form-item>
    <template v-if="form.saved">
      <el-form-item>
        <el-button type="primary" @click="form.saved=false">修改</el-button>
        <el-button v-if="!form.isPaid">付费</el-button>
        <el-button v-if="form">取消预约</el-button>
      </el-form-item>
    </template>
    <template v-else>
      <el-form-item>
        <el-button type="primary" @click="form.saved=true ">保存</el-button>
      </el-form-item>
    </template>
  </el-form>
</template>

<script lang="ts">
export default {
  data() {
    return {
      form: {
        park: '111',
        car_number: '京A 8888',
        begin_time: "07:30",
        end_time: "08:00",
        saved: true,
        isPaid: false
      },
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    },
  },
}
</script>