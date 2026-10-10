<template>
  <section class="kline-page">
    <header class="kline-head">
      <div>
        <p class="eyebrow">K线预览</p>
        <h1>{{ stock.name }}</h1>
        <small>只展示 K 线与成交量，支持水平线和趋势线绘制。</small>
      </div>
      <div class="kline-actions">
        <button type="button" :class="{ active: drawMode === 'horizontal' }" @click="drawMode = 'horizontal'">水平线</button>
        <button type="button" :class="{ active: drawMode === 'trend' }" @click="drawMode = 'trend'">趋势线</button>
        <button type="button" :class="{ active: drawMode === 'volume-horizontal' }" @click="drawMode = 'volume-horizontal'">成交量线</button>
        <button type="button" :disabled="!selectedDrawingId" @click="deleteSelectedDrawing">删除选中</button>
        <button type="button" :disabled="!drawings.length" @click="clearDrawings">清空画线</button>
        <button type="button" @click="$emit('back')">返回</button>
      </div>
    </header>

    <div ref="chartBox" class="kline-chart-box">
      <svg
        class="kline-svg"
        :viewBox="`0 0 ${width} ${height}`"
        @click="onChartClick"
        @mousemove="onChartMove"
        @mouseleave="hoverPoint = null"
      >
        <defs>
          <clipPath id="price-drawing-clip">
            <rect
              :x="padding.left"
              :y="padding.top"
              :width="width - padding.left - padding.right"
              :height="priceBottom - padding.top"
            />
          </clipPath>
          <clipPath id="volume-drawing-clip">
            <rect
              :x="padding.left"
              :y="volumeTop"
              :width="width - padding.left - padding.right"
              :height="volumeBottom - volumeTop"
            />
          </clipPath>
        </defs>
        <rect :width="width" :height="height" fill="#fbfdff" />
        <line :x1="padding.left" :x2="width - padding.right" :y1="priceBottom" :y2="priceBottom" class="kline-axis" />
        <line :x1="padding.left" :x2="width - padding.right" :y1="volumeBottom" :y2="volumeBottom" class="kline-axis" />

        <g v-for="tick in priceTicks" :key="tick.value">
          <line :x1="padding.left" :x2="width - padding.right" :y1="tick.y" :y2="tick.y" class="kline-grid" />
          <text :x="padding.left - 10" :y="tick.y + 4" class="kline-label" text-anchor="end">{{ tick.value }}</text>
        </g>

        <g v-for="bar in candleBars" :key="bar.date">
          <line :x1="bar.x" :x2="bar.x" :y1="bar.highY" :y2="bar.lowY" :class="['candle-wick', bar.up ? 'up' : 'down']" />
          <rect
            :x="bar.x - bar.bodyWidth / 2"
            :y="bar.bodyY"
            :width="bar.bodyWidth"
            :height="bar.bodyHeight"
            :class="['candle-body', bar.up ? 'up' : 'down']"
          />
          <rect
            :x="bar.x - bar.bodyWidth / 2"
            :y="bar.volumeY"
            :width="bar.bodyWidth"
            :height="bar.volumeHeight"
            :class="['volume-bar', bar.up ? 'up' : 'down']"
          />
        </g>

        <circle
          v-if="snapPoint"
          :cx="snapPoint.x"
          :cy="snapPoint.y"
          r="4"
          class="snap-point"
        />

        <g
          v-for="drawing in drawings"
          :key="drawing.id"
          :clip-path="drawing.area === 'volume' ? 'url(#volume-drawing-clip)' : 'url(#price-drawing-clip)'"
        >
          <line
            :x1="drawing.start.x"
            :y1="drawing.start.y"
            :x2="drawing.end.x"
            :y2="drawing.end.y"
            :class="['drawing-line', { selected: drawing.id === selectedDrawingId }]"
            @click.stop="selectedDrawingId = drawing.id"
          />
        </g>

        <line
          v-if="pendingPoint && hoverPoint"
          :x1="pendingPoint.x"
          :y1="pendingPoint.y"
          :x2="getPreviewEndPoint().x"
          :y2="getPreviewEndPoint().y"
          class="drawing-line preview"
          clip-path="url(#price-drawing-clip)"
        />
      </svg>
    </div>
  </section>
</template>

<script>
export default {
  name: 'KlinePreviewView',
  props: {
    stock: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      drawings: [],
      drawMode: 'horizontal',
      height: 640,
      hoverPoint: null,
      padding: {
        top: 32,
        right: 36,
        bottom: 34,
        left: 64
      },
      pendingPoint: null,
      selectedDrawingId: '',
      width: 1100
    }
  },
  watch: {
    stock: {
      immediate: true,
      handler(stock) {
        this.drawings = Array.isArray(stock.drawings) ? stock.drawings.map(drawing => ({
          id: drawing.id,
          area: drawing.area || 'price',
          start: { ...drawing.start },
          end: { ...drawing.end }
        })) : []
        this.selectedDrawingId = ''
        this.pendingPoint = null
      }
    }
  },
  computed: {
    klines() {
      return Array.isArray(this.stock.klines) ? this.stock.klines.filter(item => item.date) : []
    },
    priceBottom() {
      return 430
    },
    volumeTop() {
      return 470
    },
    volumeBottom() {
      return this.height - this.padding.bottom
    },
    priceValues() {
      return this.klines.flatMap(item => [Number(item.high), Number(item.low)]).filter(Number.isFinite)
    },
    priceMin() {
      if (!this.priceValues.length) return 0
      const min = Math.min(...this.priceValues)
      const max = Math.max(...this.priceValues)
      return min - (max - min || 1) * 0.08
    },
    priceMax() {
      if (!this.priceValues.length) return 1
      const min = Math.min(...this.priceValues)
      const max = Math.max(...this.priceValues)
      return max + (max - min || 1) * 0.08
    },
    maxVolume() {
      return Math.max(...this.klines.map(item => Number(item.volume)).filter(Number.isFinite), 1)
    },
    candleBars() {
      const plotWidth = this.width - this.padding.left - this.padding.right
      const step = this.klines.length > 1 ? plotWidth / (this.klines.length - 1) : plotWidth
      const bodyWidth = Math.max(5, Math.min(18, step * 0.58))

      return this.klines.map((item, index) => {
        const open = Number(item.open)
        const close = Number(item.close)
        const high = Number(item.high)
        const low = Number(item.low)
        const volume = Number(item.volume)
        const openY = this.getPriceY(open)
        const closeY = this.getPriceY(close)
        const volumeHeight = Math.max(1, (volume / this.maxVolume) * (this.volumeBottom - this.volumeTop))

        return {
          date: item.date,
          x: this.padding.left + step * index,
          openY,
          closeY,
          highY: this.getPriceY(high),
          lowY: this.getPriceY(low),
          bodyY: Math.min(openY, closeY),
          bodyHeight: Math.max(1, Math.abs(closeY - openY)),
          bodyWidth,
          up: close >= open,
          volumeY: this.volumeBottom - volumeHeight,
          volumeHeight
        }
      })
    },
    snapPoints() {
      return this.candleBars.flatMap(bar => [
        { x: bar.x, y: bar.openY, type: 'open', date: bar.date },
        { x: bar.x, y: bar.highY, type: 'high', date: bar.date },
        { x: bar.x, y: bar.lowY, type: 'low', date: bar.date },
        { x: bar.x, y: bar.closeY, type: 'close', date: bar.date }
      ])
    },
    snapPoint() {
      if (!this.hoverPoint) return null

      return this.getNearestSnapPoint(this.hoverPoint)
    },
    priceTicks() {
      const ticks = []

      for (let index = 0; index <= 4; index += 1) {
        const value = this.priceMin + ((this.priceMax - this.priceMin) / 4) * index
        ticks.push({
          value: value.toFixed(2),
          y: this.getPriceY(value)
        })
      }

      return ticks
    }
  },
  mounted() {
    this.updateSize()
    window.addEventListener('resize', this.updateSize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.updateSize)
  },
  methods: {
    updateSize() {
      const box = this.$refs.chartBox
      if (!box) return

      this.width = Math.max(box.clientWidth, 720)
      this.height = Math.max(box.clientHeight, 520)
    },
    getPriceY(value) {
      const ratio = (Number(value) - this.priceMin) / (this.priceMax - this.priceMin || 1)
      return this.priceBottom - ratio * (this.priceBottom - this.padding.top)
    },
    getSvgPoint(event) {
      const rect = event.currentTarget.getBoundingClientRect()
      return {
        x: ((event.clientX - rect.left) / rect.width) * this.width,
        y: ((event.clientY - rect.top) / rect.height) * this.height
      }
    },
    onChartMove(event) {
      const point = this.getSvgPoint(event)
      if (this.drawMode === 'volume-horizontal') {
        this.hoverPoint = null
        return
      }

      this.hoverPoint = point.y <= this.priceBottom ? this.getNearestSnapPoint(point) : null
    },
    onChartClick(event) {
      const point = this.getSvgPoint(event)

      if (this.drawMode === 'volume-horizontal') {
        if (point.y < this.volumeTop || point.y > this.volumeBottom) return

        this.addDrawing({
          id: `drawing-${Date.now()}-${Math.random().toString(16).slice(2)}`,
          area: 'volume',
          start: { x: this.padding.left, y: point.y },
          end: { x: this.width - this.padding.right, y: point.y }
        })
        return
      }

      if (point.y > this.priceBottom) return

      const snappedPoint = this.getNearestSnapPoint(point)

      if (this.drawMode === 'horizontal') {
        this.addDrawing({
          id: `drawing-${Date.now()}-${Math.random().toString(16).slice(2)}`,
          area: 'price',
          start: { x: this.padding.left, y: snappedPoint.y },
          end: { x: this.width - this.padding.right, y: snappedPoint.y }
        })
        return
      }

      if (!this.pendingPoint) {
        this.pendingPoint = snappedPoint
        return
      }

      this.addDrawing({
        id: `drawing-${Date.now()}-${Math.random().toString(16).slice(2)}`,
        area: 'price',
        ...this.getTrendLineEndpoints(this.pendingPoint, snappedPoint)
      })
      this.pendingPoint = null
    },
    addDrawing(drawing) {
      this.drawings.push(drawing)
      this.selectedDrawingId = drawing.id
      this.emitDrawingsChange()
    },
    clearDrawings() {
      this.drawings = []
      this.selectedDrawingId = ''
      this.pendingPoint = null
      this.emitDrawingsChange()
    },
    deleteSelectedDrawing() {
      if (!this.selectedDrawingId) return

      this.drawings = this.drawings.filter(drawing => drawing.id !== this.selectedDrawingId)
      this.selectedDrawingId = ''
      this.emitDrawingsChange()
    },
    emitDrawingsChange() {
      this.$emit('update-drawings', this.drawings.map(drawing => ({
        id: drawing.id,
        area: drawing.area || 'price',
        start: { ...drawing.start },
        end: { ...drawing.end }
      })))
    },
    getPreviewEndPoint() {
      if (!this.pendingPoint || !this.hoverPoint) return this.hoverPoint

      return this.getTrendLineEndpoints(this.pendingPoint, this.hoverPoint).end
    },
    getTrendLineEndpoints(startPoint, endPoint) {
      const startX = this.padding.left
      const endX = this.width - this.padding.right

      if (startPoint.x === endPoint.x) {
        return {
          start: { x: startPoint.x, y: this.padding.top },
          end: { x: startPoint.x, y: this.priceBottom }
        }
      }

      const slope = (endPoint.y - startPoint.y) / (endPoint.x - startPoint.x)

      return {
        start: {
          x: startX,
          y: startPoint.y + slope * (startX - startPoint.x)
        },
        end: {
          x: endX,
          y: startPoint.y + slope * (endX - startPoint.x)
        }
      }
    },
    getNearestSnapPoint(point) {
      if (!this.snapPoints.length) return point

      return this.snapPoints.reduce((nearest, candidate) => {
        const candidateDistance = Math.hypot(candidate.x - point.x, candidate.y - point.y)
        const nearestDistance = Math.hypot(nearest.x - point.x, nearest.y - point.y)

        return candidateDistance < nearestDistance ? candidate : nearest
      }, this.snapPoints[0])
    }
  }
}
</script>
