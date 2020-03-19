# 测试用例说明test

## vue-jsx.spec.js

npm install --save-dev jest

搬砖自https://github.com/vuejs/babel-plugin-transform-vue-jsx/blob/master/test/test.js

# 构建部分说明build

## rollup library

npm install rollup -D

https://www.rollupjs.com/guide/tools/#babel

* rollup-plugin-node-resolve 插件可以告诉 Rollup 如何查找外部模块

npm install rollup-plugin-node-resolve -D

* babel 使用未被浏览器和 Node.js 支持的将来版本的 JavaScript 特性

npm install --save-dev @babel/core 
npm install --save-dev @babel/preset-env
npm i -D rollup-plugin-babel

## webpack library

npm install --save-dev webpack