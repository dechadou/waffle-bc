<template>
    <button
        type="button"
        @click="openLink()"
    >Elegir</button>
</template>

<script>
import { AddToCartButtonType } from '@/extendables/AddToCartButtonTypes';

export default {
  name: 'AddToCartButton-Select',
  extends: AddToCartButtonType,
};
</script>
