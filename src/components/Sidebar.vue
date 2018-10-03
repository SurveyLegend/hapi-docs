<template>
    <div class="sidebar">
        <scroll-spy class="sidebar__navigation">
            <!-- <h5 class="sidebar__navigation__heading">Topics</h5> -->
            <h5 class="sidebar__navigation__heading">API</h5>
            <ul
                v-for="group in groups"
                :key="group.name"
                class="sidebar__navigation__items">
                <li>
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
        </scroll-spy>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters({
            groups: 'hapi-docs/groupedPaths'
        })
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
    line-height: 20px;

    li {
        line-height: 20px;
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

    color: #4c555a;

    user-select: none;

    &:hover {
        text-decoration: underline;

        color: #292e31;
    }

    &.is-active {
        color: #0099e5;

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
