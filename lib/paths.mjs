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
}

export default Paths
