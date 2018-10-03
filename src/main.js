import Vue from 'vue'
import store from '@/store'
import filters from '@/filters'
import App from '@/components/App'

import '@/components'
import '@/plugins/progressbar'

Vue.use(filters)
Vue.config.productionTip = false

export default new Vue({
    store,
    ...App
})
