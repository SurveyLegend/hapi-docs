import Vue from 'vue'
import VueWaypoint from 'vue-waypoint'
import App from '@/js/layouts/App'
import '@/js/components'

Vue.use(VueWaypoint)

new Vue({
    el: '#app',
    ...App
})
