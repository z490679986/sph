// axios二次封装
import axios from 'axios'
// 引入进度条
import nprogress from 'nprogress'
// 引入进度条的样式
import 'nprogress/nprogress.css'
// 引入store
import store from '@/store'
// 1.利用axios对象的create方法 创建一个axios实例

const requests = axios.create({
  // 基础路径 发请求时 自动拼接/api
  baseURL: '/api',
  timeout: 2000,
})
// 请求拦截器  在发请求之前 可以监测到 处理一些业务
requests.interceptors.request.use(config => {
// Do something before request is sent

if(store.state.detailOptions.uuid_token){
  // 给请求头添加一个字段(userTempId) 给后台商量好
  config.headers.userTempId = store.state.detailOptions.uuid_token
}
// 携带token带给服务器
if(store.state.userOptions.token){
  config.headers.token = store.state.userOptions.token
}
// 显示进度条
nprogress.start()
return config;
},error => {
// Do something with request error
return Promise.reject(error);
});

// 响应拦截器
requests.interceptors.response.use(response => {
// Do something before response is sent
// 进度条结束
nprogress.done()
return response;
},error => {
// Do something with response error
return Promise.reject(error);
});


// 对外暴露
export default requests