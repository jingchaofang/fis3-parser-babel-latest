var parserBabelPlugin = require('../dist/index');

// 添加commonjs支持 (需要先安装fis3-hook-commonjs)
// https://github.com/fex-team/fis3-hook-commonjs
fis.hook('commonjs', {
    extList: ['.js', '.jsx', '.es', '.ts', '.tsx'],
});
// 禁用components
fis.unhook('components');
fis.hook('node_modules');
// 用 loader 来自动引入资源到HTML
// https://github.com/fex-team/fis3-postpackager-loader
fis.match('::package', {
    postpackager: fis.plugin('loader')
});
// es6编译
fis.match('**.js', {
    isMod: true,
    rExt: 'js',
    useSameNameRequire: true,
    parser: [
        function (content, file, conf) {
            conf.presets = [
                ['@babel/preset-env', {
                    "targets": {
                        "chrome": "58",
                        "ie": "11"
                    }
                }],
                ['@vue/babel-preset-jsx'],
            ];
            conf.sourceMaps = true;
            return parserBabelPlugin(content, file, conf);
        },
    ]
});

fis.match('mod.js', {
    isMod: false,
    parser: false
});

// 需要忽略的
fis.set('project.ignore', fis.get('project.ignore').concat([
    'DS_store',
    '*.md',
    'package.json',
    'package-lock.json'
]));