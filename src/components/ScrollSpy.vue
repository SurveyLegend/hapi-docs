<template>
    <nav role="navigation">
        <slot/>
    </nav>
</template>

<script>
export default {
    name: 'ScrollSpy',

    props: {
        container: {
            type: String,
            default: '.content'
        },

        itemClass: {
            type: String,
            default: '.sidebar__navigation__item'
        },

        activeClass: {
            type: String,
            default: 'is-active'
        },

        offset: {
            type: Number,
            default: 1
        }
    },

    data() {
        return {
            items: [],
            currentItem: null,
            lastActiveItem: null
        }
    },

    computed: {
        scrollContainer() {
            return document.querySelector(this.container)
        }
    },

    mounted() {
        this.initItems()

        this.scrollContainer.addEventListener('scroll', this.onScroll)
    },

    updated() {
        this.initItems()
    },

    beforeDestroy() {
        this.scrollContainer.removeEventListener('scroll', this.onScroll)
    },

    methods: {
        onScroll(event) {
            this.currentItem = this.getItemInsideWindow()

            if (this.currentItem) {
                if (this.currentItem !== this.lastActiveItem) {
                    const { hash } = this.currentItem

                    this.removeActiveClass()
                    this.lastActiveItem = this.currentItem

                    this.currentItem.classList.add(this.activeClass)
                    this.currentItem.scrollIntoView({ block: 'end', inline: 'nearest' })

                    this.updateHash(hash)
                }
            }
        },

        getItemInsideWindow() {
            let currentItem

            this.items.forEach(item => {
                const target = document.getElementById(item.hash.substr(1))
                const isScreenPastSection =
                    this.scrollContainer.scrollTop >= this.getOffsetTop(target) - this.offset

                if (isScreenPastSection) currentItem = item
            })

            return currentItem
        },

        initItems() {
            this.items = this.$el.querySelectorAll(this.itemClass)

            this.items.forEach(item => {
                item.addEventListener('click', this.handleClick)
            })

            this.removeActiveClass()
            this.currentItem = this.getItemInsideWindow()

            if (this.currentItem) this.currentItem.classList.add(this.activeClass)
        },

        handleClick(event) {
            event.preventDefault()

            const { hash } = event.currentTarget
            const target = document.getElementById(hash.substr(1))

            this.scrollContainer.removeEventListener('scroll', this.onScroll)

            this.removeActiveClass()
            event.currentTarget.classList.add(this.activeClass)

            event.currentTarget.scrollIntoView({ block: 'end', inline: 'nearest' })
            target.scrollIntoView()

            this.scrollContainer.addEventListener('scroll', this.onScroll)

            this.updateHash(hash)
        },

        getOffsetTop(element) {
            let yPosition = 0
            let nextElement = element

            while (nextElement) {
                yPosition += nextElement.offsetTop
                nextElement = nextElement.offsetParent
            }

            return yPosition
        },

        updateHash(hash) {
            if (window.history.replaceState) {
                window.history.replaceState(null, null, hash)
            } else {
                window.location.hash = hash
            }
        },

        removeActiveClass() {
            this.items.forEach(item => {
                item.classList.remove(this.activeClass)
            })
        }
    }
}
</script>
