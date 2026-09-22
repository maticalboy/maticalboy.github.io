<template>
  <section class="table-card">
    <div class="section-head">
      <div>
        <p class="eyebrow">股票表格</p>
        <h2>左侧选择股票，右侧编辑数据</h2>
      </div>
      <button v-if="!readOnly" class="primary-btn" type="button" @click="addGroup">新增股票</button>
    </div>

    <div v-if="currentPeriod.groups.length" class="stock-table-layout">
      <aside class="stock-list-panel">
        <button
          v-for="group in currentPeriod.groups"
          :key="group.id"
          :class="['stock-list-item', { active: group.id === selectedGroupId }]"
          type="button"
          @click="selectedGroupId = group.id"
        >
          <span>{{ group.name || '未命名股票' }}</span>
          <small>{{ group.rows.length }} 条数据</small>
        </button>
      </aside>

      <article class="stock-data-panel">
        <div class="group-head">
          <input
            v-model="selectedGroup.name"
            class="group-name"
            :disabled="readOnly"
            aria-label="股票名称"
            placeholder="股票名称"
          />
          <div v-if="!readOnly" class="group-actions">
            <button class="add-row-btn" type="button" @click="$emit('add-row', selectedGroup.id)">添加</button>
            <button class="ghost-btn danger" type="button" @click="removeSelectedGroup">删除股票</button>
          </div>
        </div>

        <AgGridVue
          class="ag-theme-alpine stock-grid"
          :column-defs="visibleColumnDefs"
          :context="gridContext"
          :default-col-def="defaultColDef"
          :get-row-id="getRowId"
          :row-data="getRowData(selectedGroup)"
          :suppress-scroll-on-new-data="true"
          :stop-editing-when-cells-lose-focus="true"
          @cell-value-changed="onCellValueChanged"
        />

      </article>
    </div>

    <div v-else class="empty-state">
      {{ readOnly ? '全部周期里还没有股票数据。' : '还没有股票数据，点击“新增股票”开始录入。' }}
    </div>
  </section>
</template>

<script>
import { AgGridVue } from 'ag-grid-vue'
import { calculateTotalChangeMap } from '../utils/periodData'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'

function isValidDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false

  const [year, month, day] = value.split('-').map(Number)
  const date = new Date(year, month - 1, day)

  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day
}

export default {
  name: 'GroupedTableView',
  components: {
    AgGridVue
  },
  props: {
    currentPeriod: {
      type: Object,
      required: true
    },
    readOnly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selectedGroupId: '',
      defaultColDef: {
        flex: 1,
        minWidth: 130,
        resizable: true,
        sortable: true
      },
      columnDefs: [
        {
          field: 'date',
          headerName: '日期',
          editable: false,
          cellRenderer: this.dateCellRenderer,
          minWidth: 160
        },
        {
          field: 'change',
          headerName: '当日涨幅',
          editable: true,
          valueParser: this.numberValueParser,
          valueFormatter: this.percentValueFormatter
        },
        {
          field: 'totalChange',
          headerName: '总涨幅',
          editable: false,
          valueFormatter: this.percentValueFormatter
        },
        {
          field: 'note',
          headerName: '标注',
          editable: true,
          minWidth: 180
        },
        {
          headerName: '操作',
          field: 'actions',
          editable: false,
          sortable: false,
          minWidth: 110,
          cellRenderer: this.actionCellRenderer
        }
      ]
    }
  },
  computed: {
    visibleColumnDefs() {
      return this.columnDefs
        .filter(column => !this.readOnly || column.field !== 'actions')
        .map(column => ({
          ...column,
          editable: this.readOnly ? false : column.editable
        }))
    },
    selectedGroup() {
      return this.currentPeriod.groups.find(group => group.id === this.selectedGroupId) || this.currentPeriod.groups[0]
    },
    gridContext() {
      return {
        componentParent: this
      }
    }
  },
  watch: {
    'currentPeriod.groups.length': {
      immediate: true,
      handler() {
        const groups = this.currentPeriod.groups

        if (!groups.length) {
          this.selectedGroupId = ''
          return
        }

        if (!groups.some(group => group.id === this.selectedGroupId)) {
          this.selectedGroupId = groups[0].id
        }
      }
    }
  },
  methods: {
    addGroup() {
      if (this.readOnly) return

      this.$emit('add-group')

      this.$nextTick(() => {
        const groups = this.currentPeriod.groups
        const lastGroup = groups[groups.length - 1]
        if (lastGroup) this.selectedGroupId = lastGroup.id
      })
    },
    getRowData(group) {
      const totals = calculateTotalChangeMap(group)

      return group.rows.map(row => ({
        ...row,
        groupId: group.id,
        totalChange: totals[row.id] == null ? '' : totals[row.id]
      }))
    },
    getRowId(params) {
      return params.data.id
    },
    onCellValueChanged(event) {
      if (this.readOnly) return
      if (!['change', 'note'].includes(event.colDef.field)) return

      this.$emit('update-row', event.data.groupId, event.data.id, event.colDef.field, event.newValue)
    },
    dateCellRenderer(params) {
      const input = document.createElement('input')
      input.className = 'ag-date-editor'
      input.type = 'date'
      input.disabled = params.context.componentParent.readOnly
      input.value = isValidDate(params.value) ? params.value : ''
      input.addEventListener('change', event => {
        if (params.context.componentParent.readOnly) return

        const value = event.target.value

        if (!value || !isValidDate(value)) return

        params.context.componentParent.$emit('update-row', params.data.groupId, params.data.id, 'date', value)
      })

      return input
    },
    numberValueParser(params) {
      if (params.newValue === '' || params.newValue == null) return ''

      const value = Number(params.newValue)
      return Number.isFinite(value) ? value : params.oldValue
    },
    percentValueFormatter(params) {
      if (params.value === '' || params.value == null) return '--'

      return `${params.value}%`
    },
    removeSelectedGroup() {
      if (this.readOnly) return

      const currentIndex = this.currentPeriod.groups.findIndex(group => group.id === this.selectedGroup.id)
      const nextGroup = this.currentPeriod.groups[currentIndex + 1] || this.currentPeriod.groups[currentIndex - 1]

      this.$emit('remove-group', this.selectedGroup.id)
      this.selectedGroupId = nextGroup ? nextGroup.id : ''
    },
    actionCellRenderer(params) {
      const button = document.createElement('button')
      button.className = 'ag-action-btn'
      button.type = 'button'
      button.textContent = '删除'
      button.addEventListener('click', () => {
        params.context.componentParent.$emit('remove-row', params.data.groupId, params.data.id)
      })

      return button
    }
  }
}
</script>
