function normalizeNumber(value) {
  if (value === '' || value == null) return ''

  const number = Number(value)
  return Number.isFinite(number) ? number : ''
}

function roundPrice(value) {
  return Number(value.toFixed(2))
}

function formatDate(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

function getPreviousTradingDates(count) {
  const dates = []
  const date = new Date()

  while (dates.length < count) {
    const day = date.getDay()
    if (day !== 0 && day !== 6) dates.unshift(formatDate(date))
    date.setDate(date.getDate() - 1)
  }

  return dates
}

export function createSampleKlines(change = 0) {
  let close = 18

  return getPreviousTradingDates(36).map((date, index) => {
    const wave = Math.sin(index / 2.8) * 0.035 + Math.cos(index / 4) * 0.02
    const dayChange = index === 35 && normalizeNumber(change) !== '' ? Number(change) / 100 : wave
    const open = close
    close = Math.max(2, close * (1 + dayChange))
    const high = Math.max(open, close) * (1 + 0.018 + Math.abs(Math.sin(index)) * 0.015)
    const low = Math.min(open, close) * (1 - 0.018 - Math.abs(Math.cos(index)) * 0.012)

    return {
      date,
      open: roundPrice(open),
      high: roundPrice(high),
      low: roundPrice(low),
      close: roundPrice(close),
      volume: Math.round(60000 + Math.abs(Math.sin(index / 3)) * 90000 + index * 1200)
    }
  })
}

export function createWatchStock(stock = {}) {
  const change = normalizeNumber(stock.change)

  return {
    id: stock.id || `watch-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    name: stock.name || '自选股票',
    code: stock.code || '',
    secid: stock.secid || '',
    change,
    drawings: Array.isArray(stock.drawings) ? stock.drawings.map(drawing => ({
      id: drawing.id || `drawing-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      area: drawing.area || 'price',
      start: drawing.start || { x: 0, y: 0 },
      end: drawing.end || { x: 0, y: 0 }
    })) : [],
    klines: Array.isArray(stock.klines) && stock.klines.length ? stock.klines.map(kline => ({
      date: kline.date || '',
      open: normalizeNumber(kline.open),
      high: normalizeNumber(kline.high),
      low: normalizeNumber(kline.low),
      close: normalizeNumber(kline.close),
      volume: normalizeNumber(kline.volume)
    })) : createSampleKlines(change)
  }
}

export function createWatchlist(stocks = []) {
  return Array.isArray(stocks) ? stocks.map(createWatchStock) : []
}
