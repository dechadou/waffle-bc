<template>
  <div class="row">
    <div class="col-12">
      <div class="row no-gutters">
        <div class="col-6 button-cont">
          <button
            :class="{alternative: 'ars' === currency}"
            type="button"
            class="btn"
            @click="changeCurrency('ars')"
          >AR$</button>
          <div class="divider"/>
        </div>
        <div class="col-6 button-cont">
          <button
            :class="{alternative: 'usd' === currency}"
            type="button"
            class="btn"
            @click="changeCurrency('usd')"
          >US$</button>
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

// @group INTERNAL COMPONENTS
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
button.btn {
  padding: 0;
  font-size: 18px;
  background: transparent;
  border: none;
  border-bottom: 1px solid transparent;
  color: #000;
  outline: none;
  font-family: "Founders_Grotesk_Regular", sans-serif;

  &.alternative{
    background: transparent;
    border-bottom: 1px solid #000;
    color: #000;
  }
}
.button-cont{
  padding: 0 7px !important;
}
.divider{
  width: 1px;
  height: 12px;
  background: #000;
  position: absolute;
  right: -1px;
  top: 6px;
}
</style>
