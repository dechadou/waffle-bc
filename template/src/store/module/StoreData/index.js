import StoreData, {
  FETCH_STORE_DATA,
  IS_LOADED,
  GET_PRODUCTS_ID,
  GET_BUNDLES_ID,
  GET_PRODUCT,
  GET_BUNDLE,
  GET_ARTICLE_TOTAL_SOLD,
  GET_TEMPLATE_DATA,
  GET_PRODUCT_LIST_BY_BUNDLE_ID,
  GET_ARTICLE_LIST_BY_PRODUCT_ID,
} from './StoreData';

export const StoreDataNamespace = 'StoreData';

export const StoreDataGetterTypes = {
  IS_LOADED: `${StoreDataNamespace}/${IS_LOADED}`,
  GET_PRODUCTS_ID: `${StoreDataNamespace}/${GET_PRODUCTS_ID}`,
  GET_BUNDLES_ID: `${StoreDataNamespace}/${GET_BUNDLES_ID}`,
  GET_PRODUCT: `${StoreDataNamespace}/${GET_PRODUCT}`,
  GET_BUNDLE: `${StoreDataNamespace}/${GET_BUNDLE}`,
  GET_ARTICLE_TOTAL_SOLD: `${StoreDataNamespace}/${GET_ARTICLE_TOTAL_SOLD}`,
  GET_TEMPLATE_DATA: `${StoreDataNamespace}/${GET_TEMPLATE_DATA}`,
  GET_PRODUCT_LIST_BY_BUNDLE_ID: `${StoreDataNamespace}/${GET_PRODUCT_LIST_BY_BUNDLE_ID}`,
  GET_ARTICLE_LIST_BY_PRODUCT_ID: `${StoreDataNamespace}/${GET_ARTICLE_LIST_BY_PRODUCT_ID}`,
};

export const StoreDataActionTypes = {
  FETCH_STORE_DATA: `${StoreDataNamespace}/${FETCH_STORE_DATA}`,
};

export const StoreDataMutationTypes = {};

export default StoreData;
