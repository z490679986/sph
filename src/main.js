import Vue from 'vue'
import App from './App.vue'
// 按需引入elementUI组件
// import 'element-ui/lib/theme-chalk/index.css';
import { Button, MessageBox } from 'element-ui';
Vue.component(Button.name,Button)
Vue.component(MessageBox.name, MessageBox);
// 将element组件的方法挂载在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

// 引入三级联动组件  全局组件
import TypeNav from '@/components/TypeNav'
Vue.component(TypeNav.name,TypeNav)

// 注册轮播图组件
import Carousel from '@/components/Carousel'
Vue.component(Carousel.name,Carousel)

// 注册分页器组件
import Pagination from '@/components/Pagination/Pagination'
Vue.component(Pagination.name,Pagination)

// 引入路由
import router from './router'

// 引入Vuex仓库
import store from './store'

// 引入mock.js
import '@/mock/mock'

// 引入swiper样式
import 'swiper/css/swiper.css'

Vue.config.productionTip = false

// 统一引入network文件夹里面全部的接口函数
import * as network from '@/network'

// 引入vue-lazyload 图片懒加载
import VueLazyload from 'vue-lazyload'
// 引入默认图片
import pic from '@/assets/images/simba.jpg'
Vue.use(VueLazyload,{
  // 懒加载默认的图片
  loading:pic
});

// 导入表单验证插件
import '@/plugins/myPlugins'

new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate() {
    // 全局事件总线
    Vue.prototype.$bus = this,
    // 统一引入接口函数
    Vue.prototype.$http = network
  },
}).$mount('#app')
