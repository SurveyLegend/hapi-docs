import Joi from '@hapi/joi'

const tags = {
    options: Joi.array().items(
        Joi.object({
            name: Joi.string().required(),
            descriptions: Joi.array(),
            order: Joi.number(),
            deprecated: Joi.boolean(),
            internal: Joi.boolean(),
            experimental: Joi.boolean(),
            uppercase: Joi.boolean()
        }).optional()
    )
}

tags.build = options => {
    let settings = []

    if (options.tags) {
        Joi.assert(settings, tags.options)
        settings = options.tags
    }

    return settings
}

export default tags
