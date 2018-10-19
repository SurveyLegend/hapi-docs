import Joi from 'joi'
import Hoek from 'hoek'

import Utilities from './utilities'

class Paths {
    constructor(settings) {
        this.settings = settings
    }

    build(routes) {
        const routesData = []

        routes.forEach(route => {
            let routeOptions = Hoek.reach(route, 'settings.plugins.hapi-docs') || {}
            let routeData = {
                path: route.path,
                method: route.method.toUpperCase(),
                description: route.settings.description,
                notes: Paths.processNotes(route.settings.notes),
                pathParams: Paths.describe(Hoek.reach(route, 'settings.validate.params')),
                queryParams: Paths.describe(Hoek.reach(route, 'settings.validate.query')),
                payloadParams: Paths.describe(Hoek.reach(route, 'settings.validate.payload')),
                headersParams: Paths.describe(Hoek.reach(route, 'settings.validate.headers')),
                order: Hoek.reach(routeOptions, 'order') || null,
                deprecated: Hoek.reach(routeOptions, 'deprecated') || false,
                slug: Utilities.slugify(route.settings.description),
                group: route.group
            }

            routesData.push(routeData)
        })

        return routesData
    }

    static processNotes(notes) {
        return Array.isArray(notes) ? notes : [notes]
    }

    static describe(params) {
        if (params === null || typeof params !== 'object') {
            return null
        }

        const description = Paths.getParamsData(Joi.compile(params).describe())
        description.root = true
        return description
    }

    static getParamsData(param, name) {
        // Detection of "false" as validation rule
        if (
            !name &&
            param.type === 'object' &&
            param.children &&
            Object.keys(param.children).length === 0
        ) {
            return {
                isDenied: true
            }
        }

        // Detection of conditional alternatives
        if (param.ref && param.is) {
            return {
                condition: {
                    key: Paths.formatReference(param.ref),
                    value: Paths.getParamsData(param.is, param.is.type)
                },
                then: param.then && Paths.getParamsData(param.then, param.then.type),
                otherwise:
                    param.otherwise && Paths.getParamsData(param.otherwise, param.otherwise.type)
            }
        }

        let type
        if (param.valids && param.valids.some(Paths.isRef)) {
            type = 'reference'
        } else {
            type = param.type
        }

        const data = {
            name,
            description: param.description,
            notes: Paths.processNotes(param.notes),
            tags: param.tags,
            meta: param.meta,
            unit: param.unit,
            type,
            allowedValues: param.valids ? Paths.getExistsValues(type, param.valids) : null,
            disallowedValues: param.invalids ? Paths.getExistsValues(type, param.invalids) : null,
            examples: param.examples,
            peers: param.dependencies && param.dependencies.map(Paths.formatPeers),
            target: type === 'reference' ? Paths.getExistsValues(type, param.valids) : null,
            flags: param.flags && {
                allowUnknown: param.flags.allowUnknown,
                default: Hoek.reach(param.flags.default, 'description', {
                    default: param.flags.default
                }), // Attempt to reach `description` for joi 11
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
                children = children.concat(
                    childrenKeys.map(key => Paths.getParamsData(param.children[key], key))
                )
            }

            if (param.patterns) {
                children = children.concat(
                    param.patterns.map(pattern => Paths.getParamsData(pattern.rule, pattern.regex))
                )
            }

            data.children = children
        }

        if (data.type === 'array' && param.items) {
            if (param.orderedItems) {
                data.orderedItems = param.orderedItems.map(item => Paths.getParamsData(item))
            }

            data.items = []
            data.forbiddenItems = []
            param.items.forEach(item => {
                item = Paths.getParamsData(item)
                if (item.flags && item.flags.forbidden) {
                    data.forbiddenItems.push(item)
                } else {
                    data.items.push(item)
                }
            })
        }

        if (data.type === 'alternatives') {
            data.alternatives = param.alternatives.map(alternative =>
                Paths.getParamsData(alternative)
            )
        } else {
            if (param.rules) {
                data.rules = param.rules.map(rule => ({
                    name: Paths.capitalize(rule.name),
                    params: Paths.processRuleArgument(rule)
                }))
            } else {
                data.rules = []
            }
        }

        return data
    }

    static getExistsValues(type, exists) {
        const values = exists
            .filter(value => {
                if (typeof value === 'string' && value.length === 0) {
                    return false
                }

                if (type === 'number' && Math.abs(value) === Infinity) {
                    return false
                }

                return true
            })
            .map(value => {
                if (Paths.isRef(value)) {
                    return Paths.formatReference(value)
                }

                return JSON.stringify(value)
            })

        return values.length ? values : null
    }

    static capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    static formatPeers(condition) {
        if (condition.key) {
            return `Requires ${condition.peers.join(', ')} to ${
                condition.type === 'with' ? '' : 'not '
            }be present when ${condition.key} is.`
        }

        return `Requires ${condition.peers.join(` ${condition.type} `)}.`
    }

    static isRef(ref) {
        return typeof ref === 'string' && /^(ref|context):.+/.test(ref)
    }

    static formatReference(ref) {
        if (ref.startsWith('ref:')) {
            return ref.substr(4)
        }

        return '$' + ref.substr(8)
    }

    static processRuleArgument(rule) {
        const arg = rule.arg
        if (rule.name === 'assert') {
            return {
                key: Paths.formatReference(arg.ref),
                value: Paths.getParamsData(arg.schema)
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
        } else if (Paths.isRef(arg)) {
            return {
                ref: Paths.formatReference(arg)
            }
        }

        return arg || JSON.stringify(arg)
    }
}

export default Paths
