<template>
    <div class="background">
        <div class="background__actual"/>
    </div>
</template>

<style scoped lang="scss">
.background {
    position: fixed;
    z-index: z-index(default);
    top: 0;
    right: 0;
    bottom: 0;
    left: 221px;

    @include respond-to(medium-screens) {
        left: 181px;
    }
}

.background__actual {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 45%;

    background: #2d3134;
}
</style>
