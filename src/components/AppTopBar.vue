<template>
  <header class="topbar">
    <div class="title-block">
      <p class="eyebrow">{{ readOnly ? '当前视图' : '当前周期' }}</p>
      <h1>{{ currentPeriod.title }}</h1>
      <select
        v-if="!readOnly"
        class="period-stage-select"
        :value="currentPeriod.stage"
        aria-label="周期阶段"
        @change="$emit('update-stage', $event.target.value)"
      >
        <option value="">未设置阶段</option>
        <option v-for="stage in periodStages" :key="stage" :value="stage">{{ stage }}</option>
      </select>

      <div v-if="!readOnly" class="period-relation-controls">
        <select
          class="period-relation-select"
          :value="currentPeriod.sourcePeriodId"
          aria-label="来源周期"
          @change="emitRelation($event.target.value, currentPeriod.relationType)"
        >
          <option value="">无来源周期</option>
          <option
            v-for="period in availableSourcePeriods"
            :key="period.id"
            :value="period.id"
          >
            {{ period.title }}
          </option>
        </select>

        <select
          class="period-relation-select"
          :value="currentPeriod.relationType"
          aria-label="关系类型"
          @change="emitRelation(currentPeriod.sourcePeriodId, $event.target.value)"
        >
          <option value="">未设置关系</option>
          <option v-for="type in periodRelationTypes" :key="type" :value="type">{{ type }}</option>
        </select>
      </div>
    </div>

    <nav class="view-tabs" aria-label="展示内容切换">
      <button
        :class="['tab-btn', { active: activeView === 'chart' }]"
        type="button"
        @click="$emit('update-view', 'chart')"
      >
        图表
      </button>
      <button
        :class="['tab-btn', { active: activeView === 'table' }]"
        type="button"
        @click="$emit('update-view', 'table')"
      >
        表格
      </button>
    </nav>

    <div class="top-actions">
      <span :class="['save-state', saveStatus.type]">{{ saveStatus.text }}</span>
      <button class="ghost-btn" type="button" @click="$emit('open-period-panel')">切换周期</button>
      <button v-if="!readOnly" class="primary-btn" type="button" @click="$emit('save')">保存</button>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppTopBar',
  props: {
    activeView: {
      type: String,
      required: true
    },
    currentPeriod: {
      type: Object,
      required: true
    },
    periods: {
      type: Array,
      required: true
    },
    periodRelationTypes: {
      type: Array,
      required: true
    },
    periodStages: {
      type: Array,
      required: true
    },
    saveStatus: {
      type: Object,
      required: true
    },
    readOnly: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    availableSourcePeriods() {
      return this.periods.filter(period => period.id !== this.currentPeriod.id)
    }
  },
  methods: {
    emitRelation(sourcePeriodId, relationType) {
      this.$emit('update-relation', {
        sourcePeriodId,
        relationType
      })
    }
  }
}
</script>
