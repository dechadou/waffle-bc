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
import { ProductDisplayerType } from '@/extendables/BaseComponents';

export default {
  name: 'ProductDisplayer-Main',
  extends: ProductDisplayerType,
  props: {
    classes: String,
    containerClasses: String,
    openModules: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.productContainer {
  width: 100%;
}
</style>
