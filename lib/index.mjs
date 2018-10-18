import Joi from 'joi'
import Hoek from 'hoek'
import Path from 'path'

import Package from '../package'
import Builder from './builder'

const internals = {
    defaults: {
        endpoint: '/docs',
        basePath: '/',
        pathPrefixSize: 1,
        sortEndpoints: 'path',
        auth: false
    },
    options: Joi.object({
        endpoint: Joi.string(),
        info: Joi.any(),
        basePath: Joi.string().regex(/^\//),
        pathPrefixSize: Joi.number()
            .integer()
            .positive(),
        sortEndpoints: Joi.string().valid(['path', 'method', 'ordered']),
        auth: Joi.alternatives().try(Joi.boolean(), Joi.string(), Joi.object())
    })
}

const plugin = {
    name: Package.name,
    version: Package.version,
    once: true,
    multiple: false,

    async register(server, options) {
        const settings = Hoek.applyToDefaults(internals.defaults, options, true)

        server.route([
            {
                method: 'GET',
                path: '/hapi-docs',
                handler: async (request, h) => {
                    Joi.assert(settings, internals.options)

                    // TODO: Add caching

                    const docs = await Builder.getDocsData(settings, request)

                    return docs
                },
                options: {
                    auth: settings.auth
                }
            }
        ])

        await server.dependency('inert')

        const __dirname = Path.dirname(new URL(import.meta.url).pathname)

        server.route([
            {
                method: 'GET',
                path: settings.endpoint,
                handler: {
                    file: Path.join(__dirname, '../dist/index.html')
                },
                options: {
                    auth: settings.auth
                }
            },
            {
                method: 'GET',
                path: '/css/{path*}',
                handler: {
                    directory: {
                        path: Path.join(__dirname, '../dist/css'),
                        listing: false,
                        index: false
                    }
                },
                options: {
                    auth: false
                }
            },
            {
                method: 'GET',
                path: '/js/{path*}',
                handler: {
                    directory: {
                        path: Path.join(__dirname, '../dist/js'),
                        listing: false,
                        index: false
                    }
                },
                options: {
                    auth: false
                }
            }
        ])
    }
}

export default plugin
