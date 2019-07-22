<style src="@/assets/styles/third-party/normalize.min.css"></style>
<style src="@/assets/styles/third-party/animate.min.css"></style>

<template>
  <router-view v-if="isLoaded"/>
</template>

<script>
import Vue from "vue";
import VueAnalytics from "vue-analytics";
import { mapActions, mapGetters, mapState, mapMutations } from "vuex";
import router from "@/router";
import {
  StoreDataActionTypes,
  StoreDataGetterTypes,
  StoreDataMutationTypes,
  StoreDataNamespace
} from "@/store/module/StoreData";
import { ThemeMutationTypes } from "@/store/module/Theme";
import { getVariable, VariableNames } from "@/config";

export default {
  name: "App",
  computed: {
    ...mapState(StoreDataNamespace, ["template", "error"]),
    ...mapGetters({
      isLoaded: StoreDataGetterTypes.IS_LOADED
    })
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
      if (this.$route.params.slug)
        window.location.href = `${window.location.protocol}//${
          window.location.host
        }`;
    }
  },
  created() {
    this.fetchStoreData(
      this.$route.params.slug || getVariable(VariableNames.DefaultSlug)
    );
  },
  methods: {
    ...mapMutations({
      setTheme: ThemeMutationTypes.SET_THEME,
      setFooter: ThemeMutationTypes.SET_FOOTER,
      setStoreIdentifier: StoreDataMutationTypes.SET_STORE_IDENTIFIER
    }),
    ...mapActions({
      fetchStoreData: StoreDataActionTypes.FETCH_STORE_DATA
    }),
    setApp() {
      if (!this.isValidPage()) return;

      if (this.template.codigo_analytics) {
        Vue.use(VueAnalytics, {
          id: this.template.codigo_analytics,
          router
        });
      }
    },
    isValidPage() {
      // Si la tienda no pertenece a este dominio redirijo
      if (
        this.$route.params.slug &&
        this.template.tienda_url.indexOf(window.location.host) > -1
      ) {
        window.location.href = `${window.location.protocol}//${
          window.location.host
        }`;
        return false;
      } else {
        // Si pertenece le doy un identificador
        this.setStoreIdentifier({
          domain: this.template.tienda_url,
          storeSlug: this.$route.params.slug
        });
        return true;
      }
    }
  }
};
</script>

<style lang="scss">
@import "assets/styles/base.scss";
</style>
