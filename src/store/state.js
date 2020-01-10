import { playMode } from '@/common/js/config.js'

const state = {
    singer: {},
    // 播放器需要的vuex
    playing: false, // 是否播放
    fullScreen: false, // 是否全屏
    playList: [], // 播放列表
    sequenceList: [], // 播放顺序列表
    mode: playMode.sequence,
    currentIndex: -1
}

export default state
