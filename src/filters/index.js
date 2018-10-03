import capitalize from './capitalize'

export default {
    install(Vue) {
        Vue.filter('capitalize', capitalize)
    }
}
