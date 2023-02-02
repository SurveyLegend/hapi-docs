import Joi from 'joi'

const schema = Joi.array().items(
    Joi.object({
        descriptions: Joi.array(),
        codes: Joi.array().items(
            Joi.object({
                status: Joi.string(),
                description: Joi.string()
            })
        )
    })
)

export default (options) => {
    if (options.errors) {
        Joi.assert(options.errors, schema)
        return options.errors
    }
    return []
}
