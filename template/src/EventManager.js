import Vue from 'vue';

export const EventManager = new Vue();
export const EventType = {
  addToCart: 'addToCart',
  onCartToggle: 'onCartToggle',
  onCartItemQuantityChange: 'onCartItemQuantityChange',
  onRelatedProductsToggle: 'onRelatedProductsToggle',
  onFeedbackActive: 'onFeedbackActive',
};
