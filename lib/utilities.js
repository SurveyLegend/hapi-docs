export function removeTrailingSlash(value) {
    return value.endsWith('/')
        ? value.slice(0, -1)
        : value
}

export function slugify(value) {
    return typeof value !== 'string'
        ? false
        : value
              .trim()
              .toLowerCase()
              .replace(/[\s\W-]+/g, '_')
}
