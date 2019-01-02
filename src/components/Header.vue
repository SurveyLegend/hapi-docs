<template>
    <div class="header">
        <div class="header__sidebar">
            <a
                class="header__logo"
                href="/"
            />
        </div>
        <div class="header__copy" />
        <div class="header__example">
            <div class="header__dark">
                <DarkMode />
            </div>
        </div>
    </div>
</template>

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
