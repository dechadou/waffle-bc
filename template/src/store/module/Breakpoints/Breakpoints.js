import { getEnum, EnumNames } from '@/config';

export const SET_BREAKPOINT = 'set-breakpoint';

export default {
  namespaced: true,
  state: {
    breakpoint: null,
    breakpoints: null,
  },
  getters: {},
  mutations: {
    [SET_BREAKPOINT]: (state) => {
      if (!state.breakpoints) state.breakpoints = getEnum(EnumNames.Breakpoints);

      const width = window.innerWidth;
      if (width < 576) state.breakpoint = state.breakpoints.XS;
      else if (width < 768) state.breakpoint = state.breakpoints.SM;
      else if (width < 992) state.breakpoint = state.breakpoints.MD;
      else if (width < 1200) state.breakpoint = state.breakpoints.LG;
      else state.breakpoint = state.breakpoints.XL;
    },
  },
  actions: {},
};
