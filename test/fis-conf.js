let parserBabelPlugin = require('../dist/index');

// es6编译
fis.match('**.js', {
    isMod: true,
    rExt: 'js',
    useSameNameRequire: true,
    parser: [
        function (content, file, conf) {
            conf.presets = [
                ['@babel/preset-env', {
                    targets: {
                        node: 'current'
                    }
                }],
                ['@vue/babel-preset-jsx'],
            ];
            return parserBabelPlugin(content, file, conf);
        },
    ]
});

fis.match('helper.js', {
    isMod: false,
}).match('vue-jsx.test.js', {
    isMod: false
})