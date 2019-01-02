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
}

.background__actual {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: calc((100vw - 220px) * 0.45);

    background: #2d3134;

    @include dark-mode {
        background: darken(#242729, 8);
    }

    @include respond-to(wide-screens) {
        left: 780px;
    }

    @include respond-to(small-screens) {
        left: 45vw;
    }
}
</style>
