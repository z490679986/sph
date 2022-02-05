import {reqGoodsInfo,reqAddShopCart} from '@/network'
// 封装游客身份模块 uuid  生成一个随机字符串（不能改变）
import {getUUID} from '@/utils/uuid_token'

export default {
  namespaced:true,
  actions:{
    // 获取产品信息
    async getGoodsInfo({commit},skuId){
      let result = await reqGoodsInfo(skuId)
      // console.log(result);
      if(result.data.code === 200){
        commit('GETGOODSINFO',result.data.data)
      }
    },
    // 加入购物车
    async addShopCart({commit},{skuId,skuNum}){
      let result = await reqAddShopCart(skuId,skuNum)
      // console.log(result);

      // 判断请求有没有成功 成功则返回给组件 进行路由跳转
      if(result.data.code === 200){
        return 'ok'
      }else{
        // 请求失败
        return Promise.reject(new Error('faile'))
      }
    } 
  },
  mutations:{
    GETGOODSINFO(state,value){
      state.goodsInfo = value
    }
  },
  state:{
    goodsInfo:{},
    // 游客临时身份
    uuid_token:getUUID()
  },
  getters:{
    // 简化goodsInfo数据
    categoryView(state){
      // goodsInfo初始是空对象
      return state.goodsInfo.categoryView || {}
    },
    skuInfo(state){
      // goodsInfo初始是空对象
      return state.goodsInfo.skuInfo || {}
    },
    spuSaleAttrList(state){
      // goodsInfo初始是空对象
      return state.goodsInfo.spuSaleAttrList || []
    }
  }
}