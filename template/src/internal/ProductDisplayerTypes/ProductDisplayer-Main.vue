<template>
  <div class="row">
    <component
      :is="themeConfig.homeProductType"
      v-for="product in products"
      :key="`${product.id}-${product.class}`"
      :data="product"
      :class="classes"
      :openModules="openModules"
    />
  </div>
</template>

<script>
import { ProductDisplayerType } from "@/extendables/BaseComponents";

export default {
  name: "ProductDisplayer-Main",
  extends: ProductDisplayerType,
  props: {
    classes: String,
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

