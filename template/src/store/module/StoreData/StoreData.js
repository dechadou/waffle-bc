import { Request } from '../../../utils';

export const IS_LOADED = 'is-loaded';
export const GET_PRODUCTS = 'get-products';
export const GET_BUNDLES = 'get-bundles';
export const GET_PRODUCT = 'get-product';
export const GET_BUNDLE = 'get-bundle';
export const GET_ARTICLE_TOTAL_SOLD = 'get-article-total-sold';
export const GET_TEMPLATE_DATA = 'get-template-data';
export const FETCH_STORE_DATA = 'fetch-store-data';
const ADD_DATA = 'add-products';

export default {
  namespaced: true,
  state: {
    isLoaded: false,
    products: [],
    bundles: [],
    template: [],
    totalSold: [],
    tickets: [],
  },
  getters: {
    [IS_LOADED]: state => state.isLoaded,
    [GET_PRODUCTS]: state => state.products,
    [GET_BUNDLES]: state => state.bundles,
    [GET_PRODUCT]: (state, id) => {
      const product = state.products.find(prod => prod.id === id);
      if (!product) console.error(`[Waffle Error]: El producto con ID: ${id} no existe`);
      return product;
    },
    [GET_BUNDLE]: (state, id) => {
      const bundle = state.bundles.find(bund => bund.id === id);
      if (!bundle) console.error(`[Waffle Error]: El combo con ID: ${id} no existe`);
      return bundle;
    },
    [GET_ARTICLE_TOTAL_SOLD]: (state, id) => {
      const totalSold = state.data.totalSold.find(article => article.id_articulo === id);
      if (!totalSold) console.error(`[Waffle Error]: El articulo con ID: ${id} no existe`);
      return totalSold;
    },
    [GET_TEMPLATE_DATA]: state => state.template,
  },
  mutations: {
    [ADD_DATA]: (state, data) => {
      state.isLoaded = true;
      state.products = Object.values(data.productos); // TODO: cambiar por el nuevo sistema
      state.bundles = Object.values(data.template.combos);
      state.template = data.template;
      state.tickets = data.entradas;
    },
  },
  actions: {
    [FETCH_STORE_DATA]: ({ commit }, slug) => {
      Request.s3(`${slug}.json`)
        .then(response => commit(ADD_DATA, response.data))
        .catch(error => console.error(`[Waffle Error]: ${error}`));
    },
  },
};
