// 引入Vue和VueRouter
import Vue from 'vue'
import VueRouter from 'vue-router'
// 抽离路由配置routes
import routes from './routes'
import store from '@/store';
// 使用路由
Vue.use(VueRouter)



//解决路由跳转原路由或者刷新出错
const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
    return originalReplace.call(this, location).catch(err => err);
};
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

// 配置路由
const router = new VueRouter({
  // mode:'history',
  routes,
  // 滚动行为  切换路由回到顶部
  scrollBehavior (to, from, savedPosition) {
    // ...
    return {y:0}
  }
})
// 全局前置守卫
router.beforeEach(async (to, from, next) => {
  // 用户登录 才有token
  let token = store.state.userOptions.token;
  // 空对象为true 判断用户信息里的name属性
  let name = store.state.userOptions.userInfo.name
  
  if(token){
    if(to.path == 'login'){
      next('/home')
    }else{
      // 登录了 去的不是登录页
      if(name){
        // 有用户信息 直接跳转  没有 发送请求获取用户信息
        next();
      }else{
        // 登录了 但刷新后没有用户信息了
        try {
          await store.dispatch('userOptions/getUserInfo');
          next();
        } catch (error) {
          // token失效了 清除token 重新登录
          await store.dispatch('userOptions/userLoginOut')
          next('/login')
        }
      }
    }
  }else{
    // 未登录 不能去交易相关页面 而是去登录页
    let toPath = to.path;
    if(toPath.indexOf('/trade')!=-1 || toPath.indexOf('/pay')!=-1 || toPath.indexOf('/center')!=-1){
      // 把未登录时 想去没去成的组件 存储在地址栏中
      next('/login?redirect=' + toPath);
    }else{
      next();
    }
  }
})

export default router