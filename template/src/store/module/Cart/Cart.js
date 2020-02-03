import { getUrl, URLNames } from '@/config';

export const FETCH_STORED_CART = 'fetch-stored-cart';
export const ADD_TO_CART = 'add-to-cart';
export const SET_CART_CONFIG = 'set-cart-config';
export const STORE_CART = 'store-cart';
export const DELETE_CART = 'delete-cart';
export const GET_CHECKOUT_URL = 'get-checkout-url';
export const CHANGE_ITEM_QUANTITY = 'change-item-quantity';
export const SET_COUPON = 'set-coupon';
export const SET_COUPON_CODE = 'set-coupon-code';
export const SET_CURRENCY = 'set-currency';
const ADD_ITEM = 'add-item';
const SET_CART = 'set-cart';
const SET_REDIRECT_URL = 'set-redirect-url';
const QUERY_STORE_ID = 'store_id';
const QUERY_BUNDLES_ARRAY = 'combos[]';
const QUERY_ARTICLES_ARRAY = 'products[]';
const QUERY_COUPON = 'coupon';
const QUERY_CURRENCY = 'currency';

class StoreCart {
  constructor(data, date) {
    this.data = data;
    this.date = date;
  }
}

class SavedCart {
  constructor(json) {
    const jsonData = JSON.parse(json);
    if (jsonData) {
      this.data = jsonData.data;
      this.date = new Date(jsonData.date);
    }
  }

  get isValid() {
    return !!this.data;
  }

  get isYoung() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return this.date > yesterday;
  }
}

export default {
  namespaced: true,
  state: {
    cartItems: [],
    cartQuantity: 0,
    cartSubtotal: 0,
    cartRedirect: null,
    coupon: null,
    couponCode: null,
    config: null,
    currency: null,
  },
  getters: {},
  mutations: {
    [SET_COUPON]: (state, payload) => {
      state.coupon = payload;
    },
    [SET_COUPON_CODE]: (state, payload) => {
      state.couponCode = payload;
    },
    [SET_REDIRECT_URL]: (state, payload) => {
      state.cartRedirect = payload;
    },
    [SET_CART_CONFIG]: (state, config) => {
      state.config = config;
    },
    [ADD_ITEM]: (state, payload) => {
      state.cartItems = [...state.cartItems, payload];
    },
    [SET_CART]: (state, savedCart) => {
      if (!savedCart.isYoung) return;
      state.cartItems = savedCart.data;

      state.cartQuantity = state.cartItems.reduce(
        (accumulator, current) => (
          current.price.some(x => x.coin_unit === state.currency)
            ? accumulator + current.quantity
            : accumulator
        ),
        0,
      );

      state.cartSubtotal = state.cartItems.reduce(
        (accumulator, current) => (
          current.price.some(x => x.coin_unit === state.currency)
            ? accumulator + (current.quantity * current.price.find(x => x.coin_unit === state.currency).price)
            : accumulator
        ),
        0,
      );
    },
    [CHANGE_ITEM_QUANTITY]: (state, { index, quantity }) => {
      if (index === -1) index = state.cartItems.length - 1;
      state.cartItems[index].quantity += quantity;
      state.cartQuantity += quantity;
      state.cartSubtotal += (quantity * state.cartItems[index].price.find(x => x.coin_unit === state.currency).price);
      if (state.cartItems[index].quantity < 1) state.cartItems.splice(index, 1);
    },
    [SET_CURRENCY]: (state, currency) => {
      state.currency = currency;

      state.cartQuantity = state.cartItems.reduce(
        (accumulator, current) => (
          current.price.some(x => x.coin_unit === state.currency)
            ? accumulator + current.quantity
            : accumulator
        ),
        0,
      );

      state.cartSubtotal = state.cartItems.reduce(
        (accumulator, current) => (
          current.price.some(x => x.coin_unit === state.currency)
            ? accumulator + (current.quantity * current.price.find(x => x.coin_unit === state.currency).price)
            : accumulator
        ),
        0,
      );
    },
  },
  actions: {
    [FETCH_STORED_CART]: ({ state, commit }) => {
      const savedCart = new SavedCart(localStorage.getItem(`${state.config.storeIdentifier}_store_cart`));
      if (savedCart.isValid) commit(SET_CART, savedCart);
    },
    [ADD_TO_CART]: ({ state, commit }, { id, productClass }) => {
      const index = state.cartItems.findIndex(x => x.id === id && x.class === productClass);
      if (index === -1) commit(ADD_ITEM, state.config.cartHelper.getCartObjectByProductId(id, productClass));
      commit(CHANGE_ITEM_QUANTITY, { index, quantity: 1 });
    },
    [GET_CHECKOUT_URL]: ({ state, commit }, currency) => {
      const url = state.cartItems.reduce((accumulator, currentValue) => {

        console.log(currentValue.price);

        if (currentValue.price.some(x => x.coin_unit === state.currency)) {
          accumulator
            += `&${currentValue.class === 'bundle' ? [QUERY_BUNDLES_ARRAY] : [QUERY_ARTICLES_ARRAY]}`;
          accumulator += `=${currentValue.id},${currentValue.quantity}`;
        }

        return accumulator;
      }, `${getUrl(URLNames.CHECKOUT)}?${[QUERY_STORE_ID]}=${state.config.storeId}`)
        .concat(state.coupon ? `&${[QUERY_COUPON]}=${state.coupon.coupon}` : '')
        .concat(`&${[QUERY_CURRENCY]}=${currency}`);
      commit(SET_REDIRECT_URL, url);
    },
    [STORE_CART]: ({ state }) => {
      localStorage.setItem(
        `${state.config.storeIdentifier}_store_cart`,
        JSON.stringify(new StoreCart(state.cartItems, new Date())),
      );
    },
    [DELETE_CART]: ({ state }) => {
      localStorage.removeItem(`${state.config.storeIdentifier}_store_cart`);
    },
  },
};
