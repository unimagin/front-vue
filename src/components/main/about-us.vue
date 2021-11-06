<template>
  <div class="block">
    <el-carousel height="100%" interval="1000">
      <el-carousel-item v-for="item in imageItem" :key="item">
        <img :src="item.photo">
        <el-descriptions
            :column="2"
            :size="size"
            border
        >
          <el-descriptions-item>
            <template #label>
              <el-icon size="10px">
                <user/>
              </el-icon>
              姓名
            </template>
            {{ item.name }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <el-icon>
                <iphone/>
              </el-icon>
              学号
            </template>
            18100000000
          </el-descriptions-item>
        </el-descriptions>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import {User, Iphone} from "@element-plus/icons"

export default {
  name: "about-us",
  components: [
    User,
    Iphone,
  ],
  data() {
    return {
      imageItem: [{
        photo: "https://imgo.shouji.com.cn/simg/20200414/2020041426152232.jpg",
        name: "黎明杰",
      },
        {
          photo: "https://tse2-mm.cn.bing.net/th/id/OIP-C.Jem8qOKMpmI7QJ16lII51AHaGy?w=173&h=180&c=7&r=0&o=5&pid=1.7",
          name: "于璐璐",
        },
        {
          photo: "https://tse3-mm.cn.bing.net/th/id/OIP-C.h76NhtxEqHWqs6V1unfT_AAAAA?w=175&h=180&c=7&r=0&o=5&pid=1.7",
          name: "杨有义",
        },
        {
          photo: "https://tse1-mm.cn.bing.net/th/id/OIP-C.jcrJOGSETECoByGVHrhYZAAAAA?w=182&h=180&c=7&r=0&o=5&pid=1.7",
          name: "文雨晨",
        },
        {
          photo: "https://img.xiayx.com/upload/news/20200416/202004160934476784.jpg",
          name: "崔涵旭",
        },
      ]
    }
  }
}
</script>

<style scoped>
.block {
  margin: auto;
  width: 80%;
  height: 500px;
  text-align: center;
  justify-items: center;
  margin-top: 30px;
}

.el-carousel {
  width: 100%;
  height: 100%;

}

img {
  width: 60%;
  height: 80%;
  margin-bottom: 20px;
}
</style>