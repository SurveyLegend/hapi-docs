exports.removeTrailingSlash = removeTrailingSlash
exports.slugify = slugify

function removeTrailingSlash(value) {
    return value.endsWith('/') ? value.slice(0, -1) : value
}

function slugify(value) {
    return typeof value !== 'string'
        ? false
        : value
            .toLowerCase()
            .trim()
            .replace(/[\s\W-]+/g, '_')
}
