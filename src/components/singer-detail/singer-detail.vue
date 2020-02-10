<template lang="pug">
    transition(name='slide')
        MusicList(:songs='songs', :title='title', :bgImg='bgImage')
</template>
<script>
import { mapGetters } from 'vuex'
import { getSingerDetail } from '@/api/singer.js'
import { createSong } from '@/common/js/song.js'
import MusicList from '@/components/music-list/music-list'
export default {
    data() {
        return {
            songs: []
        }
    },
    computed: {
        title() {
            return this.singer.name
        },
        bgImage() {
            return this.singer.avatar
        },
        ...mapGetters([
            'singer'
        ])
    },
    components: {
        MusicList
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
    .slide-enter-active, .slide-leave-active
        transition: all .3s
    .slide-enter, .slide-leave-to
        transform: translate3d(100%,0,0)
</style>

