<template>
    <div class="sidebar">
        <nav role="navigation" class="sidebar__navigation">
            <h5 class="sidebar__navigation__heading">API</h5>
            <ul class="sidebar__navigation__items" v-for="(group, groupName) in routes">
                <li>
                    <a class="sidebar__navigation__item" href="#">{{ groupName | capitalize }}</a>
                    <ul class="sidebar__navigation__items">
                        <li v-for="route in group">
                            <a class="sidebar__navigation__item" href="#">{{ route.description }}</a>
                        </li>
                    </ul>
                </li>
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
    },

    filters: {
        capitalize: value => {
            if (!value) return ''

            value = value.toString()

            return value.charAt(0).toUpperCase() + value.slice(1)
        }
    }
}
</script>
