<template>
  <!-- 头部 -->
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p v-if="!userInfo.name">
            <span>请</span>
            <router-link :to="{ name: 'login' }">登录</router-link>
            <router-link :to="{ name: 'register' }" class="register"
              >免费注册</router-link
            >
          </p>
          <!-- 登录了展示 用户信息 -->
          <p v-else>
            <span> {{userInfo.name}} </span>
            <a class="register" @click.prevent="loginOut">退出登录</a>
          </p>
        </div>
        <div class="typeList">
          <router-link :to="{name:'myorder'}">我的订单</router-link>
          <router-link :to="{name:'shopcart'}">我的购物车</router-link>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo" :to="{ name: 'home' }">
          <img src="./images/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyWord"
            @keyup.enter="goSearch"
          />
          <!-- 表单只有一个input框时 回车会自动提交 -->
          <input type="text" style="display:none">
          <!-- 通过编程式导航 拿到搜索框的参数 进到Search组件 -->
          <button
            class="sui-btn btn-xlarge btn-danger"
            type="button"
            @click="goSearch"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: "Header",
  data() {
      return {
          keyWord:''
      }
  },
  methods: {
    goSearch() {
        // 合并query参数
        if(this.$route.query){
          // 路由传参 传递输入框的keyWord到Search组件
          // let location = {name:'search',params:{keyword:this.keyWord || undefined}}
          // location.query = this.$route.query
          // this.$router.push(location)
          this.$router.push({
              name:'search',
              params:{
                // params传递空字符串 路径会出问题  用undefined解决
                  keyword:this.keyWord||undefined
              },
              query:this.$route.query
          })
        }
    },
    clearKeyword(){
      this.keyWord = ''
    },
    // 退出登录
    async loginOut(){
      try {
        // 发请求 清除个人信息 token
        await this.$store.dispatch('userOptions/userLoginOut')
        // 如果退出成功 回到首页
        this.$router.push({name:'home'})
      } catch (error) {
        alert(error.message)
      }
    }
  },
  mounted() {
    // 通过全局事件总线 清除关键字
    this.$bus.$on('clearKeyword',() => {
      this.keyWord = ''
    })
    // this.$bus.$on('clearKeyword',this.clearKeyword)
    // this.$store.dispatch('userOptions/getUserInfo')
  },
  computed:{
    // 获取userOptions仓库的用户信息
    ...mapState('userOptions',['userInfo'])
  }
};
</script>

<style lang="less" scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>