<template>
  <button class="btn" type="button" @click="openLink()">Elegir</button>
</template>

<script>
// @group ADDTOCARTBUTTON TYPES
// Displays a 'Select' button that redirects to the product
// @vuese
import { AddToCartButtonType } from "@/extendables/BaseComponents";

export default {
  name: "AddToCartButton-Select",
  extends: AddToCartButtonType
};
</script>
