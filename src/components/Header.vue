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
                        >{{
                            group.name | capitalize
                        }}</option>
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
    @include respond-to(wide-screens) {
        left: 280px;
    }
    @include respond-to(medium-screens) {
        left: 180px;
    }
    @include respond-to(small-screens) {
        @include dark-mode {
            border-bottom: 1px solid darken($grey-09, 8);
        }

        left: 0;
        height: 52px;

        border-bottom: 1px solid $grey-02;
    }
    @include respond-to(narrow-screens) {
        height: 44px;
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
        }

        right: 220px;
        left: 0;
    }

    position: absolute;
    top: 0;
    right: 0;
    left: 220px;
    z-index: z-index(fixed) + 1;

    transition: border-color 1s ease 0.08s;
}

%header__section {
    @include respond-to(narrow-screens) {
        height: 44px;
    }

    position: absolute;
    top: 0;
    height: 52px;
}

.header__sidebar {
    @extend %header__section;

    @include respond-to(wide-screens) {
        left: -280px;
        width: 280px;
    }
    @include respond-to(medium-screens) {
        left: -180px;
        width: 180px;
    }
    @include respond-to(small-screens) {
        left: 0;

        border-width: 0;
    }
    @include respond-to(narrow-screens) {
        position: fixed;
        top: unset;
        bottom: 0;
    }
    @include rtl {
        @include respond-to(medium-screens) {
            right: -180px;
            left: 0;
        }
        @include respond-to(wide-screens) {
            right: -280px;
            left: 0;
        }
        @include respond-to(small-screens) {
            right: 0;
            left: 0;
        }

        right: -220px;
        left: initial;
    }

    left: -220px;
    width: 220px;
    padding: 8px;
}

.header__copy {
    @extend %header__section;

    @include respond-to(small-screens) {
        @include rtl {
            right: 0;
            left: 50%;
        }

        right: 50%;

        border-color: transparent;
    }
    @include respond-to(narrow-screens) {
        @include dark-mode {
            border-width: 0;
        }
        @include rtl {
            right: 140px;
            left: 0;
        }

        position: fixed;
        top: unset;
        right: 0;
        bottom: 0;
        left: 140px;
    }

    padding: 0 12px;
    z-index: z-index(above);
}

.header__navigation {
    @include respond-to(small-screens) {
        display: block;
    }
    @include respond-to(narrow-screens) {
        width: 100%;
        max-width: 320px;
        margin-top: 8px;
    }
    @include rtl {
        float: left;
    }

    display: none;
    position: relative;
    float: right;
    margin-top: 12px;

    &:after {
        @include mask-icon('../assets/svg/arrow.svg');
        @include dark-mode {
            background-color: lighten($grey-07, 10);
        }
        @include rtl {
            right: initial;
            left: 0;

            border-right: 1px solid $grey-03;
            border-left: none;
        }

        content: '';

        display: block;
        position: absolute;
        top: 6px;
        right: 0;
        bottom: 6px;
        width: 32px;
        z-index: z-index(above);

        background-color: $grey-07;
        border-left: 1px solid $grey-03;

        pointer-events: none;
    }

    select {
        @include font-hind;
        @include dark-mode {
            color: $grey-05;
            background-color: darken($grey-14, 4);
            border-color: lighten($grey-14, 2);

            &:hover {
                color: lighten($grey-05, 12);
            }
        }
        @include respond-to(narrow-screens) {
            width: 100%;
            max-width: 320px;
        }
        @include rtl {
            padding-right: 8px;
            padding-left: 36px;
        }

        font-size: 12px;
        font-weight: 400;
        line-height: 28px;

        display: block;
        position: relative;
        max-width: 200px;
        height: 29px;
        padding-right: 36px;
        padding-left: 8px;
        overflow: hidden;
        vertical-align: middle;

        color: $grey-08;
        background-color: $white;
        border: 1px solid $grey-04;
        border-radius: 5px;
        outline: none;

        text-indent: 0.01px;
        text-overflow: ellipsis;
        white-space: nowrap;

        transition: background-color 0.8s ease, border-color 1s ease;

        cursor: pointer;

        appearance: none;

        &:hover {
            color: $grey-12;
        }
    }
}

.header__example {
    @extend %header__section;

    @include dark-mode {
        background-color: $header__example__background--dark;
    }
    @include respond-to(narrow-screens) {
        position: relative;
        top: 0;
        left: 4px;
        width: calc(100% - 8px);
        min-width: 0;
        height: 44px;
        padding-left: 0;

        background-color: transparent;
    }
    @include rtl {
        @include respond-to(narrow-screens) {
            right: 0;
        }

        right: 50%;
        left: 0;
        padding: 0 0 0 12px;
    }

    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    right: 0;
    left: 50%;
    min-width: 464px;
    padding: 0 12px 0 0;
    z-index: z-index(above);

    background-color: $header__example__background--light;

    justify-content: space-between;
}

.header__logo {
    @include icon('../assets/svg/logo.svg');
    @include dark-mode {
        @include icon('../assets/svg/logo--dark.svg');

        background-position: left center;
    }
    @include rtl {
        @include icon('../assets/svg/logo--rtl.svg');

        background-position: right center;
    }

    display: block;
    position: relative;
    width: 100%;
    height: 100%;

    background-position: left center;
    background-size: contain;
}

.rtl.dark-mode {
    .header__logo {
        @include icon('../assets/svg/logo--dark--rtl.svg');

        background-position: right center;
    }
}
</style>
