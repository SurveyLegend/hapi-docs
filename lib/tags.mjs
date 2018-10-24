import Joi from 'joi'

const tags = {
    options: Joi.array().items(
        Joi.object({
            name: Joi.string().required(),
            description: Joi.string(),
            order: Joi.number(),
            deprecated: Joi.boolean()
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
