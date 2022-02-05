module.exports = {
  // 关闭Eslint
  lintOnSave:false,
  // 代理跨域
  devServer: {
    proxy: {
      '/api': {
        target: 'http://39.98.123.211',
        // 在配置服务器请求数据时 去掉/api前缀
        // pathRewrite:{
        //   '^/api':''
        // },
        // websocket
        ws: true,
        // 输出请求服务器的端口
        changeOrigin: true
      },
    }
  }
}