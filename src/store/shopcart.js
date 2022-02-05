import {reqgetCartList,reqDeleteCartById,reqChangeCheckedById} from '@/network'
import { Promise } from 'core-js'
export default{
  namespaced:true,
  actions:{
    // 获取购物车列表数据
    async getCartList({commit}){
      let result = await reqgetCartList()
      if(result.data.code === 200){
        commit('GETCARTLIST',result.data.data)
      }
    },
    // 删除购物车产品
    async deleteCartListById({commit},skuId){
      let result = await reqDeleteCartById(skuId)
      if(result.data.code === 200){
        return 'ok'
      }else{
        return Promise.reject(new Error('faile'))
      }
    },
    // 修改产品状态
    async changeCheckedById({commit},{skuId,isChecked}){
      let result = await reqChangeCheckedById(skuId,isChecked)
      if(result.data.code === 200){
        return 'ok'
      }else{
        return Promise.reject(new Error('faile'))
      }
    },
    // 删除全部选中的产品
    deleteAllCheckCart({getters,dispatch}){
      // console.log(context.getters.cartList);
      let PromiseAll = []
      getters.cartList.forEach(item => {
        let promise = item.isChecked == '1' ? dispatch('deleteCartListById',item.skuId) : ''
        // 将每一次返回的Promise添加到数组当中
        PromiseAll.push(promise)
      });
      // Promise.all([p1,p2,p3]) 数组全成功 返回成功  有一个失败 返回失败
      return Promise.all(PromiseAll)
    },
    // 点击全选按钮 实现全选
    checkAllIsChecked({dispatch,state},isChecked){
      let PromiseAll = []
      state.cartList.cartInfoList.forEach(item => {
        let promise = dispatch('changeCheckedById',{skuId:item.skuId,isChecked})
        PromiseAll.push(promise)
      })
      return Promise.all(PromiseAll)
    }
  },
  mutations:{
    GETCARTLIST(state,value){
      state.cartList = value[0] || []
      // console.log(value);
    }
  },
  state:{
    cartList:[]
  },
  getters:{
    cartList(state){
      return state.cartList.cartInfoList || []
    }
  }
}