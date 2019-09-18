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
 @include rtl {
  transform: translate(3px, -1px);
 }

 position: relative;
 z-index: z-index(above) + 1;

 transform: translate(-3px, -1px);

 cursor: pointer;
 user-select: none;

 &:after {
  @include icon('../assets/svg/toggle--night.svg');
  @include dark-mode {
   opacity: 0;

   transform: scale(.7) rotate(60deg);
  }

  content: '';

  display: block;
  position: absolute;
  top: -8px;
  left: -8px;
  width: 34px;
  height: 34px;

  border-radius: 50%;
  opacity: 1;

  transform: scale(.9) rotate(0deg);
  transition: transform .9s ease, opacity .3s ease;
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
 @include dark-mode {
  background-color: $white;
  box-shadow: rgba($black, .6) 0 0 4px 3px, rgba($white, .7) 0 0 16px 2px,
  rgba($white, .6) 0 0 2px;
 }

 position: relative;
 width: 18px;
 height: 18px;
 overflow: hidden;

 background-color: rgba($white, .3);
 border-radius: 50%;
 box-shadow: rgba($yellow, .9) 0 0 22px 3px, $orange 0 0 0 1px;

 transition: background-color .8 ease, box-shadow .8s ease;

 will-change: background-color, transform;
}

.dark-toggle__controls__fill {
 @include dark-mode {
  background-color: rgba($black, .6);

  transform: translate(3px, -3px) scale(.7);
 }

 position: absolute;
 top: -2px;
 left: -2px;
 width: 22px;
 height: 22px;

 background-color: rgba($orange, .4);
 border-radius: 50%;

 transform: translate(0, 0) scale(1);
 transition: transform .6s ease .1s, background-color .6s ease;
}
</style>
