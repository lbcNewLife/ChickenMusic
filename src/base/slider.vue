<template lang="pug">
    .slider(ref='slider')
        .slider-group(ref='sliderGroup')
            slot
        .dots
            span(v-for='item, index in dots', class='dot', :class='{active:currentPageIndex === index}')
</template>

<script type="text/ecmascript-6">
import BetterScroll from 'better-scroll'
import { addClass } from 'common/js/dom.js'
export default {
    props: {
        loop: {
            type: Boolean,
            default: true
        },
        autoPlay: {
            type: Boolean,
            default: true
        },
        interval: {
            type: Number,
            default: 1500
        }
    },
    data() {
        return {
            dots: [],
            currentPageIndex: 0
        }
    },
    components: {
        BetterScroll
    },
    mounted() {
        this.$nextTick(() => {
            this.setSliderWidht()
            this.initSlider()
            this._autoPlay()
        })
        window.addEventListener('resize', () => {
            if (!this.slider) return
            this.setSliderWidht(true)
            this.slider.refresh()
        })
    },
    methods: {
        setSliderWidht(isResize) {
            const children = this.$refs.sliderGroup.children
            let width = 0
            const sliderWidth = this.$refs.slider.clientWidth
            for (let i = 0 ; i < children.length ; i++) {
                const child = children[i]
                addClass(child, 'slider-item')
                child.style.width = sliderWidth + 'px'
                width += sliderWidth
            }
            if (this.loop && !isResize) width += sliderWidth * 2
            this.$refs.sliderGroup.style.width = width + 'px'
            this.dots = new Array(children.length)
        },
        initSlider() {
            this.slider = new BetterScroll(this.$refs.slider, {
                scrollX: true,
                scrollY: false,
                momentum: false,
                snap: true,
                snapLoop: this.loop,
                snapThreshold: 0.3,
                snapSpeed: 400,
                click: true
            })

            this.slider.on('scrollEnd', () => {
                let pageIndex = this.slider.getCurrentPage().pageX
                if (this.loop) pageIndex -= 1
                this.currentPageIndex = pageIndex

                if (this.autoPlay) {
                    clearTimeout(this.timer)
                    this._autoPlay()
                }
            })
        },
        _autoPlay() {
            let pageIndex = this.currentPageIndex + 1
            if (this.autoPlay) {
                pageIndex += 1
            }
            this.timer = setTimeout(() => {
                this.slider.goToPage(pageIndex, 0, 400)
            }, this.interval)
        }
    }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .slider
    min-height: 1px
    position: relative
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>
