# project_sph

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

1. eslint 校验功能关闭

在根目录下 创建 vue.config.js

代码：
modules.exports = {
  // 关闭Eslint
  lintOnSave:false
}

2.给src文件夹配置别名
在根目录下创建 jsconfig.json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@/*":["src/*"]
    }
  },
  "exclude": [
    "node_modules",
    "dist"
  ]
}

3.拆分非路由组件Header、Footer  结构  样式 静态图片

4.路由组件的搭建  Home Search Login Register
components文件夹：放置非路由组件（共用的全局组件）
views/pages文件夹：放置路由组件

4.1 配置路由
在src下新建router文件夹

4.2 路由的跳转
路由的跳转有两种形式：
声明式导航router-link 可以进行路由的跳转
编程式导航push|replace 可以进行路由的跳转 处理一些业务逻辑 如登录注册

5.

6 Footer组件的显示与隐藏  v-if | v-show
显示：Home、Search组件
隐藏：Login、Register组件

配置路由的时候 给路由配置路由元信息meta 配合 v-show 来决定哪个组件显示与隐藏

8 路由传参
8.1 路由跳转有几种方式？ 两种
声明式导航：router-link (要有to属性)
编程式导航：利用组件实例的$route.push|replace方法

8.2 路由的参数有几种写法？
params:属于路径的一部分 在配置路由的时候 需要占位
query：不属于路径的一部分 类似于ajax中的queryString  /home?a=1&b=2 不需要占位


9 路由传参相关面试题

1.路由传递参数（对象写法）path是否可以结合params参数一起使用？  不可以

2.如何指定params参数可传可不传？ 因为params参数在路径中需要占位  /search/:keyword? 在占位后面加上问号 代表可传可不传

3.params参数如果传递的是空串 如何解决？  params传递空字符串路径会出问题 用undefined解决

4.路由组件能不能传递props数据

10. 编程式路由（push|replace）跳转到当前路由（参数不变） 多次执行会抛出NavigationDuplicated的警告错误
"vue-router":"^3.5.3" 最新的vue-router引入了promise

const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
    return originalReplace.call(this, location).catch(err => err);
};
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

11 Home模块拆分  拆分为7个组件
-- 完成静态页面
-- 拆分静态组件
-- 获取服务器的数据展示
-- 动态业务

12 三级联动组件 （多处使用Home、Search、Detail 拆分为全局组件）

13 拆分Home组件其他静态页面 (CSS、静态图片、HTML) 拆分为Home的子组件 全部注册在Home组件中

14 POSTMAN测试接口

接口没有问题
http://39.98.123.211/api/product/getBaseCategoryList

所有接口前缀都有/api

15 axios 二次封装

为什么需要进行二次封装axios?
请求拦截器：可以在发请求之前处理一些业务
响应拦截器：当服务器数据返回后 可以处理一些业务
安装axios  cnpm install --save axios

与请求相关的都放入network文件夹中 request.js

16 接口统一管理
在network文件夹中新建index.js文件

什么是跨域？ 协议、域名、端口号之间的不同请求 称之为跨域
http://localhost:8080/home  --- 前端本地服务器
http://39.98.123.211        --- 后端服务器

解决： JSONP、CROS、配置代理服务器

17 nprogress 进度条的使用

在发请求时 显示进度条
cnpm stall --save nprogress

// start:进度条开始  done:进度条结束  在拦截器中使用

18 Vuex状态管理库

Vuex是官方提供的一个插件 状态管理库  集中式管理项目中组件共用的数据

actions
mutations
state
getters


19 完成TypeNav三级联动菜单数据展示业务

20 一级分类菜单动态添加背景颜色

方案一：采用CSS
方案二：通过js

currentIndex:-1
@mouseenter this.currentIndex = index  
@mouseleave  this.currentIndex = -1  将移出事件委托给父级
:class={cur:currentIndex === index}

21 通过js控制二三级菜单的显示与隐藏

v-show = "currentIndex === index"

:style = {display:currentIndex === index ? 'block' : 'none'}

22 卡顿、防抖、节流

正常：事件触发非常频繁 每一次触发 回调函数都要去执行  浏览器反应不过来

节流：在规定的间隔时间范围内不会重复触发回调 只有大于这个时间间隔才会触发回调 把频繁触发变为少量触发

防抖：连续频繁的触发 改为 执行一次

三级联动节流的操作

import throttle from 'lodash/throttle'

methodName:throttle(function(){},2000)


23 三级联动菜单组件的路由跳转与传递参数

点击一级分类、二级分类、三级分类跳转到Search组件  传递选中的产品（名字+ID）参数

router-link: 是一个组件 当服务器的数据返回之后 循环出很多的router-link组件实例  性能过低

解决方案: 编程式导航 + 事件委派

1.将所有分类的a链接的点击事件委托给父级  
2.使用event事件对象
3.给所有需要跳转的a链接 添加自定义属性 :data-categoryName  :date-categoryId
4.通过事件对象 event.target.dataset 可以拿到触发元素的自定义属性 /  event.target.nodeName 拿到触发元素的标签名
5.判断有没有categoryname属性 有则是a标签 封装路由对象  准备跳转到Search组件 {name:'search',query:{name+id}}  
  然后判断id是几级分类  解构赋值 let {categoryname,category1id} = event.target.dataset

24 Search组件中的TypeNav组件复用

  组件只要使用 就会调用mounted函数
  1.在TypeNav组件中定义 show:true    v-show = 'show'
  2.在Search组件的mounted函数中 判断是否当前是否为Search组件  是则隐藏TypeNav组件
  if(this.$route.name === 'search'){
    this.show = false 
  }
  3.在Search组件中 鼠标移入显示 移出隐藏
  判断是否在Search组件中  this.$route.name === 'search'

25  模拟数据 开发 ListContainer 和 Floor 组件

  cnpm i --save mockjs
  
  1.在src下创建mock文件夹
  2.在mock文件夹下创建json文件 准备模拟数据
  3.将项目需要用的图片放到public文件夹
  4.开始mock

26  轮播图 swiper

  cnpm i --save swiper
  import 'swiper/css/swiper.css'

  结合 watch + $nextTick  监听数据的改变 并结构渲染后 再创建swiper实例

27 Floor组件数据请求 与 动态展示
因为Floor组件要复用两次  在共同的父组件Home下 发送请求  再通过数据遍历出两个  <Floor v-for="item in floorList" :floorList="item"/>

再通过props将数据传递给两个Floor组件  props:['floorList']   props:{floorList:{type:Array,default:[]}}

在Floor组件中使用Swiper实例不需要$nextTick   因其数据不是在当前组件请求的 没有异步  可以直接使用

28 共用轮播图组件  将轮播图组件注册为全局组件

保证结构 样式  Js 一致  并抽离出来   在需要的地方使用 并传递数据  <Carousel :list="demoList">

29 Search模块开发  静态页面   拆分  发请求  vuex  组件获取数据 动态展示

30 面包屑开发

31 排序操作
参数：
1:asc 1:desc
2:asc 2:desc

32 详情页开发
路由的滚动行为

33 详情页数据请求#   s p h  
 