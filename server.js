import Hapi from 'hapi'
import Inert from 'inert'
import Joi from 'joi'
import WebpackPlugin from 'hapi-webpack-plugin'
import Package from './package'
import plugin from './lib'

const startServer = async () => {
    const server = Hapi.server({
        host: process.env.HOSTNAME || 'localhost',
        address: process.env.IP || '0.0.0.0',
        port: process.env.PORT || 3000
    })

    if (process.env.NODE_ENV === 'development') {
        await server.register([
            {
                plugin: WebpackPlugin,
                options: './config/webpack.dev.js'
            }
        ])
    }

    await server.register([
        {
            plugin: Inert
        },
        {
            plugin
        }
    ])

    server.route({
        method: 'GET',
        path: '/kittens',
        handler(request) {
            return 'hello'
        },
        options: {
            description: 'List all kittens',
            notes: 'Returns a list of all kittens. The kittens are returned sorted by creation date, with the most recently created kitten appearing first.'
        }
    })

    server.route({
        method: 'GET',
        path: '/kittens/{ID}',
        handler(request) {
            return 'goodbye'
        },
        options: {
            description: 'Retrieve a kitten',
            notes: 'Retrieves the details of an existing kitten. Supply the unique kitten ID from either a kitten creation request or the kitten list, and it will return the corresponding kitten information.',
            validate: {
                params: {
                    id: Joi.string()
                        .required()
                        .description('The identifier of the kitten to be retrieved.')
                }
            }
        }
    })

    server.route({
        method: 'DELETE',
        path: '/kittens/{ID}',
        handler(request) {
            return 'goodbye'
        },
        options: {
            description: 'Delete a kitten',
            validate: {
                params: {
                    id: Joi.string()
                        .required()
                        .description('The identifier of the kitten to be deleted.')
                }
            }
        }
    })

    await server.start()

    console.log(`${Package.name} (v.${Package.version}) server listening on ${server.info.uri} in ${process.env.NODE_ENV} mode`)
}

startServer().catch(console.error)
