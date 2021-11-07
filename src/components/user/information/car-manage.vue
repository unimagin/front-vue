<template>
  <el-table
      :data="
      tableData.filter(
        (data) =>
          !search || data.car_number.toLowerCase().includes(search.toLowerCase())
      )
    "
      style="width: 100%"
  >
    <el-table-column type="index" />
    <el-table-column label="车牌号" prop="car_number" />
    <el-table-column label="备注" prop="remark" />
    <el-table-column align="right">
      <template #header>
        <el-input v-model="search" size="mini" placeholder="Type to search" />
      </template>
      <template #default="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
        >Edit</el-button
        >
        <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
        >Delete</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
export default {
  data() {
    return {
      tableData: [
        {
          car_number: 'Tom',
          remark: 'No. 189, Grove St, Los Angeles',
        },
        {
          car_number: 'John',
          remark: 'No. 189, Grove St, Los Angeles',
        },
        {
          car_number: 'Morgan',
          remark: 'No. 189, Grove St, Los Angeles',
        },
        {
          car_number: 'Jessy',
          remark: 'No. 189, Grove St, Los Angeles',
        },
      ],
      search: '',
    }
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
  },
}
</script>