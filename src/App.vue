<template>
  <div id="app">
    <KlinePreviewView
      v-if="previewStock"
      :stock="previewStock"
      @back="previewStockId = ''"
      @update-drawings="updateWatchStockDrawings"
    />

    <PeriodPanel
      v-else-if="showPeriodPanel"
      :deleting-period-id="deletingPeriodId"
      :periods="sortedPeriods"
      :save-status="saveStatus"
      :watchlist="watchlist"
      @create-period="createPeriod"
      @create-watch-stock="createWatchStock"
      @delete-watch-stock="deleteWatchStock"
      @delete-period="deletePeriod"
      @preview-watch-stock="previewWatchStock"
      @select-period="selectPeriod"
    />

    <section v-else class="workspace">
      <AppTopBar
        :active-view="activeView"
        :current-period="currentPeriod"
        :periods="periods"
        :period-relation-types="periodRelationTypes"
        :period-stages="periodStages"
        :read-only="isAllPeriods"
        :save-status="saveStatus"
        @update-relation="updatePeriodRelation"
        @update-stage="updatePeriodStage"
        @update-view="activeView = $event"
        @open-period-panel="showPeriodPanel = true"
        @save="saveCurrentPeriod"
      />

      <main class="display-area">
        <LineChartView
          v-if="activeView === 'chart'"
          :current-period="currentPeriod"
          :periods="isAllPeriods ? periods : []"
        />
        <GroupedTableView
          v-else
          :current-period="currentPeriod"
          :read-only="isAllPeriods"
          @add-group="addGroup"
          @remove-group="removeGroup"
          @add-row="addRow"
          @remove-row="removeRow"
          @update-row="updateRow"
        />
      </main>
    </section>
  </div>
</template>

<script>
import AppTopBar from './components/AppTopBar.vue'
import KlinePreviewView from './components/KlinePreviewView.vue'
import PeriodPanel from './components/PeriodPanel.vue'
import {
  PERIOD_STAGES,
  PERIOD_RELATION_TYPES,
  calculatePeriodTimeRange,
  createGroup,
  createPeriodData,
  createPeriodForSave,
  createRow,
  getDefaultSegmentStage,
  getNextRowDate
} from './utils/periodData'
import { createWatchStock as createWatchStockData, createWatchlist } from './utils/watchlistData'

const ALL_PERIODS_ID = '__all__'

export default {
  name: 'App',
  components: {
    AppTopBar,
    GroupedTableView: () => import('./components/GroupedTableView.vue'),
    KlinePreviewView,
    LineChartView: () => import('./components/LineChartView.vue'),
    PeriodPanel
  },
  data() {
    return {
      activeView: 'chart',
      currentPeriodId: '',
      deletingPeriodId: '',
      periodRelationTypes: PERIOD_RELATION_TYPES,
      periodStages: PERIOD_STAGES,
      periods: [],
      previewStockId: '',
      saveStatus: {
        text: '未保存',
        type: 'idle'
      },
      showPeriodPanel: true,
      watchlist: []
    }
  },
  computed: {
    isAllPeriods() {
      return this.currentPeriodId === ALL_PERIODS_ID
    },
    allPeriodsView() {
      return {
        id: ALL_PERIODS_ID,
        title: '全部周期',
        groups: this.periods.flatMap(period => period.groups.map(group => ({
          ...group,
          id: `${period.id}__${group.id}`,
          periodId: period.id,
          name: `${period.title} / ${group.name || '未命名股票'}`,
          rows: group.rows.map(row => ({
            ...row,
            id: `${period.id}__${group.id}__${row.id}`
          }))
        })))
      }
    },
    sortedPeriods() {
      return this.periods
        .map(period => ({
          ...period,
          timeRange: calculatePeriodTimeRange(period)
        }))
        .sort((left, right) => {
          const rightDate = right.timeRange.endDate || right.timeRange.startDate || ''
          const leftDate = left.timeRange.endDate || left.timeRange.startDate || ''

          return rightDate.localeCompare(leftDate)
        })
    },
    currentPeriod() {
      if (this.isAllPeriods) return this.allPeriodsView

      return this.periods.find(period => period.id === this.currentPeriodId) || this.periods[0] || createPeriodData()
    },
    previewStock() {
      return this.watchlist.find(stock => stock.id === this.previewStockId) || null
    }
  },
  created() {
    this.loadPeriods()
    this.loadWatchlist()
  },
  methods: {
    async loadPeriods() {
      try {
        const response = await fetch('/api/periods')

        if (!response.ok) throw new Error('api unavailable')

        const periods = await response.json()
        this.periods = periods.map(createPeriodData)
      } catch {
        this.periods = []
        this.saveStatus = {
          text: '本地文件接口不可用',
          type: 'warn'
        }
      }

      this.currentPeriodId = this.periods[0] ? this.periods[0].id : ''
    },
    async loadWatchlist() {
      try {
        const response = await fetch('/api/watchlist')

        if (!response.ok) throw new Error('api unavailable')

        const watchlist = await response.json()
        this.watchlist = createWatchlist(watchlist)
      } catch {
        this.watchlist = []
      }
    },
    selectPeriod(periodId) {
      this.currentPeriodId = periodId
      this.activeView = 'chart'
      this.showPeriodPanel = false
      this.saveStatus = periodId === ALL_PERIODS_ID
        ? {
          text: '全部周期为只读视图',
          type: 'warn'
        }
        : {
          text: '未保存',
          type: 'idle'
        }
    },
    createPeriod(title) {
      const period = createPeriodData({ title: title.trim(), groups: [] })
      this.periods.push(period)
      this.currentPeriodId = period.id
      this.showPeriodPanel = false
      this.activeView = 'chart'
      this.saveStatus = {
        text: '新增周期未保存',
        type: 'warn'
      }
    },
    async createWatchStock(keyword) {
      this.saveStatus = {
        text: '正在查询行情...',
        type: 'idle'
      }

      try {
        const response = await fetch(`/api/stock/lookup?keyword=${encodeURIComponent(keyword)}`)

        if (!response.ok) {
          const error = await response.json().catch(() => ({}))
          throw new Error(error.message || 'lookup failed')
        }

        const stock = createWatchStockData(await response.json())
        const existingIndex = this.watchlist.findIndex(item => item.secid && item.secid === stock.secid)

        if (existingIndex >= 0) {
          this.watchlist.splice(existingIndex, 1, stock)
          await this.saveWatchlist('自选股票已更新')
          return
        }

        this.watchlist.push(stock)
        await this.saveWatchlist('自选股票已添加')
      } catch (error) {
        this.saveStatus = {
          text: `查询失败：${error.message || '请确认股票名称/代码正确，并正在使用 npm run serve'}`,
          type: 'warn'
        }
      }
    },
    async deleteWatchStock(stockId) {
      const stock = this.watchlist.find(item => item.id === stockId)
      if (!stock) return

      const confirmed = await this.confirmDelete(`确认删除自选股票「${stock.name}」吗？`)
      if (!confirmed) return

      this.watchlist = this.watchlist.filter(item => item.id !== stockId)
      await this.saveWatchlist('自选股票已删除')
    },
    previewWatchStock(stockId) {
      this.previewStockId = stockId
    },
    async updateWatchStockDrawings(drawings) {
      const stock = this.watchlist.find(item => item.id === this.previewStockId)
      if (!stock) return

      stock.drawings = drawings
      await this.saveWatchlist('画线已保存')
    },
    async saveWatchlist(successText = '自选股票已保存') {
      this.saveStatus = {
        text: '保存中...',
        type: 'idle'
      }

      try {
        const response = await fetch('/api/watchlist', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.watchlist)
        })

        if (!response.ok) throw new Error('save failed')

        this.saveStatus = {
          text: successText,
          type: 'success'
        }
      } catch {
        this.saveStatus = {
          text: '自选保存失败，请确认正在使用 npm run serve',
          type: 'warn'
        }
      }
    },
    updatePeriodStage(stage) {
      if (this.isAllPeriods) return

      this.currentPeriod.stage = stage
      this.saveStatus = {
        text: '周期阶段未保存',
        type: 'warn'
      }
    },
    updatePeriodRelation(relation) {
      if (this.isAllPeriods) return

      this.currentPeriod.sourcePeriodId = relation.sourcePeriodId
      this.currentPeriod.relationType = relation.relationType
      this.saveStatus = {
        text: '周期关联未保存',
        type: 'warn'
      }
    },
    async deletePeriod(periodId) {
      const period = this.periods.find(item => item.id === periodId)
      if (!period) return

      const confirmed = await this.confirmDelete(
        `确认删除周期「${period.title}」吗？对应本地 JSON 文件也会删除。`
      )
      if (!confirmed) return

      this.deletingPeriodId = periodId
      this.saveStatus = {
        text: '删除中...',
        type: 'idle'
      }

      try {
        const response = await fetch(`/api/periods/${encodeURIComponent(period.id)}`, {
          method: 'DELETE'
        })

        if (!response.ok) throw new Error('delete failed')

        this.periods = this.periods.filter(item => item.id !== periodId)

        if (this.currentPeriodId === periodId) {
          this.currentPeriodId = this.periods[0] ? this.periods[0].id : ''
        }

        this.saveStatus = {
          text: '周期已删除',
          type: 'success'
        }
      } catch {
        this.saveStatus = {
          text: '删除失败，请确认正在使用 npm run serve',
          type: 'warn'
        }
      } finally {
        this.deletingPeriodId = ''
      }
    },
    addGroup() {
      if (this.isAllPeriods) return

      this.currentPeriod.groups.push(createGroup(this.currentPeriod.groups.length + 1))
    },
    removeGroup(groupId) {
      if (this.isAllPeriods) return

      if (this.currentPeriod.groups.length === 1) return
      const group = this.currentPeriod.groups.find(item => item.id === groupId)
      if (!group) return

      this.confirmDelete(`确认删除股票「${group.name || '未命名股票'}」吗？该股票下的数据也会删除。`)
        .then(confirmed => {
          if (!confirmed) return

          const index = this.currentPeriod.groups.findIndex(group => group.id === groupId)
          if (index >= 0) this.currentPeriod.groups.splice(index, 1)
        })
    },
    addRow(groupId) {
      if (this.isAllPeriods) return

      const group = this.currentPeriod.groups.find(item => item.id === groupId)
      if (group) group.rows.push(createRow({ date: getNextRowDate(group.rows) }))
    },
    removeRow(groupId, rowId) {
      if (this.isAllPeriods) return

      const group = this.currentPeriod.groups.find(item => item.id === groupId)
      if (!group || group.rows.length === 1) return

      this.confirmDelete('确认删除这一行数据吗？')
        .then(confirmed => {
          if (!confirmed) return

          const index = group.rows.findIndex(row => row.id === rowId)
          if (index >= 0) group.rows.splice(index, 1)
        })
    },
    async confirmDelete(message) {
      try {
        await this.$confirm(message, '删除确认', {
          confirmButtonText: '确认删除',
          cancelButtonText: '取消',
          type: 'warning',
          closeOnClickModal: false,
          distinguishCancelAndClose: true
        })

        return true
      } catch {
        return false
      }
    },
    updateRow(groupId, rowId, field, value) {
      if (this.isAllPeriods) return

      const group = this.currentPeriod.groups.find(item => item.id === groupId)
      if (!group) return

      const row = group.rows.find(item => item.id === rowId)
      if (!row) return

      if (field === 'note') {
        const previousDefaultSegmentStage = getDefaultSegmentStage(row.note)
        const nextDefaultSegmentStage = getDefaultSegmentStage(value)

        row.note = value
        if (!row.segmentStage || row.segmentStage === previousDefaultSegmentStage) {
          row.segmentStage = nextDefaultSegmentStage
        }
        return
      }

      row[field] = value
    },
    async saveCurrentPeriod() {
      if (this.isAllPeriods) {
        this.saveStatus = {
          text: '全部周期为只读视图',
          type: 'warn'
        }
        return
      }

      const period = this.currentPeriod
      const periodForSave = createPeriodForSave(period)
      this.saveStatus = {
        text: '保存中...',
        type: 'idle'
      }

      try {
        const response = await fetch(`/api/periods/${encodeURIComponent(period.title)}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(periodForSave)
        })

        if (!response.ok) throw new Error('save failed')

        this.saveStatus = {
          text: '已保存到 data/periods',
          type: 'success'
        }
      } catch {
        this.saveStatus = {
          text: '保存失败，请确认正在使用 npm run serve',
          type: 'warn'
        }
      }
    }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  height: 100%;
  overflow: hidden;
  background: #eef3fb;
}

body > div {
  height: 100%;
}

button,
input {
  font: inherit;
}

button {
  cursor: pointer;
}

#app {
  height: 100vh;
  overflow: hidden;
  color: #172033;
  font-family: Inter, "Segoe UI", Helvetica, Arial, sans-serif;
}

.period-panel,
.workspace {
  height: 100vh;
  overflow: hidden;
}

.period-panel {
  display: grid;
  grid-template-columns: 280px 1fr;
  background: radial-gradient(circle at top left, #dbeafe 0, #f7f9fc 38%, #eef3fb 100%);
}

.period-sidebar {
  padding: 34px 24px;
  color: #fff;
  background: #111827;
}

.brand-block {
  display: flex;
  gap: 14px;
  align-items: center;
  margin-bottom: 42px;
}

.brand-mark {
  width: 42px;
  height: 42px;
  border-radius: 16px;
  background: linear-gradient(135deg, #5b8cff, #25c2a0);
  box-shadow: 0 18px 34px rgba(91, 140, 255, 0.35);
}

.eyebrow {
  margin: 0 0 6px;
  color: #72809a;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.brand-block .eyebrow {
  color: #9ca3af;
}

h1,
h2 {
  margin: 0;
}

.side-item,
.tab-btn,
.primary-btn,
.ghost-btn,
.add-row-btn,
.period-card,
.text-btn {
  border: 0;
}

.side-item {
  width: 100%;
  padding: 14px 16px;
  border-radius: 14px;
  color: #e5e7eb;
  text-align: left;
  background: rgba(255, 255, 255, 0.1);
}

.side-item.active {
  color: #fff;
  background: rgba(91, 140, 255, 0.35);
}

.period-content {
  min-width: 0;
  overflow: auto;
  padding: 44px;
}

.content-head,
.section-head,
.topbar,
.group-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
}

.period-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 18px;
  margin-top: 30px;
}

.period-status {
  margin: 18px 0 0;
  font-size: 13px;
  font-weight: 700;
}

.period-status.success {
  color: #039855;
}

.period-status.warn {
  color: #b54708;
}

.period-create-form {
  display: flex;
  gap: 10px;
}

.period-create-form input {
  width: 220px;
  padding: 11px 14px;
  border: 1px solid #d0d7e2;
  border-radius: 14px;
  color: #172033;
  background: #fff;
}

.period-card {
  cursor: pointer;
  position: relative;
  min-height: 190px;
  padding: 20px;
  border: 1px solid #d9e2f1;
  border-radius: 24px;
  color: #172033;
  text-align: left;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.96), rgba(248, 251, 255, 0.92));
  box-shadow: 0 20px 55px rgba(31, 41, 55, 0.08);
  transition: border-color 0.18s ease, box-shadow 0.18s ease, transform 0.18s ease;
}

.period-card:hover {
  border-color: #9db7ff;
  box-shadow: 0 24px 60px rgba(37, 99, 235, 0.14);
  transform: translateY(-2px);
}

.period-card-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 14px;
  margin-bottom: 18px;
}

.period-card-title {
  color: #172033;
  font-size: 21px;
  font-weight: 800;
  line-height: 1.25;
}

.period-card strong {
  flex: 0 0 auto;
  padding: 5px 9px;
  border-radius: 999px;
  color: #175cd3;
  font-size: 12px;
  background: #eff6ff;
}

.period-card-summary {
  min-height: 62px;
  margin-bottom: 18px;
  padding: 14px;
  border-radius: 18px;
  color: #344054;
  font-size: 13px;
  font-weight: 700;
  background: #f4f7fb;
}

.period-card small {
  color: #72809a;
}

.period-stage-badge {
  display: inline-flex;
  align-items: center;
  margin-bottom: 14px;
  padding: 8px 12px;
  border-radius: 999px;
  color: #fff;
  font-size: 13px;
  font-weight: 800;
  background: linear-gradient(135deg, #2563eb, #25c2a0);
  box-shadow: 0 12px 24px rgba(37, 99, 235, 0.18);
}

.period-range-box {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
  margin-bottom: 10px;
}

.period-range-box div {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  background: #f8fbff;
}

.period-range-box small {
  flex: 0 0 auto;
  color: #72809a;
  font-size: 12px;
}

.period-range-box b {
  flex: 1;
  color: #172033;
  font-size: 13px;
  text-align: right;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.period-relation-box {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 8px;
  align-items: center;
  margin-bottom: 16px;
  padding: 10px 12px;
  border: 1px dashed #c7d7fe;
  border-radius: 16px;
  background: #f8fbff;
}

.period-relation-box small {
  color: #72809a;
  font-size: 12px;
}

.period-relation-box b {
  overflow: hidden;
  color: #172033;
  font-size: 13px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.period-relation-box i {
  padding: 4px 8px;
  border-radius: 999px;
  color: #175cd3;
  font-size: 12px;
  font-style: normal;
  font-weight: 800;
  background: #eff6ff;
}

.period-card-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.period-delete-btn {
  padding: 7px 10px;
  border: 0;
  border-radius: 10px;
  color: #d92d20;
  font-size: 12px;
  font-weight: 700;
  background: #fff1f0;
}

.period-delete-btn:disabled {
  cursor: not-allowed;
  opacity: 0.55;
}

.global-period-card {
  border-color: #5b8cff;
  background: linear-gradient(135deg, #eff6ff, #ffffff);
}

.global-period-card span {
  color: #175cd3;
}

.workspace {
  display: grid;
  grid-template-rows: auto 1fr;
  min-height: 0;
  background: #eef3fb;
}

.topbar {
  min-height: 92px;
  padding: 18px 28px;
  background: rgba(255, 255, 255, 0.92);
  border-bottom: 1px solid #dce5f3;
}

.title-block {
  display: grid;
  gap: 6px;
}

.period-stage-select {
  width: 150px;
  padding: 8px 10px;
  border: 1px solid #d0d7e2;
  border-radius: 12px;
  color: #172033;
  background: #fff;
}

.period-relation-controls {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.period-relation-select {
  width: 150px;
  padding: 8px 10px;
  border: 1px solid #d0d7e2;
  border-radius: 12px;
  color: #172033;
  background: #fff;
}

.view-tabs {
  display: flex;
  padding: 6px;
  border-radius: 18px;
  background: #e8eef8;
}

.tab-btn {
  min-width: 92px;
  padding: 11px 18px;
  border-radius: 14px;
  color: #667085;
  background: transparent;
}

.tab-btn.active {
  color: #172033;
  background: #fff;
  box-shadow: 0 10px 24px rgba(31, 41, 55, 0.12);
}

.top-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.primary-btn,
.ghost-btn,
.add-row-btn {
  padding: 11px 16px;
  border-radius: 14px;
  font-weight: 700;
}

.primary-btn {
  color: #fff;
  background: #2563eb;
  box-shadow: 0 12px 26px rgba(37, 99, 235, 0.24);
}

.ghost-btn,
.add-row-btn {
  color: #334155;
  background: #edf2fb;
}

.ghost-btn.danger,
.text-btn {
  color: #d92d20;
}

.save-state {
  color: #72809a;
  font-size: 13px;
}

.save-state.success {
  color: #039855;
}

.save-state.warn {
  color: #b54708;
}

.display-area {
  min-height: 0;
  overflow: auto;
  padding: 28px;
}

.chart-card,
.table-card,
.group-card {
  border: 1px solid #dce5f3;
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 24px 65px rgba(31, 41, 55, 0.08);
}

.chart-card {
  display: grid;
  height: 100%;
  min-height: 0;
  grid-template-rows: auto minmax(0, 1fr);
  gap: 24px;
  padding: 24px;
}

.table-card {
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  gap: 18px;
  height: 100%;
  min-height: 0;
  padding: 24px 24px 20px;
}

.chart-shell {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 0;
  border-radius: 22px;
  overflow: hidden;
  background: #fbfdff;
}

.chart-host {
  width: 100%;
  height: 100%;
  min-height: 0;
}

.chart-stage-layer {
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
}

.chart-stage-label {
  position: absolute;
  transform: translate(-50%, -140%);
  padding: 2px 7px;
  border: 1px solid currentColor;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 800;
  line-height: 1.4;
  background: rgba(255, 255, 255, 0.88);
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.12);
  white-space: nowrap;
}

.chart-key-node {
  position: absolute;
  top: 28px;
  bottom: 78px;
  width: 0;
  border-left: 2px dashed var(--marker-color, #dc2626);
  opacity: 0.9;
}

.chart-key-node span {
  position: absolute;
  top: -2px;
  left: 6px;
  padding: 3px 8px;
  border-radius: 999px;
  color: var(--marker-color, #991b1b);
  font-size: 12px;
  font-weight: 800;
  line-height: 1.4;
  background: var(--marker-fill, rgba(254, 226, 226, 0.95));
  box-shadow: 0 4px 12px rgba(153, 27, 27, 0.16);
  white-space: nowrap;
}

.chart-shell.is-draggable {
  cursor: grab;
  touch-action: none;
}

.chart-shell.is-draggable:active {
  cursor: grabbing;
}

.chart-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.chart-actions span {
  margin-right: 4px;
  color: #72809a;
  font-size: 13px;
}

.chart-actions button {
  padding: 7px 10px;
  border: 0;
  border-radius: 10px;
  color: #334155;
  font-size: 12px;
  font-weight: 700;
  background: #edf2fb;
}

.chart-actions button:disabled {
  cursor: not-allowed;
  opacity: 0.45;
}

.period-filters {
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  gap: 8px;
  max-height: 72px;
  overflow: auto;
}

.period-filter {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 10px;
  border: 1px solid #dce5f3;
  border-radius: 999px;
  color: #475467;
  font-size: 13px;
  background: #fff;
  cursor: pointer;
  white-space: nowrap;
}

.period-filter input {
  margin: 0;
  accent-color: #2563eb;
}

.watchlist-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 14px;
}

.watch-stock-card {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 14px;
  align-items: center;
  padding: 16px;
  border: 1px solid rgba(148, 163, 184, 0.24);
  border-radius: 20px;
  background:
    radial-gradient(circle at top left, rgba(37, 99, 235, 0.08), transparent 34%),
    linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(248, 250, 252, 0.92));
  box-shadow: 0 16px 34px rgba(15, 23, 42, 0.07);
}

.watch-stock-main {
  display: flex;
  min-width: 0;
  gap: 12px;
  align-items: center;
}

.watch-stock-avatar {
  display: grid;
  flex: 0 0 auto;
  width: 42px;
  height: 42px;
  place-items: center;
  border-radius: 14px;
  color: #fff;
  font-weight: 900;
  background: linear-gradient(135deg, #2563eb, #7c3aed);
  box-shadow: 0 10px 22px rgba(37, 99, 235, 0.22);
}

.watch-stock-card h3 {
  overflow: hidden;
  margin: 0;
  color: #172033;
  font-size: 20px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.watch-stock-card small {
  display: block;
  margin-top: 4px;
  color: #64748b;
  font-size: 12px;
}

.watch-change {
  color: #64748b;
  font-size: 24px;
  justify-self: end;
}

.watch-change.positive {
  color: #dc2626;
}

.watch-change.negative {
  color: #16a34a;
}

.watch-stock-actions {
  display: flex;
  grid-column: 1 / -1;
  gap: 10px;
  align-items: center;
  justify-content: flex-end;
  padding-top: 10px;
  border-top: 1px solid rgba(148, 163, 184, 0.18);
}

.kline-page {
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  gap: 18px;
  height: 100%;
  padding: 24px;
  background: #eef3fb;
}

.kline-head {
  display: flex;
  justify-content: space-between;
  gap: 18px;
  align-items: center;
  padding: 20px 22px;
  border: 1px solid #dce5f3;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.92);
  box-shadow: 0 24px 65px rgba(31, 41, 55, 0.08);
}

.kline-head h1 {
  margin: 4px 0;
  color: #172033;
}

.kline-head small {
  color: #72809a;
}

.kline-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: flex-end;
}

.kline-actions button {
  padding: 9px 12px;
  border: 0;
  border-radius: 12px;
  color: #334155;
  font-weight: 800;
  background: #edf2fb;
}

.kline-actions button.active {
  color: #fff;
  background: #2563eb;
}

.kline-actions button:disabled {
  cursor: not-allowed;
  opacity: 0.45;
}

.kline-chart-box {
  min-height: 0;
  overflow: hidden;
  border: 1px solid #dce5f3;
  border-radius: 26px;
  background: #fbfdff;
  box-shadow: 0 24px 65px rgba(31, 41, 55, 0.08);
}

.kline-svg {
  display: block;
  width: 100%;
  height: 100%;
  cursor: crosshair;
}

.kline-axis {
  stroke: #9aa8bd;
  stroke-width: 1;
}

.kline-grid {
  stroke: #e0e7f1;
  stroke-dasharray: 5 7;
}

.kline-label {
  fill: #667085;
  font-size: 12px;
}

.candle-wick,
.candle-body {
  stroke-width: 1.5;
}

.candle-wick.up,
.candle-body.up {
  stroke: #dc2626;
  fill: #dc2626;
}

.candle-wick.down,
.candle-body.down {
  stroke: #16a34a;
  fill: #16a34a;
}

.volume-bar.up {
  fill: rgba(220, 38, 38, 0.28);
}

.volume-bar.down {
  fill: rgba(22, 163, 74, 0.28);
}

.drawing-line {
  stroke: #f59e0b;
  stroke-width: 2.5;
  stroke-linecap: round;
  cursor: pointer;
}

.drawing-line.selected {
  stroke: #2563eb;
  stroke-width: 4;
}

.drawing-line.preview {
  opacity: 0.45;
  stroke-dasharray: 6 6;
}

.snap-point {
  fill: #f59e0b;
  stroke: #fff;
  stroke-width: 2;
  filter: drop-shadow(0 2px 5px rgba(245, 158, 11, 0.45));
}

.compact-chart-tooltip,
.compact-chart-tooltip * {
  box-sizing: border-box;
}

.compact-chart-tooltip {
  width: auto !important;
  height: auto !important;
  min-width: 0 !important;
  min-height: 0 !important;
  max-width: 260px !important;
  max-height: none !important;
  overflow: hidden !important;
  font-size: 12px;
  line-height: 1.45;
}

.compact-chart-tooltip [class*="title"] {
  display: none !important;
}

.compact-chart-tooltip [class*="content"],
.compact-chart-tooltip .stock-tooltip {
  margin: 0 !important;
  padding: 0 !important;
}

.stock-tooltip {
  width: max-content;
  max-width: 240px;
  padding: 10px !important;
  overflow: hidden;
  color: #172033;
  white-space: normal;
}

.stock-tooltip strong {
  font-weight: 700;
}

.chart-wrap {
  display: grid;
  grid-template-rows: minmax(0, 1fr) auto;
  min-height: 0;
  margin-top: 24px;
}

.line-chart {
  display: block;
  width: 100%;
  height: 100%;
  min-height: 0;
  border-radius: 22px;
  background: linear-gradient(180deg, #fbfdff, #f4f7fb);
}

.grid-line {
  stroke: #e0e7f1;
  stroke-dasharray: 5 7;
}

.axis-line,
.x-tick {
  stroke: #9aa8bd;
}

.axis-label {
  fill: #667085;
  font-size: 12px;
}

.y-label {
  text-anchor: end;
}

.x-label {
  text-anchor: middle;
}

.series-line {
  fill: none;
  stroke-width: 3.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.series-point {
  stroke: #fff;
  stroke-width: 2;
}

.legend-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 18px;
}

.legend-list span {
  display: inline-flex;
  gap: 8px;
  align-items: center;
  padding: 8px 12px;
  border-radius: 999px;
  color: #344054;
  background: #f4f7fb;
}

.legend-list i {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.empty-state {
  display: grid;
  min-height: 360px;
  place-items: center;
  color: #72809a;
}

.group-card {
  margin-top: 18px;
  padding: 18px;
}

.stock-table-layout {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  gap: 18px;
  height: 100%;
  min-height: 0;
}

.stock-list-panel,
.stock-data-panel {
  border: 1px solid #dce5f3;
  border-radius: 22px;
  background: #fff;
}

.stock-list-panel {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 0;
  overflow: auto;
  padding: 12px;
}

.stock-list-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 12px;
  border: 1px solid transparent;
  border-radius: 16px;
  color: #344054;
  text-align: left;
  background: #f7f9fc;
}

.stock-list-item.active {
  border-color: #5b8cff;
  color: #175cd3;
  background: #eff6ff;
}

.stock-list-item span {
  font-weight: 800;
}

.stock-list-item small {
  color: #72809a;
}

.stock-data-panel {
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  gap: 16px;
  min-width: 0;
  min-height: 0;
  padding: 18px 18px 20px;
}

.group-actions {
  display: flex;
  gap: 10px;
  align-items: center;
}

.stock-grid {
  width: 100%;
  height: 100%;
  min-height: 0;
}

.ag-date-editor,
.ag-stage-select,
.ag-note-select {
  width: 100%;
  height: 32px;
  padding: 0 10px;
  border: 1px solid #d9e2f1;
  border-radius: 8px;
  outline: 0;
  background: #fff;
}

.ag-stage-select:disabled,
.ag-note-select:disabled {
  color: #475467;
  background: #f7f9fc;
}

.ag-action-btn {
  border: 0;
  color: #d92d20;
  background: transparent;
}

.group-name {
  width: min(320px, 70%);
  padding: 12px 14px;
  border: 1px solid #d0d7e2;
  border-radius: 14px;
  font-weight: 800;
}

.group-name:disabled {
  color: #475467;
  background: #f7f9fc;
}

.stock-role-select {
  width: 150px;
  padding: 11px 12px;
  border: 1px solid #d0d7e2;
  border-radius: 14px;
  color: #172033;
  background: #fff;
}

.stock-role-select:disabled {
  color: #475467;
  background: #f7f9fc;
}

.table-scroll {
  overflow-x: auto;
  margin-top: 16px;
}

table {
  width: 100%;
  border-collapse: collapse;
  min-width: 760px;
}

th,
td {
  padding: 12px;
  border-bottom: 1px solid #e6edf7;
  text-align: left;
}

th {
  color: #667085;
  font-size: 13px;
}

td input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d9e2f1;
  border-radius: 12px;
  color: #172033;
  background: #fff;
}

.computed-value {
  display: inline-flex;
  min-width: 90px;
  padding: 10px 12px;
  border-radius: 12px;
  color: #175cd3;
  font-weight: 700;
  background: #eff6ff;
}

.text-btn {
  background: transparent;
}

.add-row-btn {
  margin-top: 0;
}

@media (max-width: 860px) {
  .period-panel {
    grid-template-columns: 1fr;
  }

  .period-sidebar {
    padding: 22px;
  }

  .period-content,
  .display-area {
    padding: 18px;
  }

  .topbar,
  .content-head,
  .section-head,
  .group-head {
    align-items: stretch;
    flex-direction: column;
  }

  .top-actions,
  .view-tabs,
  .period-create-form {
    width: 100%;
  }

  .period-create-form {
    flex-direction: column;
  }

  .period-create-form input {
    width: 100%;
  }

  .top-actions {
    flex-wrap: wrap;
  }

  .group-actions {
    flex-wrap: wrap;
  }

  .stock-role-select,
  .group-name {
    width: 100%;
  }

  .tab-btn {
    flex: 1;
  }

  .chart-card,
  .table-card {
    min-height: auto;
    padding: 18px;
  }

  .stock-table-layout {
    grid-template-columns: 1fr;
  }

  .stock-list-panel {
    flex-direction: row;
    max-height: 120px;
    overflow-x: auto;
  }

  .stock-list-item {
    min-width: 150px;
  }
}
</style>
