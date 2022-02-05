import requests from './request'
import mockRequest from './mockRequest'

// 三级联动接口
// /api/product/getBaseCategoryList   get请求 无参数

export const reqCategoryList = () => {
  // 发送请求  返回的结果是Promise对象
  return requests({url:'/product/getBaseCategoryList',method:'get'})
}

// 获取首页轮播图的mock数据
export const reqBannerList = () => mockRequest({url:'/banner'})

// 获取Floor组件数据

export const reqFloorList = () => mockRequest({url:'/floor',method:'get'})

// 获取Search组件数据
export const reqSearchList = (params) => requests({url:'/list',method:'post',data:params})

// 获取产品详情数据
export const reqGoodsInfo = (skuId) => requests({url:`/item/${skuId}`,method:'get'})

// 将产品添加到购物车
export const reqAddShopCart = (skuId,skuNum) => requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post'})

// 获取购物车列表数据
export const reqgetCartList = () => requests({url:'/cart/cartList',method:'get'})

// 删除购物车产品接口
export const reqDeleteCartById = (skuId) => requests({url:`/cart/deleteCart/${skuId}`,method:'delete'}) 

// 修改产品状态接口
export const reqChangeCheckedById = (skuId,isChecked) => requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})

// 获取验证码接口
export const reqGetCode = (phone) => requests({url:`/user/passport/sendCode/${phone}`,method:'get'})

// 完成注册接口
export const reqUserRegister = (data) => requests({url:`/user/passport/register`,data,method:'post'})

// 登录接口
export const reqUserLogin = (data) => requests({url:'/user/passport/login',data,method:'post'})

// 通过token获取用户信息
export const reqGetUserInfo = () => requests({url:'/user/passport/auth/getUserInfo',method:'get'})

// 退出登录接口
export const reqLoginOut = () => requests({url:`/user/passport/logout`,method:'get'})

// 获取用户地址信息接口
export const reqAddressInfo = () => requests({url:'user/userAddress/auth/findUserAddressList',method:'get'})

// 获取交易页接口
export const reqTradeList = () => requests({url:'/order/auth/trade',method:'get'})

// 提交订单接口
export const reqSubmitOrder = (tradeNo,data) => requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'})

// 获取订单支付信息接口
export const reqPayInfo = (orderId) => requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'})

// 获取支付订单状态
export const reqPayState = (orderId) => requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})

// 获取我的订单接口
export const reqMyOrderList = (page,limit) => requests({url:`/order/auth/${page}/${limit}`,method:'get'})