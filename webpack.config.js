const webpack = require('webpack')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
    entry: {
        app: ['webpack-hot-middleware/client', './templates/js/app.js', './templates/scss/app.scss']
    },
    output: {
        path: path.resolve(__dirname, './public/'),
        publicPath: '/',
        filename: 'js/[name].js'
    },
    resolve: {
        modules: [path.join(__dirname, './node_modules'), 'node_modules'],
        extensions: ['.js', '.vue'],
        alias: {
            '@': path.resolve(__dirname, './templates/js')
        }
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                exclude: /node_modules/,
                options: {
                    emitWarning: true
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        js: {
                            loader: 'babel-loader'
                        },
                        scss: {
                            loader: 'vue-style-loader!css-loader!sass-loader'
                        },
                        css: {
                            loader: 'vue-style-loader!css-loader'
                        }
                    }
                }
            },
            {
                test: /\.scss$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new FriendlyErrorsWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, './public/index.html'),
            template: path.resolve(__dirname, './templates/index.html'),
            inject: true
        })
    ],
    devtool: 'eval'
}
