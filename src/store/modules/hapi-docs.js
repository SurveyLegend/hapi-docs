import * as types from '../mutation-types'

export const state = {
    data: {}
}

export const getters = {
    info: state => state.data.info,
    paths: state => state.data.paths,
    groups: state => state.data.groups,
    tags: state => state.data.tags,
    groupedPaths: (state, getters) => {
        const groups = []

        if (getters.tags) {
            getters.tags.forEach(tag => {
                groups.push({
                    name: tag.name,
                    description: tag.description,
                    paths: getters.paths.filter(path => path.group === tag.name)
                })
            })
        } else if (getters.groups) {
            getters.groups.forEach(group => {
                groups.push({
                    name: group,
                    paths: getters.paths.filter(path => path.group === group)
                })
            })
        }

        return groups
    }
}

export const mutations = {
    [types.FETCH_DATA](state, { hapiDocs }) {
        state.data = hapiDocs
    }
}

export const actions = {
    async fetchData({ commit }) {
        const { data } = await this.$axios.get('/hapi-docs')

        commit(types.FETCH_DATA, { hapiDocs: data })
    }
}
