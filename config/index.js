
'use strict'
// Template version: 1.1.1s
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

const onProxyRes = function(proxyRes, req, res) {
  var cookies = proxyRes.headers['set-cookie']
  if (cookies == null || cookies.length == 0) {
    delete proxyRes.headers['set-cookie']
    return
  }
  for (var i = 0,n = cookies.length; i < n; i++) {
    if(cookies[i].match(/^JSESSIONID=[^;]+;[\s\S]*Path=\/[^;]+/)){
      cookies[i] = cookies[i].replace(/Path=\/[^;]+/,'Path=/');
    }
  }
  proxyRes.headers['set-cookie'] = cookies;
}

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: process.env.PORT || 9000,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      //赛赛
      '/proxyApi':{
        target:'http://192.168.58.105:28080/app',
        // target:'http://10.0.58.114:8090',
        changeOrigin:true,
        pathRewrite:{
          '^/proxyApi':''
        },
        onProxyRes
      },
      //原始区+处理区+分析区
      '/proxyRdjc':{
        target:'http://192.168.58.105:28080/app',
        // target:'http://10.0.58.114:8090',
        changeOrigin:true,
        pathRewrite:{
          '^/proxyRdjc':''
        },
        onProxyRes
      },
      //zhangwei
      '/proxProcess':{
        target:'http://192.168.58.105:28080/app',
        // target:'http://10.0.58.114:8090',
        changeOrigin:true,
        pathRewrite:{
          '^/proxProcess':''
        },

      },
      //数据挖掘
      '/proxyAnalysis':{
        // target:'http://10.0.58.114:8072',
        target:'http://192.168.58.105:28080/app',
        changeOrigin:true,
        pathRewrite:{
          '^/proxyAnalysis':''
        },
        onProxyRes
      },
      '/proxyVisualization':{
        target:'http://192.168.58.105:28080/visual',
        changeOrigin:true,
        pathRewrite:{
          '^/proxyVisualization':''
        },
        onProxyRes
      }
    },
    cssSourceMap: false
  }
}
