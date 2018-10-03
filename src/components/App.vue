<template>
    <div id="app">
        <app-header/>
        <app-sidebar/>
        <app-content/>
        <app-background/>
        <vue-progress-bar/>
    </div>
</template>

<script>
import AppHeader from '@/components/Header'
import AppSidebar from '@/components/Sidebar'
import AppContent from '@/components/Content'
import AppBackground from '@/components/Background'

export default {
    el: '#app',

    components: {
        AppHeader,
        AppSidebar,
        AppContent,
        AppBackground
    },

    async beforeCreate() {
        await this.$store.dispatch('hapi-docs/fetchData')

        const { hash } = window.location

        if (hash) {
            const target = document.getElementById(hash.substr(1))

            target.scrollIntoView()
        }
    }
}
</script>

<style lang="scss">
@import '@/assets/scss/base/_normalize.scss';

#app {
    @include font-hind;

    font-size: 14px;
    font-weight: 500;
    line-height: 26px;

    overflow: hidden;

    color: #4c555a;
    background: white;

    letter-spacing: 0.1px;

    h1,
    h2,
    h3,
    h4,
    h5 {
        color: #292e31;
    }

    h4,
    h5 {
        font-size: 13px;
        font-weight: 500;
        line-height: 18px;

        text-transform: uppercase;
    }

    h1 {
        font-size: 25px;
        font-weight: 400;
        line-height: 32px;
    }

    h3 {
        font-size: 17px;
        font-weight: 500;
        line-height: 22px;
    }

    h5 {
        color: #939da3;
    }

    p {
        font-size: 15px;
        font-weight: 400;

        margin-top: 20px;
    }
}
</style>
