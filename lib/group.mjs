const group = {}

group.appendByPath = (basePath, pathPrefixSize, routes) => {
    let groups = []

    routes.forEach(route => {
        let prefix = group.getNameByPath(basePath, pathPrefixSize, route.path)

        route.group = prefix

        if (groups.indexOf(prefix) === -1) {
            groups.push(prefix)
        }
    })

    return groups
}

group.getNameByPath = (basePath, pathPrefixSize, path) => {
    let i = 0
    let pathHead = []
    let parts = path.split('/')

    while (parts.length > 0) {
        let item = parts.shift()

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

export default group
