import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// 导入 home组件仓库
import homeOptions from './home'

// 导入 search组件仓库
import searchOptions from './search'

// 导入 Detail组件仓库
import detailOptions from './detail'

// 导入购物车组件仓库
import shopcartOptions from './shopcart'

// 导入登录注册仓库
import userOptions from './user'

// 导入交易页仓库
import tradeOptions from './trade'

// 对外暴露Store类的一个实例
export default new Vuex.Store({
  modules:{
    homeOptions,
    searchOptions,
    detailOptions,
    shopcartOptions,
    userOptions,
    tradeOptions
  }
})