'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const webpack = require('webpack');

var HappyPack = require('happypack');
var os = require('os');
var happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    entry: {
      app:[ 'babel-polyfill',
           './src/main.js']
    },
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production' ?
            config.build.assetsPublicPath : config.dev.assetsPublicPath
    },
  externals: {
    // "vue":"Vue",
    // "vue-router":"VueRouter",
    // "element-ui":"ELEMENT",
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src'),
        }
    },
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                test: /\.js$/,
                loader: 'happypack/loader?id=happy-babel-js',
                include: [resolve('src'), resolve('test')]
            },
            {
                test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|woff|eot|svg|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    },
    plugins: [
      new webpack.optimize.ModuleConcatenationPlugin(),
      // new HappyPack({
      //   id: 'happy-vue-loader',
      //   loaders: ['vue-loader'],
      //   threadPool: happyThreadPool,
      // }),
      new HappyPack({
        id: 'happy-babel-js',
        loaders: ['babel-loader?cacheDirectory=true'],
        threadPool: happyThreadPool,
      }),
      // new HappyPack({
      //   id: 'happy-url-loader',
      //   loaders: ['url-loader'],
      //   threadPool: happyThreadPool,
      // }),
      // new HappyPack({
      //   id: 'happy-url-loader2',
      //   loaders: ['url-loader'],
      //   threadPool: happyThreadPool,
      // }),
      // new HappyPack({
      //   id: 'happy-url-loader3',
      //   loaders: ['url-loader'],
      //   threadPool: happyThreadPool,
      // })
        // new webpack.DllReferencePlugin({
        //   manifest: require('../static/js/vendor-manifest.json')
        // })
    ]
}
