<template lang="pug">
    div(ref='warpper')
        slot
</template>

<script>
import BScroll from 'better-scroll'
export default {
    props: {
        probeType: {
            type: Number,
            default: 1
        },
        click: {
            type: Boolean,
            default: true
        },
        listenScroll: {
            type: Boolean,
            default: false
        },
        data: {
            type: Array,
            default: null
        }
    },
    mounted() {
        setTimeout(() => {
            this._initScroll()
        }, 20)
    },
    watch: {
        data() {
            setTimeout(() => {
                this.refresh()
            }, 20)
        }
    },
    methods: {
        _initScroll() {
            if (!this.$refs.warpper) return
            this.scroll = new BScroll(this.$refs.warpper, {
                probeType: this.probeType,
                click: this.click
            })
            if (this.listenScroll) {
                const me = this
                this.scroll.on('scroll', (pos) => {
                    me.$emit('scroll', pos)
                })
            }
        },
        enable() {
            this.scroll && this.scroll.enable()
        },
        disable() {
            this.scroll && this.scroll.disable()
        },
        refresh() {
            this.scroll && this.scroll.refresh()
        },
        scrollTo() {
            this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
        },
        scrollToElement() {
            this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
        }
    }
}
</script>
