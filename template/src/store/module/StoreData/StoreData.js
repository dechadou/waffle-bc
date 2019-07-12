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
    products_id: null,
    bundles_id: null,
    template: null,
    totalSold: null,
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

      // state.products_id = Object.values(data.template.productos); TODO: descomentar cuando funcione el API
      state.bundles_id = Object.values(data.template.combos);
      state.template = data.template;
      state.totalSold = data.totalSold;
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
