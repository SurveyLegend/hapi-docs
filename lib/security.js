const Joi = require('joi')

const schema = Joi.object({
    descriptions: Joi.array().items(Joi.string())
})

module.exports = main
exports.default = main

function main(options) {
    if (options.security) {
        Joi.assert(options.security, schema)
        return options.security
    }
    return {}
}
