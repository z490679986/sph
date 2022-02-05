<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
      <div class="container">
          <div @mouseleave="resetIndex" @mouseenter="enterShowNav">
              <h2 class="all">全部商品分类</h2>
              <!-- 过渡动画 -->
              <transition name="sort">
                  <!-- 当路由切换到Search组件时 隐藏 -->
                  <div class="sort" v-show="show">
                      <div class="all-sort-list2">
                          <div class="item" v-for="(c1,index) in categoryList.slice(0,15)" 
                          :key="c1.categoryId" 
                          :class="{cur:currentIndex === index}"
                          @click.prevent="goSearch">
                              <h3 @mouseenter="changeIndex(index)">
                                  <a href="" :data-categoryName="c1.categoryName" :data-category1id="c1.categoryId">  {{c1.categoryName}} </a>
                              </h3>
                              <div class="item-list clearfix" :style="{display:currentIndex === index ? 'block' : 'none'}">
                                  <div class="subitem" v-for="(c2,index) in c1.categoryChild" :key="c2.categoryId">
                                      <dl class="fore">
                                          <dt>
                                              <a href="" :data-categoryName="c2.categoryName" :data-category2id="c2.categoryId">{{c2.categoryName}}</a>
                                          </dt>
                                          <dd>
                                              <em v-for="(c3,index) in c2.categoryChild" :key="c3.categoryId">
                                                  <a href="" :data-categoryName="c3.categoryName" :data-category3id="c3.categoryId">{{c3.categoryName}}</a>
                                              </em>
                                          </dd>
                                      </dl>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </transition>
          </div>
          <nav class="nav">
              <a href="###">服装城</a>
              <a href="###">美妆馆</a>
              <a href="###">尚品汇超市</a>
              <a href="###">全球购</a>
              <a href="###">闪购</a>
              <a href="###">团购</a>
              <a href="###">有趣</a>
              <a href="###">秒杀</a>
          </nav>
          
      </div>
  </div>
</template>

<script>
import { mapActions,mapState } from 'vuex'
// 引入 lodash
// import _ from 'lodash'
// 按需引入 throttle节流
import throttle from 'lodash/throttle'
  export default {
    name:'TypeNav',
    data() {
        return {
            // 存储用户鼠标移到了哪个一级菜单的下标
            currentIndex:-1,
            show:true
        }
    },
    mounted() {
        // 当组件挂载到Search组件时 默认隐藏
        if(this.$route.name === 'search'){
            this.show = false
        }
    },
    computed:{
        // 将三级菜单数据隐射到组件中
        ...mapState('homeOptions',['categoryList'])
    },
    methods: {
        // 鼠标移入修改currentIndex
        // changeIndex(index){
        //     this.currentIndex = index
        //     console.log(this.currentIndex);
        // },
        // changeIndex 使用节流
        changeIndex:throttle(function(index){
            this.currentIndex = index
        },50),
        resetIndex(){
            this.currentIndex = -1
            // 在Search组件时鼠标移出 隐藏商品分类
            if(this.$route.name === 'search'){
                this.show = false
            }
        },
        goSearch(e){
            // console.log(e.target.dateset);
            let {categoryname,category1id,category2id,category3id} = e.target.dataset
            // 判断点击的元素的dataset属性是否有categoryname属性 如果有 则是a标签
            if(categoryname){
                // 如果点击的是a标签 则带着参数（name + id ）跳转到Search组件    合并params参数
                let location = {name:'search',query:{categoryName:categoryname},params:this.$route.params}
                // 判断是 一级分类 二级分类 三级分类
                if(category1id){
                    location.query.category1Id = category1id
                }else if(category2id){
                    location.query.category2Id = category2id
                }else if(category3id){
                    location.query.category3Id = category3id
                }
                this.$router.push(location)
            }
        },
        enterShowNav(){
            // 在Search组件时 鼠标移入全部商品分类 显示商品分类
            if(this.$route.name === 'search'){
                this.show = true
            }
        }
    },
    
  }
</script>

<style lang="less" scoped>
.type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;

        .all {
            width: 210px;
            height: 45px;
            background-color: #e1251b;
            line-height: 45px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
        }

        .nav {
            a {
                height: 45px;
                margin: 0 22px;
                line-height: 45px;
                font-size: 16px;
                color: #333;
            }
        }

        .sort {
            position: absolute;
            left: 0;
            top: 45px;
            width: 210px;
            height: 461px;
            position: absolute;
            background: #fafafa;
            z-index: 999;

            .all-sort-list2 {
                .item {
                    h3 {
                        line-height: 30px;
                        font-size: 14px;
                        font-weight: 400;
                        overflow: hidden;
                        padding: 0 20px;
                        margin: 0;

                        a {
                            color: #333;
                        }
                    }

                    .item-list {
                        // display: none;
                        position: absolute;
                        width: 734px;
                        min-height: 460px;
                        background: #f7f7f7;
                        left: 210px;
                        border: 1px solid #ddd;
                        top: 0;
                        z-index: 9999 !important;

                        .subitem {
                            float: left;
                            width: 650px;
                            padding: 0 4px 0 8px;

                            dl {
                                border-top: 1px solid #eee;
                                padding: 6px 0;
                                overflow: hidden;
                                zoom: 1;

                                &.fore {
                                    border-top: 0;
                                }

                                dt {
                                    float: left;
                                    width: 54px;
                                    line-height: 22px;
                                    text-align: right;
                                    padding: 3px 6px 0 0;
                                    font-weight: 700;
                                }

                                dd {
                                    float: left;
                                    width: 415px;
                                    padding: 3px 0 0;
                                    overflow: hidden;

                                    em {
                                        float: left;
                                        height: 14px;
                                        line-height: 14px;
                                        padding: 0 8px;
                                        margin-top: 5px;
                                        border-left: 1px solid #ccc;
                                    }
                                }
                            }
                        }
                    }

                    &:hover {
                        .item-list {
                            display: block;
                        }
                    }
                }
                .cur{
                    background-color: #D9D9D9 !important;
                }
            }
        }
        // 过渡动画的样式
        .sort-enter,.sort-leave-to{
            opacity: 0;
            // height: 0;
        }
        .sort-enter-to,.sort-leave{
            opacity: 1;
            // height: 461px;
        }
        .sort-enter-active,.sort-leave-active{
            transition: all .5s linear;
        }
    }
}
</style>