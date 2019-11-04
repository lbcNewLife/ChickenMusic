<template>
  <div id="app">
    <Header></Header>
    <Tab></Tab>
    <keep-alive>
        <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import Header from 'components/m-header/m-header'
import Tab from 'components/tab/tab'
export default {
    name: 'App',
    data() {
        return {}
    },
    components: {
        Header,
        Tab
    }
}
</script>

<style>
#app {
}
</style>
