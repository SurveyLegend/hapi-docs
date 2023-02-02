import Joi from 'joi'

const schema = Joi.array().items(
    Joi.object({
        descriptions: Joi.array()
    })
)

export default (options) => {
    if (options.security) {
        Joi.assert(options.security, schema)
        return options.security
    }
    return []
}
