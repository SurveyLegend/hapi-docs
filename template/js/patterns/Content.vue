<template>
    <div class="content">
        <template v-for="(group, groupName) in routes">
            <section
                :key="groupName"
                :id="groupName"
                class="method first-of-group">
                <div class="method__area">
                    <div class="method__copy">
                        <div class="method__copy__padding">
                            <h1>{{ groupName | capitalize }}</h1>
                        </div>
                    </div>
                </div>
            </section>
            <template v-for="route in group">
                <section
                    :key="route.id"
                    :id="route.slug"
                    class="method">
                    <div class="method__area">
                        <div class="method__copy">
                            <div class="method__copy__padding">
                                <h1>{{ route.description }}</h1>
                                <template v-if="route.notes">
                                    <p
                                        v-for="note in route.notes"
                                        :key="note.id">
                                        <vue-markdown>{{ note }}</vue-markdown>
                                    </p>
                                </template>
                            </div>
                            <div
                                :class="{ 'is-empty': route.pathParams === null }"
                                class="method__list">
                                <h5>Arguments</h5>
                                <ul class="method__list__group">
                                    <template v-if="route.pathParams !== null">
                                        <template v-for="param in route.pathParams.children">
                                            <li
                                                :key="param.id"
                                                :id="`${route.slug}-${param.name}`"
                                                class="method__list__item">
                                                <h3 class="method__list__item__label">
                                                    <a
                                                        :href="`#${route.slug}-${param.name}`"
                                                        class="header-anchor"/>
                                                    {{ param.name }}
                                                    <span
                                                        v-if="param.flags && param.flags.required"
                                                        class="method__list__item__label__badge">Required</span>
                                                    <span
                                                        v-else
                                                        class="method__list__item__label__details">optional</span>
                                                </h3>
                                                <vue-markdown
                                                    :source="param.description"
                                                    class="method__list__item__description"/>
                                            </li>
                                        </template>
                                    </template>
                                    <li
                                        v-else
                                        class="method__list__item">
                                        <h3 class="method__list__item__label">No arguments…</h3>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="method__example">
                            <div class="method__example__part">
                                <div class="method__example__declaration">
                                    <prism language="bash">{{ route.method }} {{ route.prefix + route.uri + route.path }}</prism>
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
    }
}
</script>
