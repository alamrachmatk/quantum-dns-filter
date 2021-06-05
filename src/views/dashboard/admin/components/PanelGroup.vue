<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="dashboard" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            SITES
          </div>
          <count-to :start-val="0" :end-val="totalDns" :duration="2600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon icon-class="component" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            BLOCK LIST
          </div>
          <count-to :start-val="0" :end-val="totalBlock" :duration="2600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-money">
          <svg-icon icon-class="money" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            SITES BLOCK
          </div>
          <count-to :start-val="0" :end-val="totalDnsBlock" :duration="3200" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-shopping">
          <svg-icon icon-class="eye-open" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            IP ADDRESS
          </div>
          <count-to :start-val="0" :end-val="totalIpAddress" :duration="3600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'
import axios from 'axios'

export default {
  data: function () {
    return {
      totalDns: 100,
      totalBlock: 100,
      totalDnsBlock: 100,
      totalIpAddress: 100,
    }
  },
  components: {
    CountTo
  },
  methods: {
     getTotalDns() {
        //let url = 'http://localhost:1323/apiv1/totaldns';
        let url = 'http://175.106.13.24:1323/apiv1/totaldns';
        let promise = axios.get(
            url
        )
        return promise.then((response) => {
            const totalDns = response
            this.totalDns = totalDns.data['dns_all']
            return (totalDns)
            }).catch(error => {
            console.log(error)
            return []
            })
     },
     getTotalBlock() {
        //let url = 'http://localhost:1323/apiv1/totalblock';
        let url = 'http://175.106.13.24:1323/apiv1/totalblock';
        let promise = axios.get(
            url
        )
        return promise.then((response) => {
            const totalBlock = response
            this.totalBlock = totalBlock.data['block_all']
            return (totalBlock)
            }).catch(error => {
            console.log(error)
            return []
            })
     },
     getTotalDnsBlock() {
        //let url = 'http://localhost:1323/apiv1/totaldnsblock';
        let url = 'http://175.106.13.24:1323/apiv1/totaldnsblock';
        let promise = axios.get(
            url
        )
        return promise.then((response) => {
            const totalDnsBlock = response
            this.totalDnsBlock = totalDnsBlock.data['dns_block_all']
            return (totalDnsBlock)
            }).catch(error => {
            console.log(error)
            return []
            })
     },
     getTotalIpAddress() {
        //let url = 'http://localhost:1323/apiv1/totalipaddress';
        let url = 'http://175.106.13.24:1323/apiv1/totalipaddress';
        let promise = axios.get(
            url
        )
        return promise.then((response) => {
            const totalIpAddress = response
            this.totalIpAddress = totalIpAddress.data['ip_address_all']
            }).catch(error => {
            console.log(error)
            return []
            })
     }
  },
  mounted() {
    this.getTotalDns()
    this.getTotalBlock()
    this.getTotalDnsBlock()
    this.getTotalIpAddress()
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>