<template>
  <button class="btn animated" type="button" @click="onClick($event)">Agregar al Carrito</button>
</template>

<script>
import { animateButton } from "@/utils/addToCartButtonTypesHelper";
import { AddToCartButtonType } from "@/extendables/BaseComponents";

// @group ADDTOCARTBUTTON TYPES
// Displays an 'Add to cart' button that adds the product to cart, animates the button and toggles the cart/related-products module
// @vuese
export default {
  name: "AddToCartButton-Normal",
  extends: AddToCartButtonType,
  methods: {
    onClick(event) {
      this.addToCart();
      animateButton(event);
    }
  }
};
</script>
