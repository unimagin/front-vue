<template>
  <div>
    <span>金额：{{ this.balance }}</span>
    <el-button @click="this.top_up = true">充值</el-button>
    <div style="margin-top: 15px;margin-bottom:12px;margin-left:30px">卡组：</div>
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
    <el-dialog v-model="buyVIP" title="成为会员" width="30%" center>
      <el-form :model="vipForm">
        <el-form-item label="开通期限">
          <el-input v-model="vipForm.time" autocomplete="off" type="number"></el-input>
          个月
        </el-form-item>
        <el-form-item label="银行卡号">
          <el-input autocomplete="off" v-model="user.bank_number" readonly></el-input>
        </el-form-item>
        <el-form-item label="总金额为">
          <el-input v-model="ComputedViPMoney" autocomplete="off" readonly></el-input>
          元
        </el-form-item>
        <el-button type="primary" round @click="getVIP">确认开通</el-button>
      </el-form>
    </el-dialog>
    <el-dialog v-model="buyContract" title="成为合同用户" width="30%" center>
      <el-form :model="ContractForm">
        <el-form-item label="开通期限">
          <el-input v-model="ContractForm.time" autocomplete="off" type="number"></el-input>
          个月
        </el-form-item>
        <el-form-item label="银行卡号">
          <el-input readonly autocomplete="off" v-model="user.bank_number"></el-input>
        </el-form-item>
        <el-form-item label="预约车位">
          <el-input placeholder="请输入预约的车位" v-model="ContractForm.parking_number" autocomplete="off" type="number">
          </el-input>
        </el-form-item>
        <el-form-item label="预约时间">
          <el-time-select
              v-model="ContractForm.begin_time"
              placeholder="Start time"
              start="00:00"
              step="00:15"
              end="24:00"
          >
          </el-time-select>
          <el-time-select
              v-model="ContractForm.end_time"
              :min-time="ContractForm.begin_time"
              placeholder="End time"
              start="00:00"
              step="00:15"
              end="24:00"
          />
        </el-form-item>
        <el-form-item label="预约车辆">
          <el-select v-model="ContractForm.car" placeholder="请选择预约的车辆">
            <template v-for="item in user.car">
              <el-option
                  :label="item.car_number"
                  :value="item.car_number"
              ></el-option>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="总金额为">
          <el-input v-model="ComputedContractMoney" autocomplete="off" readonly></el-input>
          元
        </el-form-item>
        <el-button type="primary" round>确认开通</el-button>
      </el-form>
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
      vipMoney: 110,
      ContractMoney: 120,
      vipForm: {
        time: 0,
        money: 0,
      },
      ContractForm: {
        time: 0,
        money: 0,
        begin_time: '07:00',
        end_time: '07:15',
        car: '',
        parking_number: '',
      },
    }
  },
  computed: {
    ComputedViPMoney() {
      this.vipForm.money = this.vipForm.time * this.vipMoney;
      return this.vipForm.money

    },
    ComputedContractMoney() {
      this.ContractForm.money = this.ContractForm.time * this.ContractMoney;
      return this.ContractForm.money
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
        this.buyVIP = true;
      } else {
        this.buyContract = true;
      }
    },
    getVIP() {
      this.buyVIP = false;
      this.$showLoading("正在处理")
      axios.post('/api/user/buy_VIP', {
        time: this.vipForm.time,
        money: this.vipForm.money
      }).then(res => {
        this.user.kind = res.data.kind;
        this.user.balance = res.data.balance
        localStorage.setItem('user', JSON.stringify(this.user))
        this.$finishLoading()
        location.reload();
        this.$message.success("处理成功")
      }).catch(error => {
        this.$finishLoading()
        this.$message.error("余额不足")
      })
    },
    getContract() {

    },
  },
  created() {
    const user = JSON.parse(localStorage.getItem("user"));
    this.balance = user.balance
    this.user = user;
    if (user.kind == 1) {
      this.ownCard[0] = true;
    }
    if (user.kind == 2) {
      this.ownCard[1] = true;
    }
    axios.post("/api/user/look_cars", {
      user: user,
    }).then((res) => {
      this.user.car = res.data;
    })
  }
}
</script>

<style scoped>
.el-button {
  margin-left: 50px;
  margin-top: 5px;
}

.el-card {
  display: flex;
  float: left;
}

.el-input {
  width: 70%;
}

:deep(.el-form-item__label) {
  padding-left: 50px;
  padding-top: 0px;

}

.el-button.is-round {
  margin-left: 35%;
  margin-top: 20px;
  background-color: #a5d1fd;
  border-color: #a5d1fd;
}

.el-collapse {
  width: 600px;
}
</style>