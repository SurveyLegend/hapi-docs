import Vue from 'vue'
import VueWaypoint from 'vue-waypoint'
import App from '@/js/layouts/App'
import '@/js/components'

Vue.use(VueWaypoint)

Vue.config.productionTip = false

new Vue({
    ...App
})
