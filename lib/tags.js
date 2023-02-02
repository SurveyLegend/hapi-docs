import Joi from 'joi'

const schema = Joi.array().items(
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

export default (options) => {
    if (options.tags) {
        Joi.assert(options.tags, schema)
        return options.tags
    }
    return []
}
