# example示例

fis3 + babel + vue-jsx

```
npm run dev
npm run server 运行/example/output/index.html
```

* [vue中使用jsx](https://cn.vuejs.org/v2/guide/render-function.html#JSX)
    * https://github.com/vuejs/jsx

* [fis3加载npm模块像webpack一样工作](https://github.com/fex-team/fis3-hook-node_modules)
    * https://github.com/fex-team/mod 加载器
    * https://github.com/fex-team/fis3-postpackager-loader 依赖资源自动插入html中


# 测试用例说明test

```
npm install --save-dev jest

npm run test  通过编译输出__tests__目录执行jest测试
```

## vue-jsx.test.js

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