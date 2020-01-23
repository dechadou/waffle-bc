<template>
  <footer>
    <a href="https://abrecultura.com/" target="_blank" rel="noopener">
      <span class="sr-only">LOGO</span>
      <LogoIcon class="logo"/>
    </a>
    <CurrencySelector class="currency-selector" v-if="multiCurrency" />
  </footer>
</template>

<script>
// @group FOOTER TYPES
// Displays a footer with the ABRE Logo
// @vuese
import { FooterType, CurrencySelector } from '@/extendables/BaseComponents';
import LogoIcon from '@/assets/icons/logo.svg';

export default {
  name: 'Footer-Logo',
  extends: FooterType,
  components: {
    LogoIcon,
    CurrencySelector,
  },
};
</script>

<style scoped lang="scss">
footer {
  padding: 30px 0;
  .logo {
    display: block;
    margin: 0 auto;
    width: 100px;
  }
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
