<template>
  <LoadingIcon class="spin"/>
</template>

<script>
import LoadingIcon from "@/assets/icons/loading.svg";

// @group UTILITIES
// Displays a loading spinner animation.
// @vuese
export default {
  name: "Loading",
  components: {
    LoadingIcon
  }
};
</script>

<style lang="scss" scoped>
.spin {
  animation: fa-spin 2s infinite linear;
}

@keyframes fa-spin {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
