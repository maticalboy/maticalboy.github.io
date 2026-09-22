<template>
  <header class="topbar">
    <div class="title-block">
      <p class="eyebrow">{{ readOnly ? '当前视图' : '当前周期' }}</p>
      <h1>{{ currentPeriod.title }}</h1>
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
    saveStatus: {
      type: Object,
      required: true
    },
    readOnly: {
      type: Boolean,
      default: false
    }
  }
}
</script>
