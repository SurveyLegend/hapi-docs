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
    left: 220px;

    @include respond-to(medium-screens) {
        left: 180px;
    }

    @include respond-to(wide-screens) {
        left: 280px;
    }

    @include respond-to(small-screens) {
        left: 0;
    }

    @include respond-to(narrow-screens) {
        display: none;
    }

    @include rtl {
        right: 220px;
        left: 0;

        @include respond-to(medium-screens) {
            right: 180px;
            left: 0;
        }

        @include respond-to(wide-screens) {
            right: 280px;
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
    left: calc((100vw - 220px) * 0.45);

    background-color: $grey-11;
    transition: background-color 0.8s ease;

    @include dark-mode {
        background-color: darken($grey-14, 8);
    }

    @include respond-to(wide-screens) {
        left: 780px;
    }

    @include respond-to(small-screens) {
        left: 45vw;
    }

    @include rtl {
        right: calc((100vw - 220px) * 0.45);
        left: 0;

        @include respond-to(wide-screens) {
            right: 780px;
            left: 0;
        }

        @include respond-to(small-screens) {
            right: 45vw;
            left: 0;
        }
    }
}
</style>
