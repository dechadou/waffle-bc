<template>
  <div class="row">
    <div class="col-12">
      <div class="row no-gutters">
        <div class="col-6">
          <button
            :class="{alternative: 'ars' === currency}"
            type="button"
            class="btn first-button"
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
import { getVariable, VariableNames } from '@/config';

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
      localStorage.setItem(getVariable(VariableNames.SelectedCurrency), currencyParam);
    },
  },
};
</script>

<style lang="scss" scoped>
.productContainer {
  width: 100%;
}

button {
  padding: 5px 0;
    font-size: 18px;
}

.first-button{
  border-right: none;
}
</style>
