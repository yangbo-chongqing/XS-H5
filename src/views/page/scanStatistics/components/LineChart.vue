<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons')
import resize from './mixins/resize'
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
      default: '200px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions()
    },
    setOptions() {
      const yAxisData1 = []
      const yAxisData2 = []
      const yAxisData3 = []
      const xAxisData = []
      this.chartData.map((item, index) => {
        xAxisData.push(item.date)
        yAxisData1.push(item.people)
        yAxisData2.push(item.frequency);
        yAxisData3.push(item.frequencys);
      })

      this.chart.setOption({
        xAxis: {
          data: xAxisData,
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 10,
          right: 50,
          bottom: 20,
          top: 30,
          width:'92%',
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        legend: {
          data: ['扫描次数' , '扫描人数', '停留时间']
        },
        series: [
          {
            name: '扫描人数',
            itemStyle: {
              normal: {
                color: '#28d339',
                lineStyle: {
                  color: '#28d339',
                  width: 2
                }
              }
            },
            smooth: true,
            type: 'line',
            data: yAxisData1,
            animationDuration: 2800,
            animationEasing: 'cubicInOut'
          },
          {
            name: '扫描次数',
            smooth: true,
            type: 'line',
            itemStyle: {
              normal: {
                color: '#069dff',
                lineStyle: {
                  color: '#069dff',
                  width: 2
                },
              }
            },
            data: yAxisData2,
            animationDuration: 2800,
            animationEasing: 'quadraticOut'
          },
          {
            name: '停留时间',
            smooth: true,
            type: 'line',
            itemStyle: {
              normal: {
                color: '#ff6af4',
                lineStyle: {
                  color: '#ff6af4',
                  width: 2
                },

              }
            },
            data: yAxisData3,
            animationDuration: 2800,
            animationEasing: 'quadraticOut'
          }
        ]
      })
    }
  }
}
</script>
