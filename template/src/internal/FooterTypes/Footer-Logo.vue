<template>
  <footer>
    <a href="https://abrecultura.com/" target="_blank" rel="noopener">
      <span class="sr-only">LOGO</span>
      <Icon name="logo" class="logo"/>
    </a>
  </footer>
</template>

<script>
// @group FOOTER TYPES
// Displays a footer with the ABRE Logo
// @vuese
import { FooterType } from "@/extendables/BaseComponents";

export default {
  name: "Footer-Logo",
  extends: FooterType
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
