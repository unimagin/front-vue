<template>
  <div>
    <el-container direction="vertical">
      <template v-for="(item, index) in noticeList">
        <div class="each-item" @click="haveRead(index)">
          <span>{{ item.time }}:{{ item.info }}</span>
          <template v-if="!item.status">
            <div class="dot" />
          </template>
        </div>
      </template>
    </el-container>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "notice",
  data () {
    return {
      noticeList: []
    }
  },
  methods: {
    haveRead (index) {
      this.noticeList[index].status = 1
      axios.post('/api/user/change_msgstatus', { message_ID: this.noticeList[index].message_ID })
        .then(() => {
          var unreadNum = parseInt(localStorage.getItem('unreadNum'))
          unreadNum -= 1
          localStorage.setItem('unreadNum', String(unreadNum))
        })
        .catch(err => { console.log(err) })
    }
  },
  created () {
    axios.post('/api/user/look_message', {})
      .then(resp => {
        this.noticeList = resp.data
      })
      .catch(err => { console.log(err) })
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
.each-item:hover {
  cursor: pointer;
  background-color: rgba(173, 226, 175, 0.3);
}

.each-item > span {
  font-size: large;
  display: inline-block;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

.dot {
  width: 8px;
  height: 8px;
  display: inline-block;
  border-radius: 50%;
  background-color: red;
}
</style>