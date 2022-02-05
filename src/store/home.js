// 引入菜单接口函数
import { reqCategoryList,reqBannerList,reqFloorList } from '@/network'
export default {
  namespaced: true,
  state: {
    // 接收三级联动菜单数据
    categoryList: [],
    // 轮播图数据
    bannerList:[],
    // Floor数据
    floorList:[]
  },
  actions: {
    // 请求三级联动菜单数据
    async categoryList({ commit }) {
      let result = await reqCategoryList()
      // console.log(result);

      if (result.data.code === 200) {
        commit('CATEGORYLIST', result.data.data)
      }
    },
    // 请求轮播图mock数据
    async getBannerList({commit}){
      let result = await reqBannerList()
      if(result.data.code === 200){
        commit('BANNERLIST',result.data.data)
      }
    },
    // 请求Floor组件数据
    async getFloorList({commit}){
      let result = await reqFloorList()
      // console.log(result);
      if(result.data.code === 200){
        commit('FLOORLIST',result.data.data)
      }
    }
  },
  mutations: {
    CATEGORYLIST(state, value) {
      state.categoryList = value
    },
    BANNERLIST(state,value){
      state.bannerList = value
    },
    FLOORLIST(state,value){
      state.floorList = value
    }
  },
  getters: {}
}