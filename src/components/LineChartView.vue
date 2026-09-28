<template>
  <section class="chart-card">
    <div class="section-head">
      <div>
        <p class="eyebrow">AG Charts</p>
        <h2>日期 / 截止至今总涨幅</h2>
      </div>
      <div v-if="isAllPeriods" class="period-filters" aria-label="选择要展示的周期">
        <label v-for="period in periods" :key="period.id" class="period-filter">
          <input v-model="selectedPeriodIds" type="checkbox" :value="period.id" />
          <span>{{ period.title }}</span>
        </label>
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
      ref="chartShell"
      :class="['chart-shell', { 'is-draggable': isZoomed }]"
      @pointerdown="startDrag"
    >
      <div ref="chartHost" class="chart-host"></div>
      <div class="chart-stage-layer" aria-hidden="true">
        <div
          v-for="marker in keyNodeMarkers"
          :key="marker.key"
          class="chart-key-node"
          :style="{
            '--marker-color': marker.color,
            '--marker-fill': marker.fill,
            left: `${marker.x}px`
          }"
        >
          <span>{{ marker.label }}</span>
        </div>
        <span
          v-for="label in segmentStageLabels"
          :key="label.key"
          class="chart-stage-label"
          :style="{
            color: label.color,
            left: `${label.x}px`,
            top: `${label.y}px`
          }"
        >{{ label.segmentStage }}</span>
      </div>
    </div>

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
    },
    periods: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      chart: null,
      chartHostHeight: 0,
      chartHostWidth: 0,
      dragLastX: 0,
      isDragging: false,
      resizeObserver: null,
      selectedPeriodIds: [],
      zoomEndIndex: null,
      zoomStartIndex: 0
    }
  },
  computed: {
    isAllPeriods() {
      return this.currentPeriod.id === '__all__'
    },
    chartSeries() {
      const groups = this.isAllPeriods
        ? this.currentPeriod.groups.filter(group =>
          allPeriodsChartRoles.has(group.role) && this.selectedPeriodIds.includes(group.periodId)
        )
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
          chartRow[`${series.id}__segmentStage`] = row.segmentStage
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
    segmentLabelSeries() {
      const visibleDates = new Set(this.visibleChartData.map(row => row.date))

      return this.chartSeries
        .map(series => ({
          ...series,
          labels: this.getSegmentStageLabels(series.rows.filter(row => visibleDates.has(row.date)))
        }))
        .filter(series => series.labels.length)
    },
    segmentStageLabels() {
      if (!this.chartHostWidth || !this.chartHostHeight) return []

      const yValues = this.visibleChartData.flatMap(row => this.chartSeries
        .map(series => row[series.id])
        .filter(value => value !== '' && value != null)
        .map(Number)
        .filter(Number.isFinite)
      )

      if (!yValues.length) return []

      const minValue = Math.min(...yValues)
      const maxValue = Math.max(...yValues)
      const valueRange = maxValue - minValue || 1
      const yPadding = valueRange * 0.12
      const yMin = minValue - yPadding
      const yMax = maxValue + yPadding
      const plotLeft = 76
      const plotRight = this.chartHostWidth > 720 ? 190 : 32
      const plotTop = 34
      const plotBottom = 82
      const plotWidth = Math.max(this.chartHostWidth - plotLeft - plotRight, 1)
      const plotHeight = Math.max(this.chartHostHeight - plotTop - plotBottom, 1)
      const dates = this.visibleChartData.map(row => row.date)
      const maxDateIndex = Math.max(dates.length - 1, 1)

      return this.segmentLabelSeries.flatMap(series => series.labels.map((label, labelIndex) => {
        const dateIndex = dates.indexOf(label.date)
        const xRatio = dateIndex < 0 ? 0 : dateIndex / maxDateIndex
        const yRatio = (Number(label.totalChange) - yMin) / (yMax - yMin || 1)

        return {
          key: `${series.id}-${label.date}-${label.segmentStage}-${labelIndex}`,
          color: series.color,
          segmentStage: label.segmentStage,
          x: plotLeft + plotWidth * xRatio,
          y: plotTop + plotHeight * (1 - yRatio)
        }
      }))
    },
    keyNodeMarkers() {
      if (!this.chartHostWidth || !this.visibleChartData.length) return []

      const dates = this.visibleChartData.map(row => row.date)
      const dateSet = new Set(dates)
      const maxDateIndex = Math.max(dates.length - 1, 1)
      const plotLeft = 76
      const plotRight = this.chartHostWidth > 720 ? 190 : 32
      const plotWidth = Math.max(this.chartHostWidth - plotLeft - plotRight, 1)
      const markers = []
      const samePeriodReturnColor = '#dc2626'
      const inheritanceReturnColor = '#7c3aed'
      const oldDragonReturnRoles = ['A杀龙', '穿越龙', '补涨龙']
      const leaderStageFourByKey = new Map()

      const getDateX = date => {
        const dateIndex = dates.indexOf(date)
        return plotLeft + plotWidth * (dateIndex / maxDateIndex)
      }

      const pushMarker = marker => {
        const sameDateCount = markers.filter(item => item.date === marker.date).length
        markers.push({
          ...marker,
          x: getDateX(marker.date) + sameDateCount * 12
        })
      }

      this.currentPeriod.groups.forEach(group => {
        if (group.role !== '龙头') return
        if (this.isAllPeriods && group.periodId && !this.selectedPeriodIds.includes(group.periodId)) return

        group.rows.forEach(row => {
          if (!row.date || !dateSet.has(row.date) || row.segmentStage !== '4') return

          const key = `${group.periodId || this.currentPeriod.id}__${row.date}`
          const names = leaderStageFourByKey.get(key) || []
          names.push(group.name || '未命名龙头')
          leaderStageFourByKey.set(key, names)
        })
      })

      this.currentPeriod.groups.forEach(group => {
        const roleRank = oldDragonReturnRoles.indexOf(group.role)
        if (roleRank < 0) return
        if (this.isAllPeriods && group.periodId && !this.selectedPeriodIds.includes(group.periodId)) return

        group.rows.forEach(row => {
          const periodId = group.periodId || this.currentPeriod.id
          const leaderNames = leaderStageFourByKey.get(`${periodId}__${row.date}`) || []

          if (row.date && dateSet.has(row.date) && row.segmentStage === '3' && row.note === '主升爆量' && leaderNames.length) {
            pushMarker({
              key: `same-period-old-dragon-return-${periodId}-${row.date}-${group.id}`,
              color: samePeriodReturnColor,
              date: row.date,
              fill: 'rgba(254, 226, 226, 0.95)',
              label: `老龙回流：${leaderNames.join('、')}`,
              roleRank
            })
          }
        })
      })

      if (this.isAllPeriods) {
        const selectedPeriodIds = new Set(this.selectedPeriodIds)
        const periodById = new Map(this.periods.map(period => [period.id, period]))

        this.periods.forEach(period => {
          if (!selectedPeriodIds.has(period.id)) return
          if (period.relationType !== '承接' || !period.sourcePeriodId) return
          if (!selectedPeriodIds.has(period.sourcePeriodId)) return

          const sourcePeriod = periodById.get(period.sourcePeriodId)
          if (!sourcePeriod) return

          const sourceStageFiveTwoByDate = new Map()
          sourcePeriod.groups
            .filter(group => allPeriodsChartRoles.has(group.role))
            .forEach(group => {
              group.rows.forEach(row => {
                if (row.date && dateSet.has(row.date) && row.segmentStage === '5-2') {
                  const names = sourceStageFiveTwoByDate.get(row.date) || []
                  names.push(group.name || sourcePeriod.title)
                  sourceStageFiveTwoByDate.set(row.date, names)
                }
              })
            })

          if (!sourceStageFiveTwoByDate.size) return

          period.groups
            .filter(group => allPeriodsChartRoles.has(group.role))
            .forEach(group => {
              group.rows.forEach(row => {
                if (!row.date || !dateSet.has(row.date)) return
                if (row.segmentStage !== '3' || row.note !== '主升爆量') return
                if (!sourceStageFiveTwoByDate.has(row.date)) return

                pushMarker({
                  key: `inheritance-old-dragon-return-${period.id}-${sourcePeriod.id}-${row.date}-${group.id}`,
                  color: inheritanceReturnColor,
                  date: row.date,
                  fill: 'rgba(237, 233, 254, 0.95)',
                  label: `老龙回流：${sourceStageFiveTwoByDate.get(row.date).join('、')}`,
                  roleRank: oldDragonReturnRoles.length
                })
              })
            })
        })
      }

      return markers.sort((left, right) => left.date.localeCompare(right.date) || left.roleRank - right.roleRank)
    },
    chartOptions() {
      const lineSeries = this.chartSeries.map(series => ({
        id: series.id,
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
                <div><strong>个股阶段：</strong>${escapeHtml(params.datum[`${series.id}__segmentStage`] || '无')}</div>
                <div><strong>标记信息：</strong>${escapeHtml(params.datum[`${series.id}__note`] || '无')}</div>
              </div>
            `
          })
        }
      }))
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
        series: lineSeries
      }
    }
  },
  watch: {
    periods: {
      immediate: true,
      handler(periods) {
        const periodIds = periods.map(period => period.id)
        this.selectedPeriodIds = this.selectedPeriodIds.length
          ? this.selectedPeriodIds.filter(id => periodIds.includes(id))
          : periodIds
      }
    },
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

    if (window.ResizeObserver && this.$refs.chartShell) {
      this.resizeObserver = new window.ResizeObserver(() => {
        this.renderChart()
      })
      this.resizeObserver.observe(this.$refs.chartShell)
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
    getSegmentStageLabels(rows) {
      const labels = []
      let stage = ''
      let segmentRows = []

      const pushLabel = () => {
        if (!stage || !segmentRows.length) return

        const middleRow = segmentRows[Math.floor((segmentRows.length - 1) / 2)]
        labels.push({
          date: middleRow.date,
          totalChange: middleRow.totalChange,
          segmentStage: stage
        })
      }

      rows.forEach(row => {
        const nextStage = row.segmentStage || ''

        if (nextStage !== stage) {
          pushLabel()
          stage = nextStage
          segmentRows = []
        }

        if (stage) segmentRows.push(row)
      })

      pushLabel()

      return labels
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

      this.chartHostWidth = chartHost.clientWidth
      this.chartHostHeight = chartHost.clientHeight

      const options = {
        ...this.chartOptions,
        container: chartHost,
        width: Math.max(this.chartHostWidth, 1),
        height: Math.max(this.chartHostHeight, 1)
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
