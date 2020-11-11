const path = require('path');

module.exports = {
  chainWebpack: config => {
    const dir = path.resolve(__dirname, 'src/assets/icons');
    config.module
        .rule('svg-sprite')
        .test(/\.svg$/)
        .include.add(dir).end()
        .use('svg-sprite-loader-mod').loader('svg-sprite-loader-mod').options({extract: false}).end();

    config.plugin('svg-sprite').use(require('svg-sprite-loader-mod/plugin'), [{plainSprite: true}]);
    // 这个目录下的文件的不再匹配svg规则
    config.module.rule('svg').exclude.add(dir)
  }
};
