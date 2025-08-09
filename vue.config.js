const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    publicPath: '/',
    outputDir: 'dist',
    assetsDir: 'assets',
    lintOnSave: false,
    productionSourceMap: true,
    css: {
        loaderOptions: {
            less: {
                additionalData: `@import "@/assets/css/global_style.less";`
            }
        },
    },
    devServer: {
        open: true,
        host: '0.0.0.0',
        port: 8080,
        https: false,
        proxy: {
            '/api': {
                target: 'http://vueshop.glbuys.com/api',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },

    configureWebpack: {
        devtool: 'source-map'
    }
})
