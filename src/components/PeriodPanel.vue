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
      <button class="side-item active" type="button">周期</button>
    </aside>

    <main class="period-content">
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
    }
  },
  data() {
    return {
      periodTitle: ''
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
    }
  }
}
</script>
