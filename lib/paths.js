import Joi from '@hapi/joi'
import Hoek from '@hapi/hoek'

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
                notes: this.processNotes(route.settings.notes),
                pathParams: this.describe(Hoek.reach(route, 'settings.validate.params')),
                queryParams: this.describe(Hoek.reach(route, 'settings.validate.query')),
                payloadParams: this.describe(Hoek.reach(route, 'settings.validate.payload')),
                headersParams: this.describe(Hoek.reach(route, 'settings.validate.headers')),
                order: Hoek.reach(routeOptions, 'order') || null,
                deprecated: Hoek.reach(routeOptions, 'deprecated') || false,
                internal: Hoek.reach(routeOptions, 'internal') || false,
                experimental: Hoek.reach(routeOptions, 'experimental') || false,
                slug: Utilities.slugify(route.settings.description),
                group: route.group
            }

            routesData.push(routeData)
        })

        return routesData
    }

    processNotes(notes) {
        return Array.isArray(notes) ? notes : [notes]
    }

    describe(params) {
        if (params === null || typeof params !== 'object') {
            return null
        }

        const compiled = Joi.compile(params)
        const description = compiled.describe()
        return this.getParamsData(description)
    }

    getParamsData(param) {
        let paramsData = []

        if (param.type === 'object' && param.keys) {
            Object.entries(param.keys).forEach(([key, val]) => {
                const data = {
                    name: key,
                    notes: this.processNotes(val.notes),
                    tags: val.tags,
                    type: val.type
                }
                if (val.flags) {
                    data.flags = {
                        description: val.flags.description,
                        required: val.flags.presence === 'required'
                    }
                    if (val.flags.default && typeof val.flags.default !== 'function') {
                        data.flags.default = Hoek.reach(val.flags.default, 'description', { default: val.flags.default })
                    }
                }
                paramsData.push(data)
            })
        }

        return paramsData
    }
}

export default Paths
