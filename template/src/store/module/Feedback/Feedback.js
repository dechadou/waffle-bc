

import { Request } from '../../../utils';

export const SEND_DATA = 'fetchOrder';
export const GET_ERROR = 'getError';
export const GET_ORDER = 'getOrder';
export const RESET_STATE = 'resetState';
const SET_ERROR = 'setError';
const ADD_RESPONSE = 'addResponse';

export default {
  namespaced: true,
  state: {
    response: '',
    error: '',
  },
  getters: {
    [GET_ERROR]: state => state.error,
  },
  mutations: {
    [SET_ERROR]: (state, { error }) => {
      state.error = error;
      console.error(`[Waffle Error]: ${error}`);
    },
    [ADD_RESPONSE]: (state, payload) => {
      state.response = payload;
    },
    [RESET_STATE]: (state) => {
      state.response = '';
      state.error = '';
    },
  },
  actions: {
    [SEND_DATA]: ({ commit }, payload) => {
      const bodyFormData = new FormData();
      bodyFormData.append('nombre', payload.name);
      bodyFormData.append('email', payload.email);
      bodyFormData.append('comentarios', payload.message);
      bodyFormData.append('rating', 0);
      const config = {
        headers: { Token: `Bearer: ${payload.token}`, 'Content-Type': 'multipart/form-data' },
        body: bodyFormData,
      };
      Request.api
        .post('/v2/feedback/store', config)
        .then(response => commit(ADD_RESPONSE, response.data))
        .catch(response => commit(SET_ERROR, { error: response, payload: true }));
    },
  },
};
