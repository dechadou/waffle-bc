import { Request } from '../../../utils';

export const FETCH_EDITABLE_TEXT = 'fetch-editable-text';
const SET_EDITABLE_TEXT = 'set-editable-text';

export default {
  namespaced: true,
  state: {
    response: null,
  },
  getters: {},
  mutations: {
    [SET_EDITABLE_TEXT]: (state, payload) => {
      state.response = payload;
    },
  },
  actions: {
    [FETCH_EDITABLE_TEXT]: ({ commit }, slug) => {
      Request.api
        .get(`metas/slug/${slug}`)
        .then(response => commit(SET_EDITABLE_TEXT, response.data))
        .catch((error) => {
          throw new Error(`[Waffle Error]: ${error}`);
        });
    },
  },
};
