<template>
    <div class="languages">
        <div class="language is-active"><i class="language__icon icon--curl" />curl</div>
        <!-- <div class="language"><i class="language__icon icon--php"></i>PHP</div>
        <div class="language"><i class="language__icon icon--node"></i>Node.js</div>
        <div class="language"><i class="language__icon icon--ruby"></i>Ruby</div>
        <div class="language"><i class="language__icon icon--python"></i>Python</div>
        <div class="language"><i class="language__icon icon--go"></i>Go</div>
        <div class="language"><i class="language__icon icon--java"></i>Java</div>
        <div class="language"><i class="language__icon icon--dot-net"></i>.NET</div> -->
    </div>
</template>

<script>
export default {
    name: 'Language'
}
</script>

<style scoped lang="scss">
.languages {
    @include respond-to(narrow-screens) {
        align-items: center;
        padding: 0;
    }
    @include dark-mode {
        &:after {
            background: linear-gradient(
                to left,
                $header__example__background--dark,
                rgba($header__example__background--dark, 0)
            );
        }
    }

    display: flex;
    flex-direction: row;
    align-items: flex-end;
    width: calc(100% - 40px);
    height: 100%;
    padding: 0 8px;
    overflow-x: auto;
    overflow-y: hidden;

    white-space: nowrap;

    &:after {
        @include respond-to(narrow-screens) {
            background: linear-gradient(to left, $white, rgba($white, 0));
        }

        content: '';

        position: absolute;
        top: 0;
        right: 52px;
        bottom: 1px;
        width: 20px;
        z-index: z-index(above);

        background: linear-gradient(
            to left,
            $header__example__background--light,
            rgba($header__example__background--light, 0)
        );

        transition: background 0.8s ease;

        pointer-events: none;
    }
}

.language {
    @include rtl {
        padding: {
            right: 0;
            left: 16px;
        }
    }
    @include respond-to(narrow-screens) {
        padding: {
            top: 0;
            bottom: 0;
        }
        padding-right: 12px;

        color: $grey-07;
        border-radius: 44px;
    }
    @include rtl {
        &:first-child {
            margin-right: 0;
            margin-left: 4px;
        }
    }

    font-size: 14px;
    line-height: 30px;

    margin: 0 4px;
    padding: {
        top: 4px;
        right: 16px;
        bottom: 4px;
        left: 0;
    }
    z-index: z-index(above);

    color: $grey-06;
    border-radius: 6px 6px 0 0;

    transition: background-color 0.8s ease;

    cursor: pointer;

    &:hover {
        background-color: rgba($white, 0.05);
    }

    &:active {
        background: $grey-09;
    }

    &:first-child {
        margin-left: 0;
    }

    &:last-child {
        margin-right: 40px;
    }

    &.is-active {
        @include dark-mode {
            @include respond-to(narrow-screens) {
                background-color: darken($grey-14, 4);
            }

            color: $dark-blue;
            background-color: $background__example__background--dark;
        }
        @include respond-to(narrow-screens) {
            background-color: $grey-02;
            box-shadow: none;
        }

        color: $baby-blue;
        background-color: $background__example__background--light;
        box-shadow: rgba($black, 0.04) 0 -1px 10px 5px, rgba($black, 0.04) 0 -1px 2px 1px;

        &:active {
            background-color: darken($blue, 10);
        }
    }
}

.language__icon {
    @include respond-to(narrow-screens) {
        margin: 0 4px;
    }

    display: inline-block;
    width: 28px;
    height: 32px;
    margin: 0 8px;
    vertical-align: middle;
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
