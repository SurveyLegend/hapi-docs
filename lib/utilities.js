const utilities = {}

utilities.removeTrailingSlash = string => {
    if (string.endsWith('/')) {
        return string.slice(0, -1)
    }

    return string
}

utilities.slugify = value => {
    if (typeof value !== 'string') {
        return false
    }

    return value
        .toLowerCase()
        .trim()
        .replace(/[\s\W-]+/g, '_')
}

export default utilities
