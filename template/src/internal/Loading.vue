<template>
  <Icon name="loading" class="spin"/>
</template>

<script>
import { Icon } from '@/extendables/BaseComponents';

export default {
  name: 'Loading',
  components: {
    Icon,
  },
};
</script>

<style lang="scss" scoped>
.spin{
  animation: fa-spin 2s infinite linear;
}

@keyframes fa-spin {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg); }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg); }
}

</style>
