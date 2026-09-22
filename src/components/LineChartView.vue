<template>
  <section class="chart-card">
    <div class="section-head">
      <div>
        <p class="eyebrow">AG Charts</p>
        <h2>日期 / 截止至今总涨幅</h2>
      </div>
      <span>{{ chartSeries.length }} 条折线</span>
    </div>

    <div v-if="chartSeries.length" ref="chartHost" class="chart-host"></div>

    <div v-else class="empty-state">
      还没有可绘制的数据，先到表格里新增股票、日期和当日涨幅。
    </div>
  </section>
</template>

<script>
import { AgChart } from 'ag-charts-community'
import { getChartRows } from '../utils/periodData'

const colors = ['#5b8cff', '#25c2a0', '#ff9f43', '#ef476f', '#8f6ed5', '#17a2b8']

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export default {
  name: 'LineChartView',
  props: {
    currentPeriod: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null,
      resizeObserver: null
    }
  },
  computed: {
    chartSeries() {
      return this.currentPeriod.groups
        .map((group, index) => ({
          id: group.id,
          name: group.name,
          color: colors[index % colors.length],
          rows: getChartRows(group)
        }))
        .filter(series => series.rows.length)
    },
    chartData() {
      const rowsByDate = new Map()

      this.chartSeries.forEach(series => {
        series.rows.forEach(row => {
          const chartRow = rowsByDate.get(row.date) || { date: row.date }
          chartRow[series.id] = row.totalChange
          chartRow[`${series.id}__change`] = row.change
          chartRow[`${series.id}__note`] = row.note
          rowsByDate.set(row.date, chartRow)
        })
      })

      return Array.from(rowsByDate.values()).sort((left, right) => left.date.localeCompare(right.date))
    },
    chartOptions() {
      return {
        autoSize: false,
        background: {
          fill: '#fbfdff'
        },
        padding: {
          top: 16,
          right: 24,
          bottom: 56,
          left: 12
        },
        data: this.chartData,
        tooltip: {
          class: 'compact-chart-tooltip',
          range: 8,
          position: {
            type: 'node',
            xOffset: 8,
            yOffset: -8
          },
          delay: 0
        },
        legend: {
          position: 'right'
        },
        axes: [
          {
            type: 'category',
            position: 'bottom',
            label: {
              rotation: -45,
              avoidCollisions: false
            },
            title: {
              text: '日期'
            }
          },
          {
            type: 'number',
            position: 'left',
            title: {
              text: '总涨幅 (%)'
            },
            label: {
              formatter: params => `${params.value}%`
            }
          }
        ],
        series: this.chartSeries.map(series => ({
          type: 'line',
          xKey: 'date',
          yKey: series.id,
          yName: series.name,
          stroke: series.color,
          marker: {
            fill: series.color,
            stroke: '#fff'
          },
          tooltip: {
            renderer: params => ({
              content: `
                <div class="stock-tooltip">
                  <div><strong>股票名称：</strong>${escapeHtml(params.yName)}</div>
                  <div><strong>日期：</strong>${escapeHtml(params.xValue)}</div>
                  <div><strong>当日涨幅：</strong>${escapeHtml(params.datum[`${series.id}__change`] || 0)}%</div>
                  <div><strong>累计涨幅：</strong>${escapeHtml(params.yValue)}%</div>
                  <div><strong>标记信息：</strong>${escapeHtml(params.datum[`${series.id}__note`] || '无')}</div>
                </div>
              `
            })
          }
        }))
      }
    }
  },
  watch: {
    currentPeriod: {
      deep: true,
      handler() {
        this.$nextTick(this.renderChart)
      }
    },
    chartSeries() {
      this.$nextTick(this.renderChart)
    }
  },
  mounted() {
    this.renderChart()

    if (window.ResizeObserver && this.$refs.chartHost) {
      this.resizeObserver = new window.ResizeObserver(() => {
        this.renderChart()
      })
      this.resizeObserver.observe(this.$refs.chartHost)
    } else {
      window.addEventListener('resize', this.renderChart)
    }
  },
  beforeDestroy() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect()
      this.resizeObserver = null
    } else {
      window.removeEventListener('resize', this.renderChart)
    }

    if (this.chart) {
      this.chart.destroy()
      this.chart = null
    }
  },
  methods: {
    renderChart() {
      const chartHost = this.$refs.chartHost

      if (!this.chartSeries.length || !chartHost) {
        if (this.chart) {
          this.chart.destroy()
          this.chart = null
        }

        return
      }

      const options = {
        ...this.chartOptions,
        container: chartHost,
        width: Math.max(chartHost.clientWidth, 1),
        height: Math.max(chartHost.clientHeight, 1)
      }

      if (this.chart) {
        AgChart.update(this.chart, options)
      } else {
        this.chart = AgChart.create(options)
      }
    }
  }
}
</script>
