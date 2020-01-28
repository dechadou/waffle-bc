<template>
  <footer>
    <CurrencySelector class="currency-selector" v-if="multiCurrency" />
  </footer>
</template>

<script>
// @group FOOTER TYPES
// Displays an empty footer
// @vuese
export default {
  name: 'Footer-None',
};
</script>

<style scoped lang="scss">
footer {
  .currency-selector{
    width: 50%;
    min-width: 150px;
    max-width: 220px;
    margin: 20px auto;
    @include md-up {
      width: 20%;
    }
  }
}
</style>
