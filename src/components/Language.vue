<template>
    <div class="languages">
        <div class="language is-active"><i class="language__icon icon--curl"></i>curl</div>
        <div class="language"><i class="language__icon icon--php"></i>PHP</div>
        <div class="language"><i class="language__icon icon--node"></i>Node.js</div>
        <div class="language"><i class="language__icon icon--ruby"></i>Ruby</div>
        <div class="language"><i class="language__icon icon--python"></i>Python</div>
        <div class="language"><i class="language__icon icon--go"></i>Go</div>
        <div class="language"><i class="language__icon icon--java"></i>Java</div>
        <div class="language"><i class="language__icon icon--dot-net"></i>.NET</div>
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
    align-items: flex-end;
    width: calc(100% - 36px);
    height: 100%;
    padding: 0 8px;
    overflow-x: auto;
    overflow-y: hidden;

    white-space: nowrap;
}

.language {
    z-index: z-index(above);

    color: $grey-06;

    font-size: 14px;
    line-height: 30px;

    margin: 0 4px;
    padding: 4px 16px 4px 0;
    border-radius: 6px 6px 0 0;
    transition: background-color 0.8s ease;

    cursor: pointer;

    @include rtl {
        padding: 4px 0 4px 16px;
    }

    &:hover {
        background-color: rgba($white, 0.05);
    }

    &:active {
        background: $grey-09;
    }

    &:first-child {
        margin-left: 0;
    }

    &.is-active {
        color: $baby-blue;
        background-color: lighten($indigo, 1.5);
        box-shadow: rgba($black, 0.04) 0 -1px 10px 5px, rgba($black, 0.04) 0 -1px 2px 1px;

        @include dark-mode {
            background-color: darken($grey-14, 8);
            color: $dark-blue;
        }

        &:active {
            background-color: darken($blue, 10);
        }
    }

    @include rtl {
        &:first-child {
            margin-right: 0;
            margin-left: 4px;
        }
    }
}

.language__icon {
  display: inline-block;
  width: 28px;
  height: 32px;
  vertical-align: middle;
  margin: 0 8px;
}

.icon--curl {
  @include icon('../assets/svg/language--curl.svg');
}
.icon--ruby {
  @include icon('../assets/svg/language--ruby.svg');
}
.icon--python {
  @include icon('../assets/svg/language--python.svg');
}
.icon--java {
  @include icon('../assets/svg/language--java.svg');
}
.icon--node {
  @include icon('../assets/svg/language--node.svg');
}
.icon--go {
  @include icon('../assets/svg/language--go.svg');
}
.icon--php {
  @include icon('../assets/svg/language--php.svg');
}
.icon--dot-net {
  @include icon('../assets/svg/language--dot-net.svg');
}
</style>
