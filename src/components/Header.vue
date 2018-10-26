<template>
    <div class="header">
        <div class="header__sidebar">
            <a
                class="header__logo"
                href="/"/>
        </div>
        <div class="header__copy"/>
        <div class="header__example"/>
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
}

%header__section {
    height: 49px;
}

.header__sidebar {
    @extend %header__section;

    position: absolute;
    top: 0;
    left: -221px;

    width: 220px;

    border-bottom: 1px solid #f0f4f7;

    @include dark-mode {
        border-bottom: 1px solid #33383b;
    }

    @include respond-to(medium-screens) {
        left: -181px;

        width: 180px;
    }

    @include respond-to(wide-screens) {
        left: -281px;

        width: 280px;
    }
}

.header__logo {
    position: relative;
    top: 6px;
    left: 10px;

    display: block;

    width: 134px;
    height: 38px;
}
</style>
