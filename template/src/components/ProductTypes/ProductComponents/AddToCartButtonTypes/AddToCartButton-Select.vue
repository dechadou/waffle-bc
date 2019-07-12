<template>
    <button
        type="button"
        @click="callback()"
    >Elegir</button>
</template>

<script>

export default {
  name: 'AddToCartButton-Select',
  props: {
    callback: {
      type: Function,
    },
  },
};
</script>
