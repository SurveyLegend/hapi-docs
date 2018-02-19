<template>
    <div class="sidebar">
        <nav role="navigation" class="sidebar__navigation">
            <h5 class="sidebar__navigation__heading">API</h5>
            <ul class="sidebar__navigation__items">
                <li v-for="route in routes"><a class="sidebar__navigation__item" href="#">{{ route.description }}</a></li>
            </ul>
        </nav>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters({
            routes: 'routes/data'
        })
    }
}
</script>
