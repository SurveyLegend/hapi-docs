import Fs from 'node:fs/promises'
import Hapi from '@hapi/hapi'
import Inert from '@hapi/inert'

import exampleRoutes from './routes.js'
import pluginOptions from './pluginOptions.js'
import HapiDocs from '../lib/index.js'

async function initServer() {
    const server = Hapi.server({
        host: process.env.HOSTNAME || 'localhost',
        address: process.env.IP || '0.0.0.0',
        port: Number(process.env.PORT || 3000)
    })

    server.settings.debug = true // print logs in console

    await server.register([
        {
            plugin: Inert
        }
    ])

    await server.route([
        {
            method: 'GET',
            path: '/',
            handler(request, h) {
                return h.redirect('/docs')
            }
        }].concat(exampleRoutes)
    )

    // Register last after all routes have been registered
    await server.register({
        plugin: HapiDocs,
        options: pluginOptions
    })

    return server
}

// eslint-disable-next-line
initServer()
    .then(async (server) => {
        await server.start()

        const { name, version } = JSON.parse(await Fs.readFile('./package.json'))
        console.log(`${name} (v.${version}) server listening on ${server.info.uri}`)

        return server
    })
    .catch((err) => {
        console.error(err)
        process.exit(1)
    })
