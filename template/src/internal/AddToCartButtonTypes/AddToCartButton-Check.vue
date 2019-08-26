<template>
  <transition name="slide-fade" mode="out-in">
    <button key="added" v-if="isAdding" class="btn green" type="button">Agregado ✓</button>
    <button
      class="btn animated"
      type="button"
      @click="onClick($event)"
      key="add"
      v-else
    >Agregar al Carrito</button>
  </transition>
</template>

<script>
import { animateButton } from "@/utils/addToCartButtonTypesHelper";
import { AddToCartButtonType } from "@/extendables/BaseComponents";

// @group ADDTOCARTBUTTON TYPES
// Displays an 'Add to cart' button that adds the product to the cart, shows a confirmation and toggles no module
// @vuese
export default {
  name: "AddToCartButton-Check",
  extends: AddToCartButtonType,
  data() {
    return {
      isAdding: false
    };
  },
  methods: {
    onClick(event) {
      this.addToCart(false);
      this.isAdding = true;
      animateButton(event, this.onFinishAnimate);
    },
    onFinishAnimate() {
      this.isAdding = false;
    }
  }
};
</script>
