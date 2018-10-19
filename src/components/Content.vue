<template>
    <div class="content">
        <template v-if="checkGroups">
            <section
                v-if="checkInfo"
                id="intro"
                class="method first-of-group">
                <div class="method__area">
                    <div class="method__copy">
                        <div class="method__copy__padding">
                            <h1>{{ info.title }}</h1>
                            <p v-if="info.description">
                                <marked>{{ info.description }}</marked>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <template v-for="group in groups">
                <section
                    :key="group.name"
                    :id="group.name"
                    class="method first-of-group">
                    <div class="method__area">
                        <div class="method__copy">
                            <div class="method__copy__padding">
                                <h1>
                                    <span>{{ group.name | capitalize }}</span>
                                    <span
                                        v-if="group.deprecated"
                                        class="method__badge method__badge--deprecated">Deprecated</span>
                                </h1>
                                <p v-if="group.description">
                                    <marked>{{ group.description }}</marked>
                                </p>
                            </div>
                        </div>
                        <div class="method__example"/>
                    </div>
                </section>
                <template v-for="path in group.paths">
                    <section
                        :key="path.id"
                        :id="path.slug"
                        class="method">
                        <div class="method__area">
                            <div class="method__copy">
                                <div class="method__copy__padding">
                                    <h1>
                                        <span>{{ path.description }}</span>
                                        <span
                                            v-if="path.deprecated"
                                            class="method__badge method__badge--deprecated">Deprecated</span>
                                    </h1>
                                    <template v-if="path.notes">
                                        <p
                                            v-for="note in path.notes"
                                            :key="note.id">
                                            <marked>{{ note }}</marked>
                                        </p>
                                    </template>
                                </div>
                                <div class="method__list is-empty">
                                    <h5>Arguments</h5>
                                    <ul class="method__list__group">
                                        <!-- <template v-if="path.pathParams !== null">
                                            <template v-for="param in path.pathParams.children">
                                                <li
                                                    :key="param.id"
                                                    :id="`${path.slug}-${param.name}`"
                                                    class="method__list__item">
                                                    <h3 class="method__list__item__label">
                                                        <a
                                                            :href="`#${path.slug}-${param.name}`"
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
                                        </template> -->
                                        <li
                                            class="method__list__item">
                                            <h3 class="method__list__item__label">No arguments…</h3>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="method__example">
                                <!-- <div class="method__example__part">
                                    <div class="method__example__declaration">
                                        <prism language="bash">{{ route.method }} {{ route.prefix + route.path }}</prism>
                                    </div>
                                    <div class="method__example__response">
                                        <prism language="json"/>
                                    </div>
                                </div> -->
                            </div>
                        </div>
                    </section>
                </template>
            </template>
        </template>
        <section
            v-else
            class="method">
            <div class="method__area">
                <div class="method__copy">
                    <div class="method__copy__padding">
                        <div
                            class="loading__shimmer"
                            style="height: 32px; width: 15rem; margin-bottom: 30px;"/>
                        <div
                            class="loading__shimmer"
                            style="height: 16px; width: 95%; margin-bottom: 12px;"/>
                        <div
                            class="loading__shimmer"
                            style="height: 16px; width: 95%; margin-bottom: 12px;"/>
                        <div
                            class="loading__shimmer"
                            style="height: 16px; width: 95%; margin-bottom: 12px;"/>
                        <div
                            class="loading__shimmer"
                            style="height: 16px; width: 45%; margin-bottom: 45px;"/>
                        <div
                            class="loading__shimmer"
                            style="height: 16px; width: 95%; margin-bottom: 12px;"/>
                        <div
                            class="loading__shimmer"
                            style="height: 16px; width: 95%; margin-bottom: 12px;"/>
                        <div
                            class="loading__shimmer"
                            style="height: 16px; width: 45%; margin-bottom: 64px;"/>
                        <div
                            class="loading__shimmer"
                            style="height: 200px; width: 95%; margin-bottom: 12px;"/>
                    </div>
                </div>
            </div>
        </section>
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
            info: 'hapi-docs/info',
            groups: 'hapi-docs/groupedPaths',
            checkInfo: 'hapi-docs/checkInfo',
            checkGroups: 'hapi-docs/checkGroups'
        })
    }
}
</script>

<style scoped lang="scss">
.content {
    position: absolute;
    z-index: z-index(above);
    top: 0;
    right: 0;
    bottom: 0;
    left: 221px;

    overflow-x: hidden;
    overflow-y: scroll;

    @include respond-to(medium-screens) {
        left: 181px;
    }

    @include respond-to(wide-screens) {
        left: 281px;
    }
}

.method {
    position: relative;
    z-index: z-index(default) + 1;

    overflow: hidden;

    &:first-child {
        margin-top: 1px;
    }

    &:last-child {
        min-height: 100vh;
    }
}

.method__area {
    overflow: hidden;
}

.method__copy {
    float: left;

    width: calc((100vw - 220px) * 0.45);
    padding: 0 0 50px;

    @include respond-to(wide-screens) {
        width: 780px;
    }

    .method.first-of-group:not(:first-child) & {
        border-top: 1px solid #f0f4f7;
    }

    .method__area:first-child & {
        padding-top: 30px;
    }

    // code {
    //     font-size: 13px;
    //     line-height: 20px;
    //
    //     display: inline-block;
    //
    //     padding: 0 5px;
    //
    //     color: #b93d6a;
    //     border: 1px solid #f0f4f7;
    //     border-radius: 4px;
    //     background: #fafcfc;
    //
    //     @include font-source-code-pro;
    // }
}

.method__copy__padding {
    padding: 40px 40px 20px;

    &:last-child {
        padding-bottom: 0;
    }

    @include respond-to(medium-screens) {
        padding: 20px 40px;
    }
}

.method__badge {
    display: inline-block;
    margin-left: 8px;
    padding: 0 11px;
    border: 1px solid rgba(0, 153, 229, 0.5);
    border-radius: 24px;
    color: #0099e5;
    font-size: 11px;
    font-weight: 600;
    line-height: 24px;
    text-transform: uppercase;
    vertical-align: middle;

    &.method__badge--deprecated {
        border: 1px solid rgba(224, 76, 76, 0.5);
        color: #e04c4c;
    }
}

.method__list {
    padding: 40px 40px 0;

    .method__copy__padding + & {
        padding-bottom: 40px;
    }
}

.method__list__group {
    margin-top: 8px;

    border-top: 1px solid #e1e8ed;
}

.method__list__item {
    line-height: 24px;

    padding: 17px 0;

    border-bottom: 1px solid #f0f4f7;

    // @include respond-to(wide-screens) {
    //     &:after,
    //     &:before {
    //         display: table;
    //
    //         content: '';
    //     }
    //
    //     &:after {
    //         clear: both;
    //     }
    // }

    &:last-child {
        border-bottom: 1px solid #e1e8ed;
    }
}

.method__list__item__label {
    font-size: 14px !important;
    line-height: 21px !important;

    white-space: normal;
    word-break: break-all;

    // @include respond-to(wide-screens) {
    //     position: relative;
    //     z-index: z-index(default) + 4;
    //
    //     float: left;
    //
    //     width: 180px;
    //
    //     text-align: right;
    // }
    //
    // @include respond-to(wide-screens) {
    //     .method__list:not(.is-empty) &:after {
    //         font-weight: 400;
    //
    //         position: absolute;
    //         top: 0;
    //         left: 200px;
    //
    //         content: '\2014';
    //         text-align: left;
    //
    //         color: #dde4e8;
    //     }
    // }

    // &:hover {
    //     .header-anchor {
    //         opacity: 1;
    //     }
    // }

    .method__list.is-empty & {
        font-weight: 400 !important;

        text-align: center;

        color: #939da3 !important;

        @include respond-to(wide-screens) {
            width: 100%;
        }
    }

    // .header-anchor {
    //     position: relative;
    //     top: 3px;
    //     left: -15px;
    //
    //     display: inline-block;
    //
    //     width: 15px;
    //     height: 14px;
    //     margin-right: -15px;
    //
    //     opacity: 0;
    //     background-position: 50% 50%;
    //     background-size: 9px 8px;
    //     @include icon('../img/anchor@2x.png');
    //
    //     isolation: isolate;
    // }
}

// .method__list__item__label__details {
//     font-size: 13px;
//     font-weight: 400;
//
//     word-break: normal;
//
//     color: #939da3;
//
//     @include respond-to(wide-screens) {
//         display: block;
//     }
// }
//
// .method__list__item__label__badge {
//     font-size: 11px;
//     font-weight: 600;
//     line-height: 20px;
//
//     display: inline-block;
//
//     margin-left: 5px;
//     padding: 0 8px;
//
//     vertical-align: top;
//     text-transform: uppercase;
//
//     color: #ffae54;
//     border: 1px solid rgba(255, 174, 84, 0.5);
//     border-radius: 11px;
//
//     @extend .method__list__item__label__details;
//     @include respond-to(wide-screens) {
//         line-height: 1.2em;
//
//         display: block;
//
//         margin-left: 0;
//         padding: 4px 0 0;
//
//         border: 0;
//         border-radius: 0;
//     }
// }
//
// .method__list__item__description {
//     font-size: 14px;
//     line-height: 21px;
//
//     @include respond-to(wide-screens) {
//         position: relative;
//         z-index: z-index(above);
//
//         margin: 0 0 0 200px;
//
//         background: white;
//
//         p {
//             margin-top: 0;
//         }
//     }
//
//     p {
//         font-size: inherit;
//     }
// }
//
.method__example {
    position: relative;
    z-index: z-index(default) + 1;

    margin-left: calc((100vw - 220px) * 0.45);
    padding: 42px 0 50px;

    color: #dde4e8;

    @include respond-to(wide-screens) {
        margin-left: 780px;
    }

    .method.first-of-group:not(:first-child) & {
        border-top: 1px solid #33383b;
    }

    // .method__area &:first-child {
    //     padding-top: 72px;
    // }
    //
    // code,
    // pre {
    //     text-align: left;
    //     white-space: pre-wrap;
    //     word-spacing: normal;
    //     word-break: break-word;
    //     tab-size: 4;
    //     hyphens: none;
    //
    //     color: #d0d0d0;
    //
    //     direction: ltr;
    // }
    //
    // pre {
    //     font-size: 13px;
    //     font-weight: 500;
    //     line-height: 1.5em;
    //
    //     padding: 20px 40px;
    //
    //     border-radius: 5px;
    //     background: #272b2d;
    //
    //     @include font-source-code-pro;
    // }
}
//
// .method__example__part {
//     padding: 30px 40px;
// }
//
// .method__example__declaration,
// .method__example__response {
//     padding: 20px 0;
//
//     &:first-child {
//         padding-top: 0;
//     }
//
//     &:before {
//         font-size: 15px;
//         font-weight: 500;
//
//         display: inline-block;
//
//         margin-right: 5px;
//         padding-bottom: 8px;
//
//         letter-spacing: 0.1px;
//
//         color: #d0d4d7;
//
//         @include font-hind;
//     }
// }
//
// .method__example__declaration {
//     &:before {
//         content: 'Definition';
//     }
// }
//
// .method__example__response {
//     &:before {
//         content: 'Example Response';
//     }
// }

.loading__shimmer {
    background-color: #f6f7f9;
    background-image: linear-gradient(90deg, #f6f7f9 0, #e9ebee 20%, #f6f7f9 40%, #f6f7f9);
    background-repeat: no-repeat;
    background-size: 100vw 100%;
    animation-duration: 1.6s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-name: loadingShimmer;
    animation-timing-function: linear;
    border-radius: 4px;
}

@keyframes loadingShimmer {
    0% {
        background-position: -50vw top;
    }

    to {
        background-position: 150vw top;
    }
}
</style>
