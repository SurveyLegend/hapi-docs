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
    cursor: pointer;
    user-select: none;
    position: relative;
    transform: translate(-3px, -1px);

    @include rtl {
        transform: translate(3px, -1px);
    }

    &:after {
        content: '';
        border-radius: 50%;
        @include icon('../assets/svg/toggle--night.svg');
        transform: scale(0.9) rotate(0deg);


        opacity: 1;

        width: 34px;
        height: 34px;
        position: absolute;
        display: block;
        top: -8px;
        left: -8px;

        transition: transform 0.9s ease, opacity 0.3s ease;

        @include dark-mode {
            transform: scale(0.7) rotate(60deg);
            opacity: 0;
        }
    }
}

.dark-toggle__source {
    position: absolute;

    height: 100%;
    width: 100%;

    opacity: 0;
    pointer-events: none;
}

.dark-toggle__controls {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    box-shadow: rgba($yellow, 0.9) 0 0 22px 3px, $orange 0 0 0 1px;
    background-color: rgba($white, 0.3);
    overflow: hidden;
    position: relative;
    will-change: background-color, transform;
    transition: background-color 0.8 ease, box-shadow 0.8s ease;

    @include dark-mode {
        box-shadow: rgba($black, 0.6) 0 0 4px 3px, rgba($white, 0.7) 0 0 16px 2px,
            rgba($white, 0.6) 0 0 2px;
        background-color: $white;
    }
}

.dark-toggle__controls__fill {
    position: absolute;
    top: -2px;
    left: -2px;
    border-radius: 50%;
    width: 22px;
    height: 22px;
    background-color: rgba($orange, 0.4);
    transform: translate(0, 0) scale(1);
    transition: transform 0.6s ease 0.1s, background-color 0.6s ease;


    @include dark-mode {
        background-color: rgba($black, 0.6);
        transform: translate(3px, -3px) scale(0.7);
    }
}
</style>
