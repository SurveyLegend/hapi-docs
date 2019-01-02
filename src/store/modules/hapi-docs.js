import axios from 'axios'
import * as types from '../mutation-types'

export const state = {
    host: '',
    scheme: '',
    info: null,
    security: null,
    errors: [],
    paths: null,
    groups: null,
    tags: null
}

export const getters = {
    host: state => state.host,
    scheme: state => state.scheme,
    info: state => state.info,
    security: state => state.security,
    errors: state => state.errors,
    paths: state => state.paths,
    groups: state => state.groups,
    tags: state => state.tags,
    groupedPaths: getters => {
        const grouped = []

        if (getters.tags) {
            getters.tags.forEach(tag => {
                grouped.push({
                    name: tag.name,
                    descriptions: tag.descriptions || null,
                    deprecated: tag.deprecated || false,
                    paths: getters.paths.filter(path => path.group === tag.name)
                })
            })
        }

        if (getters.groups) {
            getters.groups.forEach(group => {
                const tag = getters.tags.find(tag => tag.name === group)

                if (!tag) {
                    grouped.push({
                        name: group,
                        descriptions: null,
                        deprecated: false,
                        paths: getters.paths.filter(path => path.group === group)
                    })
                }
            })
        }

        return grouped
    }
}

export const mutations = {
    [types.FETCH_DATA](state, { data }) {
        state.host = data.host
        state.scheme = data.scheme
        state.info = data.info
        state.security = data.security
        state.errors = data.errors
        state.paths = data.paths
        state.groups = data.groups
        state.tags = data.tags
    }
}

export const actions = {
    async fetchData({ commit }) {
        const { data } = await axios.get('/hapi-docs')

        commit(types.FETCH_DATA, { data })
    }
}
