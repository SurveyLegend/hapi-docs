import Joi from '@hapi/joi'
import Hoek from '@hapi/hoek'
import Path from 'path'

import Package from '../package'
import Builder from './builder'

const internals = {
    defaults: {
        endpoint: '/docs',
        basePath: '/',
        templatePath: Path.join(__dirname, '..', 'dist'),
        host: 'localhost',
        pathPrefixSize: 1,
        sortTags: 'name',
        sortEndpoints: 'path',
        auth: false
    },
    options: Joi.object({
        endpoint: Joi.string(),
        basePath: Joi.string().regex(/^\//),
        templatePath: Joi.string(),
        host: Joi.string(),
        scheme: Joi.string()
            .valid(['http', 'https'])
            .optional(),
        pathPrefixSize: Joi.number()
            .integer()
            .positive(),
        sortTags: Joi.string().valid(['name', 'ordered']),
        sortEndpoints: Joi.string().valid(['path', 'method', 'ordered']),
        info: Joi.any(),
        tags: Joi.any(),
        security: Joi.any(),
        errors: Joi.any(),
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
                handler: async request => {
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

        server.route([
            {
                method: 'GET',
                path: settings.endpoint + '/{path*}',
                handler: {
                    directory: {
                        path: settings.templatePath,
                        listing: true
                    }
                },
                options: {
                    auth: settings.auth
                }
            }
        ])
    }
}

internals.getHost = request => {
    const proxyHost = request.headers['x-forwarded-host'] || request.headers['disguised-host'] || ''

    if (proxyHost) {
        return proxyHost
    }

    const requestHost = request.info.host.split(':')
    const requestProtocol = request.server.info.protocol

    const host = requestHost[0]
    const port = Number.parseInt(requestHost[1] || '', 10)

    if (
        !Number.isNaN(port) &&
        ((requestProtocol === 'http' && port !== 80) ||
            (requestProtocol === 'https' && port !== 443))
    ) {
        return `${host}:${port}`
    }

    return host
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
