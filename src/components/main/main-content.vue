<template>
  <div className="slogan">
    <el-carousel height="600px" interval="3000" >
      <el-carousel-item v-for="item in imageItem" :key="item">
        <img :src="item">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: "main-content",
  data(){
    return{
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

</style>