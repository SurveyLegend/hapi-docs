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

        const description = this.getParamsData(Joi.compile(params).describe())

        return description
    }

    getParamsData(param, name) {
        const paramsData = {
            name,
            description: param.description,
            notes: this.processNotes(param.notes),
            tags: param.tags,
            type: param.type,
            valids: param.valids,
            flags: param.flags && {
                required: param.flags.presence === 'required',
                default: Hoek.reach(param.flags.default, 'description', {
                    default: param.flags.default
                })
            }
        }

        if (paramsData.type === 'object') {
            let children = []

            if (param.children) {
                const childrenKeys = Object.keys(param.children)
                children = children.concat(
                    childrenKeys.map(key => this.getParamsData(param.children[key], key))
                )
            }

            paramsData.children = children
        }

        if (paramsData.type === 'array') {
          let items = []

          if (param.items) {
            items = param.items.map(i => ({
                type: i.type,
                valids: i.valids
            }))
          }

          paramsData.items = items
        }

        return paramsData
    }
}

export default Paths
