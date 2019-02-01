<template>
    <div class="languages">
        <div class="language is-active">curl</div>
        <div class="language">Ruby</div>
        <div class="language">Python</div>
        <div class="language">Java</div>
        <div class="language">Node</div>
        <div class="language">Go</div>
    </div>
</template>

<script>
export default {
    name: 'Language'
}
</script>

<style scoped lang="scss">
.languages {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: calc(100% - 36px);
    height: 100%;
    padding: 0 8px;
    overflow-x: auto;
    overflow-y: hidden;

    white-space: nowrap;
}

.language {
    z-index: z-index(above);

    color: $grey-05;

    font-size: 14px;
    line-height: 28px;

    margin: 0 4px;
    padding: 0 8px;
    border-radius: 4px;
    border: 1px solid transparent;
    transition: background-color 0.2s ease;

    cursor: pointer;

    &:hover {
        background-color: rgba($white, 0.2);
    }

    &:active {
        background: $grey-09;
    }

    &:first-child {
        margin-left: 0;
    }

    &.is-active {
        color: $white;
        text-shadow: 0 0 0 hsla(0, 0%, 100%, 0.5), 0 0 2px $grey-10;
        background-color: $baby-blue;

        &:hover {
            background-color: $blue;
        }

        &:active {
            background: darken($blue, 10);
        }
    }

    @include rtl {
        &:first-child {
            margin-right: 0;
            margin-left: 4px;
        }
    }
}
</style>
