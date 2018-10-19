const sort = {}

sort.paths = (sortType, routes) => {
    if (sortType === 'ordered') {
        routes.sort((a, b) => {
            if (a.order < b.order) return -1
            if (a.order > b.order) return 1
            return 0
        })
    }

    if (sortType === 'path') {
        routes.sort((a, b) => {
            if (a.path < b.path) return -1
            if (a.path > b.path) return 1
            return 0
        })
    }

    if (sortType === 'method') {
        routes.sort((a, b) => {
            if (a.method < b.method) return -1
            if (a.method > b.method) return 1
            return 0
        })
    }

    return routes
}

export default sort
