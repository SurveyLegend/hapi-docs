const Joi = require('joi')

const schema = Joi.array().items(
    Joi.object({
        name: Joi.string().required(),
        descriptions: Joi.array().items(Joi.string()),
        order: Joi.number(),
        deprecated: Joi.boolean(),
        internal: Joi.boolean(),
        experimental: Joi.boolean(),
        uppercase: Joi.boolean()
    }).optional()
)

module.exports = main
exports.default = main

function main(options) {
    if (options.tags) {
        Joi.assert(options.tags, schema)
        return options.tags
    }
    return []
}
