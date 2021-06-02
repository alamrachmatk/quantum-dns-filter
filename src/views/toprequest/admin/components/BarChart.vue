<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'
import axios from 'axios'

const animationDuration = 6000

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      chart: null,
      arrDayName: null,
      arrTotal: null
    }
  },
  created() {
        this.getTotalDnsDayList()
  },
  mounted() {
    this.getTotalDnsDayList()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
     getTotalDnsDayList() {
      axios
      .get('http://localhost:1323/apiv1/totaldnsdaylist')
      .then(response => { 
          var arrDayName = []
           var arrTotal = []
          const totalDnsDaylList = response
          const dataTotalDnsDaylList = totalDnsDaylList.data
          for (var i = 0; i < dataTotalDnsDaylList.length; i++) {
            var obj = dataTotalDnsDaylList[i]
            for (var key in obj) {
                if (key == "day_name") {
                  arrDayName.push(obj[key])
                }
                if (key == "total") {
                  arrTotal.push(obj[key])
                }   
            } 
          }
          this.arrDayName = arrDayName
          this.arrTotal = arrTotal
          this.initChart()
      })
      .catch(error => {
        console.log(error)
      })
     },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.chart.setOption({
         title: { 
          text: 'Total Visits 7 Last Days (DNS)',
          textStyle: {
            fontWeight: 'normal',
            fontSize: 16,
            color: '#7f8084'
          },
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: 45,
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: this.arrDayName,
          axisTick: {
            alignWithLabel: true
          }
        }],
        yAxis: [{
          type: 'value',
          axisTick: {
            show: false
          }
        }],
        series: [{
          name: 'Total Visit',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: this.arrTotal,
          animationDuration
        }]
      })
    }
  }
}
</script>
