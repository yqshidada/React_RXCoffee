```txt
安装material-ui框架, 存在px转rem的冲突问题
npm install @material-ui/core

配置rem
npm install react-app-rewired customize-cra --save-dev

安装postcss-pxtorem时, 建议安装5.1.1版本的, 6.0.0以上版本存在兼容性问题
npm i postcss-pxtorem@5.1.1 --save-dev
npm i lib-flexible --save-dev

先更改package.json的scripts
"scripts": {
  "start": "react-app-rewired start",
  "build": "react-app-rewired build",
  "test": "react-app-rewired test --env=jsdom"
},

然后在根目录下创建config-overrides.js文件, 并且写入以下代码
module.exports = override(
  addPostcssPlugins(
    [require('postcss-pxtorem')({ 
        rootValue: 37.5, 
        propList: ['*']
  })])
)

在index.引入lib-flexible
import 'lib-flexible/flexible'

再启动项目


安装react-router-dom
npm i react-router-dom --save


核心点

是什么
特点
作用
使用场景


安装axios
npm i axios --save


参考地址https://zhuanlan.zhihu.com/p/151282186
安装react-cookies
npm i react-cookies --save
```