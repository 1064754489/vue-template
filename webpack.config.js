const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const devServerPort = 8000 // 开发服务器端口号

// 是否是开发环境
// 这个NODE_ENV就是从package.json的dev/build scripts传进来的
const isDev = process.env.NODE_ENV === 'development'

const config = {
  mode: isDev ? 'development' : 'production',
  entry: path.join(__dirname, 'src/main.js'), // 项目总入口js文件
  // 输出文件
  output: {
    path: path.join(__dirname, 'dist'),
    /**
     * hash跟chunkhash的区别，如果entry有多个，或者需要单独打包类库到
     * 一个js文件的时候，hash是所有打包出来的每个js文件都是同样的哈希，
     * 而chunkhash就是只是那个chunk的哈希，也就是chunkhash如果那个chunk
     * 没有变化就不会变，而hash只要某一个文件内容有变化都是不一样的，所以
     * 用chunkhash区分开每一个文件有变化时才更新，让浏览器起到缓存的作用
     */
    filename: isDev ? 'bundle.[hash:8].js' : '[name].[chunkhash:8].js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
          },
        ],
      },
      {
        test: /\.(git|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              options: 'dist/assets/images/[name]-[hash:5].[ext]',
            },
          },
        ],
      },
      {
        test: /\.vue$/,
        use: ['eslint-loader'],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(), // 最新版的vue-loader需要配置插件
    new HtmlWebpackPlugin({
      filename: 'index.html', // 生成的文件名称
      template: 'public/index.html', // 指定用index.html做模版
      inject: 'body', // 指定插入的<script>标签在body底部
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[id].css',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
}

// 如果是开发环境
if (isDev) {
  // 指定开发环境启动的服务器的信息
  config.devServer = {
    open: true,
    port: devServerPort,
    host: '0.0.0.0', // 配置成0.0.0.0的话通过ip，localhost都能访问
    hot: true, // 开启模块热替换【https://webpack.docschina.org/guides/hot-module-replacement】
  }
}

module.exports = config
