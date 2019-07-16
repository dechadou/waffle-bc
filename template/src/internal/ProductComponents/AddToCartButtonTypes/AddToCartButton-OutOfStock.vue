<template>
    <button
      type="button"
      class="out_of_stock"
    >Agotado</button>
</template>

<script>
import { AddToCartButtonType } from '@/extendables/AddToCartButtonTypes';

export default {
  name: 'AddToCartButtonOutOfStock',
  extends: AddToCartButtonType,
};
</script>
