import Vue from 'vue'
import ScrollSpy from './ScrollSpy'

[
    ScrollSpy
].forEach(Component => {
    Vue.component(Component.name, Component)
})
