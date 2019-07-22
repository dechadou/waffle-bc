export const SET_THEME = 'set-theme';
export const SET_FOOTER = 'set-footer';

export default {
  namespaced: true,
  state: {
    theme: null,
    footer: null,
    home_product_type: null,
  },
  getters: {},
  mutations: {
    [SET_THEME]: (state, theme) => {
      state.theme = theme;
      let name;
      switch (theme) {
        case 'marketplace':
          name = 'Product-Thumbnail';
          break;
        default:
          name = 'Product-Description';
      }
      state.home_product_type = name;
    },
    [SET_FOOTER]: (state, footer) => {
      let name;
      switch (footer) {
        case 1:
          name = 'Footer-Abre';
          break;
        case 2:
          name = 'Footer-Logo';
          break;
        default:
          name = 'Footer-None';
      }
      state.footer = name;
    },
  },
  actions: {},
};
