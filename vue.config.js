module.exports = {
  devServer: {
    open: true,
    hot: true,
    port: 8081
  },
  publicPath: "./",
  configureWebpack: config => {
    config.module.rules.push({
      // 打包处理新字体
      test: /\.(woff|ttf|eot|svg|otf)/,
      use: [
        {
          loader: "url-loader",
          options: {
            limit: 10000,
            name: "fonts/[name].[hash:7].[ext]"
          }
        }
      ]
    })
  }
}
