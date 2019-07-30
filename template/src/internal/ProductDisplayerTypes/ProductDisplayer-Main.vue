<template>
  <div class="row" v-if="products.length > 0">
    <div class="col-12" v-for="product in products" :key="`${product.id}-${product.class}`">
      <component :is="home_product_type" :data="product"/>
    </div>
  </div>
</template>

<script>
import { ProductDisplayerType } from '@/extendables/BaseComponents';

export default {
  name: 'ProductDisplayer-Main',
  extends: ProductDisplayerType,
};
</script>
