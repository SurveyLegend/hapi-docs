<template>
    <label class="dark-toggle">
        <input v-model="checked" type="checkbox" class="dark-toggle__source" />
        <div :class="{ 'is-checked': checked }" class="dark-toggle__controls" />
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
}

.dark-toggle__source {
    position: absolute;

    height: 100%;
    width: 100%;

    opacity: 0;
    pointer-events: none;
}

.dark-toggle__controls {
    width: 20px;
    height: 20px;

    @include icon('../assets/svg/toggle--day.svg');

    &.is-checked {
        @include icon('../assets/svg/toggle--night.svg');
    }
}
</style>
