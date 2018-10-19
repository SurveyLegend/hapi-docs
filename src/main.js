import Vue from 'vue'
import store from '@/store'
import filters from '@/filters'
import App from '@/components/App'

import '@/components'

Vue.use(filters)
Vue.config.productionTip = false

export default new Vue({
    store,
    ...App
})
