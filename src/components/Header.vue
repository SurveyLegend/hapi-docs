<template>
    <div class="header">
        <div class="header__sidebar">
            <a
                class="header__logo"
                href="/"
            />
        </div>
        <div class="header__copy">
            <div class="header__navigation">
                <select>
                    <optgroup label="Topics">
                        <option>Introduction</option>
                        <option>Authentication</option>
                        <option>Errors</option>
                    </optgroup>
                    <optgroup label="API">
                        <option
                            v-for="group in groups"
                            :key="group.name"
                        >{{ group.name | capitalize }}</option>
                    </optgroup>
                </select>
            </div>
        </div>
        <div class="header__example">
            <div class="header__dark">
                <DarkMode />
            </div>
        </div>
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
.header {
    position: absolute;
    z-index: z-index(fixed) + 1;
    top: 0;
    right: 0;
    left: 220px;

    @include respond-to(medium-screens) {
        left: 180px;
    }

    @include respond-to(wide-screens) {
        left: 280px;
    }

    @include respond-to(small-screens) {
        left: 0;
        height: 50px;
        border-bottom: 1px solid #f0f4f7;

        @include dark-mode {
            border-bottom: 1px solid darken(#33383b, 8);
        }
    }
}

%header__section {
    position: absolute;
    top: 0;

    height: 49px;
}

.header__sidebar {
    @extend %header__section;

    left: -220px;

    width: 220px;

    border-bottom: 1px solid #f0f4f7;

    @include dark-mode {
        border-bottom: 1px solid lighten(#242729, 1);
    }

    @include respond-to(medium-screens) {
        left: -180px;

        width: 180px;
    }

    @include respond-to(wide-screens) {
        left: -280px;

        width: 280px;
    }

    @include respond-to(small-screens) {
        left: 0;
        border-bottom: 0 !important;
    }
}

.header__copy {
    @extend %header__section;

    z-index: z-index(above);

    @include respond-to(small-screens) {
        right: 55vw;
    }

    @include respond-to(narrow-screens) {
        left: 140px;
        position: fixed;
        right: 0;
        padding: 0 20px;
        background: #fff;
        border-bottom: 1px solid #f0f4f7;

        @include dark-mode {
            background: darken(#242729, 4);
            border-bottom: 0;
        }
    }
}

.header__navigation {
    display: none;
    float: right;
    position: relative;

    margin-top: 10px;

    @include respond-to(small-screens) {
        display: block;

        margin-right: 30px;
    }

    @include respond-to(narrow-screens) {
        width: 100%;
        max-width: 320px;

        margin-right: 0;
    }

    &:before {
        content: '';

        display: block;
        position: absolute;

        z-index: z-index(above);

        top: 7px;
        right: 28px;

        width: 1px;
        height: 15px;

        background: #d6dee5;

        @include dark-mode {
            background: lighten(#242729, 4);
        }
    }

    &:after {
        content: '';

        display: block;
        position: absolute;

        z-index: z-index(above);

        top: 13px;
        right: 13px;

        width: 6px;
        height: 4px;

        @include icon('../assets/svg/arrow.svg');
        background-size: 6px 4px;
    }

    select {
        @include font-hind;

        display: block;
        position: relative;

        max-width: 200px;
        height: 29px;
        padding-left: 10px;
        padding-right: 38px;

        background: #fff;
        border: 1px solid #d6dee5;
        border-radius: 5px;
        color: #4c555a;

        font-size: 12px;
        font-weight: 400;
        line-height: 28px;
        outline: none;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-indent: 0.01px;
        vertical-align: middle;

        appearance: none;
        cursor: pointer;

        &:hover {
            color: #292e31;
        }

        @include dark-mode {
            color: #d0d4d7;
            background: darken(#242729, 4);
            border-color: lighten(#242729, 4);

            &:hover {
                color: lighten(#d0d4d7, 12);
            }
        }

        @include respond-to(narrow-screens) {
            max-width: 320px;
            width: 100%;
        }
    }
}

.header__example {
    @extend %header__section;

    left: calc((100vw - 220px) * 0.45);
    right: 0;
    z-index: z-index(above);

    height: 50px;
    min-width: 464px;

    padding: 0 40px;

    background-color: #242729;

    @include dark-mode {
        background-color: darken(#242729, 12);
    }

    @include respond-to(wide-screens) {
        left: 780px;
    }

    @include respond-to(small-screens) {
        left: 45vw;
    }

    @include respond-to(narrow-screens) {
        position: relative;

        left: 0;
        top: 49px;

        height: 41px;
        min-width: 0;

        padding-left: 0;
    }
}

.header__logo {
    position: relative;

    display: none;

    width: 100%;
    height: 100%;

    @include icon('../assets/images/logo.png');
    background-size: 20px 29px;
    background-position: 20px center;
}

.header__dark {
    display: flex;
    flex-direction: row-reverse;

    align-items: center;

    height: 100%;
}
</style>
