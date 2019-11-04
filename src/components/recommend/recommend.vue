<template lang='pug'>
    .recommend
        BScroll(class='recommend-content', :data='discList', ref='myScroll')
            div
                .slider-warpper(v-if='recommends.length')
                    Slider
                        div(v-for='item, index in recommends')
                            a(:href='item.linkUrl')
                                img(:src='item.picUrl', @load='imgLoad', class='needsclick')
                .recommend-list
                    h1(class='list-title') 热门歌单
                    ul
                        li(class='item', v-for='item,index in discList')
                            .icon
                                img(width='60', height='60', v-lazy='item.imgurl')
                            .text
                                h2(class='name' v-html='item.creator.name')
                                p(class='desc' v-html='item.dissname')
            .loading-container
                Loading(v-show='!discList.length')
</template>

<script type="text/ecmascript-6">
import { getRecommend, getDiscList } from '@/api/recommend'
import { ERR_OK } from '@/api/config'
import Slider from '@/base/slider.vue'
import { fetch } from '@/api/fetch.js'
import BScroll from '@/base/scroll/scroll.vue'
import Loading from '@/base/loading/loading.vue'
export default {
    data() {
        return {
            recommends: [],
            discList: []
        }
    },
    components: {
        Slider,
        BScroll,
        Loading
    },
    mounted() {
        this._getRecommend()
        this._getDiscList()
    },
    methods: {
        _getRecommend() {
            getRecommend().then(res => {
                this.recommends = res.slider
            })
        },
        _getDiscList() {
            getDiscList().then(res => {
                this.discList = res.data.list
            })
        },
        imgLoad() {
            if (!this.isRefresh) {
                this.$refs.myScroll.refresh()
                this.isRefresh = true
            }
        }
    }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
