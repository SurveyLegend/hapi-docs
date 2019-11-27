<template>
    <div class="sidebar">
        <ScrollSpy
            v-if="dataReady"
            :title="info.title"
            class="sidebar__navigation"
        >
            <template>
                <h5 class="sidebar__navigation__heading">Topics</h5>
                <ul class="sidebar__navigation__items">
                    <li v-if="info">
                        <a
                            href="#intro"
                            class="sidebar__navigation__item"
                        >Introduction</a>
                    </li>
                    <li v-if="security.length !== 0">
                        <a
                            href="#authentication"
                            class="sidebar__navigation__item"
                        >Authentication</a>
                    </li>
                    <li v-if="errors.length !== 0">
                        <a
                            href="#errors"
                            class="sidebar__navigation__item"
                        >Errors</a>
                    </li>
                </ul>
            </template>
            <template>
                <h5 class="sidebar__navigation__heading">API</h5>
                <ul class="sidebar__navigation__items">
                    <li
                        v-for="group in groups"
                        :key="group.name"
                    >
                        <a
                            :href="`#${group.name}`"
                            class="sidebar__navigation__item"
                        >
                            <template v-if="group.uppercase">{{ group.name | uppercase }}</template>
                            <template v-else>{{ group.name | capitalize }}</template>
                        </a>
                        <ul class="sidebar__navigation__items">
                            <li
                                v-for="path in group.paths"
                                :key="path.name"
                            >
                                <a
                                    :href="`#${path.slug}`"
                                    class="sidebar__navigation__item"
                                >{{
                                    path.description
                                }}</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </template>
        </ScrollSpy>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters({
            info: 'hapi-docs/info',
            security: 'hapi-docs/security',
            errors: 'hapi-docs/errors',
            groups: 'hapi-docs/groupedPaths'
        }),
        dataReady() {
            return this.info && this.groups.length !== 0
        }
    }
}
</script>

<style scoped lang="scss">
.sidebar {
    @include dark-mode {
        background-color: darken($grey-14, 1);
        border-color: lighten($grey-14, 1);
    }
    @include respond-to(wide-screens) {
        width: 280px;
    }
    @include respond-to(medium-screens) {
        width: 180px;
    }
    @include respond-to(small-screens) {
        display: none;
    }
    @include rtl {
        right: 0;
        left: initial;

        border-width: 0 0 0 1px;
    }

    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 220px;
    z-index: z-index(fixed);

    background-color: $grey-01;
    border: {
        width: 0 1px 0 0;

        color: $grey-02;

        style: solid;
    }

    transition: background-color 0.8s ease 0.06s, border-color 1s ease 0.08s;
}

.sidebar__navigation {
    @include dark-mode {
        border-color: lighten($grey-14, 1);
    }

    position: absolute;
    top: 49px;
    right: 0;
    bottom: 0;
    left: 0;
    padding-bottom: 32px;
    overflow-x: auto;
    overflow-y: scroll;

    border: {
        width: 1px 0 0 0;

        color: $grey-02;

        style: solid;
    }

    transition: border-color 1s ease 0.08s;
}

.sidebar__navigation__heading {
    padding: 0 20px 4px;

    &:first-child {
        padding-top: 20px;
    }
}

.sidebar__navigation__items {
    line-height: 20px;

    padding-bottom: 24px;

    li {
        line-height: 20px;
    }

    & li .sidebar__navigation__item + .sidebar__navigation__items {
        height: 0;
        padding: 0;
        overflow: hidden;

        transition: height 0.1s ease;

        will-change: height;

        li {
            opacity: 0;

            transform: translateY(-10px);
            transition: transform 0.2s ease, opacity 0.2s ease;
            transition-delay: 0.2s;

            will-change: transform, opacity;

            &:nth-child(1) {
                transition-delay: 0s;
            }

            &:nth-child(1) {
                transition-delay: 0.02s;
            }

            &:nth-child(2) {
                transition-delay: 0.08s;
            }

            &:nth-child(3) {
                transition-delay: 0.14s;
            }

            &:nth-child(4) {
                transition-delay: 0.18s;
            }

            &:nth-child(5) {
                transition-delay: 0.2s;
            }
        }
    }

    & li .sidebar__navigation__item.is-active + .sidebar__navigation__items,
    & li .sidebar__navigation__item.is-active-parent + .sidebar__navigation__items {
        height: 100%;

        transition: height 0.2s ease;

        li {
            opacity: 1;

            transform: translateY(0);
        }
    }
}

.sidebar__navigation__item {
    @include dark-mode {
        color: $grey-05;

        &:hover {
            color: $white;
        }

        &.is-active {
            color: $dark-blue;

            &:hover {
                color: $white;
            }
        }
    }

    font-size: 15px;
    font-weight: 400;

    display: block;
    padding: 6px 20px;
    overflow: hidden;

    color: $grey-08;

    text-overflow: ellipsis;
    white-space: nowrap;

    user-select: none;

    &:hover {
        color: $grey-12;

        text-decoration: underline;
    }

    &.is-active {
        color: $blue;

        &:hover {
            color: $grey-12;
        }
    }

    + .sidebar__navigation__items .sidebar__navigation__item {
        @include rtl {
            padding-right: 32px;
            padding-left: 20px;
        }

        font-size: 14px;

        padding-left: 32px;
    }
}

.sidebar__footer {
    @include dark-mode {
        background-color: darken($grey-14, 3);
    }

    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 8px;

    background-color: $grey-02;

    transition: background-color 0.8s ease 0.06s, border-color 1s ease 0.08s;

    p {
        font-size: 11px;
        line-height: 160%;

        display: inline-block;
        margin: 0;
    }
}

.sidebar__footer__sponsor-logo {
    display: inline-block;
    height: 24px;
    margin-right: 4px;
    vertical-align: middle;

    @include rtl {
        margin-right: 0;
        margin-left: 4px;
    }
}
</style>
