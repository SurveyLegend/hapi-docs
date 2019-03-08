<template>
    <div class="background">
        <div class="background__actual" />
    </div>
</template>

<style scoped lang="scss">
.background {
    position: fixed;
    z-index: z-index(default);
    top: 0;
    right: 0;
    bottom: 0;
    left: $sidebar-width-in-large-screens;

    @include respond-to(medium-screens) {
        left: $sidebar-width-in-medium-screens;
    }

    @include respond-to(wide-screens) {
        left: $sidebar-width-in-wide-screens;
    }

    @include respond-to(small-screens) {
        left: 0;
    }

    @include respond-to(narrow-screens) {
        display: none;
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

.background__actual {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 50%;

    background-color: $grey-11;
    transition: background-color 0.8s ease;

    @include dark-mode {
        background-color: darken($grey-14, 8);
    }


    @include rtl {
        right: 50%;
        left: 0;
    }
}
</style>
