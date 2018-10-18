import Utilities from './utilities'

class Paths {
    constructor(settings) {
        this.settings = settings
    }

    build(routes) {
        const routesData = []

        routes.forEach(route => {
            let routeData = {
                path: route.path,
                method: route.method.toUpperCase(),
                description: route.settings.description,
                notes: route.settings.notes,
                order: Hoek.reach(routeOptions, 'order') || null,
                slug: Utilities.slugify(route.settings.description),
                group: route.group
            }

            routeData.notes = Array.isArray(routeData.notes) ? routeData.notes : [routeData.notes]

            routesData.push(routeData)
        })

        return routesData
    }
}

export default Paths
