const fs = require('fs')
const path = require('path')
const { defineConfig } = require('@vue/cli-service')

const dataDir = path.join(__dirname, 'data', 'periods')

function ensureDataDir() {
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true })
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

module.exports = defineConfig({
    transpileDependencies: false,
    devServer: {
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
