<template>
    <div id="app">
        <app-sidebar></app-sidebar>
        <app-main></app-main>
    </div>
</template>

<script>
import AppSidebar from '@/js/patterns/Sidebar'
import AppMain from '@/js/views/Main'

export default {
    el: '#app',

    components: {
        AppSidebar,
        AppMain
    }
}
</script>
