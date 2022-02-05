<template>
  <div id="app">
    <Header/>
    <!-- 路由组件视图 -->
    <router-view></router-view>

    <!-- 在Home、Search显示 在Login、Register隐藏 -->
    <!-- <Footer v-show="$route.name === 'home' || $route.name === 'search'"/> -->
    <!-- 通过路由元信息 meta中的show来决定哪个组件显示 -->
    <Footer v-show="$route.meta.show" />
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  mounted() {
    // TypeNav组件挂载完毕 通知Vuex发请求 获取三级菜单数据 存储于仓库中
    this.$store.dispatch('homeOptions/categoryList')
    // 通过vuex发送ajax请求 获取banner数据   mock数据
    this.$store.dispatch('homeOptions/getBannerList')
  },
}
</script>

<style>

</style>
