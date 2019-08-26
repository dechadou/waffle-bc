<template>
  <button type="button" class="btn out_of_stock">Agotado</button>
</template>

<script>
import { AddToCartButtonType } from "@/extendables/BaseComponents";

// @group ADDTOCARTBUTTON TYPES
// Displays an 'Out of stock' button that does nothing
// @vuese
export default {
  name: "AddToCartButtonOutOfStock",
  extends: AddToCartButtonType
};
</script>
