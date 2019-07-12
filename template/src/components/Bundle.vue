<template>
  <div v-if="data !== null">
    <component
      :is="type"
      :data="data"
      :articleList="articleList"
    />
  </div>
  <div v-else>
    El Combo ID: {{ id }} no es un combo válido
  </div>
</template>

<script>
import * as productTypes from './ProductTypes';

export default {
  name: 'Bundle',
  components: {
    ...productTypes,
  },
  props: {
    type: {
      type: String,
      default: 'Thumbnail',
    },
    data: {
      type: Object,
      required: true,
    },
  },
  computed: {
    articleList() {
      return this.data.products.map(x => x.articles).reduce((a, b) => a.concat(b));
    },
  },
};
</script>
