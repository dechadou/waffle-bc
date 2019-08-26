<template>
  <div class="row">
    <div
      v-for="product in products"
      :key="`${product.id}-${product.class}`"
      :class="containerClasses"
    >
      <component
        :is="themeConfig.homeProductType"
        :data="product"
        :class="classes"
        :openModules="openModules"
      />
    </div>
  </div>
</template>

<script>
import { ProductDisplayerType } from "@/extendables/BaseComponents";

// @group PRODUCTDISPLAYER TYPES
// The main way of displaying products
// @vuese
export default {
  name: "ProductDisplayer-Main",
  extends: ProductDisplayerType,
  props: {
    // Classes to append to the products
    classes: String,
    // Classes to append to the container
    containerClasses: String,
    // Whether it's products should open modules or not
    openModules: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style lang="scss" scoped>
.productContainer {
  width: 100%;
}
</style>
