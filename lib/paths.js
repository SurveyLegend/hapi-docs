import Joi from 'joi'
import { reach } from '@hapi/hoek'

import { slugify } from './utilities.js'

export default class Paths {
    constructor(settings) {
        this.settings = settings
    }

    build(routes) {
        const routesData = []

        routes.forEach((route) => {
            if (route.settings.description) {
                const routeOptions = reach(route, 'settings.plugins.hapi-docs') || {}
                const routeData = {
                    path: route.path,
                    method: route.method.toUpperCase(),
                    description: route.settings.description,
                    notes: this.processNotes(route.settings.notes),
                    pathParams: this.describe(reach(route, 'settings.validate.params')),
                    queryParams: this.describe(reach(route, 'settings.validate.query')),
                    payloadParams: this.describe(reach(route, 'settings.validate.payload')),
                    headersParams: this.describe(reach(route, 'settings.validate.headers')),
                    order: reach(routeOptions, 'order') || null,
                    deprecated: reach(routeOptions, 'deprecated') || false,
                    internal: reach(routeOptions, 'internal') || false,
                    experimental: reach(routeOptions, 'experimental') || false,
                    slug: slugify(route.settings.description),
                    group: route.group
                }

                routesData.push(routeData)
            }
        })

        return routesData
    }

    processNotes(notes) {
        return Array.isArray(notes) ? notes : [notes]
    }

    processAllow(allow) {
        if (!allow) {
            return null
        }

        const wrapped = allow.map((value) => '`' + value + '`')
        const last = wrapped.pop()
        const allowed = wrapped.join(', ') + ' or ' + last

        return `Possible values are ${allowed}.`
    }

    describe(params) {
        if (!params || typeof params !== 'object') {
            return null
        }

        const compiled = Joi.compile(params)
        const description = compiled.describe()

        return this.getParamsData(description)
    }

    getParamsData(param) {
        const paramsData = []

        if (param && param.type === 'object' && param.keys) {
            Object.entries(param.keys).forEach(([key, val]) => {
                const data = {
                    name: key,
                    notes: this.processNotes(val.notes),
                    tags: val.tags,
                    type: val.type,
                    allow: this.processAllow(val.allow),
                    flags: val.flags && {
                        description: val.flags.description,
                        required: val.flags.presence === 'required',
                        default: val.flags.default
                    }
                }

                paramsData.push(data)
            })
        }

        return paramsData
    }
}
