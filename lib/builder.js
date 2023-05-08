const { removeTrailingSlash } = require('./utilities')
const { sortTags, sortPaths } = require('./sort')
const filterRoutesWithTags = require('./filter')
const groupRoutesByPath = require('./group')
const buildInfo = require('./info')
const buildTags = require('./tags')
const buildSecurity = require('./security')
const buildErrors = require('./errors')
const Paths = require('./paths')

module.exports = main
exports.default = main

function main(settings, request) {
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
