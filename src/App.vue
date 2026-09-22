<template>
  <div id="app">
    <PeriodPanel
      v-if="showPeriodPanel"
      :deleting-period-id="deletingPeriodId"
      :periods="periods"
      :save-status="saveStatus"
      @create-period="createPeriod"
      @delete-period="deletePeriod"
      @select-period="selectPeriod"
    />

    <section v-else class="workspace">
      <AppTopBar
        :active-view="activeView"
        :current-period="currentPeriod"
        :read-only="isAllPeriods"
        :save-status="saveStatus"
        @update-view="activeView = $event"
        @open-period-panel="showPeriodPanel = true"
        @save="saveCurrentPeriod"
      />

      <main class="display-area">
        <LineChartView v-if="activeView === 'chart'" :current-period="currentPeriod" />
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
import PeriodPanel from './components/PeriodPanel.vue'
import { createGroup, createPeriodData, createPeriodForSave, createRow, getNextRowDate } from './utils/periodData'

const ALL_PERIODS_ID = '__all__'

export default {
  name: 'App',
  components: {
    AppTopBar,
    GroupedTableView: () => import('./components/GroupedTableView.vue'),
    LineChartView: () => import('./components/LineChartView.vue'),
    PeriodPanel
  },
  data() {
    return {
      activeView: 'chart',
      currentPeriodId: '',
      deletingPeriodId: '',
      periods: [],
      saveStatus: {
        text: '未保存',
        type: 'idle'
      },
      showPeriodPanel: true
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
          name: `${period.title} / ${group.name || '未命名股票'}`,
          rows: group.rows.map(row => ({
            ...row,
            id: `${period.id}__${group.id}__${row.id}`
          }))
        })))
      }
    },
    currentPeriod() {
      if (this.isAllPeriods) return this.allPeriodsView

      return this.periods.find(period => period.id === this.currentPeriodId) || this.periods[0] || createPeriodData()
    }
  },
  created() {
    this.loadPeriods()
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
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
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
  min-height: 150px;
  padding: 22px;
  border: 1px solid #d9e2f1;
  border-radius: 24px;
  color: #172033;
  text-align: left;
  background: rgba(255, 255, 255, 0.86);
  box-shadow: 0 20px 55px rgba(31, 41, 55, 0.08);
}

.period-card span,
.period-card strong,
.period-card small {
  display: block;
}

.period-card span {
  margin-bottom: 34px;
  font-size: 20px;
  font-weight: 800;
}

.period-card strong {
  margin-bottom: 6px;
  color: #5b8cff;
}

.period-card small {
  color: #72809a;
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

.chart-host {
  width: 100%;
  height: 100%;
  min-height: 0;
  border-radius: 22px;
  overflow: hidden;
  background: #fbfdff;
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

.ag-date-editor {
  width: 100%;
  height: 32px;
  padding: 0 10px;
  border: 1px solid #d9e2f1;
  border-radius: 8px;
  outline: 0;
  background: #fff;
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
