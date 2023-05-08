import { readFileSync } from 'node:fs'
import Joi from 'joi'

import { getPluginOptions, getHost, getScheme, pluginOptionsSchema } from './options.js'
import getDocsData from './builder.js'

const { name, version } = JSON.parse(readFileSync('./package.json').toString())

export default {
    name,
    version,
    multiple: false,
    dependencies: ['@hapi/inert'],
    pkg: { name, version },

    async register(server, pluginOptions) {
        // applies defaults and check that plugin options are correct when loading plugin
        const settings = getPluginOptions(pluginOptions)

        server.route([
            {
                method: 'GET',
                path: '/hapi-docs',
                async handler(request) {
                    const host = getHost(request)
                    const scheme = getScheme(request)
                    if (host !== settings.host || scheme !== settings.scheme) {
                        settings.host = host
                        settings.scheme = scheme
                        // check that plugin options are still correct
                        Joi.assert(settings, pluginOptionsSchema)
                    }
                    return getDocsData(settings, request)
                },
                options: {
                    auth: settings.auth
                }
            },
            {
                method: 'GET',
                path: settings.endpoint + '/{path*}',
                handler: {
                    directory: {
                        path: settings.templatePath,
                        listing: false
                    }
                },
                options: {
                    auth: settings.auth
                }
            },
            {
                method: 'GET',
                path: '/{path*}',
                handler: {
                    directory: {
                        path: settings.templatePath,
                        listing: false
                    }
                },
                options: {
                    auth: settings.auth
                }
            }
        ])
    }
}
