<template lang="pug">
    transition(name='slide')
        .singer-detail
</template>
<script>
import { mapGetters } from 'vuex'
import { getSingerDetail } from '@/api/singer.js'
import { createSong } from '@/common/js/song.js'
export default {
    data() {
        return {
            songs: []
        }
    },
    computed: {
        ...mapGetters([
            'singer'
        ])
    },
    created() {
        this._getsingerDetail()
    },
    methods: {
        _getsingerDetail() {
            if (!this.singer.id) {
                this.$router.push('/singer')
                return
            }
            getSingerDetail(this.singer.id).then(res => {
                this.songs = this._normalizeSongs(res.list)
                console.log(this.songs)
            })
        },
        _normalizeSongs(list) {
            const ret = []
            list.map((item, index) => {
                const { musicData } = item
                if (musicData.songid && musicData.albummid) {
                    ret.push(createSong(musicData))
                }
            })
            return ret
        }
    }
}
</script>
<style lang="stylus" scoped>
@import "~common/stylus/variable";
    .singer-detail
        position: fixed
        z-index: 100
        top: 0
        left: 0
        right: 0
        bottom: 0
        background: $color-background
    .slide-enter-active, .slide-leave-active
        transition: all .3s
    .slide-enter, .slide-leave-to
        transform: translate3d(100%,0,0)
</style>

