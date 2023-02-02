import Utilities from './utilities.js'
import Filter from './filter.js'
import Group from './group.js'
import Sort from './sort.js'
import Info from './info.js'
import Paths from './paths.js'
import Tags from './tags.js'
import Security from './security.js'
import Errors from './errors.js'

const builder = {}

builder.getDocsData = async (settings, request) => {
    if (settings.endpoint !== '/') {
        settings.endpoint = Utilities.removeTrailingSlash(settings.endpoint)
    }

    let docs = {}

    docs.host = settings.host
    docs.scheme = settings.scheme

    docs.info = Info.build(settings)
    docs.security = Security.build(settings)
    docs.errors = Errors.build(settings)

    let tagsData = Tags.build(settings)

    Sort.tags(settings.sortTags, tagsData)

    docs.tags = tagsData

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
