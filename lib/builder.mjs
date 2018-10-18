import Utilities from './utilities'
import Filter from './filter'
import Group from './group'
import Sort from './sort'
import Info from './info'
import Paths from './paths'
import Tags from './tags'

const builder = {}

builder.getDocsData = async (settings, request) => {
    if (settings.endpoint !== '/') {
        settings.endpoint = Utilities.removeTrailingSlash(settings.endpoint)
    }

    let docs = {}

    docs.info = Info.build(settings)
    docs.tags = Tags.build(settings)

    let routes = request.server.table()

    routes = Filter.byTags(['api'], routes)

    docs.groups = Group.appendByPath(settings.basePath, settings.pathPrefixSize, routes)

    let paths = new Paths(settings)
    let pathData = paths.build(routes)

    Sort.paths(settings.sortEndpoints, pathData)

    docs.paths = pathData

    return docs
}

export default builder
