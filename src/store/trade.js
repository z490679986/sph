import {reqAddressInfo,reqTradeList} from '@/network'
export default {
  namespaced:true,
  actions:{
    // 获取用户地址信息
    async getAddressInfo({commit}){
      let result = await reqAddressInfo();
      if(result.data.code == 200){
        commit('GETADDRESSINFO',result.data.data)
      }
    },
    // 获取交易页信息
    async getTradeList({commit}){
      let result = await reqTradeList();
      if(result.data.code == 200){
        commit('GETTRADELIST',result.data.data)
      }
    }
  },
  mutations:{
    GETADDRESSINFO(state,address){
      state.address = address;
    },
    GETTRADELIST(state,tradeList){
      state.tradeList = tradeList;
    }
  },
  state:{
    address:[],
    tradeList:{}
  },
  getters:{}
}