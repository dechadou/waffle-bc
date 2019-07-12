<template>
  <div class="button_container">
    <component :is="buttonType" :callback="callback" />
  </div>
</template>

<script>
import { EventManager } from '@/utils';
import { getEnum, EnumNames } from '@/config';
import * as buttons from './AddToCartButtonTypes';

export default {
  name: 'AddToCartButton',
  components: {
    ...buttons,
  },
  props: {
    slug: {
      type: String,
    },
    id: {
      type: Number,
    },
    productType: {
      type: String,
    },
    buttonType: {
      type: String,
      required: true,
    },
  },
  methods: {
    callback() {
      if (this.buttonType === 'Select') this.openLink();
      else this.addToCart();
    },
    addToCart() {
      EventManager.trigger(getEnum(EnumNames.EventNames).ADD_TO_CART, this.id, this.type); // TODO: que el carrito pueda conseguir la imagen en base al tipo de producto
      if (!this.slider) EventManager.trigger(getEnum(EnumNames.EventNames).ON_RELATED_PRODUCTS_TOGGLE, this.data);
    },
    openLink() {
      this.$router.push(`/producto/${this.slug}`);
    },
  },
};
</script>


<style lang="scss" scoped>
  .button_container {
    float: left;
    width: 100%;
    @media (min-width: 768px) {
      .button_container {
        padding: 0;
      }
    }
  }
</style>
