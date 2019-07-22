<template>
  <footer>
    <Icon name="abre" class="logo"/>
  </footer>
</template>

<script>
import { FooterType } from "@/extendables/FooterTypes";
export default {
  name: 'Footer-Logo',
  extends: FooterType
};
</script>

<style scoped lang="scss">
  footer{
    padding: 30px 0;
    .logo{
      display: block;
      margin: 0 auto;
      width: 100px;
    }
  }
</style>