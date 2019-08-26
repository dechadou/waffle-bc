/* eslint-disable */
const version = Math.round((new Date()).getTime() / 1000);

module.exports = {
  assetsDir: './version/' + version + '/',

  publicPath: process.env.NODE_ENV === 'production'
    ? '/'
    : '/',

  pluginOptions: {
    svgSprite: {
      dir: 'src/assets/icons',
      test: /\.(svg)(\?.*)?$/,
      loaderOptions: {
        extract: true,
        spriteFilename: 'version/' + version + '/img/icons.[hash:8].svg',
      },
      pluginOptions: {
        plainSprite: true,
      },
    },
    webpackBundleAnalyzer: {
      openAnalyzer: false,
    },
  },

  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/assets/styles/_variables.scss";
        `,
      },
    },
  },

  filenameHashing: false,

  chainWebpack: (config) => {
    config.module
      .rule('svg-sprite')
      .use('svgo-loader')
      .loader('svgo-loader');
  },
};
