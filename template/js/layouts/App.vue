<template>
    <div id="app">
        <app-header></app-header>
        <app-sidebar></app-sidebar>
        <app-content></app-content>
        <app-background></app-background>
    </div>
</template>

<script>
import AppHeader from '@/js/patterns/Header'
import AppSidebar from '@/js/patterns/Sidebar'
import AppContent from '@/js/patterns/Content'
import AppBackground from '@/js/patterns/Background'

export default {
    el: '#app',

    async beforeCreate() {
        await this.$store.dispatch('routes/fetchRoutesData')

        const hash = window.location.hash

        if (hash) {
            this.$scrollTo(hash)
        }
    },

    components: {
        AppHeader,
        AppSidebar,
        AppContent,
        AppBackground
    }
}
</script>
