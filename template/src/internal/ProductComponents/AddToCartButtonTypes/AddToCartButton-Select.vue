<template>
    <button
        class="btn"
        type="button"
        @click="openLink()"
    >Elegir</button>
</template>

<script>
import { AddToCartButtonType } from '@/extendables/BaseComponents';

export default {
  name: 'AddToCartButton-Select',
  extends: AddToCartButtonType,
};
</script>
