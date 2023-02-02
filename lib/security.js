import Joi from 'joi'

const schema = Joi.object({
    descriptions: Joi.array().items(Joi.string())
})

export default (options) => {
    if (options.security) {
        Joi.assert(options.security, schema)
        return options.security
    }
    return {}
}
