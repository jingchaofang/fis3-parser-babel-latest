import babel from '@babel/core';

export default function transform(content, file, conf) {
    // 添加 useBabel 配置项，如果 useBabel 为 false 则不进行编译
    if (file.useBabel === false) {
        return content;
    }

    // 添加 jsx 的 html 语言能力处理
    if (fis.compile.partial && file.ext === '.jsx') {
        content = fis.compile.partial(content, file, {
            ext: '.html',
            isHtmlLike: true,
        });
    }

    const { sourceMapRelative } = conf;

    if (sourceMapRelative) {
        delete conf.sourceMapRelative;
    }

    // 出于安全考虑，不使用原始路径
    conf.filename = file.subpath.substring(1);
    const result = babel.transform(content, conf);

    // 添加resourcemap输出
    // 推荐babel设置conf.sourceMaps = true，只导出result.map然后我们作如下处理
    // https://babeljs.io/docs/en/next/options#sourcemaps
    if (result.map) {
        const mapping = fis.file.wrap(`${file.dirname}/${file.filename}${file.rExt}.map`);
        mapping.setContent(JSON.stringify(result.map, null, 4));
        const url = sourceMapRelative
            ? (`./${file.basename}.map`).replace('jsx', 'js')
            : mapping.getUrl(fis.compile.settings.hash, fis.compile.settings.domain);
        result.code = result.code.replace(/\n?\s*\/\/#\ssourceMappingURL=.*?(?:\n|$)/g, '');
        result.code += `\n//# sourceMappingURL=${url}\n`;
        file.extras = file.extras || {};
        file.extras.derived = file.extras.derived || [];
        file.extras.derived.push(mapping);
    }

    return result.code;
}
