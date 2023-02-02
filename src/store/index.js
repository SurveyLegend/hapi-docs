import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import * as types from './mutation-types'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        hapiDocs: {
            namespaced: true,
            state: () => ({
                host: '',
                scheme: '',
                info: null,
                security: [],
                errors: [],
                paths: null,
                groups: null,
                tags: null
            }),
            mutations: {
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
            },
            actions: {
                async fetchData({ commit }) {
                    const { data } = await axios.get('/hapi-docs')

                    commit(types.FETCH_DATA, { data })
                }
            },
            getters: {
                host: (state) => state.host,
                scheme: (state) => state.scheme,
                info: (state) => state.info,
                security: (state) => state.security,
                errors: (state) => state.errors,
                paths: (state) => state.paths,
                groups: (state) => state.groups,
                tags: (state) => state.tags,
                groupedPaths: (getters) => {
                    const grouped = []

                    if (getters.tags) {
                        getters.tags.forEach((tag) => {
                            grouped.push({
                                name: tag.name,
                                descriptions: tag.descriptions || null,
                                deprecated: tag.deprecated || false,
                                internal: tag.internal || false,
                                experimental: tag.experimental || false,
                                uppercase: tag.uppercase || false,
                                paths: getters.paths.filter((path) => path.group === tag.name)
                            })
                        })
                    }

                    if (getters.groups) {
                        getters.groups.forEach((group) => {
                            const tag = getters.tags.find((tag) => tag.name === group)

                            if (!tag) {
                                grouped.push({
                                    name: group,
                                    descriptions: null,
                                    deprecated: false,
                                    internal: false,
                                    experimental: false,
                                    uppercase: false,
                                    paths: getters.paths.filter((path) => path.group === group)
                                })
                            }
                        })
                    }

                    return grouped
                }
            }
        }
    }
})
