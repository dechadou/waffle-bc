export const SET_THEME = 'set-theme';

export default {
  namespaced: true,
  state: {
    theme: null,
  },
  getters: {},
  mutations: {
    [SET_THEME]: (state, theme) => {
      state.theme = theme;
    },
  },
  actions: {},
};
