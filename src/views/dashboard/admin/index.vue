<template>
  <div class="dashboard-editor-container">
    <github-corner class="github-corner" />

        <panel-group @handleSetLineChartData="handleSetLineChartData" />
 
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
        <bar-chart />
    </el-row>

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <raddar-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <pie-chart />
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="8">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="padding-right:14px;margin-bottom:30px;">
        <transaction-table />
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="padding-left:14px;margin-bottom:30px;">
         <div class="chart-wrapper"> 
           <line-chart :chart-data="lineChartData" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import BarChart from './components/BarChart'
import TransactionTable from './components/TransactionTable'
import axios from 'axios'


export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    LineChart,
    BarChart,
    TransactionTable,
  },
  data() {
    return {
      lineChartData: null,
    }
  },
  mounted() {
    this.getTotalIpAddressDayList()
  },
  methods: {
    getTotalIpAddressDayList() {
      axios
      .get('http://localhost:1323/apiv1/totalipaddressdaylist')
      .then(response => { 
          var arrDayName = []
          var arrTotal = []
          const totalIpAddressDaylList = response
          const dataTotalIpAddressDaylList = totalIpAddressDaylList.data
          for (var i = 0; i < dataTotalIpAddressDaylList.length; i++) {
            var obj = dataTotalIpAddressDaylList[i]
            for (var key in obj) {
                if (key == "day_name") {
                  arrDayName.push(obj[key])
                }
                if (key == "total") {
                  arrTotal.push(obj[key])
                }   
            } 
          }
        
          var lineChartData = {
            newVisitis: {
              totalData: arrTotal,
              dayData: arrDayName,
            },
          }
          this.lineChartData = lineChartData.newVisitis
      })
      .catch(error => {
        console.log(error)
      })
     }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
