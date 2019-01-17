import Vue from 'vue'
import Marked from './Marked'
import DarkMode from './DarkMode'
import Language from './Language'
import ScrollSpy from './ScrollSpy'

[
    Marked,
    DarkMode,
    Language,
    ScrollSpy
].forEach(Component => {
    Vue.component(Component.name, Component)
})
