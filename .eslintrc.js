module.exports = {
  extends: ['react-app'], // react-app 用于检查 js 代码
  rules: {
    // 0 忽略, 1 警告, 2 报错
    'react/jsx-uses-react': [2],
    // 提示要在 jsx 文件中手动引入 React
    'react/react-in-jsx-scope': [2],
    'no-console':[0]
  },
  overrides: [{ // 单独对 ts 有不同的规则
    files: ['*.ts', '*.tsx'],
    parserOptions: {
      project: './tsconfig.json',
    },
    extends: ['airbnb-typescript'],
    rules: {
      '@typescript-eslint/object-curly-spacing': [0],
      'import/prefer-default-export': [0],
      'no-console':[0],
      'import/extensions':[0]
    }
  }]
}
