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
                    this.removeActiveClass()
                    this.lastActiveItem = this.currentItem
                }

                this.currentItem.classList.add(this.activeClass)
            }
        },

        getItemInsideWindow() {
            let currentItem

            this.items.forEach(item => {
                const target = document.getElementById(item.hash.substr(1))
                const isScreenPastSection = this.scrollContainer.scrollTop >= this.getOffsetTop(target) - this.offset

                if (isScreenPastSection) currentItem = item
            })

            return currentItem
        },

        initItems() {
            this.items = this.$el.querySelectorAll('.sidebar__navigation__item')

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

            target.scrollIntoView()

            this.scrollContainer.addEventListener('scroll', this.onScroll)

            if (window.history.replaceState) {
                window.history.replaceState(null, null, hash)
            } else {
                window.location.hash = hash
            }
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
