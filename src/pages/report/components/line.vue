<template>
  <div class="line-wrapper">
    222
    <div id="chart" class="main_container" />
  </div>
</template>
<script>
import * as echarts from 'echarts'

export default {
  name: 'Line1',
  data() {
    return {}
  },
  mounted() {
    const chartDom = document.getElementById('chart')
    const myChart = echarts.init(chartDom)
    let option = ''

    option = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line',
        },
      ],
    }

    option && myChart.setOption(option)
  },
}
</script>
<style lang="less" scoped>
.line-wrapper {
  height: 300px;
  .main_container {
    width: 100%;
    height: 200px;
  }
}
</style>
