import Joi from 'joi'
import Hoek from 'hoek'

const info = {
    defaults: {
        title: 'API Reference',
        version: '0.0.1'
    },
    options: Joi.object({
        title: Joi.string().required(),
        description: Joi.string(),
        version: Joi.string().required()
    }).pattern(/^x-/, Joi.any())
}

info.build = options => {
    const settings = options.info
        ? Hoek.applyToDefaults(info.defaults, options.info)
        : info.defaults

    Joi.assert(settings, info.options)

    return settings
}

export default info
