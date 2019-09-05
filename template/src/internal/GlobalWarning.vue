<template>
  <div class="container">
    <div class="globalWarning" role="alert" v-if="description" v-html="description"/>
  </div>
</template>

<script>
import { Request } from '@/utils';

// @group INTERNAL COMPONENTS
// Fetches the aviso-global-tiendas meta and displays an alert with the meta content if there's any
// @vuese
export default {
  name: 'GlobalWarning',
  data() {
    return {
      description: null,
    };
  },
  mounted() {
    Request.api
      .get('metas/slug/aviso-global-tiendas')
      .then(response => this.assignDescription(response.data.value))
      .catch(err => console.error(err));
  },
  methods: {
    assignDescription(value) {
      this.description = value;
    },
  },
};
</script>

<style scoped lang="scss">
.globalWarning {
  font-size: 20px;
  background-color: white;
  border: none;
  margin: 0;
  color: black;
}

.globalWarning h3 {
  text-align: center;
  display: block;
  margin: 20px 20px 20px 20px;
  padding-left: 20px;
  text-align: left;
}
</style>
