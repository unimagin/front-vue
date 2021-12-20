<template>
  <div id="view-data-echarts" style="width: 801px;height: 534px;margin-top: -50px">
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "view-data",
  data() {
    return {
      times: [],
      violation: 0,
      total: 0,
    }
  },
  computed: {
    getCredibility() {
      if (this.total == 0) {
        return '优秀'
      }
      const credits = parseFloat(this.violation) / parseFloat(this.total);
      if (credits > 0.5) {
        return "不良"
      } else if (credits > 0.2) {
        return "良好";
      } else {
        return "优秀";
      }
    },
  },
  methods: {
    myEcharts() {
      var myChart = this.$echarts.init(document.getElementById('view-data-echarts'));
      let value = this.violation;
      let order = this.getCredibility;
      var option = {
        title: [
          {
            text: value,
            left: '50%',
            top: '45%',
            subtext: '信誉情况：' + order,
            textAlign: 'center',
            textStyle: {
              fontSize: '50',
              fontWeight: '400',
              color: '#8b8d90',
              textAlign: 'center',
            },
            subtextStyle: {
              fontSize: '20',
            },
          },
          {
            text: '次违约',
            left: '58%',
            top: '47.5%',
            textAlign: 'center',
            textStyle: {
              fontSize: '25',
              fontWeight: '400',
              color: '#8b8d90',
              textAlign: 'center',
            },
          },
        ],
        radar: {
          indicator: [
            {name: '0-4时', max: 20},
            {name: '5-8时', max: 20},
            {name: '9-12时', max: 20},
            {name: '13-16时', max: 20},
            {name: '17-20时', max: 20},
            {name: '21-24时', max: 20},
          ],
        },

        series: [
          {
            type: 'radar',
            data: [
              {
                value: this.times,
                areaStyle: {
                  color: 'rgba(64, 158, 255, 0.2)',
                },
              },
            ],
          },
        ],
      };

      myChart.setOption(option);
    },
  },
  mounted() {
    this.$showLoading("正在拼命加载")
    axios.post('/api/user/viewData').then(res => {
      const data = res.data
      this.times = data.times;
      this.times.push(this.times[0]);
      this.times.shift();
      this.total = data.total;
      this.violation = data.violation;
      this.myEcharts();
      this.$finishLoading()
    }).catch(error => {
      this.$finishLoading()
    });
  },
}
</script>

<style scoped>

</style>
