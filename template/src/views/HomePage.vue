<template>
  <transition name="slide-fade">
    <div>
      <GlobalWarning/>
      <Cart/>
      <Hero
        :label="template.etiqueta"
        :desktopImage="template.desktop_image"
        :mobileImage="template.mobile_image"
        :introCopy="template.intro_copy"
      />
      <div class="container">
        <section id="shop">
          <div class="row" v-if="mainProducts.length > 0">
            <div class="col-12" v-for="product in mainProducts" :key="product.id">
              <component :is="home_product_type" :data="product"/>
            </div>
          </div>
          <div
            class="row"
            v-if="home_product_type !== 'thumbnail' && recommendedProducts.length > 0"
          >
            <div class="col-12 col-md-3">
              <h3>
                Aprovechá
                <br class="d-none d-md-block">el envío
                <br class="d-block d-md-none">y agregá
                <br class="d-none d-md-block">a tu pedido:
              </h3>
            </div>
            <div class="col-12 col-md-3" v-for="product in recommendedProducts" :key="product.id">
              <Product-DescriptionBottom :data="product"/>
            </div>
          </div>
        </section>
        <Profile
          :title="template.creador_titulo"
          :text="template.creador_bio"
          :image="template.creador_image"
          :facebook="template.creador_social_fb"
          :twitter="template.creador_social_tw"
          :instagram="template.creador_social_ig"
          :website="template.creador_social_web"
        />
        <PageShare :title="template.call_to_action_title"/>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState } from "vuex";
import { StoreDataNamespace } from "@/store/module/StoreData";
import { ThemeNamespace } from "@/store/module/Theme";
import {
  Hero,
  GlobalWarning,
  Profile,
  PageShare,
  Cart
} from "@/extendables/BaseComponents";
import * as Products from "@/extendables/ProductTypes";

export default {
  name: "HomePage",
  components: {
    Hero,
    GlobalWarning,
    Profile,
    ...Products,
    PageShare,
    Cart
  },
  data() {
    return {
      mainProducts: [],
      recommendedProducts: []
    };
  },
  computed: {
    ...mapState(ThemeNamespace, ["home_product_type"]),
    ...mapState(StoreDataNamespace, ["data", "template", "home_products"])
  },
  methods: {
    getProducts() {
      const products = [...this.home_products].sort(
        (a, b) => a.position - b.position
      );
      products.forEach(x => {
        let product =
          x.type === "combo" ? this.data.bundles : this.data.products;

        product = product.find(y => {
          return +y.id === +x.id;
        });

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
h3 {
  font-size: 24px;
  font-family: "Founders_Grotesk_Regular", sans-serif;
  color: $abre_dark_grey;
  text-align: center;
  margin-bottom: 30px;
  @include md-up {
    text-align: left;
  }
}
</style>
