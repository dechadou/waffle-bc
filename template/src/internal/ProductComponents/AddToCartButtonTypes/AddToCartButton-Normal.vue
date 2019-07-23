<template>
  <button class="btn animated" type="button" @click="onClick($event)">Agregar al Carrito</button>
</template>

<script>
import { animateButton } from '@/utils/addToCartButtonTypesHelper';
import { AddToCartButtonType } from '@/extendables/BaseComponents';

export default {
  name: 'AddToCartButton-Normal',
  extends: AddToCartButtonType,
  methods: {
    onClick(event) {
      this.addToCart();
      animateButton(event);
    },
  },
};
</script>
