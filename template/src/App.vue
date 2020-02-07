<style src="@/assets/styles/third-party/normalize.min.css"></style>
<style src="@/assets/styles/third-party/animate.min.css"></style>

<template>
  <transition name="slide-fade">
    <div v-if="show">
      <HeaderSection :year="year" v-if="hasHeader" />
      <Cart :cartHelper="cartHelper" />
      <router-view />
      <component :is="footer" :year="year" />
      <RelatedProducts :cartHelper="cartHelper" v-if="themeConfig.showRelatedProducts" />
    </div>
  </transition>
</template>

<script>
import Vue from 'vue';
import {
  mapActions, mapGetters, mapState, mapMutations,
} from 'vuex';
import {
  StoreDataActionTypes,
  StoreDataGetterTypes,
  StoreDataMutationTypes,
  StoreDataNamespace,
} from '@/store/module/StoreData';
import { ThemeMutationTypes, ThemeNamespace } from '@/store/module/Theme';
import { CartMutationTypes } from '@/store/module/Cart';
import { BreakpointsMutationTypes } from '@/store/module/Breakpoints';
import router from '@/router';
import { getVariable, VariableNames } from '@/config';
import * as FooterTypes from '@/extendables/FooterTypes';
import { CartHelper } from '@/objects/CartObjects';
import * as Request from '@/utils/request';
import {
  Loading,
  Cart,
  HeaderSection,
  RelatedProducts,
} from '@/extendables/BaseComponents';

// @group INTERNAL COMPONENTS
// This is the main component
export default {
  name: 'App',
  components: {
    ...FooterTypes,
    Loading,
    Cart,
    HeaderSection,
    RelatedProducts,
  },
  data() {
    return {
      show: false,
      cartHelper: null,
      defaultCurrency: null,
      savedCurrency: null,
    };
  },
  computed: {
    ...mapState(ThemeNamespace, ['footer', 'themeConfig', 'theme']),
    ...mapState(StoreDataNamespace, [
      'data',
      'template',
      'error',
      'year',
      'store_id',
      'store_slug',
      'currency',
      'multiCurrency',
    ]),
    ...mapGetters({
      isLoaded: StoreDataGetterTypes.IS_LOADED,
    }),
    hasHeader() {
      return this.theme === 'marketplace';
    },
  },
  watch: {
    isLoaded(value) {
      if (!value) return;
      this.setTheme(this.template.template_selector);
      this.setFooter(this.template.footer_type);
      this.setApp();

      if (this.$ga) {
        console.log('page-loaded');
        this.$ga.event({
          eventCategory: `waffle-${this.store_slug}`,
          eventAction: 'page-loaded',
        });
      }
    },
    error(value) {
      if (!value) return;

      /* If an error happens loading the data it is probably because
         the page does not exists. So if it is a main page (ie: abc.com) it will
         display a blank screen but if it has a slug (ie: abc.com/store) it will
         redirect to the main page (abc.com)
      */
      if (this.$route.params.slug) {
        window.location.href = `${window.location.protocol}//${
          window.location.host
        }`;
      }
    },
    $route() {
      if (!this.isLoaded) {
        /* I dont understand why but in some cases the router does not load immediately, resulting in
         NULL routes even when the user has typed a valid slug. This watch variable is set so the data is
         only fetched when the router is set */
        this.fetchData();
      } else {
        /* Also, if the data has already been fetched but the route changes, it means that the page changed,
         so we make a nice transition */
        this.show = false;

        const scope = this;
        setTimeout(() => {
          window.scrollTo(0, 0);
          scope.show = true;
        }, 500);
      }
    },
  },
  created() {
    this.fetchData();

    // Tells the Breakpoints Store to get the size of the screen and set the breakpoint
    this.setBreakpoint();

    this.defaultCurrency = getVariable(VariableNames.DefaultCurrency);

    window.addEventListener('resize', this.onResize, true);
  },
  methods: {
    ...mapMutations({
      setTheme: ThemeMutationTypes.SET_THEME,
      setFooter: ThemeMutationTypes.SET_FOOTER,
      setStoreIdentifier: StoreDataMutationTypes.SET_STORE_IDENTIFIER,
      setCurrency: StoreDataMutationTypes.SET_CURRENCY,
      setCartCurrency: CartMutationTypes.SET_CURRENCY,
      setBreakpoint: BreakpointsMutationTypes.SET_BREAKPOINT,
    }),
    ...mapActions({
      fetchStoreData: StoreDataActionTypes.FETCH_STORE_DATA,
    }),
    /**
     * @vuese
     * Checks the user's IP and changes pricing if necesary
     */
    async setCurrencyConfig() {
      if (this.multiCurrency && !this.savedCurrency) {
        const ipinfo = await Request.get('https://ipapi.co/json');
        if (ipinfo.country_code !== 'AR') {
          this.setCartCurrency('usd');
          this.setCurrency('usd');
        }
      }

      const localStSelectedCurrencyName = getVariable(VariableNames.SelectedCurrency);
      localStorage.setItem(localStSelectedCurrencyName, this.currency);
    },
    /**
     * @vuese
     * Calls to setBreakpoint on screen resize
     */
    onResize() {
      this.setBreakpoint();
    },
    /**
     * @vuese
     * Calls to fetchStoreData on StoreData vuex store if the route is defined.
     * fetchStoreData asks for the store slug, which is taken from the slug param of the url
     * or the defaultSlug at the config file
     */
    fetchData() {
      if (!this.$route.name) return;
      this.fetchStoreData(
        this.$route.params.slug || getVariable(VariableNames.DefaultSlug),
      );
    },
    /**
     * @vuese
     * Sets app configurations and checks validity of routes
     */
    setApp() {
      // If this store does not belong to this domain, it redirects to the main page
      if (!this.isValidPage()) {
        window.location.href = `${window.location.protocol}//${
          window.location.host
        }`;
        return;
      }

      // The store identifier is used by the Cart for saving things on LocalStorage
      this.setStoreIdentifier({
        domain: 'abre',
        storeSlug: this.store_id,
      });

      // Creates a cartHelper object that is used by the Cart component and the RelatedProducts component
      // The cartHelper object asks for the storeData
      this.cartHelper = new CartHelper(this.data);

      // Sets currency
      const localStSelectedCurrencyName = getVariable(VariableNames.SelectedCurrency);
      this.savedCurrency = localStorage.getItem(localStSelectedCurrencyName);

      if (this.multiCurrency && this.savedCurrency && this.savedCurrency !== 'null') {
        this.setCurrency(this.savedCurrency);
        this.setCartCurrency(this.savedCurrency);
      } else {
        this.setCurrency(this.defaultCurrency);
        this.setCartCurrency(this.defaultCurrency);
      }

      this.setCurrencyConfig();

      // Removes loading screen
      const loadingScreen = document.getElementById('loadingScreen');
      loadingScreen.parentElement.removeChild(loadingScreen);

      // Shows content
      this.show = true;
    },
    /**
     * @vuese
     * Checks if the current store belongs to this domain
     */
    isValidPage() {
      if (
        process.env.NODE_ENV === 'production'
        && this.$route.params.slug
        && this.template.tienda_url
        && window.location.host.indexOf(this.template.tienda_url) === -1
      ) { return false; }
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
