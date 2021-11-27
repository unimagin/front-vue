<template>
  <div id="view-data-echarts" style="width: 801px;height: 534px;">
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

      var legendData = ['预约数']; //图例
      var indicator = [
        {
          text: '0-3时',
          max: 6000,
        },
        {
          text: '4-6时',
          max: 5000,
        },
        {
          text: '7-9时',
          max: 5000,
        },
        {
          text: '10-12时',
          max: 5000,
        },
        {
          text: '13-15时',
          max: 5000,
        },
        {
          text: '16-18时',
          max: 5000,
        },
        {
          text: '19-21时',
          max: 5000,
        },
        {
          text: '22-24时',
          max: 5000,
        },
      ];
      var dataArr = [
        {
          value: [4000, 700, 3600, 3900, 1800, 4200, 700, 3600],
          name: legendData[0],
          itemStyle: {
            normal: {
              lineStyle: {
                color: '#55d7f2',
              },
              // shadowColor: '#4A99FF',
              // shadowBlur: 10,
            },
          },
          areaStyle: {
            normal: {
              // 单项区域填充样式
              color: {
                type: 'linear',
                x: 1, //右
                y: 0, //下
                x2: 1, //左
                y2: 1, //上
                colorStops: [
                  {
                    offset: 0,
                    color: '#4A99FF',
                  },
                  {
                    offset: 1,
                    color: 'rgba(0,0,0,0)',
                  },
                ],
                globalCoord: false,
              },
              opacity: 1, // 区域透明度
            },
          },
        },
      ];
      var colorArr = ['#55d7f2', '#4BFFFC']; //颜色
      var option = {
        backgroundColor: '#101736',
        color: colorArr,
        title: {
          text: '预约时间段分布',
          textStyle: {
            align: 'center',
            color: '#fff',
            fontSize: 30,
          },
          top: '1%',
          left: 'center',
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        legend: {
          orient: 'vertical',
          icon: 'circle', //图例形状
          data: legendData,
          top: 20,
          left: 20,
          itemWidth: 8, // 图例标记的图形宽度。[ default: 25 ]
          itemHeight: 8, // 图例标记的图形高度。[ default: 14 ]
          itemGap: 22, // 图例每项之间的间隔。[ default: 10 ]横向布局时为水平间隔，纵向布局时为纵向间隔。
          textStyle: {
            fontSize: 16,
            fontWeight: 'bold',
            color: '#00E4FF',
          },
        },
        radar: {
          // shape: 'circle',
          name: {
            textStyle: {
              color: '#fff',
              fontSize: 16,
            },
          },
          indicator: indicator,
          splitArea: {
            // 坐标轴在 grid 区域中的分隔区域，默认不显示。
            show: true,
            areaStyle: {
              // 分隔区域的样式设置。
              color: ['rgba(255,255,255,0)', 'rgba(255,255,255,0)'], // 分隔区域颜色。分隔区域会按数组中颜色的顺序依次循环设置颜色。默认是一个深浅的间隔色。
            },
          },
          axisLine: {
            //指向外圈文本的分隔线样式
            lineStyle: {
              color: '#153269',
            },
          },
          splitLine: {
            lineStyle: {
              color: '#2b75d2', // 分隔线颜色
              width: 2, // 分隔线线宽
            },
          },
        },
        series: [
          {
            type: 'radar',
            symbolSize: 10,
            symbol: 'circle',
            data: dataArr,
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