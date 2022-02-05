<template>
  <div class="pagination">
    <!-- 当前页为1时 禁用上一页  点击传当前页-1 -->
    <button :disabled="pageNo == 1" @click="$emit('getPageNo',pageNo-1)">上一页</button>
    <!-- 起始数字大于1显示 点击传1 回到第一页-->
    <button v-if="startNumAndEndNum.start > 1" @click="$emit('getPageNo',1)" :class="{active:pageNo == 1}">1</button>
    <!-- 起始数字大于2显示 -->
    <button v-if="startNumAndEndNum.start > 2">···</button>


    <!-- 中间部分  遍历计算出来的结束数字 -->
    <!-- 当前页码为8  开始为6 结束为10  只展示6-10的 筛选出item大于等于start也就是6的  点击传当前页item-->
    <button v-for="(item,index) in startNumAndEndNum.end" :key="index" v-if="item>=startNumAndEndNum.start"  
      @click="$emit('getPageNo',item)"
      :class="{active:pageNo == item}"
      > {{item}} </button>
   


    <!-- 结束数字小于总页数-1时显示 -->
    <button v-if="startNumAndEndNum.end < totalPage - 1">···</button>
    <!-- 结束数字小于总页数显示  传总页数-->
    <button v-if="startNumAndEndNum.end < totalPage" @click="$emit('getPageNo',totalPage)"  :class="{active:pageNo == totalPage}"> {{totalPage}} </button>
    <!-- 当前页为总页数时禁用  点击 传当前页+1 -->
    <button :disabled="pageNo == totalPage"  @click="$emit('getPageNo',pageNo+1)">下一页</button>
    
    <button style="margin-left: 30px">共 {{total}} 条</button>
  </div>
</template>

<script>
  export default {
    name: "Pagination",
    props:['pageNo','pageSize','total','continues'],
    computed:{
      // 计算总页数
      totalPage(){
        // 向上取整
        return Math.ceil(this.total / this.pageSize)
      },
      // 计算出连续页码的起始数字和结束数字
      startNumAndEndNum(){
        const {pageNo,pageSize,total,continues} = this
        // 定义两个变量存储起始数字和结束数字
        let start,end = 0
        // 连续页码数字为5  则至少需要5页  如果出现不够5页的情况 也就是连续页码数大于总页数
        if(continues > this.totalPage ){
          start = 1
          end = this.totalPage
        }else{
          // 连续页码为5  总页数大于5
          // 当前页数为 1 2时修改起始数字
          start = pageNo - parseInt(continues / 2)
          end = pageNo + parseInt(continues / 2)
          // 起始数字为0时 应该往后退俩位  当前页数为1   -1 0 1 2 3  起始应该为1  结束应该为5
          if(start < 1){
            start = 1
            end = continues
          }
          // 结束数字大于等于总页数   当前页数为31  29 30 31 32 33  总页数31 - 连续页码5 + 1 = 27  27 28 29 30 31
          if(end > this.totalPage){
            end = this.totalPage
            start = this.totalPage - continues + 1
          }
        }
        return {start , end}
      }
    }
  }
</script>

<style lang="less" scoped>
  .pagination {
    text-align: center;
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;

      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }

      &.active {
        cursor: not-allowed;
        background-color: #409eff;
        color: #fff;
      }
    }
  }
  .active{
    background: skyblue;
  }
</style>
