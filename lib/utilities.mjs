const utilities = {}

utilities.removeTrailingSlash = string => {
    if (string.endsWith('/')) {
        return string.slice(0, -1)
    }

    return string
}

utilities.slugify = string => {
    return string
        .toLowerCase()
        .trim()
        .replace(/[\s\W-]+/g, '_')
}

export default utilities
