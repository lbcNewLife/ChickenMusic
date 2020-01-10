<template lang="pug">
    .music-list
        .back
            i(class='icon-back', @click='back')
        h1(class='title', v-html='title')
        .bg-image(:style='bgStyle', ref='bgImg')
            .play-wrapper(v-show='songs.length')
                .play(ref='playBtn')
                    i(class='icon-play')
                    span(class='text') 随机播放全部
            .filter(ref='filter')
        .bg-layer(ref='layer')
        Scroll(@scroll='scroll', class='list', :data='songs', ref='list', :probeType='probeType', :listenScroll='listenScroll')
            .song-list-wrapper
                SongList(:songs='songs')
            .loading-container(v-show='!songs.length')
                loading
</template>
<script>
import Scroll from '@/base/scroll/scroll.vue'
import SongList from '@/base/song-list/song-list.vue'
import { prefixStyle } from '@/common/js/dom'
import loading from '@/base/loading/loading'

const RESOLVEHEIGHT = 40
const transform = prefixStyle('transform')
const backdrop = prefixStyle('backdrop-filter')

export default {
    props: {
        bgImg: {
            type: String,
            default: ''
        },
        songs: {
            type: Array,
            default: () => []
        },
        title: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            scrollY: 0
        }
    },
    components: {
        Scroll,
        SongList,
        loading
    },
    computed: {
        bgStyle() {
            return `background-image: url(${this.bgImg})`
        }
    },
    created() {
        this.probeType = 3
        this.listenScroll = true
    },
    mounted() {
        this.imageHeight = this.$refs.bgImg.clientHeight
        this.minHeight = -this.imageHeight + RESOLVEHEIGHT
        this.$refs.list.$el.style.top = `${this.imageHeight}px`
    },
    watch: {
        scrollY(newY) {
            const translateY = Math.max(this.minHeight, newY)
            let zIndex = 0
            let scale = 1
            let blur = 0
            const percent = Math.abs(newY / this.imageHeight)
            this.$refs.layer.style[transform] = `translate3d(0, ${translateY}px, 0)`
            if (newY > 0) {
                scale = percent + 1
                zIndex = 10
            } else {
                blur = Math.min(20 * percent, 20)
            }
            // 这里是模糊效果，但是目前只在Ios下面有，普通安卓手机可能没有
            this.$refs.filter.style[backdrop] = `blur(${blur})`
            if (newY < this.minHeight) {
                zIndex = 10
                this.$refs.bgImg.style.paddingTop = 0
                this.$refs.bgImg.style.height = `${RESOLVEHEIGHT}px`
                this.$refs.playBtn.style.display = 'none'
            } else {
                this.$refs.bgImg.style.paddingTop = '70%'
                this.$refs.bgImg.style.height = 0
                this.$refs.playBtn.style.display = ''
            }
            this.$refs.bgImg.style.zIndex = zIndex
            this.$refs.bgImg.style[transform] = `scale(${scale})`
        }
    },
    methods: {
        scroll(pos) {
            this.scrollY = pos.y
        },
        back() {
            this.$router.back()
        }
    }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .music-list
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: $color-background
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 50
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
    .title
      position: absolute
      top: 0
      left: 10%
      z-index: 40
      width: 80%
      no-wrap()
      text-align: center
      line-height: 40px
      font-size: $font-size-large
      color: $color-text
    .bg-image
      position: relative
      width: 100%
      height: 0
      padding-top: 70%
      transform-origin: top
      background-size: cover
      .play-wrapper
        position: absolute
        bottom: 20px
        z-index: 50
        width: 100%
        .play
          box-sizing: border-box
          width: 135px
          padding: 7px 0
          margin: 0 auto
          text-align: center
          border: 1px solid $color-theme
          color: $color-theme
          border-radius: 100px
          font-size: 0
          .icon-play
            display: inline-block
            vertical-align: middle
            margin-right: 6px
            font-size: $font-size-medium-x
          .text
            display: inline-block
            vertical-align: middle
            font-size: $font-size-small
      .filter
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        background: rgba(7, 17, 27, 0.4)
    .bg-layer
      position: relative
      height: 100%
      background: $color-background
    .list
      position: fixed
      top: 0
      bottom: 0
      width: 100%
      background: $color-background
      .song-list-wrapper
        padding: 20px 30px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
