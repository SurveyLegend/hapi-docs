// Credit to Lout for inpsiration, check it out at https://github.com/hapijs/lout

import Joi from 'joi'
import Hoek from 'hoek'
import Path from 'path'
import Package from '../package'

const internals = {
    defaults: {
        path: '/docs',
        auth: false,
        stripPrefix: null
    },
    options: Joi.object({
        path: Joi.string(),
        auth: Joi.object(),
        stripPrefix: Joi.string().allow(null)
    })
}

const plugin = {
    multiple: true,
    pkg: {
        name: Package.name,
        version: Package.version
    },
    register(server, options) {
        const validateOptions = internals.options.validate(options)

        if (validateOptions.error) {
            throw validateOptions.error
        }

        const settings = Hoek.clone(internals.defaults)
        Hoek.merge(settings, options)

        if (settings.path[0] !== '/') {
            settings.path = `/${settings.path}`
        }

        if (settings.path.length > 1 && settings.path[settings.path.length - 1] === '/') {
            settings.path = settings.path.slice(0, -1)
        }

        server.dependency('inert', server => {
            server.route({
                method: 'GET',
                path: '/assets/{path*}',
                handler: {
                    directory: {
                        path: Path.join(process.cwd(), './public/assets'),
                        listing: false,
                        index: false
                    }
                },
                options: {
                    auth: settings.auth,
                    cache: {
                        expiresIn: 24 * 60 * 60 * 1000,
                        privacy: 'public'
                    },
                    plugins: {
                        hapiSlate: false
                    }
                }
            })

            server.route({
                method: 'GET',
                path: settings.path,
                handler: {
                    file: './public/index.html'
                },
                options: {
                    auth: settings.auth,
                    plugins: {
                        hapiSlate: false
                    }
                }
            })

            server.route({
                method: 'GET',
                path: '/routes',
                options: internals.docs(settings, server)
            })
        })
    }
}

internals.docs = (settings, server) => {
    return {
        auth: settings.auth,
        handler(request, h) {
            let routing = server.table()

            routing = routing.filter(route => {
                return !route.settings.isInternal &&
                    route.settings.plugins.hapiSlate !== false &&
                    route.method !== 'options'
            })

            return internals.getRoutesData(routing, server)
        },
        plugins: {
            hapiSlate: false
        }
    }
}

internals.getRoutesData = (routes, server) => {
    return routes.map(route => ({
        path: route.path,
        method: route.method.toUpperCase(),
        description: route.settings.description,
        notes: internals.processNotes(route.settings.notes),
        pathParams: internals.describe(route.settings.validate.params),
        queryParams: internals.describe(route.settings.validate.query),
        payloadParams: internals.describe(route.settings.validate.payload),
        responseParams: internals.describe(route.settings.response.schema),
        statusSchema: internals.describeStatusSchema(route.settings.response.status)
    }))
}

internals.describe = (params) => {
    if (params === null || typeof params !== 'object') {
        return null
    }

    const description = internals.getParamsData(Joi.compile(params).describe())
    description.root = true

    return description
}

internals.describeStatusSchema = (status) => {
    const codes = Object.keys(status || {})
    if (!codes.length) {
        return
    }

    const result = {}
    codes.forEach(code => {
        result[code] = internals.describe(status[code])
    })

    return result
}

internals.getParamsData = (param, name) => {
    if (!name && param.type === 'object' && param.children && Object.keys(param.children).length === 0) {
        return { isDenied: true }
    }

    if (param.ref && param.is) {
        return {
            condition: {
                key: internals.formatReference(param.ref),
                value: internals.getParamsData(param.is, param.is.type)
            },
            then: param.then && internals.getParamsData(param.then, param.then.type),
            otherwise: param.otherwise && internals.getParamsData(param.otherwise, param.otherwise.type)
        }
    }

    let type
    if (param.valids && param.valids.some(internals.isRef)) {
        type = 'reference'
    } else {
        type = param.type
    }

    const data = {
        name,
        description: param.description,
        notes: internals.processNotes(param.notes),
        tags: param.tags,
        meta: param.meta,
        unit: param.unit,
        type,
        allowedValues: param.valids ? internals.getExistsValues(type, param.valids) : null,
        disallowedValues: param.invalids ? internals.getExistsValues(type, param.invalids) : null,
        examples: param.examples,
        peers: param.dependencies && param.dependencies.map(internals.formatPeers),
        target: type === 'reference' ? internals.getExistsValues(type, param.valids) : null,
        flags: param.flags && {
            allowUnknown: param.flags.allowUnknown,
            default: Hoek.reach(param.flags.default, 'description', { default: param.flags.default }),  // Attempt to reach `description` for joi 11
            encoding: param.flags.encoding, // binary specific
            insensitive: param.flags.insensitive, // string specific
            required: param.flags.presence === 'required',
            forbidden: param.flags.presence === 'forbidden',
            stripped: param.flags.strip,
            allowOnly: param.flags.allowOnly
        }
    }

    if (data.type === 'object') {
        let children = []

        if (param.children) {
            const childrenKeys = Object.keys(param.children)
            children = children.concat(childrenKeys.map(key => internals.getParamsData(param.children[key], key)))
        }

        if (param.patterns) {
            children = children.concat(param.patterns.map(pattern => internals.getParamsData(pattern.rule, pattern.regex)))
        }

        data.children = children
    }

    if (data.type === 'array' && param.items) {
        if (param.orderedItems) {
            data.orderedItems = param.orderedItems.map(item => internals.getParamsData(item))
        }

        data.items = []
        data.forbiddenItems = []
        param.items.forEach(item => {
            item = internals.getParamsData(item)
            if (item.flags && item.flags.forbidden) {
                data.forbiddenItems.push(item)
            } else {
                data.items.push(item)
            }
        })
    }

    if (data.type === 'alternatives') {
        data.alternatives = param.alternatives.map(alternative => internals.getParamsData(alternative))
    } else {
        if (param.rules) {
            data.rules = param.rules.map((rule) => ({
                name: internals.capitalize(rule.name),
                params: internals.processRuleArgument(rule)
            }))
        } else {
            data.rules = []
        }
    }

    return data
}

internals.getExistsValues = (type, exists) => {
    const values = exists.filter(value => {
        if (typeof value === 'string' && value.length === 0) {
            return false
        }

        if (type === 'number' && Math.abs(value) === Infinity) {
            return false
        }

        return true
    }).map(value => {
        if (internals.isRef(value)) {
            return internals.formatReference(value)
        }

        return JSON.stringify(value)
    })

    return values.length ? values : null
}

internals.formatPeers = (condition) => {
    if (condition.key) {
        return `Requires ${condition.peers.join(', ')} to ${condition.type === 'with' ? '' : 'not '}be present when ${condition.key} is.`
    }

    return `Requires ${condition.peers.join(` ${condition.type} `)}.`
}

internals.isRef = (ref) => {
    return typeof ref === 'string' && /^(ref|context):.+/.test(ref)
}

internals.capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

internals.formatReference = (ref) => {
    if (ref.startsWith('ref:')) {
        return ref.substr(4)
    }

    return '$' + ref.substr(8)
}

internals.processRuleArgument = (rule) => {
    const arg = rule.arg
    if (rule.name === 'assert') {
        return {
            key: internals.formatReference(arg.ref),
            value: internals.getParamsData(arg.schema)
        }
    } else if (rule.name === 'regex' && arg.pattern) {
        let pattern = arg.pattern

        if (arg.name) {
            pattern += ` (${arg.name})`
        }

        if (arg.invert) {
            pattern += ' - inverted'
        }

        return pattern
    } else if (internals.isRef(arg)) {
        return {
            ref: internals.formatReference(arg)
        }
    }

    return arg || JSON.stringify(arg)
}

internals.processNotes = (notes) => {
    if (!notes) {
        return
    }

    if (!Array.isArray(notes)) {
        return [notes]
    }

    return notes
}

export default plugin
