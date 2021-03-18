const path = require('path')
const ESlintPlugin = require('eslint-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 多页面
const fs = require('fs')
const fileNames = fs.readdirSync('./src/pages')
const makeEntries = (arr) => {
  const result = {}
  arr.forEach(item => {
    const key = item.replace(/\.js$/i, '')
    result[key] = path.resolve('./', 'src', 'pages', item)
  })
  return result
}
const makeHtml = (arr) => {
  return arr.map((item) => {
    const key = item.replace(/\.js$/i, '')
    return new HtmlWebpackPlugin({
      filename: `${key}.html`,
      chunks: [`${key}`]
    })
  })
}
const entries = makeEntries(fileNames)
const html = makeHtml(fileNames)
//// 多页面
const mode = 'production'
const cssLoader = (...loaders) => [
  mode === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
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
  mode,
  entry: {
    main:'./src/index.js',
    admin:'./src/admin.js',
    ...entries
  },
  plugins: [
    new ESlintPlugin({
      extensions: ['.js', '.jsx', 'ts', '.tsx']
    }),
    mode === 'production' && new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    new HtmlWebpackPlugin(), // 默认就是打包 index.js
    new HtmlWebpackPlugin({
      filename:'admin.html',
      chunks:['admin']
    }),
    ...html
  ].filter(Boolean), // 通过 filter 自动过滤 false，现在 plugins 数组可以支持 短路逻辑
  output: {
    filename: '[name].[contenthash].js'
  },
  optimization:{ // 优化
    moduleIds: 'deterministic',
    runtimeChunk: "single", // 运行时文件单独打包
    splitChunks: {
      cacheGroups: {
        vendor:{
          priority:10,
          minSize: 0, // 如果不写 0， 由于 React 文件尺寸太小， 会直接跳过
          test: /[\\/]node_modules[\\/]/, // 这里是为了匹配 /node_modules/ 或 \node_modules\
          name: 'vendors', // 文件名
          chunks: 'all', // all 表示同步加载或者异步加载， async表示异步加载，initial表示同步加载
          /**
           * 这三行的整体意思就是：
           * 把两种加载方式的来自 node_modules 目录的文件打包为 vendors.xxx.js
           * 其中 vendors 是第三方的意思
           */
        },
        common:{
          priority:5, // 优先级,要保证 vendor 的优先级高一点，因为有可能一个文件是被引用了两次， 但他是在 node_modules 里面
          minSize: 0,
          minChunks: 2, // 这里表示只要有一个文件被至少两个文件引用了，就可以认为这个文件是公有的
          chunks: 'all',
          name: 'common'
        }
      }
    }
  },
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
