<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类的面包屑 -->
            <li class="with-x" v-show="searchParams.categoryName">{{searchParams.categoryName}}<i @click="removeCategoryName">×</i></li>
            <!-- 分类的面包屑 -->
            <li class="with-x" v-show="searchParams.keyword">{{searchParams.keyword}}<i @click="removeKeyword">×</i></li>
            <!-- 品牌信息的面包屑 -->
            <li class="with-x" v-show="searchParams.tradeMark">{{searchParams.tradeMark.split(":")[1]}}<i @click="removeTradeMark">×</i></li>
            <!-- 售卖属性的面包屑 -->
            <li class="with-x" v-show="searchParams.props" v-for="(attrValue,index) in searchParams.props" :key="index">
                {{attrValue.split(":")[1]}}
                 <i @click="removeAttr(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @tradeMarkInfo="tradeMarkInfo" @attrInfo="attrInfo" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{active:searchParams.order.indexOf('1') != -1}" @click.prevent="changeOrder('1')">
                  <a href="#">
                    综合 
                    <span v-show="searchParams.order.indexOf('1') != -1" class="iconfont" 
                    :class="{'icon-up':isAsc,'icon-down':isDesc}"></span> 
                  </a>
                </li>
                <li :class="{active:searchParams.order.indexOf('2') != -1}" @click.prevent="changeOrder('2')">
                  <a href="#">
                    价格 
                    <span v-show="searchParams.order.indexOf('2') != -1" class="iconfont" 
                    :class="{'icon-up':isAsc,'icon-down':isDesc}"></span> 
                  </a>
                </li>
                <!-- <li>
                  <a href="#">销量</a>
                </li>
                <li>
                  <a href="#">新品</a>
                </li>
                <li>
                  <a href="#">评价</a>
                </li> -->
                <!-- <li>
                  <a href="#">价格⬆</a>
                </li> -->
                
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="item in goodsList" :key="item.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- 搜索页图片 点击跳转到详情页 -->
                    <router-link :to="{name:'detail',params:{skuId:item.id}}"><img v-lazy="item.defaultImg" /></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{item.price}}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" :title="item.title"> {{item.title}} </a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <Pagination :pageNo="searchParams.pageNo" :pageSize="searchParams.pageSize" :total="searchList.total" :continues="5" @getPageNo="getPageNo" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState,mapActions, mapGetters} from 'vuex'
  import Pagination from '../../components/Pagination/Pagination.vue'
  import SearchSelector from './SearchSelector/SearchSelector'
  export default {
    name: 'Search',
    data() {
      return {
        // 带给服务器的参数
        searchParams:{
          // 一级Id
          category1Id: "",
          // 二级id
          category2Id: "",
          // 三级id
          category3Id: "",
          // 分类名字
          categoryName: "",
          // 关键字
          keyword: "",
          // 排序  初始值 综合:降序
          order: "1:desc",
          // 当前第几页
          pageNo: 1,
          // 展示数据的个数
          pageSize: 10,
          // 商品属性
          props: [],
          // 商品品牌
          tradeMark: ""
        }

      }
    },
    components: {
      SearchSelector,
        Pagination
    },
    beforeMount() {
      // console.log(this.$route.query);
      // 复杂写法
      // this.searchParams.category1Id = this.$route.query.category1Id
      // this.searchParams.category2Id = this.$route.query.category2Id
      // this.searchParams.category3Id = this.$route.query.category3Id
      // this.searchParams.categoryName = this.$route.query.categoryName
      // this.searchParams.keyword = this.$route.query.keyword
      // 将data中的searchParams对象 与路由的 query params对象进行合并
      Object.assign(this.searchParams,this.$route.query,this.$route.params)
      // console.log('发请求之前',this.searchParams);
    },
    mounted() {
      this.getSearchData()
    },
    computed:{
      ...mapState('searchOptions',['searchList']),
      // 应该在子组件SearchSelector中获取三个列表数据展示
      ...mapGetters('searchOptions',['goodsList']),
      isAsc(){
        return this.searchParams.order.indexOf('asc') != -1
      },
      isDesc(){
        return this.searchParams.order.indexOf('desc') != -1
      }
    },
    methods: {
      // 向服务器发请求 获取Search模块数据 （根据参数不同展示不同的数据）
      getSearchData(){
        this.$store.dispatch('searchOptions/getSearchList',this.searchParams)
        // this.searchParams.keyword = ''
      },
      // 删除分类名字
      removeCategoryName(){
        // 空字符串的参数还是会传给服务器 而undefined不会
        this.searchParams.categoryName = undefined
        this.searchParams.category1Id = undefined
        this.searchParams.category2Id = undefined
        this.searchParams.category3Id = undefined
        // 删除面包屑分类后 再发送一次请求
        // this.getSearchData()
        // 地址栏也需要改  进行路由跳转 自己跳自己 清空地址栏的query参数 不动params参数
        if(this.$route.params){
          this.$router.push({name:'search',params:this.$route.params})
        }
      },
      // 删除关键字
      removeKeyword(){
        // 将给服务器的参数searchParams的keyword置空
        this.searchParams.keyword = undefined
        // 再次发请求
        // this.getSearchData()
        // 通知Header组件清空关键字
        this.$bus.$emit('clearKeyword')
        // 进行路由的跳转  清空params参数
        if(this.$route.query){
          this.$router.push({name:'search',query:this.$route.query})
        }else{
          this.$router.push({name:'search'})
        }
      },
      // 删除品牌信息
      removeTradeMark(){
        // 将品牌信息置空
        this.searchParams.tradeMark = ''
        // 再次发请求
        this.getSearchData()
      },
      // 点击品牌信息从子组件触发的回调
      tradeMarkInfo(tradeMark){
        // 接收品牌信息组件传过来的品牌名称 赋值给searchParams   接口格式："trademark": "4:小米"
        this.searchParams.tradeMark = `${tradeMark.tmId}:${tradeMark.tmName}`
        this.getSearchData()
      },
      // 收集售卖属性
      attrInfo(attr,value){
        // 参数格式：["attr.attrId:value:attr.attrName"]
        let props = `${attr.attrId}:${value}:${attr.attrName}`
        // 数组去重 没有这个元素再添加 发送请求
        if(this.searchParams.props.indexOf(props) == -1){
          this.searchParams.props.push(props)
          this.getSearchData()
        }
      },
      // 删除售卖属性
      removeAttr(index){
        this.searchParams.props.splice(index,1)
        this.getSearchData()
      },
      // 点击升序和降序
      changeOrder(flag){
        // 用户点击传递flag  区别是综合还是价格

        // 获取起始是综合还是价格  1还是2
        let originFlag = this.searchParams.order.split(':')[0]
        // 获取起始的排序
        let originSort = this.searchParams.order.split(':')[1]

        let newOrder = ''
        // 点击的是综合|高亮
        if(flag == originFlag){
          newOrder = `${originFlag}:${originSort == 'desc' ? 'asc' : 'desc' }`
        }else{
          // 点击的是价格|不高亮
          newOrder = `${flag}:${'desc'}`
        }
        // 将新的order赋值 重新发请求
        this.searchParams.order = newOrder
        this.getSearchData()
      },
      // 获取分页器的当前页数
      getPageNo(pageNo){
        // 整理参数 发送请求
        this.searchParams.pageNo = pageNo
        this.getSearchData()
      }
    },
    watch:{
      // 监听路由信息的变化 在点击搜索后 参数变化 合并新的参数 继续发请求
      $route(newValue,oldValue){

        // 每次路由信息变化后  将当前分类ID的参数清空
        this.searchParams.category1Id = undefined
        this.searchParams.category2Id = undefined
        this.searchParams.category3Id = undefined
        // 整理新的参数带给服务器
        Object.assign(this.searchParams,this.$route.query,this.$route.params)
        // 发送请求
        this.getSearchData()
        // 切换分类后 将关键字也清空
        // this.$route.params.keyword = undefined
      }
    }
  }
</script>

<style lang="less" scoped>
  .main {
    margin: 10px 0;

    .py-container {
      width: 1200px;
      margin: 0 auto;

      .bread {
        margin-bottom: 5px;
        overflow: hidden;

        .sui-breadcrumb {
          padding: 3px 15px;
          margin: 0;
          font-weight: 400;
          border-radius: 3px;
          float: left;

          li {
            display: inline-block;
            line-height: 18px;

            a {
              color: #666;
              text-decoration: none;

              &:hover {
                color: #4cb9fc;
              }
            }
          }
        }

        .sui-tag {
          margin-top: -5px;
          list-style: none;
          font-size: 0;
          line-height: 0;
          padding: 5px 0 0;
          margin-bottom: 18px;
          float: left;

          .with-x {
            font-size: 12px;
            margin: 0 5px 5px 0;
            display: inline-block;
            overflow: hidden;
            color: #000;
            background: #f7f7f7;
            padding: 0 7px;
            height: 20px;
            line-height: 20px;
            border: 1px solid #dedede;
            white-space: nowrap;
            transition: color 400ms;
            cursor: pointer;

            i {
              margin-left: 10px;
              cursor: pointer;
              font: 400 14px tahoma;
              display: inline-block;
              height: 100%;
              vertical-align: middle;
            }

            &:hover {
              color: #28a3ef;
            }
          }
        }
      }

      .details {
        margin-bottom: 5px;

        .sui-navbar {
          overflow: visible;
          margin-bottom: 0;

          .filter {
            min-height: 40px;
            padding-right: 20px;
            background: #fbfbfb;
            border: 1px solid #e2e2e2;
            padding-left: 0;
            border-radius: 0;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

            .sui-nav {
              position: relative;
              left: 0;
              display: block;
              float: left;
              margin: 0 10px 0 0;

              li {
                float: left;
                line-height: 18px;

                a {
                  display: block;
                  cursor: pointer;
                  padding: 11px 15px;
                  color: #777;
                  text-decoration: none;
                }

                &.active {
                  a {
                    background: #e1251b;
                    color: #fff;
                  }
                }
              }
            }
          }
        }

        .goods-list {
          margin: 20px 0;

          ul {
            display: flex;
            flex-wrap: wrap;

            li {
              height: 100%;
              width: 20%;
              margin-top: 10px;
              line-height: 28px;

              .list-wrap {
                .p-img {
                  padding-left: 15px;
                  width: 215px;
                  height: 255px;

                  a {
                    color: #666;

                    img {
                      max-width: 100%;
                      height: auto;
                      vertical-align: middle;
                    }
                  }
                }

                .price {
                  padding-left: 15px;
                  font-size: 18px;
                  color: #c81623;

                  strong {
                    font-weight: 700;

                    i {
                      margin-left: -5px;
                    }
                    em{
                      margin-right: 10px;
                    }
                  }
                }

                .attr {
                  padding-left: 15px;
                  width: 85%;
                  overflow: hidden;
                  margin-bottom: 8px;
                  min-height: 38px;
                  cursor: pointer;
                  line-height: 1.8;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;

                  a {
                    color: #333;
                    text-decoration: none;
                  }
                }

                .commit {
                  padding-left: 15px;
                  height: 22px;
                  font-size: 13px;
                  color: #a7a7a7;

                  span {
                    font-weight: 700;
                    color: #646fb0;
                  }
                }

                .operate {
                  padding: 12px 15px;

                  .sui-btn {
                    display: inline-block;
                    padding: 2px 14px;
                    box-sizing: border-box;
                    margin-bottom: 0;
                    font-size: 12px;
                    line-height: 18px;
                    text-align: center;
                    vertical-align: middle;
                    cursor: pointer;
                    border-radius: 0;
                    background-color: transparent;
                    margin-right: 15px;
                  }

                  .btn-bordered {
                    min-width: 85px;
                    background-color: transparent;
                    border: 1px solid #8c8c8c;
                    color: #8c8c8c;

                    &:hover {
                      border: 1px solid #666;
                      color: #fff !important;
                      background-color: #666;
                      text-decoration: none;
                    }
                  }

                  .btn-danger {
                    border: 1px solid #e1251b;
                    color: #e1251b;

                    &:hover {
                      border: 1px solid #e1251b;
                      background-color: #e1251b;
                      color: white !important;
                      text-decoration: none;
                    }
                  }
                }
              }
            }
          }
        }

        
      }
    }
  }
</style>