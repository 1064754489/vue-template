module.exports = {
  root: true,
  env: {
    browser: true, // 浏览器环境 可以使用window和document
  },
  extends: [
    'plugin:vue/recommended', // 检测vue
    'standard', // eslint检测规则-standard
    'plugin:prettier/recommended',
  ],
  plugins: ['prettier'],
  parserOptions: {
    parser: 'babel-eslint',
    parser: '@typescript-eslint/parser', // 解析ts文件, 例如识别ts文件的内置类型
    ecmaFeatures: {
      legacyDecorators: true,
    },
  },
  rules: {
    'prettier/prettier': 2,
    'no-var': ['error'],
    'arrow-parens': 2, //箭头函数用小括号括起来
    'lines-around-comment': [
      1,
      {
        beforeBlockComment: true,
      },
    ], //行前/行后备注
    'generator-star-spacing': [
      2,
      {
        before: true,
        after: true,
      },
    ],
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
  },
}
