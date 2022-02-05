<template>
  <div>
    <!-- 三级联动组件已经注册为全局组件 不需要再引入 -->
    <TypeNav/>
    <ListContainer/>
    <Recommend/>
    <Rank/>
    <Like/>
    <!-- Floor组件需要复用两次 使用v-for也可以遍历组件 -->
    <Floor v-for="(item,index) in floorList" :key="index" :floorList='item'/>
    <!-- <Floor/> -->
    <Brand/>
  </div>
</template>

<script>
// 引入轮播图及列表组件
// import ListContainer from '../Home/ListContainer'
import ListContainer from '@/views/Home/ListContainer'
import Recommend from '@/views/Home/Recommend'
import Rank from '@/views/Home/Rank'
import Like from '@/views/Home/Like'
import Floor from '@/views/Home/Floor'
import Brand from '@/views/Home/Brand'

import {mapState,mapMutations,mapActions,mapGetters} from 'vuex'
  export default {
    name:'Home',
    components:{
      ListContainer,
      Recommend,
      Rank,
      Like,
      Floor,
      Brand
    },
    mounted() {
      // 获取Floor组件数据
      this.$store.dispatch('homeOptions/getFloorList')
      // 获取用户信息 登录后跳转到首页展示
      // this.$store.dispatch('userOptions/getUserInfo')
    },
    computed:{
        ...mapState('homeOptions',['floorList'])
    }
  }
</script>

<style lang="less" scoped>

</style>