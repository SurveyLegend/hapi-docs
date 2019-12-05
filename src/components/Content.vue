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
                                    <template v-if="group.uppercase">{{ group.name | uppercase }}</template>
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
                                <span
                                    v-if="group.experimental"
                                    class="method__badge method__badge--experiment"
                                >Experimental</span>
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
                                    <span
                                        v-if="path.experimental"
                                        class="method__badge method__badge--experiment"
                                    >Experimental</span>
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
                                            >optional<template v-if="param.flags && param.flags.default">, default is <span class="method__list__item__label__promote">{{ param.flags.default }}</span></template></span>
                                        </h3>
                                        <Marked class="method__list__item__description">{{ param.description }}</Marked>
                                        <div
                                            v-if="param.valids"
                                            class="method__list__item__valids__label">
                                            <p>
                                                <span class="method__list__item__valids__prefix">Allows:</span>
                                                <ul class="method__list__item__valids__list option__list">
                                                    <li
                                                        v-for="(valid, index) in param.valids"
                                                        :key="index">{{ valid }}</li>
                                                </ul>
                                            </p>
                                        </div>
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
                                            <span class="method__list__item__type">{{ param.type }}</span>
                                            <span
                                                v-if="param.flags && param.flags.required"
                                                class="method__list__item__label__badge"
                                            >required</span>
                                            <span
                                                v-else
                                                class="method__list__item__label__details"
                                            >optional<template v-if="param.flags && param.flags.default">, default is <span class="method__list__item__label__promote">{{ param.flags.default }}</span></template></span>
                                        </h3>
                                        <Marked class="method__list__item__description">{{ param.description }}</Marked>
                                        <div
                                            v-if="param.valids"
                                            class="method__list__item__valids__label">
                                            <p>
                                                <span class="method__list__item__valids__prefix">Allows:</span>
                                                <ul class="method__list__item__valids__list option__list">
                                                    <li
                                                        v-for="(valid, index) in param.valids"
                                                        :key="index">{{ valid }}</li>
                                                </ul>
                                            </p>
                                        </div>
                                        <div
                                            v-if="param.items"
                                            class="method__list__item__items__type">
                                            <p>
                                                <span class="method__list__item__items__type__prefix">One or more of:</span>
                                                <ul
                                                    v-for="(item, index) in param.items"
                                                    :key="index"
                                                    class="method__list__item__items__formats__list option__list">
                                                    <li
                                                        v-for="(valid, index2) in item.valids"
                                                        :key="index2">{{ valid }}</li>
                                                </ul>
                                            </p>
                                        </div>
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
                                            >optional<template v-if="param.flags && param.flags.default">, default is <span class="method__list__item__label__promote">{{ param.flags.default }}</span></template></span>
                                        </h3>
                                        <Marked class="method__list__item__description">{{ param.description }}</Marked>
                                        <div
                                            v-if="param.valids"
                                            class="method__list__item__valids__label">
                                            <p>
                                                <span>Allows:</span>
                                                <ul class="method__list__item__valids__list option__list">
                                                    <li
                                                        v-for="(valid, index) in param.valids"
                                                        :key="index">{{ valid }}</li>
                                                </ul>
                                            </p>
                                        </div>
                                        <div
                                            v-if="param.items"
                                            class="method__list__item__items__type">
                                            <p>
                                                <span class="method__list__item__items__type__prefix">One or more of:</span>
                                                <ul
                                                    v-for="(item, index) in param.items"
                                                    :key="index"
                                                    class="method__list__item__items__formats__list option__list">
                                                    <li
                                                        v-for="(valid, index2) in item.valids"
                                                        :key="index2">{{ valid }}</li>
                                                </ul>
                                            </p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="method__example">
                            <div class="method__example__part">
                                <div class="method__example__declaration">
                                    <Prism language="bash">{{ path.method }} {{ scheme }}://{{ host }}{{ path.path }}</Prism>
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
    left: 220px;

    overflow-x: hidden;
    overflow-y: scroll;

    @include respond-to(medium-screens) {
        left: 180px;
    }

    @include respond-to(wide-screens) {
        left: 280px;
    }

    @include respond-to(small-screens) {
        left: 0;
        top: 50px;
    }

    @include respond-to(narrow-screens) {
        top: 90px;
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

    width: calc((100vw - 220px) * 0.45);
    padding: 0 0 50px;

    @include respond-to(wide-screens) {
        width: 780px;
    }

    @include respond-to(small-screens) {
        width: 45vw;
    }

    @include respond-to(narrow-screens) {
        float: none;
        width: 100%;
    }

    .method.first-of-group:not(:first-child) & {
        border-top: 1px solid #f0f4f7;

        @include respond-to(narrow-screens) {
            border-top: 0;
        }

        @include dark-mode {
            border-top: 1px solid darken(#33383b, 8);

            @include respond-to(narrow-screens) {
                border-top: 0;
            }
        }
    }

    .method__area:first-child & {
        padding-top: 30px;

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
        padding: 20px 40px;
    }

    @include respond-to(narrow-screens) {
        padding-left: 20px;
        padding-right: 20px;
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

    &.method__badge--warning {
        border: 1px solid rgba(255, 174, 84, 0.5);
        color: #ffae54;
    }

    &.method__badge--danger {
        border: 1px solid rgba(224, 76, 76, 0.5);
        color: #e04c4c;
    }

    &.method__badge--experiment {
        border: 1px solid rgba(212, 82, 255, 0.5);
        color: #d452ff;
    }
}

.method__list {
    padding: 40px 40px 0;

    @include respond-to(narrow-screens) {
        padding-left: 20px;
        padding-right: 20px;
    }

    .method__copy__padding + & {
        padding-bottom: 40px;
    }
}

.method__list__group {
    margin-top: 8px;

    border-top: 1px solid #e1e8ed;

    @include dark-mode {
        border-top: 1px solid darken(#33383b, 4);
    }
}

.method__list__item {
    line-height: 24px;

    padding: 17px 0;

    border-bottom: 1px solid #f0f4f7;

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
        border-bottom: 1px solid #e1e8ed;
    }

    @include dark-mode {
        border-bottom: 1px solid darken(#33383b, 8);

        &:last-child {
            border-bottom: 1px solid darken(#33383b, 4);
        }
    }
}

.method__list__item__label {
    font-size: 14px !important;
    line-height: 21px !important;

    white-space: normal;
    word-break: break-all;

    @include respond-to(large-screens) {
        position: relative;
        z-index: z-index(default) + 4;

        float: left;

        width: 180px;

        text-align: right;
    }

    @include respond-to(large-screens) {
        .method__list:not(.is-empty) &:after {
            font-weight: 400;

            position: absolute;
            top: 0;
            left: 200px;

            content: '\2014';
            text-align: left;

            color: #dde4e8;

            @include dark-mode {
                color: lighten(#33383b, 3);
            }
        }
    }

    &:hover {
        .header-anchor {
            opacity: 1;
        }
    }

    .method__list.is-empty & {
        font-weight: 400 !important;

        text-align: center;

        color: #939da3 !important;

        @include dark-mode {
            color: darken(#939da3, 30) !important;
        }

        @include respond-to(large-screens) {
            width: 100%;
        }
    }

    .header-anchor {
        position: relative;
        top: 3px;
        left: -18px;

        display: inline-block;

        width: 15px;
        height: 14px;

        margin-right: -15px;

        opacity: 0;
        background-size: 10px 8px;
        @include icon('../assets/svg/anchor.svg');

        isolation: isolate;

        @include dark-mode {
            @include icon('../assets/svg/anchor--dark.svg');
        }
    }
}

.method__list__item__label__details {
    font-size: 13px;
    font-weight: 400;

    margin-left: 3px;

    word-break: normal;

    color: #939da3;

    @include respond-to(large-screens) {
        display: block;
    }
}

.method__list__item__label__promote {
    font-weight: 600;
}

.method__list__item__type,
.method__list__item__label__badge {
    line-height: 20px;

    display: inline-block;

    margin-left: 8px;
    padding: 0 8px;

    vertical-align: top;

    @extend .method__list__item__label__details;
    @include respond-to(large-screens) {
        line-height: 1.2em;

        display: block;

        margin-left: 0;
        padding: 4px 0 0;
    }
}

.method__list__item__type {
  font-weight: 400;
  color: #939da3
}

.method__list__item__label__badge {
    text-transform: uppercase;

    font-weight: 600;
    font-size: 11px;

    color: #ffae54;
    border: 1px solid rgba(255, 174, 84, 0.5);
    border-radius: 11px;

    @extend .method__list__item__label__details;
    @include respond-to(large-screens) {
        border: 0;
        border-radius: 0;
    }
}

.method__list__item__description,
.method__list__item__valids__label,
.method__list__item__items__type {
    @include respond-to(large-screens) {
        position: relative;
        z-index: z-index(above);

        margin: 0 0 0 200px;

        background: white;

        @include dark-mode {
            background: darken(#242729, 4);
        }

        p {
            margin-top: 0 !important;
        }
    }

    p {
        display: flex;
        flex-direction: column;
        font-size: 14px !important;
        line-height: 21px !important;
    }
}

.method__list__item__items__type__prefix,
.method__list__item__valids__prefix {
  font-weight: 500;
}

.option__list {
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;

  li {
    margin: 0 3px;

    &::before {
      content: '"'
    }

    &:not(:last-child)::after {
      content: '",'
    }

    &:last-child::after {
      content: '"'
    }
  }
}

.method__list__item__valids__label,
.method__list__item__items__type {
  font-weight: 500;
  color: #939da3;
}

.method__list__item__valids__list {
  color: #939da3;
}

.method__example {
    position: relative;
    z-index: z-index(default) + 1;

    margin-left: calc((100vw - 220px) * 0.45);
    padding: 42px 0 50px;

    color: #dde4e8;

    @include respond-to(wide-screens) {
        margin-left: 780px;
    }

    @include respond-to(small-screens) {
        margin-left: 45vw;
        padding-top: 0;
    }

    @include respond-to(narrow-screens) {
        margin-left: 0;
        background: #2d3134;

        @include dark-mode {
            background: darken(#242729, 8);
        }
    }

    .method.first-of-group:not(:first-child) & {
        border-top: 1px solid #33383b;

        @include respond-to(narrow-screens) {
            border-top: 0;
        }

        @include dark-mode {
            border-top: 1px solid darken(#242729, 6);

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
        margin: 30px 0 45px;
        max-width: 768px;
        overflow: hidden;
        background: #33373a;
        border: 1px solid #373b3e;
        border-radius: 5px;
        color: #d0d4d7;

        @include dark-mode {
            background: darken(#242729, 6);
            border: 1px solid darken(#242729, 4);
        }
    }

    .table__container {
        table-layout: fixed;
        width: 100%;
        background-clip: padding-box;

        tr:nth-child(odd) {
            background: rgba(0, 0, 0, 0.1);

            @include dark-mode {
                background: rgba(0, 0, 0, 0.15);
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
        padding: 9px 20px;
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
        color: #d0d4d7 !important;
    }

    pre,
    code {
        text-align: left;
        white-space: pre-wrap;
        word-spacing: normal;
        word-break: break-word;
        tab-size: 4;
        hyphens: none;

        color: #d0d0d0 !important;

        direction: ltr;

        .token {
            &.property {
                color: #c1ef65;
            }

            &.number,
            &.boolean {
                color: #77bcd7;
            }

            &.null {
                color: #ebde68;
            }

            &.punctuation {
                color: #f099a6;
            }
        }
    }

    pre {
        font-size: 13px;
        font-weight: 500;
        line-height: 1.5em;

        padding: 20px 40px;

        border-radius: 5px;
        background: #272b2d;

        @include font-source-code-pro;

        @include dark-mode {
            background: darken(#242729, 9.5);
        }
    }

    code {
        padding: 0 !important;

        border: none !important;
        border-radius: 0 !important;
        background: transparent !important;
    }
}

.method__example__part {
    padding: 30px 40px;

    @include respond-to(narrow-screens) {
        padding-left: 20px;
        padding-right: 20px;
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

        margin-right: 5px;
        padding-bottom: 8px;

        letter-spacing: 0.1px;

        color: #d0d4d7;

        @include font-hind;
    }
}

.method__example__base-url {
    @extend %method__example__type;

    &:before {
        content: 'Base URL';
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
