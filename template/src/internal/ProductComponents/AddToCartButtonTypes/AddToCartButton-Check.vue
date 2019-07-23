<template>
  <transition name="slide-fade" mode="out-in">
    <button key="added" v-if="isAdding" class="btn green" type="button">Agregado ✓</button>
    <button
      key="add"
      v-else
      class="btn"
      :class="[{ animated: (!slider) }]"
      type="button"
      @click="onClick($event)"
    >Agregar al Carrito</button>
  </transition>
</template>

<script>
import { animateButton } from '@/utils/addToCartButtonTypesHelper';
import { AddToCartButtonType } from '@/extendables/BaseComponents';

export default {
  name: 'AddToCartButton-Check',
  extends: AddToCartButtonType,
  data() {
    return {
      isAdding: false,
    };
  },
  methods: {
    onClick(event) {
      this.addToCart();
      this.isAdding = true;
      animateButton(event, this.onFinishAnimate);
    },
    onFinishAnimate() {
      this.isAdding = false;
    },
  },
};
</script>
