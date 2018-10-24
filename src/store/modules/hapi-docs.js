import axios from 'axios'
import * as types from '../mutation-types'

export const state = {
    host: '',
    scheme: [],
    info: {},
    paths: [],
    groups: [],
    tags: []
}

export const getters = {
    host: state => state.host,
    scheme: state => state.scheme,
    info: state => state.info,
    paths: state => state.paths,
    groups: state => state.groups,
    tags: state => state.tags,
    groupedPaths: getters => {
        const grouped = []

        getters.tags.forEach(tag => {
            const group = getters.groups.find(group => group === tag.name)

            grouped.push({
                name: tag.name,
                description: tag.description || null,
                deprecated: tag.deprecated || false,
                paths: getters.paths.filter(path => path.group === group)
            })
        })

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
    }
}

export const actions = {
    async fetchData({ commit }) {
        const { data } = await axios.get('/hapi-docs')

        commit(types.FETCH_DATA, { data })
    }
}
