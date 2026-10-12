const fs = require('fs')
const https = require('https')
const path = require('path')
const { defineConfig } = require('@vue/cli-service')

const dataRootDir = path.join(__dirname, 'data')
const dataDir = path.join(dataRootDir, 'periods')
const watchlistFilePath = path.join(dataRootDir, 'watchlist.json')

function ensureDataDir() {
    if (!fs.existsSync(dataRootDir)) {
        fs.mkdirSync(dataRootDir, { recursive: true })
    }

    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true })
    }

    if (!fs.existsSync(watchlistFilePath)) {
        fs.writeFileSync(watchlistFilePath, '[]\n', 'utf8')
    }
}

function safeFileName(name) {
    const invalidChars = new Set(['<', '>', ':', '"', '/', '\\', '|', '?', '*'])

    return String(name)
        .split('')
        .filter(char => !invalidChars.has(char) && char.charCodeAt(0) >= 32)
        .join('')
        .replace(/[. ]+$/g, '')
        .trim()
}

function readJsonBody(req) {
    return new Promise((resolve, reject) => {
        let body = ''

        req.on('data', chunk => {
            body += chunk
        })

        req.on('end', () => {
            try {
                resolve(JSON.parse(body || '{}'))
            } catch (error) {
                reject(error)
            }
        })
    })
}

function fetchJson(url) {
    return new Promise((resolve, reject) => {
        const request = https.get(url, {
            headers: {
                Accept: 'application/json,text/plain,*/*',
                Referer: 'https://quote.eastmoney.com/',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        }, response => {
            let body = ''

            response.setEncoding('utf8')
            response.on('data', chunk => {
                body += chunk
            })
            response.on('end', () => {
                try {
                    resolve(JSON.parse(body))
                } catch (error) {
                    reject(error)
                }
            })
        })

        request.on('error', reject)
        request.setTimeout(12000, () => {
            request.destroy(new Error('request timeout'))
        })
    })
}

function normalizeStockCode(keyword) {
    return String(keyword || '')
        .trim()
        .toUpperCase()
        .replace(/^(SH|SZ|BJ)/, '')
        .replace(/\.(SH|SZ|BJ)$/, '')
}

function getSecidByCode(code) {
    if (!/^\d{6}$/.test(code)) return ''
    if (/^(5|6|9)/.test(code)) return `1.${code}`

    return `0.${code}`
}

function getSinaSymbolByCode(code) {
    if (!/^\d{6}$/.test(code)) return ''
    if (/^(5|6|9)/.test(code)) return `sh${code}`

    return `sz${code}`
}

async function searchStock(keyword) {
    const code = normalizeStockCode(keyword)
    const url = `https://searchapi.eastmoney.com/api/suggest/get?input=${encodeURIComponent(keyword)}&type=14&token=D43BF722C8E33ADE7A649B3323EAF9E6`

    try {
        const result = await fetchJson(url)
        const data = (result.QuotationCodeTable && result.QuotationCodeTable.Data) || result.Data || []
        const stock = data.find(item => item && (item.QuoteID || item.Code))

        if (stock) {
            return {
                code: stock.Code || '',
                name: stock.Name || '',
                secid: stock.QuoteID || getSecidByCode(stock.Code || '')
            }
        }
    } catch {
        // Code input can still use market inference if the search endpoint is unavailable.
    }

    if (/^\d{6}$/.test(code)) {
        return {
            code,
            name: code,
            secid: getSecidByCode(code)
        }
    }

    return null
}

function normalizeNumber(value) {
    const number = Number(value)
    return Number.isFinite(number) ? number : ''
}

function roundNumber(value, digits = 2) {
    return Number(Number(value).toFixed(digits))
}

function parseKlines(klines) {
    return klines
        .map(item => {
            const parts = String(item).split(',')

            return {
                date: parts[0] || '',
                open: normalizeNumber(parts[1]),
                close: normalizeNumber(parts[2]),
                high: normalizeNumber(parts[3]),
                low: normalizeNumber(parts[4]),
                volume: normalizeNumber(parts[5])
            }
        })
        .filter(item => item.date && item.open !== '' && item.close !== '' && item.high !== '' && item.low !== '')
        .slice(-180)
}

function parseSinaKlines(klines) {
    return klines
        .map(item => ({
            date: item.day || '',
            open: normalizeNumber(item.open),
            high: normalizeNumber(item.high),
            low: normalizeNumber(item.low),
            close: normalizeNumber(item.close),
            volume: normalizeNumber(item.volume)
        }))
        .filter(item => item.date && item.open !== '' && item.close !== '' && item.high !== '' && item.low !== '')
        .slice(-180)
}

async function fetchSinaKlines(code) {
    const symbol = getSinaSymbolByCode(code)
    if (!symbol) return []

    const url = `https://quotes.sina.cn/cn/api/json_v2.php/CN_MarketData.getKLineData?symbol=${symbol}&scale=240&ma=no&datalen=180`
    return parseSinaKlines(await fetchJson(url))
}

async function fetchStockWithKlines(keyword) {
    const stock = await searchStock(keyword)
    if (!stock || !stock.secid) return null

    let data = {}
    let klines = []

    try {
        klines = await fetchSinaKlines(stock.code)
    } catch {
        klines = []
    }

    if (!klines.length) {
        const url = `https://push2his.eastmoney.com/api/qt/stock/kline/get?secid=${encodeURIComponent(stock.secid)}&fields1=f1,f2,f3,f4,f5,f6&fields2=f51,f52,f53,f54,f55,f56,f57,f58,f59,f60,f61&klt=101&fqt=0&beg=0&end=20500101&lmt=180`
        const result = await fetchJson(url)
        data = result.data || {}
        klines = parseKlines(data.klines || [])
    }

    const lastKline = klines[klines.length - 1]
    const previousKline = klines[klines.length - 2]
    const change = lastKline && previousKline && previousKline.close
        ? roundNumber(((lastKline.close - previousKline.close) / previousKline.close) * 100)
        : ''

    return {
        code: data.code || stock.code || '',
        name: data.name || stock.name || stock.code || String(keyword).trim(),
        secid: stock.secid,
        change,
        klines
    }
}

module.exports = defineConfig({
    transpileDependencies: false,
    devServer: {
        port: 9997,
        setupMiddlewares(middlewares, devServer) {
            ensureDataDir()

            devServer.app.get('/api/periods', (req, res) => {
                ensureDataDir()

                const periods = fs
                    .readdirSync(dataDir)
                    .filter(file => file.endsWith('.json'))
                    .map(file => JSON.parse(fs.readFileSync(path.join(dataDir, file), 'utf8')))

                res.json(periods)
            })

            devServer.app.get('/api/watchlist', (req, res) => {
                ensureDataDir()

                res.json(JSON.parse(fs.readFileSync(watchlistFilePath, 'utf8')))
            })

            devServer.app.put('/api/watchlist', async (req, res) => {
                try {
                    ensureDataDir()

                    const watchlist = await readJsonBody(req)

                    if (!Array.isArray(watchlist)) {
                        res.status(400).json({ message: 'Invalid watchlist data' })
                        return
                    }

                    fs.writeFileSync(watchlistFilePath, `${JSON.stringify(watchlist, null, 2)}\n`, 'utf8')
                    res.json({ ok: true })
                } catch (error) {
                    res.status(500).json({ message: error.message })
                }
            })

            devServer.app.get('/api/stock/lookup', async (req, res) => {
                try {
                    const keyword = String(req.query.keyword || '').trim()

                    if (!keyword) {
                        res.status(400).json({ message: 'Missing stock keyword' })
                        return
                    }

                    const stock = await fetchStockWithKlines(keyword)

                    if (!stock || !stock.klines.length) {
                        res.status(404).json({ message: 'Stock not found or K-line data unavailable' })
                        return
                    }

                    res.json(stock)
                } catch (error) {
                    res.status(500).json({ message: error.message })
                }
            })

            devServer.app.put('/api/periods/:title', async (req, res) => {
                try {
                    ensureDataDir()

                    const title = safeFileName(req.params.title)
                    const period = await readJsonBody(req)

                    if (!title || !period.id || !period.title) {
                        res.status(400).json({ message: 'Invalid period data' })
                        return
                    }

                    fs
                        .readdirSync(dataDir)
                        .filter(file => file.endsWith('.json'))
                        .forEach(file => {
                            const filePath = path.join(dataDir, file)
                            const savedPeriod = JSON.parse(fs.readFileSync(filePath, 'utf8'))

                            if (savedPeriod.id === period.id && file !== `${title}.json`) {
                                fs.unlinkSync(filePath)
                            }
                        })

                    fs.writeFileSync(
                        path.join(dataDir, `${title}.json`),
                        `${JSON.stringify(period, null, 2)}\n`,
                        'utf8'
                    )

                    res.json({ ok: true })
                } catch (error) {
                    res.status(500).json({ message: error.message })
                }
            })

            devServer.app.delete('/api/periods/:id', (req, res) => {
                try {
                    ensureDataDir()

                    const id = req.params.id
                    const file = fs
                        .readdirSync(dataDir)
                        .filter(item => item.endsWith('.json'))
                        .find(item => {
                            const period = JSON.parse(fs.readFileSync(path.join(dataDir, item), 'utf8'))
                            return period.id === id
                        })

                    if (file) {
                        fs.unlinkSync(path.join(dataDir, file))
                    }

                    res.json({ ok: true })
                } catch (error) {
                    res.status(500).json({ message: error.message })
                }
            })

            return middlewares
        }
    }
})
