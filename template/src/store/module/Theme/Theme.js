export const SET_THEME = 'set-theme';
export const SET_FOOTER = 'set-footer';

class ThemeConfig {
  constructor(
    homeProductType,
    homeProductClasses,
    showRelatedProducts,
    showPageShare,
  ) {
    this.homeProductType = homeProductType;
    this.homeProductClasses = homeProductClasses;
    this.showRelatedProducts = showRelatedProducts;
    this.showPageShare = showPageShare;
  }
}

export default {
  namespaced: true,
  state: {
    theme: null,
    footer: null,
    themeConfig: null,
    configurations: {
      themes: {
        marketplace: new ThemeConfig(
          'Product-Thumbnail',
          'col-12 col-md-4',
          true,
          false,
        ),
        landing: new ThemeConfig(
          'Product-Description',
          'col-12',
          false,
          true,
        ),
      },
      footerNames: ['Footer-None', 'Footer-Abre', 'Footer-Logo'],
    },

  },
  getters: {},
  mutations: {
    [SET_THEME]: (state, theme) => {
      state.theme = theme;
      state.themeConfig = state.configurations.themes[theme];
    },
    [SET_FOOTER]: (state, footer) => {
      let name;
      if (footer > state.configurations.footerNames.length - 1) [name] = state.configurations.footerNames;
      else name = state.configurations.footerNames[footer];
      state.footer = name;
    },
  },
  actions: {},
};
