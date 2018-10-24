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

        activeParentClass: {
            type: String,
            default: 'is-active-parent'
        },

        offset: {
            type: Number,
            default: 1
        }
    },

    data() {
        return {
            items: [],
            anchors: [],
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

            if (this.currentItem && this.currentItem !== this.lastActiveItem) {
                const { hash } = this.currentItem

                this.removeActiveClass()
                this.lastActiveItem = this.currentItem

                this.currentItem.classList.add(this.activeClass)

                const currentParent = this.currentItem.closest(this.itemClass + 's')
                    .previousElementSibling.classList

                if (currentParent.contains(this.itemClass.substr(1))) {
                    currentParent.add(this.activeParentClass)
                }

                this.currentItem.scrollIntoView({ block: 'end', inline: 'nearest' })

                this.updateHash(hash)
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
            this.anchors = this.scrollContainer.querySelectorAll('a[href*="#"]')

            this.items.forEach(item => {
                item.addEventListener('click', this.handleClick)
            })

            this.anchors.forEach(anchor => {
                anchor.addEventListener('click', this.handleClick)
            })
        },

        handleClick(event) {
            event.preventDefault()

            const isAnchor = !event.currentTarget.classList.contains(this.itemClass.substr(1))
            const target = event.currentTarget
            const hash = target.hash
            const item = isAnchor
                ? document.querySelector(`a[href='${hash.substr(0, hash.indexOf('-'))}']`)
                : target
            const section = document.getElementById(hash.substr(1))

            this.scrollContainer.removeEventListener('scroll', this.onScroll)

            this.removeActiveClass()

            item.classList.add(this.activeClass)

            const parent = item.closest(this.itemClass + 's').previousElementSibling.classList

            if (parent.contains(this.itemClass.substr(1))) {
                parent.add(this.activeParentClass)
            }

            item.scrollIntoView({
                behavior: 'instant',
                block: 'end',
                inline: 'nearest'
            })

            section.scrollIntoView({
                behavior: 'instant',
                block: 'start',
                inline: 'nearest'
            })

            // Scrolling lacks callback & is async
            setTimeout(() => {
                this.scrollContainer.addEventListener('scroll', this.onScroll)
            }, 100)

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
                item.classList.remove(this.activeClass, this.activeParentClass)
            })
        }
    }
}
</script>
