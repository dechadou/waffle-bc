import Cart, {
  FETCH_STORED_CART,
  SET_CART_CONFIG,
  CHANGE_ITEM_QUANTITY,
  DELETE_CART,
  GET_CHECKOUT_URL,
  STORE_CART,
  ADD_TO_CART,
} from './Cart';

export const CartNamespace = 'Cart';

export const CartActionTypes = {
  FETCH_STORED_CART: `${CartNamespace}/${FETCH_STORED_CART}`,
  DELETE_CART: `${CartNamespace}/${DELETE_CART}`,
  GET_CHECKOUT_URL: `${CartNamespace}/${GET_CHECKOUT_URL}`,
  STORE_CART: `${CartNamespace}/${STORE_CART}`,
  ADD_TO_CART: `${CartNamespace}/${ADD_TO_CART}`,
};

export const CartMutationTypes = {
  SET_CART_CONFIG: `${CartNamespace}/${SET_CART_CONFIG}`,
  CHANGE_ITEM_QUANTITY: `${CartNamespace}/${CHANGE_ITEM_QUANTITY}`,
};

export default Cart;
