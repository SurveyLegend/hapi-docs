import { intersect } from '@hapi/hoek'

export default (tags, routes) => {
    let tag

    return routes.filter((route) => {
        let exit

        for (let i = 0; i < tags.length; i++) {
            switch (tags[i].substring(0, 1)) {
                case '-':
                    tag = tags[i].substring(1, tags[i].length)
                    if (intersect(route.settings.tags, [tag]).length > 0) {
                        exit = true
                    }
                    break
                case '+':
                    tag = tags[i].substring(1, tags[i].length)
                    if (intersect(route.settings.tags, [tag]).length === 0) {
                        exit = true
                    }
                    break
            }
        }

        if (exit === true) {
            return false
        }

        return intersect(route.settings.tags, tags).length > 0
    })
}
