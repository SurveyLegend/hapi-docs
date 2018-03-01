import Vue from 'vue'
import VueScrollTo from 'vue-scrollto'
import store from '@/js/store'
import App from '@/js/layouts/App'

Vue.config.productionTip = false

Vue.use(VueScrollTo, {
    container: '.content',
    duration: -1
})

Vue.filter('capitalize', value => {
    const string = value.toString()

    return string.charAt(0).toUpperCase() + string.slice(1)
})

new Vue({
    store,
    ...App
})
