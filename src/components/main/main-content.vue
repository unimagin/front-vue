<template>
  <div className="slogan">
    <el-carousel height="600px" interval="3000" >
      <el-carousel-item v-for="item in imageItem" :key="item">
        <img :src="item">
      </el-carousel-item>
    </el-carousel>
    <el-footer>
      <!-- <h3 style="color:white ;text-align:left;">版权所有@</h3> -->
       <el-table
        :data="tableData"
      style="width: 100%">
      <el-table-column
        prop='text'

        label="帮助文档"
        
        width="200px">
      </el-table-column>
      <el-table-column
        
        label="联系我们"
        width="200px">
      </el-table-column>
       </el-table>
    </el-footer>
  </div>
</template>

<script>
export default {
  name: "main-content",
  data(){
    return{
          tableData: [{
            text:'版权所有：NKU_CS'
          }],
      imageItem:[
        "http://www.etcp.cn/static/images/index_img2.png",
        "http://www.ast86.com/upfile/201903/2019032641517917.jpg",
        "http://www.ast86.com/upfile/201903/2019032562740893.jpg",
        "http://www.ast86.com/upfile/201903/2019032842311813.jpg"
      ]
    }
  }
}
</script>

<style scoped>
.slogan {
  width: 100%;
  /* height: 100%; */
  background: white;
  text-align: center;
  position: absolute;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 20px;
  /* height: auto; */
  margin-top: 20px;
  margin-bottom: 0px;
}
img{
  width:100%;
  height:100%;
  max-width:100%;
  max-height:100%;
  position:relative;
}
.el-footer{
  background-color: #444;
  height:110px;
}
element.style{
  width: 400px;
}
.el-table{
  background-color: #444;
  --el-table-border-color:#444;
}
:deep(.el-table .cell){
  padding-left: 25px;
    color: rgb(250, 242, 242);
  font-size: 17px;
  font-weight: bold;

}
:deep(.el-table th.el-table__cell){
  --el-table-header-background-color:#444;
  --el-table-tr-background-color:#444;
  color: rgb(250, 242, 242);
  font-size: 17px;
}
:deep(.el-table tr){
  background-color: #444;

}

.h2{
  color: aliceblue;
  padding-top: 20px;
}
</style>