<template>
    <div class="content">
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
                                <span>
                                    <template v-if="group.uppercase">{{
                                        group.name | uppercase
                                    }}</template>
                                    <template v-else>{{ group.name | capitalize }}</template>
                                </span>
                                <span
                                    v-if="group.deprecated"
                                    class="method__badge method__badge--danger"
                                >Deprecated</span>
                                <span
                                    v-if="group.internal"
                                    class="method__badge method__badge--warning"
                                >Internal</span>
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
                                        class="method__badge method__badge--danger"
                                    >Deprecated</span>
                                    <span
                                        v-if="path.internal"
                                        class="method__badge method__badge--warning"
                                    >Internal</span>
                                </h1>
                                <template v-if="path.notes">
                                    <p v-for="note in path.notes">
                                        <Marked>{{ note }}</Marked>
                                    </p>
                                </template>
                            </div>
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
                                            >optional<template
                                                v-if="param.flags && param.flags.default"
                                            >, default is
                                                <span
                                                    class="method__list__item__label__promote"
                                                >{{ param.flags.default }}</span></template></span>
                                        </h3>
                                        <Marked class="method__list__item__description">{{
                                            param.description
                                        }}</Marked>
                                    </li>
                                </ul>
                            </div>
                            <div
                                v-if="path.queryParams !== null"
                                class="method__list"
                            >
                                <h5>Query Arguments</h5>
                                <ul class="method__list__group">
                                    <li
                                        v-for="param in path.queryParams.children"
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
                                            >optional<template
                                                v-if="param.flags && param.flags.default"
                                            >, default is
                                                <span
                                                    class="method__list__item__label__promote"
                                                >{{ param.flags.default }}</span></template></span>
                                        </h3>
                                        <Marked class="method__list__item__description">{{
                                            param.description
                                        }}</Marked>
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
                                            >optional<template
                                                v-if="param.flags && param.flags.default"
                                            >, default is
                                                <span
                                                    class="method__list__item__label__promote"
                                                >{{ param.flags.default }}</span></template></span>
                                        </h3>
                                        <Marked class="method__list__item__description">{{
                                            param.description
                                        }}</Marked>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="method__example">
                            <div class="method__example__part">
                                <div class="method__example__declaration">
                                    <Prism
                                        language="bash"
                                    >{{ path.method }} {{ scheme }}://{{ host
                                    }}{{ path.path }}</Prism>
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
    @include respond-to(wide-screens) {
        left: 280px;
    }
    @include respond-to(medium-screens) {
        left: 180px;
    }
    @include respond-to(small-screens) {
        top: 52px;
        left: 0;
    }
    @include respond-to(narrow-screens) {
        @include dark-mode {
            box-shadow: rgba($white, 0.2) 0 -32px 34px -40px inset;
        }

        top: 44px;
        bottom: 44px;

        box-shadow: rgba($black, 0.1) 0 -32px 34px -40px inset;
    }
    @include rtl {
        @include respond-to(wide-screens) {
            right: 280px;
            left: 0;
        }
        @include respond-to(medium-screens) {
            right: 180px;
            left: 0;
        }
        @include respond-to(small-screens) {
            right: 0;
            left: 0;
        }

        right: 220px;
        left: 0;
    }

    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 220px;
    overflow-x: hidden;
    overflow-y: auto;
    z-index: z-index(above);

    -webkit-overflow-scrolling: touch;
}

.method {
    position: relative;
    z-index: z-index(default) + 1;

    &:last-child {
        @include respond-to(narrow-screens) {
            min-height: 0;
        }

        min-height: 100vh;
    }
}

.method__area {
    @include respond-to(narrow-screens) {
        flex-direction: column;
    }

    display: flex;
    flex-direction: row;
}

.method__copy {
    @include respond-to(narrow-screens) {
        width: 100%;
    }
    @include rtl {
        @include respond-to(narrow-screens) {
            float: none;
        }

        float: right;
    }

    width: 50%;
    float: left;
    padding: 0 0 52px;

    .method.first-of-group:not(:first-child) & {
        @include dark-mode {
            @include respond-to(narrow-screens) {
                border-top: 0;
            }

            border-top: 1px solid darken($grey-09, 8);
        }

        border-top: 1px solid $grey-02;

        transition: border-color 1s ease;
    }

    .method__area:first-child & {
        @include respond-to(small-screens) {
            padding-top: 0;
        }

        padding-top: 28px;
    }

    ul,
    ol {
        @include rtl {
            padding: 0 16px 0 0;
        }

        padding: 0 0 0 16px;

        li {
            margin-top: 8px;
        }
    }
    ul {
        li {
            &:before {
                @include dark-mode {
                    background-color: $grey-08;
                }
                @include rtl {
                    float: right;
                    margin: 10px -12px 0 0;
                }

                content: '';

                display: block;
                width: 4px;
                height: 4px;
                float: left;
                margin: 10px 0 0 -12px;

                background-color: $grey-07;
                border-radius: 50%;
            }
        }
    }
    ol {
        li {
            list-style: decimal;
        }
    }
}

.method__copy__padding {
    @include respond-to(medium-screens) {
        padding-right: 20px;
        padding-left: 20px;
    }
    @include respond-to(narrow-screens) {
        padding-right: 16px;
        padding-left: 16px;
    }

    max-width: 940px;
    margin: 0 auto;
    padding: 40px 40px 20px;

    &:last-child {
        padding-bottom: 0;
    }
}

.method__copy__padding__info,
.method__copy__padding__warning {
    @include dark-mode {
        background-color: darken($grey-14, 1);
    }

    position: relative;
    padding: 16px 20px;

    background-color: $grey-01;
    border-radius: 6px;

    transition: background-color 0.8s ease;

    p,
    li {
        &:first-child {
            margin-top: 0;
        }
    }

    &:before {
        @include rtl {
            right: -10px;
            left: unset;
        }

        content: '';

        position: absolute;
        top: 18px;
        left: -10px;
        width: 20px;
        height: 20px;

        border-radius: 100%;
    }
}

.method__copy__padding__info {
    &:before {
        @include dark-mode {
            background-color: darken($green, 28);
        }
        @include icon('../assets/svg/info.svg');

        background-color: $green;
    }
}

.method__copy__padding__warning {
    &:before {
        @include icon('../assets/svg/warning.svg');

        background-color: $red;
    }
}

.method__copy__full-with-picture {
    position: relative;
    margin: 20px auto 0 auto;

    img {
        width: 100%;
        height: auto;
        vertical-align: top;

        border-radius: 5px;
    }

    &.demo-picture {
        @include dark-mode {
            background: linear-gradient(to bottom, #3891f1 0%, #6410bf 100%);

            &:before {
                opacity: 1;
            }
        }

        background: linear-gradient(to bottom, #8fdeff 0%, #0167ff 100%);
        // This is to inspire you how you can take advantage of dark mode
        border-radius: 6px;

        transition: background 0.8s ease 0.06s;

        &:before {
            @include icon('../assets/images/hero-stars.png');

            content: '';

            display: block;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;

            background-size: contain;
            opacity: 0;

            transition: opacity 1.5s ease;
        }

        img {
            margin-bottom: -2px;
        }
    }
}

.method__badge {
    font-size: 11px;
    font-weight: 600;
    line-height: 24px;

    display: inline-block;
    margin: 0 8px;
    padding: 0 12px;
    vertical-align: middle;

    color: $blue;
    border: 1px solid rgba($blue, 0.5);
    border-radius: 24px;

    text-transform: uppercase;

    &.method__badge--warning {
        color: $orange;
        border: 1px solid rgba($orange, 0.5);
    }

    &.method__badge--danger {
        color: $red;
        border: 1px solid rgba($red, 0.5);
    }
}

.method__list {
    @include respond-to(medium-screens) {
        padding-right: 20px;
        padding-left: 20px;
    }
    @include respond-to(narrow-screens) {
        padding-right: 16px;
        padding-left: 16px;
    }

    max-width: 940px;
    margin: 0 auto;
    padding: 40px 40px 0;

    ul {
        padding: 0;
    }
    li {
        &:before {
            display: none !important;
        }
    }

    .method__copy__padding + & {
        padding-bottom: 40px;
    }
}

.method__list__group {
    @include dark-mode {
        border-top: 1px solid darken($grey-09, 4);
    }

    margin-top: 8px;

    border-top: 1px solid $grey-03;

    transition: border-color 1s ease;
}

.method__list__item {
    @include respond-to(large-screens) {
        zoom: 1;

        &:after,
        &:before {
            content: '';

            display: table;
        }

        &:after {
            clear: both;
        }
    }
    @include dark-mode {
        border-bottom: 1px solid darken($grey-09, 8);

        &:last-child {
            border-bottom: 1px solid darken($grey-09, 4);
        }
    }

    line-height: 24px;

    padding: 16px 0;

    border-bottom: 1px solid $grey-02;

    transition: border-color 1s ease;

    &:last-child {
        border-bottom: 1px solid $grey-03;
    }
}

.method__list__item__label {
    @include respond-to(large-screens) {
        @include rtl {
            float: right;

            text-align: left;
        }

        position: relative;
        width: 180px;
        float: left;
        z-index: z-index(default) + 4;

        text-align: right;
    }
    @include respond-to(large-screens) {
        .method__list:not(.is-empty) &:after {
            @include dark-mode {
                color: lighten($grey-09, 3);
            }
            @include rtl {
                left: -32px;
            }

            content: '\2014';

            font-weight: 400;

            position: absolute;
            top: 4px;
            left: 200px;

            color: $grey-04;

            text-align: left;
        }
    }

    font-size: 14px;
    line-height: 21px;

    margin-top: -4px;

    white-space: normal;
    word-break: break-all;

    &:hover {
        .header-anchor {
            opacity: 1;
        }
    }

    .method__list.is-empty & {
        @include dark-mode {
            color: darken($grey-07, 30);
        }
        @include respond-to(large-screens) {
            width: 100%;
        }

        font-weight: 400;

        color: $grey-07;

        text-align: center;
    }

    .header-anchor {
        @include icon('../assets/svg/anchor.svg');
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
        @include respond-to(narrow-screens) {
            opacity: 0.4;
        }
        @include rtl {
            @include respond-to(medium-screens) {
                left: 4px;
            }

            left: 8px;
        }

        display: inline-block;
        position: relative;
        top: 4px;
        left: -8px;
        width: 18px;
        height: 18px;

        background-color: $white;
        background-size: 12px;
        border-radius: 4px;
        opacity: 0;

        transition: opacity 0.2s ease, box-shadow 0.3s ease, background-color 0.2s ease;

        isolation: isolate;

        &:hover {
            box-shadow: rgba($black, 0.04) 0 0 6px 2px, rgba($black, 0.05) 0 0 2px 2px;
        }

        &:active {
            box-shadow: rgba($black, 0) 0 0 2px 0;
        }
    }
}

.method__list__item__label__details {
    @include respond-to(large-screens) {
        display: block;
    }
    @include rtl {
        @include respond-to(medium-screens) {
            display: inline-block;
        }

        margin-right: 8px;
        margin-left: 0;
    }

    font-size: 13px;
    font-weight: 400;

    margin-left: 4px;

    color: $grey-07;

    word-break: normal;
}

.method__list__item__label__promote {
    font-weight: 600;
}

.method__list__item__label__badge {
    @extend .method__list__item__label__details;

    @include respond-to(large-screens) {
        line-height: 1.2em;

        display: block;
        margin-left: 0;
        padding: 4px 0 0;

        border: 0;
        border-radius: 0;
    }

    font-size: 11px;
    font-weight: 600;
    line-height: 20px;

    display: inline-block;
    margin-left: 8px;
    padding: 0 8px;
    vertical-align: top;

    color: $orange;
    border: 1px solid rgba($orange, 0.5);
    border-radius: 20px;

    text-transform: uppercase;
}

.method__list__item__description {
    @include respond-to(large-screens) {
        @include dark-mode {
            background-color: darken($grey-14, 4);
        }
        @include rtl {
            margin: 0 200px 0 0;
        }

        position: relative;
        margin: 0 0 0 200px;
        z-index: z-index(above);

        background-color: $white;

        transition: background-color 0.8s ease;

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
    @include respond-to(narrow-screens) {
        @include dark-mode {
            background-color: $background__example__background--dark;
        }

        width: 100%;
        padding-top: 0;

        background-color: $background__example__background--light;
    }

    position: relative;
    width: 50%;
    padding-top: 72px;
    z-index: z-index(default) + 1;

    color: $grey-04;

    .method.first-of-group:not(:first-child) & {
        @include dark-mode {
            @include respond-to(narrow-screens) {
                border-top: 0;
            }

            border-top: 1px solid darken($grey-14, 6);
        }

        border-top: 1px solid $grey-09;
    }

    .table {
        @include dark-mode {
            background-color: darken($grey-14, 6);
        }
        @include respond-to(narrow-screens) {
            th,
            td {
                @include rtl {
                    text-align: right;
                }

                display: block;
                width: 100%;

                text-align: left;
            }
            th {
                padding: 12px 12px 0 12px !important;
            }
            td {
                padding: 0 12px 12px 12px !important;
            }
        }

        margin: 0 0 20px;
        overflow: hidden;

        color: $grey-05;
        background-color: $grey-13;
        border-radius: 0 0 6px 6px;
    }

    .table__container {
        width: 100%;

        background-clip: padding-box;

        table-layout: fixed;

        tr:nth-child(even) {
            background-color: rgba($indigo, 0.2);
        }

        tr:first-child .table__row {
            padding-top: 16px;
        }

        tr:last-child .table__row {
            padding-bottom: 16px;
        }
    }

    .table__row {
        font-size: 14px;
        font-weight: 400;

        display: table-cell;
        padding: 8px 20px;
        vertical-align: top;

        text-align: left;
    }

    .table__row--property {
        @extend .table__row;

        font-weight: 600;

        width: 180px;

        text-align: right;
    }

    h3 {
        @include dark-mode {
            background-color: darken($grey-14, 12);
        }

        font-size: 15px;
        font-weight: 500;

        display: inline-block;
        width: 100%;
        padding: 8px 12px;

        color: $grey-05;
        background-color: $indigo;
        border-radius: 6px 6px 0 0;

        letter-spacing: 0.1px;
    }

    pre,
    code {
        color: $grey-06;

        hyphens: none;
        tab-size: 4;
        text-align: left;
        white-space: pre-wrap;
        word-break: break-word;
        word-spacing: normal;

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

        font-size: 13px;
        font-weight: 500;
        line-height: 1.5em;

        padding: 20px 32px;

        background-color: $grey-13;
        border-radius: 0 0 6px 6px;

        transition: background-color 0.8s ease;

        code {
            padding: 0;

            background-color: transparent;
            border: none;
            border-radius: 0;
        }
    }
}

.method__example__part {
    @include respond-to(medium-screens) {
        padding-right: 20px;
        padding-left: 20px;
    }
    @include respond-to(narrow-screens) {
        position: relative;
        top: unset;
        padding-right: 16px;
        padding-left: 16px;
    }

    position: sticky;
    top: 40px;
    max-width: 940px;
    margin: 0 auto;
    padding: 28px 52px;
}

%method__example__type {
    padding: 20px 0;

    &:first-child {
        padding-top: 0;
    }

    &:before {
        @include dark-mode {
            background-color: darken($grey-14, 12);
        }

        font-size: 15px;
        font-weight: 500;

        display: inline-block;
        width: 100%;
        padding: 8px 12px;

        color: $grey-05;
        background-color: $indigo;
        border-radius: 6px 6px 0 0;

        letter-spacing: 0.1px;
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
