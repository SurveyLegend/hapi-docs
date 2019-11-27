<template>
    <label class="dark-toggle">
        <input
            v-model="checked"
            type="checkbox"
            class="dark-toggle__source"
        >
        <div
            :class="{ 'is-checked': checked }"
            class="dark-toggle__controls"
        >
            <div class="dark-toggle__controls__fill" />
        </div>
    </label>
</template>

<script>
import Cookies from 'js-cookie'

export default {
    name: 'DarkMode',

    props: {
        darkClass: {
            type: String,
            default: 'dark-mode'
        }
    },

    data() {
        return {
            checked: Boolean(Cookies.get('dark-toggle'))
        }
    },

    computed: {
        isDark() {
            return window.matchMedia('(prefers-color-scheme: dark)')
        }
    },

    watch: {
        checked: {
            immediate: true,
            handler() {
                this.checked ? this.setDark() : this.removeDark()
            }
        }
    },

    mounted() {
        this.$nextTick(() => {
            this.isDark.addListener(this.handleDark)
        })
    },

    beforeDestroy() {
        this.isDark.removeListener(this.handleDark)
    },

    methods: {
        handleDark(event) {
            if (event.matches) {
                this.checked = true

                this.setDark()
            } else {
                this.checked = false

                this.removeDark()
            }
        },

        setDark() {
            Cookies.set('dark-toggle', true, { expires: 365 })

            document.body.classList.add(this.darkClass)
        },

        removeDark() {
            Cookies.remove('dark-toggle')

            document.body.classList.remove(this.darkClass)
        }
    }
}
</script>

<style scoped lang="scss">
.dark-toggle {
    position: relative;
    z-index: z-index(above) + 1;

    transform: translate(-3px, -1px);

    cursor: pointer;
    user-select: none;

    @include rtl {
        transform: translate(3px, -1px);
    }

    &:after {
        @include icon('../assets/svg/toggle--night.svg');

        content: '';

        display: block;
        position: absolute;
        top: -8px;
        left: -8px;
        width: 34px;
        height: 34px;

        border-radius: 50%;
        opacity: 1;

        transform: scale(0.9) rotate(0deg);
        transition: transform 0.9s ease, opacity 0.3s ease;

        @include dark-mode {
            opacity: 0;

            transform: scale(0.7) rotate(60deg);
        }
    }
}

.dark-toggle__source {
    position: absolute;
    width: 100%;
    height: 100%;

    opacity: 0;

    pointer-events: none;
}

.dark-toggle__controls {
    position: relative;
    width: 18px;
    height: 18px;
    overflow: hidden;

    background-color: rgba($white, 0.3);
    border-radius: 50%;
    box-shadow: rgba($yellow, 0.9) 0 0 22px 3px, $orange 0 0 0 1px;

    transition: background-color 0.8 ease, box-shadow 0.8s ease;

    will-change: background-color, transform;

    @include dark-mode {
        background-color: $white;
        box-shadow: rgba($black, 0.6) 0 0 4px 3px, rgba($white, 0.7) 0 0 16px 2px,
            rgba($white, 0.6) 0 0 2px;
    }
}

.dark-toggle__controls__fill {
    position: absolute;
    top: -2px;
    left: -2px;
    width: 22px;
    height: 22px;

    background-color: rgba($orange, 0.4);
    border-radius: 50%;

    transform: translate(0, 0) scale(1);
    transition: transform 0.6s ease 0.1s, background-color 0.6s ease;

    @include dark-mode {
        background-color: rgba($black, 0.6);

        transform: translate(3px, -3px) scale(0.7);
    }
}
</style>
