import Vue from 'vue'
import Router from 'vue-router'
const Rank = resolve => require(['components/rank/rank.vue'], resolve) // 排行榜
const Search = resolve => require(['components/search/search.vue'], resolve) // 搜索
const Singer = resolve => require(['components/singer/singer.vue'], resolve) // 歌手
const Recommend = resolve => require(['components/recommend/recommend.vue'], resolve)
const SingerDetail = resolve => require(['components/singer-detail/singer-detail.vue'], resolve) // 歌手详情页

Vue.use(Router)

export default new Router({
    linkActiveClass: 'is-link',
    routes: [
        {
            path: '/',
            redirect: '/recommend'
        },
        {
            path: '/rank',
            component: Rank
        },
        {
            path: '/search',
            component: Search
        },
        {
            path: '/singer',
            component: Singer,
            children: [
                {
                    path: ':id',
                    component: SingerDetail
                }
            ]
        },
        {
            path: '/recommend',
            component: Recommend
        }
    ]
})
