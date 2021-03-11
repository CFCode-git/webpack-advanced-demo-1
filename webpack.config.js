const ESlintPlugin = require('eslint-webpack-plugin')

module.exports = {
  mode: 'production',
  plugins: [new ESlintPlugin({
    extensions: ['.js', '.jsx']
  })],
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/, // 排除
        use: {
          loader: 'babel-loader',
          options: {
            presets: [ // 预先规则
              ['@babel/preset-env'],
              ['@babel/preset-react', {runtime: 'classic'}],
              ['@babel/preset-typescript']
              // 为什么要加 runtime: 'classic'?
              // 因为从 React 17 开始, React 提供了两种使用 jsx 的方法. classic 就是旧的版本 经典版
            ]
          }
        }
      }
    ]
  }
}
