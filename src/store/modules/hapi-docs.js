import axios from 'axios'
import * as types from '../mutation-types'

export const state = {
    host: '',
    scheme: '',
    info: null,
    paths: null,
    groups: null,
    tags: null,
    errors: []
}

export const getters = {
    host: state => state.host,
    scheme: state => state.scheme,
    info: state => state.info,
    paths: state => state.paths,
    groups: state => state.groups,
    tags: state => state.tags,
    errors: state => state.errors,
    groupedPaths: getters => {
        const grouped = []

        if (getters.tags) {
            getters.tags.forEach(tag => {
                grouped.push({
                    name: tag.name,
                    description: tag.description || null,
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
                        description: null,
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
        state.paths = data.paths
        state.groups = data.groups
        state.tags = data.tags
        state.errors = data.errors
    }
}

export const actions = {
    async fetchData({ commit }) {
        const { data } = await axios.get('/hapi-docs')

        commit(types.FETCH_DATA, { data })
    }
}
