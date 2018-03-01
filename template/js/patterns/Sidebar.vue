<template>
    <div class="sidebar">
        <nav role="navigation" class="sidebar__navigation">
            <h5 class="sidebar__navigation__heading">API</h5>
            <ul class="sidebar__navigation__items" v-for="(group, groupName) in routes">
                <li>
                    <a class="sidebar__navigation__item" :href="`#${groupName}`" @click="scrollTo(`#${groupName}`)">{{ groupName | capitalize }}</a>
                    <ul class="sidebar__navigation__items">
                        <li v-for="route in group">
                            <a class="sidebar__navigation__item" :href="`#${route.slug}`" @click="scrollTo(`#${route.slug}`)">{{ route.description }}</a>
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

    methods: {
        scrollTo(element) {
            this.$scrollTo(element)
        }
    }
}
</script>
