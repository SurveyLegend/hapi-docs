import Vue from 'vue'
import store from '@/js/store'
import App from '@/js/layouts/App'
import '@/js/components'

Vue.config.productionTip = false

new Vue({
    store,
    ...App
})
