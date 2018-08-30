import Joi from 'joi'
import Hoek from 'hoek'
import Path from 'path'
import Package from '../package'

const internals = {
    defaults: {
        endpoint: '/docs',
        auth: false,
        stripPrefix: null,
        methodsOrder: ['get', 'head', 'post', 'put', 'patch', 'delete', 'trace']
    },
    options: Joi.object({
        endpoint: Joi.string(),
        auth: Joi.object(),
        stripPrefix: Joi.string().allow(null),
        methodsOrder: Joi.array()
    })
}

const plugin = {
    multiple: true,
    pkg: {
        name: Package.name,
        version: Package.version
    },
    async register(server, options) {
        const validateOptions = internals.options.validate(options)

        if (validateOptions.error) {
            throw validateOptions.error
        }

        const settings = Hoek.clone(internals.defaults)
        Hoek.merge(settings, options)

        if (!settings.endpoint.startsWith('/')) {
            settings.endpoint = `/${settings.endpoint}`
        }

        if (settings.endpoint.length > 1 && settings.endpoint.endsWith('/')) {
            settings.endpoint = settings.endpoint.slice(0, -1)
        }

        await server.dependency('inert')

        server.route([
            {
                method: 'GET',
                path: `${settings.endpoint}/assets/{path*}`,
                handler: {
                    directory: {
                        path: Path.resolve(__dirname, '../public/assets'),
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
                        hapiDocs: false
                    }
                }
            },
            {
                method: 'GET',
                path: `${settings.endpoint}/`,
                handler: {
                    file: Path.resolve(__dirname, '../public/index.html')
                },
                options: {
                    auth: settings.auth,
                    plugins: {
                        hapiDocs: false
                    }
                }
            },
            {
                method: 'GET',
                path: settings.endpoint,
                async handler(request, h) {
                    return h.redirect(`${settings.endpoint}/`)
                },
                options: {
                    auth: settings.auth,
                    plugins: {
                        hapiDocs: false
                    }
                }
            },
            {
                method: 'GET',
                path: `${settings.endpoint}/routes`,
                options: internals.docs(settings, server)
            }
        ])
    }
}

internals.docs = (settings, server) => {
    return {
        auth: settings.auth,
        handler(request, h) {
            let routing = server.table()

            routing = routing.filter(route => {
                return !route.settings.isInternal && route.settings.plugins.hapiDocs !== false && route.method !== 'options'
            }).sort((routeA, routeB) => {
                if (routeA.path > routeB.path) {
                    return 1
                }

                if (routeA.path < routeB.path) {
                    return -1
                }

                return settings.methodsOrder.indexOf(routeA.method) - settings.methodsOrder.indexOf(routeB.method)
            })

            routing = internals.getRoutesData(routing, server)
            routing = internals.stripRoutesPrefix(routing, settings.stripPrefix)
            routing = internals.groupRoutes(routing)

            return routing
        },
        plugins: {
            hapiDocs: false
        }
    }
}

internals.getRoutesData = (routes, server) => {
    return routes.map(route => ({
        prefix: route.realm.modifiers.route.prefix || '',
        uri: server.info.uri,
        path: route.path,
        method: route.method.toUpperCase(),
        description: route.settings.description,
        slug: internals.slugify(route.settings.description),
        notes: internals.processNotes(route.settings.notes),
        pathParams: internals.describe(route.settings.validate.params)
        // queryParams: internals.describe(route.settings.validate.query),
        // payloadParams: internals.describe(route.settings.validate.payload)
        // responseParams: internals.describe(route.settings.response.schema),
        // statusSchema: internals.describeStatusSchema(route.settings.response.status)
    }))
}

internals.stripRoutesPrefix = (routes, stripPrefix) => {
    return routes.reduce((strippedRoutes, route) => {
        const prefix = stripPrefix || route.prefix

        if (!prefix) {
            return routes
        }

        if (route.path.indexOf(prefix) === 0) {
            const routeClone = Hoek.clone(route)

            if (route.path.length > prefix.length) {
                routeClone.path = route.path.substr(prefix.length)
                strippedRoutes.push(routeClone)
            }
        }

        return strippedRoutes
    }, [])
}

internals.groupRoutes = (routes) => {
    return routes.reduce((groupedRoutes, route) => {
        const groupName = route.path.split('/')[1]
        const entry = groupedRoutes[groupName] = groupedRoutes[groupName] || []
        entry.push(route)

        return groupedRoutes
    }, {})
}

internals.capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

internals.slugify = (string) => {
    return string.toLowerCase().trim().replace(/[\s\W-]+/g, '_')
}

internals.describe = (params) => {
    if (params === null || typeof params !== 'object') {
        return null
    }

    const description = internals.getParamsData(Joi.compile(params).describe())

    return description
}

internals.getParamsData = (param, name) => {
    // let type
    // if (param.valids && param.valids.some(internals.isRef)) {
    //     type = 'reference'
    // } else {
    //     type = param.type
    // }
    //

    const data = {
        name,
        description: param.description,
        // notes: internals.processNotes(param.notes),
        // tags: param.tags,
        // meta: param.meta,
        // unit: param.unit,
        type: param.type,
        // allowedValues: param.valids ? internals.getExistsValues(type, param.valids) : null,
        // disallowedValues: param.invalids ? internals.getExistsValues(type, param.invalids) : null,
        // examples: param.examples,
        // peers: param.dependencies && param.dependencies.map(internals.formatPeers),
        // target: type === 'reference' ? internals.getExistsValues(type, param.valids) : null,
        flags: param.flags && {
            required: param.flags.presence === 'required'
        }
    }

    if (data.type === 'object') {
        let children = []

        if (param.children) {
            const childrenKeys = Object.keys(param.children)
            children = children.concat(childrenKeys.map(key => internals.getParamsData(param.children[key], key)))
        }

        data.children = children
    }
    //
    // if (data.type === 'array' && param.items) {
    //     if (param.orderedItems) {
    //         data.orderedItems = param.orderedItems.map(item => internals.getParamsData(item))
    //     }
    //
    //     data.items = []
    //     data.forbiddenItems = []
    //     param.items.forEach(item => {
    //         item = internals.getParamsData(item)
    //         if (item.flags && item.flags.forbidden) {
    //             data.forbiddenItems.push(item)
    //         } else {
    //             data.items.push(item)
    //         }
    //     })
    // }
    //
    // if (data.type === 'alternatives') {
    //     data.alternatives = param.alternatives.map(alternative => internals.getParamsData(alternative))
    // } else {
    //     if (param.rules) {
    //         data.rules = param.rules.map((rule) => ({
    //             name: internals.capitalize(rule.name),
    //             params: internals.processRuleArgument(rule)
    //         }))
    //     } else {
    //         data.rules = []
    //     }
    // }

    return data
}

// internals.describeStatusSchema = (status) => {
//     const codes = Object.keys(status || {})
//     if (!codes.length) {
//         return
//     }
//
//     const result = {}
//     codes.forEach(code => {
//         result[code] = internals.describe(status[code])
//     })
//
//     return result
// }

//
// internals.describeStatusSchema = (status) => {
//     const codes = Object.keys(status || {})
//     if (!codes.length) {
//         return
//     }
//
//     const result = {}
//     codes.forEach(code => {
//         result[code] = internals.describe(status[code])
//     })
//
//     return result
// }
//
// internals.getExistsValues = (type, exists) => {
//     const values = exists.filter(value => {
//         if (typeof value === 'string' && value.length === 0) {
//             return false
//         }
//
//         if (type === 'number' && Math.abs(value) === Infinity) {
//             return false
//         }
//
//         return true
//     }).map(value => {
//         if (internals.isRef(value)) {
//             return internals.formatReference(value)
//         }
//
//         return JSON.stringify(value)
//     })
//
//     return values.length ? values : null
// }
//
// internals.formatPeers = (condition) => {
//     if (condition.key) {
//         return `Requires ${condition.peers.join(', ')} to ${condition.type === 'with' ? '' : 'not '}be present when ${condition.key} is.`
//     }
//
//     return `Requires ${condition.peers.join(` ${condition.type} `)}.`
// }
//
// internals.isRef = (ref) => {
//     return typeof ref === 'string' && /^(ref|context):.+/.test(ref)
// }
//
//
// internals.formatReference = (ref) => {
//     if (ref.startsWith('ref:')) {
//         return ref.substr(4)
//     }
//
//     return '$' + ref.substr(8)
// }
//
// internals.processRuleArgument = (rule) => {
//     const arg = rule.arg
//     if (rule.name === 'assert') {
//         return {
//             key: internals.formatReference(arg.ref),
//             value: internals.getParamsData(arg.schema)
//         }
//     } else if (rule.name === 'regex' && arg.pattern) {
//         let pattern = arg.pattern
//
//         if (arg.name) {
//             pattern += ` (${arg.name})`
//         }
//
//         if (arg.invert) {
//             pattern += ' - inverted'
//         }
//
//         return pattern
//     } else if (internals.isRef(arg)) {
//         return {
//             ref: internals.formatReference(arg)
//         }
//     }
//
//     return arg || JSON.stringify(arg)
// }

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
