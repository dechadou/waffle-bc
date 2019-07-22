/* global $storeData */
import { Request } from '@/utils';

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
export const SET_STORE_IDENTIFIER = 'set-store-identifier';
const ADD_DATA = 'add-products';
const ADD_ERROR = 'add-error';

export default {
  namespaced: true,
  state: {
    data: null,
    products_id: null,
    bundles_id: null,
    template: null,
    totalSold: null,
    storeIdentifier: null,
    error: null,
  },
  getters: {
    [IS_LOADED]: state => state.data !== null,
  },
  mutations: {
    [ADD_DATA]: (state, data) => {
      const products = Object.values(data.productos);
      products.forEach((x) => {
        x.class = 'product';
        x.articles = Object.values(x.articulos);
        delete x.articulos;
        x.articles.forEach((y) => {
          y.class = 'article';
        });
      });

      const bundles = Object.values(data.combos);
      bundles.forEach((x) => {
        x.class = 'bundle';
        x.products = Object.values(x.productos);
        delete x.productos;
        x.products.forEach((y) => {
          y.class = 'product';
          y.articles = Object.values(y.articulos);
          delete y.articulos;
          y.articles.forEach((z) => {
            z.class = 'article';
          });
        });
      });

      state.data = { products, bundles };
      state.products_id = Object.values(data.template.productos);
      state.bundles_id = Object.values(data.template.combos);
      state.template = data.template;
      state.totalSold = data.totalSold;
    },
    [ADD_ERROR]: (state, error) => {
      state.error = error;
    },
    [SET_STORE_IDENTIFIER]: (state, { domain, storeSlug }) => {
      state.storeIdentifier = `${domain}-${storeSlug}`;
    },
  },
  actions: {
    [FETCH_STORE_DATA]: ({ commit }, slug) => {
      if (typeof $storeData !== 'undefined') {
        commit(ADD_DATA, $storeData);
      } else {
        Request.s3(`${slug}.json`)
          .catch((error) => {
            commit(ADD_ERROR, error);
            throw new Error(`[Waffle Error]: ${error}`);
          })
          .then(response => commit(ADD_DATA, response.data));
      }
    },
  },
};
