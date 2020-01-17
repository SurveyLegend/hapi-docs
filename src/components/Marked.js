import marked from 'marked'

export default {
    name: 'Marked',

    template: '<div><slot></slot></div>',

    props: {
        breaks: {
            type: Boolean,
            default: false
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
            sourceData: ''
        }
    },

    beforeMount() {
        if (this.$slots.default) {
            this.sourceData = ''

            for (let slot of this.$slots.default) {
                this.sourceData += slot.text
            }
        }
    },

    render(createElement) {
        const options = {
            breaks: this.breaks
        }

        let outHtml = marked(this.prerender(this.sourceData), options)

        outHtml = this.postrender(outHtml)

        return createElement('div', {
            domProps: {
                innerHTML: outHtml
            }
        })
    }
}
