<template>
  <section class="period-panel">
    <aside class="period-sidebar">
      <div class="brand-block">
        <span class="brand-mark"></span>
        <div>
          <p class="eyebrow">数据面板</p>
          <h1>周期选择</h1>
        </div>
      </div>
      <button :class="['side-item', { active: activeMenu === 'periods' }]" type="button" @click="activeMenu = 'periods'">周期</button>
      <button :class="['side-item', { active: activeMenu === 'watchlist' }]" type="button" @click="activeMenu = 'watchlist'">自选</button>
    </aside>

    <main v-if="activeMenu === 'periods'" class="period-content">
      <div class="content-head">
        <div>
          <p class="eyebrow">选择一个周期进入主页</p>
          <h2>周期列表</h2>
        </div>
        <form class="period-create-form" @submit.prevent="submitPeriod">
          <input v-model.trim="periodTitle" placeholder="填写周期名称" aria-label="周期名称" />
          <button class="primary-btn" type="submit">新增周期</button>
        </form>
      </div>

      <p v-if="saveStatus.text !== '未保存'" :class="['period-status', saveStatus.type]">
        {{ saveStatus.text }}
      </p>

      <div class="period-grid">
        <button class="period-card global-period-card" type="button" @click="$emit('select-period', '__all__')">
          <div class="period-card-head">
            <span class="period-card-title">全部周期</span>
            <strong>{{ totalGroups }} 组</strong>
          </div>
          <div class="period-card-summary">跨周期全局数据视图</div>
          <small>查看所有周期的数据</small>
        </button>

        <article
          v-for="period in periods"
          :key="period.id"
          class="period-card"
          @click="$emit('select-period', period.id)"
        >
          <div class="period-card-head">
            <span class="period-card-title">{{ period.title }}</span>
            <strong>{{ period.groups.length }} 组</strong>
          </div>

          <div class="period-stage-badge">{{ period.stage || '未设置阶段' }}</div>

          <div class="period-range-box">
            <div>
              <small>开始</small>
              <b>{{ formatRangeDate(period.timeRange, 'startDate') }}</b>
            </div>
            <div>
              <small>结束</small>
              <b>{{ formatRangeDate(period.timeRange, 'endDate') }}</b>
            </div>
          </div>

          <div class="period-relation-box">
            <small>来源</small>
            <b>{{ getSourcePeriodTitle(period.sourcePeriodId) }}</b>
            <i>{{ period.relationType || '未设置关系' }}</i>
          </div>

          <div class="period-card-actions">
            <small>点击进入图表主页</small>
            <button
              class="period-delete-btn"
              type="button"
              :disabled="deletingPeriodId === period.id"
              @click.stop="$emit('delete-period', period.id)"
            >
              {{ deletingPeriodId === period.id ? '删除中' : '删除周期' }}
            </button>
          </div>
        </article>
      </div>
    </main>

    <main v-else class="period-content">
      <div class="content-head">
        <div>
          <p class="eyebrow">自选观察池</p>
          <h2>自选股票</h2>
        </div>
        <form class="period-create-form" @submit.prevent="submitWatchStock">
          <input v-model.trim="watchStockKeyword" placeholder="股票名称或代码" aria-label="股票名称或代码" />
          <button class="primary-btn" type="submit">查询添加</button>
        </form>
      </div>

      <p v-if="saveStatus.text !== '未保存'" :class="['period-status', saveStatus.type]">
        {{ saveStatus.text }}
      </p>

      <div v-if="watchlist.length" class="watchlist-grid">
        <article v-for="stock in watchlist" :key="stock.id" class="watch-stock-card">
          <div class="watch-stock-main">
            <span class="watch-stock-avatar">{{ getStockInitial(stock.name) }}</span>
            <div>
              <h3>{{ stock.name }}</h3>
              <small>{{ stock.code || '暂无代码' }} · {{ getKlineCount(stock) }} 根K线</small>
            </div>
          </div>
          <strong :class="getChangeClass(stock.change)">{{ formatChange(stock.change) }}</strong>
          <div class="watch-stock-actions">
            <button class="primary-btn" type="button" @click="$emit('preview-watch-stock', stock.id)">预览</button>
            <button class="period-delete-btn" type="button" @click="$emit('delete-watch-stock', stock.id)">删除</button>
          </div>
        </article>
      </div>

      <div v-else class="empty-state">还没有自选股票，先新增一个。</div>
    </main>
  </section>
</template>

<script>
export default {
  name: 'PeriodPanel',
  props: {
    periods: {
      type: Array,
      required: true
    },
    saveStatus: {
      type: Object,
      required: true
    },
    deletingPeriodId: {
      type: String,
      default: ''
    },
    watchlist: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      activeMenu: 'periods',
      periodTitle: '',
      watchStockKeyword: ''
    }
  },
  computed: {
    totalGroups() {
      return this.periods.reduce((total, period) => total + period.groups.length, 0)
    }
  },
  methods: {
    formatRangeDate(timeRange, key) {
      if (!timeRange || !timeRange[key]) return '--'

      return timeRange[key]
    },
    getSourcePeriodTitle(sourcePeriodId) {
      if (!sourcePeriodId) return '无来源周期'

      const sourcePeriod = this.periods.find(period => period.id === sourcePeriodId)
      return sourcePeriod ? sourcePeriod.title : '来源周期不存在'
    },
    submitPeriod() {
      if (!this.periodTitle) return

      this.$emit('create-period', this.periodTitle)
      this.periodTitle = ''
    },
    submitWatchStock() {
      if (!this.watchStockKeyword) return

      this.$emit('create-watch-stock', this.watchStockKeyword)
      this.watchStockKeyword = ''
    },
    formatChange(change) {
      if (change === '' || change == null) return '--'

      const sign = Number(change) > 0 ? '+' : ''
      return `${sign}${change}%`
    },
    getChangeClass(change) {
      return {
        'watch-change': true,
        positive: Number(change) > 0,
        negative: Number(change) < 0
      }
    },
    getStockInitial(name) {
      return String(name || '股').slice(0, 1)
    },
    getKlineCount(stock) {
      return Array.isArray(stock.klines) ? stock.klines.length : 0
    }
  }
}
</script>
