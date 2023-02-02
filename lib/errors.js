import Joi from 'joi'

const schema = Joi.object({
    descriptions: Joi.array().items(Joi.string()),
    codes: Joi.array().items(
        Joi.object({
            status: Joi.string(),
            description: Joi.string()
        })
    )
})

export default (options) => {
    if (options.errors) {
        Joi.assert(options.errors, schema)
        return options.errors
    }
    return {}
}
