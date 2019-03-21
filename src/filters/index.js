import capitalize from './capitalize'
import uppercase from './uppercase'

export default {
    install(Vue) {
        Vue.filter('capitalize', capitalize)
        Vue.filter('uppercase', uppercase)
    }
}
