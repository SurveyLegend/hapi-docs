import Hapi from 'hapi'
import WebpackPlugin from 'hapi-webpack-plugin'
import Inert from 'inert'
import Path from 'path'
import Package from './package'

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
        }
    ])

    server.route({
        method: 'GET',
        path: '/js/{filepath*}',
        handler: {
            directory: {
                path: Path.join(process.cwd(), './public/js'),
                listing: false,
                index: false
            }
        },
        options: {
            auth: false,
            cache: {
                expiresIn: 24 * 60 * 60 * 1000,
                privacy: 'public'
            }
        }
    })

    server.route({
        method: 'GET',
        path: '/{path*}',
        handler: {
            file: './public/index.html'
        }
    })

    await server.start()

    console.log(`${Package.name} (v.${Package.version}) server listening on ${server.info.uri} in ${process.env.NODE_ENV} mode`)
}

startServer().catch(console.error)
