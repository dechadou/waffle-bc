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
          <div class="row">
            <div
              class="col-12"
              v-for="bundle in getBundles(false)"
              :key="bundle.id"
            >
              <component :is="home_product_type" :data="bundle"/>
            </div>
            <div
              class="col-12"
              v-for="product in getProducts(false)"
              :key="product.id"
            >
              <component :is="home_product_type" :data="product"/>
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-md-3">
              <h3>Aprovechá el envío y agregá a tu pedido:</h3>
            </div>
            <div
              class="col-12 col-md-3"
              v-for="bundle in getBundles(false)"
              :key="bundle.id"
            >
              <Product-DescriptionBottom v-if="home_product_type !== 'thumbnail'" :data="bundle"/>
            </div>
            <div
              class="col-12 col-md-3"
              v-for="product in getProducts(false)"
              :key="product.id"
            >
              <Product-DescriptionBottom v-if="home_product_type !== 'thumbnail'" :data="product"/>
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
        <PageShare/>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState } from 'vuex';
import { StoreDataNamespace } from '@/store/module/StoreData';
import { ThemeNamespace } from '@/store/module/Theme';
import {
  Hero,
  GlobalWarning,
  Profile,
  PageShare,
  Cart,
} from '@/extendables/BaseComponents';
import { ProductDescription, ProductDescriptionBottom } from '@/extendables/ProductTypes';

export default {
  name: 'HomePage',
  components: {
    Hero,
    GlobalWarning,
    Profile,
    ProductDescription,
    ProductDescriptionBottom,
    PageShare,
    Cart,
  },
  computed: {
    ...mapState(ThemeNamespace, ['home_product_type']),
    ...mapState(StoreDataNamespace, ['data', 'template', 'bundles_id', 'products_id']),
  },
  methods: {
    getBundles(main) {
      try {
        return this.data.bundles.filter(x => this.bundles_id.find(y => y.principal === main && x.id === y.id));
      }catch (e){
        console.error(`[Waffle Error]: ${e}`);
        return [];
      }
    },
    getProducts(main) {
      try {
        return this.data.products.filter(x => this.products_id.find(y => y.principal === main && x.id === y.id));
      }catch (e){
        console.error(`[Waffle Error]: ${e}`);
        return [];
      }
    },
  },
  created() {
    console.log(this.template);
  },
};
</script>

<style scoped lang="scss">
#shop {
  margin-top: 10px;
}
</style>
