//开启gzip压缩
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;

module.exports = {
  // publicPath: '//h5.xunsheng.org.cn/h5/classtools/',
  publicPath: "/", // 构建好的文件输出到哪里
  outputDir: "dist", // where to put static assets (js/css/img/font/...) // 是否在保存时使用‘eslint-loader’进行检查 // 有效值: true | false | 'error' // 当设置为‘error’时，检查出的错误会触发编译失败
  lintOnSave: true, // 使用带有浏览器内编译器的完整构建版本 // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
  runtimeCompiler: false, // babel-loader默认会跳过`node_modules`依赖. // 通过这个选项可以显示转译一个依赖
  productionSourceMap: false, // 调整内部的webpack配置. // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  //开启gzip压缩
  configureWebpack: config => {
    const plugins = [];
    plugins.push(
      new CompressionWebpackPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: productionGzipExtensions,
        threshold: 10240,
        minRatio: 0.8
      })
    );
    config.plugins = [
      ...config.plugins,
      ...plugins
    ];
  },
  chainWebpack: (config) => {
    // 移除 prefetch 插件
    config.plugins.delete('prefetch')
    // 移除 preload 插件
    config.plugins.delete('preload');
    // 修复HMR(热更新)失效
    config.resolve.symlinks(true);
  },
  transpileDependencies: [
  ],
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "~@/styles/variables.scss";`,//设置全局样式
      },
      postcss: {
        autoprefixer: {
          browsers: ['Android >= 4.0', 'iOS >= 8'],
        },
        plugins: [
          require('postcss-pxtorem')({
            rootValue: 37.5,// 换算的基数 默认为37.5，一般不建议修改它，使用vant ui框架中也是默认37.5
            propList: ['*'], //属性的选择器，*表示通用
          }),
        ]
      }
    },
  }, // use thread-loader for babel & TS in production build // enabled by default if the machine has more than 1 cores
  parallel: require("os").cpus().length > 1, // PWA 插件相关配置 // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  pwa: {}, // configure webpack-dev-server behavior
  devServer: {
    open: process.platform === "darwin",
    disableHostCheck: false,
    host: "0.0.0.0",
    port: 8000,
    https: false,
    hotOnly: false, // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#configuring-proxy
    proxy: {
      '/api': {
        target: 'http://xsdt.xunsheng.org.cn',
        // target: 'http://test.xunsheng.org.cn',
        // target:'http://118.178.94.250',
        changeOrigin: true
      }
    }
  },
  // 第三方插件配置
  pluginOptions: {
    // ...
  }
};
