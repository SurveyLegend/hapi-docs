module.exports = main
exports.default = main
exports.getNameByPath = getNameByPath

function main(basePath, pathPrefixSize, routes) {
    const groups = []

    routes.forEach((route) => {
        const prefix = getNameByPath(basePath, pathPrefixSize, route.path)

        route.group = prefix

        if (groups.indexOf(prefix) < 0) {
            groups.push(prefix)
        }
    })

    return groups
}
function getNameByPath(basePath, pathPrefixSize, path) {
    let i = 0
    const pathHead = []
    const parts = path.split('/')

    while (parts.length) {
        const item = parts.shift()

        if (item !== '') {
            pathHead.push(item)
            i++
        }

        if (i >= pathPrefixSize) {
            break
        }
    }

    let name = pathHead.join('/')

    if (basePath !== '/' && '/' + name.startsWith(basePath)) {
        name = ('/' + name).replace(basePath, '')

        if (name.startsWith('/')) {
            name = name.replace('/', '')
        }
    }

    return name
}
