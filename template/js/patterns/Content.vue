<template>
    <div class="content">
        <section class="route" id="kitten_object" v-for="route in routes">
            <div class="route__area">
                <div class="route__copy">
                    <div class="route__copy__padding">
                        <h1>{{ route.description }}</h1>
                        <template v-if="route.notes">
                            <p v-for="note in route.notes">{{ note }}</p>
                        </template>
                    </div>
                    <div class="route__list" v-if="route.pathParams">
                        <h5>Arguments</h5>
                        <ul class="route__list__group">
                            <li class="route__list__item" id="kitten_object-id" v-for="pathParams in route.pathParams.children">
                                <h3 class="route__list__item__label">
                                    <a href="#kitten_object-id" class="header-anchor"></a>{{ pathParams.name }}
                                    <span class="method__list__item__validation">{{ pathParams.type }}</span>
                                </h3>
                                <p class="route__list__item__description">{{ pathParams.description }}</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
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
