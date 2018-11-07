<template>
    <div @click="handleClick"/>
</template>

<script>
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
            darkMode: false
        }
    },

    computed: {
        isDark() {
            return window.matchMedia('(prefers-color-scheme: dark)')
        }
    },

    mounted() {
        this.$nextTick(() => {
            this.setDark(this.isDark)

            this.isDark.addListener(this.setDark)
        })
    },

    beforeDestroy() {
        this.isDark.removeListener(this.setDark)
    },

    methods: {
        setDark(event) {
            document.body.className = event.matches ? this.darkClass : ''
        },

        handleClick(event) {
            event.preventDefault()
        }
    }
}
</script>

<style scoped lang="scss">
</style>
