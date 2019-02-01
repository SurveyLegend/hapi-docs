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
                        <option>Welcome</option>
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
            <DarkMode />
            <Language />
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
    left: $sidebar-width-in-large-screens;
    transition: border-color 1s ease 0.08s;

    @include respond-to(medium-screens) {
        left: $sidebar-width-in-medium-screens;
    }

    @include respond-to(wide-screens) {
        left: $sidebar-width-in-wide-screens;
    }

    @include respond-to(small-screens) {
        left: 0;
        height: 50px;
        border-bottom: 1px solid $grey-02;

        @include dark-mode {
            border-bottom: 1px solid darken($grey-09, 8);
        }
    }

    @include rtl {
        right: $sidebar-width-in-large-screens;
        left: 0;

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

    left: -$sidebar-width-in-large-screens;

    width: $sidebar-width-in-large-screens;

    padding: 8px;


    @include respond-to(medium-screens) {
        left: -$sidebar-width-in-medium-screens;

        width: $sidebar-width-in-medium-screens;
    }

    @include respond-to(wide-screens) {
        left: -$sidebar-width-in-wide-screens;

        width: $sidebar-width-in-wide-screens;
    }

    @include respond-to(small-screens) {
        left: 0;
        border-width: 0;
    }

    @include rtl {
        left: initial;
        right: -$sidebar-width-in-large-screens;

        @include respond-to(medium-screens) {
            right: -$sidebar-width-in-medium-screens;
            left: 0;
        }

        @include respond-to(wide-screens) {
            right: -$sidebar-width-in-wide-screens;
            left: 0;
        }

        @include respond-to(small-screens) {
            right: 0;
            left: 0;
        }
    }
}

.header__copy {
    @extend %header__section;

    z-index: z-index(above);
    padding: 0 12px;

    @include respond-to(small-screens) {
        right: 55vw;
        border-color: transparent;

        @include rtl {
            left: 55vw;
            right: 0;
        }
    }

    @include respond-to(narrow-screens) {
        left: 140px;
        position: fixed;
        right: 0;

        @include dark-mode {
            border-width: 0;
        }

        @include rtl {
            right: 140px;
            left: 0;
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
    }

    @include respond-to(narrow-screens) {
        width: 100%;
        max-width: 320px;
    }

    @include rtl {
        float: left;
    }

    &:after {
        content: '';

        display: block;
        position: absolute;

        z-index: z-index(above);

        top: 6px;
        bottom: 6px;
        right: 0;
        width: 32px;

        border-left: 1px solid $grey-03;
        pointer-events: none;

        @include mask-icon('../assets/svg/arrow.svg');
        background-color: $grey-07;

        @include dark-mode {
            background-color: lighten($grey-07, 10);
        }

        @include rtl {
            border-left: none;
            border-right: 1px solid $grey-03;
            left: 0;
            right: initial;
        }
    }

    select {
        @include font-hind;

        display: block;
        position: relative;

        max-width: 200px;
        height: 29px;
        padding-left: 8px;
        padding-right: 36px;

        background-color: $white;
        border: 1px solid $grey-04;
        border-radius: 5px;
        color: $grey-08;

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
        transition: background-color 0.8s ease, border-color 1s ease;

        &:hover {
            color: $grey-12;
        }

        @include dark-mode {
            color: $grey-05;
            background-color: darken($grey-14, 4);
            border-color: lighten($grey-14, 2);

            &:hover {
                color: lighten($grey-05, 12);
            }
        }

        @include respond-to(narrow-screens) {
            max-width: 320px;
            width: 100%;
        }

        @include rtl {
            padding-left: 36px;
            padding-right: 8px;
        }
    }
}

.header__example {
    @extend %header__section;

    display: flex;
    flex-direction: row-reverse;

    align-items: center;
    justify-content: space-between;

    left: 50%;
    right: 0;
    z-index: z-index(above);

    height: 50px;
    min-width: 464px;

    padding: 0 12px;

    background-color: $grey-14;

    @include dark-mode {
        background-color: darken($grey-14, 12);
    }

    @include respond-to(small-screens) {
        padding-left: 4px;

        @include rtl {
            padding-right: 4px;
            padding-left: 20px;
        }
    }

    @include respond-to(narrow-screens) {
        position: relative;

        left: 0;
        top: 49px;

        height: 41px;
        min-width: 0;
    }

    @include rtl {
        right: 50%;
        left: 0;

        @include respond-to(narrow-screens) {
            right: 0;
        }
    }
}

.header__logo {
    position: relative;

    display: block;

    width: 100%;
    height: 100%;

    @include icon('../assets/svg/logo.svg');
    background-size: contain;
    background-position: left center;

    @include dark-mode {
        @include icon('../assets/svg/logo--dark.svg');
        background-position: left center;
    }

    @include rtl {
        @include icon('../assets/svg/logo--rtl.svg');
        background-position: right center;
    }
}

.rtl.dark-mode {
    .header__logo {
        @include icon('../assets/svg/logo--dark--rtl.svg');
        background-position: right center;
    }
}
</style>
