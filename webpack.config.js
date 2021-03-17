const path = require('path')
const ESlintPlugin = require('eslint-webpack-plugin')

const cssLoader = (...loaders) => [
  'style-loader',
  {
    loader: 'css-loader',
    options: {
      modules: {
        compileType: 'icss'
      }
    }
  },
  ...loaders
]

module.exports = {
  mode: 'production',
  plugins: [new ESlintPlugin({
    extensions: ['.js', '.jsx', 'ts', '.tsx']
  })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/')
    }
  },
  module: {
    rules: [
      {
        test: /\.styl(us)?$/i,
        use: cssLoader({
          loader: 'stylus-loader',
          options: {
            stylusOptions: {
              import: [path.resolve(__dirname, 'src/stylus-vars.styl')]
            }
          }
        })
      },
      {
        test: /\.less$/i,
        use: cssLoader({
          loader: 'less-loader',
          options: {
            additionalData: `
                @import "~@/less-vars.less";
              `
          }
        })
      },
      {
        test: /\.s[ac]ss$/i,
        use: cssLoader({
          loader: 'sass-loader',
          options: {
            additionalData: `
                @import "~@/scss-vars.scss";
              `,
            sassOptions: {
              includePaths: [__dirname]
            }
          }
        })
      },
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
