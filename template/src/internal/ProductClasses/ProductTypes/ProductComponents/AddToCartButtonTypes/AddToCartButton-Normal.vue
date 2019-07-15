<template>
  <button class="animated" type="button" @click="onClick($event)">Agregar al Carrito</button>
</template>

<script>
import { animateButton } from "@/utils/addToCartButtonTypesHelper";

export default {
  name: "AddToCartButton-Normal",
  props: {
    callback: {
      type: Function
    }
  },
  methods: {
    onClick(event) {
      this.callback();
      animateButton(event);
    }
  }
};
</script>
