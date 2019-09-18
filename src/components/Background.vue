<template>
    <div class="background">
        <div class="background__copy" />
        <div class="background__example" />
    </div>
</template>

<style scoped lang="scss">
.background {
 @include respond-to(wide-screens) {
  left: $sidebar-width-in-wide-screens;
 }
 @include respond-to(medium-screens) {
  left: $sidebar-width-in-medium-screens;
 }
 @include respond-to(small-screens) {
  left: 0;
 }
 @include respond-to(narrow-screens) {
  display: none;
 }
 @include rtl {
  @include respond-to(wide-screens) {
   right: $sidebar-width-in-wide-screens;
   left: 0;
  }
  @include respond-to(medium-screens) {
   right: $sidebar-width-in-medium-screens;
   left: 0;
  }
  @include respond-to(small-screens) {
   right: 0;
  }

  right: $sidebar-width-in-large-screens;
  left: 0;
 }

 display: flex;
 position: fixed;
 top: 0;
 right: 0;
 bottom: 0;
 left: $sidebar-width-in-large-screens;
 z-index: z-index(default);
}

.background__copy,
.background__example {
 width: 50%;
}

.background__example {
 @include dark-mode {
  background-color: $background__example__background--dark;
 }

 background-color: $background__example__background--light;

 transition: background-color .8s ease;
}

</style>
