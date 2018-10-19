import Vue from 'vue'
import Marked from './Marked'
import ScrollSpy from './ScrollSpy'

[
    Marked,
    ScrollSpy
].forEach(Component => {
    Vue.component(Component.name, Component)
})
