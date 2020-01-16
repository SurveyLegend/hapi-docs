import Joi from '@hapi/joi'

const security = {
    options: Joi.array().items(
        Joi.object({
            descriptions: Joi.array()
        })
    )
}

security.build = options => {
    let settings = []

    if (options.security) {
        Joi.assert(settings, security.options)
        settings = options.security
    }

    return settings
}

export default security
