<template>
  <transition name="slide-fade" mode="out-in">
    <button key="added" v-if="isAdding" class="green" type="button">Agregado ✓</button>
    <button
      key="add"
      v-else
      :class="[{ animated: (!slider) }]"
      type="button"
      @click="onClick($event)"
    >Agregar al Carrito</button>
  </transition>
</template>

<script>
import { animateButton } from "@/utils/addToCartButtonTypesHelper";

export default {
  name: "AddToCartButton-Check",
  props: {
    callback: {
      type: Function
    }
  },
  data() {
    return {
      isAdding: false
    };
  },
  methods: {
    onClick(event) {
      this.callback();
      this.isAdding = true;
      animateButton(event, this.onFinishAnimate);
    },
    onFinishAnimate() {
      this.isAdding = false;
    }
  }
};
</script>
