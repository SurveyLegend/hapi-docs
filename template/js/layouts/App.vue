<template>
    <div id="app">
        <app-header></app-header>
        <app-sidebar></app-sidebar>
        <app-content></app-content>
        <app-background></app-background>
        <vue-progress-bar></vue-progress-bar>
    </div>
</template>

<script>
import AppHeader from '@/js/patterns/Header'
import AppSidebar from '@/js/patterns/Sidebar'
import AppContent from '@/js/patterns/Content'
import AppBackground from '@/js/patterns/Background'

export default {
    el: '#app',

    components: {
        AppHeader,
        AppSidebar,
        AppContent,
        AppBackground
    },

    async beforeCreate() {
        await this.$store.dispatch('routes/fetchRoutes')

        const { hash } = window.location

        if (hash) {
            const target = document.getElementById(hash.substr(1))

            target.scrollIntoView()
        }
    },

    mounted() {
        this.$Progress.finish()
    },

    created() {
        this.$Progress.start()
    }
}
</script>
