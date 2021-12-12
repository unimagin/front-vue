<template>
  <div>
    <el-container direction="vertical">
      <template v-for="(item,index) in noticeList">
        <div class="each-item" @click="haveRead(index)">
          <span>{{ item.content }}</span>
          <template v-if="!item.isRead">
            <div class="dot"/>
          </template>
        </div>
      </template>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "notice",
  data() {
    return {
      noticeList: [
        {
          content: '这是一个系统通知',
          isRead: false
        },
        {
          content: '这是第二个系统通知',
          isRead: false
        }
      ]
    }
  },
  methods: {
    haveRead(index) {
      this.noticeList[index].isRead = true
    }
  }
}
</script>

<style scoped>
.each-item {
  width: 100%;
  height: 50px;
  background-color: rgba(121, 186, 253, 0.5);
  border-style: solid;
  border-width: 2px;
  border-color: rgba(68, 68, 68, 0.1);
  margin-top: 20px;
}
.each-item:hover{
  cursor: pointer;
  background-color: rgba(173, 226, 175, 0.3);
}

.each-item > span {
  font-size: large;
  display: inline-block;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}

.dot {
  width: 8px;
  height: 8px;
  display: inline-block;
  border-radius: 50%;
  background-color: red;
}

</style>