const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const EasyConfigMock = require('easy-config-mock')
const packageName = require('./package.json').name

const devServerPort = 8001 // 开发服务器端口号

new EasyConfigMock({
  // 将配置文件路径传递进去，服务会自动监听文件变化并重启服务
  path: path.resolve(__dirname, 'mock.config.js'),
})

// 是否是开发环境
// 这个NODE_ENV就是从package.json的dev/build scripts传进来的
const isDev = process.env.NODE_ENV === 'development'

const config = {
  mode: isDev ? 'development' : 'production',
  entry: path.join(__dirname, 'src/main.js'), // 项目总入口js文件
  // 输出文件
  output: {
    path: path.join(__dirname, 'dist'),
    filename: isDev ? 'bundle.[hash:8].js' : '[name].[chunkhash:8].js',
    library: `${packageName}-[name]`,
    libraryTarget: 'umd',
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
