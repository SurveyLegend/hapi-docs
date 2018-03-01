<template>
    <div class="content">
        <template v-for="(group, groupName) in routes">
            <section class="route">
                <div class="route__area">
                    <div class="route__copy">
                        <div class="route__copy__padding">
                            <h1>{{ groupName | capitalize }}</h1>
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
                                <p v-for="note in route.notes">
                                    <vue-markdown>{{ note }}</vue-markdown>
                                </p>
                            </template>
                        </div>
                        <div class="route__list" :class="{ 'is-empty': route.pathParams === null }">
                            <h5>Arguments</h5>
                            <ul class="route__list__group">
                                <template v-if="route.pathParams !== null">
                                    <li class="route__list__item" v-for="param in route.pathParams.children">
                                        <h3 class="route__list__item__label">
                                            <a href="#" class="header-anchor"/>{{ param.name }}
                                            <span class="route__list__item__label__badge" v-if="param.flags.required">Required</span>
                                            <span class="route__list__item__label__details" v-else>optional</span>
                                        </h3>
                                        <vue-markdown :source="param.description" class="route__list__item__description"></vue-markdown>
                                    </li>
                                </template>
                                <li class="route__list__item" v-else>
                                    <h3 class="route__list__item__label">No arguments…</h3>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="route__example">
                        <div class="route__example__part">
                            <div class="route__example__declaration">
                                <prism language="bash">{{ route.method }} {{ route.uri + route.prefix + route.path }}</prism>
                            </div>
                            <!-- <div class="route__example__response">
                                <prism language="json"></prism>
                            </div> -->
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
import VueMarkdown from 'vue-markdown'
import { mapGetters } from 'vuex'

export default {
    components: {
        Prism,
        VueMarkdown
    },

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
