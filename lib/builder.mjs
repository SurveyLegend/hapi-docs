import Utilities from './utilities'
import Filter from './filter'
import Group from './group'
import Info from './info'
import Paths from './paths'

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

    let paths = new Paths(settings)
    let pathData = paths.build(routes)

    docs.paths = pathData

    return docs
}

export default builder
