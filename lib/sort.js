exports.sortTags = sortTags
exports.sortPaths = sortPaths

function sortTags(sortType = 'name', tags = []) {
    sortType = ['order', 'ordered'].includes(sortType) ? 'order' : 'name'

    tags.sort(sortArrayOfObjectsByProperty(sortType))

    return tags
}

function sortPaths(sortType = 'path', routes = []) {
    if (sortType === 'ordered') {
        sortType = 'order'
    }
    sortType = ['order', 'method'].includes(sortType) ? sortType : 'path'

    routes.sort(sortArrayOfObjectsByProperty(sortType))

    return routes
}

function sortArrayOfObjectsByProperty(prop = '') {
    return (a, b) => {
        if (a[prop] < b[prop]) return -1
        if (a[prop] > b[prop]) return 1
        return 0
    }
}
