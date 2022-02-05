// 表单验证插件
import Vue from 'vue'
import Veevalidate from 'vee-validate'

// 中文提示信息
import zh_CN from 'vee-validate/dist/locale/zh_CN'
Vue.use(Veevalidate);

// 表单验证
Veevalidate.Validator.localize('zh_CN',{
  messages:{
    ...zh_CN.messages,
    is:(field) => `${field}必须与密码相同`  // 修改内置规则的message 
  },
  attributes:{
    phone:'手机号',
    code:'验证码',
    password:'密码',
    password1:'确认密码',
    agree:'协议'
  }
});

// 自定义校验规则
Veevalidate.Validator.extend("tongyi",{
  validate:(value) => {
    return value;
  },
  getMessage:(field) => field + "必须同意"
})