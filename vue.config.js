const path = require('path');
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  lintOnSave: false, //!isProduction,
  productionSourceMap: false, // 生产环境下的 source map
  pages: {
    app: {
      // page 的入口
      entry: 'src/main.ts',
      template: 'public/index.html',
      filename: 'index.html',
      chunks: [
        'chunk-vendors',
        'vendor-ant-design-vue',
        'vendor-@ant-design',
        'app',
        'runtime',
      ],
    },
  },
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // 启用 CSS modules for all css / pre-processor files.
    requireModuleExtension: true,
    // css预设器配置项
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, 'src/assets/less/global.less'),
        path.resolve(__dirname, 'src/assets/less/ant-vars.less'),
      ],
    },
  }
};
