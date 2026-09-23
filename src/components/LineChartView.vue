<template>
  <section class="chart-card">
    <div class="section-head">
      <div>
        <p class="eyebrow">AG Charts</p>
        <h2>日期 / 截止至今总涨幅</h2>
      </div>
      <div class="chart-actions">
        <span>{{ chartSeries.length }} 条折线</span>
        <button type="button" :disabled="!canZoomIn" @click="zoomIn">放大</button>
        <button type="button" :disabled="!canZoomOut" @click="zoomOut">缩小</button>
        <button type="button" :disabled="!canPanLeft" @click="panChart(-1)">左移</button>
        <button type="button" :disabled="!canPanRight" @click="panChart(1)">右移</button>
        <button type="button" :disabled="!isZoomed" @click="resetZoom">重置</button>
        <button type="button" :disabled="!chart" @click="downloadChart">下载</button>
      </div>
    </div>

    <div
      v-if="chartSeries.length"
      ref="chartHost"
      :class="['chart-host', { 'is-draggable': isZoomed }]"
      @pointerdown="startDrag"
    ></div>

    <div v-else class="empty-state">
      还没有可绘制的数据，先到表格里新增股票、日期和当日涨幅。
    </div>
  </section>
</template>

<script>
import { AgChart } from 'ag-charts-community'
import { getChartRows } from '../utils/periodData'

const colors = ['#5b8cff', '#25c2a0', '#ff9f43', '#ef476f', '#8f6ed5', '#17a2b8']
const allPeriodsChartRoles = new Set(['龙头', '穿越龙'])

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
      dragLastX: 0,
      isDragging: false,
      resizeObserver: null,
      zoomEndIndex: null,
      zoomStartIndex: 0
    }
  },
  computed: {
    chartSeries() {
      const groups = this.currentPeriod.id === '__all__'
        ? this.currentPeriod.groups.filter(group => allPeriodsChartRoles.has(group.role))
        : this.currentPeriod.groups

      return groups
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
    visibleChartData() {
      if (!this.chartData.length) return []

      const endIndex = this.normalizedZoomEndIndex
      return this.chartData.slice(this.zoomStartIndex, endIndex + 1)
    },
    normalizedZoomEndIndex() {
      return this.zoomEndIndex == null ? this.chartData.length - 1 : Math.min(this.zoomEndIndex, this.chartData.length - 1)
    },
    visiblePointCount() {
      if (!this.chartData.length) return 0

      return this.normalizedZoomEndIndex - this.zoomStartIndex + 1
    },
    canZoomIn() {
      return this.visiblePointCount > 2
    },
    canZoomOut() {
      return this.isZoomed
    },
    canPanLeft() {
      return this.isZoomed && this.zoomStartIndex > 0
    },
    canPanRight() {
      return this.isZoomed && this.normalizedZoomEndIndex < this.chartData.length - 1
    },
    isZoomed() {
      return this.zoomStartIndex > 0 || this.normalizedZoomEndIndex < this.chartData.length - 1
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
        data: this.visibleChartData,
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
    },
    chartData() {
      this.clampZoomRange()
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
    this.stopDrag()

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
    clampZoomRange() {
      if (!this.chartData.length) {
        this.zoomStartIndex = 0
        this.zoomEndIndex = null
        return
      }

      const lastIndex = this.chartData.length - 1
      this.zoomStartIndex = Math.min(this.zoomStartIndex, lastIndex)
      if (this.zoomEndIndex != null) this.zoomEndIndex = Math.min(this.zoomEndIndex, lastIndex)
      if (this.normalizedZoomEndIndex < this.zoomStartIndex) this.zoomStartIndex = 0
    },
    zoomIn() {
      if (!this.canZoomIn) return

      const endIndex = this.normalizedZoomEndIndex
      const shrinkCount = Math.max(1, Math.floor(this.visiblePointCount * 0.25))
      const nextStartIndex = Math.min(this.zoomStartIndex + shrinkCount, endIndex - 1)
      const nextEndIndex = Math.max(endIndex - shrinkCount, nextStartIndex + 1)

      this.zoomStartIndex = nextStartIndex
      this.zoomEndIndex = nextEndIndex
      this.$nextTick(this.renderChart)
    },
    zoomOut() {
      if (!this.canZoomOut) return

      const expandCount = Math.max(1, Math.ceil(this.visiblePointCount * 0.25))

      this.zoomStartIndex = Math.max(0, this.zoomStartIndex - expandCount)
      this.zoomEndIndex = Math.min(this.chartData.length - 1, this.normalizedZoomEndIndex + expandCount)

      if (this.zoomStartIndex === 0 && this.zoomEndIndex === this.chartData.length - 1) {
        this.zoomEndIndex = null
      }

      this.$nextTick(this.renderChart)
    },
    resetZoom() {
      this.zoomStartIndex = 0
      this.zoomEndIndex = null
      this.$nextTick(this.renderChart)
    },
    getPanStep() {
      return Math.max(1, Math.floor(this.visiblePointCount * 0.35))
    },
    panChart(direction, step = this.getPanStep()) {
      if (!this.isZoomed || !this.chartData.length) return

      const visibleCount = this.visiblePointCount
      const maxStartIndex = this.chartData.length - this.visiblePointCount
      const nextStartIndex = Math.min(
        Math.max(0, this.zoomStartIndex + direction * step),
        Math.max(0, maxStartIndex)
      )

      this.zoomStartIndex = nextStartIndex
      this.zoomEndIndex = nextStartIndex + visibleCount - 1

      if (this.zoomStartIndex === 0 && this.zoomEndIndex === this.chartData.length - 1) {
        this.zoomEndIndex = null
      }

      this.$nextTick(this.renderChart)
    },
    startDrag(event) {
      if (!this.isZoomed) return

      this.isDragging = true
      this.dragLastX = event.clientX
      event.preventDefault()
      window.addEventListener('pointermove', this.onDrag)
      window.addEventListener('pointerup', this.stopDrag)
      window.addEventListener('pointercancel', this.stopDrag)
    },
    onDrag(event) {
      if (!this.isDragging) return

      const deltaX = event.clientX - this.dragLastX
      const threshold = 40

      if (Math.abs(deltaX) < threshold) return

      this.panChart(deltaX > 0 ? -1 : 1, 1)
      this.dragLastX = event.clientX
    },
    stopDrag() {
      this.isDragging = false
      window.removeEventListener('pointermove', this.onDrag)
      window.removeEventListener('pointerup', this.stopDrag)
      window.removeEventListener('pointercancel', this.stopDrag)
    },
    downloadChart() {
      if (!this.chart) return

      AgChart.download(this.chart, {
        fileFormat: 'image/png',
        fileName: `${this.currentPeriod.title || 'chart'}-涨幅图`
      })
    },
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
