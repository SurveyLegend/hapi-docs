<template>
    <div class="sidebar">
        <scroll-spy class="sidebar__navigation">
            <h5 class="sidebar__navigation__heading">API</h5>
            <ul
                v-for="(group, groupName) in routes"
                :key="groupName"
                class="sidebar__navigation__items">
                <li>
                    <a
                        :href="`#${groupName}`"
                        class="sidebar__navigation__item">{{ groupName | capitalize }}</a>
                    <ul class="sidebar__navigation__items">
                        <li
                            v-for="route in group"
                            :key="route.id">
                            <a
                                :href="`#${route.slug}`"
                                class="sidebar__navigation__item">{{ route.description }}</a>
                        </li>
                    </ul>
                </li>
            </ul>
        </scroll-spy>
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
