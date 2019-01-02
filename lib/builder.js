import Utilities from './utilities'
import Filter from './filter'
import Group from './group'
import Sort from './sort'
import Info from './info'
import Paths from './paths'
import Tags from './tags'
import Security from './security'
import Errors from './errors'

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
