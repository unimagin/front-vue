<template>
  <div>
    <span>金额：{{ this.balance }}</span>
    <el-button @click="this.top_up = true">充值</el-button>
    <div style="margin-top: 15px;margin-bottom:12px">卡组：</div>
    <el-collapse>
      <el-collapse-item title="已有卡组" name="1">
        <template v-for="i in Card.length" :key="i">
          <template v-if="ownCard[i-1]">
            <el-card shadow="hover">
              <el-result icon="success" :title="Card[i-1].label+'卡'"></el-result>
              <el-card class="box-card">
                <template #header>
                  <div class="card-header">
                    <span>{{ Card[i - 1].label }}特权</span>
                  </div>
                </template>
                <div v-for="item in Card[i-1].text" :key="item" class="text item">
                  {{ item }}
                </div>
              </el-card>
            </el-card>
          </template>
        </template>
      </el-collapse-item>
      <el-collapse-item title="未有卡组" name="2">
        <template v-for="i in Card.length" :key="i">
          <template v-if="!ownCard[i-1]">
            <el-card shadow="hover" @click="buyCard(i)">
              <el-result icon="error" :title="Card[i-1].label+'卡'"></el-result>
              <el-card class="box-card">
                <template #header>
                  <div class="card-header">

                        <!-- <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button> -->

                    <span>{{ Card[i - 1].label }}特权</span>
                  </div>
                </template>
                <div v-for="item in Card[i-1].text" :key="item" class="text item">
                  {{ item }}
                </div>
              </el-card>
            </el-card>
          </template>
        </template>
      </el-collapse-item>
    </el-collapse>
    <el-dialog v-model="top_up" title="充值" width="30%" center>
      <el-row>
        <el-col :span="8"><span style="line-height: 40px">请输入充值金额: </span></el-col>
        <el-col :span="8">
          <el-input v-model="this.money" style="width: 100px"></el-input>
        </el-col>
        <el-col :span="8">
          <el-button type="mini" @click="addBalance">确认</el-button>
        </el-col>
      </el-row>
    </el-dialog>
    <el-dialog v-model="buyVIP" title="成为会员"  width="30%" center > 

      <el-form :model="form">
    <el-form-item label="开通期限">
      <el-input v-model="form.time" autocomplete="off"></el-input>
      个月
    </el-form-item>
    <el-form-item label="银行卡号" >
      <el-input v-model="form.number" autocomplete="off"></el-input>
    </el-form-item>
      <el-form-item label="总金额为" >
      <el-input v-model="form.money" autocomplete="off"></el-input>
      元
    </el-form-item>
     <el-button type="primary" round>确认开通</el-button>

  </el-form>
<!-- 
      1. 时间多少天
      2。 银行卡 ： 只读
      3。 总金额：
      确定 -->
    </el-dialog>
    <el-dialog v-model="buyContract" title="成为合同用户" width="30%" center>

          <el-form :model="form">
    <el-form-item label="开通期限" >
      <el-input v-model="form.time" autocomplete="off"></el-input>
      个月
    </el-form-item>
    <el-form-item label="银行卡号" >
      <el-input v-model="form.number" autocomplete="off"></el-input>
    </el-form-item>
      <el-form-item label="预约车位">
 <el-select v-model="form.parking_number" placeholder="请选择预约的车位">
        <el-option label="" value=""></el-option>
        <el-option label="" value=""></el-option>
      </el-select>
      
     </el-form-item>
     <el-form-item label="预约时间">
 <el-select v-model="form.data1" placeholder="请选择预约起始时间">
        <el-option label="" value=""></el-option>
        <el-option label="" value=""></el-option>
      </el-select>
      <el-select v-model="form.data2" placeholder="请选择预约结束时间">
        <el-option label="" value=""></el-option>
        <el-option label="" value=""></el-option>
      </el-select>
     </el-form-item>
     <el-form-item label="预约车辆">
 <el-select v-model="form.car" placeholder="请选择预约的车辆">
        <el-option label="" value=""></el-option>
        <el-option label="" value=""></el-option>
      </el-select>
      
     </el-form-item>
     <el-form-item label="总金额为" >
      <el-input v-model="form.money" autocomplete="off"></el-input>
      元
    </el-form-item>
     <el-button type="primary" round>确认开通</el-button>

  </el-form>

      <!-- 1. 时间：多少天
      2。 银行卡 ： 只读
      3。 选择每次预约的车位：
      4。 选择每次预约的初始时间
      5。 选择每次预约的结束时间
      6。 选择每次预约的车辆
      7。 总金额：
      确定 -->
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "user-center",
  data() {
    return {
      balance: 0,
      top_up: false,
      money: 0,
      Card: [
        {
          label: "会员",
          text: [
            "优先处理会员的预约",
            "价格更加优惠",
          ]
        },
        {
          label: "合同",
          text: [
            "每天定时为您自动预约",
            "价格更加优惠",
          ],
        }
      ],
      ownCard: [false, false],
      user: {},
      buyVIP: false,
      buyContract: false,

        dialogFormVisible: false,
        form: {
          time: '',
          number: '',
          money: '',
          data1:'',
          data2:'',
          car:'',
          parking_number:'',
          

         
        },
    }
  },
  methods: {
    addBalance() {
      this.top_up = false
      axios.post('/api/user/add_balance', {money: this.money})
          .then((resp) => {
            const user = JSON.parse(localStorage.getItem("user"));
            this.balance = resp.data.balance
            user.balance = this.balance
            localStorage.setItem('user', JSON.stringify(user))
            this.$store.commit('selfEdit', JSON.stringify(user))
          })
          .catch(err => {
            console.log(err)
          })
    },
    buyCard(cardIndex) {
      console.log(cardIndex)
      if (cardIndex == 1) {
        this.getVIP();
      } else {
        this.getContract();
      }
    },
    getVIP() {
      this.buyVIP = true;
    },
    getContract() {
      this.buyContract = true;
    }
  },
  created() {
    const user = JSON.parse(localStorage.getItem("user"));
    this.balance = user.balance
    this.user = user;
  }
}
</script>

<style scoped>
.el-button {
  margin-left: 50px;
  margin-top: 5px;
}
.el-card{
  display: flex;
  float: left;
}
.el-input
{
  width:70%;
}
:deep(.el-form-item__label){
  padding-left:50px;
  padding-top: 0px;
  
}
.el-button.is-round{
 margin-left:35%;
 margin-top: 20px;
 background-color:#a5d1fd;
 border-color:#a5d1fd;
}
</style>