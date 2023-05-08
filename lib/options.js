const Path = require('path')
const { applyToDefaults } = require('@hapi/hoek')
const Joi = require('joi')

const pluginOptionsSchema = Joi.object({
    endpoint: Joi.string(),
    basePath: Joi.string().regex(/^\//),
    templatePath: Joi.string(),
    host: Joi.string(),
    scheme: Joi.string().valid('http', 'https').optional(),
    pathPrefixSize: Joi.number().integer().positive(),
    sortTags: Joi.string().valid('name', 'ordered'),
    sortEndpoints: Joi.string().valid('path', 'method', 'ordered'),
    info: Joi.any(),
    tags: Joi.any(),
    security: Joi.any(),
    errors: Joi.any(),
    auth: Joi.alternatives().try(Joi.boolean(), Joi.string(), Joi.object())
})

exports.pluginOptionsSchema = pluginOptionsSchema
exports.getDefaultPluginOptions = getDefaultPluginOptions
exports.getPluginOptions = getPluginOptions
exports.getHost = getHost
exports.getScheme = getScheme

function getDefaultPluginOptions() {
    return {
        endpoint: '/docs',
        basePath: '/',
        templatePath: Path.join(__dirname, '..', 'dist'),
        host: 'localhost',
        pathPrefixSize: 1,
        sortTags: 'name',
        sortEndpoints: 'path',
        auth: false
    }
}

function getPluginOptions(options) {
    const pluginOptions = applyToDefaults(getDefaultPluginOptions(), options, {
        nullOverride: true
    })
    Joi.assert(pluginOptions, pluginOptionsSchema)
    return pluginOptions
}
function getHost(request) {
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

function getScheme(request) {
    return request.headers['x-forwarded-proto'] || request.server.info.protocol
}
