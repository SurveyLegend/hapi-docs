import Utilities from './utilities'
import Filter from './filter'
import Group from './group'
import Info from './info'

const internals = {}
const builder = {}

builder.getDocsData = async (settings, request) => {
    if (settings.endpoint !== '/') {
        settings.endpoint = Utilities.removeTrailingSlash(settings.endpoint)
    }

    let docs = {}

    docs.info = Info.build(settings)

    let routes = request.server.table()

    routes = Filter.byTags(['api'], routes)

    docs.groups = Group.appendByPath(settings.basePath, settings.pathPrefixSize, routes)
    docs.routes = internals.getRoutesData(routes)

    return docs
}

internals.getRoutesData = routes => {
    return routes.map(route => ({
        path: route.path,
        method: route.method.toUpperCase(),
        description: route.settings.description,
        slug: Utilities.slugify(route.settings.description),
        group: route.group
    }))
}

export default builder
