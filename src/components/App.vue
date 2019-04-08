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

h1,
h2,
h3,
h4,
h5 {
 @include dark-mode {
  color: lighten($grey-05, 2);
 }

 color: $grey-12;
}

h4,
h5 {
 font-size: 13px;
 font-weight: 500;
 line-height: 18px;

 text-transform: uppercase;
}

h1 {
 @include dark-mode {
  color: lighten($grey-05, 2);
 }

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
 @include dark-mode {
  color: darken($grey-07, 30);
 }

 color: $grey-07;
}

a {
 @include dark-mode {
  color: $dark-blue;
 }

 color: $blue;

 transition: color .2s ease;

 &:hover {
  @include dark-mode {
   color: lighten($dark-blue, 10);
  }

  color: darken($blue, 10);
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
 @include font-source-code-pro;
 @include dark-mode {
  background-color: darken($grey-14, 6.5);
  border: 1px solid darken($grey-09, 5);
 }

 font-size: 13px;
 line-height: 20px;

 display: inline-block;
 padding: 0 5px;

 color: $purple;
 background-color: $grey-01;
 border: 1px solid $grey-02;
 border-radius: 4px;

 transition: background-color .8s ease, border-color 1s ease;
}

#app {
 @include font-hind;
 @include dark-mode {
  color: $grey-05;
  background-color: $app__background--dark;
 }
 @include rtl {
  direction: rtl;
  unicode-bidi: bidi-override;
 }

 font-size: 14px;
 font-weight: 500;
 line-height: 26px;

 width: 100%;
 height: 100%;

 color: $grey-08;
 background-color: $app__background--light;

 letter-spacing: .1px;

 transition: background-color .8s ease;
}

</style>
