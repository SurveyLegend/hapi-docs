<template>
    <div class="sidebar">
        <scroll-spy
            v-if="dataReady"
            class="sidebar__navigation">
            <template v-if="info || errors">
                <h5 class="sidebar__navigation__heading">Topics</h5>
                <ul class="sidebar__navigation__items">
                    <li v-if="info">
                        <a
                            href="#intro"
                            class="sidebar__navigation__item">Introduction</a>
                    </li>
                    <li v-if="errors">
                        <a
                            href="#errors"
                            class="sidebar__navigation__item">Errors</a>
                    </li>
                </ul>
            </template>
            <template>
                <h5 class="sidebar__navigation__heading">API</h5>
                <ul class="sidebar__navigation__items">
                    <li
                        v-for="group in groups"
                        :key="group.name">
                        <a
                            :href="`#${group.name}`"
                            class="sidebar__navigation__item">{{ group.name | capitalize }}</a>
                        <ul class="sidebar__navigation__items">
                            <li
                                v-for="path in group.paths"
                                :key="path.name">
                                <a
                                    :href="`#${path.slug}`"
                                    class="sidebar__navigation__item">{{ path.description }}</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </template>
        </scroll-spy>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters({
            info: 'hapi-docs/info',
            errors: 'hapi-docs/errors',
            groups: 'hapi-docs/groupedPaths'
        }),
        dataReady() {
            return this.info && this.errors && this.groups
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

    border-right: 1px solid #f0f4f7;
    background: #fafcfc;

    @include respond-to(medium-screens) {
        width: 180px;
    }

    @include respond-to(wide-screens) {
        width: 280px;
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
}

.sidebar__navigation__heading {
    padding: 0 20px 4px;

    &:first-child {
        padding-top: 20px;
    }
}

.sidebar__navigation__items {
    padding-bottom: 26px;

    line-height: 20px;

    li {
        line-height: 20px;
    }

    & li .sidebar__navigation__item + .sidebar__navigation__items {
        opacity: 0;
        overflow: hidden;

        height: 0;
        padding: 0;

        transform: translateY(-10px);
        will-change: transform, height, opacity;
    }

    & li .sidebar__navigation__item.is-active + .sidebar__navigation__items,
    & li .sidebar__navigation__item.is-active-parent + .sidebar__navigation__items {
        opacity: 1;

        height: 100%;

        transform: translateY(0);
        transition: all 0.25s cubic-bezier(0.6, 0, 0.4, 1);
    }
}

.sidebar__navigation__item {
    font-size: 15px;
    font-weight: 400;

    display: block;
    overflow: hidden;

    padding: 6px 20px;

    white-space: nowrap;
    text-overflow: ellipsis;

    color: #4c555a !important;

    user-select: none;

    &:hover {
        text-decoration: underline;

        color: #292e31 !important;
    }

    &.is-active {
        color: #0099e5 !important;

        &:hover {
            text-decoration: none;
        }
    }

    + .sidebar__navigation__items .sidebar__navigation__item {
        font-size: 14px;

        padding-left: 36px;
    }
}
</style>
