<style src="@/assets/styles/third-party/normalize.min.css"></style>
<style src="@/assets/styles/third-party/bootstrap-grid.min.css"></style>
<style src="@/assets/styles/third-party/animate.min.css"></style>

<template>
  <router-view v-if="isLoaded"/>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { StoreDataActionTypes, StoreDataGetterTypes } from './store/module/StoreData';
import { getVariable, VariableNames } from './config';

export default {
  name: 'App',
  computed: {
    ...mapGetters({
      isLoaded: StoreDataGetterTypes.IS_LOADED,
    }),
  },
  created() {
    this.fetchStoreData(this.$route.params.slug || getVariable(VariableNames.DefaultSlug));
  },
  methods: {
    ...mapActions({
      fetchStoreData: StoreDataActionTypes.FETCH_STORE_DATA,
    }),
  },
};
</script>

<style lang="scss">
  @import "assets/styles/base.scss";
</style>
