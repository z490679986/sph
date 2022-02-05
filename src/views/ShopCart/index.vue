<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="item in cartList" :key="item.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="item.isChecked === 1" @change="changeChecked(item,$event)">
          </li>
          <li class="cart-list-con2">
            <img :src="item.imgUrl">
            <div class="item-msg">{{item.skuName}}</div>
          </li>
          
          <li class="cart-list-con4">
            <span class="price">{{item.skuPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="handlerNum('sub',-1,item)">-</a>
            <input autocomplete="off" type="text" :value="item.skuNum" minnum="1" class="itxt" @change="handlerNum('change',$event.target.value*1,item)">
            <a href="javascript:void(0)" class="plus" @click="handlerNum('add',1,item)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{item.skuNum * item.skuPrice}}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteCartById(item)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>

      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllChecked&&cartList.length != 0" @change="checkAllCart">
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllCheckCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{totalPrice}}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" :to="{name:'trade'}" >结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import throttle from 'lodash/throttle'
  export default {
    name: 'ShopCart',
    mounted() {
      this.getData()
    },
    methods: {
      getData(){
        this.$store.dispatch('shopcartOptions/getCartList')
      },
      // 修改某一个产品数量 三个事件源绑定了一个回调 通过传参识别是谁触发的
      // 防止操作过快 使用节流函数
      handlerNum:throttle(async function(type,disNum,cart){
        // type:区别是谁触发的回调
        // disNum参数有两种情况：两个按钮的变化 +1 -1 input最终的数量
        // cart: 点击的是哪个产品 拿到id 发给服务器
        switch (type) {
          case "add":
            disNum = 1
            break;
          case "sub":
             // 产品的个数大于1 才传递给服务器-1
             //  产品个数小于等于1 原封不动
             disNum = cart.skuNum > 1 ? -1 : 0
            break;
          case "change":
            // 用户输入非法的 带给服务器为0 不变化
            if(isNaN(disNum) || disNum<1){
              disNum = 0
            }else{
              // 如果输入小数 则取整 - 原本的数量 = 变化量
              disNum = parseInt(disNum) - cart.skuNum
            }
            // 简化
            // disNum = (isNaN(disNum)||disNum<1)?0:parseInt(disNum) - cart.skuNum

            break
        }
        // 派发action 重新加入购物车
        try {
          await this.$store.dispatch("detailOptions/addShopCart",{skuId:cart.skuId,skuNum:disNum})
          // 修改的数据发送后 再发请求获取最新的数据
          this.getData()
        } catch (error) {

        }
      },1000),
      // 删除购物车产品
      async deleteCartById(cart){
        try {
          await this.$store.dispatch('shopcartOptions/deleteCartListById',cart.skuId)
          // 删除成功 再发请求获取新的数据
          this.getData()
        } catch (error) {
          alert(error.message)
        }
      },
      // 修改产品状态
      async changeChecked(cart,e){
        try {
          // 带给服务器的isChecked参数不是布尔值  而是0|1
          let isChecked = e.target.checked ? '1' : '0'
          await this.$store.dispatch('shopcartOptions/changeCheckedById',{skuId:cart.skuId,isChecked})
          this.getData()
        } catch (error) {
          alert(error.message)
        }
      },
      // 删除选中的所有商品
      async deleteAllCheckCart(){
        // console.log(this.cartList);
        try {
          await this.$store.dispatch('shopcartOptions/deleteAllCheckCart')
          // 删完再次发请求
          this.getData()
        } catch (error) {
          alert(error.message)
        }
      },
      // 全选按钮实现全选
      async checkAllCart(e){
        // 拿到全选框的checked值  0 | 1
        let isChecked = e.target.checked ? '1' : '0'
        // 派发action
        try {
          await this.$store.dispatch('shopcartOptions/checkAllIsChecked',isChecked)
          this.getData()
        } catch (error) {
          alert(error.message)
        }
      }
    },
    computed:{
      ...mapGetters('shopcartOptions',['cartList']),
      // 计算产品总价
      totalPrice(){
        let sum = 0
        this.cartList.forEach(element => {
          sum+=element.skuNum * element.skuPrice
        });
        return sum
      },
      // 计算全选  全部产品选中勾选
      isAllChecked(){
        return this.cartList.every(item => item.isChecked == 1)
      }
    }
  }
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 15%;
          }

          .cart-list-con2 {
            width: 35%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }

          

          .cart-list-con4 {
            width: 10%;

          }

          .cart-list-con5 {
            width: 17%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 10%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 13%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>