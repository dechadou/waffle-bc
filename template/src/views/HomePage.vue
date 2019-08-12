<template>
  <transition name="slide-fade">
    <div>
      <GlobalWarning/>
      <Hero
        :label="template.etiqueta"
        :desktopImage="template.desktop_image"
        :mobileImage="template.mobile_image"
        :introCopy="template.intro_copy"
      />
      <div class="container">
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
          <ProductDisplayer-Recommended
            :products="recommendedProducts"
            v-if="recommendedProducts.length > 0 && template.productos_relacionados"
          />
        </section>
        <PageShare :title="template.call_to_action_title" v-if="themeConfig.showPageShare"/>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState } from "vuex";
import { StoreDataNamespace } from "@/store/module/StoreData";
import { ThemeNamespace } from "@/store/module/Theme";
import {
  ProductDisplayerRecommended,
  ProductDisplayerMain
} from "@/extendables/ProductDisplayerTypes";
import {
  Hero,
  Profile,
  PageShare,
  GlobalWarning
} from "@/extendables/BaseComponents";

export default {
  name: "HomePage",
  components: {
    Hero,
    Profile,
    ProductDisplayerRecommended,
    ProductDisplayerMain,
    PageShare,
    GlobalWarning
  },
  data() {
    return {
      mainProducts: [],
      recommendedProducts: []
    };
  },
  computed: {
    ...mapState(StoreDataNamespace, ["data", "template", "home_products"]),
    ...mapState(ThemeNamespace, ["themeConfig"])
  },
  methods: {
    getProducts() {
      if (!this.home_products || this.home_products.length === 0) {
        throw new Error("There are no products nor bundles to show");
      }
      const products = [...this.home_products].sort(
        (a, b) => a.position - b.position
      );
      products.forEach(x => {
        let product =
          x.type === "combo" ? this.data.bundles : this.data.products;

        product = product.find(y => +y.id === +x.id);

        if (!product) return;

        if (x.principal) this.mainProducts.push(product);
        else this.recommendedProducts.push(product);
      });
    }
  },
  created() {
    console.log(this.template);
    this.getProducts();
  }
};
</script>

<style scoped lang="scss">
#shop {
  margin-top: 10px;
}
</style>
