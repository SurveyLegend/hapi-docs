<template>
    <div class="content">
        <template v-for="(group, groupName) in routes">
            <section class="method first-of-group" :id="groupName">
                <div class="method__area">
                    <div class="method__copy">
                        <div class="method__copy__padding">
                            <h1>{{ groupName | capitalize }}</h1>
                        </div>
                    </div>
                </div>
            </section>
            <template v-for="route in group">
                <section class="method" :id="route.slug">
                    <div class="method__area">
                        <div class="method__copy">
                            <div class="method__copy__padding">
                                <h1>{{ route.description }}</h1>
                                <template v-if="route.notes">
                                    <p v-for="note in route.notes">
                                        <vue-markdown>{{ note }}</vue-markdown>
                                    </p>
                                </template>
                            </div>
                            <div class="method__list" :class="{ 'is-empty': route.pathParams === null }">
                                <h5>Arguments</h5>
                                <ul class="method__list__group">
                                    <template v-if="route.pathParams !== null">
                                        <template v-for="param in route.pathParams.children">
                                            <li class="method__list__item" :id="`${route.slug}-${param.name}`">
                                                <h3 class="method__list__item__label">
                                                    <a class="header-anchor" :href="`#${route.slug}-${param.name}`" @click="scrollTo(`#${route.slug}-${param.name}`)"/>{{ param.name }}
                                                    <span class="method__list__item__label__badge" v-if="param.flags && param.flags.required">Required</span>
                                                    <span class="method__list__item__label__details" v-else>optional</span>
                                                </h3>
                                                <vue-markdown :source="param.description" class="method__list__item__description"></vue-markdown>
                                            </li>
                                        </template>
                                    </template>
                                    <li class="method__list__item" v-else>
                                        <h3 class="method__list__item__label">No arguments…</h3>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="method__example">
                            <div class="method__example__part">
                                <div class="method__example__declaration">
                                    <prism language="bash">{{ route.method }} {{ route.uri + route.path }}</prism>
                                </div>
                                <!-- <div class="method__example__response">
                                    <prism language="json"></prism>
                                </div> -->
                            </div>
                        </div>
                    </div>
                </section>
            </template>
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

    methods: {
        scrollTo(element) {
            this.$scrollTo(element)
        }
    }
}
</script>
