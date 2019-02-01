<template>
    <div class="content">
        <section
            id="welcome"
            class="method first-of-group"
        >
            <div class="method__area">
                <div class="method__copy">
                    <div class="method__copy__padding">
                        <h1>Welcome</h1>
                        <p>
                            <Marked>This is a demo of [hapi-docs](https://github.com/SurveyLegend/hapi-docs) which is perhaps the best, and most modern *API Documentation Generator* out there. From your code blocks to description texts, you simply type everything in Markdown. Then all you need to do is to enjoy a blazing fast single-page responsive documentation, which smartly supports linkability, Syntax highlighting, RTL languages, and perfectionist eyes.</Marked>
                            <div class="method__copy__full-with-picture demo-picture"><img src="../assets/images/hero.png"></div>
                            <Marked>hapi-docs is an open-source library brought to you by [SurveyLegend®](http://www.surveylegend.com/). Learn more about [hapi-docs on GitHub](https://github.com/SurveyLegend/hapi-docs), and let us know what you think.</Marked>
                        </p>
                    </div>
                </div>
                <div class="method__example">
                    <div class="method__example__part">
                        <div class="method__example__github-url">
                            <Prism language="bash">https://github.com/SurveyLegend/hapi-docs</Prism>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section
            v-if="info"
            id="intro"
            class="method first-of-group"
        >
            <div class="method__area">
                <div class="method__copy">
                    <div class="method__copy__padding">
                        <h1>Introduction</h1>
                        <template v-if="info.descriptions">
                            <p v-for="description in info.descriptions">
                                <Marked>{{ description }}</Marked>
                            </p>
                        </template>
                    </div>
                </div>
                <div class="method__example">
                    <div class="method__example__part">
                        <div class="method__example__base-url">
                            <Prism language="bash">{{ scheme }}://{{ host }}</Prism>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section
            v-if="security.length !== 0"
            id="authentication"
            class="method first-of-group"
        >
            <div class="method__area">
                <div class="method__copy">
                    <div class="method__copy__padding">
                        <h1>Authentication</h1>
                        <template v-if="security.descriptions">
                            <p v-for="description in security.descriptions">
                                <Marked>{{ description }}</Marked>
                            </p>
                        </template>
                    </div>
                </div>
                <div class="method__example" />
            </div>
        </section>
        <section
            v-if="errors.length !== 0"
            id="errors"
            class="method first-of-group"
        >
            <div class="method__area">
                <div class="method__copy">
                    <div class="method__copy__padding">
                        <h1>Errors</h1>
                        <template v-if="errors.descriptions">
                            <p v-for="description in errors.descriptions">
                                <Marked>{{ description }}</Marked>
                            </p>
                        </template>
                    </div>
                </div>
                <div
                    v-if="errors.codes"
                    class="method__example"
                >
                    <div class="method__example__part">
                        <h3>HTTP status code summary</h3>
                        <section class="table">
                            <table class="table__container">
                                <tbody>
                                    <tr v-for="code in errors.codes">
                                        <th class="table__row--property">{{ code.status }}</th>
                                        <td class="table__row">{{ code.description }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </section>
                    </div>
                </div>
            </div>
        </section>
        <template v-for="group in groups">
            <section
                :id="group.name"
                :key="group.name"
                class="method first-of-group"
            >
                <div class="method__area">
                    <div class="method__copy">
                        <div class="method__copy__padding">
                            <h1>
                                <span>{{ group.name | capitalize }}</span>
                                <span
                                    v-if="group.deprecated"
                                    class="method__badge method__badge--deprecated"
                                >Deprecated</span>
                            </h1>
                            <template v-if="group.descriptions">
                                <p v-for="description in group.descriptions">
                                    <Marked>{{ description }}</Marked>
                                </p>
                            </template>
                        </div>
                    </div>
                    <div class="method__example" />
                </div>
            </section>
            <template v-for="path in group.paths">
                <section
                    :id="path.slug"
                    class="method"
                >
                    <div class="method__area">
                        <div class="method__copy">
                            <div class="method__copy__padding">
                                <h1>
                                    <span>{{ path.description }}</span>
                                    <span
                                        v-if="path.deprecated"
                                        class="method__badge method__badge--deprecated"
                                    >Deprecated</span>
                                </h1>
                                <template v-if="path.notes">
                                    <p v-for="note in path.notes">
                                        <Marked>{{ note }}</Marked>
                                    </p>
                                </template>
                            </div>
                            <template v-if="path.pathParams !== null || path.payloadParams !== null">
                                <div
                                    v-if="path.pathParams !== null"
                                    class="method__list"
                                >
                                    <h5>Path Arguments</h5>
                                    <ul class="method__list__group">
                                        <li
                                            v-for="param in path.pathParams.children"
                                            :id="`${path.slug}-${param.name}`"
                                            class="method__list__item"
                                        >
                                            <h3 class="method__list__item__label">
                                                <a
                                                    :href="`#${path.slug}-${param.name}`"
                                                    class="header-anchor"
                                                />
                                                <span>{{ param.name }}</span>
                                                <span
                                                    v-if="param.flags && param.flags.required"
                                                    class="method__list__item__label__badge"
                                                >required</span>
                                                <span
                                                    v-else
                                                    class="method__list__item__label__details"
                                                >optional</span>
                                            </h3>
                                            <Marked class="method__list__item__description">{{ param.description }}</Marked>
                                        </li>
                                    </ul>
                                </div>
                                <div
                                    v-if="path.payloadParams !== null"
                                    class="method__list"
                                >
                                    <h5>Payload Arguments</h5>
                                    <ul class="method__list__group">
                                        <li
                                            v-for="param in path.payloadParams.children"
                                            :id="`${path.slug}-${param.name}`"
                                            class="method__list__item"
                                        >
                                            <h3 class="method__list__item__label">
                                                <a
                                                    :href="`#${path.slug}-${param.name}`"
                                                    class="header-anchor"
                                                />
                                                <span>{{ param.name }}</span>
                                                <span
                                                    v-if="param.flags && param.flags.required"
                                                    class="method__list__item__label__badge"
                                                >required</span>
                                                <span
                                                    v-else
                                                    class="method__list__item__label__details"
                                                >optional</span>
                                            </h3>
                                            <Marked class="method__list__item__description">{{ param.description }}</Marked>
                                        </li>
                                    </ul>
                                </div>
                            </template>
                            <div
                                v-else
                                class="method__list is-empty"
                            >
                                <h5>Arguments</h5>
                                <ul class="method__list__group">
                                    <li class="method__list__item">
                                        <h3 class="method__list__item__label">No arguments…</h3>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="method__example">
                            <div class="method__example__part">
                                <div class="method__example__declaration">
                                    <Prism language="bash">{{ path.method }} {{ scheme }}://{{ host }}{{ path.path }}</Prism>
                                </div>
                                <div class="method__example__response">
                                    <Prism language="json">{
  "id": "cus_CXBlt7aRZWiC0k",
  "object": "customer",
  "account_balance": 0,
  "created": 1521640419,
  "currency": "sek",
  "default_source": null,
  "delinquent": false,
  "description": "example",
  "discount": null,
  "email": "example@surveylegend.com"
}</Prism>
                                </div>
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
import { mapGetters } from 'vuex'

export default {
    components: {
        Prism
    },

    computed: {
        ...mapGetters({
            host: 'hapi-docs/host',
            scheme: 'hapi-docs/scheme',
            info: 'hapi-docs/info',
            security: 'hapi-docs/security',
            errors: 'hapi-docs/errors',
            groups: 'hapi-docs/groupedPaths'
        })
    }
}
</script>

<style lang="scss">
.content {
    position: absolute;
    z-index: z-index(above);
    top: 0;
    right: 0;
    bottom: 0;
    left: $sidebar-width-in-large-screens;

    overflow-x: hidden;
    overflow-y: scroll;

    -webkit-overflow-scrolling: touch;

    @include respond-to(medium-screens) {
        left: $sidebar-width-in-medium-screens;
    }

    @include respond-to(wide-screens) {
        left: $sidebar-width-in-wide-screens;
    }

    @include respond-to(small-screens) {
        left: 0;
        top: 50px;
    }

    @include respond-to(narrow-screens) {
        top: $header-height-in-narrow-screens * 2;
    }

    @include rtl {
        left: 0;
        right: $sidebar-width-in-large-screens;

        @include respond-to(medium-screens) {
            right: $sidebar-width-in-medium-screens;
            left: 0;
        }

        @include respond-to(wide-screens) {
            right: $sidebar-width-in-wide-screens;
            left: 0;
        }

        @include respond-to(small-screens) {
            right: 0;
            left: 0;
        }
    }
}

.method {
    position: relative;
    z-index: z-index(default) + 1;

    overflow: hidden;

    &:last-child {
        min-height: 100vh;

        @include respond-to(narrow-screens) {
            min-height: 0;
        }
    }
}

.method__area {
    overflow: hidden;
}

.method__copy {
    float: left;

    width: 50%;
    padding: 0 0 52px;


    @include respond-to(narrow-screens) {
        float: none;
        width: 100%;
    }

    @include rtl {
        float: right;
    }

    .method.first-of-group:not(:first-child) & {
        border-top: 1px solid $grey-02;
        transition: border-color 1s ease;

        @include dark-mode {
            border-top: 1px solid darken($grey-09, 8);

            @include respond-to(narrow-screens) {
                border-top: 0;
            }
        }
    }

    .method__area:first-child & {
        padding-top: 28px;

        @include respond-to(small-screens) {
            padding-top: 0;
        }
    }
}

.method__copy__padding {
    padding: 40px 40px 20px;

    &:last-child {
        padding-bottom: 0;
    }

    @include respond-to(medium-screens) {
        padding-right: 20px;
        padding-left: 20px;
    }

    @include respond-to(narrow-screens) {
        padding-right: 16px;
        padding-left: 16px;
    }
}

.method__copy__full-with-picture {
    margin: 20px auto 0 auto;
    position: relative;

    img {
        width: 100%;
        height: auto;
        border-radius: 5px;
        vertical-align: top;
    }

    &.demo-picture {
        // This is to inspire you how you can take advantage of dark mode
        border-radius: 6px;
        background: linear-gradient(to bottom, #8fdeff 0%, #0167ff 100%);
        transition: background 0.8s ease 0.06s;

        &:before {
            content: '';
            @include icon('../assets/images/hero-stars.png');
            background-size: contain;
            display: block;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            opacity: 0;
            transition: opacity 1.5s ease;
        }

        @include dark-mode {
            background: linear-gradient(to bottom, #3891f1 0%, #6410bf 100%);

            &:before {
                opacity: 1;
            }
        }

        img {
            margin-bottom: -2px;
        }
    }
}

.method__badge {
    display: inline-block;
    margin: 0 8px;
    padding: 0 12px;
    border: 1px solid rgba($blue, 0.5);
    border-radius: 24px;
    color: $blue;
    font-size: 11px;
    font-weight: 600;
    line-height: 24px;
    text-transform: uppercase;
    vertical-align: middle;

    &.method__badge--deprecated {
        border: 1px solid rgba($red, 0.5);
        color: $red;
    }
}

.method__list {
    padding: 40px 40px 0;

    @include respond-to(narrow-screens) {
        padding-left: 20px;
        padding-right: 20px;
    }

    @include respond-to(medium-screens) {
        padding-right: 20px;
        padding-left: 20px;
    }

    @include respond-to(narrow-screens) {
        padding-right: 16px;
        padding-left: 16px;
    }

    .method__copy__padding + & {
        padding-bottom: 40px;
    }
}

.method__list__group {
    margin-top: 8px;

    border-top: 1px solid $grey-03;
    transition: border-color 1s ease;

    @include dark-mode {
        border-top: 1px solid darken($grey-09, 4);
    }
}

.method__list__item {
    line-height: 24px;

    padding: 16px 0;

    border-bottom: 1px solid $grey-02;
    transition: border-color 1s ease;

    @include respond-to(large-screens) {
        zoom: 1;

        &:after,
        &:before {
            display: table;

            content: '';
        }

        &:after {
            clear: both;
        }
    }

    &:last-child {
        border-bottom: 1px solid $grey-03;
    }

    @include dark-mode {
        border-bottom: 1px solid darken($grey-09, 8);

        &:last-child {
            border-bottom: 1px solid darken($grey-09, 4);
        }
    }
}

.method__list__item__label {
    font-size: 14px;
    line-height: 21px;

    white-space: normal;
    word-break: break-all;

    margin-top: -4px;

    @include respond-to(large-screens) {
        position: relative;
        z-index: z-index(default) + 4;

        float: left;

        width: 180px;

        text-align: right;

        @include rtl {
            float: right;
            text-align: left;
        }
    }

    @include respond-to(large-screens) {
        .method__list:not(.is-empty) &:after {
            font-weight: 400;

            position: absolute;
            top: 4px;
            left: 200px;

            content: '\2014';
            text-align: left;

            color: $grey-04;

            @include dark-mode {
                color: lighten($grey-09, 3);
            }

            @include rtl {
                left: -32px;
            }
        }
    }

    &:hover {
        .header-anchor {
            opacity: 1;
        }
    }

    .method__list.is-empty & {
        font-weight: 400;

        text-align: center;

        color: $grey-07;

        @include dark-mode {
            color: darken($grey-07, 30);
        }

        @include respond-to(large-screens) {
            width: 100%;
        }
    }

    .header-anchor {
        position: relative;
        top: 4px;
        left: -8px;

        display: inline-block;

        width: 18px;
        height: 18px;

        opacity: 0;
        transition: opacity 0.2s ease, box-shadow 0.3s ease, background-color 0.2s ease;

        @include icon('../assets/svg/anchor.svg');
        background-size: 12px;
        background-color: $white;

        isolation: isolate;
        border-radius: 4px;

        &:hover {
            box-shadow: rgba($black, 0.04) 0 0 6px 2px, rgba($black, 0.05) 0 0 2px 2px;
        }

        &:active {
            box-shadow: rgba($black, 0) 0 0 2px 0;
        }

        @include dark-mode {
            background-color: $grey-11;

            &:hover {
                background-color: $grey-09;
                box-shadow: rgba($black, 0.2) 0 0 6px 2px, rgba($black, 0.1) 0 0 2px 2px;
            }
        }

        @include respond-to(medium-screens) {
            left: -4px;
        }

        @include rtl {
            left: 8px;

            @include respond-to(medium-screens) {
                left: 4px;
            }
        }
    }
}

.method__list__item__label__details {
    font-size: 13px;
    font-weight: 400;

    margin-left: 4px;

    word-break: normal;

    color: $grey-07;

    @include respond-to(large-screens) {
        display: block;
    }

    @include rtl {
        margin-right: 8px;
        margin-left: 0;

        @include respond-to(medium-screens) {
            display: inline-block;
        }
    }
}

.method__list__item__label__badge {
    font-size: 11px;
    font-weight: 600;
    line-height: 20px;

    display: inline-block;

    margin-left: 8px;
    padding: 0 8px;

    vertical-align: top;
    text-transform: uppercase;

    color: $orange;
    border: 1px solid rgba($orange, 0.5);
    border-radius: 20px;

    @extend .method__list__item__label__details;

    @include respond-to(large-screens) {
        line-height: 1.2em;

        display: block;

        margin-left: 0;
        padding: 4px 0 0;

        border: 0;
        border-radius: 0;
    }
}

.method__list__item__description {
    @include respond-to(large-screens) {
        position: relative;
        z-index: z-index(above);

        margin: 0 0 0 200px;

        background-color: $white;
        transition: background-color 0.8s ease;

        @include dark-mode {
            background-color: darken($grey-14, 4);
        }

        @include rtl {
            margin: 0 200px 0 0;
        }

        p {
            margin-top: 0;
        }
    }

    p {
        font-size: 14px;
        line-height: 21px;
    }
}

.method__example {
    position: relative;
    z-index: z-index(default) + 1;

    margin-left: 50%;
    padding: 42px 0 52px;

    color: $grey-04;


    @include respond-to(small-screens) {
        padding-top: 0;
    }

    @include respond-to(narrow-screens) {
        margin-left: 0;
        background-color: $grey-11;

        @include dark-mode {
            background-color: darken($grey-14, 8);
        }
    }

    @include rtl {
        margin-left: 0;
        margin-right: 50%;

        @include respond-to(narrow-screens) {
            margin-right: 0;
            margin-left: 0;
        }
    }

    .method.first-of-group:not(:first-child) & {
        border-top: 1px solid $grey-09;

        @include dark-mode {
            border-top: 1px solid darken($grey-14, 6);

            @include respond-to(narrow-screens) {
                border-top: 0;
            }
        }
    }

    .method__area:first-child & {
        padding-top: 72px;

        @include respond-to(small-screens) {
            padding-top: 0;
        }
    }

    .table {
        margin: 32px 0 44px;
        overflow: hidden;
        background-color: $grey-10;
        border: 1px solid $grey-08;
        border-radius: 5px;
        color: $grey-05;

        @include dark-mode {
            background-color: darken($grey-14, 6);
            border: 1px solid $grey-12;
        }

    }

    .table__container {
        table-layout: fixed;
        width: 100%;
        background-clip: padding-box;

        tr:nth-child(odd) {
            background-color: rgba($black, 0.1);

            @include dark-mode {
                background-color: rgba($black, 0.15);
            }
        }

        tr:first-child .table__row {
            padding-top: 16px;
        }

        tr:last-child .table__row {
            padding-bottom: 16px;
        }
    }

    .table__row {
        display: table-cell;
        padding: 8px 20px;
        font-size: 14px;
        text-align: left;
        font-weight: 400;
        vertical-align: top;
    }

    .table__row--property {
        @extend .table__row;

        width: 180px;
        font-weight: 600;
        text-align: right;
    }

    h3 {
        max-width: 768px;
        color: $grey-05;
    }

    pre,
    code {
        text-align: left;
        white-space: pre-wrap;
        word-spacing: normal;
        word-break: break-word;
        tab-size: 4;
        hyphens: none;

        color: $grey-06;

        direction: ltr;

        .token {
            &.punctuation {
                color: $token-punctuation;
            }

            &.property {
                color: $token-property;
            }

            &.number,
            &.boolean {
                color: $token-number;
            }

            &.null {
                color: $token-null;
            }
        }
    }

    pre {
        font-size: 13px;
        font-weight: 500;
        line-height: 1.5em;

        padding: 20px 32px;

        border-radius: 5px;
        background-color: $grey-13;
        transition: background-color 0.8s ease;

        @include font-source-code-pro;

        @include dark-mode {
            background-color: darken($grey-14, 9.5);
        }
        @include respond-to(medium-screens) {
            padding: 16px 20px;
        }
        @include respond-to(small-screens) {
            padding: 12px 16px;
        }
        @include respond-to(narrow-screens) {
            padding: 8px 16px;
        }

        code {
            padding: 0;

            border: none;
            border-radius: 0;
            background-color: transparent;
        }
    }
}

.method__example__part {
    padding: 28px 40px;

    @include respond-to(medium-screens) {
        padding-right: 20px;
        padding-left: 20px;
    }

    @include respond-to(narrow-screens) {
        padding-right: 16px;
        padding-left: 16px;
    }
}

%method__example__type {
    padding: 20px 0;

    &:first-child {
        padding-top: 0;
    }

    &:before {
        font-size: 15px;
        font-weight: 500;

        display: inline-block;

        margin-right: 4px;
        padding-bottom: 8px;

        letter-spacing: 0.1px;

        color: $grey-05;

        @include font-hind;
    }
}

.method__example__base-url {
    @extend %method__example__type;

    &:before {
        content: 'Base URL';
    }
}

.method__example__github-url {
    @extend %method__example__type;

    &:before {
        content: 'GitHub URL';
    }
}

.method__example__declaration {
    @extend %method__example__type;

    &:before {
        content: 'Definition';
    }
}

.method__example__response {
    @extend %method__example__type;

    &:before {
        content: 'Example Response';
    }
}
</style>
