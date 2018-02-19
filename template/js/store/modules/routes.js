import axios from 'axios'
import * as types from '../mutation-types'

export const state = {
    data: {}
}

export const getters = {
    data: state => state.data
}

export const mutations = {
    [types.FETCH_ROUTES_DATA](state, { routes }) {
        state.data = routes
    }
}

export const actions = {
    async fetchRoutesData({ commit }) {
        const { data } = await axios.get('/routes')

        commit(types.FETCH_ROUTES_DATA, { routes: data })
    }
}
