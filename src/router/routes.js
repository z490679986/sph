// 引入路由组件
// import Home from '@/views/Home'
// import Search from '@/views/Search'
import Login from '@/views/Login'
import Register from '@/views/Register'

export default [
  // 重定向 访问/默认显示home
  {
    path:'*',
    redirect:'/home'
  },
  {
    path:'/home',
    name:'home',
    component:() => import('@/views/Home'),
    meta:{show:true}
  },
  {
    path:'/search/:keyword?',
    name:'search',
    component:() => import('@/views/Search'),
    meta:{show:true},
    props($route){
      // console.log($route);
      return {keyword:$route.params.keyword}
    },
    
  },
  {
    path:'/login',
    name:'login',
    component:Login,
    meta:{show:false}
  },
  {
    path:'/register',
    name:'register',
    component:Register,
    meta:{show:false}
  },
  {
    path:'/detail/:skuId?',
    name:'detail',
    component:() => import('@/views/Detail'),
    meta:{show:true},
    props($route){
      return {skuId:$route.params.skuId}
    }
  },
  {
    path:'/addcartsuccess',
    name:'addcartsuccess',
    component:() => import('@/views/AddCartSuccess')
  },
  {
    path:'/shopcart',
    name:'shopcart',
    component:() => import('@/views/ShopCart')
  },
  {
    path:'/trade',
    name:'trade',
    component:() => import('@/views/Trade'),
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      // 从购物车来 放行
      if(from.path == '/shopcart'){
        next();
      }else{
        // 从其他组件来 停留在当前组件
        next(false);
      }
    }
  },
  {
    path:'/pay',
    name:'pay',
    component:() => import('@/views/Pay'),
    beforeEnter: (to, from, next) => {
      if(from.name === 'trade'){
        next();
      }else{
        next(false);
      }
    }
  },
  {
    path:'/paysuccess',
    name:'paysuccess',
    component:() => import('@/views/PaySuccess')
  },
  {
    path:'/center',
    name:'center',
    component:() => import('@/views/Center'),
    children:[
      // 订单中心二级路由
      {
        // 重定义 默认显示myorder
        path:'/center',
        redirect:'/center/myorder'
      },
      {
        path:'myorder',
        name:'myorder',
        component:() => import('@/views/Center/myOrder')
      },
      {
        path:'grouporder',
        name:'grouporder',
        component:() => import('@/views/Center/groupOrder')
      }
    ]
  }
]