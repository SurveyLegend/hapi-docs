<template>
    <div id="app">
        <AppHeader />
        <AppSidebar />
        <AppContent />
        <AppBackground />
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
    }
}
</script>

<style lang="scss">
@import '@/assets/scss/base/_normalize.scss';

#app {
    @include font-hind;

    width: 100%;
    height: 100%;

    font-size: 14px;
    font-weight: 500;
    line-height: 26px;

    color: #4c555a;
    background: white;

    letter-spacing: 0.1px;

    @include dark-mode {
        color: #d0d4d7;
        background: darken(#242729, 4);

        h1 {
            color: lighten(#d0d4d7, 2);
        }

        a {
            &:hover {
                color: lighten(#d0d4d7, 12);
            }
        }
    }

    h1,
    h2,
    h3,
    h4,
    h5 {
        color: #292e31;

        @include dark-mode {
            color: lighten(#d0d4d7, 2);
        }
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

        @include dark-mode {
            color: darken(#939da3, 30) !important;
        }
    }

    a {
        color: #0099e5;

        &:hover {
            color: #292e31;

            @include dark-mode {
                color: lighten(#d0d4d7, 12);
            }
        }
    }

    p {
        font-size: 15px;
        font-weight: 400;

        margin-top: 20px;
    }

    strong {
        font-weight: 600;
    }

    em {
        font-style: italic;
    }

    code {
        font-size: 13px;
        line-height: 20px;

        display: inline-block;

        padding: 0 5px;

        color: #b93d6a;
        border: 1px solid #f0f4f7;
        border-radius: 4px;
        background: #fafcfc;

        @include font-source-code-pro;

        @include dark-mode {
            border: 1px solid darken(#33383b, 5);
            background: darken(#242729, 6.5);
        }
    }
}
</style>
