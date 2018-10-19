import axios from 'axios'
import * as types from '../mutation-types'

export const state = {
    info: {},
    paths: [],
    groups: [],
    tags: []
}

export const getters = {
    info: state => state.info,
    paths: state => state.paths,
    groups: state => state.groups,
    tags: state => state.tags,
    groupedPaths: getters => {
        const grouped = []

        getters.groups.forEach(group => {
            const tag = getters.tags.find(tag => tag.name === group)

            grouped.push({
                name: group,
                description: tag.description || null,
                deprecated: tag.deprecated || false,
                paths: getters.paths.filter(path => path.group === group)
            })
        })

        return grouped
    },
    checkInfo: state => Object.keys(state.info).length !== 0,
    checkGroups: state => state.groups.length !== 0
}

export const mutations = {
    [types.FETCH_DATA](state, { data }) {
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
