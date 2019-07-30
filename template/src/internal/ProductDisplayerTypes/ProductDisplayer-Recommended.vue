<template>
  <div
    class="row"
    v-if="home_product_type !== 'thumbnail' && products.length > 0"
  >
    <div class="col-12 col-md-3">
      <h3>
        Aprovechá
        <br class="d-none d-md-block">el envío
        <br class="d-block d-md-none">y agregá
        <br class="d-none d-md-block">a tu pedido:
      </h3>
    </div>
    <div class="col-12 col-md-3" v-for="product in products" :key="`${product.id}-${product.class}`">
      <Product-DescriptionBottom :data="product"/>
    </div>
  </div>
</template>

<script>
import { ProductDisplayerType } from '@/extendables/BaseComponents';

export default {
  name: 'ProductDisplayer-Recommended',
  extends: ProductDisplayerType,
};
</script>

<style scoped lang="scss">
h3 {
  font-size: 24px;
  font-family: "Founders_Grotesk_Regular", sans-serif;
  color: $abre_dark_grey;
  text-align: center;
  margin-bottom: 30px;
  @include md-up {
    text-align: left;
  }
}
</style>
