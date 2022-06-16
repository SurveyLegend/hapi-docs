module.exports = {
    // baseUrl: process.env.NODE_ENV === 'production' ? './' : '/',
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    devServer: {
        port: 3001,
        proxy: 'http://localhost:3000'
    },
    chainWebpack: config => {
        const svgRule = config.module.rule('svg')

        svgRule.uses.clear()
        svgRule.use('svg-url-loader').loader('svg-url-loader')

        // Fix for Safari caching bug https://github.com/vuejs/vue-cli/issues/1132
        if (process.env.NODE_ENV === 'development') {
            config.output.filename('[name].[hash].js').end()
        }
    },
    css: {
        loaderOptions: {
            scss: {
                additionalData: `
                    @import "@/assets/scss/settings/_breakpoints.scss";
                    @import "@/assets/scss/settings/_layout.scss";
                    @import "@/assets/scss/settings/_typography.scss";
                    @import "@/assets/scss/utility/_functions.scss";
                    @import "@/assets/scss/utility/_mixins.scss";
                `
            }
        }
    }
}
