<style src="@/assets/styles/third-party/normalize.min.css"></style>
<style src="@/assets/styles/third-party/animate.min.css"></style>

<template>
  <div>
    <div v-if="show">
      <Cart/>
      <router-view/>
      <component :is="footer" :year="year"/>
    </div>
    <div v-else>
      <Loading class="app-load"/>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import VueAnalytics from 'vue-analytics';
import {
  mapActions, mapGetters, mapState, mapMutations,
} from 'vuex';
import router from '@/router';
import {
  StoreDataActionTypes,
  StoreDataGetterTypes,
  StoreDataMutationTypes,
  StoreDataNamespace,
} from '@/store/module/StoreData';
import { ThemeMutationTypes, ThemeNamespace } from '@/store/module/Theme';
import { getVariable, VariableNames } from '@/config';
import * as FooterTypes from '@/extendables/FooterTypes';
import { Loading, Cart } from '@/extendables/BaseComponents';

export default {
  name: 'App',
  components: {
    ...FooterTypes,
    Loading,
    Cart,
  },
  data() {
    return {
      show: false,
    };
  },
  computed: {
    ...mapState(ThemeNamespace, ['footer']),
    ...mapState(StoreDataNamespace, ['template', 'error', 'year']),
    ...mapGetters({
      isLoaded: StoreDataGetterTypes.IS_LOADED,
    }),
  },
  watch: {
    isLoaded(value) {
      if (!value) return;
      this.setTheme(this.template.template_selector);
      this.setFooter(this.template.footer_type);
      this.setApp();
    },
    error(value) {
      if (!value) return;

      // Si la tienda no existe
      /* if (this.$route.params.slug) {
        window.location.href = `${window.location.protocol}//${
          window.location.host
        }`;
      } */
    },
  },
  created() {
    this.fetchStoreData(
      this.$route.params.slug || getVariable(VariableNames.DefaultSlug),
    );
  },
  methods: {
    ...mapMutations({
      setTheme: ThemeMutationTypes.SET_THEME,
      setFooter: ThemeMutationTypes.SET_FOOTER,
      setStoreIdentifier: StoreDataMutationTypes.SET_STORE_IDENTIFIER,
    }),
    ...mapActions({
      fetchStoreData: StoreDataActionTypes.FETCH_STORE_DATA,
    }),
    setApp() {
      // Si la tienda no pertenece a este dominio redirijo
      if (!this.isValidPage()) {
        window.location.href = `${window.location.protocol}//${
          window.location.host
        }`;
        return;
      }

      // Usado por el carrito para guardar sus contenidos en localstorage
      this.setStoreIdentifier({
        domain: this.template.tienda_url,
        storeSlug: this.$route.params.slug,
      });

      if (this.template.codigo_analytics) {
        Vue.use(VueAnalytics, {
          id: this.template.codigo_analytics,
          router,
        });
      }

      this.show = true;
    },
    isValidPage() {
      if (
        process.env.NODE_ENV === 'production'
        && this.$route.params.slug
        && this.template.tienda_url
        && this.template.tienda_url.indexOf(window.location.host) === -1
      ) return false;
      return true;
    },
  },
};
</script>

<style lang="scss">
@import "assets/styles/base.scss";
.app-load {
  width: 45px;
  height: 45px;
  position: fixed;
  top: 46%;
  left: 44%;
}
</style>
