<style src="@/assets/styles/third-party/normalize.min.css"></style>
<style src="@/assets/styles/third-party/animate.min.css"></style>

<template>
  <div>
    <transition name="slide-fade">
      <div v-if="show">
        <HeaderSection :year="year" v-if="hasHeader"/>
        <Cart/>
        <router-view :class="[{'has-header': hasHeader}]"/>
        <component :is="footer" :year="year"/>
      </div>
    </transition>
  </div>
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
import { ThemeMutationTypes, ThemeNamespace } from "@/store/module/Theme";
import { getVariable, VariableNames } from "@/config";
import * as FooterTypes from "@/extendables/FooterTypes";
import { Loading, Cart, HeaderSection } from "@/extendables/BaseComponents";

export default {
  name: "App",
  components: {
    ...FooterTypes,
    Loading,
    Cart,
    HeaderSection
  },
  data() {
    return {
      show: false
    };
  },
  computed: {
    ...mapState(ThemeNamespace, ["footer"]),
    ...mapState(StoreDataNamespace, ["template", "error", "year", "store_id"]),
    ...mapGetters({
      isLoaded: StoreDataGetterTypes.IS_LOADED
    }),
    hasHeader() {
      return this.store_id === 8;
    }
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
      if (this.$route.params.slug) {
        window.location.href = `${window.location.protocol}//${
          window.location.host
        }`;
      }
    },
    $route(to, from) {
      /* Por alguna razón, en ciertos casos el router no carga inmediatamente y devuelve null aunque
         haya una ruta válida, por lo tanto espero a que el router se actualice antes de fetchear la info */

      if (this.isLoaded) return;
      this.fetchData();
    }
  },
  created() {
    this.fetchData();
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
    fetchData() {
      if (!this.$route.name) return;
      this.fetchStoreData(
        this.$route.params.slug || getVariable(VariableNames.DefaultSlug)
      );
    },
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
        storeSlug: this.$route.params.slug
      });

      if (this.template.codigo_analytics) {
        Vue.use(VueAnalytics, {
          id: this.template.codigo_analytics,
          router
        });
      }

      var loadingScreen = document.getElementById("loadingScreen");
      loadingScreen.parentElement.removeChild(loadingScreen);

      this.show = true;
    },
    isValidPage() {
      if (
        process.env.NODE_ENV === "production" &&
        this.$route.params.slug &&
        this.template.tienda_url &&
        this.template.tienda_url.indexOf(window.location.host) === -1
      )
        return false;
      return true;
    }
  }
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
.has-header {
  margin-top: 70px;
}
</style>
