import Joi from 'joi'
import Hoek from 'hoek'
import Path from 'path'

import Package from '../package'
import Builder from './builder'

const internals = {
    defaults: {
        endpoint: '/docs',
        basePath: '/',
        host: 'localhost',
        pathPrefixSize: 1,
        sortEndpoints: 'path',
        auth: false
    },
    options: Joi.object({
        endpoint: Joi.string(),
        basePath: Joi.string().regex(/^\//),
        host: Joi.string(),
        scheme: Joi.string()
            .valid(['http', 'https'])
            .optional(),
        pathPrefixSize: Joi.number()
            .integer()
            .positive(),
        sortEndpoints: Joi.string().valid(['path', 'method', 'ordered']),
        info: Joi.any(),
        tags: Joi.any(),
        auth: Joi.alternatives().try(Joi.boolean(), Joi.string(), Joi.object())
    })
}

const plugin = {
    name: Package.name,
    version: Package.version,
    once: true,
    multiple: false,

    async register(server, options) {
        let settings = Hoek.applyToDefaults(internals.defaults, options, true)

        server.route([
            {
                method: 'GET',
                path: '/hapi-docs',
                handler: async (request, h) => {
                    internals.defaults.host = internals.getHost(request)
                    internals.defaults.scheme = internals.getSchema(request)

                    settings = Hoek.applyToDefaults(internals.defaults, options)

                    Joi.assert(settings, internals.options)

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

internals.getHost = request => {
    let host = request.info.hostname
    const port = request.server.info.port
    const protocol = request.server.info.protocol

    if ((port && (protocol === 'http' && port !== 80)) || (protocol === 'https' && port !== 443)) {
        host += ':' + port
    }

    return request.headers['x-forwarded-host'] || request.headers['disguised-host'] || host
}

internals.getSchema = request => {
    const forwardedProtocol = request.headers['x-forwarded-proto']

    if (forwardedProtocol) {
        return forwardedProtocol
    }

    const protocol = request.server.info.protocol

    return protocol
}

export default plugin
