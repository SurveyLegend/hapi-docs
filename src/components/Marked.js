import marked from 'marked'

export default {
    name: 'Marked',

    template: '<div><slot></slot></div>',

    props: {
        source: {
            type: String,
            default: ``
        },

        prerender: {
            type: Function,
            default: sourceData => {
                return sourceData
            }
        },

        postrender: {
            type: Function,
            default: htmlData => {
                return htmlData
            }
        }
    },

    data() {
        return {
            sourceData: this.source
        }
    },

    beforeMount() {
        if (this.$slots.default) {
            this.sourceData = ''

            for (let slot of this.$slots.default) {
                this.sourceData += slot.text
            }
        }

        this.$watch('source', () => {
            this.sourceData = this.prerender(this.source)
            this.$forceUpdate()
        })
    },

    render(createElement) {
        let outHtml = marked(this.prerender(this.sourceData))

        outHtml = this.postrender(outHtml)

        return createElement('div', {
            domProps: {
                innerHTML: outHtml
            }
        })
    }
}
