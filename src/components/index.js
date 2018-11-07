import Vue from 'vue'
import Marked from './Marked'
import DarkMode from './DarkMode'
import ScrollSpy from './ScrollSpy'

[
    Marked,
    DarkMode,
    ScrollSpy
].forEach(Component => {
    Vue.component(Component.name, Component)
})
