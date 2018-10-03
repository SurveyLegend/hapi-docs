import * as types from '../mutation-types'

export const state = {
    data: {}
}

export const getters = {
    routes: state => state.data.routes,
    groups: state => state.data.groups,
    groupedRoutes: (state, getters) => {
        const groups = []

        if (getters.groups) {
            getters.groups.forEach(group => {
                groups.push({
                    name: group,
                    routes: getters.routes.filter(route => route.group === group)
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
