<template>
  <el-table :data="list" style="width: 100%;padding-top: 15px;">
    <el-table-column label="Most Active Domain" min-width="200">
      <template slot-scope="scope">
        {{ scope.row.base_domain }}
      </template>
    </el-table-column>
    <el-table-column label="Total Most Active" min-width="100">
      <template slot-scope="scope">
        {{ formatDecimal(scope.row.total) }}
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { transactionList } from '@/api/remote-search'
import axios from 'axios'

export default {
  data() {
    return {
      list: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      //let url = 'http://localhost:1323/apiv1/totaltopmostactivelist';
      let url = 'http://175.106.13.24:1323/apiv1/totaltopmostactivelist';
      let promise = axios.get(
        url
      )
      return promise.then((response) => {
              const totaltopmostactivelist = response
                  this.list = response.data
              }).catch(error => {
              console.log(error)
              return []
              })
      },
      formatDecimal(value) {
          let val = (value/1).toFixed(2).replace('.', ',')
          return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      }
    }
  } 
</script>
