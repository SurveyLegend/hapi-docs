import Joi from '@hapi/joi'
import Hoek from '@hapi/hoek'

const info = {
    defaults: {
        title: 'API Reference',
        version: '0.0.1'
    },
    options: Joi.object({
        title: Joi.string().required(),
        descriptions: Joi.array(),
        version: Joi.string().required()
    })
}

info.build = options => {
    const settings = options.info
        ? Hoek.applyToDefaults(info.defaults, options.info)
        : info.defaults

    Joi.assert(settings, info.options)

    return settings
}

export default info
