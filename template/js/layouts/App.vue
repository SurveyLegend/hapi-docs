<template>
    <div>
        <app-sidebar></app-sidebar>
        <app-main></app-main>
    </div>
</template>

<script>
import AppSidebar from '@/js/patterns/Sidebar'
import AppMain from '@/js/views/Main'

export default {
    components: {
        AppSidebar,
        AppMain
    }
}
</script>
