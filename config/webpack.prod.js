const Merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const Path = require('path')
const common = require('./webpack.common.js')

module.exports = Merge(common, {
    entry: {
        app: ['./template/js/app.js', './template/scss/app.scss']
    },
    resolve: {
        modules: [Path.join(__dirname, '../node_modules')]
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader', 'import-glob-loader']
                }),
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                exclude: /node_modules/,
                options: {
                    loaders: {
                        js: {
                            loader: 'babel-loader'
                        },
                        scss: ExtractTextPlugin.extract({
                            use: 'css-loader!sass-loader',
                            fallback: 'vue-style-loader'
                        }),
                        css: ExtractTextPlugin.extract({
                            use: 'css-loader',
                            fallback: 'vue-style-loader'
                        })
                    }
                }
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('css/app.css')
    ],
    devtool: 'source-map'
})
