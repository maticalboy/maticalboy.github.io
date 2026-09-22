function normalizeNumber(value) {
  if (value === '' || value == null) return ''

  const number = Number(value)
  return Number.isFinite(number) ? number : ''
}

function roundChange(value) {
  return Number(value.toFixed(4))
}

const holidaySet = new Set([
  '2024-01-01',
  '2024-02-09', '2024-02-12', '2024-02-13', '2024-02-14', '2024-02-15', '2024-02-16',
  '2024-04-04', '2024-04-05',
  '2024-05-01', '2024-05-02', '2024-05-03',
  '2024-06-10',
  '2024-09-16', '2024-09-17',
  '2024-10-01', '2024-10-02', '2024-10-03', '2024-10-04', '2024-10-07',
  '2025-01-01',
  '2025-01-28', '2025-01-29', '2025-01-30', '2025-01-31', '2025-02-03', '2025-02-04',
  '2025-04-04',
  '2025-05-01', '2025-05-02', '2025-05-05',
  '2025-06-02',
  '2025-10-01', '2025-10-02', '2025-10-03', '2025-10-06', '2025-10-07', '2025-10-08',
  '2026-01-01', '2026-01-02',
  '2026-02-16', '2026-02-17', '2026-02-18', '2026-02-19', '2026-02-20',
  '2026-04-06',
  '2026-05-01', '2026-05-04', '2026-05-05',
  '2026-06-19',
  '2026-09-25',
  '2026-10-01', '2026-10-02', '2026-10-05', '2026-10-06', '2026-10-07'
])

function isValidDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false

  const [year, month, day] = value.split('-').map(Number)
  const date = new Date(year, month - 1, day)

  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day
}

function formatDate(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

function isTradingDate(date) {
  const day = date.getDay()
  const dateText = formatDate(date)

  return day !== 0 && day !== 6 && !holidaySet.has(dateText)
}

function getSortedValidRows(group) {
  return group.rows
    .map((row, index) => ({ row, index }))
    .filter(({ row }) => row.date && normalizeNumber(row.change) !== '')
    .sort((left, right) => {
      const dateCompare = left.row.date.localeCompare(right.row.date)
      return dateCompare || left.index - right.index
    })
}

export function createRow(row = {}) {
  return {
    id: row.id || `row-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    change: normalizeNumber(row.change),
    totalChange: normalizeNumber(row.totalChange),
    date: row.date || '',
    note: row.note || ''
  }
}

export function getNextTradingDate(dateText) {
  if (!isValidDate(dateText)) return ''

  const [year, month, day] = dateText.split('-').map(Number)
  const date = new Date(year, month - 1, day)

  do {
    date.setDate(date.getDate() + 1)
  } while (!isTradingDate(date))

  return formatDate(date)
}

export function getNextRowDate(rows) {
  const previousRow = [...rows].reverse().find(row => isValidDate(row.date))

  return previousRow ? getNextTradingDate(previousRow.date) : ''
}

export function createGroup(index = 1, group = {}) {
  return {
    id: group.id || `group-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    name: group.name || `股票 ${index}`,
    rows: Array.isArray(group.rows) && group.rows.length ? group.rows.map(createRow) : [createRow()]
  }
}

export function createPeriodData(period = {}) {
  const stamp = new Date().toISOString().slice(0, 10)

  return {
    id: period.id || `period-${Date.now()}`,
    title: period.title || `${stamp} 周期`,
    groups: Array.isArray(period.groups)
      ? period.groups.map((group, index) => createGroup(index + 1, group))
      : []
  }
}

export function calculateTotalChangeMap(group) {
  const totals = {}
  let multiplier = 1

  getSortedValidRows(group).forEach(({ row }) => {
    multiplier *= 1 + Number(row.change) / 100
    totals[row.id] = roundChange((multiplier - 1) * 100)
  })

  return totals
}

export function getChartRows(group) {
  const totals = calculateTotalChangeMap(group)

  return getSortedValidRows(group).map(({ row }) => ({
    ...row,
    totalChange: totals[row.id]
  }))
}

export function createPeriodForSave(period) {
  return {
    ...period,
    groups: period.groups.map(group => {
      const totals = calculateTotalChangeMap(group)

      return {
        ...group,
        rows: group.rows.map(row => ({
          ...row,
          totalChange: totals[row.id] == null ? '' : totals[row.id]
        }))
      }
    })
  }
}
