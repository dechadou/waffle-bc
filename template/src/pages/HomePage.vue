<template>
  <transition name="slide-fade">
    <div>
      <GlobalWarning />
      <Hero
        v-if="template.etiqueta || template.desktop_image || template.mobile_image || template.intro_copy"
        :label="template.etiqueta"
        :desktopImage="template.desktop_image"
        :mobileImage="template.mobile_image"
        :introCopy="template.intro_copy"
      />
      <div class="container" :class="[{'has-header': isMarketplace}]">
        <section id="shop">
          <ProductDisplayer-Main
            :products="mainProducts"
            v-if="mainProducts.length > 0"
            :containerClasses="themeConfig.homeProductClasses"
          />
          <ProductDisplayer-Recommended
            :products="recommendedProducts"
            v-if="recommendedProducts.length > 0 && !template.productos_relacionados"
          />
          <Profile
            :title="template.creador_titulo"
            :text="template.creador_bio"
            :image="template.creador_image"
            :facebook="template.creador_social_fb"
            :twitter="template.creador_social_tw"
            :instagram="template.creador_social_ig"
            :website="template.creador_social_web"
          />
          <div class="moca-container" v-if="moca">
            <moca-module
              :moca_creator="moca.moca_creator"
              :moca_title="moca.moca_title"
              :moca_description="moca.moca_description"
              :moca_bg="moca.moca_bg"
            >
            </moca-module>
          </div>
          <ProductDisplayer-Recommended
            :products="recommendedProducts"
            v-if="recommendedProducts.length > 0 && template.productos_relacionados"
          />
        </section>
        <PageShare
          :title="template.call_to_action_title"
          :shareText="template.twitter_share"
          v-if="themeConfig.showPageShare"
        />

        <!-- TODO: if it is marketplace and screen >= MD don't show -->
        <!--<CurrencySelectorBox v-if="multiCurrency && !(isMarketplace && breakpoint >= breakpoints.MD)" />-->
      </div>
    </div>
  </transition>
</template>

<script>
/* global $moca */
import { mapState } from 'vuex';
import { BreakpointsNamespace } from '@/store/module/Breakpoints';
import { StoreDataNamespace } from '@/store/module/StoreData';
import { ThemeNamespace } from '@/store/module/Theme';
import {
  ProductDisplayerRecommended,
  ProductDisplayerMain,
} from '@/extendables/ProductDisplayerTypes';
import {
  Hero,
  Profile,
  PageShare,
  GlobalWarning,
  // CurrencySelectorBox,
} from '@/extendables/BaseComponents';

// @group PAGES
// The main view where all the products and bundles are shown
export default {
  name: 'HomePage',
  components: {
    Hero,
    Profile,
    ProductDisplayerRecommended,
    ProductDisplayerMain,
    PageShare,
    GlobalWarning,
    // CurrencySelectorBox,
  },
  data() {
    return {
      mainProducts: [],
      recommendedProducts: [],
      moca: null,
    };
  },
  computed: {
    ...mapState(StoreDataNamespace, [
      'data',
      'template',
      'home_products',
      'store_id',
      'multiCurrency',
    ]),
    ...mapState(ThemeNamespace, ['themeConfig', 'theme']),
    ...mapState(BreakpointsNamespace, ['breakpoint', 'breakpoints']),
    isMarketplace() {
      return this.theme === 'marketplace';
    },
  },
  methods: {
    /**
     * @vuese
     * Gets the product data of all the home_products products,
     * sorts them, and divides them between mainProducts and recommendedProducts
     */
    getProducts() {
      // Checks if there are products to process
      if (!this.home_products || this.home_products.length === 0) {
        throw new Error('There are no products nor bundles to show');
      }

      // Sorts the product identifiers by position
      const products = [...this.home_products].sort(
        (a, b) => a.position - b.position,
      );

      // For each product identifier
      products.forEach((x) => {
        // Gets all the products or all the bundles
        let product = x.type === 'combo' ? this.data.bundles : this.data.products;

        product = product.find(y => +y.id === +x.id);

        if (!product) return;

        if (x.principal) this.mainProducts.push(product);
        else this.recommendedProducts.push(product);
      });
    },
    includeMoca() {
      const fileref = document.createElement('script');
      fileref.setAttribute('type', 'text/javascript');
      fileref.setAttribute('src', 'https://abrecultura.s3.amazonaws.com/data/moca/v1/moca-module.min.js');
      document.getElementsByTagName('head')[0].appendChild(fileref);
    },
  },
  created() {
    this.getProducts();

    if (typeof $moca !== 'undefined') {
      this.moca = $moca;
      this.includeMoca();
    }
  },
};
</script>

<style scoped lang="scss">
#shop {
  margin-top: 10px;
}
.has-header {
  margin-top: 70px;
}
</style>
