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
                    <li>
                        <a
                            href="#welcome"
                            class="sidebar__navigation__item"
                        >Welcome</a>
                    </li>
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
                        >{{ group.name | capitalize }}</a>
                        <ul class="sidebar__navigation__items">
                            <li
                                v-for="path in group.paths"
                                :key="path.name"
                            >
                                <a
                                    :href="`#${path.slug}`"
                                    class="sidebar__navigation__item"
                                >{{ path.description }}</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </template>
            <footer class="sidebar__footer">
                <img src="http://www.surveylegend.com/wordpress/wp-content/themes/SurveyLegendTemplate-child/images/branding/SurveyLegend-logo.svg" class="sidebar__footer__sponsor-logo" />
                <p>
                    Made with <span style="color: #e04c4c">♥</span> by <a href="https://surveylegend.com">SurveyLegend®</a>
                </p>
            </footer>
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
    position: absolute;
    z-index: z-index(fixed);
    top: 0;
    bottom: 0;
    left: 0;

    width: 220px;
    border: {
        style: solid;
        width: 0 1px 0 0;
        color: $grey-02;
    }

    background-color: $grey-01;

    transition: background-color 0.8s ease 0.06s, border-color 1s ease 0.08s;

    @include dark-mode {
        border-color: lighten($grey-14, 1);
        background-color: darken($grey-14, 1);
    }

    @include respond-to(medium-screens) {
        width: 180px;
    }

    @include respond-to(wide-screens) {
        width: 280px;
    }

    @include respond-to(small-screens) {
        display: none;
    }

    @include rtl {
        left: initial;
        right: 0;
        border-width: 0 0 0 1px;
    }
}

.sidebar__navigation {
    position: absolute;
    top: 49px;
    right: 0;
    bottom: 0;
    left: 0;

    overflow-y: scroll;
    overflow-x: auto;

    border: {
        color: $grey-02;
        style: solid;
        width: 1px 0 0 0;
    }
    transition: border-color 1s ease 0.08s;

    @include dark-mode {
        border-color: lighten($grey-14, 1);
    }
}

.sidebar__navigation__heading {
    padding: 0 20px 4px;

    &:first-child {
        padding-top: 20px;
    }
}

.sidebar__navigation__items {
    padding-bottom: 24px;

    line-height: 20px;

    li {
        line-height: 20px;
    }

    & li .sidebar__navigation__item + .sidebar__navigation__items {
        overflow: hidden;

        height: 0;
        padding: 0;

        will-change: height;
        transition: height 0.1s ease;

        li {
            opacity: 0;
            transform: translateY(-10px);
            will-change: transform, opacity;
            transition: transform 0.2s ease, opacity 0.2s ease;
            transition-delay: 0.2s;

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
            transform: translateY(0);
            opacity: 1;
        }
    }
}

.sidebar__navigation__item {
    font-size: 15px;
    font-weight: 400;

    display: block;
    overflow: hidden;

    padding: 6px 20px;

    text-overflow: ellipsis;
    white-space: nowrap;

    color: $grey-08;

    user-select: none;

    &:hover {
        text-decoration: underline;

        color: $grey-12;
    }

    &.is-active {
        color: $blue;

        &:hover {
            color: $grey-12;
        }
    }

    + .sidebar__navigation__items .sidebar__navigation__item {
        font-size: 14px;

        padding-left: 32px;

        @include rtl {
            padding-left: 20px;
            padding-right: 32px;
        }
    }

    @include dark-mode {
        color: $grey-05;

        &:hover {
            color: $white;
        }

        &.is-active {
            color: $blue;

            &:hover {
                color: $white;
            }
        }
    }
}

.sidebar__footer {
    position: absolute;
    bottom: 0;
    background-color: $grey-02;
    width: 100%;
    padding: 8px;
    transition: background-color 0.8s ease 0.06s, border-color 1s ease 0.08s;

    p {
        font-size: 11px;
        margin: 0;
        line-height: 160%;
        display: inline-block;
    }

    @include dark-mode {
        background-color: darken($grey-14, 3);
    }
}

.sidebar__footer__sponsor-logo {
    display: inline-block;
    height: 24px;
    vertical-align: middle;
    margin-right: 4px;

    @include rtl {
        margin-right: 0;
        margin-left: 4px;
    }
}
</style>
