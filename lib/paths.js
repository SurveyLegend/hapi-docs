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

        return description
    }

    static getParamsData(param, name) {
        const paramsData = {
            name,
            description: param.description,
            notes: Paths.processNotes(param.notes),
            tags: param.tags,
            type: param.type,
            flags: param.flags && {
                required: param.flags.presence === 'required'
            }
        }

        if (paramsData.type === 'object') {
            let children = []

            if (param.children) {
                const childrenKeys = Object.keys(param.children)
                children = children.concat(
                    childrenKeys.map(key => Paths.getParamsData(param.children[key], key))
                )
            }

            paramsData.children = children
        }

        return paramsData
    }
}

export default Paths
