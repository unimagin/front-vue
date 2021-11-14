<template>
<el-card class="box-card">
  <div slot="header" class="clearfix">
    <h2>常规收费标准</h2>
    <el-button style="float: right; padding: 3px 0" type="text">do something</el-button>
  </div>
  <div  class="text item">
    {{'正常情况下停车费用为:xx元/小时 '  }}
  </div>
</el-card>
<el-card class="box-card">
  <div slot="header" class="clearfix">
    <h2>违约收费标准</h2>
    <el-button style="float: right; padding: 3px 0" type="text">do something</el-button>
  </div>
  <div  class="text item">
    {{'超出预约时限收取：xx元/小时 '  }}
  </div>
</el-card>

</template>

<script>
export default {
  name: "rates"
}
</script>

<style scoped>


  .text {
    font-size: 15px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }
</style>