import { removeTrailingSlash } from './utilities.js'
import { sortTags, sortPaths } from './sort.js'
import filterRoutesWithTags from './filter.js'
import groupRoutesByPath from './group.js'
import buildInfo from './info.js'
import buildTags from './tags.js'
import buildSecurity from './security.js'
import buildErrors from './errors.js'
import Paths from './paths.js'

export default async (settings, request) => {
    if (settings.endpoint !== '/') {
        settings.endpoint = removeTrailingSlash(settings.endpoint)
    }

    const docs = {
        host: settings.host,
        scheme: settings.scheme,
        info: buildInfo(settings),
        security: buildSecurity(settings),
        errors: buildErrors(settings)
    }

    const tagsData = buildTags(settings)
    docs.tags = sortTags(settings.sortTags, tagsData)

    const routes = filterRoutesWithTags(['api'], request.server.table())
    docs.groups = groupRoutesByPath(settings.basePath, settings.pathPrefixSize, routes)

    const paths = new Paths(settings)
    const pathData = paths.build(routes)
    docs.paths = sortPaths(settings.sortEndpoints, pathData)

    return docs
}
