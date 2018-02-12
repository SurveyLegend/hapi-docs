import Hapi from 'hapi'
import Inert from 'inert'
import WebpackPlugin from 'hapi-webpack-plugin'
import Package from './package'
import plugin from './lib'

const startServer = async () => {
    const server = Hapi.server({
        host: process.env.HOSTNAME || 'localhost',
        address: process.env.IP || '0.0.0.0',
        port: process.env.PORT || 3000
    })

    await server.register([
        {
            plugin: WebpackPlugin,
            options: './webpack.config.js'
        },
        {
            plugin: Inert
        },
        {
            plugin
        }
    ])

    await server.start()

    console.log(`${Package.name} (v.${Package.version}) server listening on ${server.info.uri} in ${process.env.NODE_ENV} mode`)
}

startServer().catch(console.error)
