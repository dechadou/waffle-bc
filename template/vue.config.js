module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/samurai/'
    : '/',

  pluginOptions: {
    svgSprite: {
      dir: 'src/assets/icons',
      test: /\.(svg)(\?.*)?$/,
      loaderOptions: {
        extract: true,
        spriteFilename: 'img/icons.[hash:8].svg',
      },
      pluginOptions: {
        plainSprite: true,
      },
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
    config.plugins.delete('html');
    config.plugins.delete('preload');
    config.plugins.delete('prefetch');
  },
};
