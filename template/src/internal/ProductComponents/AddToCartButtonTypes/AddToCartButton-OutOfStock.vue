<template>
    <button
      type="button"
      class="btn out_of_stock"
    >Agotado</button>
</template>

<script>
import { AddToCartButtonType } from '@/extendables/BaseComponents';

export default {
  name: 'AddToCartButtonOutOfStock',
  extends: AddToCartButtonType,
};
</script>
