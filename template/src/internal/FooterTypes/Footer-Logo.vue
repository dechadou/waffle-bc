<template>
  <footer>
    <a href="https://abrecultura.com/" target="_blank" rel="noopener">
      <span class="sr-only">ABRE</span>
      <Icon name="abre" class="logo"/>
    </a>
  </footer>
</template>

<script>
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
