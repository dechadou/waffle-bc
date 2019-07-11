import StoreData, {
  FETCH_STORE_DATA,
  IS_LOADED,
  GET_PRODUCTS,
  GET_BUNDLES,
  GET_PRODUCT,
  GET_BUNDLE,
  GET_ARTICLE_TOTAL_SOLD,
  GET_TEMPLATE_DATA,
} from './StoreData';

export const StoreDataNamespace = 'StoreData';

export const StoreDataGetterTypes = {
  IS_LOADED: `${StoreDataNamespace}/${IS_LOADED}`,
  GET_PRODUCTS: `${StoreDataNamespace}/${GET_PRODUCTS}`,
  GET_BUNDLES: `${StoreDataNamespace}/${GET_BUNDLES}`,
  GET_PRODUCT: `${StoreDataNamespace}/${GET_PRODUCT}`,
  GET_BUNDLE: `${StoreDataNamespace}/${GET_BUNDLE}`,
  GET_ARTICLE_TOTAL_SOLD: `${StoreDataNamespace}/${GET_ARTICLE_TOTAL_SOLD}`,
  GET_TEMPLATE_DATA: `${StoreDataNamespace}/${GET_TEMPLATE_DATA}`,
};

export const StoreDataActionTypes = {
  FETCH_STORE_DATA: `${StoreDataNamespace}/${FETCH_STORE_DATA}`,
};

export const StoreDataMutationTypes = {};

export default StoreData;
