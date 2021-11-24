<template>
  <div class="main-content">
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
          >修改
          </el-button>
          <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
          >删除
          </el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-button class="insert" type="primary" @click=" centerDialogVisible=true ">添加车辆</el-button>
    <el-dialog v-model="centerDialogVisible" title="添加" width="30%" center>
      <el-form ref="form" label-width="120px">
        <el-form-item label="车牌号">
          <el-input v-model="updatedCar.car_number" :readonly="isUpdate"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="updatedCar.remark"></el-input>
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
    <el-dialog v-model="isUpdate" title="修改" width="30%" center>
      <el-form ref="form" label-width="120px">
        <el-form-item label="车牌号">
          <el-input v-model="updatedCar.car_number" readonly></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="updatedCar.remark"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="updateCar"
        >确认</el-button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import axios from "axios";

export default {
  data() {
    return {
      tableData: [],
      search: '',
      updatedCar: {
        car_number: "",
        remark: "爸爸的车"
      },
      isUpdate: false,
      centerDialogVisible: false
    }
  },
  methods: {
    handleEdit(index, row) {
      this.updatedCar = row;
      this.isUpdate = true;
    },
    async handleDelete(index, row) {
      this.$showLoading("正在删除车辆");
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await axios.post("/api/user/del_cars", {
        car_number: row.car_number,
        user: user
      }).catch(() => {
        this.$finishLoading();
        this.$message.error("删除失败");
        return
      });
      this.$finishLoading();
      this.tableData = res ? res.data : this.tableData;
      this.$message.success("删除成功");
    },
    async addCar() {
      if (this.updatedCar.car_number == "") {
        this.$message.error("请输入车牌号");
      } else {
        this.centerDialogVisible = false;
        this.$showLoading("正在添加");
        const user = JSON.parse(localStorage.getItem("user"));
        const res = await axios.post("/api/user/add_car", {
          car_number: this.updatedCar.car_number,
          remark: this.updatedCar.remark,
          user: user
        }).catch(() => {
          this.$finishLoading();
          this.$message.error("添加失败");
          return
        })
        this.$finishLoading();
        if (res) {
          this.tableData.push({
            car_number: this.updatedCar.car_number,
            remark: this.updatedCar.remark,
          })
          this.$message.success("添加成功");
        }
      }
    },
    async updateCar() {
      this.isUpdate = false;
      this.$showLoading("正在修改");
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await axios.post("/api/user/update_car", {
        car_number: this.updatedCar.car_number,
        remark: this.updatedCar.remark,
        user: user
      })
      this.$finishLoading();
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i] == res.data.car_number) {
          this.tableData[i].remark = res.data.remark
          break;
        }
      }
      this.$message.success("修改成功");
    }
  },
  created() {
    this.$showLoading("正在拼命加载");
    const user = JSON.parse(localStorage.getItem("user"));
    axios.post("/api/user/look_cars", {
      user: user,
    }).then((res) => {
          this.tableData = res.data;
          this.$finishLoading();
        }
    ).catch(() => {
      this.$finishLoading();
    })
  }
}
</script>
<style scoped>

:deep(.el-button--primar) {
  --el-button-background-color: #ecf5ff;
}

.main-content {
  width: 600px;
}

.insert {
  background: #ecf5ff;
  border-color: #ecf5ff;
  color: black;
  margin-top: 30px;
}

</style>