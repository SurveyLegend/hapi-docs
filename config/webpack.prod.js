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
    plugins: [
        new ExtractTextPlugin('css/app.css')
    ],
    devtool: 'source-map'
})
