module.exports = {
    devServer: {
        port: 3001,
        proxy: 'http://localhost:3000'
    },
    chainWebpack: config => {
        const svgRule = config.module.rule('svg')

        svgRule.uses.clear()
        svgRule.use('svg-url-loader').loader('svg-url-loader')
    },
    css: {
        loaderOptions: {
            sass: {
                data: `
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
