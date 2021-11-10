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
    <el-table-column type="index"/>
    <el-table-column label="车牌号" prop="car_number"/>
    <el-table-column label="备注" prop="remark"/>
    <el-table-column align="right">
      <template #header>
        <el-input v-model="search" size="mini" placeholder="Type to search"/>
      </template>
      <template #default="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
        >Edit
        </el-button
        >
        <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
        >Delete
        </el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <el-button type="primary" @click=" centerDialogVisible=true ">添加</el-button>
  <el-dialog v-model="centerDialogVisible" title="预约" width="30%" center>
    <el-form ref="form" label-width="120px">
      <el-form-item label="车牌号">
        <el-input v-model="addedCar.car_number"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="addedCar.remark"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addCar"
        >确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import axios from "axios";

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
      isFinish: false,
      addedCar: {
        car_number: "",
        remark: "爸爸的车"
      },
      centerDialogVisible: false
    }
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    async addCar() {
      if (this.addedCar.car_number == "") {
        this.$message.error("请输入车牌号");
      } else {
        this.centerDialogVisible = false;
        this.$showLoading("正在添加");
        const user = this.$store.state.user;
        const res = await axios.post("/api/user/addCar", {
          car_number: this.addedCar.car_number,
          remark: this.addedCar.remark,
          user: user
        })
        console.log(res);
      }
    }
  },
  created() {
    /* this.$showLoading("正在拼命加载");
     const user = JSON.parse(this.$store.state.user);
     axios.post("/api/user/look_cars", {
       user: user,
     }).then(() => {
           this.isFinish = true;
           this.$finishLoading()l
         }
     )*/
  }
}
</script>