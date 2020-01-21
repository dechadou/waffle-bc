<template>
  <div class="row">
    <div class="col-md-2 col-10 offset-1 offset-md-0">
      <div class="row no-gutters">
        <div class="col-6">
          <button
            :class="{alternative: 'ars' === currency}"
            type="button"
            class="btn"
            @click="changeCurrency('ars')"
          >ARS</button>
        </div>
        <div class="col-6">
          <button
            :class="{alternative: 'usd' === currency}"
            type="button"
            class="btn"
            @click="changeCurrency('usd')"
          >USD</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { StoreDataMutationTypes, StoreDataNamespace } from '@/store/module/StoreData';
import { CartMutationTypes } from '@/store/module/Cart';

// Currency selector
// @vuese
export default {
  name: 'CurrencySelector',
  computed: {
    ...mapState(StoreDataNamespace, ['currency']),
  },
  methods: {
    ...mapMutations({
      setCurrency: StoreDataMutationTypes.SET_CURRENCY,
      setCartCurrency: CartMutationTypes.SET_CURRENCY,
    }),
    changeCurrency(currencyParam) {
      if (currencyParam === this.currency) return;
      this.setCartCurrency(currencyParam);
      this.setCurrency(currencyParam);
    },
  },
};
</script>

<style lang="scss" scoped>
.productContainer {
  width: 100%;
}
</style>
