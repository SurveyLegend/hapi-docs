const Joi = require('joi')
const { applyToDefaults } = require('@hapi/hoek')

const defaults = {
    title: 'API Reference',
    version: '0.0.1'
}

const schema = Joi.object({
    title: Joi.string().required(),
    descriptions: Joi.array(),
    version: Joi.string().required()
})

module.exports = main
exports.default = main

function main(options) {
    const settings = options.info
        ? applyToDefaults(defaults, options.info)
        : defaults

    Joi.assert(settings, schema)

    return settings
}
