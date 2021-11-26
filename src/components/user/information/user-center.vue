<template>
  <div>
    <span>金额：0元</span>
    <el-button>充值</el-button>

    已有卡组：
    <el-collapse>
      <el-collapse-item title="已有卡组" name="1">
        <el-card shadow="hover">
          <el-result
              icon="success"
              title="会员卡"
          >
          </el-result>
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <span>会员特权</span>
              </div>
            </template>
            <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>
          </el-card>
        </el-card>
      </el-collapse-item>
      <el-collapse-item title="未有卡组" name="2">
        <el-card shadow="hover">
          <el-result
              icon="error"
              title="合同卡"
          >
          </el-result>
        </el-card>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  name: "user-center"
}
</script>

<style scoped>

</style>