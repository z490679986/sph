import {reqSearchList} from '@/network'
export default {
  namespaced:true,
  actions:{
    // 获取Search组件数据
    async getSearchList({commit},params={}){
      let result = await reqSearchList(params)
      if(result.data.code === 200){
        commit('GETSEARCHLIST',result.data.data)
      }
    }
  },
  state:{
    searchList:{}
  },
  mutations:{
    GETSEARCHLIST(state,value){
      state.searchList = value
    }
  },
  // 简化searchList对象
  getters:{
    goodsList(state){
      // 请求失败  没网|网络差  则返回空数组
      return state.searchList.goodsList || []
    },
    attrsList(state){
      return state.searchList.attrsList || []
    },
    trademarkList(state){
      return state.searchList.trademarkList || []
    }
  }
}