<template>
    <div class="content">
        <template v-for="(group, key) in routes">
            <section class="route">
                <div class="route__area">
                    <div class="route__copy">
                        <div class="route__copy__padding">
                            <h1>{{ key }}</h1>
                        </div>
                    </div>
                </div>
            </section>
            <section class="route" v-for="route in group">
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
                    <div class="route__example">
                        <div class="route__example__part">
                            <div class="route__example__declaration">
                                <prism language="bash">{{ route.method }} {{ route.uri + route.prefix + route.path }}</prism>
                            </div>
                            <div class="route__example__response">
                                <prism language="json">test</prism>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </template>
    </div>
</template>

<script>
import 'prismjs'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-json'
import Prism from 'vue-prism-component'
import { mapGetters } from 'vuex'

export default {
    components: {
        Prism
    },

    computed: {
        ...mapGetters({
            routes: 'routes/data'
        })
    }
}
</script>
