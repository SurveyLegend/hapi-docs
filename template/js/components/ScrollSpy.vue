<template>
    <nav role="navigation">
        <slot></slot>
    </nav>
</template>

<script>
export default {
    name: 'ScrollSpy',

    props: {
        container: {
            type: String,
            default: 'body'
        },

        activeClass: {
            type: String,
            default: 'is-active'
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
        this.removeActiveClass()
        this.currentItem = this.getItemInsideWindow()

        if (this.currentItem) this.currentItem.classList.add(this.activeClass)

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
                const hash = this.currentItem.hash

                if (this.currentItem !== this.lastActiveItem) {
                    this.removeActiveClass()
                    this.$emit('itemchanged', event, this.currentItem, this.lastActiveItem)
                    this.lastActiveItem = this.currentItem
                }

                this.currentItem.classList.add(this.activeClass)

                window.location.hash = hash
            }
        },

        getItemInsideWindow() {
            let currentItem

            this.items.forEach(item => {
                const target = document.getElementById(item.hash.substr(1))
                const isScreenPastSection = this.scrollContainer.scrollTop >= this.getOffsetTop(target)

                if (isScreenPastSection) currentItem = item
            })

            return currentItem
        },

        initItems() {
            this.items = this.$el.querySelectorAll('.sidebar__navigation__item')

            this.items.forEach(item => {
                item.addEventListener('click', this.handleClick)
            })
        },

        handleClick(event) {
            event.preventDefault()

            const { hash } = event.currentTarget
            const target = document.getElementById(hash.substr(1))

            this.scrollContainer.removeEventListener('scroll', this.onScroll)
            this.removeActiveClass()
            event.currentTarget.classList.add(this.activeClass)
            this.scrollTo(target)
            this.scrollContainer.addEventListener('scroll', this.onScroll)

            if (window.history.pushState) {
                window.history.pushState(null, null, hash)
            } else {
                window.location.hash = hash
            }
        },

        scrollTo(target) {
            const startingY = this.scrollContainer.scrollTop
            const difference = this.getOffsetTop(target) - startingY

            this.scrollContainer.scrollTop = startingY + difference
        },

        getOffsetTop(element) {
            let yPosition = 0
            let nextElement = element

            while (nextElement) {
                yPosition += (nextElement.offsetTop)
                nextElement = nextElement.offsetParent
            }

            return yPosition
        },

        removeActiveClass() {
            this.items.forEach(item => {
                item.classList.remove(this.activeClass)
            })
        }
    }
}
</script>
