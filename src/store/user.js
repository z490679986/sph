import {reqGetCode,reqUserRegister,reqUserLogin,reqGetUserInfo,reqLoginOut} from '@/network'
export default {
  namespaced:true,
  actions:{
    // 获取验证码
    async getCode({commit},phone){
      let result = await reqGetCode(phone)
      // console.log(result);
      if(result.data.code === 200){
        commit('GETCODE',result.data.data)
        return 'ok'
      }else{
        return Promise.reject(new Error('faile'))
      }
    },
    // 完成注册
    async userRegister({commit},user){
      let result = await reqUserRegister(user)
      if(result.data.code === 200){
        return 'ok'
      }else{
        return Promise.reject(new Error('faile'))
      }
    },
    // 登录【token】
    async userLogin({commit},data){
      let result = await reqUserLogin(data)
      // console.log(result);
      if(result.data.code === 200){
        // 获取到token
        commit('USERLOGIN',result.data.data.token)
        // 持久化存储token
        localStorage.setItem('TOKEN',result.data.data.token)
        return 'ok'
      }else{
        Promise.reject(new Error('faile'))
      }
    },
    // 通过token获取用户信息
    async getUserInfo({commit}){
      let result = await reqGetUserInfo();
      // console.log(result);
      if(result.data.code == 200){
        commit('GETUSERINFO',result.data.data)
        return 'ok'
      }else{
        return Promise.reject(new Error('falie'))
      }
    },
    // 退出登录
    async userLoginOut({commit}){
      let result = await reqLoginOut()
      if(result.data.code === 200){
        // 服务器清除后 清除仓库数据
        commit('USERLOGINOUT');
        return 'ok';
      }else{
        return Promise.reject(new Error('faile'))
      }
    }
  },
  mutations:{
    // 获取验证码
    GETCODE(state,code){
      state.code = code
    },
    // 存储token
    USERLOGIN(state,token){
      state.token = token
    },
    // 获取用户信息
    GETUSERINFO(state,userInfo){
      state.userInfo = userInfo
    },
    // 退出登录清除仓库用户信息
    USERLOGINOUT(state){
      state.token = '';
      state.userInfo = {};
      localStorage.removeItem('TOKEN')
    }
  },
  state:{
    // 验证码
    code:'',
    token:localStorage.getItem('TOKEN'),
    // 用户信息
    userInfo:{}
  },
  getters:{}
}