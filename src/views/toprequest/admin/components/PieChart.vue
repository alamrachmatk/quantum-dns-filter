<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'
import axios from 'axios'

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
      default: '470px'
    }
  },
  data() {
    return {
      chart: null,
      arrBaseDomain: null,
      arrMultiBaseDomain: null,
      arrTotal: null,
      mergedArr: null
    }
  },
   created() {
        this.getTotalDnsDayList()
  },
  mounted() {
    // this.$nextTick(() => {
      this.getTotalDnsDayList()
    // })
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
      //.get('http://localhost:1323/apiv1/totaltopmostactivelist')
      .get('http://175.106.13.24:1323/apiv1/totaltopmostactivelist')
      .then(response => { 
          var arrBaseDomain = []
          var arrMultiBaseDomain = []
          var arrTotal = []
          var mergedArr = []
          const totalTopMostActivelList = response
          const dataTotalTopMostActivelList = totalTopMostActivelList.data
           

          for (var i = 0; i < dataTotalTopMostActivelList.length; i++) {
            var obj = dataTotalTopMostActivelList[i]
                var name = ""
                var value = null
            for (var key in obj) {
                console.log("KEY ========== ", key)
                if (key == "base_domain") {
                  arrBaseDomain.push(obj[key]) 
                  //arrMultiBaseDomain.push( { "name" : obj[key] } );
                 // var a = arrMultiBaseDomain.push( { "name" : obj[key] } );
                  name = obj[key];
                }
                if (key == "total") {
                  // arrTotal.push(obj[key])
                  //arrTotal.push( { "value" : obj[key] } );
                  value = obj[key];
                }
                mergedArr.push( { "value" : value, "name" : name } );
            } 
          }
          this.arrBaseDomain = arrBaseDomain
          this.arrMultiBaseDomain = arrMultiBaseDomain
          this.arrTotal = arrTotal
          this.mergedArr = mergedArr
          this.initChart()
      })
      .catch(error => {
        console.log(error)
      })
     },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          bottom: '10',
         data: this.arrBaseDomain
        },
        series: [
          {
            name: 'MOST ACTIVE DOMAIN',
            type: 'pie',
            roseType: 'radius',
            radius: [15, 95],
            center: ['50%', '38%'],
            data: this.mergedArr,
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ]
      })
    }
  }
}
</script>
