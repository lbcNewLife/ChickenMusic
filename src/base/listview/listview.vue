<template lang="pug">
    Scroll(class='listview', :data='data', ref='listview', :listenScroll='listenScroll', @scroll='scroll', :probeType='probeType')
        ul
            li(v-for='(group,index) in data', ref='listGroup', class='list-group')
                h2(class='list-group-title') {{group.title}}
                ul
                    li(v-for='item in group.items', class='list-group-item', @click='selectItem(item)')
                        img(class='avatar', v-lazy='item.avatar')
                        span(class='name') {{item.name}}
        .list-shortcut(@touchstart='onShortcutTouchStart', @touchmove.stop.prevent='onShortcutTouchMove')
            ul
                li(v-for='(item, index) in shortcutList', class='item', :data-index='index', :class="{'current': currentIndex === index}") {{item}}
        .list-fixed(v-show='fixedTitle', ref='fixed')
            .fixed-title {{fixedTitle}}
        .loading-container(v-show='!data.length')
            loading
</template>
<script>
import Scroll from '@/base/scroll/scroll'
import { getData } from '@/common/js/dom.js'
import loading from '@/base/loading/loading'

const ANCHOR_HEIGHT = 18
const TITLE_HEIGHT = 30

export default {
    props: {
        data: {
            type: Array
        }
    },
    data() {
        return {
            scrollY: -1,
            currentIndex: 0,
            probeType: 3,
            diff: -1
        }
    },
    created() {
        this.touch = {}
        this.listenScroll = true
        this.listHeight = []
    },
    computed: {
        shortcutList() {
            return this.data.map((group) => {
                return group.title.substr(0, 1)
            })
        },
        fixedTitle() {
            return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
        }
    },
    watch: {
        data() {
            setTimeout(() => {
                this._calculateHeight()
            }, 20)
        },
        scrollY(newType) {
            // 当在顶部的时候并且往下拉造成newType > 0
            if (newType > 0) {
                this.currentIndex = 0
                return
            }
            // 这里就是在中间部分滚动的时候
            for (let i = 0 ; i < (this.listHeight.length - 1) ; i++) {
                const height1 = this.listHeight[i]
                const height2 = this.listHeight[i + 1]
                if (-newType >= height1 && -newType < height2) {
                    this.currentIndex = i
                    this.diff = height2 + newType
                    return
                }
            }
            // 最后就是在底部滚动的时候
            this.currentIndex = this.listHeight.length - 2
        },
        diff(newType) {
            const fixedTop = (newType > 0 && newType < TITLE_HEIGHT) ? newType - TITLE_HEIGHT : 0
            if (this.fixedTop === fixedTop) return
            this.fixedTop = fixedTop
            this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px, 0)`
        }
    },
    components: {
        Scroll,
        loading
    },
    methods: {
        selectItem(item) {
            this.$emit('select', item)
        },
        onShortcutTouchStart(e) {
            const anchorIndex = getData(e.target, 'index')
            const firstTouch = e.touches[0]
            this.touch.y1 = firstTouch.pageY
            this.touch.anchorIndex = anchorIndex
            this._scrollTo(anchorIndex)
        },
        onShortcutTouchMove(e) {
            const firstTouch = e.touches[0]
            this.touch.y2 = firstTouch.pageY
            const detal = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
            const anchorIndex = parseInt(this.touch.anchorIndex) + detal
            this._scrollTo(anchorIndex)
        },
        scroll(pos) {
            this.scrollY = pos.y
        },
        _scrollTo(index) {
            if (!index && index !== 0) return
            if (index < 0) index = 0
            if (index > this.listHeight.length - 2) index = this.listHeight.length - 2
            this.scrollY = -this.listHeight[index]
            this.$refs.listview.scrollToElement(this.$refs.listGroup[index])
        },
        _calculateHeight() {
            this.listHeight = []
            const list = this.$refs.listGroup
            let height = 0
            this.listHeight.push(height)
            list.map((item, index) => {
                height += item.clientHeight
                this.listHeight.push(height)
            })
        }
    }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
