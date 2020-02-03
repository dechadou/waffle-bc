<template>
  <section id="CurrencySelectorBox">
    <div class="row">
      <div class="col-12 cont">
        <h1>¿Querés comprar en otra moneda?</h1>
        <div class="row">
          <div class="col-8 offset-2 col-md-2 offset-md-5">
              <CurrencySelector />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { CurrencySelector } from '@/extendables/BaseComponents';

// @group INTERNAL COMPONENTS
// Displays the currency selector with a title
// @vuese
export default {
  name: "CurrencySelectorBox",
  components: {
    CurrencySelector,
  },
}
</script>

<style lang="scss" scoped>
.cont {
  margin: 50px 0;
}

h1 {
  font-size: 24px;
  margin: 0.5rem 0.5rem 2rem;
  padding: 5px 0 0;
  font-family: $titles-font;
  font-weight: $titles-font-weight;
  line-height: 1.2;
  color: $titles-color;
  text-align: center;
}
</style>