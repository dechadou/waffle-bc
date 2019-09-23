<template>
  <footer>
    <a href="https://abrecultura.com/" target="_blank" rel="noopener">
      <span class="sr-only">LOGO</span>
      <LogoIcon class="logo"/>
    </a>
  </footer>
</template>

<script>
// @group FOOTER TYPES
// Displays a footer with the ABRE Logo
// @vuese
import { FooterType } from "@/extendables/BaseComponents";
import LogoIcon from "@/assets/icons/logo.svg";

export default {
  name: "Footer-Logo",
  extends: FooterType,
  components: {
    LogoIcon
  }
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
}
</style>
