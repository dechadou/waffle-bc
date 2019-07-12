import { Request } from '../../../utils';

export const IS_LOADED = 'is-loaded';
export const GET_PRODUCTS_ID = 'get-products-id';
export const GET_BUNDLES_ID = 'get-bundles-id';
export const GET_PRODUCT = 'get-product';
export const GET_BUNDLE = 'get-bundle';
export const GET_ARTICLE_TOTAL_SOLD = 'get-article-total-sold';
export const GET_TEMPLATE_DATA = 'get-template-data';
export const FETCH_STORE_DATA = 'fetch-store-data';
export const GET_PRODUCT_LIST_BY_BUNDLE_ID = 'get-product-list-by-bundle-id';
export const GET_ARTICLE_LIST_BY_PRODUCT_ID = 'get-article-list-by-product-id';
const ADD_DATA = 'add-products';

export default {
  namespaced: true,
  state: {
    data: null,
    products: null,
    bundles: null,
    products_id: null,
    bundles_id: null,
    template: null,
    tickets: null,
  },
  getters: {
    [IS_LOADED]: state => state.data !== null,
    [GET_PRODUCTS_ID]: state => state.products_id,
    [GET_BUNDLES_ID]: state => state.bundles_id,
    [GET_PRODUCT]: state => (id) => {
      const product = state.products.find(prod => prod.id === id);
      if (product) return product;
      throw new Error(`[Waffle Error]: El producto con ID: ${id} no existe`);
    },
    [GET_BUNDLE]: state => (id) => {
      const bundle = state.bundles.find(bund => bund.id === id);
      if (bundle) return bundle;
      throw new Error(`[Waffle Error]: El combo con ID: ${id} no existe`);
    },
    [GET_ARTICLE_TOTAL_SOLD]: state => (id) => {
      const totalSold = state.data.totalSold.find(article => article.id_articulo === id);
      if (totalSold) return totalSold;
      throw new Error(`[Waffle Error]: El articulo con ID: ${id} no existe`);
    },
    [GET_TEMPLATE_DATA]: state => state.template,
    [GET_PRODUCT_LIST_BY_BUNDLE_ID]: state => id => Object.values(Object.values(state.data.combos).find(x => x.id === id).productos),
    [GET_ARTICLE_LIST_BY_PRODUCT_ID]: state => id => Object.values(Object.values(state.data.productos).find(x => x.id === id).articulos)[0],
  },
  mutations: {
    [ADD_DATA]: (state, data) => {
      state.data = data;
      state.products = Object.values(data.productos);
      state.bundles = Object.values(data.combos);
      // state.products_id = Object.values(data.template.productos); TODO: cambiar por el nuevo sistema
      state.bundles_id = Object.values(data.template.combos);
      state.template = data.template;
    },
  },
  actions: {
    [FETCH_STORE_DATA]: ({ commit }, slug) => {
      Request.s3(`${slug}.json`)
        .catch(error => console.error(`[Waffle Error]: ${error}`))
        .then(response => commit(ADD_DATA, response.data));
    },
  },
};
