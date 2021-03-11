module.exports = {
  mode: 'production',
  module:{
    rules: [
      {
        test:/\.jsx?$/,
        exclude: /node_modules/, // 排除
        use:{
          loader: 'babel-loader',
          options:{
            presets:[ // 预先规则
              ['@babel/preset-env'],
              ['@babel/preset-react']
            ]
          }
        }
      }
    ]
  }
}
