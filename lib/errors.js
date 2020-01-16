import Joi from '@hapi/joi'

const errors = {
    options: Joi.array().items(
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
}

errors.build = options => {
    let settings = []

    if (options.errors) {
        Joi.assert(settings, errors.options)
        settings = options.errors
    }

    return settings
}

export default errors
