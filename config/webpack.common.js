const Webpack = require('webpack')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Path = require('path')

module.exports = {
    output: {
        path: Path.resolve(__dirname, '../public/'),
        publicPath: '/',
        filename: 'js/[name].js'
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            '@': Path.resolve(__dirname, '../template'),
            'vue$': 'vue/dist/vue.common.js'
        }
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader', 'import-glob-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.svg$/,
                loader: 'svg-url-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: 'file-loader',
                exclude: /node_modules/,
                options: {
                    name: '[name].[ext]?[hash]',
                    outputPath: 'images/'
                }
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
                        scss: {
                            loader: 'vue-style-loader!css-loader!sass-loader'
                        },
                        css: {
                            loader: 'vue-style-loader!css-loader'
                        }
                    }
                }
            }
        ]
    },
    plugins: [
        new Webpack.NoEmitOnErrorsPlugin(),
        new FriendlyErrorsWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: Path.resolve(__dirname, '../public/index.html'),
            template: Path.resolve(__dirname, '../template/index.html'),
            inject: true
        })
    ]
}
