<template>
  <div id="view-data-echarts" style="width: 801px;height: 534px;margin-top: -50px">
<!--    这是给用户查看预约记录的echarts数据-->
<!--    <br>-->
<!--    1. 违约情况-->
<!--    2. 时间段的预约情况-->
  </div>
</template>

<script>
export default {
  name: "view-data",
  methods:{
    myEcharts(){
      var myChart = this.$echarts.init(document.getElementById('view-data-echarts'));

      let value = 12;
      let order = '良好';
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
            { name: '0-4时', max: 6500 },
            { name: '5-8时', max: 6000 },
            { name: '9-12时', max: 30000 },
            { name: '13-16时', max: 38000 },
            { name: '17-20时', max: 52000 },
            { name: '21-24时', max: 52000 },
          ],
        },

        series: [
          {
            type: 'radar',
            data: [
              {
                value: [4200, 3000, 20000, 35000, 50000, 18000, 18000],
                areaStyle: {
                  color: 'rgba(64, 158, 255, 0.2)',
                },
              },
            ],
          },
        ],
      };

      myChart.setOption(option);
    }
  },
  mounted() {
    this.myEcharts();
  }
}
</script>

<style scoped>

</style>